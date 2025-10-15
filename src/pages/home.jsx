import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import booksImage from "../assets/img/books.jpg";
import logorosa from "../assets/img/logorosa-Photoroom.png";

const Home = () => {
  const { t } = useTranslation();

  return (
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
          {t('home.hero.title')}
    </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto font-normal">
          {t('home.hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/attivita" 
            className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            {t('home.hero.cta1')}
          </Link>
          <Link 
            to="/contatti" 
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
          >
            {t('home.hero.cta2')}
          </Link>
        </div>
      </div>
    </section>

    {/* Mission Section */}
    <section className="py-8 md:py-12 bg-white/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-4 md:mb-6">
              {t('home.mission.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
              {t('home.mission.description')}
            </p>
            <Link 
              to="/about" 
              className="bg-purple-600 text-white px-6 py-3 md:px-8 md:py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors inline-block text-sm md:text-base"
            >
              {t('home.mission.cta')}
            </Link>
          </div>
          <div className="relative flex justify-center order-1 lg:order-2">
            <img 
              src={logorosa} 
              alt="Learning environment" 
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full lg:w-4/5 xl:w-3/4 object-contain rounded-2xl "
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
            {t('home.services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('home.services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Corsi */}
          <div className="bg-white/65 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl text-center flex flex-col h-full">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="bi bi-book text-2xl text-purple-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('home.services.courses.title')}</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              {t('home.services.courses.description')}
            </p>
            <Link 
              to="/attivita" 
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors mt-auto"
            >
              {t('home.services.courses.cta')}
            </Link>
          </div>

          {/* Eventi */}
          <div className="bg-white/65 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl text-center flex flex-col h-full">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="bi bi-calendar-event text-2xl text-blue-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('home.services.events.title')}</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              {t('home.services.events.description')}
            </p>
            <Link 
              to="/attivita" 
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors mt-auto"
            >
              {t('home.services.events.cta')}
            </Link>
          </div>

          {/* Skill Up Camps */}
          <div className="bg-white/65 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl text-center flex flex-col h-full">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="bi bi-globe text-2xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('home.services.studyWeeks.title')}</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              {t('home.services.studyWeeks.description')}
            </p>
            <Link 
              to="/attivita" 
              className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-colors mt-auto"
            >
              {t('home.services.studyWeeks.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* How it Works */}
    <section className="py-12 bg-white/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2  ">
            {t('home.howItWorks.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md-px-10">
          <div className="text-center px-10 lg:border-y-2 lg:border-gray-600 py-10 ">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('home.howItWorks.step1.title')}</h3>
            <p className="text-gray-600">
              {t('home.howItWorks.step1.description')}
            </p>
          </div>

          <div className="text-center px-10 lg:border-y-2 lg:border-gray-600 py-10 ">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 ">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('home.howItWorks.step2.title')}</h3>
            <p className="text-gray-600">
              {t('home.howItWorks.step2.description')}
            </p>
          </div>

          <div className="text-center px-10 lg:border-y-2 lg:border-gray-600 py-10 ">
            <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('home.howItWorks.step3.title')}</h3>
            <p className="text-gray-600">
              {t('home.howItWorks.step3.description')}
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
};

export default Home;

