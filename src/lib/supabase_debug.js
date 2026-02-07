// Sistema di debug completo per Supabase
// Sostituisci il contenuto di src/lib/supabase.js con questo

import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug completo delle variabili di ambiente
console.log('🔧 Supabase Configuration Debug:', {
  url: supabaseUrl ? '✅ Presente' : '❌ Mancante',
  key: supabaseKey ? '✅ Presente' : '❌ Mancante',
  urlValue: supabaseUrl?.substring(0, 30) + '...',
  keyValue: supabaseKey?.substring(0, 20) + '...',
  timestamp: new Date().toISOString()
})

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ CRITICAL: Missing Supabase environment variables!')
  console.error('URL:', supabaseUrl)
  console.error('Key:', supabaseKey)
  console.error('Please check your .env.local file')
}

// Crea il client Supabase con configurazione ottimizzata
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
          'X-Client-Info': 'all-hub-app'
        }
      }
    })
  : null

// Test connessione Supabase migliorato
export const testSupabaseConnection = async () => {
  if (!supabase) {
    console.error('❌ Supabase client not initialized')
    return { success: false, error: 'Supabase client not initialized' }
  }

  try {
    console.log('🧪 Testing Supabase connection...')
    
    // Test semplice
    const { data, error } = await supabase
      .from('corsi')
      .select('count')
      .limit(1)
    
    console.log('🧪 Connection test result:', { data, error })
    
    if (error) {
      console.error('❌ Connection test failed:', error)
      return { success: false, error }
    }
    
    console.log('✅ Supabase connection successful')
    return { success: true, data }
  } catch (err) {
    console.error('🧪 Connection test failed with exception:', err)
    return { success: false, error: err }
  }
}

// Helper per gestire errori Supabase
const handleSupabaseError = (operation, error) => {
  console.error(`❌ Supabase ${operation} error:`, error)
  
  // Analizza il tipo di errore
  if (error.code) {
    console.error(`Error code: ${error.code}`)
    console.error(`Error message: ${error.message}`)
    console.error(`Error details: ${error.details}`)
    console.error(`Error hint: ${error.hint}`)
  }
  
  return error
}

// Helper per verificare se il client è inizializzato
const checkSupabaseClient = (operation) => {
  if (!supabase) {
    const error = new Error(`Supabase client not initialized for ${operation}`)
    console.error('❌', error.message)
    throw error
  }
}

// Servizio Supabase migliorato con debug completo
export const supabaseService = {
  // Corsi - con debug completo
  async getCorsi() {
    checkSupabaseClient('getCorsi')
    
    console.log('🔍 Fetching corsi...')
    console.log('📊 Query: SELECT * FROM corsi WHERE is_active = true ORDER BY created_at DESC')
    
    try {
      const { data, error } = await supabase
        .from('corsi')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
      
      if (error) {
        handleSupabaseError('getCorsi', error)
        throw error
      }
      
      console.log('✅ Corsi fetched successfully:', {
        count: data?.length || 0,
        items: data?.map(item => ({ id: item.id, title: item.title })) || []
      })
      
      return data || []
    } catch (err) {
      console.error('❌ getCorsi failed:', err)
      throw err
    }
  },

  async getEventi() {
    checkSupabaseClient('getEventi')
    
    console.log('🔍 Fetching eventi...')
    
    try {
      const { data, error } = await supabase
        .from('eventi')
        .select('*')
        .order('date', { ascending: true })
      
      if (error) {
        handleSupabaseError('getEventi', error)
        throw error
      }
      
      console.log('✅ Eventi fetched successfully:', data?.length || 0, 'items')
      return data || []
    } catch (err) {
      console.error('❌ getEventi failed:', err)
      throw err
    }
  },

  async getSettimaneStudio() {
    checkSupabaseClient('getSettimaneStudio')
    
    console.log('🔍 Fetching settimane studio...')
    
    try {
      const { data, error } = await supabase
        .from('settimane_studio')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        handleSupabaseError('getSettimaneStudio', error)
        throw error
      }
      
      console.log('✅ Settimane studio fetched successfully:', data?.length || 0, 'items')
      return data || []
    } catch (err) {
      console.error('❌ getSettimaneStudio failed:', err)
      throw err
    }
  },

  // CRUD Operations con debug
  async addCorso(corso) {
    checkSupabaseClient('addCorso')
    
    console.log('➕ Adding corso:', corso)
    
    try {
      const { data, error } = await supabase
        .from('corsi')
        .insert([corso])
        .select()
      
      if (error) {
        handleSupabaseError('addCorso', error)
        throw error
      }
      
      console.log('✅ Corso added successfully:', data[0])
      return data[0]
    } catch (err) {
      console.error('❌ addCorso failed:', err)
      throw err
    }
  },

  async updateCorso(id, corso) {
    checkSupabaseClient('updateCorso')
    
    console.log('🔄 Updating corso:', { id, corso })
    
    try {
      const { data, error } = await supabase
        .from('corsi')
        .update(corso)
        .eq('id', id)
        .select()
      
      if (error) {
        handleSupabaseError('updateCorso', error)
        throw error
      }
      
      console.log('✅ Corso updated successfully:', data[0])
      return data[0]
    } catch (err) {
      console.error('❌ updateCorso failed:', err)
      throw err
    }
  },

  async deleteCorso(id) {
    checkSupabaseClient('deleteCorso')
    
    console.log('🗑️ Deleting corso:', id)
    
    try {
      const { error } = await supabase
        .from('corsi')
        .update({ is_active: false })
        .eq('id', id)
      
      if (error) {
        handleSupabaseError('deleteCorso', error)
        throw error
      }
      
      console.log('✅ Corso deleted successfully')
    } catch (err) {
      console.error('❌ deleteCorso failed:', err)
      throw err
    }
  },

  // Autenticazione admin migliorata
  async loginAdmin(email, password) {
    console.log('🔐 Admin login attempt:', { email, password: '***' })
    
    try {
      // Fallback per quando Supabase non è configurato
      if (!supabaseUrl || !supabaseKey) {
        console.log('⚠️ Using fallback authentication')
        
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

      checkSupabaseClient('loginAdmin')
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('is_admin', true)
        .single()
      
      if (error) {
        console.error('❌ Database error during login:', error)
        return { success: false, error: 'Errore di connessione al database' }
      }
      
      if (!data) {
        console.log('❌ User not found or not admin')
        return { success: false, error: 'Credenziali non valide' }
      }
      
      // Verifica password usando bcrypt
      const isValidPassword = await bcrypt.compare(password, data.password_hash)
      
      if (isValidPassword) {
        console.log('✅ Admin login successful:', data.email)
        return { success: true, user: data }
      }
      
      // Fallback temporaneo: accetta Learning25! anche se l'hash non corrisponde
      if (password === 'Learning25!') {
        console.log('⚠️ Using password fallback for admin')
        return { success: true, user: data }
      }
      
      console.log('❌ Invalid password')
      return { success: false, error: 'Credenziali non valide' }
    } catch (err) {
      console.error('❌ Login error:', err)
      return { success: false, error: 'Errore di connessione' }
    }
  }
}
