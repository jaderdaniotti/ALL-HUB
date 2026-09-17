// SEO Configuration – All-Hub Udine (Local SEO + indicizzazione)
export const seoConfig = {
  site: {
    name: "All-Hub Udine",
    url: "https://allhub.org",
    defaultTitle: "All-Hub Udine | Corsi di Formazione, SkillUp Camps e Settimane Studio",
    description:
      "All-Hub a Udine: corsi di formazione, corsi di inglese, SkillUp Camps e settimane studio in Friuli Venezia Giulia. Centro educativo per ragazzi, adulti e professionisti.",
    keywords: [
      "all-hub udine",
      "allhub udine",
      "corsi di formazione udine",
      "corsi inglese udine",
      "skillup camps udine",
      "settimane studio udine",
      "formazione professionale udine",
      "centro educativo udine",
      "corsi lingua friuli",
    ],
    ogImage: "https://allhub.org/og-image.jpg",
  },
  local: {
    city: "Udine",
    region: "Friuli-Venezia Giulia",
    country: "IT",
    coordinates: {
      latitude: "46.0649",
      longitude: "13.2329",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Udine",
      addressRegion: "Friuli-Venezia Giulia",
      postalCode: "33100",
      addressCountry: "IT",
    },
    contact: {
      email: "secretariat.allhub@gmail.com",
      phone: "+393402218595",
      phoneDisplay: "+39 340 221 8595",
      whatsapp: "https://wa.me/393402218595",
      facebook: "https://www.facebook.com/share/1BjGLxA7af/",
    },
    businessHours: ["Mo-Fr 09:00-18:00"],
  },
  pages: {
    home: {
      path: "/",
      title: "All-Hub Udine | Corsi di Formazione, SkillUp Camps e Settimane Studio",
      description:
        "Centro educativo a Udine: corsi di formazione, inglese, SkillUp Camps e settimane studio in Italia e all'estero. Scopri All-Hub in Friuli Venezia Giulia.",
      keywords:
        "all-hub udine, corsi formazione udine, skillup camps, settimane studio, corsi inglese udine",
    },
    about: {
      path: "/about",
      title: "Chi Siamo | All-Hub Centro Educativo a Udine",
      description:
        "Conosci All-Hub: missione, metodo e testimonianze sui corsi di formazione e di inglese a Udine. Un hub educativo in Friuli Venezia Giulia.",
      keywords:
        "chi siamo all-hub, centro educativo udine, corsi inglese udine, allhub udine",
    },
    activities: {
      path: "/attivita",
      title: "Corsi, SkillUp Camps e Settimane Studio a Udine | All-Hub",
      description:
        "Catalogo All-Hub: corsi di formazione e inglese, SkillUp Camps ed eventi a Udine, settimane studio in Italia e all'estero. Iscriviti o chiedi info.",
      keywords:
        "corsi formazione udine, skillup camps udine, settimane studio, corsi inglese udine, eventi formativi udine",
    },
    contacts: {
      path: "/contatti",
      title: "Contatti | All-Hub Udine – Prenota un corso",
      description:
        "Contatta All-Hub Udine via WhatsApp, email o Facebook per corsi di formazione, SkillUp Camps e settimane studio. Risposta rapida dalla segreteria.",
      keywords:
        "contatti all-hub udine, prenota corso formazione udine, whatsapp allhub",
    },
    location: {
      path: "/location",
      title: "Dove Siamo | All-Hub Udine e destinazioni studio",
      description:
        "Sede All-Hub a Udine e destinazioni delle settimane studio in Italia e all'estero (Malta, Turchia, Vienna e altre). Scopri dove formarti con noi.",
      keywords:
        "all-hub udine dove siamo, sede allhub udine, settimane studio estero, formazione friuli",
    },
    privacy: {
      path: "/privacy",
      title: "Privacy e Cookie Policy | All-Hub Udine",
      description:
        "Informativa privacy e cookie policy di All-Hub Centro Educativo Udine. Come trattiamo i dati personali e come gestire il consenso cookie.",
      keywords: "privacy all-hub, cookie policy allhub udine",
    },
  },
};

/** Organization + LocalBusiness JSON-LD (NAP allineato al sito) */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": "https://allhub.org/#organization",
  name: "All-Hub Centro Educativo",
  alternateName: ["All-Hub", "AllHub", "All-Hub Udine", "AllHub Udine"],
  description: seoConfig.site.description,
  url: seoConfig.site.url,
  logo: `${seoConfig.site.url}/favicon.png`,
  image: seoConfig.site.ogImage,
  telephone: seoConfig.local.contact.phone,
  email: seoConfig.local.contact.email,
  address: seoConfig.local.address,
  geo: {
    "@type": "GeoCoordinates",
    latitude: seoConfig.local.coordinates.latitude,
    longitude: seoConfig.local.coordinates.longitude,
  },
  areaServed: [
    { "@type": "City", name: "Udine" },
    { "@type": "AdministrativeArea", name: "Friuli-Venezia Giulia" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [seoConfig.local.contact.facebook],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: seoConfig.local.contact.phone,
    contactType: "customer service",
    email: seoConfig.local.contact.email,
    availableLanguage: ["Italian", "English"],
    areaServed: "IT",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://allhub.org/#website",
  name: "All-Hub Udine",
  alternateName: "AllHub Udine",
  url: seoConfig.site.url,
  description: seoConfig.site.description,
  inLanguage: "it-IT",
  publisher: { "@id": "https://allhub.org/#organization" },
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url.startsWith("http")
      ? item.url
      : `${seoConfig.site.url}${item.url}`,
  })),
});

export const structuredDataTemplates = {
  organization: organizationSchema,
  course: (courseData) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: courseData.title,
    description: courseData.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "All-Hub Centro Educativo",
      url: seoConfig.site.url,
      address: seoConfig.local.address,
    },
    courseMode: courseData.modality || "onsite",
    educationalLevel: courseData.level,
    inLanguage: "it",
  }),
};
