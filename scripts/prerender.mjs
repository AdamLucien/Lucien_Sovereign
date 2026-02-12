import { resolve, join } from 'path';
import { readFile, writeFile, rm } from 'fs/promises';
import { spawn } from 'child_process';

const root = resolve(process.cwd());
const distDir = resolve(root, 'dist');
const ssrOutDir = resolve(root, 'dist-ssr');

const locales = ['en', 'cs', 'de', 'uk', 'zh'];

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

for (const locale of locales) {
  const htmlPath = join(distDir, locale, 'index.html');
  const html = await readFile(htmlPath, 'utf8');
  const appHtml = ssrEntry.render(`/${locale}/`);
  const nextHtml = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  await writeFile(htmlPath, nextHtml, 'utf8');
}

await rm(ssrOutDir, { recursive: true, force: true });
