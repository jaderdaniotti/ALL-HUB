-- Script per aggiornare la password dell'admin
-- Esegui questo script nel SQL Editor di Supabase

UPDATE users 
SET password_hash = '$2b$10$O6XdgnIpcd0D2ZYcnRIr..2riwQ7ywkdz8fLgOL8OIHMkSkNYB9mi'
WHERE email = 'secretariat.allhub@gmail.com';

-- Verifica l'aggiornamento
SELECT email, name, password_hash FROM users WHERE email = 'secretariat.allhub@gmail.com';

