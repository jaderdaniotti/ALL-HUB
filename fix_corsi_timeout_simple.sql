-- Script semplificato per risolvere il timeout della query corsi
-- Esegui questo script nel SQL Editor di Supabase

-- 1. Verifica la struttura della tabella corsi
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'corsi'
ORDER BY ordinal_position;

-- 2. Verifica i dati nella tabella corsi
SELECT 'Total corsi' as test, COUNT(*) as count FROM corsi;
SELECT 'Corsi attivi' as test, COUNT(*) as count FROM corsi WHERE is_active = true;
SELECT 'Corsi con created_at' as test, COUNT(*) as count FROM corsi WHERE created_at IS NOT NULL;

-- 3. Verifica valori NULL
SELECT 'is_active NULL' as check_type, COUNT(*) as count FROM corsi WHERE is_active IS NULL;
SELECT 'created_at NULL' as check_type, COUNT(*) as count FROM corsi WHERE created_at IS NULL;

-- 4. Test query semplificata (senza filtri)
SELECT 'Test query semplice' as test, COUNT(*) as count FROM corsi;

-- 5. Test query con solo is_active
SELECT 'Test con is_active' as test, COUNT(*) as count FROM corsi WHERE is_active = true;

-- 6. Test ORDER BY separato
SELECT 'Test ORDER BY' as test, id, title, created_at 
FROM corsi 
ORDER BY created_at DESC 
LIMIT 3;

-- 7. Aggiorna eventuali valori NULL
UPDATE corsi 
SET is_active = true 
WHERE is_active IS NULL;

UPDATE corsi 
SET created_at = NOW() 
WHERE created_at IS NULL;

-- 8. Test finale della query originale
SELECT 'Test query originale' as test, COUNT(*) as count 
FROM corsi 
WHERE is_active = true 
ORDER BY created_at DESC;

-- 9. Mostra alcuni corsi per debug
SELECT 'Sample corsi' as test, id, title, is_active, created_at 
FROM corsi 
ORDER BY created_at DESC 
LIMIT 5;
