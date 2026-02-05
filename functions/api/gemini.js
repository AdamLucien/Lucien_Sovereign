export const onRequestPost = async ({ request, env }) => {
  if (!env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Missing GEMINI_API_KEY' }),
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

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: payload.prompt }] }] }),
    }
  );

  const data = await upstream.json();

  return new Response(JSON.stringify(data), {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
