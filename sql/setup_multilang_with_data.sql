-- ========================================
-- SCRIPT SQL COMPLETO: Setup Multilingua + Popolazione Dati
-- ========================================
-- Questo script:
-- 1. Modifica lo schema aggiungendo colonne IT/EN
-- 2. Popola il database con i dati esistenti già tradotti
--
-- IMPORTANTE: Esegui su Supabase SQL Editor
-- https://supabase.com/dashboard → SQL Editor → New Query
--
-- ATTENZIONE: Questo script ELIMINA i dati esistenti e li ripopola!
-- Fai un backup prima di eseguire!
-- ========================================

-- ========================================
-- STEP 1: PULIZIA DATI ESISTENTI
-- ========================================

-- Disabilita temporaneamente i vincoli (se presenti)
ALTER TABLE IF EXISTS corsi DISABLE TRIGGER ALL;
ALTER TABLE IF EXISTS eventi DISABLE TRIGGER ALL;
ALTER TABLE IF EXISTS settimane_studio DISABLE TRIGGER ALL;

-- Svuota le tabelle
TRUNCATE TABLE corsi CASCADE;
TRUNCATE TABLE eventi CASCADE;
TRUNCATE TABLE settimane_studio CASCADE;

-- ========================================
-- STEP 2: MODIFICA SCHEMA - TABELLA CORSI
-- ========================================

-- Elimina colonne vecchie se esistono
ALTER TABLE corsi DROP COLUMN IF EXISTS title CASCADE;
ALTER TABLE corsi DROP COLUMN IF EXISTS description CASCADE;
ALTER TABLE corsi DROP COLUMN IF EXISTS additional_notes CASCADE;

-- Aggiungi colonne multilingua
ALTER TABLE corsi 
  ADD COLUMN IF NOT EXISTS title_it TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_it TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS additional_notes_it TEXT,
  ADD COLUMN IF NOT EXISTS additional_notes_en TEXT;

-- Rimuovi default dopo creazione
ALTER TABLE corsi ALTER COLUMN title_it DROP DEFAULT;
ALTER TABLE corsi ALTER COLUMN description_it DROP DEFAULT;

-- ========================================
-- STEP 3: MODIFICA SCHEMA - TABELLA EVENTI
-- ========================================

ALTER TABLE eventi DROP COLUMN IF EXISTS title CASCADE;
ALTER TABLE eventi DROP COLUMN IF EXISTS description CASCADE;

ALTER TABLE eventi 
  ADD COLUMN IF NOT EXISTS title_it TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_it TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en TEXT;

ALTER TABLE eventi ALTER COLUMN title_it DROP DEFAULT;
ALTER TABLE eventi ALTER COLUMN description_it DROP DEFAULT;

-- ========================================
-- STEP 4: MODIFICA SCHEMA - TABELLA SETTIMANE_STUDIO
-- ========================================

ALTER TABLE settimane_studio DROP COLUMN IF EXISTS title CASCADE;
ALTER TABLE settimane_studio DROP COLUMN IF EXISTS description CASCADE;
ALTER TABLE settimane_studio DROP COLUMN IF EXISTS activities CASCADE;

ALTER TABLE settimane_studio 
  ADD COLUMN IF NOT EXISTS title_it TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS description_it TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS activities_it TEXT,
  ADD COLUMN IF NOT EXISTS activities_en TEXT;

ALTER TABLE settimane_studio ALTER COLUMN title_it DROP DEFAULT;
ALTER TABLE settimane_studio ALTER COLUMN description_it DROP DEFAULT;

-- ========================================
-- STEP 5: INSERIMENTO DATI - CORSI
-- ========================================

