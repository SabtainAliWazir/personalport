import { useState } from 'react';
import { Link } from '../router/RouterContext';
import { PROJECTS } from '../data/portfolioData';
import SEOHead from '../components/SEOHead';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const FILTER_GROUPS = [
  { id: 'all', label: 'All', slugs: null },
  { id: 'backend', label: 'Backend & Data', slugs: ['who-eacr', 'woah-pvsis', 'scale-wise'] },
  { id: 'mobility', label: 'Mobility & Logistics', slugs: ['commuters-link', 'britons-route'] },
  { id: 'ai', label: 'AI & Automation', slugs: ['khandowa-law', 'sales-closer'] },
  { id: 'web', label: 'Web & E-Commerce', slugs: ['shopeedo', 'premier-staff'] },
];

export default function Portfolio() {
  const [activeGroup, setActiveGroup] = useState('all');

  const currentFilter = FILTER_GROUPS.find((group) => group.id === activeGroup) || FILTER_GROUPS[0];
  const visibleProjects = currentFilter.slugs
    ? PROJECTS.filter((project) => currentFilter.slugs.includes(project.slug))
    : PROJECTS;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 text-zinc-950 sm:pt-40">
      <SEOHead
        title="Work & Case Studies"
        description="Projects built by Sabtain Ali: CommutersLink Pakistan carpooling backend, WHO e-ACR, WOAH PVSIS, WhatsApp bots, and full-stack web apps."
        canonical="/portfolio"
      />

      <section className="gutter mx-auto max-w-[68rem] border-b border-zinc-200/80 pb-10">
        <h1 className="font-display text-4xl font-bold tracking-[-0.035em] text-zinc-950 sm:text-5xl">
          Work
        </h1>
        <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-zinc-600 sm:text-lg">
          Production web apps, backend systems, and client projects I have built.
        </p>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects by area">
          {FILTER_GROUPS.map((group) => {
            const count = group.slugs
              ? PROJECTS.filter((project) => group.slugs.includes(project.slug)).length
              : PROJECTS.length;
            const isActive = group.id === activeGroup;

            return (
              <button
                key={group.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveGroup(group.id)}
                className={`cursor-pointer rounded-full border px-4 py-1.5 font-sans text-xs font-medium transition-colors ${
                  isActive
                    ? 'border-zinc-950 bg-zinc-950 text-white'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-zinc-950'
                }`}
              >
                {group.label} ({count})
              </button>
            );
          })}
        </div>
      </section>

      <section aria-label="Projects list" className="gutter mx-auto mt-12 max-w-[68rem]">
        <div className="grid gap-8 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white"
            >
              <div>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block aspect-[16/10] overflow-hidden border-b border-zinc-200/80 bg-zinc-50"
                >
                  <img
                    src={project.heroImage}
                    srcSet={`${project.heroImage.replace('.webp', '-thumb.webp')} 320w, ${project.heroImage} ${project.heroImageWidth || 1280}w`}
                    sizes="(min-width: 768px) 520px, 92vw"
                    loading="lazy"
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </Link>

                <div className="p-6 pb-0">
                  <p className="font-mono text-xs text-zinc-500">
                    {project.client} · {project.year}
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.025em] text-zinc-950">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="transition-colors hover:text-[#f97316]"
                    >
                      {project.title}
                    </Link>
                  </h2>

                  <p className="mt-3 font-sans text-sm leading-relaxed text-zinc-600">
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
                </div>
              </div>

              <div className="p-6 pt-5">
                <div className="flex flex-wrap items-center gap-5 border-t border-zinc-100 pt-4 text-sm font-semibold">
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
      </section>
    </div>
  );
}
