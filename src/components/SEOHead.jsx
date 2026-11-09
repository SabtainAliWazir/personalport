import { absoluteUrl, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, PROFILE_IMAGE } from '../data/site';

export default function SEOHead({
  title, description = SITE_DESCRIPTION, canonical, image = PROFILE_IMAGE,
  type = 'website', publishedTime, category, articleSchema, noindex = false,
}) {
  const fullTitle = title && !title.includes('Sabtain Ali') ? `${title} · Sabtain Ali` : title || SITE_TITLE;
  const url = canonical ? absoluteUrl(canonical) : null;
  const imageUrl = absoluteUrl(image);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <>
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={url} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />
        {publishedTime && <meta property="article:published_time" content={publishedTime} />}
        {category && <meta property="article:section" content={category} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        {articleSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c')
          }} />
        )}
      </>}
    </>
  );
}
