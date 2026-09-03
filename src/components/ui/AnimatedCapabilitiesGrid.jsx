import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '../../router/RouterContext';
import { SERVICES } from '../../data/portfolioData';
import { 
  ArrowRight, ArrowUpRight, Sparkles, Activity, ShieldCheck, 
  Zap, Globe, Database, Terminal, Code2, Layers, CheckCircle2,
  Filter
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All 9 Capabilities' },
  { id: 'search', label: 'Search & AI Engines' },
  { id: 'web', label: 'Web & CMS Builds' },
  { id: 'enterprise', label: 'Global Systems & Backends' }
];

// Map each service to specific category and micro-metric HUD
const SERVICE_META = {
  'technical-seo': {
    category: 'search',
    badge: '99/100 Lighthouse',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    icon: Zap,
    metricText: '0.6s LCP · 0 Cumulative Layout Shift'
  },
  'on-page-seo': {
    category: 'search',
    badge: 'High Intent Mapping',
    badgeColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    icon: Activity,
    metricText: 'Semantic Entity Graph & Internal Links'
  },
  'geo-aeo': {
    category: 'search',
    badge: 'AI Engine Citations',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    icon: Sparkles,
    metricText: 'Perplexity & ChatGPT Structured Data'
  },
  'wordpress-development': {
    category: 'web',
    badge: 'Zero Page-Builder Tax',
    badgeColor: 'text-[#e85a2d] border-[#e85a2d]/30 bg-[#e85a2d]/10',
    icon: Layers,
    metricText: 'Sub-140ms TTFB · Redis Object Cache'
  },
  'web-development': {
    category: 'web',
    badge: '60 FPS React 19',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    icon: Code2,
    metricText: 'Next.js App Router · Zero Layout Shift'
  },
  'full-stack-development': {
    category: 'web',
    badge: '12.5k Req/Sec Capacity',
    badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    icon: Database,
    metricText: 'Laravel 11 & Node.js · ACID Locks'
  },
  'who-surveillance': {
    category: 'enterprise',
    badge: '100% Mathematical Match',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    icon: ShieldCheck,
    metricText: 'WHO Polio Surveillance Data Pipeline'
  },
  'real-time-websockets': {
    category: 'enterprise',
    badge: '58ms Broadcast Mesh',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    icon: Globe,
    metricText: '180+ Nations · Multi-Delegate Sync'
  },
  'ai-agents': {
    category: 'enterprise',
    badge: '< 380ms Tool Calling',
    badgeColor: 'text-[#e85a2d] border-[#e85a2d]/30 bg-[#e85a2d]/10',
    icon: Terminal,
    metricText: 'Autonomous WhatsApp & LLM Agents'
  }
};

