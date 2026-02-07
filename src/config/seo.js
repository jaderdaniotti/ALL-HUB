// SEO Configuration per All-Hub Centro Educativo
export const seoConfig = {
  site: {
    name: "All-Hub Centro Educativo",
    url: "https://allhub.org",
    description: "Centro educativo specializzato in corsi di formazione professionale, corsi di inglese, eventi e settimane studio a Udine",
    keywords: [
      "corsi formazione Udine",
      "corsi inglese Udine", 
      "formazione professionale Friuli",
      "centro educativo Udine",
      "corsi lingua straniera",
      "skill up camps",
      "settimane studio",
      "formazione continua",
      "All-Hub Udine",
      "corsi formazione Friuli Venezia Giulia",
      "centro formazione Udine",
      "corsi inglese Friuli",
      "formazione professionale Udine",
      "corsi lingua Udine",
      "All-Hub centro educativo"
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
      title: "Corsi di Formazione Udine | Centro Educativo All-Hub | Friuli Venezia Giulia",
      description: "Centro educativo All-Hub Udine: corsi di formazione professionale, corsi di inglese, eventi e settimane studio. Formazione personalizzata per crescita personale e successo duraturo nel Friuli Venezia Giulia.",
      keywords: "corsi formazione Udine, corsi inglese Udine, formazione professionale Friuli, centro educativo Udine, corsi lingua straniera, skill up camps, settimane studio, formazione continua, All-Hub Udine"
    },
    about: {
      title: "Chi Siamo | Centro Educativo All-Hub Udine | Formazione Professionale Friuli",
      description: "Scopri All-Hub, il centro educativo di Udine specializzato in corsi di formazione professionale, corsi di inglese e settimane studio. Testimonianze degli studenti e metodologie innovative nel Friuli Venezia Giulia.",
      keywords: "chi siamo All-Hub, centro educativo Udine, formazione professionale Friuli, corsi inglese Udine, testimonianze studenti, metodologie formative, All-Hub team"
    },
    activities: {
      title: "Corsi di Formazione Udine | Corsi Inglese Friuli | All-Hub Centro Educativo",
      description: "Scopri i corsi di formazione professionale e corsi di inglese a Udine. Eventi, settimane studio e skill up camps nel Friuli Venezia Giulia. Formazione personalizzata per ogni livello con All-Hub.",
      keywords: "corsi formazione Udine, corsi inglese Udine, formazione professionale Friuli, corsi lingua straniera Udine, eventi formativi, settimane studio, skill up camps, All-Hub corsi"
    },
    contacts: {
      title: "Contatti | Centro Educativo All-Hub Udine | Prenota Corsi Formazione",
      description: "Contatta All-Hub Udine per informazioni sui corsi di formazione professionale e corsi di inglese. Prenota il tuo corso nel Friuli Venezia Giulia. Email, telefono e social media.",
      keywords: "contatti All-Hub Udine, prenota corsi formazione, informazioni corsi inglese Udine, centro educativo Udine contatti, All-Hub telefono email"
    },
    location: {
      title: "Dove Siamo | All-Hub Centro Educativo Udine | Friuli Venezia Giulia",
      description: "Scopri dove si trova All-Hub a Udine nel Friuli Venezia Giulia. Centro educativo per corsi di formazione professionale e corsi di inglese. Mappa interattiva e informazioni sulla città.",
      keywords: "dove siamo All-Hub, centro educativo Udine, Friuli Venezia Giulia, mappa Udine, corsi formazione Udine, All-Hub indirizzo"
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
