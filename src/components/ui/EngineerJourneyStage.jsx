import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Server, ShieldCheck, ArrowRight, 
  Sparkles, CheckCircle2, Play, Pause, Zap, Globe
} from 'lucide-react';

const JOURNEY_MILESTONES = [
  {
    year: 'Year 01',
    period: '2022',
    tag: 'Frontend & UI Craft',
    title: 'Solving Website Speed & User Friction',
    problem: 'Bloated page builders and slow load times causing high user drop-offs.',
    solution: 'Built custom React frontends and lightweight WordPress themes scoring 99+ on speed.',
    impact: 'Sub-second page loads, zero page-builder tax, and higher client conversion.',
    icon: Code2,
    accent: '#38bdf8'
  },
  {
    year: 'Year 02',
    period: '2023',
    tag: 'Backend & Data Systems',
    title: 'Scaling Backends & High-Volume APIs',
    problem: 'Legacy servers crashing under heavy traffic spikes and complex relational data.',
    solution: 'Engineered high-throughput Laravel and Node.js APIs with Redis queues and ACID-safe database schemas.',
    impact: 'Handled 10,000+ requests per second with sub-45ms API response times.',
    icon: Server,
    accent: '#e85a2d'
  },
  {
    year: 'Year 03+',
    period: '2024 – Present',
    tag: 'Global Systems & AI',
    title: 'Mission-Critical WHO Health Pipelines',
    problem: 'Data discrepancies in regional polio surveillance and disconnected international delegates.',
    solution: 'Architected automated WHO data reconciliation daemons and 180-country real-time WebSocket meshes.',
    impact: '100% mathematical consistency across global health logs and sub-60ms worldwide broadcast.',
    icon: ShieldCheck,
    accent: '#10b981'
  }
];

export default function EngineerJourneyStage() {
  const [activeStep, setActiveStep] = useState(2); // Start at current Year 03+
  const [isPlaying, setIsPlaying] = useState(true);

  const activeMilestone = JOURNEY_MILESTONES[activeStep];
  const IconComponent = activeMilestone.icon;

  // Gentle auto-cycle through the 3-year journey
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % JOURNEY_MILESTONES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="relative mx-auto mt-6 w-full max-w-4xl px-3 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#100904]/10 bg-[#f8f5ee] p-6 sm:p-10 shadow-[0_1.5rem_4rem_rgba(16,9,4,0.08)] text-[#100904]">
        
        {/* Artistic Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#100904]/10 pb-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#e85a2d] font-semibold">
              The 3+ Year Engineering Journey
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#100904] mt-0.5">
              How I Solve Real-World Software Problems
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 rounded-full border border-[#100904]/15 bg-white px-4 py-1.5 font-mono text-xs text-[#100904] hover:border-[#e85a2d] transition-colors self-start sm:self-auto"
          >
            {isPlaying ? <Pause className="size-3 text-[#e85a2d]" /> : <Play className="size-3 text-[#e85a2d]" />}
            <span>{isPlaying ? 'Auto Playing' : 'Paused'}</span>
          </button>
        </div>

        {/* 3-Year Interactive Milestone Path */}
        <div className="relative my-8">
          {/* Connecting Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-[#100904]/10" />
          
          <motion.div 
            className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-[#e85a2d]"
            animate={{ 
              width: activeStep === 0 ? '16%' : activeStep === 1 ? '50%' : '100%' 
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="relative flex justify-between">
            {JOURNEY_MILESTONES.map((m, idx) => {
              const isSelected = idx === activeStep;
              const StepIcon = m.icon;

              return (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  className="group flex flex-col items-center focus:outline-none cursor-pointer"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring on active step */}
                    {isSelected && (
                      <motion.div
                        layoutId="active-step-glow"
                        className="absolute size-14 sm:size-16 rounded-full border-2 border-[#e85a2d] bg-[#e85a2d]/10"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}

                    <div className={`relative grid size-10 sm:size-12 place-items-center rounded-full border transition-all duration-300 ${
                      isSelected
                        ? 'border-[#e85a2d] bg-[#100904] text-[#f8f5ee] shadow-lg scale-110'
                        : 'border-[#100904]/15 bg-white text-[#100904]/60 hover:border-[#e85a2d] hover:text-[#100904]'
                    }`}>
                      <StepIcon className="size-4 sm:size-5" />
                    </div>
                  </div>

                  <span className={`mt-3 font-mono text-xs font-semibold ${
                    isSelected ? 'text-[#e85a2d]' : 'text-[#100904]/50 group-hover:text-[#100904]'
                  }`}>
                    {m.year}
                  </span>

                  <span className="font-mono text-[0.68rem] text-[#100904]/40 hidden sm:block">
                    {m.period}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Storytelling Card (Problem → Solution → Impact) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.year}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-[#100904]/10 bg-[#100904] p-6 sm:p-8 text-[#f8f5ee] shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#e85a2d] px-2.5 py-0.5 font-mono text-[0.68rem] text-[#f8f5ee] font-bold uppercase">
                  {activeMilestone.year} · {activeMilestone.period}
                </span>
                <span className="font-mono text-xs text-[#f8f5ee]/50">
                  {activeMilestone.tag}
                </span>
              </div>

              <span className="font-mono text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="size-3.5" /> Verified in Production
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#f8f5ee] mt-4">
              {activeMilestone.title}
            </h3>

            {/* Problem & Solution Split Layout */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* Problem Column */}
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-wider text-rose-400 font-bold mb-1">
                  The Real-World Problem
                </p>
                <p className="text-xs sm:text-sm text-[#f8f5ee]/80 font-sans leading-relaxed">
                  {activeMilestone.problem}
                </p>
              </div>

              {/* Solution Column */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-wider text-emerald-400 font-bold mb-1">
                  The Engineering Solution
                </p>
                <p className="text-xs sm:text-sm text-[#f8f5ee]/80 font-sans leading-relaxed">
                  {activeMilestone.solution}
                </p>
              </div>
            </div>

            {/* Impact Bottom Banner */}
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#e85a2d]/30 bg-[#e85a2d]/10 px-4 py-3 text-xs sm:text-sm text-[#f8f5ee]">
              <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[#e85a2d] font-bold shrink-0">
                Measurable Impact:
              </span>
              <span className="font-sans text-[#f8f5ee]/90 font-medium">
                {activeMilestone.impact}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Artistic Bottom Note */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#100904]/55 pt-4 border-t border-[#100904]/10">
          <span>Continuous engineering practice across 18+ client solutions</span>
          <span className="text-[#e85a2d] font-semibold">Direct execution with no intermediaries</span>
        </div>
      </div>
    </div>
  );
}
