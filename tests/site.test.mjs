import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { preview } from 'vite';
import { BLOG_INDEX_PATH, BLOG_PAGE_SIZE, blogPagePath } from '../src/data/blogPagination.js';
import { absoluteUrl } from '../src/data/site.js';

const fileFor = (path) => path === '/' ? 'dist/index.html' : `dist${path}.html`;
const htmlFor = (path) => readFile(fileFor(path), 'utf8');
const pagePayload = (html) => JSON.parse(html.match(/<script id="page-data"[^>]*>(.*?)<\/script>/s)[1]);

test('each sitemap URL has exactly one self-canonical in its initial HTML', async () => {
  const xml = await readFile('dist/sitemap.xml', 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.ok(urls.length > 0);
  assert.equal(new Set(urls).size, urls.length);
  for (const url of urls) {
    const { pathname } = new URL(url);
    const html = await htmlFor(pathname);
    assert.deepEqual([...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((match) => match[1]), [absoluteUrl(pathname)]);
    if (/^\/portfolio\/[^/]+$/.test(pathname)) assert.match(html, /Discuss a similar project/);
    if (/^\/blog\/[^/]+$/.test(pathname)) {
      const markdown = html.split('class="blog-markdown')[1].split('</div>', 1)[0];
      for (const [image] of markdown.matchAll(/<img\b[^>]*>/g)) {
        assert.match(image, /loading="lazy"/);
        const localImage = image.match(/src="(\/images\/blog\/[^"]+)"/);
        if (localImage) await readFile(`dist${localImage[1]}`);
      }
    }
  }
  assert.match(await htmlFor('/about'), /href="\/documents\/[^"]+\.pdf" download/);
});

test('the archive exposes all articles once and links to the next static page', async () => {
  const index = JSON.parse(await readFile(`dist${BLOG_INDEX_PATH}`, 'utf8'));
  const pageCount = Math.max(1, Math.ceil(index.length / BLOG_PAGE_SIZE));
  const slugs = [];
  for (let page = 1; page <= pageCount; page++) {
    const html = await htmlFor(blogPagePath(page));
    const payload = pagePayload(html);
    assert.equal(payload.page, page);
    assert.equal(payload.pageCount, pageCount);
    assert.ok(payload.posts.length <= BLOG_PAGE_SIZE);
    assert.equal(Object.hasOwn(payload, 'searchIndex'), false);
    slugs.push(...payload.posts.map(({ slug }) => slug));
    if (page < pageCount) assert.ok(html.includes(`href="${blogPagePath(page + 1)}"`));
  }
  assert.equal(new Set(slugs).size, slugs.length);
  assert.deepEqual(slugs, index.map(({ slug }) => slug));
});

test('unknown URLs return 404 and the deployed custom error page is noindex', async () => {
  const server = await preview({
    configFile: false,
    appType: 'mpa',
    preview: { port: 0, host: '127.0.0.1' },
  });
  try {
    const { port } = server.httpServer.address();
    for (const path of ['/blog/nonexistent-article', '/blog/page/99999', '/portfolio/nonexistent-project']) {
      assert.equal((await fetch(`http://127.0.0.1:${port}${path}`)).status, 404);
    }
    assert.match(await htmlFor('/404'), /name="robots" content="noindex"/);
  } finally {
    server.httpServer.closeAllConnections();
    await new Promise((resolve, reject) => server.httpServer.close((error) => error ? reject(error) : resolve()));
  }
});
