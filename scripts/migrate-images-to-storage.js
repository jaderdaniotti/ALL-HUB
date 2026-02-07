// ========================================
// SCRIPT MIGRAZIONE IMMAGINI BASE64 → STORAGE
// ========================================
// Uso: eseguire dal PANNELLO dopo aver configurato Storage
// Converte tutte le immagini base64 nelle colonne image_url
// e le carica su Supabase Storage, aggiornando i record con URL pubblici

import { createClient } from '@supabase/supabase-js'

// ⚠️ CONFIGURARE CON LE TUE CREDENZIALI
const SUPABASE_URL = 'YOUR_SUPABASE_URL'
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ========================================
// HELPER: CONVERTI BASE64 A BLOB
// ========================================
const base64ToBlob = async (base64) => {
  const response = await fetch(base64)
  return await response.blob()
}

// ========================================
// HELPER: CONVERTI BLOB A WEBP (opzionale)
// ========================================
// Nota: richiede canvas (browser o Node con node-canvas)
const convertToWebP = async (blob) => {
  // Implementazione semplificata: ritorna blob originale
  // Per conversione vera, usa sharp (Node) o canvas (browser)
  return blob
}

// ========================================
// MIGRAZIONE TABELLA
// ========================================
const migrateTable = async (tableName, bucketName = 'images') => {
  console.log(`\n📋 Migrating ${tableName}...`)
  
  try {
    // 1. Fetch tutti i record
    const { data: records, error: fetchError } = await supabase
      .from(tableName)
      .select('id, image_url')
    
    if (fetchError) {
      console.error(`❌ Error fetching ${tableName}:`, fetchError)
      return
    }
    
    console.log(`   Found ${records.length} records`)
    
    // 2. Filtra solo record con base64
    const base64Records = records.filter(r => 
      r.image_url && r.image_url.startsWith('data:image')
    )
    
    console.log(`   ${base64Records.length} have base64 images`)
    
    if (base64Records.length === 0) {
      console.log(`   ✅ No migration needed`)
      return
    }
    
    // 3. Migra ogni record
    let migrated = 0
    let failed = 0
    
    for (const record of base64Records) {
      try {
        console.log(`   🔄 Migrating ${tableName}/${record.id}...`)
        
        // a. Converti base64 a blob
        const blob = await base64ToBlob(record.image_url)
        
        // b. (Opzionale) Converti a WebP
        const optimizedBlob = await convertToWebP(blob)
        
        // c. Upload a Storage
        const fileName = `${tableName}/${record.id}.webp`
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, optimizedBlob, {
            contentType: 'image/webp',
            upsert: true // sovrascrive se esiste
          })
        
        if (uploadError) {
          console.error(`      ❌ Upload failed:`, uploadError.message)
          failed++
          continue
        }
        
        // d. Ottieni URL pubblico
        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName)
        
        console.log(`      📷 Public URL: ${publicUrl}`)
        
        // e. Aggiorna record con nuovo URL
        const { error: updateError } = await supabase
          .from(tableName)
          .update({ image_url: publicUrl })
          .eq('id', record.id)
        
        if (updateError) {
          console.error(`      ❌ Update failed:`, updateError.message)
          failed++
          continue
        }
        
        console.log(`      ✅ Migrated successfully`)
        migrated++
        
      } catch (err) {
        console.error(`      ❌ Error migrating ${record.id}:`, err.message)
        failed++
      }
    }
    
    console.log(`\n   📊 Summary: ${migrated} migrated, ${failed} failed`)
    
  } catch (err) {
    console.error(`❌ Fatal error migrating ${tableName}:`, err)
  }
}

// ========================================
// MAIN
// ========================================
const main = async () => {
  console.log('🚀 Starting image migration to Supabase Storage...\n')
  
  // Migra tutte le tabelle
  await migrateTable('corsi')
  await migrateTable('eventi')
  await migrateTable('settimane_studio')
  
  console.log('\n✅ Migration completed!')
  console.log('\n⚠️  Reminder: verify images are displayed correctly on the site')
  console.log('   Then you can optionally clean up old base64 data if needed.')
}

// Esegui
main().catch(console.error)

// ========================================
// ISTRUZIONI D'USO
// ========================================
// 1. Sostituisci SUPABASE_URL e SUPABASE_KEY con le tue credenziali
// 2. Esegui: node FRONTEND/scripts/migrate-images-to-storage.js
// 3. Verifica che le immagini siano visibili sul sito
// 4. (Opzionale) Backup database prima di eseguire

// ========================================
// ROLLBACK
// ========================================
// Se qualcosa va male, puoi ripristinare dal backup:
// 1. Restore database
// 2. Elimina file da Storage:
//    await supabase.storage.from('images').remove(['corsi/*', 'eventi/*', 'settimane_studio/*'])

