import { useRef, useState } from 'react';
import SEOHead from '../components/SEOHead';
import { trackPortfolioEvent } from '../lib/metrics';
import { Check, ChevronDown, Copy, ArrowUpRight } from 'lucide-react';

const TOPIC_OPTIONS = [
  'Full-time / contract engineering role',
  'Full-stack web app (React, Node.js, Laravel)',
  'Backend API, Maps, or real-time system',
  'WhatsApp bot or workflow automation',
  'Website speed, WordPress, or technical SEO',
  'Something else',
];

const INITIAL_FORM = {
  name: '',
  email: '',
  service: TOPIC_OPTIONS[0],
  message: '',
};

export default function Contact() {
  const email = 'sabtainali375@gmail.com';
  const whatsappUrl =
    'https://wa.me/923329298679?text=Hi%20Sabtain,%20I%20wanted%20to%20reach%20out%20about%20a%20role%20or%20project.';

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const request = useRef(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const subject = encodeURIComponent(`Inquiry: ${formData.service}${formData.name ? ` from ${formData.name}` : ''}`);
  const body = encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.service}\n\nDetails:\n${formData.message}`
  );
  const draftUrl = `mailto:${email}?subject=${subject}&body=${body}`;

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'sending') return;
    const website = new FormData(event.currentTarget).get('website');
    const payload = JSON.stringify({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      website,
    });
    if (request.current?.payload !== payload) {
      request.current = { payload, id: globalThis.crypto?.randomUUID?.() };
    }

    setStatus('sending');
    setError('');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 16000);
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (request.current.id) headers['Idempotency-Key'] = request.current.id;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers,
        body: payload,
        signal: controller.signal,
      });
      const result = await response.json();
      if (response.ok && result.accepted === true) {
        setStatus('sent');
        return;
      }
      setError(result.error || 'Your inquiry could not be confirmed. Please try again.');
    } catch {
      setError('The form is currently unavailable. You can open an email draft below.');
    } finally {
      clearTimeout(timeout);
    }
    setStatus('idle');
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 text-zinc-950 sm:pt-40">
      <SEOHead
        title="Contact"
        description="Get in touch with Sabtain Ali about full-stack engineering roles, freelance web applications, backend APIs, or technical SEO."
        canonical="/contact"
      />

      <section className="gutter mx-auto max-w-[68rem] border-b border-zinc-200/80 pb-10">
        <h1 className="font-display text-4xl font-bold tracking-[-0.035em] text-zinc-950 sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-zinc-600 sm:text-lg">
          Reach out about a full-stack role, a freelance build, or a backend/API problem. Email is usually the fastest way to reach me.
        </p>
      </section>

      <section className="gutter mx-auto mt-12 max-w-[68rem]">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Direct Contact Details */}
          <div className="space-y-8 lg:col-span-5">
            <p className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600">
              <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>Islamabad, PK · Open to full-time roles &amp; freelance work</span>
            </p>

            <div className="space-y-6 border-t border-zinc-200/80 pt-6">
              <div>
                <p className="font-mono text-xs text-zinc-500">Email</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="font-sans text-base font-semibold text-zinc-950 underline underline-offset-4 hover:text-[#f97316]"
                  >
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="size-3 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="font-mono text-xs text-zinc-500">WhatsApp</p>
                <a
                  href={whatsappUrl}
                  onClick={() => trackPortfolioEvent('whatsapp_click')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 font-sans text-base font-medium text-zinc-900 underline underline-offset-4 hover:text-[#f97316]"
                >
                  <span>Message on WhatsApp (+92 332 9298679)</span>
                  <ArrowUpRight className="size-4 text-zinc-400" />
                </a>
              </div>

              <div>
                <p className="font-mono text-xs text-zinc-500">Links</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-zinc-700">
                  <a
                    href="https://github.com/SabtainAliWazir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-zinc-950"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sabtainali123/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-zinc-950"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="/documents/sabainali_resume.pdf"
                    download
                    className="underline underline-offset-4 hover:text-zinc-950"
                  >
                    Resume (PDF)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 lg:col-span-7">
            <h2 className="font-display text-2xl font-semibold text-zinc-950">
              Send a message
            </h2>
            <p className="mt-1.5 font-sans text-sm text-zinc-600">
              Share what you are hiring for or building, and I will reply directly.
            </p>

            {status === 'sent' ? (
              <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-6">
                <div className="flex items-center gap-2 font-display text-lg font-semibold text-zinc-950">
                  <Check className="size-5 text-emerald-600" />
                  <span>Message sent</span>
                </div>
                <p className="mt-2 font-sans text-sm text-zinc-700">
                  Thanks for reaching out. I will reply to the email address you shared.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    request.current = null;
                    setFormData(INITIAL_FORM);
                    setStatus('idle');
                  }}
                  className="mt-4 cursor-pointer text-sm font-semibold text-zinc-900 underline underline-offset-4 hover:text-[#f97316]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                action="/api/contact"
                method="post"
                onSubmit={handleSubmit}
                aria-busy={status === 'sending'}
                className="mt-6 space-y-5 font-sans"
              >
                <div hidden>
                  <label htmlFor="contact-website">Leave this field blank</label>
                  <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-zinc-800">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="editorial-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-zinc-800">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="editorial-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-service" className="mb-1.5 block text-sm font-medium text-zinc-800">
                    What is this about?
                  </label>
                  <div className="relative">
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="editorial-input cursor-pointer appearance-none pr-10"
                    >
                      {TOPIC_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-zinc-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-zinc-800">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    maxLength={4000}
                    rows={5}
                    placeholder="Share a few details about the role, project, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="editorial-input resize-y"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex h-11 cursor-pointer items-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send message'}
                  </button>
                  <a href={draftUrl} className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-950">
                    Open email draft
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
