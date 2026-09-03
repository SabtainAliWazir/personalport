import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, Link } from '../router/RouterContext';
import { PROJECTS } from '../data/portfolioData';
import Perspective3DCard from '../components/ui/Perspective3DCard';
import ProjectTelemetryModal from '../components/ui/ProjectTelemetryModal';
import { 
  ArrowRight, ArrowLeft, Filter, ExternalLink, Sparkles, 
  Terminal, Play, Pause, ChevronLeft, ChevronRight, 
  ShieldCheck, Database, Code2, Volume2, VolumeX, Activity, 
  ArrowUpRight, Cpu, Layers
} from 'lucide-react';

const CATEGORIES = [
  'All Works',
  'Mission-Critical GovTech',
  'Enterprise Platform',
  'Autonomous AI Agents',
  'LegalTech & Automation',
  'E-Commerce Engineering'
];

// Project accent colors for dynamic atmospheric illumination
const PROJECT_THEMES = {
  'who-eacr': { glow: 'rgba(14, 165, 233, 0.22)', accent: '#0ea5e9' },
  'woah-pvsis': { glow: 'rgba(56, 189, 248, 0.22)', accent: '#38bdf8' },
  'sales-closer': { glow: 'rgba(168, 85, 247, 0.22)', accent: '#a855f7' },
  'khandowa-law': { glow: 'rgba(232, 90, 45, 0.22)', accent: '#e85a2d' },
  'shopeedo': { glow: 'rgba(249, 115, 22, 0.22)', accent: '#f97316' },
  'premier-staff': { glow: 'rgba(16, 185, 129, 0.22)', accent: '#10b981' }
};

