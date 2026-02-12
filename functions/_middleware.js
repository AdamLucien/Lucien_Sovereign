const normalizePath = (path) => path.replace(/\/+/g, '/');

export const onRequest = async ({ request, next }) => {
  const url = new URL(request.url);

  // Enforce https
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  // Collapse duplicate slashes in path
  const normalizedPath = normalizePath(url.pathname);
  if (normalizedPath !== url.pathname) {
    url.pathname = normalizedPath;
    return Response.redirect(url.toString(), 301);
  }

  return next();
};
