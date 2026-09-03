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
          THE ARTISTIC ENDORSEMENTS MONOLITH (Luxury Gallery Showcase)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.25rem] sm:rounded-[3rem] border border-[#f8f5ee]/15 bg-[#140e08] p-6 sm:p-12 lg:p-16 text-[#f8f5ee] shadow-[0_3rem_6rem_rgba(16,9,4,0.6)]">
        
        {/* Ambient Warm Golden & Terracotta Glows */}
        <div 
          className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[#e85a2d]/15 blur-[120px]" 
          aria-hidden="true" 
        />
        <div 
          className="pointer-events-none absolute -left-32 -bottom-32 size-96 rounded-full bg-[#f8f5ee]/5 blur-[120px]" 
          aria-hidden="true" 
        />

        {/* Ambient Fine Halftone Pattern */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#f8f5ee 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {/* Top Status Capsule Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f8f5ee]/10 pb-6 mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-[#e85a2d]/20 text-[#e85a2d] border border-[#e85a2d]/40 shadow-[0_0_15px_rgba(232,90,45,0.3)]">
                <Award className="size-4" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#e85a2d] font-semibold flex items-center gap-2">
                  <span>Executive Testimonials</span>
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </p>
                <p className="font-mono text-[0.68rem] text-[#f8f5ee]/50 mt-0.5">
                  Direct Endorsements & Proof of Delivery
                </p>
              </div>
            </div>

            {/* Slide Navigation Buttons & Indicators */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#f8f5ee]/50">
                0{activeIndex + 1} / 0{TESTIMONIALS.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-[#f8f5ee]/70 hover:border-[#e85a2d] hover:text-[#f8f5ee] transition-all cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-[#f8f5ee]/70 hover:border-[#e85a2d] hover:text-[#f8f5ee] transition-all cursor-pointer"
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
                    <Quote className="size-8 text-[#e85a2d]/40" />
                    <span className="font-mono text-xs uppercase tracking-wider text-[#e85a2d] font-semibold">
                      {activeMeta.projectScope}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[0.68rem] text-emerald-400 font-semibold backdrop-blur-md">
                    <ShieldCheck className="size-3.5" />
                    <span>{activeMeta.verifiedTag}</span>
                  </span>
                </div>

                {/* Grand Artistic Quote Typography */}
                <blockquote className="font-serif italic text-xl sm:text-3xl lg:text-4xl text-[#f8f5ee] leading-relaxed sm:leading-snug max-w-5xl">
                  “{activeTestimonial.quote}”
                </blockquote>

                {/* Measurable Impact Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  {activeMeta.impactMetrics.map((metric, mi) => (
                    <div 
                      key={mi}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 flex items-center justify-between"
                    >
                      <span className="font-mono text-xs text-[#f8f5ee]/60">
                        {metric.label}
                      </span>
                      <span className="font-display text-sm font-bold text-[#e85a2d]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Author Signature & Profile Box */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="grid size-12 sm:size-14 place-items-center rounded-2xl bg-[#e85a2d]/20 border border-[#e85a2d]/40 text-[#e85a2d] font-display font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(232,90,45,0.3)] shrink-0">
                      {activeMeta.initials}
                    </div>

                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-[#f8f5ee]">
                        {activeTestimonial.author}
                      </h3>
                      <p className="font-mono text-xs text-[#f8f5ee]/60 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="size-3 text-[#e85a2d]" />
                        <span>{activeTestimonial.role}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-2 font-mono text-xs font-bold text-[#f8f5ee]">
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
          <div className="mt-10 sm:mt-14 pt-8 border-t border-white/10 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => {
              const meta = CLIENT_META[idx];
              const isCurrent = idx === activeIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`group relative text-left rounded-2xl p-4 sm:p-5 border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isCurrent
                      ? 'border-[#e85a2d] bg-[#1c140d] text-[#f8f5ee] shadow-[0_0_25px_rgba(232,90,45,0.25)]'
                      : 'border-white/10 bg-white/[0.02] text-[#f8f5ee]/60 hover:border-white/20 hover:text-[#f8f5ee]'
                  }`}
                >
                  {/* Glowing Animated Story Progress Bar at Top of Active Card */}
                  {isCurrent && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-white/10 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#e85a2d] to-[#ff7e53] transition-all duration-75 shadow-[0_0_8px_rgba(232,90,45,0.8)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2.5">
                    <span className={`font-mono text-[0.68rem] font-bold ${
                      isCurrent ? 'text-[#e85a2d]' : 'text-[#f8f5ee]/40'
                    }`}>
                      0{idx + 1} Endorsement
                    </span>

                    <span className={`size-2 rounded-full ${
                      isCurrent ? 'bg-[#e85a2d] animate-ping' : 'bg-white/20'
                    }`} />
                  </div>

                  <h4 className={`font-display text-sm sm:text-base font-semibold transition-colors ${
                    isCurrent ? 'text-[#f8f5ee]' : 'text-[#f8f5ee]/80 group-hover:text-[#f8f5ee]'
                  }`}>
                    {t.author}
                  </h4>

                  <p className="font-mono text-[0.68rem] text-[#f8f5ee]/50 truncate mt-0.5">
                    {meta.company}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Bottom Senior Verification Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#f8f5ee]/45 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-semibold text-[#f8f5ee]">Senior Engineering Standard:</span>
              <span>Direct personal execution on every deliverable</span>
            </div>

            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="size-3.5" />
              <span>100% Verified Delivery Record</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
