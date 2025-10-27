# 🍪 Implementazione Sistema Cookie - All-Hub

## 📋 Panoramica

Sistema completo di gestione cookies GDPR compliant implementato nel progetto All-Hub. Include banner cookie multilingua, gestione preferenze utente, e integrazione con Google Analytics.

---

## 📁 Struttura File

```
FRONTEND/
├── src/
│   ├── components/
│   │   └── CookieBanner.jsx          # Componente banner cookie
│   ├── pages/
│   │   └── PrivacyPolicy.jsx         # Pagina privacy policy
│   ├── utils/
│   │   └── cookieManager.js          # Utility gestione cookie
│   └── locales/
│       ├── it/translation.json       # Traduzioni italiano
│       ├── en/translation.json       # Traduzioni inglese
│       ├── de/translation.json       # Traduzioni tedesco
│       ├── es/translation.json       # Traduzioni spagnolo
│       └── fr/translation.json       # Traduzioni francese
```

---

## 🎨 Componenti

### 1. **CookieBanner** (`src/components/CookieBanner.jsx`)

Banner interattivo per la gestione del consenso cookie.

**Caratteristiche:**
- ✅ Mostra automaticamente se l'utente non ha ancora risposto
- ✅ Due modalità: semplice (con 3 pulsanti) e avanzata (con preferenze dettagliate)
- ✅ Icone Feather React invece di emoji
- ✅ Completamente multilingua (5 lingue)
- ✅ Animazioni fluide con Tailwind CSS
- ✅ Accessibilità WCAG compliant

**Tipi di Cookie:**
- 🔒 **Necessari** - Sempre attivi (non disabilitabili)
- 📊 **Analitici** - Google Analytics
- 🎯 **Marketing** - Cookie pubblicitari
- ⚙️ **Funzionali** - Preferenze utente avanzate

**Icone utilizzate:**
```jsx
import { Cookie, Lock, BarChart2, Target, Settings, X } from 'react-feather';
```

### 2. **cookieManager** (`src/utils/cookieManager.js`)

Utility JavaScript per la gestione centralizzata dei cookie.

**Funzioni principali:**

```javascript
// Salva/legge cookie
setCookie(name, value, days)
getCookie(name)
deleteCookie(name)

// Gestione consenso
hasConsent()              // Verifica se c'è consenso
shouldShowBanner()        // Verifica se mostrare banner
saveConsent(accepted, preferences)  // Salva consenso
revokeConsent()          // Revoca consenso

// Servizi esterni
initializeServices(preferences)  // Inizializza GA, etc.
getPreferences()         // Ottiene preferenze salvate
```

**Cookie salvati:**
- `all-hub-cookie-consent` - Stato consenso (true/false)
- `all-hub-cookie-preferences` - JSON con preferenze dettagliate

### 3. **PrivacyPolicy** (`src/pages/PrivacyPolicy.jsx`)

Pagina informativa completa su privacy e cookie policy.

**Sezioni:**
- 📋 Introduzione
- 🔍 Dati raccolti (volontari e automatici)
- 🍪 Cookie Policy dettagliata
- 🎯 Finalità del trattamento
- ⚖️ Base giuridica GDPR
- ✅ Diritti dell'utente
- ⚙️ Gestione preferenze con pulsante "Revoca Consenso"
- 📧 Contatti

---

## 🌍 Traduzioni

Tutti i testi sono tradotti in 5 lingue tramite i18next:

```json
{
  "cookies": {
    "title": "Utilizzo dei Cookie",
    "description": "...",
    "acceptAll": "Accetta Tutti",
    "decline": "Rifiuta",
    "customize": "Personalizza",
    "necessary": {
      "title": "Cookie Necessari",
      "description": "..."
    },
    "analytics": { ... },
    "marketing": { ... },
    "functional": { ... }
  }
}
```

---

## 🚀 Utilizzo

### Integrazione in App.jsx

```jsx
import CookieBanner from './components/CookieBanner';
import { hasConsent, getPreferences, initializeServices } from './utils/cookieManager';

function App() {
  // Inizializza servizi se c'è già consenso
  useEffect(() => {
    if (hasConsent()) {
      const preferences = getPreferences();
      initializeServices(preferences);
    }
  }, []);

  return (
    <BrowserRouter>
      {/* ... altre route ... */}
      <CookieBanner />
    </BrowserRouter>
  );
}
```

### Aggiungere route Privacy Policy

```jsx
import PrivacyPolicy from './pages/PrivacyPolicy';

<Route path="/privacy" element={<PrivacyPolicy />} />
```

---

## 🔧 Configurazione Google Analytics

### 1. Modifica `cookieManager.js`

