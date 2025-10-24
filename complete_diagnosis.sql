-- Script per diagnosticare completamente il problema 500
-- Eseguire questo script nel SQL Editor di Supabase

-- 1. Verifica che RLS sia effettivamente disabilitato
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users');

-- 2. Verifica che non ci siano politiche RLS
SELECT 
    schemaname,
    tablename,
    policyname
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users');

-- 3. Verifica la struttura delle tabelle
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('corsi', 'eventi', 'settimane_studio', 'users')
ORDER BY table_name, ordinal_position;

-- 4. Verifica se ci sono dati nelle tabelle
SELECT 'corsi' as table_name, COUNT(*) as count FROM corsi;
SELECT 'eventi' as table_name, COUNT(*) as count FROM eventi;
SELECT 'settimane_studio' as table_name, COUNT(*) as count FROM settimane_studio;
SELECT 'users' as table_name, COUNT(*) as count FROM users;

-- 5. Test della query specifica che causa errore 500
-- Questa è la query esatta che fa il dashboard admin
SELECT * FROM corsi WHERE is_active = true ORDER BY created_at DESC;

-- 6. Verifica se ci sono trigger o funzioni che potrebbero causare problemi
SELECT 
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE event_object_schema = 'public' 
AND event_object_table IN ('corsi', 'eventi', 'settimane_studio', 'users');

-- 7. Verifica se ci sono constraint che potrebbero causare problemi
SELECT 
    table_name,
    constraint_name,
    constraint_type
FROM information_schema.table_constraints 
WHERE table_schema = 'public' 
AND table_name IN ('corsi', 'eventi', 'settimane_studio', 'users');

-- 8. Test di inserimento di dati di test se le tabelle sono vuote
INSERT INTO corsi (title, description, duration, level, type, modality, additional_notes) VALUES
('Test Course', 'Test Description', '1 ora', 'Principiante', 'Individuale', 'Online', 'Test Notes')
ON CONFLICT DO NOTHING;

INSERT INTO eventi (title, description, date, time, location, category) VALUES
('Test Event', 'Test Description', '2025-02-15', '18:00', 'Test Location', 'Lingue')
ON CONFLICT DO NOTHING;

INSERT INTO settimane_studio (title, description, duration, type, city, activities) VALUES
('Test Study Week', 'Test Description', '5 giorni', 'Intensiva', 'Test City', 'Test Activities')
ON CONFLICT DO NOTHING;

-- 9. Verifica finale
SELECT 'Final test - corsi' as test, COUNT(*) as count FROM corsi WHERE is_active = true;
SELECT 'Final test - eventi' as test, COUNT(*) as count FROM eventi;
SELECT 'Final test - settimane' as test, COUNT(*) as count FROM settimane_studio;
