import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext();

export function RouterProvider({ children }) {
  // Extract initial path + hash
  const getInitialLocation = () => {
    if (typeof window === 'undefined') return { path: '/', hash: '' };
    return {
      path: window.location.pathname || '/',
      hash: window.location.hash.replace('#', '')
    };
  };

  const [location, setLocation] = useState(getInitialLocation);

  // Disable automatic browser scroll restoration so SPA navigations always start at top
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Force scroll-to-top whenever the pathname changes (unless navigating to a hash anchor)
  useEffect(() => {
    if (!location.hash) {
      const resetScroll = () => {
        const prevBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';

        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        document.documentElement.style.scrollBehavior = prevBehavior;
      };

      resetScroll();
      const raf = requestAnimationFrame(resetScroll);
      const timer = setTimeout(resetScroll, 60);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [location.path]);

  useEffect(() => {
    const handlePopState = () => {
      const newLoc = {
        path: window.location.pathname || '/',
        hash: window.location.hash.replace('#', '')
      };
      setLocation(newLoc);

      if (newLoc.hash) {
        setTimeout(() => {
          const el = document.getElementById(newLoc.hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Initial scroll if hash is present on load
    if (window.location.hash) {
      setTimeout(() => {
        const hash = window.location.hash.replace('#', '');
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (to) => {
    let targetPath = to;
    let targetHash = '';

    if (to.includes('#')) {
      const parts = to.split('#');
      targetPath = parts[0] || window.location.pathname || '/';
      targetHash = parts[1] || '';
    }

    // Clean trailing slash
    const cleanTargetPath = (targetPath.replace(/\/$/, '') || '/');
    const cleanCurrentPath = (location.path.replace(/\/$/, '') || '/');

    // If navigating to an anchor on the same page
    if (cleanTargetPath === cleanCurrentPath && targetHash) {
      window.history.pushState({}, '', `${cleanTargetPath}#${targetHash}`);
      setLocation({ path: cleanTargetPath, hash: targetHash });
      const el = document.getElementById(targetHash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // New page navigation
    const fullUrl = targetHash ? `${cleanTargetPath}#${targetHash}` : cleanTargetPath;
    window.history.pushState({}, '', fullUrl);
    setLocation({ path: cleanTargetPath, hash: targetHash });

    if (targetHash) {
      setTimeout(() => {
        const el = document.getElementById(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Match routes based on pathname (ignoring hash)
  let page = 'home';
  let params = { hash: location.hash };

  const cleanPath = location.path.replace(/\/$/, '') || '/';

  if (cleanPath === '/') {
    page = 'home';
  } else if (cleanPath === '/portfolio' || cleanPath === '/work') {
    page = 'portfolio';
  } else if (cleanPath.startsWith('/portfolio/') || cleanPath.startsWith('/work/')) {
    page = 'case-study';
    const parts = cleanPath.split('/');
    params.slug = parts[parts.length - 1];
  } else if (cleanPath === '/service' || cleanPath === '/services') {
    page = 'services';
  } else if (cleanPath === '/about') {
    page = 'about';
  } else if (cleanPath === '/contact') {
    page = 'contact';
  } else {
    page = 'home';
  }

  return (
    <RouterContext.Provider
      value={{
        currentPath: location.path,
        hash: location.hash,
        page,
        params,
        navigate
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

// Reusable Webroco Roll Link or standard Link
export function Link({ href, children, className = '', roll = false, onClick, ...props }) {
  const { navigate, currentPath, hash } = useRouter();

  // Determine active state
  const hrefPath = (href.split('#')[0].replace(/\/$/, '') || '/');
  const hrefHash = href.split('#')[1] || '';
  const currentClean = (currentPath.replace(/\/$/, '') || '/');

  const isActive = hrefHash
    ? (currentClean === hrefPath && hash === hrefHash)
    : (hrefPath === '/' ? currentClean === '/' : currentClean.startsWith(hrefPath));

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(href);
  };

  if (roll && typeof children === 'string') {
    const letters = children.split('');
    return (
      <a
        href={href}
        onClick={handleClick}
        className={`group relative flex items-center py-1 text-sm font-medium transition-colors ${
          isActive ? 'text-[#f8f5ee]' : 'text-[#f8f5ee]/75 hover:text-[#f8f5ee]'
        } ${className}`}
        {...props}
      >
        <span className="group-roll-wrap">
          <span aria-hidden="true" className="block">
            {letters.map((char, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
                style={{ transitionDelay: `${i * 22}ms` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="absolute inset-0 block">
            {letters.map((char, i) => (
              <span
                key={i}
                className="inline-block translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                style={{ transitionDelay: `${i * 22}ms` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
          <span className="sr-only">{children}</span>
        </span>
        <span
          className={`absolute bottom-0 left-0 h-px bg-[#e85a2d] transition-all duration-300 ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
