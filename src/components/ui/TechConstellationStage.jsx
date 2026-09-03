import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Database, ShieldCheck, Activity, Terminal, 
  Sparkles, Globe, Server, Code2, Layers, Cpu,
  Play, Pause, RefreshCw, CheckCircle2, ArrowRight
} from 'lucide-react';

// Full-Stack Architecture Nodes with Custom Icons & Real Tech Specs
const TECH_NODES = [
  {
    id: 'react-next',
    name: 'React 19 & Next.js',
    category: 'Frontend Speed',
    tier: 'Tier 1 · Client & SSR',
    icon: Code2,
    x: 14,
    y: 35,
    accent: '#38bdf8',
    stats: '60 FPS · 0.6s LCP',
    detail: 'Sub-second frontend rendering with React 19 App Router, strict TypeScript, and zero layout shift.',
    code: 'const App = memo(() => <HydrateEngine fps={60} />);',
    connections: ['laravel-api', 'headless-wp']
  },
  {
    id: 'headless-wp',
    name: 'Custom WordPress & Blocks',
    category: 'CMS & Gutenberg',
    tier: 'Tier 1 · Content Engine',
    icon: Layers,
    x: 18,
    y: 72,
    accent: '#e85a2d',
    stats: '0kb Page-Builder Tax',
    detail: 'Bespoke PHP 8.3 & React Gutenberg block theme architecture with sub-140ms Time to First Byte.',
    code: 'register_block_type("sabtain/editorial-grid", $schema);',
    connections: ['laravel-api', 'mysql-db']
  },
  {
    id: 'laravel-api',
    name: 'Laravel 11 & Node.js',
    category: 'Distributed Backend',
    tier: 'Tier 2 · API Gateway',
    icon: Server,
    x: 42,
    y: 45,
    accent: '#f43f5e',
    stats: '12.5k Req/Sec Capacity',
    detail: 'High-throughput microservices and REST/GraphQL APIs with Redis Horizon queues and repository patterns.',
    code: '$pipeline->dispatchJob($payload)->onQueue("high");',
    connections: ['mysql-db', 'redis-cache', 'who-surveillance']
  },
  {
    id: 'redis-cache',
    name: 'Redis Queue & Mutex',
    category: 'Cache & Memory',
    tier: 'Tier 2 · High IOPS',
    icon: Zap,
    x: 46,
    y: 80,
    accent: '#fbbf24',
    stats: '99.4% Cache Hit Rate',
    detail: 'In-memory mutex locks, asynchronous queue processing, and low-latency pub/sub message brokering.',
    code: 'Cache::lock("transact_mutex", 5)->get();',
    connections: ['mysql-db', 'woah-websockets']
  },
  {
    id: 'mysql-db',
    name: 'MySQL & PostgreSQL',
    category: 'Relational Database',
    tier: 'Tier 2 · ACID Storage',
    icon: Database,
    x: 62,
    y: 75,
    accent: '#3b82f6',
    stats: 'ACID Transactions',
    detail: 'Strict foreign key cascading, compound indexing, and zero data-loss transactional integrity.',
    code: 'DB::transaction(fn() => $audit->commitVerification());',
    connections: ['who-surveillance']
  },
  {
    id: 'who-surveillance',
    name: 'WHO Surveillance Engine',
    category: 'Global GovTech',
    tier: 'Tier 3 · Health Systems',
    icon: ShieldCheck,
    x: 72,
    y: 32,
    accent: '#10b981',
    stats: '100% Data Consistency',
    detail: 'Automated epidemiology data reconciliation scripts eliminating discrepancies across regional health labs.',
    code: 'verifySurveillanceMathConsistency($emroRecords);',
    connections: ['woah-websockets', 'ai-agents']
  },
  {
    id: 'woah-websockets',
    name: 'WOAH WebSocket Mesh',
    category: 'Real-Time Concurrency',
    tier: 'Tier 3 · 180+ Nations',
    icon: Activity,
    x: 86,
    y: 70,
    accent: '#a855f7',
    stats: '58ms Broadcast Latency',
    detail: 'Low-latency Socket.io cluster connecting distributed international delegates across 180+ member countries.',
    code: 'io.to("delegates:180").emit("mission_synced", state);',
    connections: ['ai-agents']
  },
  {
    id: 'ai-agents',
    name: 'Autonomous AI & WhatsApp',
    category: 'Neural Automation',
    tier: 'Tier 4 · AI Frontier',
    icon: Sparkles,
    x: 90,
    y: 30,
    accent: '#e85a2d',
    stats: '< 380ms Tool Calling',
    detail: 'Autonomous LLM qualification agents and WhatsApp Business API bots operating 24/7 with live CRM tool-calling.',
    code: 'await aiAgent.executeTool("scheduleClientDemo", lead);',
    connections: ['react-next']
  }
];

