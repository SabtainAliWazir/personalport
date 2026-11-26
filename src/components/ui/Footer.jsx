import { useState } from 'react';
import { Link } from '../../router/RouterContext';
import { trackPortfolioEvent } from '../../lib/metrics';
import { Copy, Check, ArrowUpRight, Mail } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'sabtainali375@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50/70 pt-16 pb-12 text-zinc-900">
      <div className="gutter mx-auto max-w-[68rem]">
        {/* Main CTA Section */}
        <div className="grid gap-8 border-b border-zinc-200/80 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
              Want to work together?
            </h2>
            <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-zinc-600 sm:text-base">
              I&#39;m open to full-stack engineering roles and select freelance builds. Email is the fastest way to reach me.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Get in touch
            </Link>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 font-mono text-xs text-zinc-700 transition-colors hover:border-[#f97316] hover:text-[#f97316]"
            >
              <Mail className="size-3.5 text-[#f97316]" />
              <span>{email}</span>
              {copied ? (
                <span className="flex items-center gap-1 font-sans font-semibold text-[#f97316]">
                  <Check className="size-3" /> Copied
                </span>
              ) : (
                <Copy className="size-3 text-zinc-400" />
              )}
            </button>
          </div>
        </div>

        {/* Link Navigation Columns */}
        <div className="grid grid-cols-2 gap-8 border-b border-zinc-200/80 py-10 sm:grid-cols-3">
          <div>
            <p className="label-mono mb-4 text-xs text-zinc-400">Pages</p>
            <ul className="space-y-2 font-sans text-sm text-zinc-600">
              <li>
                <Link href="/" className="transition-colors hover:text-[#f97316]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="transition-colors hover:text-[#f97316]">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/service" className="transition-colors hover:text-[#f97316]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-[#f97316]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-[#f97316]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#f97316]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono mb-4 text-xs text-zinc-400">Selected work</p>
            <ul className="space-y-2 font-sans text-sm text-zinc-600">
              <li>
                <Link href="/portfolio/who-eacr" className="transition-colors hover:text-[#f97316]">
                  WHO e-ACR System
                </Link>
              </li>
              <li>
                <Link href="/portfolio/woah-pvsis" className="transition-colors hover:text-[#f97316]">
                  WOAH PVSIS Platform
                </Link>
              </li>
              <li>
                <Link href="/portfolio/commuters-link" className="transition-colors hover:text-[#f97316]">
                  CommutersLink
                </Link>
              </li>
              <li>
                <Link href="/portfolio/khandowa-law" className="transition-colors hover:text-[#f97316]">
                  Khandowa Law &amp; Bot
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-mono mb-4 text-xs text-zinc-400">Elsewhere</p>
            <ul className="space-y-2 font-sans text-sm text-zinc-600">
              <li>
                <a
                  href="https://github.com/SabtainAliWazir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#f97316]"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="size-3.5 text-zinc-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/sabtainali123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#f97316]"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="size-3.5 text-zinc-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923329298679"
                  onClick={() => trackPortfolioEvent('whatsapp_click')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#f97316]"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="size-3.5 text-zinc-400" />
                </a>
              </li>
              <li>
                <a
                  href="/documents/sabainali_resume.pdf"
                  download
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#f97316]"
                >
                  <span>Resume (PDF)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="flex flex-col items-start justify-between gap-2 pt-8 font-mono text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Sabtain Ali</p>
          <p>Islamabad, PK</p>
        </div>
      </div>
    </footer>
  );
}
