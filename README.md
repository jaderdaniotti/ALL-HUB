## All‑Hub – Sito vetrina + PANNELLO Admin (Supabase)

Questo repository contiene due applicazioni separate ma correlate:
- Showcase (sito vetrina, sola lettura) – codice alla radice del progetto.
- PANNELLO (dashboard riusabile per la creazione/gestione contenuti) – in `PANNELLO/`.

Separare il pannello dal sito migliora performance, sicurezza e manutenzione. Tutte le scritture avvengono nel PANNELLO; il vetrina esegue solo SELECT con chiave anon e RLS sicure.

---

### Struttura del repository
```
/
├── src/                      # Showcase (sito vetrina)
├── PANNELLO/                 # Progetto separato per il pannello admin
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── README.md                 # Questo file
└── migliorie.md              # Ottimizzazioni consigliate (DB, frontend, CDN)
```

Entità gestite (DB Supabase):
- `corsi` (soft‑delete via `is_active`), `eventi`, `settimane_studio`, `users` (admin, con `password_hash` bcrypt e `is_admin=true`).

---

### Novità e modifiche principali
- Creato il progetto separato `PANNELLO/` (Vite + React) con:
  - Login admin tramite tabella `users` (`bcrypt` su `password_hash`, flag `is_admin`).
  - CRUD completi per `corsi`, `eventi`, `settimane_studio`.
  - Soft‑delete per `corsi` (`is_active=false`), coerente con il progetto vetrina.
  - Log di debug mirati in servizi e pagine (solo console).
- Ottimizzazioni tecniche:
  - Import corretto delle icone: `bootstrap-icons/font/bootstrap-icons.css` (evita warning).
  - Test connessione Supabase “head‑only” (selettore con `count`), più leggero.
  - Router semplificato nel PANNELLO; bundle piccolo e avvio rapido.
- Documentazione performance in `migliorie.md` (indici SQL, immagini su Storage, caching/CDN, retry/timeout, ecc.).

Nessun dato di test inserito. Nessuna modifica distruttiva al codice del vetrina.

---

### Requisiti
- Node.js ≥ 18
- Un progetto Supabase (PostgreSQL + Storage)
- RLS e policy coerenti (vedi note sotto)

---

### Variabili d’ambiente
Entrambe le app usano le stesse env (in file `.env.local`):
```env
VITE_SUPABASE_URL= https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY= <anon-key>
```
- Showcase: crea `./.env.local` alla radice.
- PANNELLO: crea `./PANNELLO/.env.local` (copia da `PANNELLO/.env.example`).
- Sicurezza: non usare mai la Service Role Key nel browser. Se servono operazioni elevate, farle lato server.

---

### Installazione & avvio (sviluppo)
Showcase (sito vetrina):
```bash
npm install
npm run dev
# http://localhost:5173
```
PANNELLO (dashboard):
```bash
cd PANNELLO
npm install
npm run dev
# http://localhost:5173 (porta assegnata da Vite; se conflitto, 5174)
```

### Build produzione
Showcase:
```bash
npm run build && npm run preview
```
PANNELLO:
```bash
cd PANNELLO
npm run build && npm run preview
```

### Deploy (suggerito)
- Due progetti separati (es. Vercel): uno per il vetrina, uno per il pannello.
- Imposta le env in ciascun progetto (URL/KEY anon). Abilita CDN/static caching.

---

### Database & RLS (linee guida)
- Tabelle: `corsi`, `eventi`, `settimane_studio`, `users`.
- Soft‑delete: `corsi.is_active` usato per nascondere elementi eliminati.
- RLS consigliate:
  - Vetrina (ruolo anon): `SELECT` solo su contenuti pubblicati/attivi.
  - Admin (login via tabella `users`): policy che consente INSERT/UPDATE/DELETE ai soli admin.
- Indici consigliati (vedi `migliorie.md`):
  - `corsi(is_active, created_at)`, `eventi(is_active, date)`, `settimane_studio(created_at)`.

---

### API lato client (PANNELLO)
Servizio in `PANNELLO/src/lib/supabase.js`:
- `getCorsi()`, `addCorso(payload)`, `updateCorso(id, payload)`, `deleteCorso(id)`
- `getEventi()`, `addEvento(payload)`, `updateEvento(id, payload)`, `deleteEvento(id)`
- `getSettimaneStudio()`, `addSettimanaStudio(payload)`, `updateSettimanaStudio(id, payload)`, `deleteSettimanaStudio(id)`
- `loginAdmin(email, password)` (usa `bcrypt.compare` sul campo `password_hash`)
- `testSupabaseConnection()` (HEAD‑count leggero per connettività)

Campi rilevanti: per le liste usiamo `image_url`. Si consiglia di archiviare le immagini su Supabase Storage e memorizzare solo URL (vedi migliorie).

---

### Performance & best practices (sintesi)
- Sposta le immagini su Supabase Storage + CDN (niente base64 in colonna). Thumbnail per liste.
- Aggiungi indici DB su colonne filtrate/ordinate.
- Evita `select *` nelle liste; ritorna solo i campi necessari.
- Considera timeout (3–4s) e 1 retry sulle fetch client per reti instabili.
- Code splitting per pagine pesanti, preconnect verso Supabase, preload degli asset critici.
- Dettagli e SQL pronti in `migliorie.md`.

---

### Gestione errori & logging
- Showcase: skeletons e messaggi utente già presenti; prevedi retry leggero.
- PANNELLO: try/catch, messaggi in pagina, log console di debug per tutte le operazioni.
- Suggerito: integrare Sentry/Logflare per tracciare P95/P99 e errori reali.

---

### Troubleshooting
- 401/403 con chiave anon: verifica RLS/policy per `SELECT` sulle tabelle/viste usate dal vetrina.
- Login admin fallisce: verifica record in `users` con `is_admin=true` e `password_hash` (bcrypt) corretto.
- Lentezza liste: aggiungi indici, riduci colonne tornate, rimuovi base64 (usa Storage), limita `limit`/paginazione.
- Icone non visibili: assicurati l’import `bootstrap-icons/font/bootstrap-icons.css`.
- Env mancanti: controlla `.env.local` sia nel vetrina sia in `PANNELLO/`.

---

### FAQ
- Posso riusare il PANNELLO per altri progetti? Sì: cambia solo le env Supabase e (opzionalmente) i bucket Storage.
- Posso usare Supabase Auth al posto della tabella `users`? Sì: avrai JWT e policy più granulari; richiede un minimo refactoring.

---

### Licenza
Questo progetto è distribuito sotto licenza MIT (se non diversamente indicato). Controlla eventuali file di licenza specifici.

### Contatti
Per supporto o domande, apri una issue o contatta l’amministratore del progetto.
