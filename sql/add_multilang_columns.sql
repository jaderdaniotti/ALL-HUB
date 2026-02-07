-- ========================================
-- SCRIPT SQL: Aggiunta Colonne Multilingua (IT/EN)
-- ========================================
-- Questo script aggiunge colonne per italiano e inglese alle tabelle
-- corsi, eventi e settimane_studio

-- IMPORTANTE: Esegui questo script su Supabase SQL Editor
-- https://supabase.com/dashboard → SQL Editor → New Query

-- ========================================
-- 1. TABELLA CORSI
-- ========================================

-- Rinomina colonne esistenti aggiungendo suffisso _it
ALTER TABLE corsi 
  RENAME COLUMN title TO title_it;

ALTER TABLE corsi 
  RENAME COLUMN description TO description_it;

-- Aggiungi colonne inglesi
ALTER TABLE corsi 
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT;

-- Aggiungi note aggiuntive in inglese (se non esiste già)
ALTER TABLE corsi 
  ADD COLUMN IF NOT EXISTS additional_notes_en TEXT;

-- ========================================
-- 2. TABELLA EVENTI
-- ========================================

-- Rinomina colonne esistenti aggiungendo suffisso _it
ALTER TABLE eventi 
  RENAME COLUMN title TO title_it;

ALTER TABLE eventi 
  RENAME COLUMN description TO description_it;

-- Aggiungi colonne inglesi
ALTER TABLE eventi 
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT;

-- ========================================
-- 3. TABELLA SETTIMANE_STUDIO
-- ========================================

-- Rinomina colonne esistenti aggiungendo suffisso _it
ALTER TABLE settimane_studio 
  RENAME COLUMN title TO title_it;

ALTER TABLE settimane_studio 
  RENAME COLUMN description TO description_it;

ALTER TABLE settimane_studio 
  RENAME COLUMN activities TO activities_it;

-- Aggiungi colonne inglesi
ALTER TABLE settimane_studio 
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS activities_en TEXT;

-- ========================================
-- 4. COMMENTI PER DOCUMENTAZIONE
-- ========================================

COMMENT ON COLUMN corsi.title_it IS 'Titolo del corso in italiano';
COMMENT ON COLUMN corsi.title_en IS 'Titolo del corso in inglese';
COMMENT ON COLUMN corsi.description_it IS 'Descrizione del corso in italiano';
COMMENT ON COLUMN corsi.description_en IS 'Descrizione del corso in inglese';

COMMENT ON COLUMN eventi.title_it IS 'Titolo dell''evento in italiano';
COMMENT ON COLUMN eventi.title_en IS 'Titolo dell''evento in inglese';
COMMENT ON COLUMN eventi.description_it IS 'Descrizione dell''evento in italiano';
COMMENT ON COLUMN eventi.description_en IS 'Descrizione dell''evento in inglese';

COMMENT ON COLUMN settimane_studio.title_it IS 'Titolo della settimana studio in italiano';
COMMENT ON COLUMN settimane_studio.title_en IS 'Titolo della settimana studio in inglese';
COMMENT ON COLUMN settimane_studio.description_it IS 'Descrizione della settimana studio in italiano';
COMMENT ON COLUMN settimane_studio.description_en IS 'Descrizione della settimana studio in inglese';
COMMENT ON COLUMN settimane_studio.activities_it IS 'Attività incluse in italiano';
COMMENT ON COLUMN settimane_studio.activities_en IS 'Attività incluse in inglese';

-- ========================================
-- 5. VERIFICA MODIFICHE
-- ========================================

-- Puoi eseguire queste query per verificare le modifiche:

-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'corsi' 
-- ORDER BY ordinal_position;

-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'eventi' 
-- ORDER BY ordinal_position;

-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'settimane_studio' 
-- ORDER BY ordinal_position;

-- ========================================
-- NOTE IMPORTANTI
-- ========================================
-- 
-- 1. I dati esistenti saranno preservati nelle colonne _it
-- 2. Le colonne _en inizialmente saranno NULL
-- 3. Puoi popolare le colonne _en manualmente o tramite pannello admin
-- 4. Il pannello admin e il frontend dovranno essere aggiornati per usare le nuove colonne
-- 
-- ========================================


