import { resolve, join } from 'path';
import { readFile, writeFile, rm } from 'fs/promises';
import { spawn } from 'child_process';

const root = resolve(process.cwd());
const distDir = resolve(root, 'dist');
const ssrOutDir = resolve(root, 'dist-ssr');

const locales = ['en', 'cs', 'de', 'uk', 'zh'];
const capabilitySlugs = [
  'systemic-reconstruction',
  'causal-ai-backbone',
  'entropy-elimination',
  'sovereign-frameworks'
];

await new Promise((resolveBuild, rejectBuild) => {
  const viteBin = resolve(root, 'node_modules', '.bin', 'vite');
  const child = spawn(
    viteBin,
    ['build', '--ssr', 'src/ssr-entry.jsx', '--outDir', ssrOutDir, '--emptyOutDir'],
    { stdio: 'inherit', cwd: root }
  );
  child.on('exit', (code) => {
    if (code === 0) resolveBuild();
    else rejectBuild(new Error(`SSR build failed with code ${code}`));
  });
});

const ssrEntry = await import(join(ssrOutDir, 'ssr-entry.js'));

const routes = [];

for (const locale of locales) {
  routes.push({
    urlPath: `/${locale}/`,
    htmlPath: join(distDir, locale, 'index.html')
  });
  for (const slug of capabilitySlugs) {
    routes.push({
      urlPath: `/${locale}/capabilities/${slug}/`,
      htmlPath: join(distDir, locale, 'capabilities', slug, 'index.html')
    });
  }
}

for (const route of routes) {
  const html = await readFile(route.htmlPath, 'utf8');
  const appHtml = ssrEntry.render(route.urlPath);
  const nextHtml = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  await writeFile(route.htmlPath, nextHtml, 'utf8');
}

await rm(ssrOutDir, { recursive: true, force: true });