-- Corso 1: Preparazione Certificazioni
INSERT INTO corsi (
  id, 
  title_it, 
  title_en,
  description_it, 
  description_en,
  duration, 
  level, 
  type, 
  image_url, 
  is_active, 
  created_at, 
  updated_at, 
  modality, 
  additional_notes_it,
  additional_notes_en
) VALUES (
  '616a6684-460d-48e9-bcde-9a95bb4dc2a2',
  'Corsi di Preparazione alle Certificazioni per la lingua inglese',
  'English Language Certification Preparation Courses',
  'Preparati a superare gli esami internazionali (es. Cambridge, IELTS, TOEFL) con sicurezza e competenza. I corsi sono strutturati per sviluppare tutte le abilità linguistiche richieste dalle certificazioni: comprensione orale, lettura, produzione scritta e interazione parlata. Ogni percorso include simulazioni d''esame, strategie mirate e feedback personalizzati.
Obiettivi principali:
• Comprendere e applicare le competenze necessarie per il superamento dell''esame.
• Gestire efficacemente tempi, formati e tipologie di domande specifiche.
• Migliorare fluidità, precisione e sicurezza in tutte le abilità linguistiche.',
  'Prepare to pass international exams (e.g., Cambridge, IELTS, TOEFL) with confidence and competence. The courses are structured to develop all the language skills required by certifications: listening comprehension, reading, written production, and spoken interaction. Each pathway includes exam simulations, targeted strategies, and personalized feedback.
Main objectives:
• Understand and apply the skills necessary to pass the exam.
• Effectively manage time, formats, and specific question types.
• Improve fluency, accuracy, and confidence in all language skills.',
  '15 lezioni',
  'Avanzato',
  'Gruppo',
  'https://vrtdijkbejtthhcrnclr.supabase.co/storage/v1/object/public/images/corsi/616a6684-460d-48e9-bcde-9a95bb4dc2a2.png',
  true,
  '2025-10-06 13:33:19.038411+00',
  '2025-10-25 19:57:47.382834+00',
  'Blended',
  'Scopri le proposte ragazzi & adulti',
  'Discover our programs for teens & adults'
);

-- Corso 2: I'll be a chatterbox
INSERT INTO corsi (
  id, 
  title_it, 
  title_en,
  description_it, 
  description_en,
  duration, 
  level, 
  type, 
  image_url, 
  is_active, 
  created_at, 
  updated_at, 
  modality, 
  additional_notes_it,
  additional_notes_en
) VALUES (
  '86d0b600-44de-40cf-b6ed-d7a4ccb3368a',
  'I''ll be a chatterbox - Inglese B1 & B2',
  'I''ll be a chatterbox - English B1 & B2',
  'Perfetto per chi vuole parlare inglese con maggiore sicurezza. Gli studenti impareranno a descrivere esperienze, sogni e opinioni, a sostenere conversazioni su argomenti familiari e a gestire situazioni di viaggio o lavoro con maggiore autonomia.
Obiettivi principali:
• Comprendere i punti principali di testi chiari su argomenti familiari.
• Interagire con interlocutori in modo fluente e naturale.
• Scrivere testi su esperienze personali e interessi.',
  'Perfect for those who want to speak English with greater confidence. Students will learn to describe experiences, dreams, and opinions, hold conversations on familiar topics, and handle travel or work situations with greater autonomy.
Main objectives:
• Understand the main points of clear texts on familiar topics.
• Interact with speakers fluently and naturally.
• Write texts about personal experiences and interests.',
  '10 lezioni',
  'Intermedio',
  'Gruppo',
  'https://vrtdijkbejtthhcrnclr.supabase.co/storage/v1/object/public/images/corsi/86d0b600-44de-40cf-b6ed-d7a4ccb3368a.png',
  true,
  '2025-10-14 09:34:03.902131+00',
  '2025-10-25 19:57:43.513636+00',
  'In presenza/online',
  'Consigliato a tutti. Scopri le proposte per ragazzi e quelle per adulti',
  'Recommended for everyone. Discover our programs for teens and adults'
);

-- Corso 3: Inglese A2
INSERT INTO corsi (
  id, 
  title_it, 
  title_en,
  description_it, 
  description_en,
  duration, 
  level, 
  type, 
  image_url, 
  is_active, 
  created_at, 
  updated_at, 
  modality, 
  additional_notes_it,
  additional_notes_en
) VALUES (
  '8ee29169-9ee5-49c7-af99-00ac57534697',
  'Inglese A2',
  'English A2',
  'Ideale per chi vuole consolidare le basi e migliorare la capacità di comunicazione in contesti familiari. Questo corso aiuta a comprendere frasi e espressioni di uso frequente, ad esprimere bisogni immediati e a raccontare esperienze personali.
Obiettivi principali:
• Comunicare in situazioni semplici e di routine.
• Comprendere messaggi brevi e scritti chiari su argomenti familiari.
• Ampliare il vocabolario e le strutture grammaticali di base.',
  'Ideal for those who want to consolidate the basics and improve communication skills in familiar contexts. This course helps understand frequently used phrases and expressions, express immediate needs, and recount personal experiences.
Main objectives:
• Communicate in simple and routine situations.
• Understand short and clear written messages on familiar topics.
• Expand vocabulary and basic grammatical structures.',
  '10 lezioni',
  'Intermedio',
  'Gruppo',
  'https://vrtdijkbejtthhcrnclr.supabase.co/storage/v1/object/public/images/corsi/8ee29169-9ee5-49c7-af99-00ac57534697.png',
  true,
  '2025-10-06 13:33:19.038411+00',
  '2025-10-25 19:57:39.78038+00',
  'in presenza/online',
  'Prova nota aggiuntiva',
  'Test additional note'
);

