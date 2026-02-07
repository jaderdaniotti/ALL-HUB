# Piano di Ottimizzazione ALL-HUB
## Obiettivo: FRONTEND vetrina veloce + PANNELLO admin separato

### ✅ FASE 1: FIX DATABASE & INDICI (priorità ALTA)
**Impatto**: -50-70% tempi query, query più stabili

#### 1.1 Correzione Indici SQL
**Problema**: `now()` non è IMMUTABLE, non può essere usato negli indici parziali
**Soluzione**: Rimuovere la condizione `date >= now()` dall'indice parziale

```sql
-- ✅ Indici corretti (senza now())
-- Corsi: query su is_active + created_at
CREATE INDEX IF NOT EXISTS idx_corsi_is_active_created_at
  ON public.corsi (is_active, created_at DESC);

-- Eventi: query su is_active + date (ordinati per data futura)
CREATE INDEX IF NOT EXISTS idx_eventi_is_active_date
  ON public.eventi (is_active, date ASC);

-- Settimane studio: ordinamento per created_at
CREATE INDEX IF NOT EXISTS idx_settimane_studio_created_at
  ON public.settimane_studio (created_at DESC);

-- OPZIONALE: Indice parziale per eventi futuri (senza now())
-- Alternativa: usare una vista materializzata o filtrare lato applicazione
CREATE INDEX IF NOT EXISTS idx_eventi_active_only
  ON public.eventi (date ASC)
  WHERE is_active = true;
```

#### 1.2 Verifica Struttura Tabelle
```sql
-- Verifica che tutte le colonne necessarie esistano
-- corsi: id, title, description, duration, level, type, modality, additional_notes, image_url, is_active, created_at
-- eventi: id, title, description, date, time, location, category, image_url, is_active, created_at
-- settimane_studio: id, title, description, duration, type, city, activities, image_url, created_at
```

---

### ✅ FASE 2: OTTIMIZZAZIONE QUERY FRONTEND (priorità ALTA)
**Impatto**: -30-50% payload, fetch più veloci

#### 2.1 Query Leggere (solo campi necessari)
**Prima**: `select *` (carica tutto)
**Dopo**: seleziona solo campi per card di anteprima

```js
// FRONTEND - Attivita.jsx
// Corsi: solo campi per card
.select('id, title, description, duration, level, type, modality, image_url')

// Eventi: solo campi per card + filtra eventi futuri lato client
.select('id, title, description, date, time, location, category, image_url')

// Settimane: solo campi per card
.select('id, title, description, duration, type, city, activities, image_url')
```

#### 2.2 Filtri lato DB
```js
// Eventi: filtra solo eventi futuri lato DB (se possibile)
// Nota: non possiamo usare now() negli indici, ma possiamo usarlo nelle query
const today = new Date().toISOString().split('T')[0];

.select('id, title, description, date, time, location, category, image_url')
.eq('is_active', true)
.gte('date', today) // filtra >= oggi
.order('date', { ascending: true })
.limit(12); // limita risultati
```

#### 2.3 Timeout & Retry
```js
// Aggiungi timeout e retry per fetch robuste
const withTimeout = (promise, ms = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);
  
  return promise
    .finally(() => clearTimeout(timeoutId))
    .catch(err => {
      if (err.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw err;
    });
};

// Usa in supabaseService.getCorsi(), getEventi(), getSettimaneStudio()
```

---

### ✅ FASE 3: MIGRAZIONE IMMAGINI A STORAGE (priorità MEDIA)
**Impatto**: -80-90% dimensione record, -40-60% tempo caricamento liste

#### 3.1 Setup Supabase Storage
```sql
-- Crea bucket per immagini (se non esiste)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- Policy per accesso pubblico in lettura
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- Policy per admin insert/update/delete
CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' );
```

#### 3.2 Migrazione Dati
1. Per ogni record con image_url base64:
   - Upload a Supabase Storage (`images/corsi/{id}.webp`)
   - Ottieni URL pubblico
   - Aggiorna record con nuovo URL
   - Rimuovi base64