Sostituisci il placeholder con il tuo ID:

```javascript
const GA_ID = 'G-XXXXXXXXXX'; // Inserisci qui il tuo ID reale
```

### 2. Test Analytics

Dopo aver accettato i cookie analitici:

```javascript
// Verifica in console
console.log(window.gtag);
console.log(window.dataLayer);
```

---

## 🎨 Personalizzazione

### Colori e Stile

Il banner usa le classi custom del progetto:
- `bg-chiaro` / `text-scuro` - Colori principali
- `border-pink-400` / `bg-pink-500` - Accenti
- Icone con colori semantici (green-600, blue-600, purple-600, orange-600)

### Tempo di visualizzazione

```javascript
// In CookieBanner.jsx
setTimeout(() => {
  if (shouldShowBanner()) {
    setIsVisible(true);
  }
}, 1000); // Cambia questo valore (millisecondi)
```

### Durata cookie

```javascript
// In cookieManager.js
const COOKIE_EXPIRY_DAYS = 365; // Cambia durata (giorni)
```

---

## ✅ Checklist Compliance GDPR

- [x] Banner informativo chiaro
- [x] Possibilità di rifiutare
- [x] Gestione granulare preferenze
- [x] Cookie tecnici sempre attivi
- [x] Revoca consenso in qualsiasi momento
- [x] Privacy policy dettagliata
- [x] Informazioni su finalità e durata
- [x] Dati raccolti in modo trasparente
- [x] Base giuridica specificata
- [x] Diritti utente elencati

---

## 🧪 Test

### Test Manuale

1. **Prima visita**
   - Banner appare dopo 1 secondo
   - Tutti i pulsanti funzionano

2. **Accetta tutti**
   - Banner scompare
   - Cookie salvato: `all-hub-cookie-consent=true`
   - Google Analytics inizializzato (se configurato)

3. **Rifiuta**
   - Banner scompare
   - Cookie salvato: `all-hub-cookie-consent=false`
   - Solo cookie necessari attivi

4. **Personalizza**
   - Mostra pannello preferenze
   - Checkbox funzionano
   - Cookie necessari non disabilitabili

5. **Revoca consenso**
   - Da pagina Privacy Policy
   - Cookie eliminati
   - Pagina ricaricata
   - Banner riappare

### Test Browser

```javascript
// Console del browser
document.cookie // Visualizza tutti i cookie
```

### Test Multilingua

Cambia lingua e verifica che tutte le traduzioni siano corrette.

---

## 🐛 Troubleshooting

### Banner non appare
- Verifica che il banner sia importato in `App.jsx`
- Controlla i cookie esistenti (cancellali per reset)
- Verifica console per errori

### Google Analytics non funziona
- Verifica ID analytics in `cookieManager.js`
- Controlla che l'utente abbia accettato cookie analytics
- Verifica console: `window.gtag` e `window.dataLayer`

### Traduzioni mancanti
- Verifica che tutte le chiavi esistano in tutti i file `translation.json`
- Controlla i18next nella console

---

## 📚 Risorse

### Documentazione
- [GDPR Official](https://gdpr.eu/)
- [Cookie Law Italia](https://www.garanteprivacy.it/)
- [Google Analytics GDPR](https://support.google.com/analytics/answer/9019185)

### Librerie utilizzate
- [react-i18next](https://react.i18next.com/)
- [react-feather](https://feathericons.com/)
- [DaisyUI](https://daisyui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🔄 Aggiornamenti Futuri

Possibili miglioramenti:

1. **Cookie consent API v2**
   - Standard IAB TCF 2.0 per pubblicità programmatica

2. **Additional Services**
   - Facebook Pixel
   - Google Tag Manager
   - Hotjar

3. **Statistiche**
   - Dashboard admin con % accettazione
   - Analytics consenso per tipo

4. **A/B Testing**
   - Test varianti banner per ottimizzare conversione

---

## 📧 Supporto

Per domande o problemi:
- **Email:** secretariat.allhub@gmail.com
- **Tel:** +39 340 221 8595

---

## 📝 Note Legali

⚠️ **IMPORTANTE:** Questo sistema è una base GDPR-compliant, ma:

1. **Consulta un legale** per verificare la conformità al tuo caso specifico
2. **Aggiorna la Privacy Policy** con i tuoi dati reali
3. **Configura Google Analytics** secondo le linee guida del Garante Privacy
4. **Registra il trattamento** nel registro delle attività (se richiesto)
5. **Nomina DPO** se necessario per la tua organizzazione

---

**Versione:** 1.0  
**Ultimo aggiornamento:** Ottobre 2025  
**Autore:** All-Hub Development Team

