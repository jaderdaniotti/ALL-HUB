-- ========================================
-- FIX IMMEDIATO ERRORE 42P17 SUPABASE
-- ========================================
-- Errore: "functions in index predicate must be marked IMMUTABLE"
-- Causa: now() negli indici parziali non è permesso
-- Soluzione: rimuovere now() dagli indici

-- ========================================
-- ISTRUZIONI
-- ========================================
-- 1. Apri Supabase Dashboard → SQL Editor
-- 2. Copia TUTTO questo file
-- 3. Incolla ed ESEGUI (Run)
-- 4. Verifica output: "Success. No rows returned"
-- ========================================

-- Step 1: Rimuovi indici problematici (se esistono)
DROP INDEX IF EXISTS idx_eventi_upcoming;
DROP INDEX IF EXISTS idx_corsi_is_active_created_at;
DROP INDEX IF EXISTS idx_eventi_is_active_date;
DROP INDEX IF EXISTS idx_settimane_studio_created_at;

-- Step 2: Crea indici corretti (SENZA now())

-- Corsi: ottimizza query con filtro is_active + ordinamento created_at
CREATE INDEX idx_corsi_is_active_created_at
  ON public.corsi (is_active, created_at DESC);

-- Eventi: ottimizza query con filtro is_active + ordinamento date
CREATE INDEX idx_eventi_is_active_date
  ON public.eventi (is_active, date ASC);

-- Settimane studio: ottimizza ordinamento created_at
CREATE INDEX idx_settimane_studio_created_at
  ON public.settimane_studio (created_at DESC);

-- Indice parziale per eventi attivi (SENZA now())
-- Nota: il filtro "solo eventi futuri" sarà fatto lato app con gte('date', today)
CREATE INDEX idx_eventi_active_only
  ON public.eventi (date ASC)
  WHERE is_active = true;

-- ========================================
-- VERIFICA (opzionale)
-- ========================================
-- Controlla che gli indici siano stati creati:
-- SELECT indexname, indexdef 
-- FROM pg_indexes 
-- WHERE tablename IN ('corsi', 'eventi', 'settimane_studio')
-- ORDER BY tablename, indexname;

-- ========================================
-- ✅ FATTO!
-- ========================================
-- L'errore 42P17 è risolto.
-- Le query su corsi, eventi e settimane studio saranno ora molto più veloci.
-- 
-- Prossimo step: ottimizza le query lato app (vedi IMPLEMENTAZIONE_STEP_BY_STEP.md)

