// Libreria client Supabase per connettersi al database
import { createClient } from '@supabase/supabase-js'
// Libreria per confrontare in modo sicuro hash di password (login admin)
import bcrypt from 'bcryptjs'

// URL e chiave ANON di Supabase: vengono lette da variabili d'ambiente Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Log di debug configurazione (non stampa valori sensibili)
console.debug('[Supabase] Init config present:', {
  hasUrl: Boolean(supabaseUrl),
  hasKey: Boolean(supabaseKey),
})

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  : null

export const testSupabaseConnection = async () => {
  // Verifica che il client sia inizializzato
  if (!supabase) return { success: false, error: 'Supabase client not initialized' }
  console.debug('[Supabase] Testing connection on table "corsi" (HEAD count)')
  const { data, error } = await supabase
    .from('corsi')
    .select('id', { count: 'exact', head: true })
  const result = { success: !error, data, error }
  console.debug('[Supabase] Test result:', { success: result.success, error: result.error?.message })
  return result
}

const ensureClient = (op) => {
  // Protegge tutte le funzioni in caso di mancata configurazione
  if (!supabase) throw new Error(`Supabase client not initialized for ${op}`)
}

export const supabaseService = {
  async getCorsi() {
    ensureClient('getCorsi')
    console.debug('[Supabase] getCorsi: fetching active courses...')
    const { data, error } = await supabase
      .from('corsi')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    if (error) {
      console.error('[Supabase] getCorsi error:', error)
      return []
    }
    console.debug('[Supabase] getCorsi: rows =', data?.length || 0)
    return data || []
  },
  async addCorso(payload) {
    ensureClient('addCorso')
    console.debug('[Supabase] addCorso: inserting course with fields:', Object.keys(payload))
    const { data, error } = await supabase.from('corsi').insert([payload]).select()
    if (error) {
      console.error('[Supabase] addCorso error:', error)
      throw error
    }
    console.debug('[Supabase] addCorso: created id =', data?.[0]?.id)
    return data?.[0]
  },
  async updateCorso(id, payload) {
    ensureClient('updateCorso')
    console.debug('[Supabase] updateCorso: id =', id, 'fields:', Object.keys(payload))
    const { data, error } = await supabase.from('corsi').update(payload).eq('id', id).select()
    if (error) {
      console.error('[Supabase] updateCorso error:', error)
      throw error
    }
    console.debug('[Supabase] updateCorso: updated id =', data?.[0]?.id)
    return data?.[0]
  },
  async deleteCorso(id) {
    ensureClient('deleteCorso')
    console.debug('[Supabase] deleteCorso (soft): id =', id)
    const { error } = await supabase.from('corsi').update({ is_active: false }).eq('id', id)
    if (error) {
      console.error('[Supabase] deleteCorso error:', error)
      throw error
    }
    console.debug('[Supabase] deleteCorso: success')
  },

  async getEventi() {
    ensureClient('getEventi')
    console.debug('[Supabase] getEventi: fetching active events...')
    const { data, error } = await supabase
      .from('eventi')
      .select('*')
      .eq('is_active', true)
      .order('date', { ascending: true })
    if (error) {
      console.error('[Supabase] getEventi error:', error)
      return []
    }
    console.debug('[Supabase] getEventi: rows =', data?.length || 0)
    return data || []
  },
  async addEvento(payload) {
    ensureClient('addEvento')
    console.debug('[Supabase] addEvento: inserting event with fields:', Object.keys(payload))
    const { data, error } = await supabase.from('eventi').insert([payload]).select()
    if (error) {
      console.error('[Supabase] addEvento error:', error)
      throw error
    }
    console.debug('[Supabase] addEvento: created id =', data?.[0]?.id)
    return data?.[0]
  },
  async updateEvento(id, payload) {
    ensureClient('updateEvento')
    console.debug('[Supabase] updateEvento: id =', id, 'fields:', Object.keys(payload))
    const { data, error } = await supabase.from('eventi').update(payload).eq('id', id).select()
    if (error) {
      console.error('[Supabase] updateEvento error:', error)
      throw error
    }
    console.debug('[Supabase] updateEvento: updated id =', data?.[0]?.id)
    return data?.[0]
  },
  async deleteEvento(id) {
    ensureClient('deleteEvento')
    console.debug('[Supabase] deleteEvento (hard): id =', id)
    const { error } = await supabase.from('eventi').delete().eq('id', id)
    if (error) {
      console.error('[Supabase] deleteEvento error:', error)
      throw error
    }
    console.debug('[Supabase] deleteEvento: success')
  },

  async getSettimaneStudio() {
    ensureClient('getSettimaneStudio')
    console.debug('[Supabase] getSettimaneStudio: fetching study weeks...')
    const { data, error } = await supabase
      .from('settimane_studio')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('[Supabase] getSettimaneStudio error:', error)
      return []
    }
    console.debug('[Supabase] getSettimaneStudio: rows =', data?.length || 0)
    return data || []
  },
  async addSettimanaStudio(payload) {
    ensureClient('addSettimanaStudio')
    console.debug('[Supabase] addSettimanaStudio: inserting study week with fields:', Object.keys(payload))
    const { data, error } = await supabase.from('settimane_studio').insert([payload]).select()
    if (error) {
      console.error('[Supabase] addSettimanaStudio error:', error)
      throw error
    }
    console.debug('[Supabase] addSettimanaStudio: created id =', data?.[0]?.id)
    return data?.[0]
  },
  async updateSettimanaStudio(id, payload) {
    ensureClient('updateSettimanaStudio')
    console.debug('[Supabase] updateSettimanaStudio: id =', id, 'fields:', Object.keys(payload))
    const { data, error } = await supabase.from('settimane_studio').update(payload).eq('id', id).select()
    if (error) {
      console.error('[Supabase] updateSettimanaStudio error:', error)
      throw error
    }
    console.debug('[Supabase] updateSettimanaStudio: updated id =', data?.[0]?.id)
    return data?.[0]
  },
  async deleteSettimanaStudio(id) {
    ensureClient('deleteSettimanaStudio')
    console.debug('[Supabase] deleteSettimanaStudio (hard): id =', id)
    const { error } = await supabase.from('settimane_studio').delete().eq('id', id)
    if (error) {
      console.error('[Supabase] deleteSettimanaStudio error:', error)
      throw error
    }
    console.debug('[Supabase] deleteSettimanaStudio: success')
  },

  async loginAdmin(email, password) {
    // Riutilizza la tabella users del progetto, con bcrypt
    if (!supabase) return { success: false, error: 'Supabase non configurato' }

    console.debug('[Supabase] loginAdmin: attempting login for email', email)
    const { data, error } = await supabase
      .from('users')
      .select('id,email,name,password_hash,is_admin')
      .eq('email', email)
      .eq('is_admin', true)
      .single()

    if (error || !data) {
      console.warn('[Supabase] loginAdmin: user not found or not admin')
      return { success: false, error: 'Credenziali non valide' }
    }

    const ok = await bcrypt.compare(password, data.password_hash)
    if (ok) {
      console.debug('[Supabase] loginAdmin: password ok for user id', data.id)
      return { success: true, user: data }
    }

    console.warn('[Supabase] loginAdmin: invalid password for email', email)
    return { success: false, error: 'Credenziali non valide' }
  },
}
