import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import booksImage from "../assets/img/books.jpg";
import { supabaseService } from "../lib/supabase";

const AdminLogin = () => {
  const { t } = useTranslation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    console.log('Login attempt with:', { email: credentials.username, password: credentials.password })
    
    try {
      // Usa il servizio Supabase per l'autenticazione
      const result = await supabaseService.loginAdmin(credentials.username, credentials.password);
      
      console.log('Login result:', result)
      
      if (result.success) {
      // Salva lo stato di login nel localStorage
      localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminUsername", result.user.name);
        localStorage.setItem("adminEmail", result.user.email);
        
        console.log('Login successful, redirecting...')
      
      // Reindirizza al pannello admin
      navigate("/admin/dashboard");
    } else {
        console.log('Login failed:', result.error)
        setError(result.error || "Credenziali non valide");
      }
    } catch (err) {
      console.error("Errore durante il login:", err);
      setError("Errore di connessione. Riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError(""); // Pulisci l'errore quando l'utente digita
  };

  return (
    <div className="">


      {/* Login Form */}
      <section className="py-12 bg-white/70">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white/80 rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="bi bi-shield-lock text-purple-600 text-2xl"></i>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {t('admin.login.title')}
                </h2>
                <p className="text-gray-600 text-sm">
                  {t('admin.login.subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('admin.login.email')}
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Inserisci username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('admin.login.password')}
                  </label>
                  <div className="relative">
                  <input
                      type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Inserisci password"
                    required
                  />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash text-lg"></i>
                      ) : (
                        <i className="bi bi-eye text-lg"></i>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {t('admin.login.loading')}
                    </div>
                  ) : (
                    t('admin.login.login')
                  )}
                </button>
              </form>


              <div className="mt-6 text-center">
                <Link 
                  to="/eventi"
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  ← Torna agli Eventi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;
