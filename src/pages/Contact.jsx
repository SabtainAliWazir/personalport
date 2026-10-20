import React, { useState } from 'react';
import ExpandingArrowButton from '../components/ui/ExpandingArrowButton';
import SEOHead from '../components/SEOHead';
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
    <div className="min-h-screen bg-white text-zinc-950 pt-28 sm:pt-36 pb-24">
      <SEOHead
        title="Contact & Start a Project"
        description="Get in touch with Sabtain Ali for high-performance web development, WHO data platforms, custom AI integrations, and full-stack architecture."
        canonical="/contact"
      />
      {/* ─────────────────────────────────────────────────────────────
          1. CONTACT HERO HEADER
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-[78rem] pb-12 border-b border-zinc-200">
        <p className="eyebrow mb-3 text-[#f97316]">Get in Touch</p>
        <h1 className="display-h1 text-zinc-950">
          Let&#39;s Build Something Great Together.
        </h1>
        <p className="mt-5 max-w-2xl text-lead font-sans text-zinc-600">
          Have an ambitious project, need a reliable full-stack developer, or want to discuss technical architecture? I am always happy to connect.
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
            <div className="rounded-3xl border border-[#f97316]/30 bg-[#f97316]/5 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-mono text-[#f97316] uppercase tracking-wider mb-2 font-semibold">
                <span className="size-2 rounded-full bg-[#f97316] animate-ping" />
                <span>Current Status</span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-zinc-950">
                Open for Q3/Q4 Contracts
              </h3>
              <p className="mt-2 text-xs text-zinc-600 leading-relaxed font-sans">
                Taking on new enterprise full-stack development, surveillance data pipelines, and AI automation projects.
              </p>

              <div className="mt-6 pt-6 border-t border-[#f97316]/15 space-y-3 font-mono text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-[#f97316]" />
                  <span>Islamabad, PK · Working Globally</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-[#f97316]" />
                  <span>Sub-4 Hour Response Time</span>
                </div>
              </div>
            </div>

            {/* Direct Email Card */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                Direct Email
              </p>
              <div className="flex items-center justify-between gap-3 mt-1">
                <span className="font-mono text-sm sm:text-base text-zinc-950 font-semibold truncate">
                  {email}
                </span>
                <button
                  onClick={copyEmail}
                  className="rounded-full border border-zinc-200 bg-zinc-50 p-2.5 text-zinc-700 hover:border-[#f97316] hover:text-[#f97316] transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="size-4 text-[#f97316]" /> : <Copy className="size-4" />}
                </button>
              </div>
              {copiedEmail && (
                <p className="font-mono text-xs text-[#f97316] mt-2 font-semibold">
                  Copied email to clipboard!
                </p>
              )}
            </div>

            {/* Direct WhatsApp Instant Connect */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                Quick Chat
              </p>
              <h3 className="font-display text-xl font-semibold text-zinc-950 mt-1">
                Message on WhatsApp
              </h3>
              <p className="font-mono text-sm font-semibold text-[#f97316] mt-1">
                +92 332 9298679
              </p>
              <p className="mt-2 text-xs text-zinc-600 leading-relaxed font-sans">
                For urgent questions, project ideas, or direct engineering discussions.
              </p>
              <div className="mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-xs font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.97] shadow-sm"
                >
                  <Terminal className="size-3.5 text-[#f97316]" />
                  <span>Start WhatsApp Conversation</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Direct LinkedIn Profile Card */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                Professional Network
              </p>
              <h3 className="font-display text-xl font-semibold text-zinc-950 mt-1">
                LinkedIn Profile
              </h3>
              <p className="font-mono text-xs font-semibold text-sky-600 mt-1 truncate">
                linkedin.com/in/sabtainali123
              </p>
              <p className="mt-2 text-xs text-zinc-600 leading-relaxed font-sans">
                Explore enterprise experience, recommendations, and verified engineering history.
              </p>
              <div className="mt-6">
                <a
                  href="https://www.linkedin.com/in/sabtainali123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-6 py-3 text-xs font-semibold text-zinc-800 hover:border-sky-500 hover:text-sky-600 transition-all shadow-sm"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 shadow-sm">
            <p className="eyebrow mb-2 text-[#f97316]">Send a Message</p>
            <h2 className="font-display text-3xl font-semibold text-zinc-950 mb-6">
              Let&#39;s Discuss Your Project.
            </h2>

            {submitted ? (
              <div className="rounded-2xl border border-[#f97316]/30 bg-[#f97316]/10 p-8 text-center space-y-4">
                <div className="inline-flex size-12 items-center justify-center rounded-full bg-[#f97316] text-white">
                  <Check className="size-6" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-zinc-950">
                  Message Sent
                </h3>
                <p className="text-sm text-zinc-600 max-w-md mx-auto font-sans">
                  Thank you! Your email client has opened with your project note. I will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-mono text-[#f97316] underline hover:text-zinc-950"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
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
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                    Project Area
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="editorial-input"
                  >
                    <option value="Full-Stack Architecture">
                      Full-Stack Architecture
                    </option>
                    <option value="WHO Surveillance / Data Pipeline">
                      Surveillance & Data Pipelines
                    </option>
                    <option value="Real-Time WebSockets">
                      Real-Time WebSockets
                    </option>
                    <option value="Autonomous AI Agent">
                      Autonomous AI Agents & Bots
                    </option>
                    <option value="High-Conversion Portal / LegalTech">
                      High-Conversion Web / LegalTech
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                    Project Overview & Goals *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your systems, technical bottleneck, timeline, or scope..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 p-4 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-[#f97316] focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div className="pt-2">
                  <ExpandingArrowButton accentColor="#f97316" className="h-14 min-w-64">
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
