import SEOHead from '../components/SEOHead';
import { Link } from '../router/RouterContext';

export default function NotFound() {
  return (
    <section className="gutter mx-auto max-w-3xl py-36">
      <SEOHead title="Page not found" description="This page could not be found." noindex />
      <h1 className="display-h1">Page not found</h1>
      <p className="mt-4 text-zinc-600">Check the address or use one of these links to continue.</p>
      <div className="mt-8 flex flex-wrap gap-6 font-semibold underline">
        <Link href="/">Home</Link>
        <Link href="/portfolio">Case studies</Link>
        <Link href="/blog">Blog</Link>
      </div>
    </section>
  );
}
