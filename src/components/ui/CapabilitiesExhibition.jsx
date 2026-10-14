import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '../../router/RouterContext';
import { SERVICES } from '../../data/portfolioData';
import { 
  ArrowRight, ArrowUpRight, Check, Zap, Activity, 
  Sparkles, Layers, Code2, Database, ShieldCheck, 
  Globe, Terminal, Play, Pause, ChevronRight
} from 'lucide-react';

const SERVICE_ICONS = {
  'technical-seo': Zap,
  'on-page-seo': Activity,
  'geo-aeo': Sparkles,
  'wordpress-development': Layers,
  'web-development': Code2,
  'full-stack-development': Database,
  'who-surveillance': ShieldCheck,
  'real-time-websockets': Globe,
  'ai-agents': Terminal
};

const SERVICE_BENCHMARKS = {
  'technical-seo': { metric: '99/100', label: 'Lighthouse Speed', note: '0.6s LCP · Zero Layout Shift' },
  'on-page-seo': { metric: 'Rank #1', label: 'Intent Graph', note: 'Entity Search & Content Architecture' },
  'geo-aeo': { metric: 'Top Citation', label: 'AI Retrieval', note: 'ChatGPT & Perplexity Knowledge Graph' },
  'wordpress-development': { metric: 'Sub-140ms', label: 'Server TTFB', note: 'Custom Gutenberg · Redis Object Cache' },
  'web-development': { metric: '60 FPS', label: 'Frame Budget', note: 'React 19 & Next.js Island Hydration' },
  'full-stack-development': { metric: '12.5k', label: 'Req / Sec', note: 'Laravel 11 & Node.js ACID Transactions' },
  'who-surveillance': { metric: '100%', label: 'Math Match', note: 'WHO Polio Surveillance Data Pipeline' },
  'real-time-websockets': { metric: '58ms', label: 'Global Mesh', note: '180+ Nations Concurrent Broadcast' },
  'ai-agents': { metric: '< 380ms', label: 'Reasoning Latency', note: 'WhatsApp & Autonomous Tool Calling' }
};

