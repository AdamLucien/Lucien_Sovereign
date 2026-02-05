const DEFAULT_PORTAL_BASE_URL = 'https://portal.lucien.technology';

const TIER_ENGAGEMENT_MAP = {
  0: ['TIER-DIAGNOSIS'],
  1: ['TIER-ARCHITECT'],
  2: ['TIER-SOVEREIGN'],
};

const textEncoder = new TextEncoder();

const toHex = (buffer) =>
  [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');

const verifyStripeSignature = async (payload, signatureHeader, secret) => {
  if (!signatureHeader) return false;
  const elements = signatureHeader.split(',');
  const timestamp = elements.find((part) => part.startsWith('t='))?.slice(2);
  const signatures = elements
    .filter((part) => part.startsWith('v1='))
    .map((part) => part.slice(3));

  if (!timestamp || signatures.length === 0) return false;

  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(signedPayload));
  const expected = toHex(signature);

  return signatures.includes(expected);
};

export const onRequestPost = async ({ request, env }) => {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return new Response('Missing STRIPE_WEBHOOK_SECRET', { status: 500 });
  }
  if (!env.INVITE_API_SECRET) {
    return new Response('Missing INVITE_API_SECRET', { status: 500 });
  }

  const payload = await request.text();
  const signatureHeader = request.headers.get('stripe-signature');

  const isValid = await verifyStripeSignature(payload, signatureHeader, env.STRIPE_WEBHOOK_SECRET);
  if (!isValid) {
    return new Response('Invalid signature', { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return new Response('Ignored', { status: 200 });
  }

  const session = event.data?.object || {};
  const email = session.customer_email || session.customer_details?.email || '';
  const tierIndexRaw = session.metadata?.tierIndex;
  const lang = session.metadata?.lang || 'en';
  const tierIndex = Number.isInteger(Number(tierIndexRaw)) ? Number(tierIndexRaw) : -1;

  if (!email || !(tierIndex in TIER_ENGAGEMENT_MAP)) {
    return new Response('Missing invite data', { status: 400 });
  }

  const portalBaseUrl = env.PORTAL_BASE_URL || DEFAULT_PORTAL_BASE_URL;
  const inviteUrl = `${portalBaseUrl.replace(/\/$/, '')}/api/auth/invite`;

  const invitePayload = {
    email,
    role: 'CLIENT',
    engagementIds: TIER_ENGAGEMENT_MAP[tierIndex],
    type: 'magic',
    sendEmail: true,
    inviteBaseUrl: portalBaseUrl,
    vis: {
      tierIndex,
      lang,
      source: 'stripe',
      sessionId: session.id,
    },
  };

  const upstream = await fetch(inviteUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-invite-secret': env.INVITE_API_SECRET,
    },
    body: JSON.stringify(invitePayload),
  });

  if (!upstream.ok) {
    const errorText = await upstream.text();
    return new Response(`Invite failed: ${errorText}`, { status: 502 });
  }

  return new Response('OK', { status: 200 });
};
