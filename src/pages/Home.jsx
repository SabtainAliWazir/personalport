import { Link } from '../router/RouterContext';
import { PROJECTS, EXPERIENCE, TESTIMONIALS } from '../data/portfolioData';
import SEOHead from '../components/SEOHead';
import {
  absoluteUrl,
  AUTHOR_ID,
  AUTHOR_NAME,
  PROFILE_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '../data/site';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': AUTHOR_ID,
      name: AUTHOR_NAME,
      jobTitle: 'Full-Stack Developer',
      url: absoluteUrl('/about'),
      image: absoluteUrl(PROFILE_IMAGE),
      sameAs: ['https://www.linkedin.com/in/sabtainali123/', 'https://github.com/SabtainAliWazir'],
    },
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: SITE_NAME,
      url: absoluteUrl('/'),
      description: SITE_DESCRIPTION,
      author: { '@id': AUTHOR_ID },
    },
  ],
};

const HELP_AREAS = [
  {
    title: 'Full-stack web apps',
    description:
      'Building or updating web apps with React, TypeScript, Node.js, or Laravel - from database schemas and auth to a clean frontend.',
    href: '/service/full-stack-development',
    linkLabel: 'See full-stack work',
  },
  {
    title: 'Real-time & data systems',
    description:
      'Live chat, presence, and multi-user dashboards using Socket.io and Redis, alongside backend reporting and data reconciliation scripts.',
    href: '/service/real-time-websockets',
    linkLabel: 'See real-time work',
  },
  {
    title: 'Speed, WordPress & technical SEO',
    description:
      'Fixing Core Web Vitals, crawl and indexing bugs, and replacing slow page builders with lean custom WordPress themes.',
    href: '/service#technical-seo',
    linkLabel: 'See speed & SEO work',
  },
];

const DAILY_TOOLS = [
  {
    group: 'Frontend',
    items: 'React 19, TypeScript, Next.js, Tailwind CSS, HTML/CSS',
  },
  {
    group: 'Backend & data',
    items: 'Node.js, Express, Laravel 11, PHP 8.3, MySQL, PostgreSQL, Redis, Socket.io',
  },
  {
    group: 'Infrastructure & CMS',
    items: 'Docker, Cloudflare, Nginx, Custom WordPress, OpenAI API, Git',
  },
];

