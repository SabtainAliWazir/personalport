import assert from 'node:assert/strict';
import { env } from 'node:process';
import { test } from 'node:test';

env.VITE_SUPABASE_URL = 'https://blog.example.com';
env.VITE_SUPABASE_ANON_KEY = 'test-anonymous-key';

test('repository mode publishes the checked-in archive without reading Supabase', async (t) => {
  env.VITE_BLOG_SOURCE = 'repository';
  const fetch = t.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected fetch'); });
  const { FALLBACK_BLOG_POSTS, loadPublishedPosts } = await import('../src/lib/supabase.js?source=repo');
  const posts = await loadPublishedPosts();
  assert.equal(posts.length, FALLBACK_BLOG_POSTS.length);
  assert.equal(fetch.mock.callCount(), 0);
});

test('Supabase mode preserves shorter edits and excludes articles removed from the public query', async (t) => {
  env.VITE_BLOG_SOURCE = 'supabase';
  const slug = 'what-is-an-api-restaurant-waiter';
  const fetch = t.mock.method(globalThis, 'fetch', async (input) => {
    const url = new URL(input);
    assert.equal(url.searchParams.get('is_published'), 'eq.true');
    return Response.json([{ slug, title: 'A shorter edit', content: 'Edited copy.', published_at: '2026-11-10' }]);
  });
  const { loadPublishedPosts } = await import('../src/lib/supabase.js?source=db');
  const posts = await loadPublishedPosts();
  assert.deepEqual(posts.map((post) => [post.slug, post.title, post.content]), [[slug, 'A shorter edit', 'Edited copy.']]);
  assert.equal(fetch.mock.callCount(), 1);
});
