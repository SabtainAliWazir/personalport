import { useEffect } from 'react';

const SITE_URL = 'https://www.devcop.xyz';
const DEFAULT_TITLE = 'Sabtain Ali · Senior Full Stack Developer & Software Engineer';
const DEFAULT_DESCRIPTION = 'Portfolio of Sabtain Ali, Senior Full Stack Developer & AI Engineer. 4+ years building high-performance web applications, WHO data pipelines, React & TypeScript interfaces, and Laravel 11 backends.';
const DEFAULT_IMAGE = `${SITE_URL}/images/sabtain-image.png`;

/**
 * Dynamic SEO Head Component
 * Automatically updates document.title, meta descriptions, canonical URLs,
 * Open Graph, Twitter cards, and Schema.org JSON-LD structured data.
 */
export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image,
  type = 'website',
  publishedTime,
  category,
  articleSchema
}) {
  useEffect(() => {
    // 1. Format and update document.title
    const fullTitle = title 
      ? (title.includes('Sabtain Ali') ? title : `${title} · Sabtain Ali`)
      : DEFAULT_TITLE;
    document.title = fullTitle;

    // Helper to set or create a <meta> tag
    const setMeta = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set or create a <link> tag
    const setLink = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Primary Meta Description
    setMeta('name', 'description', description);

    // 3. Canonical URL
    const fullCanonical = canonical 
      ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`)
      : (typeof window !== 'undefined' ? window.location.href : SITE_URL);
    setLink('canonical', fullCanonical);

    // 4. Resolve Image URL
    const fullImage = image
      ? (image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`)
      : DEFAULT_IMAGE;

    // 5. Open Graph Metadata
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullCanonical);
    setMeta('property', 'og:image', fullImage);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Sabtain Ali Portfolio');

    if (publishedTime) {
      setMeta('property', 'article:published_time', publishedTime);
    }
    if (category) {
      setMeta('property', 'article:section', category);
    }

    // 6. Twitter Card Metadata
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullImage);

    // 7. Dynamic JSON-LD Structured Data
    const scriptId = 'dynamic-seo-json-ld';
    let scriptTag = document.getElementById(scriptId);

    if (articleSchema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(articleSchema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonical, image, type, publishedTime, category, articleSchema]);

  return null;
}
