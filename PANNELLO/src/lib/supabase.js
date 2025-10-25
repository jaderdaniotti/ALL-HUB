import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

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
  if (!supabase) return { success: false, error: 'Supabase client not initialized' }
  const { data, error } = await supabase.from('corsi').select('count').limit(1)
  return { success: !error, data, error }
}

const ensureClient = (op) => {
  if (!supabase) throw new Error(`Supabase client not initialized for ${op}`)
}

export const supabaseService = {
  async getCorsi() {
    ensureClient('getCorsi')
    const { data, error } = await supabase.from('corsi').select('*').order('created_at', { ascending: false })
    if (error) return []
    return data || []
  },
  async addCorso(payload) {
    ensureClient('addCorso')
    const { data, error } = await supabase.from('corsi').insert([payload]).select()
    if (error) throw error
    return data?.[0]
  },
  async updateCorso(id, payload) {
    ensureClient('updateCorso')
    const { data, error } = await supabase.from('corsi').update(payload).eq('id', id).select()
    if (error) throw error
    return data?.[0]
  },
  async deleteCorso(id) {
    ensureClient('deleteCorso')
    const { error } = await supabase.from('corsi').delete().eq('id', id)
    if (error) throw error
  },

  async getEventi() {
    ensureClient('getEventi')
    const { data, error } = await supabase.from('eventi').select('*').order('date', { ascending: true })
    if (error) return []
    return data || []
  },
  async addEvento(payload) {
    ensureClient('addEvento')
    const { data, error } = await supabase.from('eventi').insert([payload]).select()
    if (error) throw error
    return data?.[0]
  },
  async updateEvento(id, payload) {
    ensureClient('updateEvento')
    const { data, error } = await supabase.from('eventi').update(payload).eq('id', id).select()
    if (error) throw error
    return data?.[0]
  },
  async deleteEvento(id) {
    ensureClient('deleteEvento')
    const { error } = await supabase.from('eventi').delete().eq('id', id)
    if (error) throw error
  },

  async getSettimaneStudio() {
    ensureClient('getSettimaneStudio')
    const { data, error } = await supabase.from('settimane_studio').select('*').order('created_at', { ascending: false })
    if (error) return []
    return data || []
  },
  async addSettimanaStudio(payload) {
    ensureClient('addSettimanaStudio')
    const { data, error } = await supabase.from('settimane_studio').insert([payload]).select()
    if (error) throw error
    return data?.[0]
  },
  async updateSettimanaStudio(id, payload) {
    ensureClient('updateSettimanaStudio')
    const { data, error } = await supabase.from('settimane_studio').update(payload).eq('id', id).select()
    if (error) throw error
    return data?.[0]
  },
  async deleteSettimanaStudio(id) {
    ensureClient('deleteSettimanaStudio')
    const { error } = await supabase.from('settimane_studio').delete().eq('id', id)
    if (error) throw error
  },

  async loginAdmin(email, password) {
    // Riutilizza la tabella users del progetto, con bcrypt
    if (!supabase) return { success: false, error: 'Supabase non configurato' }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('is_admin', true)
      .single()

    if (error || !data) return { success: false, error: 'Credenziali non valide' }

    const ok = await bcrypt.compare(password, data.password_hash)
    if (ok) return { success: true, user: data }

    return { success: false, error: 'Credenziali non valide' }
  },
}
