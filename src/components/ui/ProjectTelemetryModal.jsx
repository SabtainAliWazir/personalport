import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Code2, Database, ShieldCheck, Copy, Check, 
  ExternalLink, ArrowRight, Terminal, Activity, Layers
} from 'lucide-react';
import { Link } from '../../router/RouterContext';

export default function ProjectTelemetryModal({ project, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'architecture' | 'impact'
  const [copied, setCopied] = useState(false);

  if (!isOpen || !project) return null;

  const handleCopy = () => {
    if (project.engineering?.codeSnippet) {
      navigator.clipboard.writeText(project.engineering.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#080503]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#100904] text-[#f8f5ee] shadow-[0_3rem_6rem_rgba(0,0,0,0.8)] z-10 my-auto"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#160e08]">
            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-[#e85a2d] animate-pulse" />
              <div>
                <p className="font-mono text-xs text-[#e85a2d] font-semibold">
                  Engineering Telemetry & Architecture Specimen
                </p>
                <h3 className="font-display text-base sm:text-lg font-semibold text-[#f8f5ee]">
                  {project.title} · {project.client}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#f8f5ee]/70 hover:border-[#e85a2d] hover:text-[#f8f5ee] transition-all cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 px-6 bg-white/[0.01]">
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 py-3 px-4 font-mono text-xs border-b-2 transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'border-[#e85a2d] text-[#f8f5ee] font-semibold bg-[#e85a2d]/10'
                  : 'border-transparent text-[#f8f5ee]/50 hover:text-[#f8f5ee]'
              }`}
            >
              <Code2 className="size-3.5 text-[#e85a2d]" />
              <span>Production Code Snippet</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 py-3 px-4 font-mono text-xs border-b-2 transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'border-[#e85a2d] text-[#f8f5ee] font-semibold bg-[#e85a2d]/10'
                  : 'border-transparent text-[#f8f5ee]/50 hover:text-[#f8f5ee]'
              }`}
            >
              <Database className="size-3.5 text-sky-400" />
              <span>System Architecture</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('impact')}
              className={`flex items-center gap-2 py-3 px-4 font-mono text-xs border-b-2 transition-all cursor-pointer ${
                activeTab === 'impact'
                  ? 'border-[#e85a2d] text-[#f8f5ee] font-semibold bg-[#e85a2d]/10'
                  : 'border-transparent text-[#f8f5ee]/50 hover:text-[#f8f5ee]'
              }`}
            >
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>Executive ROI & Proof</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
            {/* TAB 1: CODE SNIPPET */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#f8f5ee]/60">
                    Deterministic Backend Execution Implementation
                  </span>

                  {project.engineering?.codeSnippet && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-[#f8f5ee] hover:border-[#e85a2d] transition-all cursor-pointer"
                    >
                      {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5 text-[#e85a2d]" />}
                      <span>{copied ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  )}
                </div>

                <div className="relative rounded-xl border border-white/10 bg-[#0a0604] p-4 sm:p-6 overflow-x-auto shadow-inner">
                  <pre className="font-mono text-xs text-amber-200/90 leading-relaxed">
                    <code>
                      {project.engineering?.codeSnippet || '// High-performance production code snippet verified in deployment.'}
                    </code>
                  </pre>
                </div>

                {project.engineering?.benchmarks && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                    {project.engineering.benchmarks.map((b, bi) => (
                      <div key={bi} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                        <p className="font-mono text-[0.68rem] text-[#f8f5ee]/50">{b.metric}</p>
                        <p className="font-display text-sm font-bold text-[#e85a2d] mt-1">{b.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SYSTEM ARCHITECTURE */}
            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#e85a2d] font-semibold">
                    Core Architectural Design
                  </h4>
                  <p className="mt-2 text-sm text-[#f8f5ee]/85 font-sans leading-relaxed">
                    {project.engineering?.architecture || project.executive?.solution}
                  </p>
                </div>

                {project.engineering?.schemaOverview && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-2">
                      <Database className="size-3.5" />
                      <span>Database & Schema Overview</span>
                    </h4>
                    <p className="mt-2 text-xs text-[#f8f5ee]/70 font-sans leading-relaxed">
                      {project.engineering.schemaOverview}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#f8f5ee]/40 mb-2">
                    Delivered Architectural Milestones:
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {project.deliverables?.map((d, di) => (
                      <div key={di} className="flex items-start gap-2 text-xs text-[#f8f5ee]/80 font-sans">
                        <span className="text-[#e85a2d] font-bold">✓</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: EXECUTIVE ROI & PROOF */}
            {activeTab === 'impact' && (
              <div className="space-y-6">
                {project.executive?.quote && (
                  <blockquote className="rounded-2xl border border-white/10 bg-[#160e08] p-5 sm:p-6 italic font-serif text-sm sm:text-base text-[#f8f5ee]/90 leading-relaxed">
                    “{project.executive.quote.text}”
                    <div className="mt-3 pt-3 border-t border-white/10 not-italic font-sans text-xs">
                      <span className="font-semibold text-[#f8f5ee]">{project.executive.quote.author}</span>
                      <span className="text-[#f8f5ee]/50"> · {project.executive.quote.role}</span>
                    </div>
                  </blockquote>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics?.map((m, mi) => (
                    <div key={mi} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                      <p className="font-display text-lg sm:text-xl font-bold text-[#e85a2d]">{m.value}</p>
                      <p className="font-mono text-[0.65rem] text-[#f8f5ee]/60 mt-1 uppercase tracking-wider">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-[#f8f5ee]/70 space-y-2">
                  <p><strong className="text-[#f8f5ee]">The Core Problem:</strong> {project.executive?.problem}</p>
                  <p><strong className="text-[#f8f5ee]">Business Impact:</strong> {project.executive?.impact}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 px-6 py-4 bg-[#160e08]">
            <span className="font-mono text-xs text-[#f8f5ee]/40">
              Validated Production System · Direct Engineering Execution
            </span>

            <div className="flex items-center gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-[#f8f5ee] hover:border-[#e85a2d] transition-all"
                >
                  <ExternalLink className="size-3 text-[#e85a2d]" />
                  <span>Live Production</span>
                </a>
              )}

              <Link
                href={`/portfolio/${project.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-[#e85a2d] px-5 py-2 font-mono text-xs font-semibold text-[#f8f5ee] hover:bg-[#ff7e53] transition-all shadow-md"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
