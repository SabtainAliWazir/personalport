import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Database, Cpu, Activity, ShieldCheck, Terminal, 
  Code2, Layers, Globe, Sparkles, CheckCircle2, Server, ArrowRight,
  Boxes, Workflow, Flame, Check
} from 'lucide-react';

export default function ServiceHUDCanvas({ serviceId = 'wordpress-development' }) {
  const [wpTab, setWpTab] = useState('blocks'); // 'blocks' | 'graphql' | 'performance'
  const [copiedCode, setCopiedCode] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] border border-[#f8f5ee]/15 bg-[#100904] p-5 sm:p-6 text-[#f8f5ee] shadow-[0_1.5rem_4rem_rgba(16,9,4,0.5)] flex flex-col justify-between">
      {/* Background Radial Amber Glow & Grid */}
      <div 
        className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-[#e85a2d]/10 blur-[80px]"
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(#f8f5ee 1px, transparent 1px)',
          backgroundSize: '18px 18px'
        }}
      />

      {/* Top Status Capsule Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#f8f5ee]/10 pb-3 font-mono text-[0.7rem]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#e85a2d] animate-ping" />
          <span className="text-[#e85a2d] font-semibold uppercase tracking-wider">
            {serviceId.replace(/-/g, ' ')}
          </span>
        </div>
        <span className="uppercase tracking-widest text-[#f8f5ee]/40 rounded-full border border-[#f8f5ee]/10 px-2.5 py-0.5">
          Live Interactive Simulator
        </span>
      </div>

      {/* Dynamic Interactive Simulation Stage */}
      <div className="relative z-10 flex-1 my-3 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* ─────────────────────────────────────────────────────────────
              WORDPRESS DEVELOPMENT (Rich Interactive Block & Headless Simulator)
          ───────────────────────────────────────────────────────────── */}
          {serviceId === 'wordpress-development' && (
            <motion.div
              key="wordpress-development"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full space-y-3 font-mono"
            >
              {/* Tab Selector */}
              <div className="flex items-center gap-1.5 rounded-lg bg-[#1a120b] p-1 border border-[#f8f5ee]/10 text-[0.68rem]">
                <button
                  type="button"
                  onClick={() => setWpTab('blocks')}
                  className={`flex-1 rounded-md py-1 transition-all ${
                    wpTab === 'blocks' ? 'bg-[#e85a2d] text-[#f8f5ee] font-semibold' : 'text-[#f8f5ee]/60 hover:text-[#f8f5ee]'
                  }`}
                >
                  Gutenberg Blocks
                </button>
                <button
                  type="button"
                  onClick={() => setWpTab('graphql')}
                  className={`flex-1 rounded-md py-1 transition-all ${
                    wpTab === 'graphql' ? 'bg-[#e85a2d] text-[#f8f5ee] font-semibold' : 'text-[#f8f5ee]/60 hover:text-[#f8f5ee]'
                  }`}
                >
                  Headless GraphQL
                </button>
                <button
                  type="button"
                  onClick={() => setWpTab('performance')}
                  className={`flex-1 rounded-md py-1 transition-all ${
                    wpTab === 'performance' ? 'bg-[#e85a2d] text-[#f8f5ee] font-semibold' : 'text-[#f8f5ee]/60 hover:text-[#f8f5ee]'
                  }`}
                >
                  Object Cache
                </button>
              </div>

              {/* Dynamic Tab Body */}
              {wpTab === 'blocks' && (
                <div className="rounded-xl border border-[#f8f5ee]/10 bg-[#1a120b]/90 p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#e85a2d] font-semibold flex items-center gap-1.5">
                      <Boxes className="size-3.5" /> Bespoke ACF Block Tree
                    </span>
                    <span className="text-[0.65rem] text-[#f8f5ee]/50">0 Elementor Bloat</span>
                  </div>

                  {/* Animated Block Nodes */}
                  <div className="space-y-1.5 text-[0.72rem]">
                    <div className="flex items-center justify-between rounded-lg border border-[#e85a2d]/30 bg-[#e85a2d]/10 px-3 py-1.5 text-[#f8f5ee]">
                      <span className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-[#e85a2d] animate-pulse" />
                        &lt;HeroEditorialBlock /&gt;
                      </span>
                      <span className="text-[0.65rem] text-[#e85a2d]">PHP 8.3 + React</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[#f8f5ee]/10 bg-white/[0.02] px-3 py-1.5 text-[#f8f5ee]/80">
                      <span className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-[#f8f5ee]/40" />
                        &lt;DynamicCaseStudyGrid /&gt;
                      </span>
                      <span className="text-[0.65rem] text-[#f8f5ee]/40">ACF Pro Schema</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-[#f8f5ee]/10 bg-white/[0.02] px-3 py-1.5 text-[#f8f5ee]/80">
                      <span className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-[#f8f5ee]/40" />
                        &lt;ConsultationTriageFunnel /&gt;
                      </span>
                      <span className="text-[0.65rem] text-[#f8f5ee]/40">REST Webhook</span>
                    </div>
                  </div>
                </div>
              )}

              {wpTab === 'graphql' && (
                <div className="rounded-xl border border-[#f8f5ee]/10 bg-[#0a0603] p-3 text-[0.7rem] text-[#f8f5ee]/90 space-y-1 leading-relaxed">
                  <p className="text-[#e85a2d]">query GetHeadlessContent &#123;</p>
                  <p className="pl-3 text-[#f8f5ee]/80">post(slug: &quot;high-speed-build&quot;) &#123;</p>
                  <p className="pl-6 text-[#f8f5ee]/60">title, acfFields &#123; speedMetrics, schema &#125;</p>
                  <p className="pl-3 text-[#f8f5ee]/80">&#125;</p>
                  <p className="text-[#e85a2d]">&#125;</p>
                  <div className="mt-2 pt-2 border-t border-[#f8f5ee]/10 flex items-center justify-between text-[0.65rem] text-[#e85a2d]">
                    <span>Headless Next.js Hook</span>
                    <span>120ms Fast Query</span>
                  </div>
                </div>
              )}

              {wpTab === 'performance' && (
                <div className="rounded-xl border border-[#e85a2d]/30 bg-[#e85a2d]/10 p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#e85a2d] font-bold flex items-center gap-1.5">
                      <Flame className="size-3.5 text-[#e85a2d]" /> Redis Object Cache Pro
                    </span>
                    <span className="text-[0.68rem] font-bold text-[#f8f5ee] bg-[#e85a2d] px-2 py-0.5 rounded-full">
                      99.4% Hit Rate
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[0.7rem] pt-1">
                    <div className="bg-[#100904] rounded-lg p-2 border border-[#f8f5ee]/10">
                      <span className="text-[#f8f5ee] font-bold block text-sm">138ms</span>
                      <span className="text-[0.62rem] text-[#f8f5ee]/50 uppercase">Time to First Byte</span>
                    </div>
                    <div className="bg-[#100904] rounded-lg p-2 border border-[#f8f5ee]/10">
                      <span className="text-[#f8f5ee] font-bold block text-sm">&lt; 450KB</span>
                      <span className="text-[0.62rem] text-[#f8f5ee]/50 uppercase">Total Page Weight</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TECHNICAL SEO */}
          {serviceId === 'technical-seo' && (
            <motion.div
              key="technical-seo"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="w-full space-y-4"
            >
              <div className="flex items-center justify-between font-mono">
                <span className="text-xs text-[#f8f5ee]/60">Lighthouse Performance</span>
                <span className="font-display text-2xl font-bold text-[#e85a2d]">99 / 100</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="rounded-xl border border-[#f8f5ee]/10 bg-white/[0.02] p-2.5">
                  <span className="block text-base font-bold text-[#f8f5ee]">0.6s</span>
                  <span className="text-[0.65rem] text-[#f8f5ee]/50 uppercase">LCP (Fast)</span>
                </div>
                <div className="rounded-xl border border-[#f8f5ee]/10 bg-white/[0.02] p-2.5">
                  <span className="block text-base font-bold text-[#f8f5ee]">38ms</span>
                  <span className="text-[0.65rem] text-[#f8f5ee]/50 uppercase">INP (Zero Lag)</span>
                </div>
                <div className="rounded-xl border border-[#f8f5ee]/10 bg-white/[0.02] p-2.5">
                  <span className="block text-base font-bold text-[#f8f5ee]">0.00</span>
                  <span className="text-[0.65rem] text-[#f8f5ee]/50 uppercase">CLS (Stable)</span>
                </div>
              </div>
              <div className="space-y-1.5 font-mono text-[0.7rem] text-[#f8f5ee]/70">
                <div className="flex justify-between border-b border-[#f8f5ee]/5 pb-1">
                  <span>Server Render Path (SSR)</span>
                  <span className="text-[#e85a2d]">● 14ms edge response</span>
                </div>
                <div className="flex justify-between border-b border-[#f8f5ee]/5 pb-1">
                  <span>Crawl Budget Efficiency</span>
                  <span className="text-[#e85a2d]">● 100% 200 OK</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ON-PAGE SEO */}
          {serviceId === 'on-page-seo' && (
            <motion.div
              key="on-page-seo"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="w-full space-y-3 font-mono text-xs"
            >
              <div className="rounded-xl border border-[#f8f5ee]/10 bg-white/[0.02] p-3">
                <p className="text-[0.68rem] uppercase text-[#e85a2d] mb-1 font-semibold">Semantic Hierarchy</p>
                <div className="space-y-1.5 text-[0.72rem] text-[#f8f5ee]/80">
                  <div className="pl-1 border-l-2 border-[#e85a2d]">&lt;H1&gt; Intent-Targeted Headline&lt;/H1&gt;</div>
                  <div className="pl-4 border-l-2 border-[#f8f5ee]/20">&lt;H2&gt; High-Relevance Query Anchor&lt;/H2&gt;</div>
                  <div className="pl-7 border-l-2 border-[#f8f5ee]/10">&lt;Schema: LegalService JSON-LD&gt;</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[0.7rem] text-[#f8f5ee]/60 pt-1">
                <span>Internal Link Graph: Synced</span>
                <span className="text-[#e85a2d] font-semibold">No Cannibalization</span>
              </div>
            </motion.div>
          )}

          {/* GEO & AEO */}
          {serviceId === 'geo-aeo' && (
            <motion.div
              key="geo-aeo"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="w-full space-y-3 font-mono"
            >
              <div className="rounded-xl border border-[#f8f5ee]/10 bg-white/[0.02] p-3 text-xs">
                <div className="flex items-center justify-between text-[#e85a2d] mb-2 font-semibold">
                  <span className="flex items-center gap-1.5"><Sparkles className="size-3.5" /> LLM Citation Graph</span>
                  <span className="text-[0.68rem] bg-[#e85a2d]/15 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[0.7rem] text-[#f8f5ee]/80">
                  <div className="border border-[#f8f5ee]/5 rounded-lg p-2 bg-[#1a120b]">
                    <span className="text-[#e85a2d] block">Perplexity AI</span>
                    <span className="text-[0.65rem] text-[#f8f5ee]/50">Citation Rank #1</span>
                  </div>
                  <div className="border border-[#f8f5ee]/5 rounded-lg p-2 bg-[#1a120b]">
                    <span className="text-[#e85a2d] block">ChatGPT Search</span>
                    <span className="text-[0.65rem] text-[#f8f5ee]/50">Entity Verified</span>
                  </div>
                </div>
              </div>
              <p className="text-[0.68rem] text-[#f8f5ee]/50 text-center">Wikidata & Schema.org Semantic Triples Linked</p>
            </motion.div>
          )}

          {/* WEB DEVELOPMENT */}
          {serviceId === 'web-development' && (
            <motion.div
              key="web-development"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="w-full space-y-3 font-mono text-xs"
            >
              <div className="rounded-xl border border-[#f8f5ee]/10 bg-white/[0.02] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[#e85a2d] font-semibold">
                  <span>React 19 & Next.js App Router</span>
                  <span className="text-[0.65rem] bg-[#e85a2d]/20 px-2 py-0.5 rounded-full text-[#f8f5ee]">60 FPS</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[0.7rem] text-[#f8f5ee]/80">
                  <div className="rounded-lg border border-[#f8f5ee]/5 bg-[#1a120b] p-2">
                    <span className="text-[#f8f5ee] block font-semibold">TypeScript</span>
                    <span className="text-[0.65rem] text-[#f8f5ee]/50">Strict Type Safety</span>
                  </div>
                  <div className="rounded-lg border border-[#f8f5ee]/5 bg-[#1a120b] p-2">
                    <span className="text-[#f8f5ee] block font-semibold">Framer Motion</span>
                    <span className="text-[0.65rem] text-[#f8f5ee]/50">Spring Physics</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[0.68rem] text-[#f8f5ee]/60 pt-1">
                  <span>Bundle Size Budget</span>
                  <span className="text-[#e85a2d] font-semibold">&lt; 140KB Gzipped</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* FULL-STACK DEVELOPMENT */}
          {serviceId === 'full-stack-development' && (
            <motion.div
              key="full-stack-development"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="w-full space-y-3 font-mono text-xs"
            >
              <div className="rounded-xl border border-[#f8f5ee]/10 bg-white/[0.02] p-3.5 space-y-2.5">
                <span className="text-[#e85a2d] font-semibold text-xs block">3-Tier Distributed Pipeline</span>
                <div className="flex items-center justify-between text-[0.7rem] text-[#f8f5ee]/80 border-b border-[#f8f5ee]/10 pb-1.5">
                  <span className="flex items-center gap-1.5"><Globe className="size-3 text-[#e85a2d]" /> Client React</span>
                  <span>→ REST / JSON</span>
                </div>
                <div className="flex items-center justify-between text-[0.7rem] text-[#f8f5ee]/80 border-b border-[#f8f5ee]/10 pb-1.5">
                  <span className="flex items-center gap-1.5"><Server className="size-3 text-[#e85a2d]" /> Laravel 11 API</span>
                  <span>→ Queue Jobs</span>
                </div>
                <div className="flex items-center justify-between text-[0.7rem] text-[#f8f5ee]/80">
                  <span className="flex items-center gap-1.5"><Database className="size-3 text-[#e85a2d]" /> MySQL / Redis</span>
                  <span className="text-[#e85a2d] font-semibold">ACID Safe</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* WHO SURVEILLANCE */}
          {serviceId === 'who-surveillance' && (
            <motion.div
              key="who-surveillance"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="w-full space-y-3 font-mono text-xs"
            >
              <div className="rounded-xl border border-[#e85a2d]/30 bg-[#e85a2d]/10 p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#e85a2d] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5" /> WHO Surveillance Integrity
                  </span>
                  <span className="text-[0.68rem] font-bold text-[#f8f5ee] bg-[#e85a2d] px-2 py-0.5 rounded-full">
                    100% Match
                  </span>
                </div>
                <p className="text-[0.7rem] text-[#f8f5ee]/70 leading-relaxed font-sans">
                  Automated SQL reconciliation scripts resolving real-time specimen surveillance anomalies across regional labs.
                </p>
                <div className="flex items-center justify-between text-[0.68rem] text-[#f8f5ee]/60 border-t border-[#e85a2d]/20 pt-1.5">
                  <span>Data Discrepancies</span>
                  <span className="text-[#f8f5ee] font-bold">0.000%</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* REAL-TIME WEBSOCKETS */}
          {serviceId === 'real-time-websockets' && (
            <motion.div
              key="real-time-websockets"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="w-full space-y-3 font-mono text-xs"
            >
              <div className="rounded-xl border border-[#f8f5ee]/10 bg-white/[0.02] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[#e85a2d] font-semibold">
                  <span className="flex items-center gap-1.5"><Activity className="size-3.5" /> WOAH Socket Mesh</span>
                  <span className="text-[0.68rem] text-[#f8f5ee]/50">180+ Member States</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[0.7rem]">
                  <div className="bg-[#1a120b] border border-[#f8f5ee]/5 rounded-lg p-2">
                    <span className="text-[#f8f5ee] font-bold block">58ms</span>
                    <span className="text-[0.65rem] text-[#f8f5ee]/50">Broadcast Latency</span>
                  </div>
                  <div className="bg-[#1a120b] border border-[#f8f5ee]/5 rounded-lg p-2">
                    <span className="text-[#f8f5ee] font-bold block">5,000+</span>
                    <span className="text-[0.65rem] text-[#f8f5ee]/50">Concurrent Nodes</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[0.68rem] text-[#f8f5ee]/60 pt-1">
                  <span>Pub/Sub Backplane</span>
                  <span className="text-[#e85a2d] font-semibold">Redis Cluster</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI AGENTS */}
          {serviceId === 'ai-agents' && (
            <motion.div
              key="ai-agents"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="w-full space-y-3 font-mono text-xs"
            >
              <div className="rounded-xl border border-[#f8f5ee]/10 bg-[#0a0603] p-3.5 space-y-2">
                <div className="flex items-center justify-between border-b border-[#f8f5ee]/10 pb-1.5 text-[0.68rem]">
                  <span className="text-[#e85a2d] flex items-center gap-1.5"><Terminal className="size-3" /> WhatsApp / AI Agent</span>
                  <span className="text-[#f8f5ee]/40">Sub-400ms</span>
                </div>
                <div className="space-y-1 text-[0.68rem] text-[#f8f5ee]/80 font-sans">
                  <p className="text-[#f8f5ee]/50 font-mono">&gt; User: &quot;Need corporate litigation counsel.&quot;</p>
                  <p className="text-[#e85a2d] font-mono">&gt; Agent: [Intent: High-Value Retainer]</p>
                  <p className="text-[#f8f5ee]">&gt; Bot: &quot;Connecting with Counsel Kazimi on WhatsApp...&quot;</p>
                </div>
                <div className="flex items-center justify-between text-[0.65rem] font-mono text-[#f8f5ee]/50 pt-1">
                  <span>Tool Calling: Live CRM Sync</span>
                  <span className="text-[#e85a2d]">● 100% Auto</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Architectural Seal */}
      <div className="relative z-10 flex items-center justify-between border-t border-[#f8f5ee]/10 pt-3 text-[0.68rem] font-mono text-[#f8f5ee]/45">
        <span>Sabtain Ali · Systems Practice</span>
        <span className="text-[#e85a2d]">Ready to Scope →</span>
      </div>
    </div>
  );
}
