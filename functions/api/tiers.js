const DEFAULT_PORTAL_BASE_URL = 'https://portal.lucien.technology';

const TIER_ENGAGEMENT_MAP = {
  0: ['TIER-DIAGNOSIS'],
  1: ['TIER-ARCHITECT'],
  2: ['TIER-SOVEREIGN'],
};

export const onRequestPost = async ({ request, env }) => {
  if (!env.INVITE_API_SECRET) {
    return new Response(
      JSON.stringify({ error: 'Missing INVITE_API_SECRET' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const email = typeof payload?.email === 'string' ? payload.email.trim() : '';
  const tierIndex = Number.isInteger(payload?.tierIndex) ? payload.tierIndex : -1;
  const lang = typeof payload?.lang === 'string' ? payload.lang : 'en';

  if (!email) {
    return new Response(
      JSON.stringify({ error: 'Missing email' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!(tierIndex in TIER_ENGAGEMENT_MAP)) {
    return new Response(
      JSON.stringify({ error: 'Invalid tier' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
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
      source: 'lucien.technology',
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

  const data = await upstream.json();

  return new Response(JSON.stringify(data), {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
