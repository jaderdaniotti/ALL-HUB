import { Helmet } from 'react-helmet-async';
import {
  seoConfig,
  organizationSchema,
  websiteSchema,
} from '../config/seo';

/**
 * Head SEO per-pagina (title, description, canonical, OG, Twitter, JSON-LD).
 * title = titolo completo della pagina (non viene concatenato di nuovo).
 */
const SEO = ({
  title,
  description,
  keywords,
  path = '/',
  ogImage,
  ogType = 'website',
  structuredData,
  noindex = false,
  includeWebsiteSchema = false,
}) => {
  const fullTitle = title || seoConfig.site.defaultTitle;
  const fullDescription = description || seoConfig.site.description;
  const fullKeywords =
    keywords ||
    (Array.isArray(seoConfig.site.keywords)
      ? seoConfig.site.keywords.join(', ')
      : seoConfig.site.keywords);
  const fullCanonical = `${seoConfig.site.url}${path === '/' ? '/' : path}`;
  const fullOgImage = ogImage || seoConfig.site.ogImage;
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

  const extraSchemas = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  return (
    <Helmet>
      <html lang="it" />
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="robots" content={robots} />
      <meta name="author" content="All-Hub Centro Educativo Udine" />
      <link rel="canonical" href={fullCanonical} />

      <meta name="geo.region" content="IT-36" />
      <meta name="geo.placename" content={seoConfig.local.city} />
      <meta
        name="geo.position"
        content={`${seoConfig.local.coordinates.latitude};${seoConfig.local.coordinates.longitude}`}
      />
      <meta
        name="ICBM"
        content={`${seoConfig.local.coordinates.latitude}, ${seoConfig.local.coordinates.longitude}`}
      />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={seoConfig.site.name} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />

      {!noindex && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
      {includeWebsiteSchema && !noindex && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}
      {extraSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
