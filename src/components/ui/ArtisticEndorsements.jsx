import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, Star, CheckCircle2, ShieldCheck, ArrowRight, 
  ChevronLeft, ChevronRight, Award, Sparkles, Building2, User
} from 'lucide-react';
import { TESTIMONIALS } from '../../data/portfolioData';

// Enhanced client metadata for artist-grade presentation
const CLIENT_META = [
  {
    author: "Dr. Mohsin",
    role: "CEO",
    company: "Beecons International",
    projectScope: "WHO Polio Surveillance Data Reconciliation",
    initials: "DM",
    verifiedTag: "Verified Enterprise Contract",
    impactMetrics: [
      { label: "Margin of Error", value: "0.00%" },
      { label: "Pipeline Reliability", value: "100% Match" },
      { label: "Surveillance Tiers", value: "3 National Levels" }
    ],
    accentColor: "#e85a2d"
  },
  {
    author: "Sayed Ali Azim Kazimi",
    role: "Director",
    company: "Al-Mustafa Academy",
    projectScope: "Automated WhatsApp Bot & LegalTech Portal",
    initials: "SA",
    verifiedTag: "Verified Direct Client",
    impactMetrics: [
      { label: "Inbound Retainers", value: "+100% Growth" },
      { label: "Bot Response Time", value: "< 2 Seconds" },
      { label: "Student Intake", value: "24/7 Automated" }
    ],
    accentColor: "#38bdf8"
  },
  {
    author: "Maher Al Delbani",
    role: "PR & Strategy Manager",
    company: "NextMove Services",
    projectScope: "SEO Platform & Sub-Second Web Performance",
    initials: "MD",
    verifiedTag: "Verified Retainer Client",
    impactMetrics: [
      { label: "Lighthouse Score", value: "99 / 100" },
      { label: "Page Load TTFB", value: "Sub-Second" },
      { label: "Technical Audit", value: "Zero SEO Errors" }
    ],
    accentColor: "#10b981"
  }
];

export default function ArtisticEndorsements() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeTestimonial = TESTIMONIALS[activeIndex] || TESTIMONIALS[0];
  const activeMeta = CLIENT_META[activeIndex] || CLIENT_META[0];

  // 6-second auto-progression with smooth progress indicator
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 60; // 60ms tick
    const totalDuration = 6000; // 6 seconds
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

  const handleSelect = (idx) => {
    setActiveIndex(idx);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setProgress(0);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    setProgress(0);
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ─────────────────────────────────────────────────────────────
          CRISP STUDIO LIGHT ENDORSEMENTS MONOLITH
      ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.25rem] sm:rounded-[3rem] border border-zinc-200/90 bg-white p-6 sm:p-12 lg:p-16 text-zinc-900 shadow-[0_16px_50px_rgba(0,0,0,0.06)]">
        
        {/* Subtle Ambient Radial Glows */}
        <div 
          className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[#f97316]/10 blur-[120px]" 
          aria-hidden="true" 
        />
        <div 
          className="pointer-events-none absolute -left-32 -bottom-32 size-96 rounded-full bg-sky-500/5 blur-[120px]" 
          aria-hidden="true" 
        />

        {/* Ambient Fine Halftone Pattern */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Top Status Capsule Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 pb-6 mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-orange-50 text-[#f97316] border border-orange-200 shadow-sm">
                <Award className="size-4" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#f97316] font-semibold flex items-center gap-2">
                  <span>Client Feedback &amp; Stories</span>
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </p>
                <p className="font-mono text-[0.68rem] text-zinc-500 mt-0.5">
                  Direct reviews from founders, program leads, and business owners
                </p>
              </div>
            </div>

            {/* Slide Navigation Buttons & Indicators */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-zinc-400">
                0{activeIndex + 1} / 0{TESTIMONIALS.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="grid size-9 place-items-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-[#f97316] hover:text-[#f97316] transition-all cursor-pointer shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="grid size-9 place-items-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-[#f97316] hover:text-[#f97316] transition-all cursor-pointer shadow-sm"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Animated Testimonial Canvas */}
          <div className="min-h-[280px] sm:min-h-[320px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {/* Floating Quotation Marks & Scope Pill */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Quote className="size-8 text-[#f97316]/35" />
                    <span className="font-mono text-xs uppercase tracking-wider text-[#f97316] font-semibold">
                      {activeMeta.projectScope}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-mono text-[0.68rem] text-emerald-700 font-semibold shadow-sm">
                    <ShieldCheck className="size-3.5" />
                    <span>{activeMeta.verifiedTag}</span>
                  </span>
                </div>

                {/* Grand Artistic Quote Typography */}
                <blockquote className="font-serif italic text-xl sm:text-3xl lg:text-4xl text-zinc-950 font-normal leading-relaxed sm:leading-snug max-w-5xl">
                  “{activeTestimonial.quote}”
                </blockquote>

                {/* Measurable Impact Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-200/80">
                  {activeMeta.impactMetrics.map((metric, mi) => (
                    <div 
                      key={mi}
                      className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-3.5 flex items-center justify-between shadow-sm"
                    >
                      <span className="font-mono text-xs text-zinc-500">
                        {metric.label}
                      </span>
                      <span className="font-display text-sm font-bold text-[#f97316]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Author Signature & Profile Box */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 sm:size-14 place-items-center rounded-2xl bg-orange-50 border border-orange-200 text-[#f97316] font-display font-bold text-base sm:text-lg shadow-sm shrink-0">
                      {activeMeta.initials}
                    </div>

                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-950">
                        {activeTestimonial.author}
                      </h3>
                      <p className="font-mono text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="size-3 text-[#f97316]" />
                        <span>{activeTestimonial.role}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-2 font-mono text-xs font-bold text-zinc-900">
                      5.0 Delivery Rating
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              INTERACTIVE CLIENT DOSSIER CARDS WITH STORY PROGRESS BARS
          ───────────────────────────────────────────────────────────── */}
          <div className="mt-10 sm:mt-14 pt-8 border-t border-zinc-200/80 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => {
              const meta = CLIENT_META[idx];
              const isCurrent = idx === activeIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`group relative text-left rounded-2xl p-4 sm:p-5 border transition-all duration-200 cursor-pointer overflow-hidden ${
                    isCurrent
                      ? 'border-[#f97316] bg-orange-50/50 text-zinc-950 shadow-sm'
                      : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
                  }`}
                >
                  {/* Glowing Animated Story Progress Bar at Top of Active Card */}
                  {isCurrent && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-zinc-200 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#f97316] to-[#fb923c] transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2.5">
                    <span className={`font-mono text-[0.68rem] font-bold ${
                      isCurrent ? 'text-[#f97316]' : 'text-zinc-400'
                    }`}>
                      0{idx + 1} Endorsement
                    </span>

                    <span className={`size-2 rounded-full ${
                      isCurrent ? 'bg-[#f97316] animate-ping' : 'bg-zinc-200'
                    }`} />
                  </div>

                  <h4 className={`font-display text-sm sm:text-base font-semibold transition-colors ${
                    isCurrent ? 'text-zinc-950' : 'text-zinc-800 group-hover:text-zinc-950'
                  }`}>
                    {t.author}
                  </h4>

                  <p className="font-mono text-[0.68rem] text-zinc-500 truncate mt-0.5">
                    {meta.company}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Bottom Senior Verification Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-500 pt-4 border-t border-zinc-200/80">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-semibold text-zinc-900">Senior Engineering Standard:</span>
              <span>Direct personal execution on every deliverable</span>
            </div>

            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
              <CheckCircle2 className="size-3.5" />
              <span>100% Verified Delivery Record</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
