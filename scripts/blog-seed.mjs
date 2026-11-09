import { FALLBACK_BLOG_POSTS } from '../src/lib/supabase.js';

const posts = FALLBACK_BLOG_POSTS.map(({ slug, title, summary, simple_analogy, category, read_time, published_at, content }) =>
  ({ slug, title, summary, simple_analogy, category, read_time, published_at, content })
);
const json = JSON.stringify(posts);
if (json.includes('$portfolio_posts$')) throw new Error('SQL delimiter occurs in article content.');

console.log(`insert into public.posts
  (slug, title, summary, simple_analogy, category, read_time, published_at, content, is_published)
select slug, title, summary, simple_analogy, category, read_time, published_at, content, true
from jsonb_to_recordset($portfolio_posts$${json}$portfolio_posts$::jsonb)
as post(slug text, title text, summary text, simple_analogy text, category text,
  read_time text, published_at date, content text)
on conflict (slug) do nothing;`);