2. Script di migrazione (eseguire dal PANNELLO):
```js
async function migrateImagesToStorage() {
  const tables = ['corsi', 'eventi', 'settimane_studio'];
  
  for (const table of tables) {
    const { data } = await supabase.from(table).select('id, image_url');
    
    for (const item of data) {
      if (item.image_url?.startsWith('data:image')) {
        // Converti base64 a blob
        const blob = await fetch(item.image_url).then(r => r.blob());
        
        // Upload a storage
        const fileName = `${table}/${item.id}.webp`;
        await supabase.storage.from('images').upload(fileName, blob);
        
        // Ottieni URL pubblico
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
        
        // Aggiorna record
        await supabase.from(table)
          .update({ image_url: publicUrl })
          .eq('id', item.id);
      }
    }
  }
}
```

---

### ✅ FASE 4: SEPARAZIONE FRONTEND/PANNELLO (priorità MEDIA)
**Impatto**: bundle più leggero, deploy separati, maggiore sicurezza

#### 4.1 Struttura Cartelle (GIÀ FATTO ✓)
```
ALL-HUB/
├── FRONTEND/          → Sito vetrina (solo lettura)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Attivita.jsx (solo fetch, no CRUD)
│   │   │   ├── About.jsx
│   │   │   └── Contatti.jsx
│   │   └── lib/
│   │       └── supabase.js (solo metodi GET)
│   └── package.json
│
└── PANNELLO/          → Pannello admin (CRUD completo)
    ├── src/
    │   ├── pages/
    │   │   ├── AdminLogin.jsx
    │   │   └── AdminDashboard.jsx (CRUD completo)
    │   └── lib/
    │       └── supabase.js (metodi GET + POST + PUT + DELETE)
    └── package.json
```

#### 4.2 Ottimizzazione supabase.js FRONTEND
```js
// FRONTEND/src/lib/supabase.js
// SOLO metodi GET ottimizzati per vetrina

export const supabaseService = {
  // Solo lettura, con timeout e campi selezionati
  async getCorsi() {
    const { data, error } = await withTimeout(
      supabase
        .from('corsi')
        .select('id, title, description, duration, level, type, modality, image_url')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(12), // limita per performance
      5000 // timeout 5s
    );
    
    if (error) throw error;
    return data || [];
  },
  
  async getEventi() {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await withTimeout(
      supabase
        .from('eventi')
        .select('id, title, description, date, time, location, category, image_url')
        .eq('is_active', true)
        .gte('date', today) // solo eventi futuri
        .order('date', { ascending: true })
        .limit(12),
      5000
    );
    
    if (error) throw error;
    return data || [];
  },
  
  async getSettimaneStudio() {
    const { data, error } = await withTimeout(
      supabase
        .from('settimane_studio')
        .select('id, title, description, duration, type, city, activities, image_url')
        .order('created_at', { ascending: false })
        .limit(12),
      5000
    );
    
    if (error) throw error;
    return data || [];
  }
};

// NO metodi add/update/delete nel FRONTEND
```

#### 4.3 PANNELLO rimane completo
```js
// PANNELLO/src/lib/supabase.js
// Mantiene tutti i metodi CRUD esistenti
```

---

### ✅ FASE 5: PERFORMANCE FRONTEND (priorità MEDIA)
**Impatto**: -200-400ms LCP, -100-200ms TTI

#### 5.1 Preconnect & Preload
```html
<!-- FRONTEND/index.html -->
<head>
  <!-- Preconnect a Supabase -->
  <link rel="preconnect" href="https://<your-project>.supabase.co">
  <link rel="dns-prefetch" href="https://<your-project>.supabase.co">
  
  <!-- Preload hero image -->
  <link rel="preload" as="image" href="/assets/hero.webp">
</head>
```

#### 5.2 Code Splitting
```js
// FRONTEND/src/App.jsx
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Attivita = lazy(() => import('./pages/Attivita'));
const About = lazy(() => import('./pages/About'));
const Contatti = lazy(() => import('./pages/Contatti'));

// Usa Suspense con fallback
<Suspense fallback={<Loader />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/attivita" element={<Attivita />} />
    <Route path="/about" element={<About />} />
    <Route path="/contatti" element={<Contatti />} />
  </Routes>
</Suspense>
```

