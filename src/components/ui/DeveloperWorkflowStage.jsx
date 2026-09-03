import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '../../router/RouterContext';
import { 
  FileText, Layout, Server, MessageSquareCheck, Rocket,
  Play, Pause, Check, Sparkles, User, ArrowRight
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    stepNumber: '01',
    name: 'Listen & Take Requirements',
    shortTitle: 'Taking Requirements',
    subTitle: 'Understanding your real problem first',
    description: 'Before writing any code, I sit down with you to understand your business goals, target audience, and current bottlenecks.',
    whatHappens: [
      'Define project goals and deadlines',
      'Identify user friction and business bottlenecks',
      'Scope out exact features and deliverables'
    ],
    icon: FileText,
    accentColor: '#38bdf8',
    graphicType: 'requirement'
  },
  {
    stepNumber: '02',
    name: 'Convert Requirements to Design',
    shortTitle: 'Design & Wireframes',
    subTitle: 'Visualizing user flows and layout',
    description: 'I transform your requirements into clean visual wireframes and user flows so you can see exactly how the website or app will work.',
    whatHappens: [
      'Create clean page layouts and wireframes',
      'Map smooth user journeys and clear buttons',
      'Design mobile-responsive layouts for all screens'
    ],
    icon: Layout,
    accentColor: '#e85a2d',
    graphicType: 'design'
  },
  {
    stepNumber: '03',
    name: 'Plan System Architecture',
    shortTitle: 'System Architecture',
    subTitle: 'Designing databases and fast APIs',
    description: 'I design the underlying database schemas, API connections, and server infrastructure so the software is fast, safe, and ready to scale.',
    whatHappens: [
      'Design organized database tables and schemas',
      'Plan high-speed APIs and secure logins',
      'Set up caching for sub-second page loads'
    ],
    icon: Server,
    accentColor: '#a855f7',
    graphicType: 'architecture'
  },
  {
    stepNumber: '04',
    name: 'Review Client Feedback',
    shortTitle: 'Client Feedback',
    subTitle: 'Aligning and refining before building',
    description: 'We review the architecture and design together. I make adjustments based on your feedback until everything is approved.',
    whatHappens: [
      'Walk through the prototype together',
      'Gather your feedback and refine details',
      'Final approval before full implementation'
    ],
    icon: MessageSquareCheck,
    accentColor: '#10b981',
    graphicType: 'feedback'
  },
  {
    stepNumber: '05',
    name: 'Build & Ship Scalable Solution',
    shortTitle: 'Scalable Implementation',
    subTitle: 'Delivering fast, production-ready software',
    description: 'I write clean, tested code, test performance thoroughly, and launch your live software system on time and built to last.',
    whatHappens: [
      'Write clean, fast React and backend code',
      'Optimize for 99+ speed and instant load times',
      'Deploy the live production system smoothly'
    ],
    icon: Rocket,
    accentColor: '#e85a2d',
    graphicType: 'implementation'
  }
];

