// Sistema di debug per le pagine
// Sostituisci il contenuto di src/pages/Attivita.jsx con questo

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { supabaseService, testSupabaseConnection } from "../lib/supabase";
import { ImageWithFallback } from "../components/ImageWithFallback";

const Attivita = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('corsi');
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [studyWeeks, setStudyWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [selectedStudyWeek, setSelectedStudyWeek] = React.useState(null);

  // Debug: Test connessione Supabase
  useEffect(() => {
    const testConnection = async () => {
      console.log('🧪 Testing Supabase connection from Attivita page...')
      const result = await testSupabaseConnection()
      setDebugInfo(result)
      console.log('🧪 Connection test result:', result)
    }
    
    testConnection()
  }, []);

  // Carica dati da Supabase con debug completo
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔄 Starting data load for Attivita page...')
        setLoading(true);
        setError(null);

        // Test connessione prima di caricare i dati
        const connectionTest = await testSupabaseConnection()
        if (!connectionTest.success) {
          throw new Error(`Connection failed: ${connectionTest.error}`)
        }

        console.log('📊 Loading data with Promise.all...')
        const startTime = Date.now()
        
        const [coursesData, eventsData, studyWeeksData] = await Promise.all([
          supabaseService.getCorsi(),
          supabaseService.getEventi(),
          supabaseService.getSettimaneStudio()
        ]);

        const endTime = Date.now()
        console.log(`✅ Data loaded successfully in ${endTime - startTime}ms`)

        setCourses(coursesData);
        setEvents(eventsData);
        setStudyWeeks(studyWeeksData);
        
        console.log('📊 Final data counts:', {
          courses: coursesData.length,
          events: eventsData.length,
          studyWeeks: studyWeeksData.length
        })
        
      } catch (err) {
        console.error('❌ Error loading data in Attivita:', err);
        setError(`Errore nel caricamento dei dati: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Debug info component
  const DebugInfo = () => {
    if (!debugInfo) return null;
    
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Debug Info</h3>
        <div className="text-xs text-blue-700">
          <p>Connection: {debugInfo.success ? '✅ Success' : '❌ Failed'}</p>
          {debugInfo.error && <p>Error: {debugInfo.error}</p>}
          <p>Data loaded: Courses: {courses.length}, Events: {events.length}, Study Weeks: {studyWeeks.length}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dati...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Errore di Caricamento</h2>
            <p className="text-red-700">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Debug Info */}
      <DebugInfo />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('activities.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('activities.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('corsi')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'corsi'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {t('activities.courses')}
            </button>
            <button
              onClick={() => setActiveTab('eventi')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'eventi'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {t('activities.events')}
            </button>
            <button
              onClick={() => setActiveTab('settimane')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'settimane'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {t('activities.studyWeeks')}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === 'corsi' && (
            <>
              {courses.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="bg-white/70 rounded-2xl p-8 shadow-lg">
                    <i className="bi bi-book text-6xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Nessun corso disponibile
                    </h3>
                    <p className="text-gray-500">
                      I corsi saranno presto disponibili. Controlla di nuovo più tardi.
                    </p>
                  </div>
                </div>
              ) : (
                courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white/70 hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl cursor-pointer"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <div className="text-center">
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <ImageWithFallback 
                          src={course.image_url}
                          alt={course.title}
                          fallbackIcon="bi bi-book"
                          fallbackGradient="from-purple-400 to-blue-500"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm">
                        {course.description}
                      </p>

                      <div className="space-y-2 mb-4">
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
                        {course.modality && (
                          <div className="chip chip-indigo">
                            <i className="bi bi-laptop mr-2"></i>
                            <span>{course.modality}</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors text-sm inline-block">
                        Prenota Ora
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'eventi' && (
            <>
              {events.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="bg-white/70 rounded-2xl p-8 shadow-lg">
                    <i className="bi bi-calendar-event text-6xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Nessun evento disponibile
                    </h3>
                    <p className="text-gray-500">
                      Gli eventi saranno presto disponibili. Controlla di nuovo più tardi.
                    </p>
                  </div>
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white/70 hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="text-center">
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <ImageWithFallback 
                          src={event.image_url}
                          alt={event.title}
                          fallbackIcon="bi bi-calendar-event"
                          fallbackGradient="from-green-400 to-blue-500"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-4">
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

                      <div className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors text-sm inline-block">
                        Prenota Ora
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'settimane' && (
            <>
              {studyWeeks.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="bg-white/70 rounded-2xl p-8 shadow-lg">
                    <i className="bi bi-globe text-6xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Nessuna settimana studio disponibile
                    </h3>
                    <p className="text-gray-500">
                      Le settimane studio saranno presto disponibili. Controlla di nuovo più tardi.
                    </p>
                  </div>
                </div>
              ) : (
                studyWeeks.map((studyWeek) => (
                  <div
                    key={studyWeek.id}
                    className="bg-white/70 hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl cursor-pointer"
                    onClick={() => setSelectedStudyWeek(studyWeek)}
                  >
                    <div className="text-center">
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                        <ImageWithFallback 
                          src={studyWeek.image_url}
                          alt={studyWeek.title}
                          fallbackIcon="bi bi-globe"
                          fallbackGradient="from-indigo-400 to-purple-500"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {studyWeek.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm">
                        {studyWeek.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="chip chip-indigo">
                          <i className="bi bi-clock mr-2"></i>
                          <span>{studyWeek.duration}</span>
                        </div>
                        <div className="chip chip-purple">
                          <i className="bi bi-tag mr-2"></i>
                          <span>{studyWeek.type}</span>
                        </div>
                        <div className="chip chip-green">
                          <i className="bi bi-geo-alt mr-2"></i>
                          <span>{studyWeek.city}</span>
                        </div>
                        <div className="chip chip-blue">
                          <i className="bi bi-list-check mr-2"></i>
                          <span className="truncate">{studyWeek.activities}</span>
                        </div>
                      </div>

                      <div className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors text-sm inline-block">
                        Prenota Settimana
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attivita;
