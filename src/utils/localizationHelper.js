// ========================================
// HELPER PER LOCALIZZAZIONE FRONTEND
// ========================================
// Recupera i campi nella lingua corrente con fallback automatico

/**
 * Ottiene il valore di un campo nella lingua specificata, con fallback automatico
 * 
 * @param {Object} item - L'oggetto contenente i dati (corso, evento, settimana studio)
 * @param {string} fieldName - Nome del campo base (es. 'title', 'description')
 * @param {string} currentLang - Lingua corrente ('it', 'en', 'de', 'es', 'fr')
 * @returns {string} - Il valore del campo nella lingua appropriata
 */
export const getLocalizedField = (item, fieldName, currentLang = 'it') => {
  if (!item) return '';
  
  // 1. Prova la lingua corrente
  const fieldNameWithLang = `${fieldName}_${currentLang}`;
  if (item[fieldNameWithLang]) {
    return item[fieldNameWithLang];
  }
  
  // 2. Fallback secondo questa priorità: IT → EN → DE → ES → FR
  const fallbackOrder = ['it', 'en', 'de', 'es', 'fr'];
  
  for (const lang of fallbackOrder) {
    const fallbackField = `${fieldName}_${lang}`;
    if (item[fallbackField]) {
      return item[fallbackField];
    }
  }
  
  // 3. Ultimo fallback: campo senza suffisso (per retrocompatibilità)
  if (item[fieldName]) {
    return item[fieldName];
  }
  
  // 4. Se nessun fallback trovato, ritorna stringa vuota
  return '';
};

/**
 * Verifica se un campo ha traduzione nella lingua specificata
 */
export const hasTranslation = (item, fieldName, lang) => {
  if (!item) return false;
  const field = item[`${fieldName}_${lang}`];
  return field && field.trim().length > 0;
};

/**
 * Ottiene tutte le lingue disponibili per un item
 */
export const getAvailableLanguages = (item, fieldsToCheck = ['title', 'description']) => {
  if (!item) return [];
  
  const languages = ['it', 'en', 'de', 'es', 'fr'];
  const availableLanguages = [];
  
  for (const lang of languages) {
    const hasAnyField = fieldsToCheck.some(field => 
      item[`${field}_${lang}`] && item[`${field}_${lang}`].trim().length > 0
    );
    
    if (hasAnyField) {
      availableLanguages.push(lang);
    }
  }
  
  return availableLanguages;
};

/**
 * Ottieni emoji flag per codice lingua
 */
export const getLangFlag = (langCode) => {
  const flags = {
    it: '🇮🇹',
    en: '🇬🇧',
    de: '🇩🇪',
    es: '🇪🇸',
    fr: '🇫🇷'
  };
  return flags[langCode] || '🌐';
};

export default {
  getLocalizedField,
  hasTranslation,
  getAvailableLanguages,
  getLangFlag
};


