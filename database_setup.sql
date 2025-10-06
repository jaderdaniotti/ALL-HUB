-- Database Setup Script per A LIFELONG LEARNING HUB
-- Supabase PostgreSQL
-- Eseguire questo script nel SQL Editor di Supabase

-- ==============================================
-- 1. CREAZIONE TABELLE
-- ==============================================

-- Tabella Users (Amministratori)
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella Corsi
CREATE TABLE IF NOT EXISTS corsi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL CHECK (level IN ('Principiante', 'Intermedio', 'Avanzato')),
    type VARCHAR(50) NOT NULL CHECK (type IN ('Individuale', 'Gruppo')),
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella Eventi
CREATE TABLE IF NOT EXISTS eventi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL CHECK (category IN ('Lingue', 'Cultura', 'Benessere')),
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella SettimaneStudio
CREATE TABLE IF NOT EXISTS settimane_studio (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Intensiva', 'Culturale', 'Mista')),
    city VARCHAR(100) NOT NULL,
    activities TEXT NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- 2. CREAZIONE INDICI PER PERFORMANCE
-- ==============================================

-- Indici per Users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_admin ON users(is_admin);

-- Indici per Corsi
CREATE INDEX IF NOT EXISTS idx_corsi_active ON corsi(is_active);
CREATE INDEX IF NOT EXISTS idx_corsi_level ON corsi(level);
CREATE INDEX IF NOT EXISTS idx_corsi_type ON corsi(type);

-- Indici per Eventi
CREATE INDEX IF NOT EXISTS idx_eventi_date ON eventi(date);
CREATE INDEX IF NOT EXISTS idx_eventi_active ON eventi(is_active);
CREATE INDEX IF NOT EXISTS idx_eventi_category ON eventi(category);

-- Indici per SettimaneStudio
CREATE INDEX IF NOT EXISTS idx_settimane_active ON settimane_studio(is_active);
CREATE INDEX IF NOT EXISTS idx_settimane_type ON settimane_studio(type);
CREATE INDEX IF NOT EXISTS idx_settimane_city ON settimane_studio(city);

-- ==============================================
-- 3. FUNZIONI PER TIMESTAMPS AUTOMATICI
-- ==============================================

-- Funzione per aggiornare updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger per aggiornare updated_at automaticamente
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_corsi_updated_at BEFORE UPDATE ON corsi
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_eventi_updated_at BEFORE UPDATE ON eventi
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settimane_updated_at BEFORE UPDATE ON settimane_studio
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- 4. INSERIMENTO DATI INIZIALI
-- ==============================================

-- Admin di default (password: Learning25! - hash bcrypt)
INSERT INTO users (name, email, password_hash, is_admin) 
VALUES (
    'Admin Secretariat', 
    'secretariat.allhub@gmail.com', 
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Hash per 'Learning25!'
    true
) ON CONFLICT (email) DO NOTHING;

-- Corsi di esempio
INSERT INTO corsi (title, description, duration, level, type) VALUES
('Inglese Base', 'Corso di inglese per principianti', '10 lezioni', 'Principiante', 'Gruppo'),
('Francese Intermedio', 'Perfezionamento francese', '8 lezioni', 'Intermedio', 'Individuale'),
('Spagnolo Avanzato', 'Conversazione avanzata', '12 lezioni', 'Avanzato', 'Gruppo')
ON CONFLICT DO NOTHING;

-- Eventi di esempio
INSERT INTO eventi (title, description, date, time, location, category) VALUES
('Conversazione Inglese', 'Gruppo di conversazione libera', '2025-02-15', '18:00', 'Sede principale', 'Lingue'),
('Workshop Cultura Francese', 'Scopri la cultura francese', '2025-02-20', '19:30', 'Aula magna', 'Cultura'),
('Yoga in Inglese', 'Pratica yoga parlando inglese', '2025-02-25', '17:00', 'Sala relax', 'Benessere')
ON CONFLICT DO NOTHING;

-- Settimane Studio di esempio
INSERT INTO settimane_studio (title, description, duration, type, city, activities) VALUES
('Settimana Londra', 'Immersione totale in inglese', '5 giorni', 'Intensiva', 'Londra', 'Lezioni, musei, teatro'),
('Settimana Parigi', 'Cultura e lingua francese', '1 settimana', 'Culturale', 'Parigi', 'Arte, cucina, storia'),
('Settimana Madrid', 'Spagnolo e cultura', '5 giorni', 'Mista', 'Madrid', 'Lezioni, flamenco, tapas')
ON CONFLICT DO NOTHING;

-- ==============================================
-- 5. CREAZIONE STORAGE BUCKET
-- ==============================================

-- Creazione bucket per le immagini (eseguire nel Storage di Supabase)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('activity-images', 'activity-images', true);

-- ==============================================
-- 6. VERIFICA SETUP
-- ==============================================

-- Query per verificare che tutto sia stato creato correttamente
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Corsi', COUNT(*) FROM corsi
UNION ALL
SELECT 'Eventi', COUNT(*) FROM eventi
UNION ALL
SELECT 'Settimane Studio', COUNT(*) FROM settimane_studio;

-- ==============================================
-- NOTE IMPORTANTI
-- ==============================================

/*
1. Eseguire questo script nel SQL Editor di Supabase
2. Creare manualmente il bucket 'activity-images' in Storage
3. Configurare le policies RLS dopo aver testato il setup
4. Aggiornare le variabili environment nel file .env.local
5. Testare le connessioni dal frontend

Per abilitare RLS:
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE corsi ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventi ENABLE ROW LEVEL SECURITY;
ALTER TABLE settimane_studio ENABLE ROW LEVEL SECURITY;
*/