export default function AnimatedCapabilitiesGrid() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Filter services
  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'all') return true;
    const meta = SERVICE_META[service.id];
    return meta && meta.category === activeCategory;
  });

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full"
    >
      {/* Dynamic Cursor Spotlight Ray */}
      <div 
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden lg:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(232, 90, 45, 0.08), transparent 80%)`
        }}
        aria-hidden="true"
      />

      {/* Category Filter Pills Bar */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#f8f5ee]/10 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative rounded-full px-4 py-2 font-mono text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border border-[#e85a2d] bg-[#e85a2d]/15 text-[#f8f5ee] shadow-[0_0_20px_rgba(232,90,45,0.3)] font-semibold'
                    : 'border border-[#f8f5ee]/10 bg-white/[0.02] text-[#f8f5ee]/60 hover:border-[#f8f5ee]/30 hover:text-[#f8f5ee]'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryDot"
                    className="ml-2 inline-block size-1.5 rounded-full bg-[#e85a2d]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <span className="font-mono text-xs text-[#f8f5ee]/40 hidden sm:block">
          Showing {filteredServices.length} of 09 Capabilities
        </span>
      </div>

      {/* Interactive 3-Column Animated Cards Grid */}
      <motion.div 
        layout 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {filteredServices.map((service, idx) => {
            const meta = SERVICE_META[service.id] || {
              badge: 'Production Proven',
              badgeColor: 'text-[#e85a2d] border-[#e85a2d]/30 bg-[#e85a2d]/10',
              icon: Zap,
              metricText: 'Full-Stack Architecture'
            };
            const IconComponent = meta.icon;
            const isHovered = hoveredCardId === service.id;

            return (
              <motion.article
                layout
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onMouseEnter={() => setHoveredCardId(service.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#f8f5ee]/10 bg-[#100904] transition-all duration-500 hover:border-[#e85a2d]/60 hover:shadow-[0_1.5rem_4rem_rgba(16,9,4,0.7)]"
              >
                {/* Visual Editorial Image Header with Cinematic Hover Zoom */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1a120b]">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108 filter brightness-[0.88] group-hover:brightness-100"
                  />

                  {/* Gradient Scrim & Vignette */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-[#100904] via-[#100904]/40 to-transparent" 
                    aria-hidden="true" 
                  />

                  {/* Top Bar on Image: Number & Micro-HUD Badge */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <span className="font-mono text-xs font-bold text-[#e85a2d] rounded-md bg-[#100904]/85 px-2 py-0.5 backdrop-blur-md border border-[#f8f5ee]/10">
                      {service.num}
                    </span>

                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold backdrop-blur-md shadow-sm ${meta.badgeColor}`}>
                      <span className="size-1.5 rounded-full bg-current animate-pulse" />
                      {meta.badge}
                    </span>
                  </div>

                  {/* Bottom Sub-Metric Bar on Image */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10">
                    <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[#f8f5ee]/70 truncate">
                      {meta.metricText}
                    </p>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    {/* Tagline */}
                    <p className="font-mono text-[0.68rem] uppercase tracking-wider text-[#e85a2d] font-semibold">
                      {service.tagline}
                    </p>

                    {/* Title */}
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] mt-2 text-[#f8f5ee] group-hover:text-[#e85a2d] transition-colors flex items-center justify-between">
                      <Link href={`/service#${service.id}`} className="hover:underline">
                        {service.title}
                      </Link>
                      <IconComponent className="size-5 text-[#f8f5ee]/40 group-hover:text-[#e85a2d] transition-transform duration-300 group-hover:scale-110" />
                    </h3>

                    {/* Problem-Solving Description */}
                    <p className="mt-3 text-xs sm:text-sm text-[#f8f5ee]/65 leading-relaxed font-sans">
                      {service.description}
                    </p>

                    {/* Key Deliverables Checklist */}
                    <div className="mt-5 border-t border-[#f8f5ee]/10 pt-4 space-y-2">
                      <p className="font-mono text-[0.68rem] uppercase tracking-wider text-[#f8f5ee]/40">
                        Included Deliverables:
                      </p>
                      {service.deliverables.slice(0, 3).map((d, di) => (
                        <div key={di} className="flex items-start gap-2 text-xs text-[#f8f5ee]/80 font-sans">
                          <span className="text-[#e85a2d] font-bold text-xs mt-0.5">✓</span>
                          <span className="line-clamp-1">{d}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-[#f8f5ee]/10">
                      {service.tech.slice(0, 3).map((t, ti) => (
                        <span
                          key={ti}
                          className="rounded-md border border-[#f8f5ee]/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[0.65rem] text-[#f8f5ee]/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="mt-6 pt-4 border-t border-[#f8f5ee]/10 flex items-center justify-between">
                    <Link
                      href={`/service#${service.id}`}
                      className="group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[#e85a2d] hover:text-[#f8f5ee] transition-colors"
                    >
                      <span className="font-semibold">Explore full scope</span>
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                    </Link>

                    <span className="text-[0.68rem] font-mono text-[#f8f5ee]/30">
                      Chapter {service.num}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
