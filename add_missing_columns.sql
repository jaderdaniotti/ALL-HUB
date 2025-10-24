-- Script per aggiungere le colonne mancanti al database esistente
-- Eseguire questo script nel SQL Editor di Supabase per risolvere il timeout

-- Aggiungi colonne mancanti alla tabella corsi
ALTER TABLE corsi 
ADD COLUMN IF NOT EXISTS modality VARCHAR(100),
ADD COLUMN IF NOT EXISTS additional_notes TEXT;

-- Verifica che le colonne siano state aggiunte correttamente
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'corsi' 
AND column_name IN ('modality', 'additional_notes');

-- Test della query che causava il timeout
SELECT id, title, description, duration, level, type, modality, additional_notes, image_url, is_active, created_at, updated_at
FROM corsi 
WHERE is_active = true 
ORDER BY created_at DESC;
