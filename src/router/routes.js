import { FEATURED_SERVICES, PROJECTS, SERVICES } from '../data/portfolioData.js';

const pages = {
  '/': () => import('../pages/Home.jsx'),
  '/portfolio': () => import('../pages/Portfolio.jsx'),
  '/service': () => import('../pages/Services.jsx'),
  '/about': () => import('../pages/About.jsx'),
  '/contact': () => import('../pages/Contact.jsx'),
  '/blog': () => import('../pages/Blog.jsx'),
};

export function publicPaths(posts) {
  return [
    ...Object.keys(pages),
    ...PROJECTS.map(({ slug }) => `/portfolio/${slug}`),
    ...Object.keys(FEATURED_SERVICES).map((slug) => `/service/${slug}`),
    ...posts.map(({ slug }) => `/blog/${slug}`),
  ];
}

export function canonicalPath(path) {
  return (path.replace(/\/+$/, '') || '/')
    .replace(/^\/work(?=\/|$)/, '/portfolio')
    .replace(/^\/services(?=\/|$)/, '/service')
    .replace(/^\/blogs$/, '/blog');
}

export async function loadRoute(path, payload) {
  let pageProps = {};
  const [, section, slug, ...rest] = path.split('/');
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
  } else if (path === '/blog' || (!rest.length && slug && section === 'blog')) {
    if (import.meta.env.DEV && payload === undefined) {
      const { loadPublishedPosts, blogIndex } = await import('../lib/supabase.js');
      const posts = await loadPublishedPosts();
      payload = slug ? { post: posts.find((item) => item.slug === slug) } : { posts: blogIndex(posts) };
    }
    if (slug && payload?.post) loadPage = () => import('../pages/BlogPost.jsx');
    pageProps = payload || { posts: [] };
  }

  const { default: Page } = await (loadPage || (() => import('../pages/NotFound.jsx')))();
  return { Page, pageProps };
}
