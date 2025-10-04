import React from "react";
import { Link } from "react-router-dom";
import booksImage from "../assets/img/books.jpg";

const Servizi = () => (
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
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          I Nostri Servizi
        </h1>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
          Scopri i nostri percorsi formativi personalizzati per ogni esigenza
        </p>
      </div>
    </section>

    {/* Services Grid */}
    <section className="py-12 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            Scegli il tuo percorso
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Offriamo lezioni personalizzate per ogni livello e obiettivo di apprendimento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 max-w-6xl mx-auto">
          {/* Individual Classes */}
          <div className="bg-white/50 rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="bg-purple-100 size-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="size-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Individual Classes</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-purple-600">€25.00</span>
                <span className="text-gray-600 ml-2 text-lg">/ 1 ora</span>
              </div>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Lezione one-to-one personalizzata</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Orari flessibili</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Programma su misura</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Massima attenzione individuale</span>
                </div>
              </div>

              <Link 
                to="/contatti" 
                className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-colors w-full block text-center"
              >
                Prenota ora
              </Link>
            </div>
          </div>

          {/* Group Classes */}
          <div className="bg-white/50 rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="bg-blue-100 size-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="size-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Group Classes</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">€10.00</span>
                <span className="text-gray-600 ml-2 text-lg">/ 1 ora</span>
              </div>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Lezioni di gruppo (max 8 persone)</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Ambiente stimolante e dinamico</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Interazione tra studenti</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Prezzo accessibile</span>
                </div>
              </div>

              <Link 
                to="/contatti" 
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors w-full block text-center"
              >
                Prenota ora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Additional Services */}
    <section className="py-12 bg-white/80">
      <div className="container mx-auto px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            Servizi Aggiuntivi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oltre alle lezioni, offriamo laboratori e attività per la crescita personale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/70 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Laboratori Creativi</h3>
              <p className="text-gray-600">
                Attività pratiche per migliorare le competenze linguistiche attraverso l'arte e la creatività
              </p>
            </div>
          </div>

          <div className="bg-white/70 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Benessere Psicofisico</h3>
              <p className="text-gray-600">
                Programmi per il benessere personale e la crescita emotiva in un ambiente sereno
              </p>
            </div>
          </div>

          <div className="bg-white/70 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Metodologie Innovative</h3>
              <p className="text-gray-600">
                Approcci didattici moderni e non-formali per un apprendimento efficace e divertente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How to Book */}
    <section className="py-12 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            Come Prenotare
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Segui questi semplici passi per iniziare il tuo percorso di apprendimento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center lg:border-y-2 lg:border-gray-600 py-10 ">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contattaci</h3>
            <p className="text-gray-600">
              Contattaci via email o telefono per discutere delle tue esigenze
            </p>
          </div>

          <div className="text-center lg:border-y-2 lg:border-gray-600 py-10 ">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Scegli il Servizio</h3>
            <p className="text-gray-600">
              Seleziona tra lezioni individuali o di gruppo in base alle tue preferenze
            </p>
          </div>

          <div className="text-center lg:border-y-2 lg:border-gray-600 py-10 ">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Inizia ad Apprendere</h3>
            <p className="text-gray-600">
              Inizia il tuo percorso di crescita personale con i nostri esperti
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/contatti" 
            className="bg-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
          >
            Inizia Ora
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Servizi;
