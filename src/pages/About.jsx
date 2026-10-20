import React from 'react';
import { useRouter, Link } from '../router/RouterContext';
import { EXPERIENCE, CERTIFICATIONS } from '../data/portfolioData';
import ExpandingArrowButton from '../components/ui/ExpandingArrowButton';
import SEOHead from '../components/SEOHead';
import { ShieldCheck, Award, Briefcase, MapPin, Calendar } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 pt-28 sm:pt-36 pb-24">
      <SEOHead
        title="About Sabtain Ali · Senior Full-Stack Engineer"
        description="Biography, engineering philosophy, and background of Sabtain Ali. 4+ years developing mission-critical systems for WHO and international enterprise clients."
        canonical="/about"
      />
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL BIOGRAPHY & PHILOSOPHY
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-[78rem] pb-16 border-b border-zinc-200">
        <p className="eyebrow mb-3 text-[#f97316]">About · Sabtain Ali</p>
        <h1 className="display-h1 max-w-3xl text-zinc-950">
          Full-Stack Software Engineer building scalable web applications.
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-zinc-700 leading-relaxed font-sans">
            <p>
              I am a <strong className="text-zinc-950 font-semibold">Senior Full-Stack Software Engineer</strong> with 4+ years of professional experience building high-performance web applications, custom REST APIs, and automated data pipelines.
            </p>
            <p>
              Currently at <strong className="text-zinc-950 font-semibold">SysReforms International</strong>, I engineer core data verification engines and automated certification platforms for the <strong className="text-[#f97316] font-semibold">World Health Organization (WHO e-ACR)</strong> and the <strong className="text-[#f97316] font-semibold">World Organisation for Animal Health (WOAH PVSIS)</strong>. My code processes millions of health records with zero errors and powers real-time socket chat for international delegates across 180+ countries.
            </p>
            <p>
              Whether working with startups or international organizations, I build clean, test-driven software using <strong className="text-zinc-950 font-semibold">React, TypeScript, Node.js, and Laravel 11</strong> that delivers 99+ Google Core Web Vitals scores and real business growth.
            </p>
          </div>

          {/* Core Engineering Principles */}
          <div className="lg:col-span-5 rounded-3xl border border-zinc-200 bg-zinc-50/70 p-6 sm:p-8 space-y-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-wider text-[#f97316] flex items-center gap-2 font-semibold">
              <ShieldCheck className="size-4" />
              <span>Engineering Philosophy</span>
            </p>

            <div className="space-y-5 font-sans">
              <div className="border-l-2 border-[#f97316] pl-4">
                <h3 className="font-display text-lg font-semibold text-zinc-950">
                  1. Data Integrity Before Cosmetic Flair
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  A beautiful UI is worthless if the underlying data reconciliation fails. We guarantee consistency at the database and state tier first.
                </p>
              </div>

              <div className="border-l-2 border-[#f97316] pl-4">
                <h3 className="font-display text-lg font-semibold text-zinc-950">
                  2. Sub-Second Performance is a Feature
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Every query is indexed, every WebSocket room is partitioned, and every client bundle is budgeted for 99+ Core Web Vitals.
                </p>
              </div>

              <div className="border-l-2 border-[#f97316] pl-4">
                <h3 className="font-display text-lg font-semibold text-zinc-950">
                  3. Scoped Deliverables Over Endless Retainers
                </h3>
                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  Every engagement is defined by clear milestones, tested schemas, and comprehensive documentation for seamless handovers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CAREER & EXPERIENCE TIMELINE
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-[78rem] mt-20">
        <p className="eyebrow mb-2 text-[#f97316]">Track Record</p>
        <h2 className="display-h2 mb-12 text-zinc-950">Professional Experience.</h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:h-full before:w-px before:bg-zinc-200">
          {EXPERIENCE.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-6 sm:gap-8 group">
              {/* Timeline Indicator Dot */}
              <div className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-[#f97316]/40 bg-white text-[#f97316] shadow-sm shrink-0 mt-1 relative z-10 group-hover:bg-[#f97316] group-hover:text-white transition-colors">
                <Briefcase className="size-3.5" />
              </div>

              {/* Content Card */}
              <div className="flex-1 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm transition-all group-hover:border-[#f97316]/40 group-hover:shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="inline-block rounded-full bg-[#f97316]/10 px-2.5 py-0.5 font-mono text-[0.68rem] text-[#f97316] font-semibold mb-2">
                      {item.badge}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-zinc-950">
                      {item.role}
                    </h3>
                    <p className="font-sans text-sm text-zinc-700 font-medium mt-0.5">
                      {item.company}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs text-zinc-500 block flex items-center gap-1.5 justify-end">
                      <Calendar className="size-3 text-[#f97316]" />
                      {item.period}
                    </span>
                    <span className="font-mono text-[0.7rem] text-zinc-400 block mt-1 flex items-center gap-1 justify-end">
                      <MapPin className="size-3" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans border-t border-zinc-100 pt-4">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. VERIFIED CREDENTIALS & CERTIFICATIONS
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-[78rem] mt-24 pt-16 border-t border-zinc-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow mb-2 text-[#f97316]">Verified Qualifications</p>
            <h2 className="display-h2 text-zinc-950">Certifications & Education.</h2>
          </div>
          <span className="font-mono text-xs text-[#f97316] font-semibold">Meta · Johns Hopkins · Google</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200 bg-white p-5 flex flex-col justify-between shadow-sm hover:border-[#f97316]/40 hover:shadow-md transition-all"
            >
              <div>
                <Award className="size-5 text-[#f97316] mb-3" />
                <h3 className="font-sans text-sm font-semibold text-zinc-950 leading-snug">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100">
                <p className="font-mono text-xs text-zinc-500">{cert.org}</p>
                <span className="font-mono text-[0.65rem] text-[#f97316] uppercase tracking-wider block mt-0.5 font-semibold">
                  {cert.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM CTA
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-[78rem] mt-20 text-center">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50/80 p-10 sm:p-14 shadow-sm">
          <h2 className="display-h2 max-w-xl mx-auto text-zinc-950">
            Ready to build together?
          </h2>
          <p className="mt-4 max-w-md mx-auto text-sm text-zinc-600 font-sans">
            Let&#39;s engineer high-performance software with senior-level precision.
          </p>
          <div className="mt-8 flex justify-center">
            <ExpandingArrowButton href="/contact" accentColor="#f97316">
              Initiate Contact
            </ExpandingArrowButton>
          </div>
        </div>
      </section>
    </div>
  );
}
