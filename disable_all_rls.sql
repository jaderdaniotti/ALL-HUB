-- Script per eliminare TUTTE le politiche RLS
-- Soluzione semplice: nessuna restrizione, accesso completo per tutti
-- Eseguire questo script nel SQL Editor di Supabase

-- 1. Verifica le politiche attuali prima di eliminarle
SELECT 
    schemaname,
    tablename,
    policyname,
    roles,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users')
ORDER BY tablename, policyname;

-- 2. DISABILITA COMPLETAMENTE RLS su tutte le tabelle
-- Questo elimina automaticamente tutte le politiche
ALTER TABLE public.corsi DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventi DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settimane_studio DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- 3. Verifica che RLS sia disabilitato
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users');

-- 4. Verifica che non ci siano più politiche
SELECT 
    schemaname,
    tablename,
    policyname
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users');

-- 5. Test delle query per verificare che tutto funzioni
SELECT 'Test corsi' as test, COUNT(*) as count FROM corsi WHERE is_active = true;
SELECT 'Test eventi' as test, COUNT(*) as count FROM eventi;
SELECT 'Test settimane' as test, COUNT(*) as count FROM settimane_studio;
SELECT 'Test users' as test, COUNT(*) as count FROM users;

-- 6. Test di inserimento (opzionale - per verificare che anche le operazioni di scrittura funzionino)
-- INSERT INTO corsi (title, description, duration, level, type, modality, additional_notes) 
-- VALUES ('Test Course', 'Test Description', '1 ora', 'Principiante', 'Individuale', 'Online', 'Test Notes');

-- 7. Messaggio di conferma
SELECT 'SUCCESS: RLS completamente disabilitato!' as status;
