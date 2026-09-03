import React, { useState } from 'react';
import ExpandingArrowButton from '../components/ui/ExpandingArrowButton';
import { 
  Terminal, Copy, Check, MapPin, Clock, ArrowRight 
} from 'lucide-react';

export default function Contact() {
  const email = 'sabtainaliwazir@gmail.com';
  const whatsappUrl = 'https://wa.me/923329298679?text=Hello%20Sabtain,%20I%20would%20like%20to%20discuss%20an%20engineering%20project.';

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full-Stack Architecture',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service} from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.service}\n\nDetails:\n${formData.message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#100904] text-[#f8f5ee] pt-28 sm:pt-36 pb-24">
      {/* ─────────────────────────────────────────────────────────────
          1. CONTACT HERO HEADER
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-[78rem] pb-12 border-b border-[#f8f5ee]/10">
        <p className="eyebrow mb-3">Initiate Contact</p>
        <h1 className="display-h1">
          Let&#39;s Talk Systems.
        </h1>
        <p className="mt-5 max-w-2xl text-lead font-sans">
          Available for senior full-stack engineering contracts, epidemiological data pipeline builds, WebSocket architecture, and autonomous AI agents.
        </p>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. DIRECT CONTACT CHANNELS & SCOPING FORM
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-[78rem] mt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Fast Channels */}
          <div className="lg:col-span-5 space-y-8">
            {/* Live Availability Card */}
            <div className="rounded-3xl border border-[#e85a2d]/30 bg-[#e85a2d]/10 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs font-mono text-[#e85a2d] uppercase tracking-wider mb-2 font-semibold">
                <span className="size-2 rounded-full bg-[#e85a2d] animate-ping" />
                <span>Current Status</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#f8f5ee]">
                Open for Q3/Q4 Contracts
              </h3>
              <p className="mt-2 text-xs text-[#f8f5ee]/70 leading-relaxed font-sans">
                Taking on new enterprise full-stack development, surveillance data pipelines, and AI automation projects.
              </p>

              <div className="mt-6 pt-6 border-t border-[#f8f5ee]/10 space-y-3 font-mono text-xs text-[#f8f5ee]/60">
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-[#e85a2d]" />
                  <span>Islamabad, PK · Working Globally</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-[#e85a2d]" />
                  <span>Sub-4 Hour Response Time</span>
                </div>
              </div>
            </div>

            {/* Direct Email Card */}
            <div className="rounded-3xl border border-[#f8f5ee]/10 bg-[#1a120b] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-[#f8f5ee]/40 mb-2">
                Direct Email
              </p>
              <div className="flex items-center justify-between gap-3 mt-1">
                <span className="font-mono text-sm sm:text-base text-[#f8f5ee] truncate">
                  {email}
                </span>
                <button
                  onClick={copyEmail}
                  className="rounded-full border border-[#f8f5ee]/15 bg-white/[0.03] p-2.5 text-[#f8f5ee] hover:border-[#e85a2d] hover:text-[#e85a2d] transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="size-4 text-[#e85a2d]" /> : <Copy className="size-4" />}
                </button>
              </div>
              {copiedEmail && (
                <p className="font-mono text-xs text-[#e85a2d] mt-2">
                  Copied email to clipboard!
                </p>
              )}
            </div>

            {/* Direct WhatsApp Instant Connect */}
            <div className="rounded-3xl border border-[#f8f5ee]/10 bg-[#1a120b] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-[#f8f5ee]/40 mb-2">
                Instant Chat Dispatch
              </p>
              <h3 className="font-display text-xl font-semibold text-[#f8f5ee] mt-1">
                Connect on WhatsApp
              </h3>
              <p className="font-mono text-sm font-semibold text-[#e85a2d] mt-1">
                +92 332 9298679
              </p>
              <p className="mt-2 text-xs text-[#f8f5ee]/60 leading-relaxed font-sans">
                For urgent inquiries, project scopes, or direct technical discussions.
              </p>
              <div className="mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f8f5ee] px-6 py-3 text-xs font-semibold text-[#100904] transition-all hover:bg-white active:scale-[0.97]"
                >
                  <Terminal className="size-3.5 text-[#e85a2d]" />
                  <span>Start WhatsApp Conversation</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Direct LinkedIn Profile Card */}
            <div className="rounded-3xl border border-[#f8f5ee]/10 bg-[#1a120b] p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-wider text-[#f8f5ee]/40 mb-2">
                Professional Network
              </p>
              <h3 className="font-display text-xl font-semibold text-[#f8f5ee] mt-1">
                LinkedIn Profile
              </h3>
              <p className="font-mono text-xs font-semibold text-[#38bdf8] mt-1 truncate">
                linkedin.com/in/sabtainali123
              </p>
              <p className="mt-2 text-xs text-[#f8f5ee]/60 leading-relaxed font-sans">
                Explore enterprise experience, recommendations, and verified engineering history.
              </p>
              <div className="mt-6">
                <a
                  href="https://www.linkedin.com/in/sabtainali123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-xs font-semibold text-[#f8f5ee] hover:border-[#38bdf8] hover:text-[#38bdf8] transition-all"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl border border-[#f8f5ee]/10 bg-[#1a120b] p-8 sm:p-10">
            <p className="eyebrow mb-2">Project Brief</p>
            <h2 className="font-display text-3xl font-semibold text-[#f8f5ee] mb-6">
              Scope Your Engagement.
            </h2>

            {submitted ? (
              <div className="rounded-2xl border border-[#e85a2d]/30 bg-[#e85a2d]/10 p-8 text-center space-y-4">
                <div className="inline-flex size-12 items-center justify-center rounded-full bg-[#e85a2d] text-[#f8f5ee]">
                  <Check className="size-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#f8f5ee]">
                  Inquiry Dispatched
                </h3>
                <p className="text-sm text-[#f8f5ee]/75 max-w-md mx-auto font-sans">
                  Thank you! Your email client has been launched with your project brief. You will receive a response within 4 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-mono text-[#e85a2d] underline hover:text-[#f8f5ee]"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#f8f5ee]/60 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="editorial-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#f8f5ee]/60 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="editorial-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#f8f5ee]/60 mb-2">
                    Project Area
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="editorial-input"
                  >
                    <option value="Full-Stack Architecture" className="bg-[#1a120b]">
                      Full-Stack Architecture
                    </option>
                    <option value="WHO Surveillance / Data Pipeline" className="bg-[#1a120b]">
                      Surveillance & Data Pipelines
                    </option>
                    <option value="Real-Time WebSockets" className="bg-[#1a120b]">
                      Real-Time WebSockets
                    </option>
                    <option value="Autonomous AI Agent" className="bg-[#1a120b]">
                      Autonomous AI Agents & Bots
                    </option>
                    <option value="High-Conversion Portal / LegalTech" className="bg-[#1a120b]">
                      High-Conversion Web / LegalTech
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#f8f5ee]/60 mb-2">
                    Project Overview & Goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your systems, technical bottleneck, timeline, or scope..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-2xl border border-[#f8f5ee]/12 bg-white/[0.03] p-4 text-sm text-[#f8f5ee] focus:border-[#e85a2d] focus:bg-white/[0.05] focus:outline-none transition-all"
                  />
                </div>

                <div className="pt-2">
                  <ExpandingArrowButton accentColor="#e85a2d" className="h-14 min-w-64">
                    Send Project Brief
                  </ExpandingArrowButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
