## Migliorie prestazionali per All‑Hub (Showcase + PANNELLO)

Obiettivo: ridurre tempi di caricamento percepiti e reali (TTFB, LCP, INP), stabilizzare le fetch, minimizzare payload/JS, e migliorare l’osservabilità degli errori.

### KPI da monitorare
- **Showcase**: TTFB < 200 ms, LCP < 2.0 s (4G), INP < 200 ms, error rate fetch < 1%.
- **PANNELLO**: tempo medio CRUD 120–300 ms, P95 < 600 ms, error rate < 1%.

---

### 1) Database (Postgres/Supabase)
- **Indici mirati** (riduce sort/seq scan):
```sql
-- Corsi: query su is_active + created_at
create index if not exists idx_corsi_is_active_created_at
  on public.corsi (is_active, created_at desc);

-- Eventi: query su is_active + date (ordinati per data futura)
create index if not exists idx_eventi_is_active_date
  on public.eventi (is_active, date asc);

-- Settimane studio: ordinamento per created_at
create index if not exists idx_settimane_studio_created_at
  on public.settimane_studio (created_at desc);

-- Opzionale (solo eventi futuri): partial index
create index if not exists idx_eventi_upcoming
  on public.eventi (date asc)
  where is_active = true and date >= now();
```
- **Shape query più leggera**: evitare `select *`, selezionare solo i campi necessari (riduce payload e CPU).
- **Paginazione**: usare range header/PostgREST (`range: 0-19`) per liste lunghe; UI con “carica altro”.
- **Filtri lato DB**: per `eventi` filtrare direttamente “solo dal giorno corrente in avanti”.
- **Verifica piani**: abilitare `pg_stat_statements` su Supabase (se disponibile) per individuare query lente.

Impatto atteso: SELECT tipiche 10–30 ms CPU, end-to-end 120–250 ms (EU). Lists grandi scalano meglio.

---

### 2) Storage & Media
- **Rimuovere base64 dalle colonne** e salvare su Supabase Storage; memorizzare solo URL (pubblico o signed).
  - Payload riga molto più leggero (−90% dimensione record), SELECT più rapide.
- **Formati moderni**: WebP/AVIF, con fallback JPEG.
- **Immagini responsive**: `srcset`/`sizes`, `loading="lazy"`, attributi `width/height` per stabilizzare layout.
- **CDN**: abilitare CDN di Supabase Storage; sfruttare caching con TTL lunghi.
- **Trasformazioni server‑side**: thumbnail ridimensionate (es. 480/720) per liste; full‑size solo nei dettagli.

Impatto atteso: -30–60% tempo medio liste con immagini, minori costi di rete.

---

### 3) API / Fetch
- **Timeout e retry** per fetch client con `AbortController` e backoff (evita attese infinite/UX bloccata):
```js
// Esempio (concettuale) timeout 4s + 1 retry
const withTimeout = (p, ms=4000) => {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  return p(c.signal).finally(() => clearTimeout(t));
};

async function fetchCorsiOnce(signal) {
  // chiamata supabase-js con signal opzionale
}

async function fetchCorsiSafe() {
  try { return await withTimeout(fetchCorsiOnce, 4000); }
  catch { return await withTimeout(fetchCorsiOnce, 4000); }
}
```
- **Batch paralleli controllati**: già usato `Promise.all`; mantenere.
- **Deduplicazione richieste**: cache in memoria per navigazioni ripetute (o TanStack Query/SWR per stale‑while‑revalidate).
- **Riduzione campo/precisione**: evitare campi inutili nelle liste (es. testo lunghissimo), normalizzare.

Impatto atteso: UX più reattiva su reti instabili; meno errori percepiti.

---

### 4) Frontend (Showcase)
- **Bundle più piccolo**: separare completamente PANNELLO (già fatto). Valutare:
  - Code‑splitting per pagine pesanti (route dinamiche).
  - Import dinamico delle lingue/i18n extra.
  - Evitare dipendenze non usate; audit periodico.
- **Rendering efficiente**:
  - Skeletons già presenti: bene.
  - Virtualizzazione liste se > 100 card visibili.
  - `memo`/memoization per componenti pesanti.
- **Preconnect/Preload**:
  - `link rel="preconnect"` verso `https://<project>.supabase.co`.
  - Preload hero image e font critici.
- **Caching UI**: conservare ultimo payload in `sessionStorage`/in‑memory per navigazioni indietro rapide.

Impatto atteso: -80–150 KB gzip iniziali, -80–200 ms “time‑to‑interactive” su 4G reale.

---

### 5) Frontend (PANNELLO)
- **Validazioni più forti**: schema (Zod/Joi) lato client per prevenire roundtrip non validi.
- **Gestione errori centralizzata**: toast/notifier + mapping errori Supabase comprensibili.
- **Tabelle grandi**: TanStack Table + virtualizzazione.
- **Log e telemetria**: Sentry/Logflare per tracciare CRUD falliti e tempi (P95/99).

Impatto atteso: minori errori runtime, diagnosi più rapide.

---

### 6) Caching & CDN
- **Header caching** (produzione):
  - Statici: `Cache-Control: public, max-age=31536000, immutable`.
  - JSON/HTML dinamici: `stale-while-revalidate` con TTL adeguati.
- **Brotli**: abilitare compressione brotli lato hosting (Vercel lo fa automaticamente).
- **HTTP/2/3**: tenere attivi per multiplexing.
- **ETag/If-None-Match**: benefico se servite risorse JSON statiche (pre‑build).

Impatto atteso: riduzione trasferimenti e TTFB percepito su ritorni/navigazioni.

---

### 7) Modello dati/viste
- **Flag pubblicazione**: `status`/`published_at` e vista `public_content` che espone solo pubblicati.
- **Riduzione join**: denormalizzare piccoli campi “read‑mostly” (categoria) nelle viste pubbliche.
- **Limiter**: `limit 12/24` per anteprime; paginazione per lotti successivi.

Impatto atteso: query più semplici e veloci, minor payload per homepage/listing.

---

### 8) Monitoraggio & Qualità
- **Lighthouse + Web Vitals**: integrare budget (peso JS/CSS, LCP target).
- **Sentry**: errori runtime, tracing fetch (con tag tabella/operazione).
- **Logflare/Supabase logs**: analisi errori DB e RLS.
- **Alerting**: P95 LCP e error rate > soglia.

---

### Roadmap consigliata (2–3 sprint brevi)
1) Database & immagini (impatto alto)
   - Creare indici sopra.
   - Migrare immagini a Storage; backfill URL; rimuovere base64 dalle righe.
2) Showcase (percepito utente)
   - Preconnect Supabase, preload hero.
   - Select minimali, filtri lato DB (eventi futuri), limit/paginazione.
   - Code‑splitting per pagine più pesanti.
3) PANNELLO (affidabilità)
   - Validazioni schema, toast centralizzato, telemetria Sentry.
   - Virtualizzare liste >100.
4) Caching/CDN
   - Headers ottimali in produzione (statici lunghi, SWR su JSON).
5) QA continua
   - Lighthouse su CI, Web Vitals RUM, log Supabase per query lente.

---

### Stime di impatto complessive
- **Showcase**: LCP -200…-600 ms; TTI -80…-200 ms; traffico rete -30% su pagine con molte immagini.
- **PANNELLO**: CRUD P95 -20…-40%; errori diagnosticabili più rapidamente.
- **Stabilità**: minori timeout percepiti con timeout+retry; UX più fluida su 4G.