#### 5.3 Caching sessionStorage
```js
// Cache in sessionStorage per navigazioni rapide
const CACHE_KEY = 'all-hub-cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minuti

const getCachedData = (key) => {
  const cached = sessionStorage.getItem(`${CACHE_KEY}-${key}`);
  if (!cached) return null;
  
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_TTL) {
    sessionStorage.removeItem(`${CACHE_KEY}-${key}`);
    return null;
  }
  
  return data;
};

const setCachedData = (key, data) => {
  sessionStorage.setItem(`${CACHE_KEY}-${key}`, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
};

// Usa in getCorsi(), getEventi(), getSettimaneStudio()
```

---

### ✅ FASE 6: BUNDLE OPTIMIZATION (priorità BASSA)
**Impatto**: -80-150KB gzip, -80-200ms TTI

#### 6.1 Vite Config Optimization
```js
// FRONTEND/vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n': ['i18next', 'react-i18next'],
          'supabase': ['@supabase/supabase-js']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // rimuovi console.log in produzione
        drop_debugger: true
      }
    }
  }
});
```

#### 6.2 Import Dinamici i18n
```js
// Carica solo la lingua selezionata
import('locales/${lang}/translation.json')
```

---

### ✅ FASE 7: MONITORING & QA (priorità BASSA)
**Impatto**: osservabilità, debugging più rapido

#### 7.1 Web Vitals
```js
// FRONTEND/src/main.jsx
import { onCLS, onFID, onLCP } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);
```

#### 7.2 Error Boundary
```js
// Gestione errori React
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

## 📋 CHECKLIST IMPLEMENTAZIONE

### Sprint 1: Database & Query (1-2 giorni)
- [ ] Eseguire SQL indici corretti su Supabase
- [ ] Ottimizzare supabase.js FRONTEND (query leggere, timeout, filtri)
- [ ] Testare performance query (dovrebbero essere 120-250ms)

### Sprint 2: Storage & Immagini (2-3 giorni)
- [ ] Setup Supabase Storage bucket
- [ ] Script migrazione immagini base64 → Storage
- [ ] Aggiornare componenti ImageWithFallback
- [ ] Testare caricamento immagini

### Sprint 3: Frontend Performance (1-2 giorni)
- [ ] Preconnect & preload in index.html
- [ ] Code splitting route
- [ ] Caching sessionStorage
- [ ] Testare LCP/TTI con Lighthouse

### Sprint 4: Bundle & Deploy (1 giorno)
- [ ] Ottimizzare vite.config.js
- [ ] Build produzione FRONTEND e PANNELLO
- [ ] Deploy separati (Vercel)
- [ ] Testare prod

### Sprint 5: Monitoring (opzionale)
- [ ] Web Vitals
- [ ] Error boundaries
- [ ] Sentry (se necessario)

---

## 🎯 RISULTATI ATTESI

### Performance
- **FRONTEND**:
  - LCP: 1.2-1.8s (da ~2.5-3.5s) → ✅ -40-50%
  - TTFB: 120-200ms (da ~300-500ms) → ✅ -50-60%
  - Payload: -30-40% (grazie a Storage e query leggere)
  
- **PANNELLO**:
  - CRUD: 150-300ms (da ~400-800ms) → ✅ -40-60%
  - Stabilità: minori timeout, UX più fluida

### Architettura
- ✅ FRONTEND: vetrina veloce, solo lettura
- ✅ PANNELLO: admin completo, deploy separato
- ✅ Database: indici ottimizzati, query efficienti
- ✅ Storage: immagini CDN, payload leggero

---

## 🚀 PROSSIMI PASSI

1. **FASE 1**: Fixare indici SQL (SUBITO)
2. **FASE 2**: Ottimizzare query FRONTEND (ALTA priorità)
3. **FASE 3**: Migrare immagini a Storage (MEDIA priorità)
4. Resto secondo roadmap

Vuoi che proceda con la **FASE 1** (fix indici SQL)?

