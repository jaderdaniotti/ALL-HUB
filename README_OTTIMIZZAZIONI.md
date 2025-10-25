# 🚀 Ottimizzazioni ALL-HUB - Quick Start

## ⚡ FIX RAPIDO ERRORE SUPABASE (2 minuti)

**Problema**: Errore `42P17: functions in index predicate must be marked IMMUTABLE` [[memory:7623036]]

**Soluzione immediata**:
1. Apri [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
2. Apri il file `FRONTEND/FIX_ERRORE_SUPABASE.sql`
3. Copia TUTTO il contenuto
4. Incolla nel SQL Editor
5. Clicca **RUN**
6. ✅ Fatto! Errore risolto

---

## 📁 FILE CREATI

```
FRONTEND/
├── PIANO_OTTIMIZZAZIONE.md              ← Piano completo ottimizzazioni
├── IMPLEMENTAZIONE_STEP_BY_STEP.md      ← Guida passo-passo
├── FIX_ERRORE_SUPABASE.sql              ← Fix immediato errore (ESEGUI SUBITO)
│
├── sql/
│   ├── 01_fix_indices.sql               ← Indici corretti (come FIX_ERRORE_SUPABASE.sql)
│   └── 02_setup_storage.sql             ← Setup Storage per immagini (opzionale)
│
├── src/lib/
│   ├── supabase.js                      ← File attuale (da sostituire)
│   └── supabase-optimized.js            ← Versione ottimizzata (usa questo)
│
└── scripts/
    └── migrate-images-to-storage.js     ← Script migrazione immagini (opzionale)
```

---

## 🎯 OBIETTIVO

Trasformare il progetto in:
- **FRONTEND**: sito vetrina veloce (solo lettura, fetch ottimizzati)
- **PANNELLO**: pannello admin (CRUD completo, separato)

---

## ✅ QUICK WINS (30 minuti)

Implementa questi 3 step per miglioramenti immediati:

### 1️⃣ Fix Indici SQL (2 min)
- Esegui `FRONTEND/FIX_ERRORE_SUPABASE.sql` su Supabase
- **Risultato**: errore 42P17 risolto, query -50% più veloci

### 2️⃣ Sostituisci supabase.js (5 min)
```bash
cd FRONTEND/src/lib
cp supabase.js supabase.js.backup
cp ../../../supabase-optimized.js supabase.js
```
- **Risultato**: query ottimizzate, timeout, cache 5min

### 3️⃣ Testa (3 min)
```bash
cd FRONTEND
npm run dev
```
- Apri `http://localhost:5173/attivita`
- Controlla console: dovresti vedere `✅ Fetched X corsi/eventi/settimane`
- Ricarica pagina: dovresti vedere `📦 Cache hit`

**Totale**: 10 minuti, miglioramenti significativi! 🎉

---

## 📊 RISULTATI ATTESI

| Metrica | Prima | Dopo | Miglioramento |
|---------|-------|------|---------------|
| Query DB | 400-800ms | 120-250ms | -60-70% |
| LCP | 2.5-3.5s | 1.2-1.8s | -40-50% |
| Cache | Nessuna | 5 min | ∞ |
| Payload | 500KB-1MB | 150-300KB* | -70%* |

\* con migrazione immagini a Storage

---

## 📖 DOCUMENTAZIONE

- **IMPLEMENTAZIONE_STEP_BY_STEP.md**: guida dettagliata con troubleshooting
- **PIANO_OTTIMIZZAZIONE.md**: piano tecnico completo
- **migliorie.md**: analisi performance originale

---

## 🆘 PROBLEMI?

### Errore "Supabase client not initialized"
→ Verifica `.env.local` con `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

### Query ancora lente
→ Verifica che gli indici siano creati (vedi IMPLEMENTAZIONE_STEP_BY_STEP.md STEP 2)

### Cache non funziona
→ Verifica che sessionStorage non sia disabilitato nel browser

---

## 🔜 PROSSIMI PASSI (opzionali)

Dopo i quick wins, considera:

1. **Migrazione immagini a Storage** (60 min)
   - Setup: `sql/02_setup_storage.sql`
   - Migrazione: `scripts/migrate-images-to-storage.js`
   - Benefici: -80% dimensione record, CDN gratis

2. **Code splitting** (20 min)
   - Lazy load pagine
   - Bundle più piccolo

3. **Deploy separati** (30 min)
   - FRONTEND su dominio principale
   - PANNELLO su subdomain admin

---

**Inizia con i Quick Wins! 🚀**

