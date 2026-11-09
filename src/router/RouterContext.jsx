import { createContext, useContext } from 'react';

const RouterContext = createContext('/');

export function RouterProvider({ path, children }) {
  return <RouterContext.Provider value={path}>{children}</RouterContext.Provider>;
}

export function Link({ href, children, className = '', roll = false, ...props }) {
  const currentPath = useContext(RouterContext);
  const hrefPath = href.split('#')[0];
  const isActive = currentPath === hrefPath || (hrefPath !== '/' && currentPath.startsWith(hrefPath + '/'));

  if (roll && typeof children === 'string') {
    const letters = children.split('');
    return (
      <a
        href={href}
        aria-current={currentPath === href ? 'page' : undefined}
        className={`group relative flex items-center py-1 text-sm font-medium transition-colors ${
          isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-600 hover:text-zinc-950'
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
          className={`absolute bottom-0 left-0 h-px bg-[#f97316] transition-all duration-300 ${
            isActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </a>
    );
  }

  return (
    <a
      href={href}
      aria-current={currentPath === href ? 'page' : undefined}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
