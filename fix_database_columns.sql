-- Script per risolvere l'errore 500 nella pagina /attivita
-- Eseguire questo script nel SQL Editor di Supabase

-- 1. Aggiungi le colonne mancanti alla tabella corsi
ALTER TABLE corsi 
ADD COLUMN IF NOT EXISTS modality VARCHAR(100),
ADD COLUMN IF NOT EXISTS additional_notes TEXT;

-- 2. Verifica che le colonne siano state aggiunte
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'corsi' 
ORDER BY ordinal_position;

-- 3. Test della query che causava l'errore 500
SELECT id, title, description, duration, level, type, modality, additional_notes, image_url, is_active, created_at, updated_at
FROM corsi 
WHERE is_active = true 
ORDER BY created_at DESC
LIMIT 5;

-- 4. Inserisci alcuni dati di test se la tabella è vuota
INSERT INTO corsi (title, description, duration, level, type, modality, additional_notes) VALUES
('Inglese Base', 'Corso di inglese per principianti', '10 lezioni', 'Principiante', 'Gruppo', 'Presenza', 'Materiale incluso'),
('Francese Intermedio', 'Perfezionamento francese', '8 lezioni', 'Intermedio', 'Individuale', 'Online', 'Lezioni personalizzate'),
('Spagnolo Avanzato', 'Conversazione avanzata', '12 lezioni', 'Avanzato', 'Gruppo', 'Presenza', 'Certificazione finale')
ON CONFLICT DO NOTHING;

-- 5. Verifica finale
SELECT COUNT(*) as total_corsi FROM corsi WHERE is_active = true;
