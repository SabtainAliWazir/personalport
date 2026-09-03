import React from 'react';
import { useRouter, Link } from '../router/RouterContext';
import { PROJECTS, SERVICES, TESTIMONIALS, TECH_MARQUEE } from '../data/portfolioData';
import DeveloperWorkflowStage from '../components/ui/DeveloperWorkflowStage';
import CapabilitiesExhibition from '../components/ui/CapabilitiesExhibition';
import ArtisticEndorsements from '../components/ui/ArtisticEndorsements';
import ExpandingArrowButton from '../components/ui/ExpandingArrowButton';
import GlareCard from '../components/ui/GlareCard';
import { 
  ArrowRight, ArrowUpRight, Activity, ShieldCheck, Zap, 
  Database, Cpu, CheckCircle2, Star, Sparkles, Terminal, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const featuredProjects = PROJECTS.slice(0, 4);

  return (
    <div className="relative min-h-screen bg-[#100904] text-[#f8f5ee] overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Webroco Signature Warm Cream Hero Stage)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="top"
        aria-labelledby="hero-title"
        className="relative isolate min-h-[clamp(42rem,60vw,62rem)] overflow-hidden bg-[#f8f5ee] pb-[5rem] pt-[7.5rem] text-[#100904] sm:pb-[6rem] sm:pt-[8.5rem] lg:pb-[7rem] lg:pt-[9rem]"
      >
        {/* Webroco Signature Radial Glow & Gradient */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_78%,rgba(232,90,45,0.08),transparent_35%),linear-gradient(180deg,#f8f5ee,rgba(255,255,255,0.85))]"
          aria-hidden="true"
        />

        <div className="relative z-20 gutter mx-auto max-w-[120rem]">
          <div className="mx-auto flex max-w-[68rem] flex-col items-center text-center">
            {/* Pill Capsule Badge */}
            <p className="mb-6 flex max-w-full flex-col items-center justify-center gap-1 rounded-2xl border border-[#100904]/15 bg-[#f8f5ee]/85 px-3 py-2 text-[0.75rem] font-mono uppercase leading-[1.2] tracking-[0.12em] text-[#100904]/70 backdrop-blur-sm sm:mb-8 sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:py-1.5">
              <span className="whitespace-nowrap rounded-full bg-[#100904] px-2.5 py-1 text-[#f8f5ee] font-sans font-semibold">
                Senior Full-Stack Engineer
              </span>
              <span className="max-w-[28ch] text-center sm:max-w-none sm:whitespace-nowrap font-mono">
                WHO / WOAH Contributor · 18+ Deployments
              </span>
            </p>

            {/* Display Headline with Signature Webroco Capsule */}
            <h1
              id="hero-title"
              className="w-full max-w-[17ch] text-balance font-display text-[clamp(2.85rem,7.2vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.065em] text-[#100904]"
            >
              Custom software{' '}
              <span className="hero-title-capsule inline-flex align-[0.08em] rounded-full border border-[#100904]/70 bg-[#100904]/[0.04] px-[0.2em] py-[0.02em] transition-transform duration-300 hover:rotate-[-2deg] font-normal italic font-serif">
                built to solve
              </span>{' '}
              real problems.
            </h1>

            {/* Lead Paragraph */}
            <div className="mt-6 max-w-[40rem] sm:mt-7">
              <p className="text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.45] text-[#100904]/65 font-sans">
                I help companies build fast web applications, reliable data pipelines for organizations like the <strong className="text-[#100904] font-semibold">World Health Organization</strong>, and custom software that grows your business.
              </p>
            </div>

            {/* Avatar Group & Star Rating */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:mt-7">
              <div className="flex -space-x-2 overflow-hidden" aria-hidden="true">
                {TESTIMONIALS.map((t, idx) => (
                  <span
                    key={idx}
                    title={`${t.author} · ${t.role}`}
                    className="relative flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#f8f5ee] bg-[#100904] text-xs font-semibold text-[#f8f5ee] shadow-sm"
                  >
                    {t.initials}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-[#100904]">
                <span className="flex tracking-[0.08em] text-[#e85a2d]">
                  ★★★★★
                </span>
                <span>5.0</span>
              </div>

              <span className="w-full text-xs text-[#100904]/55 sm:w-auto sm:border-l sm:border-[#100904]/15 sm:pl-4 font-mono">
                Trusted across 18+ client solutions
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
              <ExpandingArrowButton href="/contact" accentColor="#e85a2d" className="h-14 min-w-64">
                Start a project
              </ExpandingArrowButton>

              <Link
                href="/portfolio"
                className="group inline-flex h-14 items-center gap-2 rounded-full border border-[#100904]/20 bg-[#f8f5ee]/80 px-7 text-sm font-semibold text-[#100904] transition-[background-color,transform,border-color] duration-200 hover:border-[#100904]/40 hover:bg-white active:scale-[0.97]"
              >
                <span>See the work</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              ANIMATED POINTER ARROWS TO WORKFLOW STAGE
          ───────────────────────────────────────────────────────────── */}
          <div className="mt-10 mb-2 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-[#100904]/70">
            <span className="hidden sm:inline-block h-px w-12 bg-[#100904]/15" />
            <div className="flex items-center gap-2 rounded-full border border-[#100904]/15 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
              <span className="inline-block animate-bounce text-[#e85a2d] font-bold">↓</span>
              <span className="font-semibold text-[#100904]">Explore My 5-Step Engineering Process</span>
              <span className="inline-block animate-bounce text-[#e85a2d] font-bold">↓</span>
            </div>
            <span className="hidden sm:inline-block h-px w-12 bg-[#100904]/15" />
          </div>

          {/* ─────────────────────────────────────────────────────────────
              5-STEP PROBLEM-SOLVER DEVELOPER WORKFLOW CONVEYOR
          ───────────────────────────────────────────────────────────── */}
          <div className="relative w-full">
            {/* Main Central Stage */}
            <DeveloperWorkflowStage />
          </div>
        </div>

        {/* Bottom Fade Gradient Transition */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#100904] to-transparent" aria-hidden="true" />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. TRACK RECORD METRICS RIBBON (Webroco Exact DL)
      ───────────────────────────────────────────────────────────── */}
      <section aria-label="Track record" className="gutter border-y border-[#f8f5ee]/10 py-[6vh] bg-[#100904]">
        <dl className="grid grid-cols-2 gap-[5vh_var(--grid-gap)] lg:grid-cols-4 max-w-[78rem] mx-auto">
          <div className="lg:pl-[var(--grid-gap)] lg:first:pl-0">
            <dd className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#f8f5ee] tabular-nums">
              18<span className="text-[#e85a2d]">+</span>
            </dd>
            <dt className="label-metric mt-2 text-xs font-mono uppercase tracking-[0.12em] text-[#f8f5ee]/45 block">
              Deployments shipped
            </dt>
          </div>

          <div className="lg:pl-[var(--grid-gap)] lg:first:pl-0">
            <dd className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#f8f5ee] tabular-nums">
              100<span className="text-[#e85a2d]">%</span>
            </dd>
            <dt className="label-metric mt-2 text-xs font-mono uppercase tracking-[0.12em] text-[#f8f5ee]/45 block">
              WHO data consistency
            </dt>
          </div>

          <div className="lg:pl-[var(--grid-gap)] lg:first:pl-0">
            <dd className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#f8f5ee] tabular-nums">
              180<span className="text-[#e85a2d]">+</span>
            </dd>
            <dt className="label-metric mt-2 text-xs font-mono uppercase tracking-[0.12em] text-[#f8f5ee]/45 block">
              WOAH member states
            </dt>
          </div>

          <div className="lg:pl-[var(--grid-gap)] lg:first:pl-0">
            <dd className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[#f8f5ee] tabular-nums">
              99<span className="text-[#e85a2d]">+</span>
            </dd>
            <dt className="label-metric mt-2 text-xs font-mono uppercase tracking-[0.12em] text-[#f8f5ee]/45 block">
              Core Web Vitals & SEO
            </dt>
          </div>
        </dl>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. INFINITE TECH MARQUEE (Webroco Ticker)
      ───────────────────────────────────────────────────────────── */}
      <section aria-label="Tools and platforms we ship on" className="relative overflow-hidden border-b border-[#f8f5ee]/10 py-5 bg-[#100904]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#100904] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#100904] to-transparent" />

        <div className="animate-marquee flex items-center gap-10">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, idx) => (
            <div
              key={idx}
              className="flex shrink-0 items-center gap-3 text-[#f8f5ee]/40 hover:text-[#f8f5ee] transition-colors"
            >
              <span className="font-display text-lg font-medium tracking-tight text-[#f8f5ee]/85">
                {tech.name}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider rounded-full border border-[#f8f5ee]/10 px-2.5 py-0.5 text-[#f8f5ee]/45">
                {tech.type}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SELECTED WORK SPOTLIGHT (Webroco Glare Cards & Editorial)
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="featured-work" className="py-20 sm:py-28 gutter mx-auto max-w-[78rem]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#f8f5ee]/10">
          <div>
            <p className="eyebrow mb-2">Selected Case Studies · 2025–2026</p>
            <h2 id="featured-work" className="display-h2">
              Recent Case Studies.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[#e85a2d] hover:text-[#f8f5ee] transition-colors"
          >
            <span>View all 9 case studies</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 space-y-20">
          {featuredProjects.map((project, idx) => (
            <article
              key={project.slug}
              className="group grid gap-8 lg:grid-cols-12 lg:items-center pb-16 border-b border-[#f8f5ee]/10 last:border-0"
            >
              {/* Image Preview with Webroco Glare Sheen */}
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Link href={`/portfolio/${project.slug}`} className="block">
                  <GlareCard
                    src={project.heroImage}
                    alt={project.title}
                    aspectRatio="aspect-[16/10]"
                  >
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center rounded-full bg-[#100904]/85 backdrop-blur-md px-3 py-1 font-mono text-[0.7rem] text-[#e85a2d] border border-[#f8f5ee]/15 font-semibold">
                        {project.categoryTag}
                      </span>
                    </div>
                  </GlareCard>
                </Link>
              </div>

              {/* Text Editorial Description */}
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3 text-xs font-mono text-[#f8f5ee]/50">
                  <span className="text-[#e85a2d] font-semibold">{project.id}</span>
                  <span>·</span>
                  <span>{project.category}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.04em] mt-3 text-[#f8f5ee] group-hover:text-[#e85a2d] transition-colors">
                  <Link href={`/portfolio/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                <p className="mt-3.5 text-sm text-[#f8f5ee]/65 leading-relaxed font-sans">
                  {project.shortDesc}
                </p>

                {/* Micro Metric Callout */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#f8f5ee]/10 pt-4">
                  {project.metrics.slice(0, 2).map((m, mi) => (
                    <div key={mi}>
                      <span className="font-display text-2xl font-semibold text-[#f8f5ee]">
                        {m.value}
                      </span>
                      <p className="text-[0.7rem] font-mono uppercase text-[#f8f5ee]/45 tracking-wider mt-0.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Read Case CTA Button */}
                <div className="mt-6">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[#e85a2d] group/btn"
                  >
                    <span>Read the case</span>
                    <span className="inline-flex size-8 items-center justify-center rounded-full border border-[#e85a2d]/45 transition-colors duration-200 group-hover/btn:bg-[#e85a2d] group-hover/btn:text-[#f8f5ee]">
                      ↗
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. CORE CAPABILITIES (01—06 Numbered Chapters)
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="services-section" className="py-20 sm:py-28 border-t border-[#f8f5ee]/10 bg-[#1a120b]/60">
        <div className="gutter mx-auto max-w-[78rem]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#f8f5ee]/10">
            <div>
              <p className="eyebrow mb-2">Capabilities</p>
              <h2 id="services-section" className="display-h2">
                Engineering Capabilities.
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#f8f5ee]/65 font-sans leading-relaxed">
              Clear services with defined deliverables so you know exactly what gets built and delivered.
            </p>
          </div>

          <div className="mt-12">
            <CapabilitiesExhibition />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. CLIENT & PEER ENDORSEMENTS (Artistic Luxury Showcase)
      ───────────────────────────────────────────────────────────── */}
      <section aria-label="Endorsements" className="py-20 sm:py-28 gutter mx-auto max-w-[78rem] border-t border-[#f8f5ee]/10">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="eyebrow mb-3">Client Endorsements</p>
          <h2 className="display-h2">
            Built on Trust & Delivery.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#f8f5ee]/65 font-sans leading-relaxed">
            Real feedback and verified outcomes from executives and clients who trusted me with mission-critical systems.
          </p>
        </div>

        <ArtisticEndorsements />
      </section>
    </div>
  );
}
