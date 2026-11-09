import { lazy, Suspense, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { RouterProvider } from './router/RouterContext';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

const AIChat = lazy(() => import('./components/AIChat'));

export default function App({ path, Page, pageProps }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <RouterProvider path={path}>
      <MotionConfig reducedMotion="user">
        <div id="app-shell" className="relative min-h-screen bg-white text-zinc-950 selection:bg-orange-200 flex flex-col">
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-[10002] focus:top-2 focus:left-4 focus:bg-white focus:p-3">
            Skip to content
          </a>
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1">
            <Page {...pageProps} />
          </main>
          <Footer />
          {chatOpen ? (
            <Suspense fallback={null}>
              <AIChat initiallyOpen />
            </Suspense>
          ) : (
            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="fixed bottom-5 right-5 z-40 rounded-full border border-orange-600 bg-orange-700 px-4 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Portfolio assistant
            </button>
          )}
        </div>
      </MotionConfig>
    </RouterProvider>
  );
}
