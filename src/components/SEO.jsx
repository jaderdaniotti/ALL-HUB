import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoConfig, structuredDataTemplates } from '../config/seo';

// Componente SEO riutilizzabile per tutte le pagine
const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  structuredData,
  ogImage,
  ogType = "website"
}) => {
  const fullTitle = title ? `${title} | ${seoConfig.site.name}` : seoConfig.site.name;
  const fullDescription = description || seoConfig.site.description;
  const fullKeywords = keywords || seoConfig.site.keywords.join(', ');
  const fullCanonical = canonical || seoConfig.site.url;
  const fullOgImage = ogImage || `${seoConfig.site.url}/favicon.png`;

  return (
    <Helmet>
      {/* Meta Tags Base */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Meta Tags Local SEO */}
      <meta name="geo.region" content="IT-FVG" />
      <meta name="geo.placename" content={seoConfig.local.city} />
      <meta name="geo.position" content={`${seoConfig.local.coordinates.latitude};${seoConfig.local.coordinates.longitude}`} />
      <meta name="ICBM" content={`${seoConfig.local.coordinates.latitude}, ${seoConfig.local.coordinates.longitude}`} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={seoConfig.site.name} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Organization Structured Data (sempre presente) */}
      <script type="application/ld+json">
        {JSON.stringify(structuredDataTemplates.organization)}
      </script>
    </Helmet>
  );
};

export default SEO;
