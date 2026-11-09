import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { canonicalPath, loadRoute } from './router/routes.js';
import './styles/global.css';

const root = document.getElementById('root');
const data = document.getElementById('page-data');
const path = data?.dataset.path || canonicalPath(window.location.pathname);

loadRoute(path, data ? JSON.parse(data.textContent) : undefined).then(({ Page, pageProps }) => {
  const app = <App path={path} Page={Page} pageProps={pageProps} />;
  if (data) hydrateRoot(root, app);
  else createRoot(root).render(app);
});
