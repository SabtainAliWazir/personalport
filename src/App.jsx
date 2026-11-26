import { MotionConfig } from 'framer-motion';
import { RouterProvider } from './router/RouterContext';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

export default function App({ path, Page, pageProps }) {
  return (
    <RouterProvider path={path}>
      <MotionConfig reducedMotion="user">
        <div id="app-shell" className="relative flex min-h-screen flex-col bg-white text-zinc-950 selection:bg-orange-200">
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-[10002] focus:bg-white focus:p-3">
            Skip to content
          </a>
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1">
            <Page {...pageProps} />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </RouterProvider>
  );
}