-- ========================================
-- STEP 6: INSERIMENTO DATI - EVENTI
-- ========================================

-- Evento 1: The BOOKWORM CIRCLE
INSERT INTO eventi (
  id, 
  title_it, 
  title_en,
  description_it, 
  description_en,
  date, 
  time, 
  location, 
  category, 
  image_url, 
  is_active, 
  created_at, 
  updated_at
) VALUES (
  '0154ca46-3805-464a-a7fc-e40d7c02d31c',
  'The BOOKWORM CIRCLE',
  'The BOOKWORM CIRCLE',
  'CLUB DEL LIBRO - Gruppo di conversazione libera. Appuntamento mensile',
  'BOOK CLUB - Free conversation group. Monthly meeting',
  '2025-11-07',
  '17:30:00',
  'OSTERIA alla PIAZZETTA - Ospedaletto di Gemona (UD)',
  'Lingue & Cultura',
  'https://vrtdijkbejtthhcrnclr.supabase.co/storage/v1/object/public/images/eventi/0154ca46-3805-464a-a7fc-e40d7c02d31c.png',
  true,
  '2025-10-06 13:33:19.038411+00',
  '2025-10-25 19:57:58.013552+00'
);

-- Evento 2: XMAS BRUNCH
INSERT INTO eventi (
  id, 
  title_it, 
  title_en,
  description_it, 
  description_en,
  date, 
  time, 
  location, 
  category, 
  image_url, 
  is_active, 
  created_at, 
  updated_at
) VALUES (
  '7e38d67a-1ab8-46cb-8362-e74266f5829e',
  'XMAS BRUNCH',
  'XMAS BRUNCH',
  'È l''occasione perfetta per lasciarsi catturare dalla "Christmas vibe" e gustare un delizioso brunch!
In un''atmosfera rilassata tra pancake, avocado toast e chiacchiere in inglese, potrai:
- Allenare la conversazione in inglese con attività divertenti
- Scoprire sapori autentici e piatti irresistibili
- Fare nuove amicizie
Lingua: inglese (livello minimo richiesto A2)',
  'The perfect occasion to embrace the "Christmas vibe" and enjoy a delicious brunch!
In a relaxed atmosphere with pancakes, avocado toast, and English conversation, you can:
- Practice English conversation with fun activities
- Discover authentic flavors and irresistible dishes
- Make new friends
Language: English (minimum level required A2)',
  '2025-12-06',
  '11:00:00',
  'OSTERIA alla PIAZZETTA - Ospedaletto di Gemona',
  'lingue & cultura',
  'https://vrtdijkbejtthhcrnclr.supabase.co/storage/v1/object/public/images/eventi/7e38d67a-1ab8-46cb-8362-e74266f5829e.jpeg',
  true,
  '2025-10-06 13:33:19.038411+00',
  '2025-10-25 19:57:53.708057+00'
);

-- Evento 3: DESIGNING YOUR PERFECT ESCAPE
INSERT INTO eventi (
  id, 
  title_it, 
  title_en,
  description_it, 
  description_en,
  date, 
  time, 
  location, 
  category, 
  image_url, 
  is_active, 
  created_at, 
  updated_at
) VALUES (
  '9d6d0758-3dc4-4551-9568-368d4c832c7b',
  'DESIGNING YOUR PERFECT ESCAPE, from the IDEA to the ITINERARY',
  'DESIGNING YOUR PERFECT ESCAPE, from the IDEA to the ITINERARY',
  'Impara come progettare un viaggio su misura. Ti guideremo in ogni fase della pianificazione, dalla prima idea alla valigia pronta:
• Scelta della destinazione
• Come scegliere il volo
• Come scegliere l''alloggio
• Organizzare l''itinerario
• Consigli pratici
Il corso, disponibile in italiano e inglese, è rivolto a tutti coloro che abbiano la passione per i viaggi e per la progettazione degli stessi.',
  'Learn how to design a tailor-made trip. We will guide you through every phase of planning, from the initial idea to your packed suitcase:
• Choosing the destination
• How to choose the flight
• How to choose accommodation
• Organizing the itinerary
• Practical tips
The course, available in Italian and English, is aimed at anyone with a passion for travel and trip planning.',
  '2026-02-02',
  '18:00:00',
  'online',
  'turismo & lingue',
  'https://vrtdijkbejtthhcrnclr.supabase.co/storage/v1/object/public/images/eventi/9d6d0758-3dc4-4551-9568-368d4c832c7b.png',
  true,
  '2025-10-24 09:38:59.414421+00',
  '2025-10-25 19:58:01.070389+00'
);

