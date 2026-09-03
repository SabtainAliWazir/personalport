import React from 'react';
import { useRouter, Link } from '../router/RouterContext';
import { EXPERIENCE, CERTIFICATIONS } from '../data/portfolioData';
import ExpandingArrowButton from '../components/ui/ExpandingArrowButton';
import { ShieldCheck, Award, Briefcase, MapPin, Calendar } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#100904] text-[#f8f5ee] pt-28 sm:pt-36 pb-24">
      {/* ─────────────────────────────────────────────────────────────
          1. EDITORIAL BIOGRAPHY & PHILOSOPHY
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-[78rem] pb-16 border-b border-[#f8f5ee]/10">
        <p className="eyebrow mb-3">About · Sabtain Ali</p>
        <h1 className="display-h1 max-w-3xl">
          Engineering with rigor, integrity, and speed.
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#f8f5ee]/80 leading-relaxed font-sans">
            <p>
              I am a <strong className="text-[#f8f5ee]">Full-Stack Software Engineer</strong> focused on building fast web applications, reliable data pipelines, and custom software that solves practical business problems.
            </p>
            <p>
              Currently at <strong className="text-[#f8f5ee]">SysReforms International</strong>, I engineer core data reconciliation scripts and automated certification pipelines for the <strong className="text-[#e85a2d]">World Health Organization (WHO e-ACR)</strong> and the <strong className="text-[#e85a2d]">World Organisation for Animal Health (WOAH PVSIS)</strong>. My work guarantees mathematical consistency across multi-country health logs and powers real-time collaboration for international delegates.
            </p>
            <p>
              Over the past 4+ years, I have delivered 18+ client solutions globally across UK, US, and Middle East markets, combining clean architectural design with reliable hands-on code execution.
            </p>
          </div>

          {/* Core Engineering Principles */}
          <div className="lg:col-span-5 rounded-3xl border border-[#f8f5ee]/10 bg-[#1a120b] p-6 sm:p-8 space-y-6">
            <p className="font-mono text-xs uppercase tracking-wider text-[#e85a2d] flex items-center gap-2 font-semibold">
              <ShieldCheck className="size-4" />
              <span>Engineering Philosophy</span>
            </p>

            <div className="space-y-5 font-sans">
              <div className="border-l-2 border-[#e85a2d] pl-4">
                <h3 className="font-display text-lg font-semibold text-[#f8f5ee]">
                  1. Data Integrity Before Cosmetic Flair
                </h3>
                <p className="text-xs text-[#f8f5ee]/60 mt-1 leading-relaxed">
                  A beautiful UI is worthless if the underlying data reconciliation fails. We guarantee consistency at the database and state tier first.
                </p>
              </div>

              <div className="border-l-2 border-[#e85a2d] pl-4">
                <h3 className="font-display text-lg font-semibold text-[#f8f5ee]">
                  2. Sub-Second Performance is a Feature
                </h3>
                <p className="text-xs text-[#f8f5ee]/60 mt-1 leading-relaxed">
                  Every query is indexed, every WebSocket room is partitioned, and every client bundle is budgeted for 99+ Core Web Vitals.
                </p>
              </div>

              <div className="border-l-2 border-[#e85a2d] pl-4">
                <h3 className="font-display text-lg font-semibold text-[#f8f5ee]">
                  3. Scoped Deliverables Over Endless Retainers
                </h3>
                <p className="text-xs text-[#f8f5ee]/60 mt-1 leading-relaxed">
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
        <p className="eyebrow mb-2">Track Record</p>
        <h2 className="display-h2 mb-12">Professional Experience.</h2>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-4 before:h-full before:w-px before:bg-[#f8f5ee]/10">
          {EXPERIENCE.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-6 sm:gap-8 group">
              {/* Timeline Indicator Dot */}
              <div className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-[#e85a2d]/50 bg-[#100904] text-[#e85a2d] shadow-lg shrink-0 mt-1 relative z-10 group-hover:bg-[#e85a2d] group-hover:text-[#f8f5ee] transition-colors">
                <Briefcase className="size-3.5" />
              </div>

              {/* Content Card */}
              <div className="flex-1 rounded-2xl border border-[#f8f5ee]/10 bg-[#1a120b]/70 p-6 sm:p-8 transition-all group-hover:border-[#e85a2d]/40">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="inline-block rounded-full bg-[#e85a2d]/15 px-2.5 py-0.5 font-mono text-[0.68rem] text-[#e85a2d] font-semibold mb-2">
                      {item.badge}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#f8f5ee]">
                      {item.role}
                    </h3>
                    <p className="font-sans text-sm text-[#f8f5ee]/80 font-medium mt-0.5">
                      {item.company}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs text-[#f8f5ee]/50 block flex items-center gap-1.5 justify-end">
                      <Calendar className="size-3 text-[#e85a2d]" />
                      {item.period}
                    </span>
                    <span className="font-mono text-[0.7rem] text-[#f8f5ee]/40 block mt-1 flex items-center gap-1 justify-end">
                      <MapPin className="size-3" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#f8f5ee]/70 leading-relaxed font-sans border-t border-[#f8f5ee]/10 pt-4">
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
      <section className="gutter mx-auto max-w-[78rem] mt-24 pt-16 border-t border-[#f8f5ee]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow mb-2">Verified Qualifications</p>
            <h2 className="display-h2">Certifications & Education.</h2>
          </div>
          <span className="font-mono text-xs text-[#e85a2d]">Meta · Johns Hopkins · Google</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#f8f5ee]/10 bg-[#1a120b]/50 p-5 flex flex-col justify-between hover:border-[#e85a2d]/40 transition-colors"
            >
              <div>
                <Award className="size-5 text-[#e85a2d] mb-3" />
                <h3 className="font-sans text-sm font-semibold text-[#f8f5ee] leading-snug">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f8f5ee]/10">
                <p className="font-mono text-xs text-[#f8f5ee]/60">{cert.org}</p>
                <span className="font-mono text-[0.65rem] text-[#e85a2d] uppercase tracking-wider block mt-0.5">
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
        <div className="rounded-3xl border border-[#f8f5ee]/10 bg-[#1a120b] p-10 sm:p-14">
          <h2 className="display-h2 max-w-xl mx-auto">
            Ready to build together?
          </h2>
          <p className="mt-4 max-w-md mx-auto text-sm text-[#f8f5ee]/60 font-sans">
            Let&#39;s engineer high-performance software with senior-level precision.
          </p>
          <div className="mt-8 flex justify-center">
            <ExpandingArrowButton href="/contact" accentColor="#e85a2d">
              Initiate Contact
            </ExpandingArrowButton>
          </div>
        </div>
      </section>
    </div>
  );
}
