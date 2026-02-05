const DEFAULT_SUCCESS_URL = 'https://lucien.technology/en/payment/success';
const DEFAULT_CANCEL_URL = 'https://lucien.technology/en/payment/cancel';

const PRICE_MAP = {
  0: 'price_1SxTPn7nV1JHZ9r7nrLFAmrP',
  1: 'price_1SxTRC7nV1JHZ9r71F0E8DkU',
  2: 'price_1SxTSq7nV1JHZ9r7ZaRwFOD9',
};

export const onRequestPost = async ({ request, env }) => {
  if (!env.STRIPE_SECRET_KEY) {
    return new Response(
      JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY' }),
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

  if (!(tierIndex in PRICE_MAP)) {
    return new Response(
      JSON.stringify({ error: 'Invalid tier' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const params = new URLSearchParams();
  params.set('mode', 'payment');
  params.set('success_url', env.STRIPE_SUCCESS_URL || DEFAULT_SUCCESS_URL);
  params.set('cancel_url', env.STRIPE_CANCEL_URL || DEFAULT_CANCEL_URL);
  params.set('customer_email', email);
  params.set('line_items[0][price]', PRICE_MAP[tierIndex]);
  params.set('line_items[0][quantity]', '1');
  params.set('metadata[tierIndex]', String(tierIndex));
  params.set('metadata[lang]', lang);
  params.set('client_reference_id', email);

  const upstream = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await upstream.json();

  if (!upstream.ok) {
    return new Response(JSON.stringify({ error: 'Stripe session error', details: data }), {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ url: data.url }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
