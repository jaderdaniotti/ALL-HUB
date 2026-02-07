# Database Structure - A LIFELONG LEARNING HUB

## Overview
Questo documento descrive la struttura del database per il progetto A LIFELONG LEARNING HUB, progettato per Supabase PostgreSQL.

## Tabelle Principali

### 1. Users (Amministratori)
Tabella per gestire i profili degli amministratori del sistema.

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| `id` | UUID | Chiave primaria (auto-generata) |
| `name` | VARCHAR(255) | Nome completo dell'admin |
| `email` | VARCHAR(255) | Email univoca dell'admin |
| `password_hash` | VARCHAR(255) | Hash della password |
| `is_admin` | BOOLEAN | Flag admin (sempre true per ora) |
| `created_at` | TIMESTAMP | Data di creazione |
| `updated_at` | TIMESTAMP | Data ultimo aggiornamento |

### 2. Corsi
Tabella per gestire i corsi di lingua offerti.

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| `id` | UUID | Chiave primaria (auto-generata) |
| `title` | VARCHAR(255) | Titolo del corso |
| `description` | TEXT | Descrizione dettagliata |
| `duration` | VARCHAR(100) | Durata del corso (es. "1 ora", "10 lezioni") |
| `level` | VARCHAR(50) | Livello (Principiante, Intermedio, Avanzato) |
| `type` | VARCHAR(50) | Tipo (Individuale, Gruppo) |
| `image_url` | TEXT | URL dell'immagine del corso |
| `is_active` | BOOLEAN | Corso attivo/disattivo |
| `created_at` | TIMESTAMP | Data di creazione |
| `updated_at` | TIMESTAMP | Data ultimo aggiornamento |
| `modality` | VARCHAR(100) | Modalità del corso (es. "Online", "Presenza") |
| `additional_notes` | TEXT | Note aggiuntive sul corso |

### 3. Eventi
Tabella per gestire gli eventi e workshop.

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| `id` | UUID | Chiave primaria (auto-generata) |
| `title` | VARCHAR(255) | Titolo dell'evento |
| `description` | TEXT | Descrizione dettagliata |
| `date` | DATE | Data dell'evento |
| `time` | TIME | Orario dell'evento |
| `location` | VARCHAR(255) | Luogo dell'evento |
| `category` | VARCHAR(100) | Categoria (Lingue, Cultura, Benessere) |
| `image_url` | TEXT | URL dell'immagine dell'evento |
| `is_active` | BOOLEAN | Evento attivo/disattivo |
| `created_at` | TIMESTAMP | Data di creazione |
| `updated_at` | TIMESTAMP | Data ultimo aggiornamento |

### 4. SettimaneStudio
Tabella per gestire le Skill Up Camps internazionali.

| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| `id` | UUID | Chiave primaria (auto-generata) |
| `title` | VARCHAR(255) | Titolo della settimana |
| `description` | TEXT | Descrizione dettagliata |
| `duration` | VARCHAR(100) | Durata (es. "5 giorni", "1 settimana") |
| `type` | VARCHAR(50) | Tipo (Intensiva, Culturale, Mista) |
| `city` | VARCHAR(100) | Città di destinazione |
| `activities` | TEXT | Attività incluse |
| `image_url` | TEXT | URL dell'immagine della settimana |
| `is_active` | BOOLEAN | Settimana attiva/disattiva |
| `created_at` | TIMESTAMP | Data di creazione |
| `updated_at` | TIMESTAMP | Data ultimo aggiornamento |

## Relazioni

- **Users** → **Corsi**: Un admin può creare più corsi
- **Users** → **Eventi**: Un admin può creare più eventi  
- **Users** → **SettimaneStudio**: Un admin può creare più Skill Up Camps

## Indici Consigliati

```sql
-- Indici per performance
CREATE INDEX idx_corsi_active ON corsi(is_active);
CREATE INDEX idx_eventi_date ON eventi(date);
CREATE INDEX idx_eventi_active ON eventi(is_active);
CREATE INDEX idx_settimane_active ON settimane_studio(is_active);
CREATE INDEX idx_users_email ON users(email);
```

## Storage Buckets

### activity-images
Bucket per le immagini delle attività:
- **Corsi**: `/corsi/{course_id}/image.jpg`
- **Eventi**: `/eventi/{event_id}/image.jpg`  
- **Skill Up Camps**: `/settimane/{week_id}/image.jpg`

## Sicurezza

### Row Level Security (RLS)
- **Users**: Solo admin autenticati possono modificare
- **Corsi/Eventi/SettimaneStudio**: Solo admin possono CRUD, tutti possono leggere

### Policies (da implementare)
```sql
-- Policy per lettura pubblica
CREATE POLICY "Public read access" ON corsi FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON eventi FOR SELECT USING (is_active = true);
CREATE POLICY "Public read access" ON settimane_studio FOR SELECT USING (is_active = true);

-- Policy per admin
CREATE POLICY "Admin full access" ON corsi FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admin full access" ON eventi FOR ALL USING (auth.role() = 'admin');
CREATE POLICY "Admin full access" ON settimane_studio FOR ALL USING (auth.role() = 'admin');
```

## Credenziali Admin Default

- **Email**: `secretariat.allhub@gmail.com`
- **Password**: `Learning25!`
- **Nome**: Admin Secretariat

## Note per lo Sviluppo

1. **UUID**: Tutte le chiavi primarie sono UUID per sicurezza
2. **Timestamps**: Automatici con `NOW()` per created_at e updated_at
3. **Soft Delete**: Usare `is_active` invece di eliminare fisicamente
4. **Images**: Salvare URL delle immagini in Supabase Storage
5. **Validation**: Implementare validazione lato client e server
6. **Search**: Considerare Full Text Search per titoli e descrizioni

## Script SQL Completo

Vedi il file `database_setup.sql` per lo script completo di creazione.
