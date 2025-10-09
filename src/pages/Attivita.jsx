import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { supabaseService } from "../lib/supabase";
import { ImageWithFallback } from "../components/ImageWithFallback";

const Attivita = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('corsi');
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [studyWeeks, setStudyWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carica dati da Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [coursesData, eventsData, studyWeeksData] = await Promise.all([
          supabaseService.getCorsi(),
          supabaseService.getEventi(),
          supabaseService.getSettimaneStudio()
        ]);
        
        setCourses(coursesData);
        setEvents(eventsData);
        setStudyWeeks(studyWeeksData);
      } catch (err) {
        console.error('Errore nel caricamento dati:', err);
        setError('Errore nel caricamento dei dati. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="">


      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="py-20 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <i className="bi bi-exclamation-triangle text-red-500 text-2xl mb-2"></i>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              {t('common.back')}
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Tab Navigation */}
          <section className="py-12 bg-white/70">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 rounded-full p-2 shadow-lg">
              <div className="flex space-x-2">
                <button 
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'corsi' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:bg-purple-100'
                  }`}
                  onClick={() => setActiveTab('corsi')}
                >
                  {t('activities.tabs.courses')}
                </button>
                <button 
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'eventi' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:bg-purple-100'
                  }`}
                  onClick={() => setActiveTab('eventi')}
                >
                  {t('activities.tabs.events')}
                </button>
                <button 
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'settimane' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:bg-purple-100'
                  }`}
                  onClick={() => setActiveTab('settimane')}
                >
                  {t('activities.tabs.studyWeeks')}
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            {activeTab === 'corsi' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                    {t('activities.coursesTitle')} ({courses.length})
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {t('activities.coursesSubtitle')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-white/65 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl">
                      <div className="text-center">
                        {/* Immagine del corso */}
                        <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
                          <ImageWithFallback 
                            src={course.image_url}
                            alt={course.title}
                            fallbackIcon="bi bi-book"
                            fallbackGradient="from-purple-400 to-blue-500"
                            className="w-full h- object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                        
                        {/* Chips per i dettagli del corso */}
                        <div className="grid space-y-2 mb-4">
                          <div className="chip chip-purple">
                            <i className="bi bi-clock mr-2"></i>
                            <span>{course.duration}</span>
                          </div>
                          <div className="chip chip-blue">
                            <i className="bi bi-graph-up mr-2"></i>
                            <span>{course.level}</span>
                          </div>
                          <div className="chip chip-green">
                            <i className="bi bi-people mr-2"></i>
                            <span>{course.type}</span>
                          </div>
                        </div>
                        <Link 
                          to="/contatti" 
                          className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors text-sm"
                        >
                          {t('activities.course.bookNow')}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'eventi' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                    {t('activities.eventsTitle')} ({events.length})
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {t('activities.eventsSubtitle')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white/65 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl">
                      <div className="text-center">
                        {/* Immagine del corso */}
                        <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
                          <ImageWithFallback 
                            src={event.image_url}
                            alt={event.title}
                            fallbackIcon="bi bi-book"
                            fallbackGradient="from-purple-400 to-blue-500"
                            className="w-full h- object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
                        {/* Chips per i dettagli dell'evento */}
                        <div className="flex flex-col space-y-2 mb-4">
                          <div className="chip chip-green">
                            <i className="bi bi-calendar mr-2"></i>
                            <span>{new Date(event.date).toLocaleDateString('it-IT')}</span>
                          </div>
                          <div className="chip chip-blue">
                            <i className="bi bi-clock mr-2"></i>
                            <span>{event.time}</span>
                          </div>
                          <div className="chip chip-purple">
                            <i className="bi bi-geo-alt mr-2"></i>
                            <span>{event.location}</span>
                          </div>
                          <div className="chip chip-indigo">
                            <i className="bi bi-tag mr-2"></i>
                            <span>{event.category}</span>
                          </div>
                        </div>
                        <Link 
                          to="/contatti" 
                          className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors text-sm"
                        >
                          {t('activities.course.bookNow')}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settimane' && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                    {t('activities.studyWeeksTitle')} ({studyWeeks.length})
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {t('activities.studyWeeksSubtitle')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studyWeeks.map((week) => (
                    <div key={week.id} className="bg-white/65 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl">
                      <div className="text-center">
                        {/* Immagine della settimana studio */}
                        <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
                          <ImageWithFallback 
                            src={week.image_url}
                            alt={week.title}
                            fallbackIcon="bi bi-globe"
                            fallbackGradient="from-indigo-400 to-purple-500"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{week.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{week.description}</p>
                        
                        {/* Chips per i dettagli della settimana studio */}
                        <div className="grid space-y-2 mb-4">
                          <div className="chip chip-indigo">
                            <i className="bi bi-clock mr-2"></i>
                            <span>{week.duration}</span>
                          </div>
                          <div className="chip chip-purple">
                            <i className="bi bi-tag mr-2"></i>
                            <span>{week.type}</span>
                          </div>
                          <div className="chip chip-green">
                            <i className="bi bi-geo-alt mr-2"></i>
                            <span>{week.city}</span>
                          </div>
                          <div className="chip chip-blue">
                            <i className="bi bi-list-check mr-2"></i>
                            <span className="truncate">{week.activities}</span>
                          </div>
                        </div>
                        <Link 
                          to="/contatti" 
                          className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors text-sm"
                        >
                          Prenota Settimana
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
        </>
      )}
    </div>
  );
};

export default Attivita;
