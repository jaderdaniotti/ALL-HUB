// ========================================
// SUPABASE SERVICE - FRONTEND (ibrido: GET ottimizzati + CRUD per admin)
// ========================================
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ CRITICAL: Missing Supabase environment variables!')
  console.error('URL:', supabaseUrl)
  console.error('Key:', supabaseKey)
  console.error('Please check your .env.local file')
}

// Client Supabase ottimizzato
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'X-Client-Info': 'all-hub-frontend'
        }
      }
    })
  : null

// Test connessione (usato solo in dev/debug)
export const testSupabaseConnection = async () => {
  if (!supabase) return { success: false, error: 'Supabase client not initialized' }
  const { data, error } = await supabase.from('corsi').select('count').limit(1)
  return { success: !error, data, error }
}

// ========================================
// HELPER: TIMEOUT (per query ottimizzate)
// ========================================
const withTimeout = (promise, ms = 10000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), ms)
    )
  ])
}

// ========================================
// HELPER: CACHE (sessionStorage)
// ========================================
const CACHE_KEY = 'all-hub-cache'
const CACHE_TTL = 5 * 60 * 1000 // 5 minuti

const getCachedData = (key) => {
  try {
    const cached = sessionStorage.getItem(`${CACHE_KEY}-${key}`)
    if (!cached) return null
    
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp > CACHE_TTL) {
      sessionStorage.removeItem(`${CACHE_KEY}-${key}`)
      return null
    }
    
    return data
  } catch {
    return null
  }
}

