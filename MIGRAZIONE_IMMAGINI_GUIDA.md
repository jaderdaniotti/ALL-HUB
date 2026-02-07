# 🖼️ Migrazione Immagini a Supabase Storage

## ✅ Prerequisiti
- [x] Bucket `images` creato su Supabase (fatto!)
- [ ] Verifica che hai immagini base64 nel database

---

## 🔍 STEP 1: Verifica immagini base64

Apri Supabase Dashboard → SQL Editor ed esegui:

```sql
-- Conta quante immagini base64 hai
SELECT 
  'corsi' as tabella,
  COUNT(*) as totale,
  COUNT(CASE WHEN image_url LIKE 'data:image%' THEN 1 END) as base64
FROM corsi
UNION ALL
SELECT 
  'eventi' as tabella,
  COUNT(*) as totale,
  COUNT(CASE WHEN image_url LIKE 'data:image%' THEN 1 END) as base64
FROM eventi
UNION ALL
SELECT 
  'settimane_studio' as tabella,
  COUNT(*) as totale,
  COUNT(CASE WHEN image_url LIKE 'data:image%' THEN 1 END) as base64
FROM settimane_studio;
```

**Risultato atteso**:
```
tabella            | totale | base64
-------------------|--------|-------
corsi              |   5    |   3
eventi             |   2    |   1
settimane_studio   |   1    |   1
```

Se la colonna `base64` è > 0, hai immagini da migrare!

---

## 🚀 STEP 2: Migrazione (opzione semplice - dal PANNELLO)

Ho creato uno script che puoi eseguire **direttamente dal browser** nel Pannello Admin.

### Istruzioni:

1. **Apri il Pannello Admin** nel browser
   ```
   http://localhost:5173  (se usi PANNELLO)
   oppure
   http://localhost:5174  (se usi FRONTEND)
   ```

2. **Fai login come admin**

3. **Apri la Console del browser** (F12 o Ctrl+Shift+I)

4. **Copia e incolla** questo script nella console:

```javascript
// ========================================
// SCRIPT MIGRAZIONE IMMAGINI (da console browser)
// ========================================

async function migrateImagesToStorage() {
  console.log('🚀 Inizio migrazione immagini...\n');
  
  // Importa supabase dal service esistente
  const { supabase } = await import('./src/lib/supabase.js');
  
  if (!supabase) {
    console.error('❌ Supabase client non inizializzato');
    return;
  }
  
  const tables = ['corsi', 'eventi', 'settimane_studio'];
  let totalMigrated = 0;
  let totalFailed = 0;
  
  for (const tableName of tables) {
    console.log(`\n📋 Elaborazione tabella: ${tableName}`);
    
    // 1. Fetch records con image_url base64
    const { data: records, error: fetchError } = await supabase
      .from(tableName)
      .select('id, image_url');
    
    if (fetchError) {
      console.error(`  ❌ Errore fetch ${tableName}:`, fetchError.message);
      continue;
    }
    
    const base64Records = records.filter(r => 
      r.image_url && r.image_url.startsWith('data:image')
    );
    
    console.log(`  Trovati ${records.length} record totali`);
    console.log(`  ${base64Records.length} con immagini base64`);
    
    if (base64Records.length === 0) {
      console.log('  ✅ Nessuna migrazione necessaria');
      continue;
    }
    
    // 2. Migra ogni record
    for (const record of base64Records) {
      try {
        console.log(`\n  🔄 Migrazione ${tableName}/${record.id}...`);
        
        // a) Converti base64 a blob
        const response = await fetch(record.image_url);
        const blob = await response.blob();
        
        console.log(`     Dimensione: ${(blob.size / 1024).toFixed(2)} KB`);
        
        // b) Genera nome file
        const ext = blob.type.split('/')[1] || 'jpg';
        const fileName = `${tableName}/${record.id}.${ext}`;
        
        // c) Upload a Storage
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, blob, {
            contentType: blob.type,
            upsert: true
          });
        
        if (uploadError) {
          console.error(`     ❌ Upload fallito:`, uploadError.message);
          totalFailed++;
          continue;
        }
        
        // d) Ottieni URL pubblico
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
        
        console.log(`     📷 URL: ${publicUrl}`);
        
        // e) Aggiorna record
        const { error: updateError } = await supabase
          .from(tableName)
          .update({ image_url: publicUrl })
          .eq('id', record.id);
        
        if (updateError) {
          console.error(`     ❌ Update fallito:`, updateError.message);
          totalFailed++;
          continue;
        }
        
        console.log(`     ✅ Migrato con successo!`);
        totalMigrated++;
        
      } catch (err) {
        console.error(`     ❌ Errore:`, err.message);
        totalFailed++;
      }
    }
  }
  
  console.log(`\n\n========================================`);
  console.log(`📊 RIEPILOGO MIGRAZIONE`);
  console.log(`========================================`);
  console.log(`✅ Migrati: ${totalMigrated}`);
  console.log(`❌ Falliti: ${totalFailed}`);
  console.log(`========================================\n`);
  
  if (totalMigrated > 0) {
    console.log('✅ Migrazione completata!');
    console.log('⚠️  Ricarica la pagina per vedere le nuove immagini');
  }
}

// Esegui migrazione
migrateImagesToStorage().catch(console.error);
```

