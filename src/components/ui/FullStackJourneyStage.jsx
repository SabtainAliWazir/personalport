import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, ShieldCheck, Activity, Cpu, Database, 
  Sparkles, Layers, ArrowRight, Play, Pause, CheckCircle2, 
  Workflow, Boxes, Zap, Globe, RefreshCw
} from 'lucide-react';

const JOURNEY_PHASES = [
  {
    id: 'frontend',
    epoch: '2021 – 2022',
    label: '01 / Frontend & Speed',
    role: 'React & Headless WordPress Craft',
    headline: 'Sub-Second Frontend & UI Precision',
    description: 'Mastered high-speed UI development with React, TypeScript, bespoke WordPress block engines, and strict Lighthouse 99+ Core Web Vitals budgets.',
    metric: { value: '99/100', label: 'Lighthouse Performance', sub: '0.6s LCP · 0kb Builder Tax' },
    telemetry: [
      { key: 'Component Tree', val: 'React 19 & Next.js App Router' },
      { key: 'Hydration Strategy', val: 'Selective SSR & Island Architecture' },
      { key: 'Render Frame Budget', val: '60 FPS (16.6ms lock)' }
    ],
    codeSnippet: `// 60 FPS Component Hydration & Frame Lock
const useFastRender = (config) => {
  return useMemo(() => compileOptimizedTree(config), [config.hash]);
};`
  },
  {
    id: 'backend',
    epoch: '2022 – 2024',
    label: '02 / Distributed Backends',
    role: 'Enterprise APIs & Job Queues',
    headline: 'Scalable Microservices & Relational Schemas',
    description: 'Engineered high-throughput Laravel 11 and Node.js backend systems with Redis job queues, indexed PostgreSQL/MySQL schemas, and robust payment integrations.',
    metric: { value: '12.5k', label: 'Req / Sec Peak Throughput', sub: 'Redis Mutex · Zero Race Conditions' },
    telemetry: [
      { key: 'Queue Backplane', val: 'Redis Cluster with Horizon Daemons' },
      { key: 'Database Locking', val: 'Pessimistic Row Lock on Checkout' },
      { key: 'API Throughput', val: '< 45ms average response time' }
    ],
    codeSnippet: `// High-Volume Redis Queue & Mutex Lock
$lock = Cache::lock("transact_lock_{$id}", 5);
if ($lock->get()) {
    ProcessTransactionJob::dispatch($payload)->onQueue('high');
}`
  },
  {
    id: 'global-systems',
    epoch: '2024 – Present',
    label: '03 / Global Health Pipelines',
    role: 'WHO & WOAH Systems Engineer',
    headline: 'Mission-Critical International Data Integrity',
    description: 'Architecting surveillance data reconciliation pipelines for the World Health Organization (WHO e-ACR) and 180-nation real-time WebSocket messaging for WOAH PVSIS.',
    metric: { value: '100%', label: 'Mathematical Consistency', sub: '180+ Countries · 58ms Live Socket Mesh' },
    telemetry: [
      { key: 'Surveillance Auditing', val: 'Deterministic SQL Reconciliation Daemon' },
      { key: 'Delegate Broadcast', val: '5,000+ Concurrent Nodes at 58ms Latency' },
      { key: 'Discrepancy Elimination', val: '0.000% Error Across Regional Labs' }
    ],
    codeSnippet: `// WHO e-ACR Surveillance Reconciliation Daemon
public function reconcileSurveillanceMetrics(int $countryId): HashProof {
    return DB::transaction(fn() => $this->verifyEpidemiologyAudit($countryId));
}`
  },
  {
    id: 'ai-agents',
    epoch: 'Current Frontier',
    label: '04 / Autonomous AI Mesh',
    role: 'LLM Reasoners & WhatsApp Automation',
    headline: 'Autonomous Agents with Real-Time Tool Calling',
    description: 'Building autonomous AI customer qualification agents, streaming LLM reasoning pipelines, and WhatsApp Cloud API bots that operate 24/7.',
    metric: { value: '< 380ms', label: 'Streaming Reasoning Latency', sub: 'Tool Calling · Vector Retrieval RAG' },
    telemetry: [
      { key: 'Orchestration Engine', val: 'OpenAI + Gemini Function Calling' },
      { key: 'Knowledge Base RAG', val: 'pgvector High-Dimensional Embeddings' },
      { key: 'Inbound Automation', val: '100% Autonomous Calendar & CRM Dispatch' }
    ],
    codeSnippet: `// Autonomous Tool-Calling Agent Dispatcher
const agentDecision = await llmRouter.evaluateIntent(incomingQuery, {
  availableTools: [bookConsultation, syncCrmLead, triggerWebhook]
});`
  }
];

