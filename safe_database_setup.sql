-- Script sicuro per creare le tabelle mancanti
-- Questo script controlla se gli elementi esistono prima di crearli

-- 1. Verifica stato attuale delle tabelle
SELECT 'corsi' as table_name, COUNT(*) as count FROM corsi
UNION ALL
SELECT 'eventi', COUNT(*) FROM eventi
UNION ALL
SELECT 'settimane_studio', COUNT(*) FROM settimane_studio
UNION ALL
SELECT 'users', COUNT(*) FROM users;

-- 2. Crea tabella eventi solo se non esiste
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'eventi') THEN
        CREATE TABLE public.eventi (
          id uuid NOT NULL DEFAULT gen_random_uuid(),
          title character varying(255) NOT NULL,
          description text NOT NULL,
          date date NOT NULL,
          time time without time zone NOT NULL,
          location character varying(255) NOT NULL,
          category character varying(100) NOT NULL,
          image_url text NULL,
          is_active boolean NULL DEFAULT true,
          created_at timestamp with time zone NULL DEFAULT now(),
          updated_at timestamp with time zone NULL DEFAULT now(),
          CONSTRAINT eventi_pkey PRIMARY KEY (id),
          CONSTRAINT eventi_category_check CHECK (
            (category)::text = ANY (
              (ARRAY[
                'Lingue'::character varying,
                'Cultura'::character varying,
                'Benessere'::character varying
              ])::text[]
            )
          )
        ) TABLESPACE pg_default;
        
        -- Crea indici solo se non esistono
        CREATE INDEX IF NOT EXISTS idx_eventi_date ON public.eventi USING btree (date) TABLESPACE pg_default;
        CREATE INDEX IF NOT EXISTS idx_eventi_active ON public.eventi USING btree (is_active) TABLESPACE pg_default;
        CREATE INDEX IF NOT EXISTS idx_eventi_category ON public.eventi USING btree (category) TABLESPACE pg_default;
        
        -- Crea trigger solo se non esiste
        IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_eventi_updated_at') THEN
            CREATE TRIGGER update_eventi_updated_at BEFORE UPDATE ON eventi 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        END IF;
        
        RAISE NOTICE 'Tabella eventi creata con successo';
    ELSE
        RAISE NOTICE 'Tabella eventi esiste già';
    END IF;
END $$;

-- 3. Crea tabella settimane_studio solo se non esiste
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'settimane_studio') THEN
        CREATE TABLE public.settimane_studio (
          id uuid NOT NULL DEFAULT gen_random_uuid(),
          title character varying(255) NOT NULL,
          description text NOT NULL,
          duration character varying(100) NOT NULL,
          type character varying(50) NOT NULL,
          city character varying(100) NOT NULL,
          activities text NOT NULL,
          image_url text NULL,
          is_active boolean NULL DEFAULT true,
          created_at timestamp with time zone NULL DEFAULT now(),
          updated_at timestamp with time zone NULL DEFAULT now(),
          CONSTRAINT settimane_studio_pkey PRIMARY KEY (id),
          CONSTRAINT settimane_studio_type_check CHECK (
            (type)::text = ANY (
              (ARRAY[
                'Intensiva'::character varying,
                'Culturale'::character varying,
                'Mista'::character varying
              ])::text[]
            )
          )
        ) TABLESPACE pg_default;
        
        -- Crea indici solo se non esistono
        CREATE INDEX IF NOT EXISTS idx_settimane_active ON public.settimane_studio USING btree (is_active) TABLESPACE pg_default;
        CREATE INDEX IF NOT EXISTS idx_settimane_type ON public.settimane_studio USING btree (type) TABLESPACE pg_default;
        CREATE INDEX IF NOT EXISTS idx_settimane_city ON public.settimane_studio USING btree (city) TABLESPACE pg_default;
        
        -- Crea trigger solo se non esiste
        IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_settimane_updated_at') THEN
            CREATE TRIGGER update_settimane_updated_at BEFORE UPDATE ON settimane_studio 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        END IF;
        
        RAISE NOTICE 'Tabella settimane_studio creata con successo';
    ELSE
        RAISE NOTICE 'Tabella settimane_studio esiste già';
    END IF;