-- ========================================
-- STEP 7: INSERIMENTO DATI - SETTIMANE STUDIO
-- ========================================

-- Settimana 1: RESET WEEK
INSERT INTO settimane_studio (
  id, 
  title_it, 
  title_en,
  description_it, 
  description_en,
  duration, 
  type, 
  city, 
  activities_it,
  activities_en,
  image_url, 
  is_active, 
  created_at, 
  updated_at
) VALUES (
  '0b967b1e-d186-48d6-9e93-d9e5321a2eed',
  'RESET WEEK',
  'RESET WEEK',
  'Settimana dedicata al benessere fisico e mentale! I nostri pacchetti settimanali combinano attività fisiche, yoga, consigli per affrontare le difficoltà quotidiane, suggerimenti nutrizionali e preparazione di pasti salutari. Le lezioni sono progettate per fornire consigli pratici e personalizzati, affinché ogni partecipante possa costruire una routine equilibrata e sostenibile.
Obiettivi principali:
• Migliorare forma fisica e flessibilità attraverso attività guidate.
• Acquisire conoscenze nutrizionali e strategie per pasti sani e bilanciati.
• Suggerimenti medici e pratici per uno stile di vita più sano e consapevole.
Lingue: La settimana benessere può essere proposta in inglese ed italiano',
  'A week dedicated to physical and mental well-being! Our weekly packages combine physical activities, yoga, advice for facing daily challenges, nutritional suggestions, and preparation of healthy meals. The lessons are designed to provide practical and personalized advice, so that each participant can build a balanced and sustainable routine.
Main objectives:
• Improve physical fitness and flexibility through guided activities.
• Acquire nutritional knowledge and strategies for healthy and balanced meals.
• Medical and practical suggestions for a healthier and more conscious lifestyle.
Languages: The wellness week can be offered in English and Italian',
  '1 settimana',
  'Culturale',
  'Italia, Malta',
  'Incontri con medici e psicologi, cucina, attività sportive...',
  'Meetings with doctors and psychologists, cooking, sports activities...',
  'https://vrtdijkbejtthhcrnclr.supabase.co/storage/v1/object/public/images/settimane_studio/0b967b1e-d186-48d6-9e93-d9e5321a2eed.png',
  false,
  '2025-10-06 13:33:19.038411+00',
  '2025-10-25 19:58:06.544584+00'
);

-- Settimana 2: LANGUAGES BOOTCAMPS
INSERT INTO settimane_studio (
  id, 
  title_it, 
  title_en,
  description_it, 
  description_en,
  duration, 
  type, 
  city, 
  activities_it,
  activities_en,
  image_url, 
  is_active, 
  created_at, 
  updated_at
) VALUES (
  '87f61133-9686-46d6-81d9-77577ebccd18',
  'LANGUAGES BOOTCAMPS',
  'LANGUAGES BOOTCAMPS',
  'Immergiti completamente nella lingua che desideri imparare o perfezionare! I nostri pacchetti settimanali (20, 25 o 30 ore) sono creati su misura per ogni studente e combinano lezioni intensive con attività pratiche, esercizi di conversazione e momenti culturali. Offriamo supporto completo nell''organizzazione di soggiorni, prenotazioni alberghiere, trasporti e visite, per vivere l''esperienza linguistica in totale comodità.
Obiettivi principali:
• Sviluppo di tutte le abilità linguistiche (parlato, ascolto, lettura e scrittura).
• Esperienze pratiche e culturali sul territorio per consolidare l''apprendimento.
• Pacchetto personalizzato secondo livello e obiettivi individuali.',
  'Fully immerse yourself in the language you want to learn or improve! Our weekly packages (20, 25, or 30 hours) are tailored for each student and combine intensive lessons with practical activities, conversation exercises, and cultural moments. We offer complete support in organizing stays, hotel reservations, transportation, and visits, to experience the language in total comfort.
Main objectives:
• Development of all language skills (speaking, listening, reading, and writing).
• Practical and cultural experiences in the area to consolidate learning.
• Customized package according to individual level and objectives.',
  '5 giorni',
  'Intensiva',
  'Italia, Malta..',
  'Lezioni create ad hoc, attività linguistiche e culturali, visite e molto altro',
  'Custom-made lessons, linguistic and cultural activities, visits and much more',
  'https://vrtdijkbejtthhcrnclr.supabase.co/storage/v1/object/public/images/settimane_studio/87f61133-9686-46d6-81d9-77577ebccd18.jpeg',
  false,
  '2025-10-06 13:33:19.038411+00',
  '2025-10-25 19:58:03.260786+00'
);

