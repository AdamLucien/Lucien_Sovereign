const normalizePath = (path) => path.replace(/\/+/g, '/');
const hasFileExtension = (path) => /\.[a-zA-Z0-9]+$/.test(path);

export const onRequest = async ({ request, next }) => {
  const url = new URL(request.url);

  // Enforce non-www host
  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.replace(/^www\./, '');
    return Response.redirect(url.toString(), 301);
  }

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

  // Enforce trailing slash for non-file, non-API routes
  if (
    url.pathname !== '/' &&
    !url.pathname.endsWith('/') &&
    !url.pathname.startsWith('/api') &&
    !hasFileExtension(url.pathname)
  ) {
    url.pathname = `${url.pathname}/`;
    return Response.redirect(url.toString(), 301);
  }

  return next();
};
