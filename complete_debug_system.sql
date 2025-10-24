-- Script di debug completo per identificare tutti i problemi
-- Esegui questo script nel SQL Editor di Supabase

-- 1. VERIFICA COMPLETA DELLO STATO DEL DATABASE
SELECT '=== VERIFICA STATO DATABASE ===' as section;

-- Verifica RLS
SELECT 
    'RLS Status' as check_type,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users')
ORDER BY tablename;

-- Verifica politiche
SELECT 
    'RLS Policies' as check_type,
    schemaname,
    tablename,
    policyname,
    roles,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users')
ORDER BY tablename, policyname;

-- 2. VERIFICA STRUTTURA TABELLE
SELECT '=== STRUTTURA TABELLE ===' as section;

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

-- 3. VERIFICA DATI ESISTENTI
SELECT '=== DATI ESISTENTI ===' as section;

SELECT 'corsi' as table_name, COUNT(*) as total_count, 
       COUNT(CASE WHEN is_active = true THEN 1 END) as active_count
FROM corsi
UNION ALL
SELECT 'eventi', COUNT(*), COUNT(CASE WHEN is_active = true THEN 1 END)
FROM eventi
UNION ALL
SELECT 'settimane_studio', COUNT(*), COUNT(CASE WHEN is_active = true THEN 1 END)
FROM settimane_studio
UNION ALL
SELECT 'users', COUNT(*), COUNT(CASE WHEN is_admin = true THEN 1 END)
FROM users;

-- 4. TEST QUERY SPECIFICHE CHE CAUSANO ERRORE 500
SELECT '=== TEST QUERY SPECIFICHE ===' as section;

-- Query che causa errore nella pagina pubblica
SELECT 'Test corsi pubblici' as test_name, COUNT(*) as count 
FROM corsi WHERE is_active = true;

-- Query che causa errore nel dashboard admin
SELECT 'Test corsi admin' as test_name, COUNT(*) as count 
FROM corsi;

-- Query eventi
SELECT 'Test eventi' as test_name, COUNT(*) as count 
FROM eventi;

-- Query settimane studio
SELECT 'Test settimane' as test_name, COUNT(*) as count 
FROM settimane_studio;

-- 5. VERIFICA CONSTRAINT E TRIGGER
SELECT '=== CONSTRAINT E TRIGGER ===' as section;

-- Constraint
SELECT 
    table_name,
    constraint_name,
    constraint_type
FROM information_schema.table_constraints 
WHERE table_schema = 'public' 
AND table_name IN ('corsi', 'eventi', 'settimane_studio', 'users')
ORDER BY table_name, constraint_name;

-- Trigger
SELECT 
    trigger_name,
    event_object_table,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE event_object_schema = 'public' 
AND event_object_table IN ('corsi', 'eventi', 'settimane_studio', 'users')
ORDER BY event_object_table, trigger_name;

-- 6. INSERISCI DATI DI TEST SE NECESSARIO
SELECT '=== INSERIMENTO DATI DI TEST ===' as section;

-- Inserisci dati di test per corsi
INSERT INTO corsi (title, description, duration, level, type, modality, additional_notes) VALUES
('Corso di Inglese Base', 'Impara le basi dell''inglese con metodi moderni', '10 lezioni', 'Principiante', 'Gruppo', 'Presenza', 'Materiale incluso'),
('Corso di Francese Intermedio', 'Perfeziona il tuo francese con conversazione', '8 lezioni', 'Intermedio', 'Individuale', 'Online', 'Lezioni personalizzate'),
('Corso di Spagnolo Avanzato', 'Conversazione avanzata e cultura spagnola', '12 lezioni', 'Avanzato', 'Gruppo', 'Presenza', 'Certificazione finale')
ON CONFLICT DO NOTHING;

-- Inserisci dati di test per eventi
INSERT INTO eventi (title, description, date, time, location, category) VALUES
('Conversazione Inglese', 'Gruppo di conversazione libera in inglese', '2025-02-15', '18:00', 'Sede principale', 'Lingue'),
('Workshop Cultura Francese', 'Scopri la cultura francese attraverso arte e storia', '2025-02-20', '19:30', 'Aula magna', 'Cultura'),
('Yoga in Inglese', 'Pratica yoga parlando inglese', '2025-02-25', '17:00', 'Sala relax', 'Benessere')
ON CONFLICT DO NOTHING;

-- Inserisci dati di test per settimane studio
INSERT INTO settimane_studio (title, description, duration, type, city, activities) VALUES
('Settimana Londra', 'Immersione totale in inglese nella capitale britannica', '5 giorni', 'Intensiva', 'Londra', 'Lezioni, musei, teatro'),
('Settimana Parigi', 'Cultura e lingua francese nella città della luce', '1 settimana', 'Culturale', 'Parigi', 'Arte, cucina, storia'),
('Settimana Madrid', 'Spagnolo e cultura nella capitale spagnola', '5 giorni', 'Mista', 'Madrid', 'Lezioni, flamenco, tapas')
ON CONFLICT DO NOTHING;

-- 7. VERIFICA FINALE
SELECT '=== VERIFICA FINALE ===' as section;

SELECT 'corsi' as table_name, COUNT(*) as count FROM corsi WHERE is_active = true
UNION ALL
SELECT 'eventi', COUNT(*) FROM eventi
UNION ALL
SELECT 'settimane_studio', COUNT(*) FROM settimane_studio
UNION ALL
SELECT 'users', COUNT(*) FROM users;
