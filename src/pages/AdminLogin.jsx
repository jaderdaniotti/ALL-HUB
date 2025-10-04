import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import booksImage from "../assets/img/books.jpg";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Credenziali hardcoded per demo (senza backend)
    if (credentials.username === "admin" && credentials.password === "admin123") {
      // Salva lo stato di login nel localStorage
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminUsername", credentials.username);
      
      // Reindirizza al pannello admin
      navigate("/admin/dashboard");
    } else {
      setError("Credenziali non valide. Usa: admin / admin123");
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
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${booksImage})`,
            filter: 'blur(2px) brightness(0.6)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Pannello Admin
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Accedi al pannello di controllo per gestire eventi e contenuti
          </p>
        </div>
      </section>

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
                  Accesso Admin
                </h2>
                <p className="text-gray-600 text-sm">
                  Inserisci le tue credenziali per accedere
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
                    Username
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
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Inserisci password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Accedi
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">
                    Credenziali Demo:
                  </h3>
                  <p className="text-xs text-blue-700">
                    <strong>Username:</strong> admin<br/>
                    <strong>Password:</strong> admin123
                  </p>
                </div>
              </div>

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
