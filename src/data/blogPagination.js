export const BLOG_PAGE_SIZE = 6;
export const BLOG_INDEX_PATH = '/blog-index.json';

export function blogPagePath(page) {
  return page === 1 ? '/blog' : `/blog/page/${page}`;
}

export function isBlogListingPath(path) {
  return path === '/blog' || /^\/blog\/page\/[1-9]\d*$/.test(path);
}

export function blogListings(posts) {
  const pageCount = Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE));
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))];

  return new Map(Array.from({ length: pageCount }, (_, index) => {
    const page = index + 1;
    const start = index * BLOG_PAGE_SIZE;
    return [blogPagePath(page), {
      posts: posts.slice(start, start + BLOG_PAGE_SIZE),
      categories,
      totalPosts: posts.length,
      page,
      pageCount,
    }];
  }));
}
