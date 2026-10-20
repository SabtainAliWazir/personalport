import React, { useState } from 'react';
import { useRouter, Link } from '../router/RouterContext';
import { PROJECTS } from '../data/portfolioData';
import GlareCard from '../components/ui/GlareCard';
import SEOHead from '../components/SEOHead';
import { 
  ArrowLeft, ArrowRight, ExternalLink, Database, 
  CheckCircle2, Code2, Briefcase, Terminal, Copy, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CaseStudy() {
  const { params } = useRouter();
  const slug = params?.slug || 'who-eacr';
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];

  const [mode, setMode] = useState('executive'); // 'executive' | 'engineering'
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : PROJECTS[0];

  const copyCode = () => {
    if (project.engineering?.codeSnippet) {
      navigator.clipboard.writeText(project.engineering.codeSnippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 pt-28 sm:pt-36 pb-24">
      <SEOHead
        title={`${project.title} · Case Study`}
        description={project.summary || project.subtitle}
        canonical={`/portfolio/${project.slug}`}
        image={project.heroImage || project.image}
      />
      {/* ─────────────────────────────────────────────────────────────
          1. CASE STUDY HEADER & NAVIGATION
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-5xl">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 hover:text-[#f97316] transition-colors mb-6"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to all work</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
          <span className="text-[#f97316] font-semibold">{project.id}</span>
          <span>·</span>
          <span className="text-zinc-900 font-medium">{project.client}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] mt-3 text-zinc-950">
          {project.title}
        </h1>

        <p className="mt-2 font-mono text-sm sm:text-base text-[#f97316] font-medium">
          {project.subtitle}
        </p>

        {/* Live Metrics Ribbon */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-zinc-200 py-6">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="border-l border-[#f97316]/40 pl-3">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-zinc-950">
                {m.value}
              </span>
              <p className="text-[0.68rem] font-mono uppercase text-zinc-500 tracking-wider mt-0.5">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. HIGH-RES MEDIA HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-5xl mt-10">
        <GlareCard
          src={project.heroImage}
          alt={project.title}
          aspectRatio="aspect-[16/9]"
          className="shadow-2xl"
        />

        {project.liveLink && (
          <div className="mt-4 flex justify-end">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-mono text-zinc-700 hover:border-[#f97316] hover:text-zinc-950 transition-colors shadow-sm"
            >
              <span>View Live Production Deployment</span>
              <ExternalLink className="size-3.5 text-[#f97316]" />
            </a>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SPLIT-SCREEN "EXECUTIVE VS ENGINEERING" INSPECTOR MODE
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-5xl mt-16">
        {/* Mode Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
          <div>
            <p className="eyebrow text-[#f97316]">Case Inspection Mode</p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mt-1 text-zinc-950">
              {mode === 'executive' ? 'Executive & Business Impact' : 'Engineering Telemetry & Specs'}
            </h2>
          </div>

          <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-100 p-1 shadow-sm self-start sm:self-auto">
            <button
              onClick={() => setMode('executive')}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-mono transition-all ${
                mode === 'executive'
                  ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-950'
              }`}
            >
              <Briefcase className="size-3.5" />
              <span>Executive</span>
            </button>

            <button
              onClick={() => setMode('engineering')}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-mono transition-all ${
                mode === 'engineering'
                  ? 'bg-[#f97316] text-white font-semibold shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-950'
              }`}
            >
              <Code2 className="size-3.5" />
              <span>Engineering</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mode Content */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {mode === 'executive' ? (
              <motion.div
                key="executive"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid gap-10 lg:grid-cols-12"
              >
                <div className="lg:col-span-8 space-y-8">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#f97316] mb-2 font-semibold">
                      The Operational Challenge
                    </h3>
                    <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans">
                      {project.executive.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#f97316] mb-2 font-semibold">
                      Strategic Engineering Approach
                    </h3>
                    <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans">
                      {project.executive.solution}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#f97316] mb-2 font-semibold">
                      Business & Compliance Impact
                    </h3>
                    <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans">
                      {project.executive.impact}
                    </p>
                  </div>
                </div>

                {/* Client Quote & Metadata Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                  {project.executive.quote && (
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 shadow-sm">
                      <p className="text-sm italic text-zinc-700 leading-relaxed font-serif">
                        “{project.executive.quote.text}”
                      </p>
                      <div className="mt-4 pt-4 border-t border-zinc-200">
                        <p className="font-semibold text-xs text-zinc-950">
                          {project.executive.quote.author}
                        </p>
                        <p className="text-[0.7rem] font-mono text-zinc-500">
                          {project.executive.quote.role}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 shadow-sm">
                    <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">
                      Core Technology Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[0.72rem] font-mono text-zinc-800 shadow-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="engineering"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {/* Architecture Overview */}
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#f97316] uppercase tracking-wider mb-3 font-semibold">
                    <Database className="size-4" />
                    <span>System Architecture & Data Flow</span>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
                    {project.engineering.architecture}
                  </p>

                  <div className="mt-6 pt-6 border-t border-zinc-200">
                    <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                      Schema & State Modeling:
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                      {project.engineering.schemaOverview}
                    </p>
                  </div>
                </div>

                {/* Technical Benchmarks */}
                <div className="grid gap-4 sm:grid-cols-3">
                  {project.engineering.benchmarks.map((b, bi) => (
                    <div
                      key={bi}
                      className="rounded-2xl border border-[#f97316]/25 bg-[#f97316]/5 p-5 shadow-sm"
                    >
                      <span className="font-display text-2xl sm:text-3xl font-semibold text-zinc-950">
                        {b.value}
                      </span>
                      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-zinc-500 mt-1">
                        {b.metric}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Representative Code Snippet (Developer Contrast: dark editor) */}
                {project.engineering.codeSnippet && (
                  <div className="rounded-2xl border border-zinc-800 bg-[#0c0a09] overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
                      <span className="font-mono text-xs text-zinc-400 flex items-center gap-2">
                        <Terminal className="size-3.5 text-[#f97316]" />
                        Production Script / Architecture Implementation
                      </span>

                      <button
                        onClick={copyCode}
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[0.7rem] font-mono text-zinc-400 hover:text-white transition-colors"
                      >
                        {copiedSnippet ? (
                          <>
                            <Check className="size-3 text-[#f97316]" />
                            <span className="text-[#f97316]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-5 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed">
                      <code>{project.engineering.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SCOPE & DELIVERABLES CHECKLIST
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-5xl mt-20 pt-12 border-t border-zinc-200">
        <p className="eyebrow mb-2 text-[#f97316]">Scope of Delivery</p>
        <h2 className="display-h3 mb-8 text-zinc-950">What Shipped to Production.</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {project.deliverables.map((deliv, di) => (
            <div
              key={di}
              className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <CheckCircle2 className="size-4 text-[#f97316] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                {deliv}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. NEXT / PREVIOUS CASE STUDY PAGINATION
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-5xl mt-24 pt-12 border-t border-zinc-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/portfolio/${prevProject.slug}`}
            className="group flex items-center gap-3 text-left w-full sm:w-auto"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 group-hover:border-[#f97316] text-zinc-700 group-hover:text-[#f97316] transition-colors shadow-sm">
              <ArrowLeft className="size-4" />
            </span>
            <div>
              <span className="font-mono text-[0.68rem] uppercase text-zinc-400 block">
                Previous Case
              </span>
              <span className="font-display text-lg sm:text-xl font-semibold text-zinc-950 group-hover:text-[#f97316] transition-colors">
                {prevProject.title}
              </span>
            </div>
          </Link>

          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="group flex items-center gap-3 text-right w-full sm:w-auto sm:justify-end"
          >
            <div>
              <span className="font-mono text-[0.68rem] uppercase text-zinc-400 block">
                Next Case
              </span>
              <span className="font-display text-lg sm:text-xl font-semibold text-zinc-950 group-hover:text-[#f97316] transition-colors">
                {nextProject.title}
              </span>
            </div>
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 group-hover:border-[#f97316] text-zinc-700 group-hover:text-[#f97316] transition-colors shadow-sm">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