export default function Home({ recentPosts = [] }) {
  const featuredProjects = PROJECTS.slice(0, 4);
  const recentExperience = EXPERIENCE.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <SEOHead canonical="/" articleSchema={homeSchema} />

      {/* 1. LEFT-ALIGNED INTRO HERO */}
      <section
        id="top"
        aria-labelledby="hero-title"
        className="border-b border-zinc-200/80 pt-32 pb-16 sm:pt-40 sm:pb-20"
      >
        <div className="gutter mx-auto max-w-[68rem]">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <p className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600">
                <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                <span>Islamabad · Open to full-stack roles &amp; select freelance work</span>
              </p>

              <h1
                id="hero-title"
                className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.035em] text-zinc-950 text-balance sm:text-5xl lg:text-[3.5rem]"
              >
                Hi, I&#39;m Sabtain Ali. I build full-stack web apps and backend systems.
              </h1>

              <div className="mt-6 max-w-[58ch] space-y-4 font-sans text-base leading-relaxed text-zinc-600 sm:text-lg">
                <p>
                  I&#39;m a full-stack developer working mainly with React, TypeScript, Node.js, and Laravel.
                </p>
                <p>
                  Right now I work at SysReforms International, where I built the backend for CommutersLink (a Pakistan carpooling app) and work on web apps used by WHO and WOAH teams. Outside of work, I also take on freelance web app, backend, and speed projects.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Get in touch
                </Link>
                <a
                  href="#work"
                  className="inline-flex h-11 items-center rounded-full border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
                >
                  See projects
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-zinc-600">
                <a
                  href="mailto:sabtainali375@gmail.com"
                  className="underline underline-offset-4 transition-colors hover:text-zinc-950"
                >
                  sabtainali375@gmail.com
                </a>
                <a
                  href="/documents/sabainali_resume.pdf"
                  download
                  className="underline underline-offset-4 transition-colors hover:text-zinc-950"
                >
                  Resume (PDF)
                </a>
                <a
                  href="https://github.com/SabtainAliWazir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-zinc-950"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/sabtainali123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-zinc-950"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end">
              <figure className="max-w-[17rem]">
                <img
                  src={PROFILE_IMAGE}
                  alt="Sabtain Ali"
                  className="aspect-[4/5] w-full rounded-2xl border border-zinc-200/90 bg-zinc-100 object-cover object-top"
                />
                <figcaption className="mt-3 font-mono text-xs text-zinc-500">
                  React · TypeScript · Node.js · Laravel
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SELECTED WORK */}
      <section id="work" aria-labelledby="featured-work" className="border-b border-zinc-200/80 py-16 sm:py-24">
        <div className="gutter mx-auto max-w-[68rem]">
          <div className="flex flex-col gap-4 border-b border-zinc-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="featured-work" className="font-display text-3xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
                Selected work
              </h2>
              <p className="mt-2 font-sans text-sm text-zinc-600">
                Recent production systems, client websites, and backend tools I have shipped.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-[#f97316]"
            >
              <span>All {PROJECTS.length} projects</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-12 space-y-16">
            {featuredProjects.map((project, idx) => (
              <article
                key={project.slug}
                className="grid gap-8 border-b border-zinc-200/80 pb-14 last:border-0 last:pb-0 lg:grid-cols-12 lg:items-center"
              >
                <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50"
                  >
                    <img
                      src={project.heroImage}
                      srcSet={`${project.heroImage.replace('.webp', '-thumb.webp')} 320w, ${project.heroImage} ${project.heroImageWidth || 1280}w`}
                      sizes="(min-width: 1024px) 520px, 92vw"
                      loading="lazy"
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </Link>
                </div>

                <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="font-mono text-xs text-zinc-500">
                    {project.client} · {project.year}
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.025em] text-zinc-950 sm:text-3xl">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="transition-colors hover:text-[#f97316]"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="mt-3 max-w-[54ch] font-sans text-sm leading-relaxed text-zinc-600 sm:text-base">
                    {project.shortDesc}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md bg-zinc-100 px-2.5 py-1 font-mono text-xs text-zinc-700"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-semibold">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-zinc-950 transition-colors hover:text-[#f97316]"
                    >
                      <span>Read case study</span>
                      <ArrowRight className="size-4" />
                    </Link>

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-600 transition-colors hover:text-zinc-950"
                      >
                        <span>Live site</span>
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE */}
      <section id="experience" aria-labelledby="experience-heading" className="border-b border-zinc-200/80 py-16 sm:py-24">
        <div className="gutter mx-auto max-w-[68rem]">
          <div className="flex flex-col gap-4 border-b border-zinc-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="experience-heading" className="font-display text-3xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
              Experience
            </h2>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-[#f97316]"
            >
              <span>Full background &amp; resume</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 divide-y divide-zinc-200/80">
            {recentExperience.map((item, idx) => (
              <div key={idx} className="grid gap-2 py-6 first:pt-0 last:pb-0 md:grid-cols-12 md:gap-6">
                <div className="md:col-span-3 font-mono text-xs text-zinc-500">
                  <p>{item.period}</p>
                  <p className="mt-1 text-zinc-400">{item.location}</p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-lg font-semibold text-zinc-950">
                    {item.role} · <span className="font-normal text-zinc-600">{item.company}</span>
                  </h3>
                  <p className="mt-2 max-w-[65ch] font-sans text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT I BUILD & TOOLS */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="border-b border-zinc-200/80 bg-zinc-50/50 py-16 sm:py-24"
      >
        <div className="gutter mx-auto max-w-[68rem]">
          <div className="flex flex-col gap-4 border-b border-zinc-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="services-heading" className="font-display text-3xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
                How I can help
              </h2>
              <p className="mt-2 font-sans text-sm text-zinc-600">
                Available for engineering teams and fixed-scope client builds.
              </p>
            </div>
            <Link
              href="/service"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-[#f97316]"
            >
              <span>All services</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HELP_AREAS.map((area) => (
              <div
                key={area.title}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold text-zinc-950">
                    {area.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-sm leading-relaxed text-zinc-600">
                    {area.description}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href={area.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-[#f97316]"
                  >
                    <span>{area.linkLabel}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-zinc-200/80 pt-10">
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">
              Tools I use daily
            </h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              {DAILY_TOOLS.map((tool) => (
                <div key={tool.group}>
                  <p className="font-display text-sm font-semibold text-zinc-950">
                    {tool.group}
                  </p>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-zinc-600">
                    {tool.items}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECENT WRITING */}
      {recentPosts.length > 0 && (
        <section id="writing" aria-labelledby="writing-heading" className="border-b border-zinc-200/80 py-16 sm:py-24">
          <div className="gutter mx-auto max-w-[68rem]">
            <div className="flex flex-col gap-4 border-b border-zinc-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="writing-heading" className="font-display text-3xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
                  Recent writing
                </h2>
                <p className="mt-2 font-sans text-sm text-zinc-600">
                  Notes on backend architecture, web performance, and software bugs.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-[#f97316]"
              >
                <span>All articles</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <ul className="mt-8 divide-y divide-zinc-200/80">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="font-display text-base font-medium text-zinc-950 transition-colors group-hover:text-[#f97316] sm:text-lg">
                      {post.title}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-zinc-500">
                      {post.category} · {post.published_at}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 6. NOTES FROM CLIENTS & TEAMMATES */}
      <section aria-labelledby="notes-heading" className="py-16 sm:py-24">
        <div className="gutter mx-auto max-w-[68rem]">
          <h2 id="notes-heading" className="font-display text-3xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
            Notes from clients &amp; teammates
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <figure
                key={item.author}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-6"
              >
                <blockquote className="font-sans text-sm leading-relaxed text-zinc-700">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-zinc-100 pt-4">
                  <p className="font-display text-sm font-semibold text-zinc-950">
                    {item.author}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-zinc-500">
                    {item.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