// Web Audio API soft tactile feedback
const playTactileSound = (freq = 800, type = 'sine', duration = 0.04) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio errors
  }
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All Works');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [inspectProject, setInspectProject] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const filmstripRef = useRef(null);

  const handleSound = (freq) => {
    if (soundEnabled) playTactileSound(freq);
  };

  const filteredProjects = activeCategory === 'All Works'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory || p.categoryTag.includes(activeCategory));

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const activeProject = filteredProjects[currentIndex] || filteredProjects[0] || PROJECTS[0];
  const theme = PROJECT_THEMES[activeProject.slug] || { glow: 'rgba(232, 90, 45, 0.22)', accent: '#e85a2d' };

  // Auto-tour timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredProjects.length]);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredProjects.length]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!filmstripRef.current) return;
    const activeEl = filmstripRef.current.querySelector(`[data-thumb-index="${currentIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    handleSound(950);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    handleSound(750);
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#100904] text-[#f8f5ee] pt-28 sm:pt-32 lg:pt-24 pb-4 selection:bg-[#e85a2d] selection:text-white flex flex-col justify-between">
      
      {/* Dynamic Atmospheric Ambient Glow */}
      <div 
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full blur-[170px] transition-all duration-1000 opacity-65 z-0"
        style={{ background: theme.glow }}
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          1. COMPACT TOP EXHIBITION CONTROL DECK
      ───────────────────────────────────────────────────────────── */}
      <header className="relative z-10 gutter mx-auto max-w-[82rem] w-full shrink-0 pt-2 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          
          {/* Chapter Pill & Section Title */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#e85a2d] font-semibold flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#e85a2d] animate-ping" />
              <span>Architectural Works</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-xs text-[#f8f5ee]/60">
              Case {activeProject.id} of 0{filteredProjects.length}
            </span>
          </div>

          {/* Category Filter Chips (Single-line horizontal scroll on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1 max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  handleSound(750);
                }}
                className={`shrink-0 rounded-full px-3 py-1 text-[0.68rem] font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'border border-[#e85a2d] bg-[#e85a2d]/20 text-[#f8f5ee] font-semibold shadow-[0_0_10px_rgba(232,90,45,0.3)]'
                    : 'border border-white/10 bg-white/[0.02] text-[#f8f5ee]/60 hover:border-white/25 hover:text-[#f8f5ee]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stage Controls: Auto Tour, Audio Toggle, Step Chevrons */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsAutoPlaying(!isAutoPlaying);
                handleSound(1100);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[0.68rem] text-[#f8f5ee] hover:border-[#e85a2d] transition-all cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="size-3 text-[#e85a2d]" /> : <Play className="size-3 text-[#e85a2d]" />}
              <span>{isAutoPlaying ? 'Auto' : 'Manual'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="grid size-7 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-[#f8f5ee]/70 hover:text-[#f8f5ee] transition-all cursor-pointer"
              title={soundEnabled ? 'Mute audio' : 'Enable audio'}
            >
              {soundEnabled ? <Volume2 className="size-3 text-[#e85a2d]" /> : <VolumeX className="size-3" />}
            </button>

            {/* Step Chevrons */}
            <div className="flex items-center gap-1 border border-white/10 rounded-full p-0.5 bg-white/[0.02]">
              <button
                type="button"
                onClick={handlePrev}
                className="grid size-7 place-items-center rounded-full bg-white/[0.05] text-[#f8f5ee]/80 hover:bg-[#e85a2d] hover:text-[#100904] transition-all cursor-pointer"
                aria-label="Previous Project"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="grid size-7 place-items-center rounded-full bg-white/[0.05] text-[#f8f5ee]/80 hover:bg-[#e85a2d] hover:text-[#100904] transition-all cursor-pointer"
                aria-label="Next Project"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. THE MAIN CINEMA SHOWCASE (Fits Comfortably in Viewport)
      ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 gutter mx-auto max-w-[82rem] w-full flex-1 flex flex-col justify-center my-auto py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.slug}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 lg:grid-cols-12 lg:items-center rounded-[2rem] border border-white/15 bg-[#140e08]/95 p-5 sm:p-8 lg:p-9 shadow-[0_2.5rem_5rem_rgba(16,9,4,0.85)] relative overflow-hidden backdrop-blur-md"
          >
            {/* Ambient Radial Accent */}
            <div 
              className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full blur-[100px] opacity-25"
              style={{ background: theme.accent }}
              aria-hidden="true"
            />

            {/* LEFT COLUMN: Narrative, Impact Telemetry, CTAs */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5 z-10">
              
              {/* Client & Year Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#e85a2d] px-2.5 py-0.5 font-mono text-[0.68rem] font-bold text-[#f8f5ee]">
                  Case {activeProject.id}
                </span>
                <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-0.5 font-mono text-xs text-[#f8f5ee]/80">
                  {activeProject.client}
                </span>
                <span className="font-mono text-xs text-[#f8f5ee]/40">
                  {activeProject.year}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] text-[#f8f5ee]">
                  <Link href={`/portfolio/${activeProject.slug}`} className="hover:text-[#e85a2d] transition-colors">
                    {activeProject.title}
                  </Link>
                </h2>
                <p className="font-mono text-xs text-[#e85a2d] font-semibold mt-1 line-clamp-1">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Problem-Solver Narrative */}
              <p className="text-xs sm:text-sm text-[#f8f5ee]/75 font-sans leading-relaxed line-clamp-3">
                {activeProject.shortDesc}
              </p>

              {/* Standout Verified Outcome Stats (2 Clean Columns) */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {activeProject.metrics?.slice(0, 2).map((m, mi) => (
                  <div key={mi} className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                    <p className="font-display text-lg sm:text-xl font-bold text-[#e85a2d]">{m.value}</p>
                    <p className="font-mono text-[0.62rem] text-[#f8f5ee]/60 mt-0.5 uppercase tracking-wider">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProject.techStack.slice(0, 5).map((tech, ti) => (
                  <span
                    key={ti}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[0.65rem] text-[#f8f5ee]/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons (Full width on mobile, inline on desktop) */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <Link
                  href={`/portfolio/${activeProject.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f8f5ee] px-5 py-2.5 font-mono text-xs font-semibold text-[#100904] transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(248,245,238,0.4)] active:scale-[0.97] text-center"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="size-3.5 text-[#e85a2d]" />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setInspectProject(activeProject);
                    handleSound(1000);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 font-mono text-xs text-[#f8f5ee] hover:border-[#e85a2d] hover:text-[#e85a2d] transition-all cursor-pointer text-center"
                >
                  <Terminal className="size-3.5 text-[#e85a2d]" />
                  <span>Inspect Code & Schema</span>
                </button>

                {activeProject.liveLink && (
                  <a
                    href={activeProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 font-mono text-xs text-[#f8f5ee]/50 hover:text-[#e85a2d] transition-colors py-1 px-2"
                  >
                    <span>Live URL</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: 3D Visual Specimen */}
            <div className="lg:col-span-6 z-10">
              <Perspective3DCard intensity={10} className="w-full">
                <div 
                  data-cursor-view="true"
                  className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0a0604] shadow-[0_2rem_4rem_rgba(0,0,0,0.8)] group/card"
                >
                  {/* Visual Image Media */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={activeProject.heroImage}
                      alt={activeProject.title}
                      className="h-full w-full object-cover filter brightness-[0.95] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-105"
                    />

                    {/* Dark Scrim */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-[#0a0604] via-[#0a0604]/25 to-transparent" 
                      aria-hidden="true" 
                    />

                    {/* Top Status Capsule */}
                    <div 
                      style={{ transform: 'translateZ(35px)' }}
                      className="absolute top-3 left-3 z-20 flex items-center gap-2"
                    >
                      <span className="rounded-full bg-[#100904]/90 backdrop-blur-md px-3 py-1 font-mono text-[0.68rem] text-[#e85a2d] border border-white/15 font-semibold">
                        {activeProject.category}
                      </span>
                      <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Production
                      </span>
                    </div>

                    {/* Bottom Telemetry Bar */}
                    <div 
                      style={{ transform: 'translateZ(45px)' }}
                      className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between rounded-lg bg-[#100904]/90 backdrop-blur-md px-3 py-1.5 border border-white/10 font-mono text-[0.68rem]"
                    >
                      <span className="text-[#f8f5ee]/70">Verified Integrity:</span>
                      <span className="text-[#e85a2d] font-bold">100% Production Standard</span>
                    </div>
                  </div>
                </div>
              </Perspective3DCard>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          3. SLIM HORIZONTAL FILMSTRIP DOCK (Bottom Viewport Anchor)
      ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 gutter mx-auto max-w-[82rem] w-full shrink-0 pt-2">
        <div className="flex items-center justify-between font-mono text-[0.68rem] text-[#f8f5ee]/40 mb-2 px-1">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#e85a2d]" />
            <span>Horizontal Filmstrip Deck · Click any card to inspect</span>
          </span>
          <span className="hidden sm:inline text-[#e85a2d]">
            Press keyboard [←] [→] arrow keys
          </span>
        </div>

        {/* Filmstrip Rail (Edge-to-edge momentum touch swipe on mobile) */}
        <div 
          ref={filmstripRef}
          className="flex items-center gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {filteredProjects.map((project, idx) => {
            const isActive = idx === currentIndex;

            return (
              <button
                key={project.slug}
                data-thumb-index={idx}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  handleSound(850);
                }}
                className={`group shrink-0 relative flex items-center gap-2.5 rounded-xl p-2 border transition-all duration-300 cursor-pointer text-left ${
                  isActive
                    ? 'border-[#e85a2d] bg-[#1a120b] text-[#f8f5ee] shadow-[0_0_20px_rgba(232,90,45,0.3)] ring-2 ring-[#e85a2d]/30'
                    : 'border-white/10 bg-white/[0.02] text-[#f8f5ee]/50 hover:border-white/20 hover:text-[#f8f5ee]'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative size-10 sm:size-11 rounded-lg overflow-hidden bg-[#0a0604] border border-white/10 shrink-0">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="h-full w-full object-cover filter brightness-[0.9]"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-[#e85a2d]/25" />
                  )}
                </div>

                {/* Text Info */}
                <div className="min-w-[7.5rem] sm:min-w-[9rem] pr-2">
                  <span className={`font-mono text-[0.62rem] font-bold block ${
                    isActive ? 'text-[#e85a2d]' : 'text-[#f8f5ee]/40'
                  }`}>
                    0{idx + 1} · {project.client.split(' ')[0]}
                  </span>
                  <h4 className={`font-display text-xs font-semibold truncate transition-colors ${
                    isActive ? 'text-[#f8f5ee]' : 'text-[#f8f5ee]/80 group-hover:text-[#f8f5ee]'
                  }`}>
                    {project.title}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          4. INTERACTIVE PROJECT TELEMETRY & ARCHITECTURE MODAL
      ───────────────────────────────────────────────────────────── */}
      <ProjectTelemetryModal
        project={inspectProject}
        isOpen={Boolean(inspectProject)}
        onClose={() => setInspectProject(null)}
      />

    </div>
  );
}
