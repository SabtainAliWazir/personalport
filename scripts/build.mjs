import { build } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const outDir = 'dist';
const serverDir = 'dist-ssr';
await build({ build: { outDir } });
await build({ build: { ssr: 'src/entry-server.jsx', outDir: serverDir, copyPublicDir: false } });

const { absoluteUrl, blogIndex, loadPublishedPosts, publicPaths, renderPage } =
  await import('../dist-ssr/entry-server.js');
const template = await readFile(`${outDir}/index.html`, 'utf8');
const posts = await loadPublishedPosts();
const paths = publicPaths(posts);
const index = blogIndex(posts);
const postsByPath = new Map(posts.map((post) => [`/blog/${post.slug}`, post]));

function escapeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

for (const path of [...paths, '/404']) {
  const payload = path === '/blog' ? { posts: index } : postsByPath.has(path) ? { post: postsByPath.get(path) } : {};
  const markup = await renderPage(path, payload);
  const shellIndex = markup.indexOf('<div id="app-shell"');
  if (shellIndex < 0) throw new Error(`Missing app shell on ${path}`);

  const html = template
    .replace('</head>', () => `${markup.slice(0, shellIndex)}\n</head>`)
    .replace('<div id="root"></div>', () =>
      `<div id="root">${markup.slice(shellIndex)}</div>\n<script id="page-data" type="application/json" data-path="${path}">${escapeJson(payload)}</script>`
    );
  const file = path === '/' ? `${outDir}/index.html` : `${outDir}${path}.html`;
  await mkdir(file.slice(0, file.lastIndexOf('/')), { recursive: true });
  await writeFile(file, html);
}

const entries = paths.map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`).join('\n');
await writeFile(`${outDir}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`);
await writeFile(`${outDir}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`);
console.log(`Pre-rendered ${paths.length} indexable pages and a 404 page.`);
