# Supabase Setup Guide per A LIFELONG LEARNING HUB

## 1. Installazione Dipendenze

```bash
npm install @supabase/supabase-js
```

## 2. Configurazione Environment

1. Copia il file `env.example` e rinominalo in `.env.local`
2. Vai su https://supabase.com/dashboard
3. Crea un nuovo progetto o seleziona un progetto esistente
4. Vai su Settings > API
5. Copia i valori necessari nel file `.env.local`

## 3. Variabili Environment Richieste

### Obbligatorie:
- `VITE_SUPABASE_URL`: URL del tuo progetto Supabase
- `VITE_SUPABASE_ANON_KEY`: Chiave pubblica (anon key)

### Opzionali:
- `SUPABASE_SERVICE_ROLE_KEY`: Per operazioni server-side (NON esporre nel frontend)
- `VITE_DATABASE_URL`: URL di connessione diretta al database
- `VITE_STORAGE_BUCKET`: Nome del bucket per file storage
- `VITE_AUTH_REDIRECT_URL`: URL di redirect per autenticazione

## 4. Struttura Database Consigliata

### Tabella: activities
```sql
CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL, -- 'corso', 'evento', 'settimana_studio'
  image_url TEXT,
  duration VARCHAR(100),
  level VARCHAR(50),
  category VARCHAR(100),
  date DATE,
  time TIME,
  location VARCHAR(255),
  activities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabella: admin_users
```sql
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 5. Storage Bucket

Crea un bucket chiamato `activity-images` per le immagini delle attività.

## 6. Row Level Security (RLS)

Abilita RLS sulle tabelle e configura le policy appropriate per la sicurezza.

## 7. Esempio di Utilizzo nel Codice

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

## 8. Note di Sicurezza

- Non committare mai il file `.env.local`
- Usa sempre le chiavi pubbliche nel frontend
- Le chiavi di servizio devono essere usate solo server-side
- Abilita sempre RLS per proteggere i dati
