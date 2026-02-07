-- ========================================
-- SETUP SUPABASE STORAGE PER IMMAGINI
-- ========================================
-- Obiettivo: spostare immagini da base64 in colonne a Supabase Storage
-- Benefici: -80-90% dimensione record, CDN automatico, caching

-- ========================================
-- CREA BUCKET IMMAGINI
-- ========================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,  -- pubblico in lettura
  5242880,  -- 5MB max
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO NOTHING;

-- ========================================
-- POLICY: LETTURA PUBBLICA
-- ========================================
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- ========================================
-- POLICY: ADMIN UPLOAD/UPDATE/DELETE
-- ========================================
-- Nota: in produzione, limitare solo a utenti admin autenticati
-- Per ora, permetti a tutti (da restringere poi)

CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' );

CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'images' );

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'images' );

-- ========================================
-- VERIFICA
-- ========================================
-- Verifica che il bucket sia stato creato:
-- SELECT * FROM storage.buckets WHERE id = 'images';

-- Verifica le policy:
-- SELECT * FROM pg_policies WHERE tablename = 'objects';

