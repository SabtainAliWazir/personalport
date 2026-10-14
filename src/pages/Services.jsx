import React, { useState, useEffect, useRef } from 'react';
import { useRouter, Link } from '../router/RouterContext';
import { SERVICES, SERVICE_RAIL, TECH_MARQUEE } from '../data/portfolioData';
import ServiceHUDCanvas from '../components/ui/ServiceHUDCanvas';
import ExpandingArrowButton from '../components/ui/ExpandingArrowButton';
import GlareCard from '../components/ui/GlareCard';
import { 
  ArrowRight, ArrowDown, ChevronDown, CheckCircle2, 
  Sparkles, Layers, ShieldCheck, Activity, Terminal, Database, Code2, Eye 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Services() {
  const { currentPath, hash } = useRouter();
  const [activeServiceId, setActiveServiceId] = useState(hash || 'wordpress-development');
  const [expandedMap, setExpandedMap] = useState(
    SERVICES.reduce((acc, s) => ({ ...acc, [s.id]: true }), {})
  );
  const [desktopViewMode, setDesktopViewMode] = useState('photo'); // 'photo' | 'simulator'

  const toggleExpand = (id) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Sync hash from router or window on route load
  useEffect(() => {
    const targetHash = hash || window.location.hash.replace('#', '');
    if (targetHash && SERVICES.some((s) => s.id === targetHash)) {
      setActiveServiceId(targetHash);
      setTimeout(() => {
        const el = document.getElementById(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    }
  }, [hash]);

  // IntersectionObserver to sync sticky HUD canvas with active chapter in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280;
      for (const service of SERVICES) {
        const el = document.getElementById(service.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveServiceId(service.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeServiceIndex = SERVICES.findIndex((s) => s.id === activeServiceId);
  const activeService = SERVICES[activeServiceIndex] || SERVICES[3];

  return (
    <div className="min-h-screen bg-white text-zinc-950 pt-28 sm:pt-36 pb-24">
      {/* ─────────────────────────────────────────────────────────────
          1. SERVICES CHAPTER HERO HEADER
      ───────────────────────────────────────────────────────────── */}
      <section id="services-chapter" aria-labelledby="services-chapter-title" className="gutter mx-auto max-w-[78rem] pb-12 border-b border-zinc-200">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-3 text-[#f97316]">[ Capabilities ]</p>
            <h1 id="services-chapter-title" className="display-h1 text-zinc-950">
              Services built to solve problems.
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lead font-sans text-zinc-600">
              Choose the service that fits your project goals. Here is exactly what is included in each build so you get clear outcomes.
            </p>
          </div>
        </div>

        {/* Jump Navigation Grid with Active Glowing Capsule */}
        <div className="mt-12 pt-8 border-t border-zinc-200">
          <nav aria-label="Jump to a service">
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setActiveServiceId(s.id)}
                    className={`group flex items-baseline gap-2.5 rounded-xl border py-3 px-4 font-mono text-xs transition-all duration-200 ${
                      activeServiceId === s.id
                        ? 'border-[#f97316] bg-[#f97316]/10 text-zinc-950 font-semibold shadow-sm'
                        : 'border-zinc-200 bg-zinc-50/70 text-zinc-600 hover:border-[#f97316]/40 hover:text-zinc-950'
                    }`}
                  >
                    <span className="shrink-0 text-[#f97316] font-semibold">{s.num}</span>
                    <span className="truncate font-sans font-medium">{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THE THROUGH-LINE (Continuous Horizontal Media Rail)
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="positioning-title" className="overflow-hidden bg-zinc-50/80 border-y border-zinc-200 text-zinc-950 my-16 py-12 sm:py-16">
        <div className="gutter mx-auto max-w-[78rem]">
          <p className="label-mono mb-4 text-zinc-400">The through line</p>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="positioning-title" className="font-display text-[clamp(1.75rem,3.4vw,2.85rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-zinc-950">
              Good engineering comes from <span className="text-[#f97316]">clear decisions</span> and reliable execution.
              <span aria-hidden="true" className="ml-1.5 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] bg-[#f97316] animate-pulse" />
            </h2>
          </div>
        </div>

        {/* Continuous Horizontal Image Rail with Real High-Res Photography */}
        <div className="relative border-y border-zinc-200 py-8 mt-10">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-50 to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-50 to-transparent" />

          <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="animate-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
              {[...SERVICE_RAIL, ...SERVICE_RAIL].map((card, idx) => (
                <figure
                  key={idx}
                  className="group w-[min(72vw,23rem)] shrink-0 sm:w-[min(38vw,23rem)] lg:w-[min(23vw,22rem)] cursor-pointer"
                >
                  <div className="relative aspect-[1.08] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/85 to-transparent px-4 pb-4 pt-12 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-white/90 flex justify-between items-end">
                      <span>{card.caption}</span>
                      <span className="text-[0.65rem] text-[#f97316] font-bold">{card.id}</span>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. PROOF POINTS RIBBON
      ───────────────────────────────────────────────────────────── */}
      <section aria-label="Proof points" className="gutter max-w-[78rem] mx-auto border-b border-zinc-200 py-12">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-l border-zinc-200 pl-5 first:border-l-0 first:pl-0">
            <dd className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#f97316] tabular-nums">
              18+
            </dd>
            <dt className="label-metric mt-2 text-xs font-mono uppercase tracking-[0.12em] text-zinc-500">
              Companies served
            </dt>
          </div>

          <div className="border-l border-zinc-200 pl-5 first:border-l-0 first:pl-0">
            <dd className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#f97316] tabular-nums">
              4+ yrs
            </dd>
            <dt className="label-metric mt-2 text-xs font-mono uppercase tracking-[0.12em] text-zinc-500">
              Specialist engineering
            </dt>
          </div>

          <div className="border-l border-zinc-200 pl-5 first:border-l-0 first:pl-0">
            <dd className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#f97316] tabular-nums">
              #1
            </dd>
            <dt className="label-metric mt-2 text-xs font-mono uppercase tracking-[0.12em] text-zinc-500">
              Lighthouse 99+ Speed
            </dt>
          </div>

          <div className="border-l border-zinc-200 pl-5 first:border-l-0 first:pl-0">
            <dd className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#f97316] tabular-nums">
              180+
            </dd>
            <dt className="label-metric mt-2 text-xs font-mono uppercase tracking-[0.12em] text-zinc-500">
              WOAH country delegates
            </dt>
          </div>
        </dl>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PLATFORM ECOSYSTEM TICKER (16 PLATFORMS)
      ───────────────────────────────────────────────────────────── */}
      <section aria-label="Technology and platform ecosystem" className="overflow-hidden border-b border-zinc-200 py-6">
        <div className="gutter mb-4 flex items-baseline justify-between gap-4 max-w-[78rem] mx-auto">
          <p className="eyebrow text-[#f97316]">[ Built where the work lives ]</p>
          <p className="label-mono text-zinc-400">16 Core Technologies</p>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="animate-marquee flex items-center gap-10">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, idx) => (
              <div
                key={idx}
                className="flex shrink-0 items-center gap-3 text-zinc-500 hover:text-zinc-950 transition-colors"
              >
                <span className="font-display text-xl font-medium tracking-tight text-zinc-800">
                  {tech.name}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-zinc-500">
                  {tech.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. INTERACTIVE 2-COLUMN STICKY-SCROLL CAPABILITIES ENGINE
      ───────────────────────────────────────────────────────────── */}
      <section data-service-root="true" className="gutter max-w-[78rem] mx-auto mt-16 sm:mt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Desktop Sticky Visual Viewport (Photo + Live HUD Toggle) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28 h-[70vh] flex flex-col justify-between">
              {/* Mode Switcher Pill */}
              <div className="mb-3 flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-500">
                  {activeService.num} / 09 Capability
                </span>

                <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => setDesktopViewMode('photo')}
                    className={`rounded-full px-3 py-1 text-[0.68rem] font-mono transition-all ${
                      desktopViewMode === 'photo'
                        ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-950'
                    }`}
                  >
                    Editorial Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setDesktopViewMode('simulator')}
                    className={`rounded-full px-3 py-1 text-[0.68rem] font-mono transition-all ${
                      desktopViewMode === 'simulator'
                        ? 'bg-[#f97316] text-white font-semibold shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-950'
                    }`}
                  >
                    Live HUD
                  </button>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  {desktopViewMode === 'photo' ? (
                    <motion.figure
                      key={`photo-${activeService.id}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full w-full overflow-hidden rounded-[1.25rem] border border-zinc-200 bg-white shadow-xl group"
                    >
                      <img
                        src={activeService.image}
                        alt={activeService.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 to-transparent p-5 font-mono text-xs text-white/95 flex justify-between items-end">
                        <div>
                          <span className="block text-sm font-display font-semibold text-white">
                            {activeService.title}
                          </span>
                          <span className="text-[0.68rem] text-[#f97316] uppercase tracking-wider mt-0.5 block font-semibold">
                            {activeService.tagline}
                          </span>
                        </div>
                        <span className="rounded-full bg-zinc-900/80 px-2.5 py-1 text-white border border-white/20">
                          {activeService.num} / 09
                        </span>
                      </figcaption>
                    </motion.figure>
                  ) : (
                    <motion.div
                      key={`hud-${activeService.id}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      <ServiceHUDCanvas serviceId={activeServiceId} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Scrollable 01-09 Capability Articles */}
          <div className="lg:col-span-7 space-y-20">
            {SERVICES.map((service) => {
              const isExpanded = expandedMap[service.id] ?? true;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-28 border-b border-zinc-200 pb-16 last:border-0 group/article"
                >
                  {/* High-Resolution Editorial Photography Banner */}
                  <figure className="relative overflow-hidden rounded-[1.1rem] border border-zinc-200 bg-white mb-6 shadow-md group/media">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="aspect-[4/3] sm:aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:scale-[1.025]"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/85 to-transparent px-4 pb-4 pt-10 font-mono text-xs text-white/90 flex justify-between items-end">
                      <span>{service.num} / 09</span>
                      <span className="text-[0.68rem] text-[#f97316] uppercase tracking-wider font-semibold">
                        {service.tagline}
                      </span>
                    </figcaption>
                  </figure>

                  {/* Header Row with Toggle Button */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="label-mono text-zinc-400">
                        {service.num} / 09 / Capability
                      </p>
                      <h2 className="display-h3 mt-2 text-zinc-950 group-hover/article:text-[#f97316] transition-colors">
                        {service.title}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(service.id)}
                      aria-label={`Toggle ${service.title} details`}
                      className="grid size-11 shrink-0 place-items-center rounded-full border border-zinc-200 text-zinc-700 transition-all hover:border-[#f97316] hover:text-[#f97316] active:scale-[0.97]"
                    >
                      <span className="font-mono text-lg font-bold">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                  </div>

                  {/* Accordion Expand/Collapse Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5">
                          {/* Catchphrase & Description */}
                          <p className="font-display text-xl sm:text-2xl font-medium text-[#f97316] leading-tight">
                            {service.catchphrase}
                          </p>

                          <p className="mt-4 text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
                            {service.description}
                          </p>

                          {/* Scoped Deliverables with Animated Arrow Markers ↳ */}
                          <div className="mt-8">
                            <p className="label-mono mb-3 text-zinc-400">Included Deliverables</p>
                            <ul className="grid gap-0">
                              {service.deliverables.map((deliv, di) => (
                                <li
                                  key={di}
                                  className="group/item flex items-baseline gap-3 border-t border-zinc-100 py-3 text-xs sm:text-sm text-zinc-700 transition-colors duration-200 hover:text-zinc-950 hover:bg-zinc-50 px-2 rounded-md"
                                >
                                  <span aria-hidden="true" className="shrink-0 text-[#f97316] font-mono font-bold transition-transform duration-200 group-hover/item:translate-x-1">
                                    ↳
                                  </span>
                                  <span className="font-sans leading-relaxed">{deliv}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action CTA Pill */}
                          <div className="mt-8">
                            <Link
                              href="/contact"
                              className="group inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.12em] text-zinc-800 transition-all hover:border-[#f97316] hover:bg-[#f97316] hover:text-white shadow-sm active:scale-[0.97]"
                            >
                              <span>Discuss this service</span>
                              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 font-sans">
                                →
                              </span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. BOTTOM CONSULTATION CTA
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter max-w-[78rem] mx-auto mt-24 text-center">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50/80 p-10 sm:p-14 shadow-sm">
          <p className="eyebrow mb-2 text-[#f97316]">Ready to Start?</p>
          <h2 className="display-h2 max-w-xl mx-auto text-zinc-950">
            Have a system to engineer? Let&#39;s talk.
          </h2>
          <p className="mt-4 max-w-md mx-auto text-sm text-zinc-600 font-sans">
            Available for enterprise contracts, WordPress headless builds, WHO/WOAH-grade pipelines, and autonomous AI agents.
          </p>
          <div className="mt-8 flex justify-center">
            <ExpandingArrowButton href="/contact" accentColor="#f97316">
              Schedule a Consultation
            </ExpandingArrowButton>
          </div>
        </div>
      </section>
    </div>
  );
}