export default function FullStackJourneyStage() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(2); // default to WHO / WOAH Global Systems
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activePacketIndex, setActivePacketIndex] = useState(0);
  const canvasRef = useRef(null);

  const activePhase = JOURNEY_PHASES[activePhaseIndex];

  // Auto-play timeline simulation
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActivePhaseIndex((prev) => (prev + 1) % JOURNEY_PHASES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Telemetry Packet Animation loop
  useEffect(() => {
    const packetInterval = setInterval(() => {
      setActivePacketIndex((prev) => (prev + 1) % 4);
    }, 1100);
    return () => clearInterval(packetInterval);
  }, []);

  // Background Interactive Network Data Stream Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dynamic data nodes representing the 4 tiers of full-stack engineering
    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 4 Core Stations across canvas width
      const stations = [
        { x: width * 0.12, y: height * 0.5 },
        { x: width * 0.38, y: height * 0.45 },
        { x: width * 0.65, y: height * 0.55 },
        { x: width * 0.88, y: height * 0.5 }
      ];

      // Draw active connecting telemetry conduits
      for (let i = 0; i < stations.length - 1; i++) {
        const start = stations[i];
        const end = stations[i + 1];
        const isCurrentLink = i === activePacketIndex;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);

        const midX = (start.x + end.x) / 2;
        const wave = Math.sin(time * 2 + i) * 14;

        ctx.bezierCurveTo(midX, start.y + wave, midX, end.y - wave, end.x, end.y);

        ctx.strokeStyle = isCurrentLink ? 'rgba(232, 90, 45, 0.45)' : 'rgba(16, 9, 4, 0.08)';
        ctx.lineWidth = isCurrentLink ? 2.5 : 1;
        ctx.stroke();

        // Flowing data packet along the active link
        if (isCurrentLink) {
          const t = (time * 1.2) % 1;
          const u = 1 - t;
          const px = u * u * u * start.x + 3 * u * u * t * midX + 3 * u * t * t * midX + t * t * t * end.x;
          const py = u * u * u * start.y + 3 * u * u * t * (start.y + wave) + 3 * u * t * t * (end.y - wave) + t * t * t * end.y;

          // Glowing Packet Pulse
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#e85a2d';
          ctx.shadowColor = '#e85a2d';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Station Hub Rings
      stations.forEach((st, idx) => {
        const isSelected = idx === activePhaseIndex;
        ctx.beginPath();
        ctx.arc(st.x, st.y, isSelected ? 7 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#e85a2d' : 'rgba(16, 9, 4, 0.25)';
        ctx.fill();

        if (isSelected) {
          ctx.beginPath();
          ctx.arc(st.x, st.y, 14 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(232, 90, 45, 0.35)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activePhaseIndex, activePacketIndex]);

  return (
    <div className="relative mx-auto mt-6 w-full max-w-6xl px-3 sm:px-6">
      {/* ─────────────────────────────────────────────────────────────
          1. INTERACTIVE FULL-STACK JOURNEY CONSOLE STAGE
      ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-[#100904]/12 bg-[#f8f5ee] shadow-[0_2rem_5rem_rgba(16,9,4,0.12)] text-[#100904] p-5 sm:p-8">
        
        {/* Top Machine Header & Timeline Controller */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#100904]/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-[#e85a2d]">
              <span className="size-2 rounded-full bg-[#f8f5ee] animate-ping" />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#100904]/50">
                Full-Stack Systems Architecture Machine
              </p>
              <h2 className="font-display text-lg font-semibold text-[#100904]">
                The Engineering Journey: From Frontend Craft to Global Infrastructure
              </h2>
            </div>
          </div>

          {/* Timeline Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#100904]/15 bg-white/80 px-3 py-1.5 text-[#100904] hover:border-[#e85a2d] transition-colors"
              title={isAutoPlaying ? 'Pause automatic journey cycle' : 'Play automatic journey cycle'}
            >
              {isAutoPlaying ? <Pause className="size-3 text-[#e85a2d]" /> : <Play className="size-3 text-[#e85a2d]" />}
              <span>{isAutoPlaying ? 'Live Flow' : 'Paused'}</span>
            </button>
            <span className="rounded-full bg-[#100904]/5 px-2.5 py-1 text-[#100904]/60">
              Epoch {activePhase.epoch}
            </span>
          </div>
        </div>

        {/* Interactive 4-Phase Stepper Tabs */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 font-mono text-xs">
          {JOURNEY_PHASES.map((phase, idx) => {
            const isActive = idx === activePhaseIndex;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => {
                  setActivePhaseIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={`relative rounded-xl p-3 text-left transition-all duration-200 border ${
                  isActive
                    ? 'border-[#e85a2d] bg-[#100904] text-[#f8f5ee] shadow-md'
                    : 'border-[#100904]/10 bg-white/60 text-[#100904]/70 hover:border-[#100904]/30 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-[0.68rem]">
                  <span className={isActive ? 'text-[#e85a2d] font-bold' : 'text-[#100904]/40'}>
                    {phase.epoch}
                  </span>
                  {isActive && <span className="size-1.5 rounded-full bg-[#e85a2d] animate-pulse" />}
                </div>
                <p className={`mt-1 font-sans text-xs font-semibold ${isActive ? 'text-[#f8f5ee]' : 'text-[#100904]'}`}>
                  {phase.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Central Dynamic Architecture Stage */}
        <div className="relative mt-6 grid gap-6 lg:grid-cols-12 lg:items-center rounded-2xl border border-[#100904]/10 bg-[#100904] text-[#f8f5ee] p-6 sm:p-8 overflow-hidden">
          
          {/* Subtle Ambient Canvas in background */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>

          {/* Left Column: Phase Story & Live Metric */}
          <div className="relative z-10 lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#e85a2d]">
              <Workflow className="size-3.5" />
              <span className="uppercase tracking-wider font-semibold">{activePhase.role}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#f8f5ee] leading-tight">
              {activePhase.headline}
            </h3>

            <p className="text-sm text-[#f8f5ee]/75 leading-relaxed font-sans">
              {activePhase.description}
            </p>

            {/* Live Key Metric Box */}
            <div className="mt-4 rounded-xl border border-[#e85a2d]/30 bg-[#1a120b] p-4 flex items-center justify-between">
              <div>
                <span className="font-display text-3xl font-bold text-[#e85a2d] tabular-nums">
                  {activePhase.metric.value}
                </span>
                <p className="text-xs font-sans font-medium text-[#f8f5ee]/90 mt-0.5">
                  {activePhase.metric.label}
                </p>
                <p className="text-[0.68rem] font-mono text-[#f8f5ee]/50 mt-0.5">
                  {activePhase.metric.sub}
                </p>
              </div>

              <div className="grid size-12 place-items-center rounded-xl bg-[#e85a2d]/15 text-[#e85a2d] border border-[#e85a2d]/30">
                {activePhaseIndex === 0 ? (
                  <Zap className="size-6" />
                ) : activePhaseIndex === 1 ? (
                  <Database className="size-6" />
                ) : activePhaseIndex === 2 ? (
                  <ShieldCheck className="size-6" />
                ) : (
                  <Sparkles className="size-6" />
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Telemetry Terminal & Code Execution */}
          <div className="relative z-10 lg:col-span-6 space-y-3 font-mono text-xs">
            {/* Telemetry Key-Value Specs */}
            <div className="rounded-xl border border-white/10 bg-[#1a120b]/90 p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[0.7rem] text-[#e85a2d] font-semibold">
                <span className="flex items-center gap-1.5">
                  <Terminal className="size-3" /> Live Architecture Telemetry
                </span>
                <span className="text-[#f8f5ee]/40 uppercase tracking-widest">Active State</span>
              </div>

              <div className="space-y-1.5 pt-1 text-[0.72rem]">
                {activePhase.telemetry.map((item, ti) => (
                  <div key={ti} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                    <span className="text-[#f8f5ee]/55">{item.key}</span>
                    <span className="text-[#f8f5ee] font-sans font-medium text-right">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Real Code Snippet Box */}
            <div className="rounded-xl border border-white/10 bg-[#0a0603] p-3 text-[0.68rem] text-[#f8f5ee]/85 leading-relaxed overflow-x-auto">
              <pre className="text-[#e85a2d]/90 font-mono">
                <code>{activePhase.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Proof Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#100904]/60 pt-4 border-t border-[#100904]/10">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-semibold text-[#100904]">Direct Senior Execution:</span>
            <span>Zero Juniors · Zero Outsourcing</span>
          </div>

          <div className="flex items-center gap-4">
            <span>WHO e-ACR (EMRO)</span>
            <span>·</span>
            <span>WOAH PVSIS (180 Nations)</span>
            <span>·</span>
            <span>18+ Shipped Systems</span>
          </div>
        </div>
      </div>
    </div>
  );
}
