import React, { useState, useEffect, useRef } from 'react';
import { useRouter, Link } from '../../router/RouterContext';
import { SERVICES } from '../../data/portfolioData';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { currentPath } = useRouter();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [currentPath]);

  const navItems = [
    { label: 'Work', href: '/portfolio', num: '01' },
    { label: 'Services', href: '/service', num: '02', isDropdown: true },
    { label: 'About', href: '/about', num: '03' },
    { label: 'Contact', href: '/contact', num: '04' }
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-4 sm:top-5 z-[10001] px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="mx-auto flex h-16 w-full max-w-[78rem] items-center justify-between rounded-full border border-[#f8f5ee]/15 bg-[#100904] px-4 sm:px-6 shadow-[0_1.5rem_4rem_rgba(16,9,4,0.35)] backdrop-blur-md pointer-events-auto transition-[background-color,border-color,box-shadow] duration-300">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 leading-none flex items-center group focus-visible:outline-none"
          >
            <span className="font-display text-[clamp(1.15rem,1.6vw,1.6rem)] font-semibold tracking-[-0.04em] text-[#f8f5ee] group-hover:text-white transition-colors">
              sabtain
            </span>
            <span className="text-[#e85a2d] text-xl font-bold leading-none">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-[2.2vw] lg:flex text-[#f8f5ee]/75" aria-label="Primary">
            <Link href="/portfolio" roll={true}>
              Work
            </Link>

            {/* Services Dropdown */}
            <div className="relative flex" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                onMouseEnter={() => setServicesOpen(true)}
                className="group inline-flex items-center gap-1 py-1 text-sm font-medium transition-colors hover:text-[#f8f5ee] focus-visible:outline-none"
              >
                <span className="group-roll-wrap">
                  <span aria-hidden="true" className="block">
                    {'Services'.split('').map((char, i) => (
                      <span
                        key={i}
                        className="inline-block transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
                        style={{ transitionDelay: `${i * 22}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <span aria-hidden="true" className="absolute inset-0 block">
                    {'Services'.split('').map((char, i) => (
                      <span
                        key={i}
                        className="inline-block translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                        style={{ transitionDelay: `${i * 22}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="sr-only">Services</span>
                </span>
                <ChevronDown
                  className={`size-3 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-[#e85a2d]' : 'text-[#f8f5ee]/50'
                  }`}
                />
              </button>

              {/* Dropdown Menu (Cream Background with Walnut Text) */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute left-1/2 top-full mt-3 w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 origin-top rounded-[1.25rem] bg-[#f8f5ee] p-2 text-[#100904] shadow-[0_1.5rem_4rem_rgba(16,9,4,0.3)] border border-[#100904]/10"
                  >
                    <p className="px-4 pb-1 pt-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[#100904]/40">
                      Core Engineering Capabilities
                    </p>
                    <div className="mt-1 space-y-0.5">
                      {SERVICES.slice(0, 4).map((srv) => (
                        <Link
                          key={srv.id}
                          href={`/service#${srv.id}`}
                          className="block rounded-[0.9rem] px-4 py-2.5 transition-colors hover:bg-[#100904]/8 focus-visible:outline-none"
                        >
                          <div className="flex items-center justify-between">
                            <span className="block text-sm font-semibold text-[#100904]">
                              {srv.title}
                            </span>
                            <span className="font-mono text-xs text-[#e85a2d] font-semibold">
                              {srv.num}
                            </span>
                          </div>
                          <span className="mt-0.5 block text-xs text-[#100904]/55 line-clamp-1">
                            {srv.tagline}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/service"
                      className="group mt-1 flex items-center justify-between rounded-[0.9rem] border-t border-[#100904]/10 px-4 py-3 text-sm font-semibold text-[#100904] transition-colors hover:bg-[#100904]/8"
                    >
                      <span>All capabilities</span>
                      <span className="text-[#e85a2d] transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" roll={true}>
              About
            </Link>

            <Link href="/contact" roll={true}>
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="h-11 bg-[#f8f5ee] text-[#100904] hover:bg-white inline-flex items-center rounded-full px-5 text-sm font-semibold transition-[background-color,transform] duration-200 active:scale-[0.97]"
            >
              Let&#39;s Talk
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="grid size-11 place-items-center rounded-full border border-[#f8f5ee]/30 text-[#f8f5ee] hover:border-[#f8f5ee] lg:hidden transition-colors"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#100904]/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="gutter flex-1 overflow-y-auto pt-[14vh] pb-[6vh]">
              <nav className="flex flex-col" aria-label="Mobile">
                <p className="label-mono mb-[2vh] text-[#f8f5ee]/35">Menu</p>

                <div className="space-y-0">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-t border-[#f8f5ee]/10 last:border-b"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex min-h-14 items-baseline gap-[4vw] py-[1.6vh] group"
                      >
                        <span className="label-mono text-[#f8f5ee]/35 group-hover:text-[#e85a2d] transition-colors">
                          {item.num}
                        </span>
                        <span className="text-[clamp(1.35rem,6.5vw,2rem)] font-display font-semibold text-[#f8f5ee] group-hover:text-[#e85a2d] transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Mobile Quick Service List */}
              <div className="mt-[5vh]">
                <p className="label-mono mb-[1.5vh] text-[#f8f5ee]/35">Core Capabilities</p>
                <div className="grid grid-cols-1 gap-2">
                  {SERVICES.slice(0, 3).map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/service#${srv.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex min-h-12 items-center justify-between gap-3 rounded-[0.9rem] border border-[#f8f5ee]/10 bg-white/[0.02] px-4 py-3 transition-colors active:border-[#e85a2d]"
                    >
                      <div className="min-w-0">
                        <span className="block text-sm font-medium text-[#f8f5ee]">{srv.title}</span>
                        <span className="mt-0.5 block truncate text-xs text-[#f8f5ee]/45">
                          {srv.tagline}
                        </span>
                      </div>
                      <ArrowRight className="size-3.5 text-[#e85a2d] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Contact */}
              <div className="mt-8 pt-4 border-t border-[#f8f5ee]/10 flex items-center justify-between">
                <span className="label-mono text-[#f8f5ee]/45">Islamabad / Worldwide</span>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-10 items-center rounded-full bg-[#f8f5ee] px-5 text-sm font-semibold text-[#100904]"
                >
                  Let&#39;s Talk
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
