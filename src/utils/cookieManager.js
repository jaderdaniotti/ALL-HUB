/**
 * Cookie Manager - Gestione centralizzata dei cookies
 * Gestisce preferenze cookies GDPR compliant
 */

// Nomi dei cookies
const COOKIE_CONSENT = 'all-hub-cookie-consent';
const COOKIE_PREFERENCES = 'all-hub-cookie-preferences';
const COOKIE_EXPIRY_DAYS = 365; // 1 anno

/**
 * Salva un cookie con scadenza
 * @param {string} name - Nome del cookie
 * @param {string} value - Valore del cookie
 * @param {number} days - Giorni di validità
 */
export const setCookie = (name, value, days = COOKIE_EXPIRY_DAYS) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

/**
 * Legge un cookie
 * @param {string} name - Nome del cookie
 * @returns {string|null} - Valore del cookie o null
 */
export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
};

/**
 * Elimina un cookie
 * @param {string} name - Nome del cookie
 */
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/**
 * Verifica se l'utente ha dato il consenso cookies
 * @returns {boolean}
 */
export const hasConsent = () => {
  return getCookie(COOKIE_CONSENT) === 'true';
};

/**
 * Verifica se l'utente ha rifiutato i cookies
 * @returns {boolean}
 */
export const hasDeclined = () => {
  return getCookie(COOKIE_CONSENT) === 'false';
};

/**
 * Verifica se dobbiamo mostrare il banner
 * @returns {boolean}
 */
export const shouldShowBanner = () => {
  const consent = getCookie(COOKIE_CONSENT);
  return consent === null; // Mostra solo se non c'è risposta
};

/**
 * Salva il consenso dell'utente
 * @param {boolean} accepted - Se l'utente ha accettato
 * @param {Object} preferences - Preferenze specifiche per tipo di cookie
 */
export const saveConsent = (accepted, preferences = {}) => {
  setCookie(COOKIE_CONSENT, accepted.toString());
  
  if (accepted && Object.keys(preferences).length > 0) {
    setCookie(COOKIE_PREFERENCES, JSON.stringify(preferences));
  }
  
  // Inizializza i servizi basati sul consenso
  if (accepted) {
    initializeServices(preferences);
  }
};

/**
 * Ottiene le preferenze cookie salvate
 * @returns {Object}
 */
export const getPreferences = () => {
  const prefs = getCookie(COOKIE_PREFERENCES);
  if (prefs) {
    try {
      return JSON.parse(prefs);
    } catch (e) {
      console.error('Errore parsing preferenze cookie:', e);
    }
  }
  return {
    necessary: true,    // Sempre true (cookies tecnici)
    analytics: false,   // Google Analytics
    marketing: false,   // Marketing/Remarketing
    functional: false   // Preferenze utente avanzate
  };
};

/**
 * Inizializza i servizi esterni basati sul consenso
 * @param {Object} preferences - Preferenze cookie
 */
export const initializeServices = (preferences) => {
  // Google Analytics
  if (preferences.analytics) {
    initGoogleAnalytics();
  }
  
  // Altri servizi marketing
  if (preferences.marketing) {
    // Aggiungi qui altri script marketing se necessario
  }
};

/**
 * Inizializza Google Analytics se non già presente
 */
const initGoogleAnalytics = () => {
  // Verifica se GA è già caricato
  if (window.gtag) {
    console.log('Google Analytics già inizializzato');
    return;
  }
  
  // Carica lo script GA solo se l'utente ha accettato
  const GA_ID = 'G-XXXXXXXXXX'; // Sostituisci con il tuo ID reale
  
  // Script tag GA
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script1);
  
  // Inizializzazione GA
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    anonymize_ip: true, // Privacy-friendly
    cookie_flags: 'SameSite=Lax;Secure'
  });
  
  console.log('Google Analytics inizializzato con consenso');
};

/**
 * Revoca il consenso ed elimina i cookies
 */
export const revokeConsent = () => {
  deleteCookie(COOKIE_CONSENT);
  deleteCookie(COOKIE_PREFERENCES);
  
  // Disabilita GA se attivo
  if (window.gtag) {
    window['ga-disable-G-XXXXXXXXXX'] = true; // Sostituisci con il tuo ID
  }
  
  // Ricarica la pagina per pulire tutto
  window.location.reload();
};

export default {
  setCookie,
  getCookie,
  deleteCookie,
  hasConsent,
  hasDeclined,
  shouldShowBanner,
  saveConsent,
  getPreferences,
  revokeConsent,
  initializeServices
};


