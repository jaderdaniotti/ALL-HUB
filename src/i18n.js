import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationIT from './locales/it/translation.json';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationDE from './locales/de/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
  it: { translation: translationIT },
  en: { translation: translationEN },
  fr: { translation: translationFR },
  de: { translation: translationDE },
  es: { translation: translationES }
};

i18n
  .use(LanguageDetector) // Rileva automaticamente la lingua del browser
  .use(initReactI18next) // Passa i18n a react-i18next
  .init({
    resources,
    fallbackLng: 'it', // Lingua di fallback
    lng: 'it', // Lingua di default
    debug: false,
    
    interpolation: {
      escapeValue: false // React già protegge da XSS
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;