END $$;

-- 4. Crea tabella users solo se non esiste
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') THEN
        CREATE TABLE public.users (
          id uuid NOT NULL DEFAULT gen_random_uuid(),
          name character varying(255) NOT NULL,
          email character varying(255) NOT NULL,
          password_hash character varying(255) NOT NULL,
          is_admin boolean NULL DEFAULT true,
          created_at timestamp with time zone NULL DEFAULT now(),
          updated_at timestamp with time zone NULL DEFAULT now(),
          CONSTRAINT users_pkey PRIMARY KEY (id),
          CONSTRAINT users_email_key UNIQUE (email)
        ) TABLESPACE pg_default;
        
        -- Crea indici solo se non esistono
        CREATE INDEX IF NOT EXISTS idx_users_email ON public.users USING btree (email) TABLESPACE pg_default;
        CREATE INDEX IF NOT EXISTS idx_users_admin ON public.users USING btree (is_admin) TABLESPACE pg_default;
        
        -- Crea trigger solo se non esiste
        IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'update_users_updated_at') THEN
            CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        END IF;
        
        RAISE NOTICE 'Tabella users creata con successo';
    ELSE
        RAISE NOTICE 'Tabella users esiste già';
    END IF;
END $$;

-- 5. Inserisci dati di test se le tabelle sono vuote
INSERT INTO corsi (title, description, duration, level, type, modality, additional_notes) VALUES
('Inglese Base', 'Corso di inglese per principianti', '10 lezioni', 'Principiante', 'Gruppo', 'Presenza', 'Materiale incluso'),
('Francese Intermedio', 'Perfezionamento francese', '8 lezioni', 'Intermedio', 'Individuale', 'Online', 'Lezioni personalizzate'),
('Spagnolo Avanzato', 'Conversazione avanzata', '12 lezioni', 'Avanzato', 'Gruppo', 'Presenza', 'Certificazione finale')
ON CONFLICT DO NOTHING;

INSERT INTO eventi (title, description, date, time, location, category) VALUES
('Conversazione Inglese', 'Gruppo di conversazione libera', '2025-02-15', '18:00', 'Sede principale', 'Lingue'),
('Workshop Cultura Francese', 'Scopri la cultura francese', '2025-02-20', '19:30', 'Aula magna', 'Cultura'),
('Yoga in Inglese', 'Pratica yoga parlando inglese', '2025-02-25', '17:00', 'Sala relax', 'Benessere')
ON CONFLICT DO NOTHING;

INSERT INTO settimane_studio (title, description, duration, type, city, activities) VALUES
('Settimana Londra', 'Immersione totale in inglese', '5 giorni', 'Intensiva', 'Londra', 'Lezioni, musei, teatro'),
('Settimana Parigi', 'Cultura e lingua francese', '1 settimana', 'Culturale', 'Parigi', 'Arte, cucina, storia'),
('Settimana Madrid', 'Spagnolo e cultura', '5 giorni', 'Mista', 'Madrid', 'Lezioni, flamenco, tapas')
ON CONFLICT DO NOTHING;

INSERT INTO users (name, email, password_hash, is_admin) VALUES
('Admin Secretariat', 'secretariat.allhub@gmail.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', true)
ON CONFLICT (email) DO NOTHING;

-- 6. Verifica finale
SELECT 'corsi' as table_name, COUNT(*) as count FROM corsi
UNION ALL
SELECT 'eventi', COUNT(*) FROM eventi
UNION ALL
SELECT 'settimane_studio', COUNT(*) FROM settimane_studio
UNION ALL
SELECT 'users', COUNT(*) FROM users;
