import React, { useEffect } from 'react';
import './styles/global.css';
import { RouterProvider, useRouter } from './router/RouterContext';
import PageTransitionLoader from './components/ui/PageTransitionLoader';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';

// Pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function MainContent() {
  const { page } = useRouter();

  // Scroll to top immediately whenever the active page view updates
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'portfolio':
        return <Portfolio />;
      case 'case-study':
        return <CaseStudy />;
      case 'services':
        return <Services />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'blog':
        return <Blog />;
      case 'blog-post':
        return <BlogPost />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0c0a08] text-[#FAF7F2] selection:bg-[#10b981] selection:text-[#0c0a08] flex flex-col justify-between">
      <Navbar />
      <main id="main" className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      {/* Upward Architectural Page Transition Loader (Runs on initial load & every route change) */}
      <PageTransitionLoader />

      {/* Main App Canvas */}
      <div className="relative min-h-screen">
        <CustomCursor />
        <MainContent />
      </div>
    </RouterProvider>
  );
}
