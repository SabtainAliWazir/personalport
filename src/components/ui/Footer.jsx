import React, { useState } from 'react';
import { useRouter, Link } from '../../router/RouterContext';
import ExpandingArrowButton from './ExpandingArrowButton';
import { Copy, Check, ArrowUpRight, Mail, Terminal } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'sabtainaliwazir@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="relative border-t border-zinc-200/80 bg-zinc-50/80 text-zinc-900 overflow-hidden pt-16 pb-12">
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 h-80 w-full max-w-4xl rounded-full bg-[#f97316]/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="gutter mx-auto max-w-[78rem] relative z-10">
        {/* Main CTA Section */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end pb-16 border-b border-zinc-200/80">
          <div className="lg:col-span-7">
            {/* Availability Chip */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f97316]/30 bg-orange-50 px-3.5 py-1 text-xs font-mono text-zinc-900 mb-6 shadow-sm">
              <span className="size-2 rounded-full bg-[#f97316] animate-ping" />
              <span>Available for engineering contracts & senior roles</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] text-zinc-950 leading-[0.98]">
              Let&#39;s build systems <br />
              <span className="italic font-normal text-zinc-500 font-serif">that scale & compound.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm text-zinc-600 leading-relaxed font-sans">
              Full-stack web engineering, custom WordPress, and technical SEO delivered with clean craftsmanship.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 items-start lg:items-end">
            <ExpandingArrowButton href="/contact" accentColor="#f97316" className="h-14 min-w-64">
              Start a project
            </ExpandingArrowButton>

            {/* Copy Email Bar */}
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-xs font-mono text-zinc-700 hover:border-[#f97316] hover:text-[#f97316] transition-colors shadow-sm cursor-pointer"
            >
              <Mail className="size-3.5 text-[#f97316]" />
              <span>{email}</span>
              {copied ? (
                <span className="text-[#f97316] flex items-center gap-1 font-sans font-semibold">
                  <Check className="size-3" /> Copied!
                </span>
              ) : (
                <Copy className="size-3 text-zinc-400" />
              )}
            </button>
          </div>
        </div>

        {/* Link Navigation Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4 border-b border-zinc-200/80">
          <div>
            <p className="label-mono text-xs text-zinc-400 mb-4">Navigation</p>
            <ul className="space-y-2 text-sm text-zinc-600 font-sans">
              <li>
                <Link href="/" className="hover:text-[#f97316] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#f97316] transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/service" className="hover:text-[#f97316] transition-colors">
                  Capabilities & Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#f97316] transition-colors">
                  Tech Concepts Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#f97316] transition-colors">
                  Career & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#f97316] transition-colors">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono text-xs text-zinc-400 mb-4">Core Focus</p>
            <ul className="space-y-2 text-sm text-zinc-600 font-sans">
              <li>
                <Link href="/service#full-stack-engineering" className="hover:text-[#f97316] transition-colors">
                  Full Stack Architecture
                </Link>
              </li>
              <li>
                <Link href="/service#data-pipelines-integrity" className="hover:text-[#f97316] transition-colors">
                  WHO Surveillance Pipelines
                </Link>
              </li>
              <li>
                <Link href="/service#real-time-systems" className="hover:text-[#f97316] transition-colors">
                  WebSocket Real-Time Hubs
                </Link>
              </li>
              <li>
                <Link href="/service#ai-agents-automation" className="hover:text-[#f97316] transition-colors">
                  Autonomous AI Agents
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono text-xs text-zinc-400 mb-4">Featured Work</p>
            <ul className="space-y-2 text-sm text-zinc-600 font-sans">
              <li>
                <Link href="/portfolio/who-eacr" className="hover:text-[#f97316] transition-colors">
                  WHO • e-ACR System
                </Link>
              </li>
              <li>
                <Link href="/portfolio/woah-pvsis" className="hover:text-[#f97316] transition-colors">
                  WOAH PVSIS Platform
                </Link>
              </li>
              <li>
                <Link href="/portfolio/khandowa-law" className="hover:text-[#f97316] transition-colors">
                  Khandowa Law & Bot
                </Link>
              </li>
              <li>
                <Link href="/portfolio/sales-closer" className="hover:text-[#f97316] transition-colors">
                  Sales Closer AI
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono text-xs text-zinc-400 mb-4">Connect</p>
            <ul className="space-y-2 text-sm text-zinc-600 font-sans">
              <li>
                <a
                  href="https://github.com/SabtainAliWazir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#f97316] transition-colors"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span>GitHub</span>
                  <ArrowUpRight className="size-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sabtainali123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#f97316] transition-colors"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                  <ArrowUpRight className="size-3 text-zinc-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923329298679"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#f97316] transition-colors"
                >
                  <Terminal className="size-3.5 text-[#f97316]" />
                  <span>WhatsApp Direct</span>
                  <ArrowUpRight className="size-3 text-zinc-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} Sabtain Ali. All rights reserved.</p>
          <p>Designed &amp; Coded by Sabtain Ali · Senior Full-Stack Software Engineer</p>
          <p>Islamabad, PK · Working with Clients Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
