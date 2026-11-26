export const SITE_URL = 'https://www.devcop.xyz';
export const SITE_NAME = 'Sabtain Ali Portfolio';
export const AUTHOR_NAME = 'Sabtain Ali';
export const AUTHOR_ID = `${SITE_URL}/#person`;
export const SITE_TITLE = 'Sabtain Ali · Full-Stack Developer';
export const SITE_DESCRIPTION = 'Portfolio of Sabtain Ali, a full-stack developer building web applications, APIs, and data systems with React, TypeScript, Node.js, and Laravel.';
export const PROFILE_IMAGE = '/images/sabtain-image.png';

export function absoluteUrl(path) {
  return new URL(path, SITE_URL).href;
}

export function schema(type, properties) {
  return { '@context': 'https://schema.org', '@type': type, ...properties };
}
