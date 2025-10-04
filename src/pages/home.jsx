import React from "react";
import { Link } from "react-router-dom";
import booksImage from "../assets/img/books.jpg";

const Home = () => (
  <div className="">
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${booksImage})`,
          filter: 'blur(2px) brightness(0.7)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r  from-purple-900/40 to-blue-900/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight tracking-tighter">
          Benvenuto nel nostro hub educativo!
    </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto font-normal">
          Formazione personalizzata per la crescita personale, conoscenza e successo duraturo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/servizi" 
            className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Scopri di più
          </Link>
          <Link 
            to="/contatti" 
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
          >
            Contattaci ora
          </Link>
        </div>
      </div>
    </section>

    {/* Mission Section */}
    <section className="py-12 bg-white/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
              Cresci con noi, trasforma il tuo sapere
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Siamo un gruppo di insegnanti madrelingua o bilingue che offrono percorsi didattici ed attività per apprendere, ad ogni età, le lingue straniere. Proponiamo inoltre laboratori per accrescere le proprie conoscenze e ricercare il proprio benessere psicofisico in un ambiente divertente, stimolante e vivace.
            </p>
            <Link 
              to="/about" 
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors inline-block"
            >
              Scopri di più
            </Link>
          </div>
          <div className="relative">
            <img 
              src={booksImage} 
              alt="Learning environment" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="py-12 bg-white/70">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            Prenota ora un servizio
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scopri i nostri servizi e inizia il tuo percorso di crescita personale oggi stesso!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Individual Classes Card */}
          <div className="bg-white/65 hover:scale-105 transition-all duration-150 rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl ">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Individual classes</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-purple-600">€25.00</span>
                <span className="text-gray-600 ml-2">/ 1 ora</span>
              </div>
              <p className="text-gray-600 mb-8">
                Lezioni personalizzate one-to-one per un apprendimento su misura
              </p>
              <Link 
                to="/servizi" 
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Contattaci!
              </Link>
            </div>
          </div>

          {/* Group Classes Card */}
          <div className="bg-white/65 hover:scale-105 transition-transform duration-150 rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl ">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Group classes</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-purple-600">€10.00</span>
                <span className="text-gray-600 ml-2">/ 1 ora</span>
              </div>
              <p className="text-gray-600 mb-8">
                Lezioni di gruppo per imparare insieme in un ambiente stimolante
              </p>
              <Link 
                to="/servizi" 
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Contattaci!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How it Works */}
    <section className="py-12 bg-white/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2  ">
            Come funziona?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md-px-10">
          <div className="text-center px-10 lg:border-y-2 lg:border-gray-600 py-10 ">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Seleziona il servizio</h3>
            <p className="text-gray-600">
              Seleziona il servizio più adatto alle tue esigenze. I servizi offerti sono altamente personalizzabili, studieremo insieme il percorso più adatto alle tue esigenze.
            </p>
          </div>

          <div className="text-center px-10 lg:border-y-2 lg:border-gray-600 py-10 ">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 ">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Scegli un giorno</h3>
            <p className="text-gray-600">
              Scegli il giorno in cui usufruire del servizio. Per particolari esigenze contattami e troveremo insieme una soluzione.
            </p>
          </div>

          <div className="text-center px-10 lg:border-y-2 lg:border-gray-600 py-10 ">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Conferma l'appuntamento</h3>
            <p className="text-gray-600">
              Conferma l'appuntamento prenotato. Puoi contattarmi tramite email, numero whatsapp e confermare l'appuntamento in sede.
            </p>
          </div>
        </div>
      </div>
  </section>

    {/* Newsletter Section */}
    {/* <section className="py-12 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/img/pexels-pixabay-207732.jpg')`,
          filter: 'blur(1px) brightness(0.6)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
          Iscriviti alla Newsletter
        </h2>
        <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
          Iscriviti alla newsletter per restare aggiornato sui nostri servizi
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Inserisci la tua email" 
              className="flex-1 px-6 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Sign up
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            <input type="checkbox" id="privacy" className="mr-2" />
            <label htmlFor="privacy" className="text-gray-300 text-sm">
              Accetto il trattamento dei miei dati personali per l'invio di newsletter
            </label>
          </div>
        </div>
      </div>
  </section> */}
  </div>
);

export default Home;

