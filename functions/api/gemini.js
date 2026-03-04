export const onRequestPost = async ({ request, env }) => {
  const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
  const requestedModel = env.GEMINI_MODEL || 'gemini-2.5-flash';

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Missing GEMINI_API_KEY (or VITE_GEMINI_API_KEY)' }),
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

  if (!payload?.prompt || typeof payload.prompt !== 'string') {
    return new Response(
      JSON.stringify({ error: 'Missing prompt' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const modelsToTry = Array.from(new Set([
    requestedModel,
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
  ]));

  let lastStatus = 500;
  let lastData = { error: 'Gemini request failed' };

  for (const model of modelsToTry) {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: payload.prompt }] }] }),
      }
    );

    const raw = await upstream.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = { error: `Upstream returned non-JSON response (${upstream.status})` };
    }

    if (upstream.ok) {
      return new Response(JSON.stringify(data), {
        status: upstream.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    lastStatus = upstream.status;
    lastData = data;

    const notFound =
      upstream.status === 404 ||
      data?.error?.status === 'NOT_FOUND' ||
      /not found|not supported/i.test(data?.error?.message || '');

    // If model is invalid/deprecated, try the next candidate.
    if (notFound) continue;

    // Any other error should be returned immediately.
    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      error: 'No compatible Gemini model available',
      attemptedModels: modelsToTry,
      upstream: lastData,
    }),
    {
      status: lastStatus,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