export default function CapabilitiesExhibition() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const scrollPillsRef = useRef(null);

  const activeService = SERVICES[activeIndex] || SERVICES[0];
  const IconComponent = SERVICE_ICONS[activeService.id] || Zap;
  const benchmark = SERVICE_BENCHMARKS[activeService.id] || { metric: 'Verified', label: 'Execution', note: 'Production Proven' };

  // Optional auto-rotation if user enables it
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Ensure active pill is scrolled into view smoothly on mobile
  useEffect(() => {
    if (!scrollPillsRef.current) return;
    const activeEl = scrollPillsRef.current.querySelector(`[data-pill-index="${activeIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full">
      {/* Top Artistic Controls Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-5 sm:pb-6 mb-6 sm:mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#f97316] font-semibold flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#f97316] animate-ping" />
            How I Can Help You · What I Build
          </p>
          <p className="font-sans text-xs sm:text-sm text-zinc-600 mt-1">
            From fast React frontends to reliable databases and automated AI bots.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 font-mono text-xs text-zinc-800 hover:border-[#f97316] hover:text-[#f97316] transition-all self-start sm:self-auto cursor-pointer shadow-sm"
        >
          {isAutoPlaying ? <Pause className="size-3 text-[#f97316]" /> : <Play className="size-3 text-[#f97316]" />}
          <span>{isAutoPlaying ? 'Auto Tour' : 'Explore What I Build'}</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE TOUCH-SCROLLING CHAPTER PILL STRIP (< lg screens)
      ───────────────────────────────────────────────────────────── */}
      <div 
        ref={scrollPillsRef}
        className="lg:hidden mb-6 -mx-3 px-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-2"
        aria-label="Mobile Chapter Selector"
      >
        {SERVICES.map((s, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={s.id}
              data-pill-index={idx}
              type="button"
              onClick={() => {
                setActiveIndex(idx);
                setIsAutoPlaying(false);
              }}
              className={`shrink-0 rounded-full px-3.5 py-2 font-mono text-xs flex items-center gap-2 border transition-all cursor-pointer ${
                isActive
                  ? 'border-[#f97316] bg-orange-50 text-zinc-950 shadow-sm font-semibold'
                  : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
              }`}
            >
              <span className={isActive ? 'text-[#f97316] font-bold' : 'text-zinc-400'}>
                {s.num}
              </span>
              <span className="font-sans font-medium whitespace-nowrap">
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RESPONSIVE MASTER-DETAIL STUDIO SHOWCASE
      ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        
        {/* DESKTOP COLUMN: Curated Editorial Index (01—09) */}
        <div className="hidden lg:block lg:col-span-5 space-y-1.5">
          {SERVICES.map((service, idx) => {
            const isActive = idx === activeIndex;
            const ItemIcon = SERVICE_ICONS[service.id] || Zap;

            return (
              <button
                key={service.id}
                type="button"
                onMouseEnter={() => {
                  setActiveIndex(idx);
                  setIsAutoPlaying(false);
                }}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={`group relative w-full text-left rounded-2xl p-4 transition-all duration-200 flex items-center justify-between cursor-pointer border ${
                  isActive
                    ? 'border-[#f97316] bg-white text-zinc-950 shadow-[0_4px_20px_rgba(249,115,22,0.1)]'
                    : 'border-transparent bg-transparent text-zinc-500 hover:bg-zinc-100/70 hover:text-zinc-900'
                }`}
              >
                {/* Active Indicator Bar on left */}
                {isActive && (
                  <motion.div
                    layoutId="activeExhibitionBar"
                    className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#f97316]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}

                <div className="flex items-center gap-4 pl-1 min-w-0">
                  <span className={`font-mono text-xs font-bold shrink-0 transition-colors ${
                    isActive ? 'text-[#f97316]' : 'text-zinc-400 group-hover:text-zinc-900'
                  }`}>
                    {service.num}
                  </span>

                  <div className="min-w-0">
                    <h3 className={`font-display text-base sm:text-lg font-semibold truncate transition-colors ${
                      isActive ? 'text-zinc-950' : 'text-zinc-700 group-hover:text-zinc-950'
                    }`}>
                      {service.title}
                    </h3>
                    <p className="font-mono text-[0.68rem] text-zinc-400 group-hover:text-zinc-600 truncate">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <ItemIcon className={`size-4 transition-transform duration-200 ${
                    isActive ? 'text-[#f97316] scale-110' : 'text-zinc-300 group-hover:text-zinc-600'
                  }`} />
                  <ChevronRight className={`size-3.5 transition-transform ${
                    isActive ? 'text-[#f97316] translate-x-1' : 'opacity-0 group-hover:opacity-100 text-zinc-400'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* LIVING ARTBOARD SHOWCASE */}
        <div className="lg:col-span-7 lg:sticky lg:top-28 w-full min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-zinc-200/90 bg-white text-zinc-900 shadow-[0_12px_45px_rgba(0,0,0,0.06)]"
            >
              {/* Grand Photography Header */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-100">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  loading="lazy"
                  className="h-full w-full object-cover filter brightness-[0.92] transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle Ambient Scrim */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" 
                  aria-hidden="true" 
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 flex flex-wrap items-center justify-between gap-2 z-10">
                  <span className="font-mono text-[0.68rem] sm:text-xs font-bold text-zinc-900 rounded-full bg-white/90 px-2.5 sm:px-3 py-1 backdrop-blur-md border border-zinc-200 shadow-sm">
                    Chapter {activeService.num} / 09
                  </span>

                  {/* Benchmark Capsule */}
                  <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#f97316]/40 bg-white/90 px-2.5 sm:px-3 py-1 backdrop-blur-md shadow-sm">
                    <span className="size-1.5 sm:size-2 rounded-full bg-[#f97316] animate-ping" />
                    <span className="font-display font-bold text-xs text-[#f97316]">
                      {benchmark.metric}
                    </span>
                    <span className="font-mono text-[0.65rem] sm:text-[0.68rem] text-zinc-600">
                      {benchmark.label}
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay Sub-Label */}
                <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4 z-10">
                  <p className="font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider text-[#f97316] font-semibold truncate bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-md inline-block">
                    {benchmark.note}
                  </p>
                </div>
              </div>

              {/* Showcase Body Content */}
              <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#f97316]">
                    <IconComponent className="size-4" />
                    <span className="uppercase tracking-wider font-semibold">{activeService.tagline}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-3xl font-bold text-zinc-950 mt-2">
                    {activeService.headline || activeService.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed mt-2.5 sm:mt-3">
                    {activeService.description}
                  </p>
                </div>

                {/* What Gets Shipped (Deliverables Checklist) */}
                <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 sm:p-5 space-y-3">
                  <p className="font-mono text-[0.7rem] sm:text-xs uppercase tracking-wider text-[#f97316] font-semibold flex items-center justify-between">
                    <span>What Gets Delivered:</span>
                    <span className="text-zinc-400 font-mono text-[0.65rem]">{activeService.deliverables.length} Milestones</span>
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {activeService.deliverables.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2 text-xs text-zinc-700 font-sans">
                        <span className="grid size-4 place-items-center rounded-full bg-[#f97316]/10 text-[#f97316] shrink-0 mt-0.5 font-bold text-[0.65rem]">
                          ✓
                        </span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Chips & Scope Link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-zinc-200">
                  <div className="flex flex-wrap gap-1.5">
                    {activeService.tech.slice(0, 4).map((t, ti) => (
                      <span
                        key={ti}
                        className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 font-mono text-[0.65rem] sm:text-[0.68rem] text-zinc-600 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/service#${activeService.id}`}
                    className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 font-mono text-xs font-semibold text-white hover:bg-zinc-800 transition-all group/btn shadow-sm"
                  >
                    <span>View Chapter {activeService.num} Scope</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
