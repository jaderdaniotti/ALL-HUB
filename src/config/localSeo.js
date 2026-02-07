// Local SEO Configuration per Udine e Friuli Venezia Giulia
export const localSeoConfig = {
  // Keywords specifiche per Udine e Friuli
  keywords: {
    primary: [
      "corsi formazione Udine",
      "corsi inglese Udine",
      "formazione professionale Udine",
      "centro educativo Udine",
      "All-Hub Udine"
    ],
    secondary: [
      "corsi formazione Friuli Venezia Giulia",
      "corsi inglese Friuli",
      "formazione professionale Friuli",
      "centro formazione Udine",
      "corsi lingua Udine",
      "settimane studio Udine",
      "skill up camps Friuli",
      "eventi formativi Udine"
    ],
    longTail: [
      "migliori corsi formazione Udine",
      "corsi inglese per adulti Udine",
      "formazione professionale Friuli Venezia Giulia",
      "centro educativo specializzato Udine",
      "corsi lingua straniera Udine",
      "All-Hub centro educativo Udine",
      "corsi formazione professionale Udine",
      "settimane studio lingua Udine"
    ]
  },
  
  // Informazioni geografiche specifiche
  geography: {
    city: "Udine",
    province: "Udine",
    region: "Friuli Venezia Giulia",
    country: "Italia",
    coordinates: {
      latitude: "46.0649",
      longitude: "13.2329"
    },
    nearbyCities: [
      "Trieste",
      "Pordenone", 
      "Gorizia",
      "Cividale del Friuli",
      "Tolmezzo",
      "Gemona del Friuli",
      "San Daniele del Friuli",
      "Codroipo",
      "Latisana",
      "Palmanova"
    ],
    postalCodes: ["33100", "33170", "33013", "33015", "33010"]
  },
  
  // Contenuti ottimizzati per Local SEO
  content: {
    aboutCity: "Udine è una città dinamica nel cuore del Friuli Venezia Giulia, nota per la sua ricca storia, cultura universitaria e ambiente internazionale. All-Hub si trova in questa città strategica per offrire corsi di formazione professionale e corsi di inglese di alta qualità.",
    
    services: {
      courses: "Corsi di formazione professionale e corsi di inglese a Udine per studenti, professionisti e aziende del Friuli Venezia Giulia",
      events: "Eventi formativi e workshop a Udine per la comunità locale e regionale",
      studyWeeks: "Settimane studio immersive per praticare le lingue straniere in contesti internazionali"
    },
    
    testimonials: "I nostri studenti di Udine e del Friuli Venezia Giulia testimoniano la qualità dei nostri corsi di formazione professionale e corsi di inglese."
  },
  
  // Schema markup per Local Business
  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "All-Hub Centro Educativo",
    "description": "Centro educativo specializzato in corsi di formazione professionale e corsi di inglese a Udine",
    "url": "https://allhub.org",
    "telephone": "+39-XXX-XXXXXXX",
    "email": "secretaria.allhub@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Udine",
      "addressLocality": "Udine",
      "addressRegion": "Friuli Venezia Giulia",
      "postalCode": "33100",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "46.0649",
      "longitude": "13.2329"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "areaServed": [
      {
        "@type": "City",
        "name": "Udine"
      },
      {
        "@type": "AdministrativeArea", 
        "name": "Friuli Venezia Giulia"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Corsi di Formazione Udine",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Corsi di Inglese Udine",
          "description": "Corsi di inglese per tutti i livelli a Udine",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "All-Hub Centro Educativo"
          }
        },
        {
          "@type": "Course",
          "name": "Corsi di Formazione Professionale Udine", 
          "description": "Formazione professionale personalizzata a Udine",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "All-Hub Centro Educativo"
          }
        }
      ]
    }
  }
};