export default function TechConstellationStage() {
  const [activeNodeId, setActiveNodeId] = useState('who-surveillance');
  const [isSimulatingFlow, setIsSimulatingFlow] = useState(true);
  const [packetProgress, setPacketProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const canvasRef = useRef(null);

  const activeNode = TECH_NODES.find((n) => n.id === activeNodeId) || TECH_NODES[0];

  // Pipeline Flow Simulation sequence
  const pipelineFlowSequence = [
    'react-next',
    'laravel-api',
    'redis-cache',
    'mysql-db',
    'who-surveillance',
    'woah-websockets',
    'ai-agents'
  ];

  // Automated Flow Step Cycling
  useEffect(() => {
    if (!isSimulatingFlow) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => {
        const next = (prev + 1) % pipelineFlowSequence.length;
        setActiveNodeId(pipelineFlowSequence[next]);
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [isSimulatingFlow]);

  // Dynamic Animated Energy Conduits on HTML5 Canvas
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

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw active connection energy conduits
      TECH_NODES.forEach((source) => {
        const sx = (source.x / 100) * width;
        const sy = (source.y / 100) * height;

        source.connections.forEach((targetId) => {
          const target = TECH_NODES.find((n) => n.id === targetId);
          if (!target) return;

          const tx = (target.x / 100) * width;
          const ty = (target.y / 100) * height;

          const isConnectedToActive = source.id === activeNodeId || target.id === activeNodeId;
          const midX = (sx + tx) / 2;
          const midY = (sy + ty) / 2 - 20;

          // Conduit Base Line
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(midX, midY, tx, ty);
          ctx.strokeStyle = isConnectedToActive
            ? 'rgba(232, 90, 45, 0.45)'
            : 'rgba(248, 245, 238, 0.08)';
          ctx.lineWidth = isConnectedToActive ? 2 : 1;
          ctx.stroke();

          // Flowing Animated Energy Pulses
          if (isConnectedToActive || isSimulatingFlow) {
            const t = (time * 0.8 + (source.x + target.y) * 0.01) % 1;
            const u = 1 - t;
            const px = u * u * sx + 2 * u * t * midX + t * t * tx;
            const py = u * u * sy + 2 * u * t * midY + t * t * ty;

            ctx.beginPath();
            ctx.arc(px, py, isConnectedToActive ? 3.5 : 2, 0, Math.PI * 2);
            ctx.fillStyle = source.accent || '#e85a2d';
            ctx.shadowColor = source.accent || '#e85a2d';
            ctx.shadowBlur = isConnectedToActive ? 12 : 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeNodeId, isSimulatingFlow]);

  return (
    <div className="relative mx-auto mt-4 w-full max-w-6xl px-3 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#100904]/12 bg-[#100904] text-[#f8f5ee] shadow-[0_2rem_5rem_rgba(16,9,4,0.3)] p-6 sm:p-10">
        
        {/* Subtle Ambient Radial Glows */}
        <div 
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[#e85a2d]/15 blur-[100px]"
          aria-hidden="true"
        />
        <div 
          className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-[#38bdf8]/10 blur-[100px]"
          aria-hidden="true"
        />

        {/* Top Control Ribbon */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f8f5ee]/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex size-3.5 items-center justify-center rounded-full bg-[#e85a2d]">
              <span className="size-2 rounded-full bg-[#f8f5ee] animate-ping" />
            </span>
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#e85a2d] font-semibold">
                Interactive Systems Architecture & Journey
              </p>
              <h2 className="font-display text-lg sm:text-xl font-semibold text-[#f8f5ee]">
                Living Full-Stack Ecosystem · Click Any Technology
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setIsSimulatingFlow(!isSimulatingFlow)}
              className="inline-flex items-center gap-2 rounded-full border border-[#f8f5ee]/20 bg-white/[0.04] px-4 py-1.5 text-xs text-[#f8f5ee] hover:border-[#e85a2d] hover:bg-[#e85a2d]/10 transition-all"
            >
              {isSimulatingFlow ? <Pause className="size-3 text-[#e85a2d]" /> : <Play className="size-3 text-[#e85a2d]" />}
              <span>{isSimulatingFlow ? 'Simulating Live Pipeline' : 'Paused'}</span>
            </button>
          </div>
        </div>

        {/* Central Visual Constellation Stage */}
        <div className="relative mt-6 h-[26rem] sm:h-[30rem] w-full overflow-hidden rounded-2xl border border-[#f8f5ee]/10 bg-[#0a0603]/90 shadow-inner">
          
          {/* Connecting Energy Conduits Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

          {/* Interactive Floating Tech Nodes */}
          {TECH_NODES.map((node) => {
            const isSelected = node.id === activeNodeId;
            const IconComponent = node.icon;

            return (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => {
                  setActiveNodeId(node.id);
                  setIsSimulatingFlow(false);
                }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`group absolute z-30 flex flex-col items-center cursor-pointer focus:outline-none`}
              >
                {/* Glowing Outer Aura Ring */}
                <div className="relative flex items-center justify-center">
                  {isSelected && (
                    <motion.div
                      layoutId="active-node-ring"
                      className="absolute -inset-3 rounded-2xl border-2 border-[#e85a2d] bg-[#e85a2d]/10 blur-[1px] animate-pulse"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    />
                  )}

                  {/* Icon Emblem Tile */}
                  <div
                    className={`relative grid size-12 sm:size-14 place-items-center rounded-2xl border shadow-xl transition-all duration-300 ${
                      isSelected
                        ? 'border-[#e85a2d] bg-[#100904] text-[#f8f5ee] shadow-[0_0_25px_rgba(232,90,45,0.45)]'
                        : 'border-[#f8f5ee]/15 bg-[#1a120b]/90 text-[#f8f5ee]/70 hover:border-[#f8f5ee]/50 hover:text-[#f8f5ee]'
                    }`}
                  >
                    <IconComponent className="size-6 sm:size-7 transition-transform duration-300 group-hover:scale-110" style={{ color: isSelected ? '#e85a2d' : node.accent }} />

                    {/* Ping Indicator on active node */}
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 flex size-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e85a2d] opacity-75" />
                        <span className="relative inline-flex size-3 rounded-full bg-[#e85a2d]" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Node Pill Label */}
                <span className={`mt-2 whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono text-[0.68rem] tracking-tight border transition-all ${
                  isSelected
                    ? 'border-[#e85a2d]/60 bg-[#e85a2d]/15 text-[#f8f5ee] font-semibold'
                    : 'border-white/5 bg-black/60 text-[#f8f5ee]/60 group-hover:text-[#f8f5ee] group-hover:border-white/20'
                }`}>
                  {node.name}
                </span>
              </motion.button>
            );
          })}

          {/* Real-Time Live Architecture Inspector HUD Tooltip (Bottom Floating Dock) */}
          <div className="absolute bottom-4 inset-x-4 z-40 sm:bottom-6 sm:inset-x-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-[#e85a2d]/40 bg-[#100904]/95 p-4 sm:p-5 shadow-[0_1.5rem_4rem_rgba(0,0,0,0.8)] backdrop-blur-md"
              >
                {/* Left: Active Node Info */}
                <div className="flex items-start gap-3.5">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e85a2d]/15 border border-[#e85a2d]/30 text-[#e85a2d]">
                    <activeNode.icon className="size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[#e85a2d] font-semibold">
                        {activeNode.tier}
                      </span>
                      <span className="text-[#f8f5ee]/30 font-mono">·</span>
                      <span className="font-mono text-[0.68rem] text-emerald-400 font-medium">
                        {activeNode.stats}
                      </span>
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-[#f8f5ee]">
                      {activeNode.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#f8f5ee]/70 font-sans max-w-xl leading-relaxed">
                      {activeNode.detail}
                    </p>
                  </div>
                </div>

                {/* Right: Live Executed Code Snippet */}
                <div className="rounded-xl border border-white/10 bg-[#000000]/80 px-3.5 py-2 font-mono text-[0.7rem] text-[#f8f5ee]/85 self-stretch lg:self-auto flex items-center">
                  <span className="text-[#e85a2d] mr-2 font-bold">&gt;</span>
                  <code className="text-emerald-300 truncate">{activeNode.code}</code>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Interactive Engineering Guarantee */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#f8f5ee]/50 pt-4 border-t border-[#f8f5ee]/10">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#e85a2d] animate-pulse" />
            <span className="text-[#f8f5ee] font-semibold">Proven in Production:</span>
            <span>WHO EMRO (Polio Eradication) · WOAH PVSIS (180 Member States)</span>
          </div>

          <div className="flex items-center gap-2 text-[#e85a2d]">
            <span>End-to-End Senior Craft</span>
            <ArrowRight className="size-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
