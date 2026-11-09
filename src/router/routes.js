import { FEATURED_SERVICES, PROJECTS, SERVICES } from '../data/portfolioData.js';
import { blogListings, isBlogListingPath } from '../data/blogPagination.js';

const pages = {
  '/': () => import('../pages/Home.jsx'),
  '/portfolio': () => import('../pages/Portfolio.jsx'),
  '/service': () => import('../pages/Services.jsx'),
  '/about': () => import('../pages/About.jsx'),
  '/contact': () => import('../pages/Contact.jsx'),
};

export function publicPaths(posts, listingPaths) {
  return [
    ...Object.keys(pages),
    ...PROJECTS.map(({ slug }) => `/portfolio/${slug}`),
    ...Object.keys(FEATURED_SERVICES).map((slug) => `/service/${slug}`),
    ...listingPaths,
    ...posts.map(({ slug }) => `/blog/${slug}`),
  ];
}

export function canonicalPath(path) {
  return (path.replace(/\/+$/, '') || '/')
    .replace(/^\/work(?=\/|$)/, '/portfolio')
    .replace(/^\/services(?=\/|$)/, '/service')
    .replace(/^\/blogs$|^\/blog\/page\/1$/, '/blog');
}

export async function loadRoute(path, payload) {
  let pageProps = {};
  const [, section, slug, ...rest] = path.split('/');
  const isBlogListing = isBlogListingPath(path);
  let loadPage = Object.hasOwn(pages, path) ? pages[path] : undefined;
  if (!rest.length && slug && section === 'portfolio') {
    const project = PROJECTS.find((item) => item.slug === slug);
    if (project) {
      loadPage = () => import('../pages/CaseStudy.jsx');
      pageProps = { project };
    }
  } else if (!rest.length && slug && section === 'service' && Object.hasOwn(FEATURED_SERVICES, slug)) {
    const service = SERVICES.find(({ id }) => id === slug);
    loadPage = () => import('../pages/ServiceDetail.jsx');
    pageProps = { service, featured: FEATURED_SERVICES[slug] };
  } else if (isBlogListing || (!rest.length && slug && section === 'blog')) {
    if (import.meta.env.DEV && payload === undefined) {
      const { loadPublishedPosts, blogIndex } = await import('../lib/supabase.js');
      const posts = await loadPublishedPosts();
      if (isBlogListing) {
        const index = blogIndex(posts);
        const listing = blogListings(index).get(path);
        if (listing) payload = { ...listing, searchIndex: index };
      } else {
        payload = { post: posts.find((item) => item.slug === slug) };
      }
    }
    if (isBlogListing && payload?.posts) loadPage = () => import('../pages/Blog.jsx');
    else if (payload?.post) loadPage = () => import('../pages/BlogPost.jsx');
    pageProps = payload || {};
  }

  const { default: Page } = await (loadPage || (() => import('../pages/NotFound.jsx')))();
  return { Page, pageProps };
}
