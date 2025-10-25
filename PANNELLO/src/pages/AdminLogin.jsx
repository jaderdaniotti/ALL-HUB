// Pagina di login amministratore: verifica credenziali su tabella users
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabaseService } from '../lib/supabase.js'

export const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      console.debug('[AdminLogin] submit login for email', email)
      const res = await supabaseService.loginAdmin(email, password)
      if (res.success) {
        localStorage.setItem('adminLoggedIn', 'true')
        localStorage.setItem('adminUsername', res.user.name || '')
        localStorage.setItem('adminEmail', res.user.email || '')
        navigate('/dashboard')
      } else {
        setError(res.error || 'Credenziali non valide')
      }
    } catch (err) {
      setError('Errore di connessione. Riprova più tardi.')
      console.error('[AdminLogin] login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white/80 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-shield-lock text-purple-600 text-2xl"></i>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Accesso Amministratore</h1>
          <p className="text-gray-600 text-sm">Inserisci le credenziali del tuo account admin</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Inserisci email" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Inserisci password" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
            {loading ? 'Accesso...' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  )
}
