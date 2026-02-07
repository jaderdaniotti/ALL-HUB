-- ========================================
-- FIX INDICI SUPABASE (risolve errore 42P17)
-- ========================================
-- Problema: now() è VOLATILE, non può essere usato negli indici parziali
-- Soluzione: indici senza now(), filtri lato applicazione

-- Drop indici problematici se esistono
DROP INDEX IF EXISTS idx_eventi_upcoming;

-- ========================================
-- INDICI OTTIMIZZATI
-- ========================================

-- Corsi: query su is_active + created_at (per ordinamento DESC)
CREATE INDEX IF NOT EXISTS idx_corsi_is_active_created_at
  ON public.corsi (is_active, created_at DESC);

-- Eventi: query su is_active + date (per ordinamento ASC, eventi futuri)
CREATE INDEX IF NOT EXISTS idx_eventi_is_active_date
  ON public.eventi (is_active, date ASC);

-- Settimane studio: ordinamento per created_at
CREATE INDEX IF NOT EXISTS idx_settimane_studio_created_at
  ON public.settimane_studio (created_at DESC);

-- INDICE PARZIALE CORRETTO: solo eventi attivi (senza now())
-- Nota: il filtro "eventi futuri" sarà fatto lato applicazione con gte('date', today)
CREATE INDEX IF NOT EXISTS idx_eventi_active_only
  ON public.eventi (date ASC)
  WHERE is_active = true;

-- ========================================
-- VERIFICA PERFORMANCE
-- ========================================
-- Dopo aver creato gli indici, verifica con:
-- EXPLAIN ANALYZE SELECT * FROM corsi WHERE is_active = true ORDER BY created_at DESC LIMIT 12;
-- EXPLAIN ANALYZE SELECT * FROM eventi WHERE is_active = true AND date >= CURRENT_DATE ORDER BY date ASC LIMIT 12;
-- EXPLAIN ANALYZE SELECT * FROM settimane_studio ORDER BY created_at DESC LIMIT 12;

-- Output atteso: "Index Scan using idx_..." invece di "Seq Scan"

