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
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-zinc-200 bg-white text-zinc-950 shadow-2xl z-10 my-auto"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 bg-zinc-50">
            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-[#f97316] animate-pulse" />
              <div>
                <p className="font-mono text-xs text-[#f97316] font-semibold">
                  Under the Hood · Architecture & Code
                </p>
                <h3 className="font-display text-base sm:text-lg font-semibold text-zinc-950">
                  {project.title} · {project.client}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid size-9 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 hover:border-[#f97316] hover:text-[#f97316] transition-all cursor-pointer shadow-sm"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-200 px-6 bg-zinc-50/50">
            <button
              type="button"
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 py-3 px-4 font-mono text-xs border-b-2 transition-all cursor-pointer ${
                activeTab === 'code'
                  ? 'border-[#f97316] text-zinc-950 font-semibold bg-[#f97316]/10'
                  : 'border-transparent text-zinc-500 hover:text-zinc-950'
              }`}
            >
              <Code2 className="size-3.5 text-[#f97316]" />
              <span>Code Snippet</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 py-3 px-4 font-mono text-xs border-b-2 transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'border-[#f97316] text-zinc-950 font-semibold bg-[#f97316]/10'
                  : 'border-transparent text-zinc-500 hover:text-zinc-950'
              }`}
            >
              <Database className="size-3.5 text-sky-500" />
              <span>System Architecture</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('impact')}
              className={`flex items-center gap-2 py-3 px-4 font-mono text-xs border-b-2 transition-all cursor-pointer ${
                activeTab === 'impact'
                  ? 'border-[#f97316] text-zinc-950 font-semibold bg-[#f97316]/10'
                  : 'border-transparent text-zinc-500 hover:text-zinc-950'
              }`}
            >
              <ShieldCheck className="size-3.5 text-emerald-500" />
              <span>Real-World Results</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
            {/* TAB 1: CODE SNIPPET */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500">
                    Production Code Sample
                  </span>

                  {project.engineering?.codeSnippet && (
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 font-mono text-xs text-zinc-700 hover:border-[#f97316] hover:text-zinc-950 transition-all cursor-pointer shadow-sm"
                    >
                      {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5 text-[#f97316]" />}
                      <span>{copied ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  )}
                </div>

                <div className="relative rounded-xl border border-zinc-800 bg-[#0c0a09] p-4 sm:p-6 overflow-x-auto shadow-xl">
                  <pre className="font-mono text-xs text-zinc-200 leading-relaxed">
                    <code>
                      {project.engineering?.codeSnippet || '// High-performance production code snippet verified in deployment.'}
                    </code>
                  </pre>
                </div>

                {project.engineering?.benchmarks && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                    {project.engineering.benchmarks.map((b, bi) => (
                      <div key={bi} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm">
                        <p className="font-mono text-[0.68rem] text-zinc-500">{b.metric}</p>
                        <p className="font-display text-sm font-bold text-[#f97316] mt-1">{b.value}</p>
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
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#f97316] font-semibold">
                    Core Architectural Design
                  </h4>
                  <p className="mt-2 text-sm text-zinc-700 font-sans leading-relaxed">
                    {project.engineering?.architecture || project.executive?.solution}
                  </p>
                </div>

                {project.engineering?.schemaOverview && (
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-sky-600 font-semibold flex items-center gap-2">
                      <Database className="size-3.5" />
                      <span>Database & Schema Overview</span>
                    </h4>
                    <p className="mt-2 text-xs text-zinc-600 font-sans leading-relaxed">
                      {project.engineering.schemaOverview}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    Delivered Architectural Milestones:
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {project.deliverables?.map((d, di) => (
                      <div key={di} className="flex items-start gap-2 text-xs text-zinc-700 font-sans">
                        <span className="text-[#f97316] font-bold">✓</span>
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
                  <blockquote className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6 italic font-serif text-sm sm:text-base text-zinc-800 leading-relaxed shadow-sm">
                    “{project.executive.quote.text}”
                    <div className="mt-3 pt-3 border-t border-zinc-200 not-italic font-sans text-xs">
                      <span className="font-semibold text-zinc-950">{project.executive.quote.author}</span>
                      <span className="text-zinc-500"> · {project.executive.quote.role}</span>
                    </div>
                  </blockquote>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics?.map((m, mi) => (
                    <div key={mi} className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-center shadow-sm">
                      <p className="font-display text-lg sm:text-xl font-bold text-[#f97316]">{m.value}</p>
                      <p className="font-mono text-[0.65rem] text-zinc-500 mt-1 uppercase tracking-wider">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-zinc-600 space-y-2">
                  <p><strong className="text-zinc-950">The Core Problem:</strong> {project.executive?.problem}</p>
                  <p><strong className="text-zinc-950">Business Impact:</strong> {project.executive?.impact}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 px-6 py-4 bg-zinc-50">
            <span className="font-mono text-xs text-zinc-400">
              Built and deployed by Sabtain Ali · Senior Full-Stack Engineer
            </span>

            <div className="flex items-center gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 font-mono text-xs text-zinc-700 hover:border-[#f97316] hover:text-zinc-950 transition-all shadow-sm"
                >
                  <ExternalLink className="size-3 text-[#f97316]" />
                  <span>Visit Live Site</span>
                </a>
              )}

              <Link
                href={`/portfolio/${project.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-[#f97316] px-5 py-2 font-mono text-xs font-semibold text-white hover:bg-[#ea580c] transition-all shadow-sm"
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
