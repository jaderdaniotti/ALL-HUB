-- Script per diagnosticare e risolvere il problema Supabase
-- Esegui questo script nel SQL Editor di Supabase

-- 1. Verifica se RLS è abilitato sulle tabelle
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users');

-- 2. Verifica le politiche RLS esistenti
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users');

-- 3. Disabilita RLS temporaneamente per test (SOLO PER TEST!)
-- ATTENZIONE: Questo rende le tabelle pubbliche!
ALTER TABLE corsi DISABLE ROW LEVEL SECURITY;
ALTER TABLE eventi DISABLE ROW LEVEL SECURITY;
ALTER TABLE settimane_studio DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- 4. Test delle query che causano errore 500
SELECT 'corsi' as table_name, COUNT(*) as count FROM corsi WHERE is_active = true;
SELECT 'eventi' as table_name, COUNT(*) as count FROM eventi;
SELECT 'settimane_studio' as table_name, COUNT(*) as count FROM settimane_studio;

-- 5. Se le query funzionano, riabilita RLS e crea politiche corrette
ALTER TABLE corsi ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventi ENABLE ROW LEVEL SECURITY;
ALTER TABLE settimane_studio ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 6. Crea politiche per accesso pubblico alle tabelle principali
CREATE POLICY "Public read access for corsi" ON corsi
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for eventi" ON eventi
    FOR SELECT USING (true);

CREATE POLICY "Public read access for settimane_studio" ON settimane_studio
    FOR SELECT USING (true);

-- 7. Crea politiche per admin (se necessario)
CREATE POLICY "Admin full access for corsi" ON corsi
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin full access for eventi" ON eventi
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin full access for settimane_studio" ON settimane_studio
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin full access for users" ON users
    FOR ALL USING (auth.role() = 'service_role');

-- 8. Verifica finale delle politiche
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users')
ORDER BY tablename, policyname;
