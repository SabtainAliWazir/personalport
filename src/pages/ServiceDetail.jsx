import SEOHead from '../components/SEOHead';
import { PROJECTS } from '../data/portfolioData';
import { Link } from '../router/RouterContext';
import ExpandingArrowButton from '../components/ui/ExpandingArrowButton';
import { trackPortfolioEvent } from '../lib/metrics';

export default function ServiceDetail({ service, featured }) {
  const project = PROJECTS.find(({ slug }) => slug === featured.projectSlug);

  return (
    <article className="gutter mx-auto max-w-5xl py-32">
      <SEOHead title={featured.title} description={featured.intro} canonical={`/service/${service.id}`} image={service.image} />
      <Link href="/service" className="text-sm font-semibold underline">All services</Link>
      <h1 className="display-h1 mt-5">{featured.title}</h1>
      <p className="mt-5 max-w-3xl text-lg text-zinc-700">{featured.intro}</p>
      <img src={service.image} alt="" className="mt-10 aspect-[2/1] w-full rounded-3xl object-cover" />
      <section className="mt-12">
        <h2 className="display-h3">What’s included</h2>
        <ul className="mt-5 grid gap-3 pl-5 text-zinc-700 list-disc sm:grid-cols-2">
          {service.deliverables.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <section className="mt-12 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
        <h2 className="display-h3">Related work</h2>
        <p className="mt-4 max-w-2xl text-zinc-700">{featured.proof}</p>
        <Link href={`/portfolio/${project.slug}`} className="mt-4 inline-block font-semibold underline">
          Read the {project.title} case study
        </Link>
      </section>
      <div className="mt-12">
        <ExpandingArrowButton href="/contact" onClick={() => trackPortfolioEvent('service_contact_click')}>Discuss your project</ExpandingArrowButton>
      </div>
    </article>
  );
}
