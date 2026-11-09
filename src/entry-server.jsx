import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { loadRoute, publicPaths } from './router/routes.js';
import { blogIndex, loadPublishedPosts } from './lib/supabase.js';
import { absoluteUrl } from './data/site.js';

export { absoluteUrl, blogIndex, loadPublishedPosts, publicPaths };

export async function renderPage(path, payload) {
  const { Page, pageProps } = await loadRoute(path, payload);
  return renderToString(<App path={path} Page={Page} pageProps={pageProps} />);
}
