-- Script per politiche RLS molto permissive
-- Admin crea i dati, tutti possono vederli
-- Eseguire questo script nel SQL Editor di Supabase

-- 1. Abilita RLS sulle tabelle
ALTER TABLE public.corsi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settimane_studio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Rimuovi TUTTE le politiche esistenti per evitare conflitti
DROP POLICY IF EXISTS "Public read access for corsi" ON public.corsi;
DROP POLICY IF EXISTS "Admin full access for corsi" ON public.corsi;
DROP POLICY IF EXISTS "Public read access for eventi" ON public.eventi;
DROP POLICY IF EXISTS "Admin full access for eventi" ON public.eventi;
DROP POLICY IF EXISTS "Public read access for settimane_studio" ON public.settimane_studio;
DROP POLICY IF EXISTS "Admin full access for settimane_studio" ON public.settimane_studio;
DROP POLICY IF EXISTS "Admin full access for users" ON public.users;

-- 3. POLITICHE MOLTO PERMISSIVE PER LETTURA PUBBLICA
-- Chiunque può leggere corsi attivi
CREATE POLICY "Anyone can read active courses"
ON public.corsi FOR SELECT
TO anon, authenticated, service_role
USING (is_active = true);

-- Chiunque può leggere tutti gli eventi
CREATE POLICY "Anyone can read all events"
ON public.eventi FOR SELECT
TO anon, authenticated, service_role
USING (true);

-- Chiunque può leggere tutte le settimane studio
CREATE POLICY "Anyone can read all study weeks"
ON public.settimane_studio FOR SELECT
TO anon, authenticated, service_role
USING (true);

-- 4. POLITICHE PERMISSIVE PER ADMIN (service_role)
-- Admin può fare tutto sui corsi
CREATE POLICY "Admin can do everything with courses"
ON public.corsi FOR ALL
TO service_role
USING (true) WITH CHECK (true);

-- Admin può fare tutto sugli eventi
CREATE POLICY "Admin can do everything with events"
ON public.eventi FOR ALL
TO service_role
USING (true) WITH CHECK (true);

-- Admin può fare tutto sulle settimane studio
CREATE POLICY "Admin can do everything with study weeks"
ON public.settimane_studio FOR ALL
TO service_role
USING (true) WITH CHECK (true);

-- Admin può fare tutto sugli utenti
CREATE POLICY "Admin can do everything with users"
ON public.users FOR ALL
TO service_role
USING (true) WITH CHECK (true);

-- 5. POLITICHE AGGIUNTIVE PER AUTENTICATI (se necessario)
-- Utenti autenticati possono leggere tutto
CREATE POLICY "Authenticated users can read courses"
ON public.corsi FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read events"
ON public.eventi FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can read study weeks"
ON public.settimane_studio FOR SELECT
TO authenticated
USING (true);

-- 6. Verifica finale delle politiche
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

-- 7. Test delle query pubbliche
SELECT 'Test corsi' as test, COUNT(*) as count FROM corsi WHERE is_active = true;
SELECT 'Test eventi' as test, COUNT(*) as count FROM eventi;
SELECT 'Test settimane' as test, COUNT(*) as count FROM settimane_studio;
