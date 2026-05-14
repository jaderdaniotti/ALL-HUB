import { createClient } from '@supabase/supabase-js'

/**
 * Keep-alive DB: lettura minima su Supabase (invocato da Vercel Cron ogni 3h).
 * Richiede header Authorization: Bearer <CRON_SECRET> (impostato automaticamente dal cron Vercel).
 */
export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    return res.status(405).end('Method Not Allowed')
  }

  const secret = process.env.CRON_SECRET
  const auth = req.headers.authorization
  if (!secret || auth !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) {
    return res.status(500).json({ error: 'Missing Supabase URL or anon key' })
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { 'X-Client-Info': 'vercel-db-keep-alive' } },
  })

  const { error } = await supabase.from('corsi').select('id').limit(1)
  if (error) {
    return res.status(502).json({ ok: false, error: error.message })
  }

  if (req.method === 'HEAD') {
    return res.status(204).end()
  }

  return res.status(200).json({ ok: true, at: new Date().toISOString() })
}
