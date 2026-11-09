export const SITE_URL = 'https://www.devcop.xyz';
export const SITE_NAME = 'Sabtain Ali Portfolio';
export const AUTHOR_NAME = 'Sabtain Ali';
export const AUTHOR_ID = `${SITE_URL}/#person`;
export const SITE_TITLE = 'Sabtain Ali · Senior Full Stack Developer & Software Engineer';
export const SITE_DESCRIPTION = 'Portfolio of Sabtain Ali, Senior Full Stack Developer & AI Engineer. 4+ years building high-performance web applications, WHO data pipelines, React & TypeScript interfaces, and Laravel backends.';
export const PROFILE_IMAGE = '/images/sabtain-image.png';

export function absoluteUrl(path) {
  return new URL(path, SITE_URL).href;
}

export function schema(type, properties) {
  return { '@context': 'https://schema.org', '@type': type, ...properties };
}
