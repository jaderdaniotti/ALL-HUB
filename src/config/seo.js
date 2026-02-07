// SEO Configuration per All-Hub Centro Educativo - Ottimizzato per ricerche locali Udine
export const seoConfig = {
  site: {
    name: "All-Hub Udine - Corsi di Formazione e SkillUp Camps",
    url: "https://allhub.org",
    description: "All-Hub Udine: corsi di formazione a Udine, corsi formazione Udine, SkillUp Camps Udine e settimane studio Udine. Formazione professionale e inglese nel Friuli Venezia Giulia.",
    keywords: [
      "corsi di formazione udine",
      "corsi formazione udine",
      "allhub",
      "allhub udine",
      "all-hub udine",
      "skillup camps udine",
      "skill up camps udine",
      "settimane studio udine",
      "corsi inglese udine",
      "formazione professionale udine",
      "centro educativo udine",
      "all-hub centro educativo",
      "corsi lingua udine",
      "formazione friuli venezia giulia",
      "corsi formazione friuli",
      "centro formazione udine"
    ]
  },
  local: {
    city: "Udine",
    region: "Friuli Venezia Giulia",
    country: "IT",
    coordinates: {
      latitude: "46.0649",
      longitude: "13.2329"
    },
    address: {
      streetAddress: "Via Udine",
      addressLocality: "Udine", 
      addressRegion: "Friuli Venezia Giulia",
      postalCode: "33100",
      addressCountry: "IT"
    },
    contact: {
      email: "secretaria.allhub@gmail.com",
      phone: "+39-XXX-XXXXXXX",
      facebook: "https://www.facebook.com/share/1BjGLxA7af/"
    },
    businessHours: "Mo-Fr 09:00-18:00"
  },
  pages: {
    home: {
      title: "Corsi di Formazione Udine | All-Hub Udine | SkillUp Camps e Settimane Studio",
      description: "All-Hub Udine: corsi di formazione a Udine, corsi formazione Udine, SkillUp Camps Udine e settimane studio Udine. Formazione professionale e inglese nel Friuli Venezia Giulia.",
      keywords: "corsi di formazione udine, corsi formazione udine, allhub udine, skillup camps udine, settimane studio udine, corsi inglese udine, all-hub udine"
    },
    about: {
      title: "Chi Siamo | All-Hub Udine | Corsi Formazione e SkillUp Camps",
      description: "Scopri All-Hub Udine: centro per corsi di formazione a Udine, SkillUp Camps e settimane studio. Testimonianze e metodologie innovative a Udine e Friuli Venezia Giulia.",
      keywords: "allhub udine, chi siamo all-hub, corsi formazione udine, skillup camps udine, settimane studio udine, centro educativo udine"
    },
    activities: {
      title: "Corsi di Formazione Udine | SkillUp Camps e Settimane Studio | All-Hub",
      description: "Corsi di formazione Udine, SkillUp Camps Udine e settimane studio Udine con All-Hub. Corsi inglese, eventi e formazione professionale a Udine e Friuli.",
      keywords: "corsi di formazione udine, corsi formazione udine, skillup camps udine, settimane studio udine, allhub udine, corsi inglese udine"
    },
    contacts: {
      title: "Contatti All-Hub Udine | Prenota Corsi Formazione Udine",
      description: "Contatta All-Hub Udine per corsi di formazione, SkillUp Camps e settimane studio a Udine. Prenota corsi formazione Udine. Email, telefono e social.",
      keywords: "contatti allhub udine, prenota corsi formazione udine, all-hub udine contatti, corsi formazione udine"
    },
    location: {
      title: "Dove Siamo | All-Hub Udine | Corsi Formazione e SkillUp Camps",
      description: "Dove trovarci a Udine: All-Hub per corsi di formazione Udine, SkillUp Camps e settimane studio. Indirizzo, mappa e informazioni su Udine e Friuli Venezia Giulia.",
      keywords: "allhub udine dove siamo, corsi formazione udine, centro all-hub udine, udine formazione"
    }
  }
};

// Structured Data Templates
export const structuredDataTemplates = {
  organization: {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": seoConfig.site.name,
    "alternateName": "All-Hub",
    "description": seoConfig.site.description,
    "url": seoConfig.site.url,
    "logo": `${seoConfig.site.url}/favicon.png`,
    "image": `${seoConfig.site.url}/favicon.png`,
    "telephone": seoConfig.local.contact.phone,
    "email": seoConfig.local.contact.email,
    "address": seoConfig.local.address,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": seoConfig.local.coordinates.latitude,
      "longitude": seoConfig.local.coordinates.longitude
    },
    "openingHours": seoConfig.local.businessHours,
    "sameAs": [
      seoConfig.local.contact.facebook,
      seoConfig.site.url
    ]
  },
  
  course: (courseData) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseData.title,
    "description": courseData.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": seoConfig.site.name,
      "address": seoConfig.local.address
    },
    "courseMode": courseData.modality || "In-person",
    "educationalLevel": courseData.level,
    "timeRequired": courseData.duration,
    "audience": {
      "@type": "Audience",
      "audienceType": courseData.type
    },
    "location": {
      "@type": "Place",
      "name": seoConfig.local.city,
      "address": seoConfig.local.address
    }
  })
};
