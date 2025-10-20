-- Script per rimuovere il vincolo CHECK dalla tabella eventi
-- Eseguire questo script nel SQL Editor di Supabase

-- ==============================================
-- RIMOZIONE VINCOLO CHECK PER CATEGORIA EVENTI
-- ==============================================

-- Rimuovi il vincolo CHECK per il campo category nella tabella eventi
ALTER TABLE public.eventi DROP CONSTRAINT IF EXISTS eventi_category_check;

-- ==============================================
-- VERIFICA RIMOZIONE VINCOLO
-- ==============================================

-- Verifica che il vincolo sia stato rimosso
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.eventi'::regclass
AND contype = 'c';

-- ==============================================
-- TEST INSERIMENTO CON CATEGORIA PERSONALIZZATA
-- ==============================================

-- Test inserimento evento con categoria personalizzata
INSERT INTO public.eventi (title, description, date, time, location, category) 
VALUES (
    'Test Evento Personalizzato', 
    'Evento di test per verificare che il vincolo sia stato rimosso', 
    '2025-01-20', 
    '18:00', 
    'Sede Test', 
    'Workshop Personalizzato'
);

-- Verifica che l'inserimento sia avvenuto
SELECT 
    id,
    title,
    category,
    created_at
FROM public.eventi 
WHERE title = 'Test Evento Personalizzato';

-- ==============================================
-- PULIZIA DATI DI TEST
-- ==============================================

-- Rimuovi il dato di test
DELETE FROM public.eventi WHERE title = 'Test Evento Personalizzato';

-- ==============================================
-- RISULTATO FINALE
-- ==============================================

SELECT '✅ Vincolo CHECK rimosso con successo!' as risultato,
       'Ora è possibile inserire qualsiasi categoria per gli eventi.' as dettagli,
       'La dashboard admin dovrebbe funzionare correttamente.' as stato;

-- ==============================================
-- NOTE IMPORTANTI
-- ==============================================

/*
PROBLEMA RISOLTO:
Il vincolo eventi_category_check limitava i valori accettabili per il campo category
a solo: 'Lingue', 'Cultura', 'Benessere'.

MODIFICA APPLICATA:
✅ Rimosso il vincolo CHECK eventi_category_check

RISULTATO:
- Gli admin possono ora inserire qualsiasi categoria negli eventi
- La dashboard admin funziona senza errori 400
- Maggiore flessibilità per personalizzare le categorie

PROSSIMI PASSI:
1. Testare la dashboard admin nel browser
2. Verificare che l'aggiunta di eventi funzioni senza errori
3. Controllare che le anteprime si aggiornino correttamente
*/