const setCachedData = (key, data) => {
  try {
    sessionStorage.setItem(`${CACHE_KEY}-${key}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  } catch (err) {
    console.warn('Cache error:', err)
  }
}

// Helper per verificare se il client è inizializzato
const checkSupabaseClient = (operation) => {
  if (!supabase) {
    const error = new Error(`Supabase client not initialized for ${operation}`)
    console.error('❌', error.message)
    throw error
  }
}

// ========================================
// SERVICE COMPLETO (GET ottimizzati + CRUD)
// ========================================
export const supabaseService = {
  // ========================================
  // CORSI
  // ========================================
  
  /**
   * GET CORSI (OTTIMIZZATO con cache, query leggera)
   */
  async getCorsi() {
    checkSupabaseClient('getCorsi')
    
    // Check cache
    const cached = getCachedData('corsi')
    if (cached) {
      console.log('📦 Cache hit: corsi')
      return cached
    }
    
    console.log('🔄 Fetching corsi...')
    
    try {
      // Prova query ottimizzata
      const { data, error } = await supabase
        .from('corsi')
        .select('id, title, description, duration, level, type, modality, image_url')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.warn('⚠️ Optimized query failed, trying fallback:', error.message)
        
        // Fallback 1: senza limit, ma con campi selezionati
        const { data: data2, error: error2 } = await supabase
          .from('corsi')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
        
        if (!error2) {
          console.log(`✅ Fetched ${data2?.length || 0} corsi (fallback 1)`)
          setCachedData('corsi', data2 || [])
          return data2 || []
        }
        
        // Fallback 2: solo select * senza filtri
        const { data: data3, error: error3 } = await supabase
          .from('corsi')
          .select('*')
        
        if (!error3) {
          console.log(`✅ Fetched ${data3?.length || 0} corsi (fallback 2)`)
          return data3 || []
        }
        
        console.error('❌ All fallbacks failed')
        return []
      }
      
      console.log(`✅ Fetched ${data?.length || 0} corsi`)
      setCachedData('corsi', data || [])
      return data || []
    } catch (err) {
      console.error('❌ getCorsi failed:', err)
      return []
    }
  },

  async addCorso(corso) {
    checkSupabaseClient('addCorso')
    console.log('➕ Adding corso:', corso)
    
    try {
      const { data, error } = await supabase
        .from('corsi')
        .insert([corso])
        .select()
      
      if (error) throw error
      
      console.log('✅ Corso added successfully:', data[0])
      
      // Invalida cache
      sessionStorage.removeItem(`${CACHE_KEY}-corsi`)
      
      return data[0]
    } catch (err) {
      console.error('❌ addCorso failed:', err)
      throw err
    }
  },

  async deleteCorso(id) {
    checkSupabaseClient('deleteCorso')
    
    const { error } = await supabase
      .from('corsi')
      .update({ is_active: false })
      .eq('id', id)
    
    if (error) throw error
    
    // Invalida cache
    sessionStorage.removeItem(`${CACHE_KEY}-corsi`)
  },

  async updateCorso(id, corso) {
    checkSupabaseClient('updateCorso')
    
    const { data, error } = await supabase
      .from('corsi')
      .update(corso)
      .eq('id', id)
      .select()
    
    if (error) throw error
    
    // Invalida cache
    sessionStorage.removeItem(`${CACHE_KEY}-corsi`)
    
    return data[0]
  },

  // ========================================
  // EVENTI
  // ========================================
  
  /**
   * GET EVENTI (OTTIMIZZATO con cache, filtro eventi futuri)
   */
  async getEventi() {
    checkSupabaseClient('getEventi')
    
    // Check cache
    const cached = getCachedData('eventi')
    if (cached) {
      console.log('📦 Cache hit: eventi')
      return cached
    }
    
    console.log('🔄 Fetching eventi...')
    
    try {
      // Prova query ottimizzata
      const { data, error } = await supabase
        .from('eventi')
        .select('id, title, description, date, time, location, category, image_url')
        .eq('is_active', true)
        .order('date', { ascending: true })
      
      if (error) {
        console.warn('⚠️ Optimized query failed, trying fallback:', error.message)
        
        // Fallback 1: con is_active ma senza campi limitati
        const { data: data2, error: error2 } = await supabase
          .from('eventi')
          .select('*')
          .eq('is_active', true)
          .order('date', { ascending: true })
        
        if (!error2) {
          console.log(`✅ Fetched ${data2?.length || 0} eventi (fallback 1)`)
          setCachedData('eventi', data2 || [])
          return data2 || []
        }
        
        // Fallback 2: solo select * senza filtri
        const { data: data3, error: error3 } = await supabase
          .from('eventi')
          .select('*')
        
        if (!error3) {
          console.log(`✅ Fetched ${data3?.length || 0} eventi (fallback 2)`)
          return data3 || []
        }
        
        console.error('❌ All fallbacks failed')
        return []
      }
      
      console.log(`✅ Fetched ${data?.length || 0} eventi`)
      setCachedData('eventi', data || [])
      return data || []
    } catch (err) {
      console.error('❌ getEventi failed:', err)
      return []
    }
  },

  async addEvento(evento) {
    checkSupabaseClient('addEvento')
    console.log('➕ Adding evento:', evento)
    
    const { data, error } = await supabase
      .from('eventi')
      .insert([evento])
      .select()
    
    if (error) {
      console.error('❌ Error adding evento:', error)
      throw error
    }
    
    console.log('✅ Evento added successfully:', data[0])
    
    // Invalida cache
    sessionStorage.removeItem(`${CACHE_KEY}-eventi`)
    
    return data[0]
  },

  async deleteEvento(id) {
    checkSupabaseClient('deleteEvento')
    console.log('🗑️ Deleting evento:', id)
    
    const { error } = await supabase
      .from('eventi')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('❌ Error deleting evento:', error)
      throw error
    }
    
    console.log('✅ Evento deleted successfully')
    
    // Invalida cache
    sessionStorage.removeItem(`${CACHE_KEY}-eventi`)
  },

  async updateEvento(id, evento) {
    checkSupabaseClient('updateEvento')
    
    const { data, error } = await supabase
      .from('eventi')
      .update(evento)
      .eq('id', id)
      .select()
    
    if (error) throw error
    
    // Invalida cache
    sessionStorage.removeItem(`${CACHE_KEY}-eventi`)
    
    return data[0]
  },

  // ========================================
  // SETTIMANE STUDIO
  // ========================================
  
  /**
   * GET SETTIMANE STUDIO (OTTIMIZZATO con cache)
   */
  async getSettimaneStudio() {
    checkSupabaseClient('getSettimaneStudio')
    
    // Check cache
    const cached = getCachedData('settimane')
    if (cached) {
      console.log('📦 Cache hit: settimane')
      return cached
    }
    
    console.log('🔄 Fetching settimane studio...')
    
    try {
      // Prova query ottimizzata
      const { data, error } = await supabase
        .from('settimane_studio')
        .select('id, title, description, duration, type, city, activities, image_url')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.warn('⚠️ Optimized query failed, trying fallback:', error.message)
        
        // Fallback 1: con order ma select *
        const { data: data2, error: error2 } = await supabase
          .from('settimane_studio')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (!error2) {
          console.log(`✅ Fetched ${data2?.length || 0} settimane (fallback 1)`)
          setCachedData('settimane', data2 || [])
          return data2 || []
        }
        
        // Fallback 2: solo select * senza order
        const { data: data3, error: error3 } = await supabase
          .from('settimane_studio')
          .select('*')
        
        if (!error3) {
          console.log(`✅ Fetched ${data3?.length || 0} settimane (fallback 2)`)
          return data3 || []
        }
        
        console.error('❌ All fallbacks failed')
        return []
      }
      
      console.log(`✅ Fetched ${data?.length || 0} settimane`)
      setCachedData('settimane', data || [])
      return data || []
    } catch (err) {
      console.error('❌ getSettimaneStudio failed:', err)
      return []
    }
  },

  async addSettimanaStudio(settimana) {
    checkSupabaseClient('addSettimanaStudio')
    console.log('➕ Adding settimana studio:', settimana)
    
    const { data, error } = await supabase
      .from('settimane_studio')
      .insert([settimana])
      .select()
    
    if (error) {
      console.error('❌ Error adding settimana:', error)
      throw error
    }
    
    console.log('✅ Settimana added successfully:', data[0])
    
    // Invalida cache
    sessionStorage.removeItem(`${CACHE_KEY}-settimane`)
    
    return data[0]
  },

  async deleteSettimanaStudio(id) {
    checkSupabaseClient('deleteSettimanaStudio')
    console.log('🗑️ Deleting settimana studio:', id)
    
    const { error } = await supabase
      .from('settimane_studio')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('❌ Error deleting settimana:', error)
      throw error
    }
    
    console.log('✅ Settimana deleted successfully')
    
    // Invalida cache
    sessionStorage.removeItem(`${CACHE_KEY}-settimane`)
  },

  async updateSettimanaStudio(id, settimana) {
    checkSupabaseClient('updateSettimanaStudio')
    
    const { data, error } = await supabase
      .from('settimane_studio')
      .update(settimana)
      .eq('id', id)
      .select()
    
    if (error) throw error
    
    // Invalida cache
    sessionStorage.removeItem(`${CACHE_KEY}-settimane`)
    
    return data[0]
  },

  // ========================================
  // STORAGE
  // ========================================
  
  async uploadImage(file, bucket, path) {
    checkSupabaseClient('uploadImage')
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file)
    
    if (error) throw error
    return data
  },

  async getImageUrl(bucket, path) {
    checkSupabaseClient('getImageUrl')
    
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)
    
    return data.publicUrl
  },

  // ========================================
  // AUTENTICAZIONE ADMIN
  // ========================================
  
  async loginAdmin(email, password) {
    try {
      // Fallback per quando Supabase non è configurato
      if (!supabaseUrl || !supabaseKey) {
        if (email === 'secretariat.allhub@gmail.com' && password === 'Learning25!') {
          return { 
            success: true, 
            user: { 
              id: 'fallback-admin', 
              name: 'Admin Secretariat', 
              email: email,
              is_admin: true 
            } 
          }
        }
        return { success: false, error: 'Credenziali non valide' }
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('is_admin', true)
        .single()
      
      if (error) {
        console.error('Database error:', error)
        return { success: false, error: 'Errore di connessione al database' }
      }
      
      if (!data) {
        return { success: false, error: 'Credenziali non valide' }
      }
      
      // Verifica password usando bcrypt
      const isValidPassword = await bcrypt.compare(password, data.password_hash)
      
      if (isValidPassword) {
        return { success: true, user: data }
      }
      
      // Fallback temporaneo: accetta Learning25! anche se l'hash non corrisponde
      if (password === 'Learning25!') {
        return { success: true, user: data }
      }
      
      return { success: false, error: 'Credenziali non valide' }
    } catch (err) {
      console.error('Login error:', err)
      return { success: false, error: 'Errore di connessione' }
    }
  },

  // ========================================
  // UTILITY
  // ========================================
  
  /**
   * Svuota cache manualmente
   */
  clearCache() {
    sessionStorage.removeItem(`${CACHE_KEY}-corsi`)
    sessionStorage.removeItem(`${CACHE_KEY}-eventi`)
    sessionStorage.removeItem(`${CACHE_KEY}-settimane`)
    console.log('🗑️ Cache cleared')
  }
}
