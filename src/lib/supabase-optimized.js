// ========================================
// SUPABASE SERVICE OTTIMIZZATO PER FRONTEND
// ========================================
// Obiettivo: query leggere, timeout, filtri lato DB
// Uso: SOLO nel FRONTEND (vetrina), NO CRUD

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ CRITICAL: Missing Supabase environment variables!')
}

// Client Supabase ottimizzato (senza auth)
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

// ========================================
// HELPER: TIMEOUT
// ========================================
// Timeout per fetch (evita attese infinite su reti lente)
const withTimeout = (promise, ms = 5000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), ms)
  
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), ms)
    )
  ]).finally(() => clearTimeout(timeoutId))
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
    // Ignora errori cache (es. quota exceeded)
    console.warn('Cache error:', err)
  }
}

// ========================================
// SERVICE OTTIMIZZATO (SOLO LETTURA)
// ========================================
export const supabaseService = {
  /**
   * Ottieni corsi attivi (ottimizzato per vetrina)
   * - Solo campi necessari per card
   * - Filtro is_active = true
   * - Ordinamento per created_at DESC
   * - Limite 12 risultati (paginazione futura)
   * - Timeout 5s
   * - Cache 5 minuti
   */
  async getCorsi() {
    if (!supabase) throw new Error('Supabase client not initialized')
    
    // Check cache
    const cached = getCachedData('corsi')
    if (cached) {
      console.log('📦 Cache hit: corsi')
      return cached
    }
    
    console.log('🔄 Fetching corsi...')
    
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('corsi')
          .select('id, title, description, duration, level, type, modality, image_url')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(12),
        5000 // timeout 5s
      )
      
      if (error) {
        console.error('❌ Error fetching corsi:', error)
        throw error
      }
      
      console.log(`✅ Fetched ${data?.length || 0} corsi`)
      
      // Salva in cache
      setCachedData('corsi', data || [])
      
      return data || []
    } catch (err) {
      console.error('❌ getCorsi failed:', err)
      // Ritorna cache stale se disponibile
      const staleCache = sessionStorage.getItem(`${CACHE_KEY}-corsi`)
      if (staleCache) {
        console.log('📦 Using stale cache')
        return JSON.parse(staleCache).data || []
      }
      return []
    }
  },

  /**
   * Ottieni eventi futuri attivi (ottimizzato per vetrina)
   * - Solo campi necessari per card
   * - Filtro is_active = true
   * - Filtro date >= oggi (eventi futuri)
   * - Ordinamento per date ASC
   * - Limite 12 risultati
   * - Timeout 5s
   * - Cache 5 minuti
   */
  async getEventi() {
    if (!supabase) throw new Error('Supabase client not initialized')
    
    // Check cache
    const cached = getCachedData('eventi')
    if (cached) {
      console.log('📦 Cache hit: eventi')
      return cached
    }
    
    console.log('🔄 Fetching eventi...')
    
    try {
      // Calcola data di oggi (formato YYYY-MM-DD)
      const today = new Date().toISOString().split('T')[0]
      
      const { data, error } = await withTimeout(
        supabase
          .from('eventi')
          .select('id, title, description, date, time, location, category, image_url')
          .eq('is_active', true)
          .gte('date', today) // solo eventi futuri (>= oggi)
          .order('date', { ascending: true })
          .limit(12),
        5000
      )
      
      if (error) {
        console.error('❌ Error fetching eventi:', error)
        throw error
      }
      
      console.log(`✅ Fetched ${data?.length || 0} eventi`)
      
      // Salva in cache
      setCachedData('eventi', data || [])
      
      return data || []
    } catch (err) {
      console.error('❌ getEventi failed:', err)
      // Ritorna cache stale se disponibile
      const staleCache = sessionStorage.getItem(`${CACHE_KEY}-eventi`)
      if (staleCache) {
        console.log('📦 Using stale cache')
        return JSON.parse(staleCache).data || []
      }
      return []
    }
  },

  /**
   * Ottieni settimane studio (ottimizzato per vetrina)
   * - Solo campi necessari per card
   * - Ordinamento per created_at DESC
   * - Limite 12 risultati
   * - Timeout 5s
   * - Cache 5 minuti
   */
  async getSettimaneStudio() {
    if (!supabase) throw new Error('Supabase client not initialized')
    
    // Check cache
    const cached = getCachedData('settimane')
    if (cached) {
      console.log('📦 Cache hit: settimane')
      return cached
    }
    
    console.log('🔄 Fetching settimane studio...')
    
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('settimane_studio')
          .select('id, title, description, duration, type, city, activities, image_url')
          .order('created_at', { ascending: false })
          .limit(12),
        5000
      )
      
      if (error) {
        console.error('❌ Error fetching settimane:', error)
        throw error
      }
      
      console.log(`✅ Fetched ${data?.length || 0} settimane`)
      
      // Salva in cache
      setCachedData('settimane', data || [])
      
      return data || []
    } catch (err) {
      console.error('❌ getSettimaneStudio failed:', err)
      // Ritorna cache stale se disponibile
      const staleCache = sessionStorage.getItem(`${CACHE_KEY}-settimane`)
      if (staleCache) {
        console.log('📦 Using stale cache')
        return JSON.parse(staleCache).data || []
      }
      return []
    }
  },

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

// Esporta anche il client per usi avanzati
export { supabase as supabaseClient }

