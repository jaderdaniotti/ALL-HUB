-- Script per aggiungere immagini di esempio ai corsi esistenti
-- Esegui questo script nel SQL Editor di Supabase

-- Aggiorna i corsi con immagini di esempio
UPDATE corsi 
SET image_url = 'src/assets/img/corsi/WhatsApp Image 2025-10-06 at 12.45.58.jpeg'
WHERE title = 'Inglese Base';

UPDATE corsi 
SET image_url = 'src/assets/img/corsi/WhatsApp Image 2025-10-06 at 12.52.19.jpeg'
WHERE title = 'Francese Intermedio';

UPDATE corsi 
SET image_url = 'src/assets/img/corsi/WhatsApp Image 2025-10-06 at 13.05.22.jpeg'
WHERE title = 'Spagnolo Avanzato';

-- Verifica gli aggiornamenti
SELECT id, title, image_url FROM corsi WHERE image_url IS NOT NULL;

