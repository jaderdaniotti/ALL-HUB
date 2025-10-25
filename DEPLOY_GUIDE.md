# 🚀 Guida al Deploy - Frontend ALL-HUB

Questa guida spiega come effettuare il deploy del sito web frontend su diverse piattaforme di hosting.

## 📋 Indice

1. [Prerequisiti](#prerequisiti)
2. [Configurazione Ambiente](#configurazione-ambiente)
3. [Build Locale](#build-locale)
4. [Deploy su Vercel](#deploy-su-vercel)
5. [Deploy su Netlify](#deploy-su-netlify)
6. [Deploy su Altre Piattaforme](#deploy-su-altre-piattaforme)
7. [Configurazione Database e Storage](#configurazione-database-e-storage)
8. [Ottimizzazioni SEO](#ottimizzazioni-seo)
9. [Verifiche Post-Deploy](#verifiche-post-deploy)
10. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisiti

Prima di procedere con il deploy, assicurati di avere:

- **Node.js**: versione 18 o superiore
- **npm**: versione 9 o superiore
- **Account Supabase** con progetto configurato
- **Account** sulla piattaforma di hosting scelta (Vercel/Netlify/altro)

### Verifica Versioni

```bash
node --version  # Deve essere >= 18.x
npm --version   # Deve essere >= 9.x
```

---

## ⚙️ Configurazione Ambiente

### 1. Variabili d'Ambiente

Il frontend richiede due variabili d'ambiente per connettersi a Supabase:

- `VITE_SUPABASE_URL`: URL del progetto Supabase
- `VITE_SUPABASE_ANON_KEY`: Chiave anonima del progetto Supabase

### 2. Dove Trovare le Credenziali Supabase

1. Vai su [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Seleziona il tuo progetto
3. Clicca su **Settings** → **API**
4. Troverai:
   - **URL**: sotto "Project URL"
   - **anon/public key**: sotto "Project API keys"

### 3. File `.env.local` per Sviluppo Locale

Crea un file `.env.local` nella cartella `FRONTEND/`:

```env
VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
VITE_SUPABASE_ANON_KEY=tua-chiave-anon-qui
```

⚠️ **IMPORTANTE**: 
- Non committare mai il file `.env.local` su Git!
- Il file `env_template.txt` contiene un template di esempio

---

## 🔨 Build Locale

Prima di effettuare il deploy, è buona pratica testare la build in locale:

### 1. Installa le Dipendenze

```bash
cd FRONTEND
npm install
```

### 2. Esegui la Build

```bash
npm run build
```

Questo comando:
- Compila l'applicazione React
- Ottimizza il codice e le immagini
- Applica minificazione con Terser
- Rimuove console.log e debugger
- Crea chunk separati per vendor, router e i18n
- Genera la cartella `dist/` con i file pronti per il deploy

### 3. Test della Build Locale

```bash
npm run preview
```

Questo avvia un server locale per testare la build. Apri il browser su `http://localhost:4173` (o la porta indicata nel terminale).

### 4. Verifica Contenuto Build

La cartella `dist/` dovrebbe contenere:
- `index.html` - Pagina principale
- `assets/` - CSS, JS e font ottimizzati
- `sitemap.xml` - Sitemap per SEO
- `robots.txt` - File robots per crawler
- `favicon.png` - Icona del sito
- Immagini pubbliche da `public/`

---

## 🔵 Deploy su Vercel

Vercel è la piattaforma consigliata per applicazioni Vite, con deploy automatico da Git.

### Metodo 1: Deploy da Git (Consigliato)

#### A. Configura Repository Git

1. Assicurati che il progetto sia su GitHub/GitLab/Bitbucket
2. Vai su [vercel.com](https://vercel.com)
3. Clicca su **"Add New Project"**

#### B. Importa il Progetto

1. Seleziona il repository `ALL-HUB`
2. In **"Configure Project"**:
   - **Framework Preset**: Vite
   - **Root Directory**: `FRONTEND`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### C. Configura Variabili d'Ambiente

1. Nella sezione **"Environment Variables"**:
   - Aggiungi `VITE_SUPABASE_URL`: `https://tuo-progetto.supabase.co`
   - Aggiungi `VITE_SUPABASE_ANON_KEY`: `tua-chiave-anon`
2. Clicca su **"Deploy"**

#### D. Deploy Automatici

Vercel configurerà automaticamente:
- Deploy a ogni push sul branch principale
- Preview per ogni pull request
- HTTPS automatico con certificato SSL
- CDN globale per performance ottimali

### Metodo 2: Deploy CLI

```bash
# Installa Vercel CLI
npm install -g vercel

# Vai nella cartella FRONTEND
cd FRONTEND

# Login su Vercel
vercel login

# Deploy
vercel

# Per deploy in produzione
vercel --prod
```

Durante il setup:
- **Set up and deploy?**: Yes
- **Which scope?**: Seleziona il tuo account
- **Link to existing project?**: No
- **Project name**: `all-hub-frontend` (o altro)
- **Directory**: `./`
- **Override settings?**: No (usa `vercel.json`)

Poi aggiungi le variabili d'ambiente:

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### Configurazione vercel.json

Il progetto include già un file `vercel.json` ottimizzato:

```json
{
  "version": 2,
  "name": "a-lifelong-learning-hub",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Questo file configura:
- Build ottimizzato con `@vercel/static-build`
- Header di sicurezza (XSS Protection, Frame Options)
- Cache ottimizzata per asset statici (1 anno)
- Routing per SPA (Single Page Application)
- Redirect da `/home` a `/`

---

## 🟢 Deploy su Netlify

### Metodo 1: Deploy da Git

#### A. Configura su Netlify

1. Vai su [netlify.com](https://netlify.com)
2. Clicca su **"Add new site"** → **"Import an existing project"**
3. Connetti il repository Git

#### B. Configura Build Settings

- **Base directory**: `FRONTEND`
- **Build command**: `npm run build`
- **Publish directory**: `FRONTEND/dist`

#### C. Configura Variabili d'Ambiente

1. Vai in **Site settings** → **Environment variables**
2. Aggiungi:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Metodo 2: Deploy CLI

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Vai nella cartella FRONTEND
cd FRONTEND

# Inizializza
netlify init

# Deploy
netlify deploy

# Deploy in produzione
netlify deploy --prod
```

### Configurazione netlify.toml

Crea un file `netlify.toml` nella cartella `FRONTEND/`:

```toml
[build]
  base = "FRONTEND"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[build.environment]
  NODE_VERSION = "18"
```

---

## 🌐 Deploy su Altre Piattaforme

### Cloudflare Pages

1. Connetti repository Git
2. Configura:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `FRONTEND`
3. Aggiungi variabili d'ambiente
4. Aggiungi redirect rule per SPA:
   - `/*` → `/index.html` (200)

### Render

1. Crea nuovo **Static Site**
2. Configura:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Root directory**: `FRONTEND`
3. Aggiungi variabili d'ambiente

### GitHub Pages

⚠️ **Non consigliato** per questo progetto perché:
- Richiede configurazione complessa per SPA routing
- Non supporta variabili d'ambiente server-side
- Non ha HTTPS per domini custom senza configurazione aggiuntiva

Se necessario:

```bash
# Installa gh-pages
npm install --save-dev gh-pages

# Aggiungi script in package.json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Modifica vite.config.js per base URL
base: '/nome-repo/'

# Deploy
npm run deploy
```

---

## 🗄️ Configurazione Database e Storage

### Verifica Setup Supabase

Prima del deploy, assicurati che il database Supabase sia correttamente configurato:

#### 1. Tabelle Richieste

Il frontend legge dalle seguenti tabelle:

- `corsi` - Corsi disponibili
- `eventi` - Eventi e attività
- `settimane_studio` - Settimane studio all'estero

Schema base per `corsi`:
```sql
CREATE TABLE corsi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titolo_it TEXT NOT NULL,
  titolo_en TEXT,
  titolo_de TEXT,
  titolo_es TEXT,
  titolo_fr TEXT,
  descrizione_it TEXT NOT NULL,
  descrizione_en TEXT,
  descrizione_de TEXT,
  descrizione_es TEXT,
  descrizione_fr TEXT,
  descrizione_lunga_it TEXT,
  descrizione_lunga_en TEXT,
  descrizione_lunga_de TEXT,
  descrizione_lunga_es TEXT,
  descrizione_lunga_fr TEXT,
  prezzo DECIMAL(10,2),
  immagine TEXT,
  categoria TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

Schema base per `eventi`:
```sql
CREATE TABLE eventi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titolo_it TEXT NOT NULL,
  titolo_en TEXT,
  titolo_de TEXT,
  titolo_es TEXT,
  titolo_fr TEXT,
  descrizione_it TEXT NOT NULL,
  descrizione_en TEXT,
  descrizione_de TEXT,
  descrizione_es TEXT,
  descrizione_fr TEXT,
  descrizione_lunga_it TEXT,
  descrizione_lunga_en TEXT,
  descrizione_lunga_de TEXT,
  descrizione_lunga_es TEXT,
  descrizione_lunga_fr TEXT,
  data_evento DATE,
  luogo TEXT,
  prezzo DECIMAL(10,2),
  immagine TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

Schema base per `settimane_studio`:
```sql
CREATE TABLE settimane_studio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titolo_it TEXT NOT NULL,
  titolo_en TEXT,
  titolo_de TEXT,
  titolo_es TEXT,
  titolo_fr TEXT,
  descrizione_it TEXT NOT NULL,
  descrizione_en TEXT,
  descrizione_de TEXT,
  descrizione_es TEXT,
  descrizione_fr TEXT,
  descrizione_lunga_it TEXT,
  descrizione_lunga_en TEXT,
  descrizione_lunga_de TEXT,
  descrizione_lunga_es TEXT,
  descrizione_lunga_fr TEXT,
  destinazione TEXT,
  data_inizio DATE,
  data_fine DATE,
  prezzo DECIMAL(10,2),
  immagine TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. Permessi RLS (Row Level Security)

Il frontend ha solo bisogno di leggere i dati (il pannello admin gestisce scrittura/modifica):

```sql
-- Abilita RLS
ALTER TABLE corsi ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventi ENABLE ROW LEVEL SECURITY;
ALTER TABLE settimane_studio ENABLE ROW LEVEL SECURITY;

-- Policy di lettura pubblica per corsi
CREATE POLICY "Enable read access for all users" ON corsi
  FOR SELECT USING (true);

-- Policy di lettura pubblica per eventi
CREATE POLICY "Enable read access for all users" ON eventi
  FOR SELECT USING (true);

-- Policy di lettura pubblica per settimane_studio
CREATE POLICY "Enable read access for all users" ON settimane_studio
  FOR SELECT USING (true);
```

#### 3. Storage Bucket per Immagini

Il frontend può caricare immagini al Supabase Storage:

1. Vai su Supabase Dashboard
2. **Storage** → **Create bucket**
3. Nome: `images`
4. **Public bucket**: ✓ (immagini pubblicamente accessibili)

Configura policy per il bucket:

```sql
-- Permetti lettura pubblica
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Permetti upload per utenti autenticati (optional)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
```

#### 4. Indici per Performance

Per migliorare le performance delle query:

```sql
-- Indici per ricerca e ordinamento
CREATE INDEX idx_corsi_categoria ON corsi(categoria);
CREATE INDEX idx_corsi_created_at ON corsi(created_at DESC);
CREATE INDEX idx_eventi_data ON eventi(data_evento);
CREATE INDEX idx_settimane_data_inizio ON settimane_studio(data_inizio);
```

---

## 🔍 Ottimizzazioni SEO

Il frontend include diverse ottimizzazioni SEO pre-configurate:

### 1. File SEO nella cartella public/

- **sitemap.xml**: Mappa del sito per crawler
- **robots.txt**: Istruzioni per i motori di ricerca
- **google-analytics.html**: (opzionale) Tag Google Analytics

Verifica che questi file siano correttamente copiati in `dist/` dopo la build.

### 2. Meta Tag Dinamici

Il componente `SEO.jsx` gestisce:
- Title tag dinamico per ogni pagina
- Meta description
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card
- Canonical URL

Utilizzo:
```jsx
import SEO from '../components/SEO';

function MyPage() {
  return (
    <>
      <SEO 
        title="Titolo Pagina"
        description="Descrizione della pagina"
        keywords="keyword1, keyword2"
        ogType="website"
      />
      {/* ... resto del contenuto */}
    </>
  );
}
```

### 3. Configurazione SEO

Il file `src/config/seo.js` contiene la configurazione SEO globale:

```javascript
export const seoConfig = {
  defaultTitle: 'ALL-HUB - A Lifelong Learning Hub',
  titleTemplate: '%s | ALL-HUB',
  defaultDescription: 'Descrizione del sito...',
  siteUrl: 'https://tuosito.com', // ⚠️ Aggiorna con il tuo dominio!
  // ... altre configurazioni
};
```

⚠️ **IMPORTANTE**: Aggiorna `siteUrl` con il tuo dominio di produzione!

### 4. Lingua e i18n

Il sito supporta 5 lingue:
- 🇮🇹 Italiano (default)
- 🇬🇧 Inglese
- 🇩🇪 Tedesco
- 🇪🇸 Spagnolo
- 🇫🇷 Francese

Le traduzioni sono in `src/locales/[lingua]/translation.json`.

#### Configurazione hreflang per SEO Multilingua

Aggiungi in `index.html` (o dinamicamente):

```html
<link rel="alternate" hreflang="it" href="https://tuosito.com/it" />
<link rel="alternate" hreflang="en" href="https://tuosito.com/en" />
<link rel="alternate" hreflang="de" href="https://tuosito.com/de" />
<link rel="alternate" hreflang="es" href="https://tuosito.com/es" />
<link rel="alternate" hreflang="fr" href="https://tuosito.com/fr" />
<link rel="alternate" hreflang="x-default" href="https://tuosito.com/" />
```

### 5. Performance e Core Web Vitals

Ottimizzazioni già implementate:
- **Code splitting**: Chunk separati per vendor, router, i18n
- **Lazy loading**: Immagini con `loading="lazy"`
- **Minificazione**: Terser per JS, CSS minificato
- **Caching**: Header Cache-Control per asset
- **Compressione**: Gzip/Brotli gestito da Vercel/Netlify

### 6. Structured Data (Schema.org)

Per migliorare la presenza nei risultati di ricerca, considera di aggiungere structured data:

```javascript
// Esempio per Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "ALL-HUB",
  "url": "https://tuosito.com",
  "logo": "https://tuosito.com/logo.png",
  "description": "A Lifelong Learning Hub...",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Città",
    "addressCountry": "IT"
  }
};
```

---

## ✅ Verifiche Post-Deploy

Dopo il deploy, verifica che tutto funzioni:

### 1. Controllo Generale

- [ ] L'applicazione si carica correttamente
- [ ] Non ci sono errori nella console del browser (F12)
- [ ] Il CSS è caricato correttamente
- [ ] Le animazioni funzionano (GSAP, AOS, Swiper)
- [ ] Le rotte funzionano (navigazione tra pagine)
- [ ] Il logo e le immagini sono visibili

### 2. Controllo Multilingua

- [ ] Il language switcher funziona
- [ ] Le traduzioni vengono caricate per tutte le lingue
- [ ] La lingua viene rilevata automaticamente dal browser
- [ ] La lingua viene persistita in localStorage

### 3. Controllo Supabase

- [ ] La connessione a Supabase funziona
- [ ] I corsi vengono caricati
- [ ] Gli eventi vengono caricati
- [ ] Le settimane studio vengono caricate
- [ ] Le immagini da Storage si caricano

### 4. Test Responsive

- [ ] Desktop (1920x1080, 1366x768)
- [ ] Tablet (768x1024, iPad)
- [ ] Mobile (375x667 iPhone SE, 390x844 iPhone 12/13)
- [ ] Landscape e Portrait

### 5. Test Browser

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Samsung Internet (Android)

### 6. Console Browser

Apri la console (F12) e verifica:

- Non ci sono errori JavaScript
- Le chiamate API a Supabase hanno status 200
- Le risorse vengono caricate da CDN
- Nessun avviso di sicurezza (Mixed Content)

### 7. Test SEO

Usa questi strumenti per verificare SEO:

1. **Google Search Console**:
   - Aggiungi la proprietà del sito
   - Verifica proprietà
   - Invia sitemap.xml
   - Controlla indicizzazione

2. **Google PageSpeed Insights**: [https://pagespeed.web.dev/](https://pagespeed.web.dev/)
   - Verifica performance
   - Core Web Vitals (LCP, FID, CLS)
   - SEO score
   - Accessibility score

3. **Lighthouse** (Chrome DevTools):
   - Performance > 90
   - SEO > 95
   - Accessibility > 90
   - Best Practices > 90

4. **Rich Results Test**: [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
   - Verifica structured data

5. **Mobile-Friendly Test**: [https://search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)

### 8. Test Meta Tags

Usa **Facebook Sharing Debugger** e **Twitter Card Validator**:
- Facebook: [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
- Twitter: [https://cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)

---

## 🔧 Troubleshooting

### Problema: "Supabase client not initialized"

**Causa**: Variabili d'ambiente mancanti o errate

**Soluzione**:
1. Verifica che `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` siano configurate
2. Su Vercel/Netlify: controlla Environment Variables
3. Dopo aver modificato le variabili, fai un nuovo deploy (o redeploy)

### Problema: 404 su Rotte

**Causa**: Mancata configurazione del rewrite per SPA

**Soluzione**:
- **Vercel**: Il `vercel.json` include già i rewrites
- **Netlify**: Aggiungi `netlify.toml` con redirects (vedi sezione Netlify)
- Verifica che tutte le richieste vengano reindirizzate a `/index.html`

### Problema: Traduzioni non caricate

**Causa**: File JSON di traduzione non trovati o errori di sintassi

**Soluzione**:
1. Verifica che i file `src/locales/[lingua]/translation.json` esistano
2. Valida la sintassi JSON (usa [jsonlint.com](https://jsonlint.com))
3. Controlla console per errori di i18next
4. Verifica che la build includa la cartella `locales/`

### Problema: Immagini non si caricano

**Causa**: Percorsi errati o Storage non configurato

**Soluzione**:

1. **Immagini locali** (da `src/assets/img/`):
   ```javascript
   import logo from '../assets/img/logo.png';
   <img src={logo} alt="Logo" />
   ```

2. **Immagini pubbliche** (da `public/immagini/`):
   ```javascript
   <img src="/immagini/logo.png" alt="Logo" />
   ```

3. **Immagini da Supabase Storage**:
   - Verifica che il bucket `images` esista
   - Verifica policy pubbliche
   - URL formato: `https://[project].supabase.co/storage/v1/object/public/images/[filename]`

4. **Usa il componente `ImageWithFallback`**:
   ```jsx
   import ImageWithFallback from '../components/ImageWithFallback';
   
   <ImageWithFallback
     src={immagineUrl}
     fallback="/immagini/placeholder.jpg"
     alt="Descrizione"
   />
   ```

### Problema: Animazioni non funzionano

**Causa**: Librerie di animazione non inizializzate

**Soluzione**:
1. Verifica che GSAP, AOS, Swiper siano installati
2. Controlla console per errori di inizializzazione
3. Verifica che gli script di inizializzazione siano eseguiti in `useEffect`

### Problema: Build fallisce

**Causa**: Dipendenze mancanti o versione Node errata

**Soluzione**:
```bash
# Pulisci e reinstalla
rm -rf node_modules package-lock.json
npm install

# Verifica versione Node
node --version  # Deve essere >= 18

# Se necessario, usa nvm per cambiare versione
nvm use 18
```

### Problema: "Module not found" durante build

**Causa**: Import errati o case-sensitivity

**Soluzione**:
1. Verifica che tutti gli import siano corretti
2. Controlla case-sensitivity (Linux/macOS sono case-sensitive)
3. Usa path relativi corretti (`../` o `./`)

### Problema: Slow Build / Warning Chunk Size

**Causa**: Bundle troppo grande

**Soluzione**: 
- Il progetto ha già `chunkSizeWarningLimit: 1000` in `vite.config.js`
- Se il warning persiste, considera:
  - Lazy loading dei componenti con `React.lazy()`
  - Ottimizzare le immagini (WebP, compressione)
  - Rimuovere librerie inutilizzate

### Problema: Console.log in produzione

**Causa**: Build non rimuove i log

**Soluzione**:
- Il `vite.config.js` include già `drop_console: true` nelle opzioni Terser
- Se i log appaiono ancora, verifica che `NODE_ENV=production` sia impostato

### Problema: CORS Error con Supabase

**Causa**: Configurazione CORS su Supabase

**Soluzione**:
1. Vai su Supabase Dashboard → Settings → API
2. Verifica che il tuo dominio sia nella whitelist
3. Per sviluppo locale, `localhost` dovrebbe essere permesso di default

### Problema: Routing non funziona su refresh

**Causa**: Server non configurato per SPA

**Soluzione**:
- Verifica che `vercel.json` o `netlify.toml` abbiano i rewrites corretti
- Tutti i path devono essere reindirizzati a `/index.html` con status 200

---

## 📞 Supporto

Per ulteriori problemi:

1. **Log di Build**: Controlla i log sulla piattaforma di hosting
2. **Log Supabase**: Vai su Supabase Dashboard → Logs
3. **Console Browser**: Apri DevTools (F12) per errori client-side
4. **Network Tab**: Verifica le chiamate API e gli status code

### Risorse Utili

- **Vite Documentation**: [https://vitejs.dev/](https://vitejs.dev/)
- **React Router**: [https://reactrouter.com/](https://reactrouter.com/)
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **i18next**: [https://www.i18next.com/](https://www.i18next.com/)

---

## 📝 Note Finali

### Sicurezza

- **MAI** esporre la chiave `service_role` di Supabase nel frontend
- Usa sempre la chiave `anon` per il client
- Configura correttamente RLS su Supabase per proteggere i dati
- Verifica che i header di sicurezza siano configurati (vedi `vercel.json`)

### Performance

- Il frontend è ottimizzato con Vite
- Code splitting riduce il bundle iniziale
- Lazy loading per immagini e componenti
- CDN globale per asset statici
- Cache aggressiva per asset immutabili (1 anno)

### SEO Best Practices

- **Sitemap**: Aggiorna `sitemap.xml` con tutte le pagine
- **Robots.txt**: Permetti crawling delle pagine pubbliche
- **Meta tags**: Usa il componente `SEO` su ogni pagina
- **Structured Data**: Aggiungi Schema.org markup dove appropriato
- **Alt text**: Aggiungi sempre alt text descrittivo alle immagini
- **Semantic HTML**: Usa tag HTML5 semantici (`<header>`, `<nav>`, `<main>`, `<article>`, etc.)

### Accessibilità (a11y)

- Usa ARIA labels dove necessario
- Garantisci contrasto sufficiente (WCAG AA: 4.5:1)
- Navigazione da tastiera funzionante
- Focus indicators visibili
- Testi alternativi per immagini

### Analytics e Monitoring

Considera di aggiungere:
- **Google Analytics 4**: Tracking visite e conversioni
- **Google Search Console**: Monitoraggio SEO e indicizzazione
- **Sentry/LogRocket**: Error tracking in produzione
- **Vercel Analytics**: Performance monitoring (se su Vercel)

### Aggiornamenti

Per aggiornare il frontend dopo il deploy:

1. **Git-based deploy**: 
   ```bash
   git add .
   git commit -m "Update frontend"
   git push
   # Deploy automatico su Vercel/Netlify
   ```

2. **CLI deploy**:
   ```bash
   vercel --prod
   # oppure
   netlify deploy --prod
   ```

### Backup

Ricorda di fare backup regolari:
- **Database**: Supabase ha backup automatici giornalieri
- **Codice**: Usa Git per version control
- **Immagini**: Backup periodici del bucket Storage

### Domini Custom

Per usare un dominio personalizzato:

1. **Vercel**:
   - Settings → Domains
   - Aggiungi dominio
   - Configura DNS (A record o CNAME)

2. **Netlify**:
   - Site settings → Domain management
   - Aggiungi custom domain
   - Configura DNS

⚠️ Dopo aver configurato il dominio:
- Aggiorna `siteUrl` in `src/config/seo.js`
- Aggiorna `sitemap.xml` con il nuovo dominio
- Aggiorna meta tag canonical
- Risubmit sitemap a Google Search Console

---

## 🎯 Checklist Pre-Deploy

Prima del deploy finale, verifica:

- [ ] Variabili d'ambiente configurate
- [ ] Build locale funzionante (`npm run build` && `npm run preview`)
- [ ] Tutte le traduzioni complete per le 5 lingue
- [ ] SEO config aggiornato con dominio di produzione
- [ ] Sitemap.xml aggiornato
- [ ] Robots.txt configurato
- [ ] Favicon e logo presenti
- [ ] Google Analytics configurato (se utilizzato)
- [ ] Tutte le immagini ottimizzate
- [ ] Supabase RLS configurato correttamente
- [ ] Storage bucket `images` creato e configurato
- [ ] Test su dispositivi mobile reali
- [ ] Test su browser principali
- [ ] Lighthouse score > 90 su tutte le metriche

---

**Buon deploy! 🚀**

Se hai domande o problemi, consulta la documentazione tecnica in `DOCUMENTAZIONE_TECNICA_COMPLETA.md` o i file specifici:
- `README.md` - Panoramica progetto
- `TRANSLATION_GUIDE.md` - Guida traduzioni
- `README_SEO.md` - Ottimizzazioni SEO
- `README_OTTIMIZZAZIONI.md` - Performance optimizations