export default function DeveloperWorkflowStage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const canvasRef = useRef(null);

  const activeStep = WORKFLOW_STEPS[activeStepIndex];

  // Auto-play timer for the conveyor
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Ambient 60 FPS Living Particle Stream Canvas in Background (Optimized for Mobile)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    const isMobile = width < 640;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Floating particles (14 on mobile for 60 FPS battery efficiency, 30 on desktop)
    const particleCount = isMobile ? 14 : 30;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
      vy: -0.2 - Math.random() * (isMobile ? 0.25 : 0.35),
      size: 1.5 + Math.random() * (isMobile ? 1.5 : 2),
      opacity: 0.15 + Math.random() * 0.4,
      color: Math.random() > 0.35 ? '#e85a2d' : '#f8f5ee'
    }));

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Connective subtle filament lines
      const maxDistance = isMobile ? 70 : 100;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232, 90, 45, ${0.15 * (1 - dist / maxDistance)})`;
            ctx.lineWidth = 0.75;
          }
        }
      }
      ctx.stroke();

      // Render & update floating particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        if (!isMobile) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative mx-auto mt-6 w-full max-w-5xl px-2 sm:px-4">
      {/* ─────────────────────────────────────────────────────────────
          UNIFIED DARK LUXURY WORKFLOW SHOWCASE (No White Outer Borders)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#100904] p-6 sm:p-10 shadow-[0_2.5rem_6rem_rgba(16,9,4,0.35)] text-[#f8f5ee]">
        
        {/* Ambient Living Particle Canvas */}
        <canvas 
          ref={canvasRef} 
          className="pointer-events-none absolute inset-0 h-full w-full opacity-60 z-0" 
        />

        {/* Ambient Radial Color Glows */}
        <div 
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[#e85a2d]/20 blur-[100px] z-0" 
          aria-hidden="true" 
        />
        <div 
          className="pointer-events-none absolute -left-24 -bottom-24 size-80 rounded-full bg-[#38bdf8]/10 blur-[100px] z-0" 
          aria-hidden="true" 
        />

        {/* Content Container (Layered above Canvas) */}
        <div className="relative z-10">
          {/* Top Header & Conveyor Controller */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#e85a2d] font-semibold flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#e85a2d] animate-ping" />
                How I Work As Your Engineer
              </p>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#f8f5ee] mt-1">
                From Your Idea to a Scalable, Working System
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-[#f8f5ee] hover:border-[#e85a2d] hover:bg-[#e85a2d]/10 transition-all self-start sm:self-auto shadow-sm"
            >
              {isPlaying ? <Pause className="size-3 text-[#e85a2d]" /> : <Play className="size-3 text-[#e85a2d]" />}
              <span>{isPlaying ? 'Auto Conveyor' : 'Paused'}</span>
            </button>
          </div>

          {/* 5-Step Story Conveyor Navigation with Developer Avatar Indicator */}
          <div className="relative my-8">
            {/* Background Track Line */}
            <div className="absolute top-[26px] left-6 right-6 h-1 bg-white/10 rounded-full" />
            
            {/* Animated Glowing Progress Line */}
            <motion.div 
              className="absolute top-[26px] left-6 h-1 bg-gradient-to-r from-[#e85a2d] to-[#ff7e53] rounded-full shadow-[0_0_14px_rgba(232,90,45,0.7)]"
              animate={{ 
                width: `${(activeStepIndex / (WORKFLOW_STEPS.length - 1)) * 92}%` 
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="relative grid grid-cols-5 gap-1">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isSelected = idx === activeStepIndex;
                const isPast = idx < activeStepIndex;
                const StepIcon = step.icon;

                return (
                  <button
                    key={step.stepNumber}
                    type="button"
                    onClick={() => {
                      setActiveStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    className="group flex flex-col items-center focus:outline-none cursor-pointer text-center"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Animated Developer Avatar Badge on Active Step (Centered) */}
                      {isSelected && (
                        <motion.div
                          layoutId="active-developer-avatar"
                          className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 rounded-full bg-[#1a120b] text-[#f8f5ee] px-2.5 sm:px-3 py-0.5 font-mono text-[0.62rem] sm:text-[0.65rem] font-bold shadow-[0_0_15px_rgba(232,90,45,0.4)] border border-[#e85a2d] whitespace-nowrap flex items-center gap-1.5 z-20"
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        >
                          <span className="size-1.5 rounded-full bg-[#e85a2d] animate-pulse" />
                          <User className="size-2 sm:size-2.5 text-[#e85a2d]" />
                          <span>Sabtain</span>
                        </motion.div>
                      )}

                      {/* Step Icon Bubble */}
                      <div className={`relative grid size-10 sm:size-14 place-items-center rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? 'border-[#e85a2d] bg-[#1a120b] text-[#f8f5ee] shadow-[0_0_20px_rgba(232,90,45,0.45)] scale-105 sm:scale-110 ring-2 sm:ring-4 ring-[#e85a2d]/25'
                          : isPast
                          ? 'border-[#e85a2d]/40 bg-[#e85a2d]/10 text-[#e85a2d]'
                          : 'border-white/10 bg-white/[0.03] text-[#f8f5ee]/60 hover:border-white/30 hover:text-[#f8f5ee]'
                      }`}>
                        <StepIcon className="size-4 sm:size-6" />
                      </div>
                    </div>

                    <span className={`mt-3 font-mono text-xs font-semibold ${
                      isSelected ? 'text-[#e85a2d]' : 'text-[#f8f5ee]/50 group-hover:text-[#f8f5ee]'
                    }`}>
                      {step.stepNumber}
                    </span>

                    <span className="font-sans text-[0.72rem] font-medium text-[#f8f5ee]/80 hidden md:block mt-0.5 line-clamp-1">
                      {step.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Story Visualizer Stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.stepNumber}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-6 lg:grid-cols-12 rounded-2xl border border-white/10 bg-[#140e08]/90 p-6 sm:p-8 shadow-inner items-center backdrop-blur-sm"
            >
              {/* Left Column: Visual Illustration Vector with Rich Micro-Animations */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[19rem] aspect-square rounded-2xl border border-white/10 bg-[#0a0603] p-6 flex flex-col items-center justify-center overflow-hidden shadow-[0_1rem_3rem_rgba(0,0,0,0.6)]">
                  
                  {/* Step 1 Graphic: Holographic Requirement Brief & Scanner */}
                  {activeStep.graphicType === 'requirement' && (
                    <div className="flex flex-col items-center space-y-4 w-full">
                      <div className="relative">
                        <motion.div 
                          className="size-20 rounded-2xl bg-sky-500/20 border border-sky-500/40 grid place-items-center text-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.3)]"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        >
                          <FileText className="size-10" />
                        </motion.div>
                        
                        {/* Scanning Laser Beam */}
                        <motion.div 
                          className="absolute inset-x-0 h-0.5 bg-sky-300 shadow-[0_0_8px_#38bdf8]"
                          animate={{ top: ['10%', '90%', '10%'] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                        />
                      </div>

                      <div className="w-full space-y-1.5 font-mono text-[0.68rem] text-sky-200/90 bg-white/[0.03] p-2.5 rounded-xl border border-sky-500/20 shadow-inner">
                        <div className="flex items-center gap-2"><Check className="size-3 text-sky-400" /> Client Goals Defined</div>
                        <div className="flex items-center gap-2"><Check className="size-3 text-sky-400" /> User Needs Mapped</div>
                        <div className="flex items-center gap-2"><Check className="size-3 text-sky-400" /> Deliverables Scoped</div>
                      </div>
                    </div>
                  )}

                  {/* Step 2 Graphic: Interactive Wireframe & Layout */}
                  {activeStep.graphicType === 'design' && (
                    <div className="flex flex-col items-center space-y-4 w-full">
                      <motion.div 
                        className="relative size-20 rounded-2xl bg-[#e85a2d]/20 border border-[#e85a2d]/40 grid place-items-center text-[#e85a2d] shadow-[0_0_25px_rgba(232,90,45,0.3)]"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                      >
                        <Layout className="size-10" />
                        <span className="absolute -top-1 -right-1 size-3 rounded-full bg-[#e85a2d] animate-ping" />
                      </motion.div>

                      <div className="w-full space-y-1.5 font-mono text-[0.68rem] text-[#f8f5ee]/90 bg-white/[0.03] p-2.5 rounded-xl border border-[#e85a2d]/20 shadow-inner">
                        <div className="flex items-center gap-2"><Check className="size-3 text-[#e85a2d]" /> Visual Wireframe Ready</div>
                        <div className="flex items-center gap-2"><Check className="size-3 text-[#e85a2d]" /> Smooth User Journey</div>
                        <div className="flex items-center gap-2"><Check className="size-3 text-[#e85a2d]" /> 100% Mobile Responsive</div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 Graphic: 3D Server & Database Architecture */}
                  {activeStep.graphicType === 'architecture' && (
                    <div className="flex flex-col items-center space-y-4 w-full">
                      <motion.div 
                        className="relative size-20 rounded-2xl bg-purple-500/20 border border-purple-500/40 grid place-items-center text-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                        animate={{ rotate: [0, 4, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                      >
                        <Server className="size-10" />
                        <motion.div 
                          className="absolute -inset-1 rounded-2xl border border-purple-400/40"
                          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      </motion.div>

                      <div className="w-full space-y-1.5 font-mono text-[0.68rem] text-purple-200/90 bg-white/[0.03] p-2.5 rounded-xl border border-purple-500/20 shadow-inner">
                        <div className="flex items-center gap-2"><Check className="size-3 text-purple-400" /> Database Schema Locked</div>
                        <div className="flex items-center gap-2"><Check className="size-3 text-purple-400" /> Fast API Endpoints</div>
                        <div className="flex items-center gap-2"><Check className="size-3 text-purple-400" /> Redis Cache Layer</div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 Graphic: Approved Feedback Stamp & Stars */}
                  {activeStep.graphicType === 'feedback' && (
                    <div className="flex flex-col items-center space-y-4 w-full">
                      <motion.div 
                        className="relative size-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 grid place-items-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                        initial={{ scale: 0.7, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      >
                        <MessageSquareCheck className="size-10" />
                        <span className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 text-[#100904] p-1 shadow-md">
                          <Check className="size-3 font-bold" />
                        </span>
                      </motion.div>

                      <div className="w-full space-y-1.5 font-mono text-[0.68rem] text-emerald-200/90 bg-white/[0.03] p-2.5 rounded-xl border border-emerald-500/20 shadow-inner">
                        <div className="flex items-center gap-2"><Check className="size-3 text-emerald-400" /> Client Review Completed</div>
                        <div className="flex items-center gap-2"><Check className="size-3 text-emerald-400" /> Adjustments Applied</div>
                        <div className="flex items-center gap-2"><Check className="size-3 text-emerald-400" /> Green Approval Given</div>
                      </div>
                    </div>
                  )}

                  {/* Step 5 Graphic: High-Speed Production Launch */}
                  {activeStep.graphicType === 'implementation' && (
                    <div className="flex flex-col items-center space-y-4 w-full">
                      <motion.div 
                        className="relative size-20 rounded-2xl bg-[#e85a2d]/20 border border-[#e85a2d]/40 grid place-items-center text-[#e85a2d] shadow-[0_0_30px_rgba(232,90,45,0.45)]"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                      >
                        <Rocket className="size-10" />
                        <Sparkles className="size-4 text-amber-400 absolute top-2 right-2 animate-spin" />
                      </motion.div>

                      <div className="w-full space-y-1.5 font-mono text-[0.68rem] text-[#f8f5ee]/90 bg-white/[0.03] p-2.5 rounded-xl border border-[#e85a2d]/20 shadow-inner">
                        <div className="flex items-center gap-2"><Check className="size-3 text-emerald-400" /> 99+ Speed Score Achieved</div>
                        <div className="flex items-center gap-2"><Check className="size-3 text-emerald-400" /> Sub-Second Page Response</div>
                        <div className="flex items-center gap-2"><Check className="size-3 text-emerald-400" /> Live Production Shipped</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Clear Explanations */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#e85a2d] px-2.5 py-0.5 font-mono text-xs font-bold text-[#f8f5ee]">
                    Step {activeStep.stepNumber}
                  </span>
                  <span className="font-mono text-xs text-[#f8f5ee]/60">
                    {activeStep.subTitle}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#f8f5ee]">
                  {activeStep.name}
                </h3>

                <p className="text-sm text-[#f8f5ee]/80 font-sans leading-relaxed">
                  {activeStep.description}
                </p>

                {/* Exact Actions List */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <p className="font-mono text-xs uppercase tracking-wider text-[#e85a2d] font-semibold">
                    What happens in this stage:
                  </p>
                  <div className="grid gap-2">
                    {activeStep.whatHappens.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#f8f5ee]/90 font-sans">
                        <span className="grid size-4 place-items-center rounded-full bg-[#e85a2d]/20 text-[#e85a2d] shrink-0">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Proof Bar (Responsive flex-col on small mobile, flex-row on desktop) */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#f8f5ee]/50 pt-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-semibold text-[#f8f5ee]">Simple, Transparent Engineering:</span>
              <span>You are involved at every step</span>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center sm:justify-start gap-1.5 text-[#e85a2d] font-semibold hover:text-[#f8f5ee] transition-colors py-1 cursor-pointer w-full sm:w-auto"
            >
              <span className="underline-offset-4 group-hover:underline">Ready to start your project?</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