5. **Premi Invio** - Lo script partirà automaticamente

6. **Monitora il progresso** nella console

---

## 📊 Output Atteso

```
🚀 Inizio migrazione immagini...

📋 Elaborazione tabella: corsi
  Trovati 5 record totali
  3 con immagini base64

  🔄 Migrazione corsi/1...
     Dimensione: 125.45 KB
     📷 URL: https://xxx.supabase.co/storage/v1/object/public/images/corsi/1.jpg
     ✅ Migrato con successo!

  🔄 Migrazione corsi/2...
     Dimensione: 98.32 KB
     📷 URL: https://xxx.supabase.co/storage/v1/object/public/images/corsi/2.jpg
     ✅ Migrato con successo!

...

========================================
📊 RIEPILOGO MIGRAZIONE
========================================
✅ Migrati: 5
❌ Falliti: 0
========================================

✅ Migrazione completata!
⚠️  Ricarica la pagina per vedere le nuove immagini
```

---

## 🔍 Verifica Risultato

Dopo la migrazione:

1. **Ricarica il browser** (Ctrl+R)
2. **Vai su `/attivita`** nel FRONTEND
3. Le immagini dovrebbero caricarsi da Storage (URL formato: `https://xxx.supabase.co/storage/...`)

### Verifica su Supabase

Vai su Supabase Dashboard → Storage → images

Dovresti vedere:
```
images/
├── corsi/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
├── eventi/
│   └── 1.jpg
└── settimane_studio/
    └── 1.jpg
```

---

## ⚠️ Troubleshooting

### Errore "Module not found"
Lo script cerca di importare il modulo Supabase. Se non funziona:
- Assicurati di essere nella pagina del PANNELLO Admin
- Prova a eseguire lo script dalla pagina `/attivita`

### Errore "Policy violation"
Le policy di Storage non sono configurate correttamente.

Esegui su Supabase SQL Editor:
```sql
-- Policy per upload (chiunque può caricare)
CREATE POLICY "Anyone can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' );

-- Policy per update
CREATE POLICY "Anyone can update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'images' );
```

### Immagini non si vedono dopo migrazione
1. Svuota cache browser (Ctrl+Shift+Del)
2. Verifica URL immagini nel database:
   ```sql
   SELECT id, image_url FROM corsi LIMIT 5;
   ```
   Devono iniziare con `https://`

3. Verifica che il bucket sia **pubblico** (Supabase → Storage → images → deve dire "Public")

---

## 🎯 Benefici

Dopo la migrazione:
- ✅ **-80-90%** dimensione record nel database
- ✅ **CDN automatico** di Supabase
- ✅ **Caching HTTP** nativo
- ✅ **-40-60%** tempo caricamento pagine
- ✅ Possibilità di **trasformazioni** (resize, ottimizzazione)

---

## 🔄 Rollback (se qualcosa va male)

Se le immagini non funzionano, puoi ripristinare:

1. **Elimina file da Storage**:
   - Vai su Supabase → Storage → images
   - Seleziona tutto
   - Elimina

2. **Ripristina backup database** (se fatto)
   oppure
   **Ri-aggiungi immagini** manualmente dal PANNELLO Admin

---

**Pronto? Esegui STEP 1 per verificare se hai immagini da migrare!** 🚀