-- ========================================
-- STEP 8: RIABILITA TRIGGER
-- ========================================

ALTER TABLE corsi ENABLE TRIGGER ALL;
ALTER TABLE eventi ENABLE TRIGGER ALL;
ALTER TABLE settimane_studio ENABLE TRIGGER ALL;

-- ========================================
-- STEP 9: COMMENTI COLONNE
-- ========================================

COMMENT ON COLUMN corsi.title_it IS 'Titolo del corso in italiano';
COMMENT ON COLUMN corsi.title_en IS 'Titolo del corso in inglese';
COMMENT ON COLUMN corsi.description_it IS 'Descrizione del corso in italiano';
COMMENT ON COLUMN corsi.description_en IS 'Descrizione del corso in inglese';
COMMENT ON COLUMN corsi.additional_notes_it IS 'Note aggiuntive in italiano';
COMMENT ON COLUMN corsi.additional_notes_en IS 'Note aggiuntive in inglese';

COMMENT ON COLUMN eventi.title_it IS 'Titolo dell''evento in italiano';
COMMENT ON COLUMN eventi.title_en IS 'Titolo dell''evento in inglese';
COMMENT ON COLUMN eventi.description_it IS 'Descrizione dell''evento in italiano';
COMMENT ON COLUMN eventi.description_en IS 'Descrizione dell''evento in inglese';

COMMENT ON COLUMN settimane_studio.title_it IS 'Titolo della settimana studio in italiano';
COMMENT ON COLUMN settimane_studio.title_en IS 'Titolo della settimana studio in inglese';
COMMENT ON COLUMN settimane_studio.description_it IS 'Descrizione della settimana studio in italiano';
COMMENT ON COLUMN settimane_studio.description_en IS 'Descrizione della settimana studio in inglese';
COMMENT ON COLUMN settimane_studio.activities_it IS 'Attività incluse in italiano';
COMMENT ON COLUMN settimane_studio.activities_en IS 'Attività incluse in inglese';

-- ========================================
-- STEP 10: VERIFICA FINALE
-- ========================================

-- Verifica struttura tabelle
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name IN ('corsi', 'eventi', 'settimane_studio')
  AND column_name LIKE '%_it' OR column_name LIKE '%_en'
ORDER BY table_name, ordinal_position;

-- Verifica dati inseriti
SELECT 'CORSI' as tabella, COUNT(*) as totale FROM corsi
UNION ALL
SELECT 'EVENTI', COUNT(*) FROM eventi
UNION ALL
SELECT 'SETTIMANE STUDIO', COUNT(*) FROM settimane_studio;

-- Verifica traduzioni disponibili
SELECT 
  'CORSI' as tabella,
  COUNT(*) as totale,
  COUNT(title_en) as con_traduzione_en,
  ROUND(COUNT(title_en) * 100.0 / COUNT(*), 2) as percentuale_tradotto
FROM corsi
UNION ALL
SELECT 
  'EVENTI',
  COUNT(*),
  COUNT(title_en),
  ROUND(COUNT(title_en) * 100.0 / COUNT(*), 2)
FROM eventi
UNION ALL
SELECT 
  'SETTIMANE STUDIO',
  COUNT(*),
  COUNT(title_en),
  ROUND(COUNT(title_en) * 100.0 / COUNT(*), 2)
FROM settimane_studio;

-- ========================================
-- COMPLETATO! ✅
-- ========================================
-- 
-- Lo script ha:
-- ✅ Modificato lo schema con colonne IT/EN
-- ✅ Popolato 3 corsi con traduzioni
-- ✅ Popolato 3 eventi con traduzioni
-- ✅ Popolato 2 settimane studio con traduzioni
-- ✅ Tutti i dati hanno versione italiana e inglese
--
-- Ora puoi:
-- 1. Aggiornare il pannello admin per usare i nuovi campi
-- 2. Aggiornare il frontend con getLocalizedField()
-- 3. Testare il cambio lingua nel frontend
--
-- ========================================

