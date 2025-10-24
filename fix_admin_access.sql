-- Script per risolvere l'accesso admin al dashboard
-- La pagina pubblica funziona, ma l'admin non vede i dati
-- Eseguire questo script nel SQL Editor di Supabase

-- 1. Verifica le politiche attuali
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users')
ORDER BY tablename, policyname;

-- 2. Rimuovi tutte le politiche esistenti per ricrearle correttamente
DROP POLICY IF EXISTS "Anyone can read active courses" ON public.corsi;
DROP POLICY IF EXISTS "Admin can do everything with courses" ON public.corsi;
DROP POLICY IF EXISTS "Authenticated users can read courses" ON public.corsi;
DROP POLICY IF EXISTS "Anyone can read all events" ON public.eventi;
DROP POLICY IF EXISTS "Admin can do everything with events" ON public.eventi;
DROP POLICY IF EXISTS "Authenticated users can read events" ON public.eventi;
DROP POLICY IF EXISTS "Anyone can read all study weeks" ON public.settimane_studio;
DROP POLICY IF EXISTS "Admin can do everything with study weeks" ON public.settimane_studio;
DROP POLICY IF EXISTS "Authenticated users can read study weeks" ON public.settimane_studio;
DROP POLICY IF EXISTS "Admin can do everything with users" ON public.users;

-- 3. POLITICHE PER ACCESSO PUBBLICO (anon)
-- Solo lettura per utenti anonimi
CREATE POLICY "Anonymous can read active courses"
ON public.corsi FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "Anonymous can read all events"
ON public.eventi FOR SELECT
TO anon
USING (true);

CREATE POLICY "Anonymous can read all study weeks"
ON public.settimane_studio FOR SELECT
TO anon
USING (true);

-- 4. POLITICHE PER ADMIN (authenticated e service_role)
-- Admin può fare tutto sui corsi
CREATE POLICY "Admin full access to courses"
ON public.corsi FOR ALL
TO authenticated, service_role
USING (true) WITH CHECK (true);

-- Admin può fare tutto sugli eventi
CREATE POLICY "Admin full access to events"
ON public.eventi FOR ALL
TO authenticated, service_role
USING (true) WITH CHECK (true);

-- Admin può fare tutto sulle settimane studio
CREATE POLICY "Admin full access to study weeks"
ON public.settimane_studio FOR ALL
TO authenticated, service_role
USING (true) WITH CHECK (true);

-- Admin può fare tutto sugli utenti
CREATE POLICY "Admin full access to users"
ON public.users FOR ALL
TO authenticated, service_role
USING (true) WITH CHECK (true);

-- 5. Verifica finale delle politiche
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('corsi', 'eventi', 'settimane_studio', 'users')
ORDER BY tablename, policyname;

-- 6. Test delle query per verificare l'accesso
-- Queste query dovrebbero funzionare per tutti i ruoli
SELECT 'Test corsi pubblici' as test, COUNT(*) as count FROM corsi WHERE is_active = true;
SELECT 'Test eventi pubblici' as test, COUNT(*) as count FROM eventi;
SELECT 'Test settimane pubbliche' as test, COUNT(*) as count FROM settimane_studio;

-- 7. Test per admin (dovrebbe vedere tutto)
SELECT 'Test corsi admin' as test, COUNT(*) as count FROM corsi;
SELECT 'Test eventi admin' as test, COUNT(*) as count FROM eventi;
SELECT 'Test settimane admin' as test, COUNT(*) as count FROM settimane_studio;
SELECT 'Test users admin' as test, COUNT(*) as count FROM users;
