import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { supabaseService } from "../lib/supabase";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { CourseModal, EventModal, StudyWeekModal } from "../components/Modal";
import { getLocalizedField, getAvailableLanguages, getLangFlag } from "../utils/localizationHelper";

const Attivita = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; // Lingua corrente (it, en, de, es, fr)
  
  // Helper per ottenere campo localizzato
  const getField = (item, fieldName) => getLocalizedField(item, fieldName, currentLang);
  const [activeTab, setActiveTab] = useState('corsi');
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [studyWeeks, setStudyWeeks] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingStudyWeeks, setLoadingStudyWeeks] = useState(true);
  const [error, setError] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [selectedStudyWeek, setSelectedStudyWeek] = React.useState(null);

  // Carica dati da Supabase con debug completo
  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        setLoadingCourses(true);
        setLoadingEvents(true);
        setLoadingStudyWeeks(true);

        const [corsiRes, eventiRes, settimaneRes] = await Promise.allSettled([
          supabaseService.getCorsi(),
          supabaseService.getEventi(),
          supabaseService.getSettimaneStudio()
        ])

        if (corsiRes.status === 'fulfilled') setCourses(corsiRes.value || []); else setCourses([]);
        if (eventiRes.status === 'fulfilled') setEvents(eventiRes.value || []); else setEvents([]);
        if (settimaneRes.status === 'fulfilled') setStudyWeeks(settimaneRes.value || []); else setStudyWeeks([]);

      } catch (err) {
        setError('Errore nel caricamento dei dati. Riprova più tardi.');
      } finally {
        setLoadingCourses(false);
        setLoadingEvents(false);
        setLoadingStudyWeeks(false);
        setFirstLoad(false);
      }
    };

    loadData();
  }, []);


  const SkeletonCards = ({ count = 6, icon = 'bi bi-book', gradient = 'from-purple-400 to-blue-500' }) => (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-white/70 rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="text-center">
            <div className={`w-full h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br ${gradient} animate-pulse`}></div>
            <div className="h-5 w-3/5 bg-gray-200 rounded mx-auto mb-3 animate-pulse"></div>
            <div className="h-4 w-4/5 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="h-9 w-32 bg-purple-200 rounded-full mx-auto animate-pulse"></div>
                    </div>
                  </div>
                ))}
    </>
  );

  if (loadingCourses && loadingEvents && loadingStudyWeeks) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('activities.title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('activities.subtitle')}</p>
              </div>
          <div className="flex justify-center mb-8">
            <div className="bg-white/70 rounded-2xl p-2 shadow-lg">
              <button className="px-6 py-3 rounded-xl font-medium bg-purple-600 text-white shadow-lg">{t('activities.tabs.courses')}</button>
              <button className="px-6 py-3 rounded-xl font-medium text-gray-600">{t('activities.tabs.events')}</button>
              <button className="px-6 py-3 rounded-xl font-medium text-gray-600">{t('activities.tabs.studyWeeks')}</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonCards />
          </div>
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
    <>
      {/* Modali */}
      <CourseModal 
        course={selectedCourse} 
        isOpen={!!selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
      <EventModal 
        event={selectedEvent} 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
      <StudyWeekModal 
        studyWeek={selectedStudyWeek} 
        isOpen={!!selectedStudyWeek} 
        onClose={() => setSelectedStudyWeek(null)} 
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
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
                      {t('activities.tabs.courses')}
                    </button>
                    <button
              onClick={() => setActiveTab('eventi')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'eventi'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
                    >
                      {t('activities.tabs.events')}
                    </button>
                    <button
              onClick={() => setActiveTab('settimane')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'settimane'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
                    >
                      {t('activities.tabs.studyWeeks')}
                    </button>
                </div>
              </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeTab === 'corsi' && (
            <>
              { (loadingCourses || (courses.length === 0 && firstLoad)) ? (
                <SkeletonCards />
              ) : courses.length === 0 ? (
            <SkeletonCards />
              ) : (
                courses.map((course) => (
                        <div
                          key={course.id}
                    className="bg-white/70 hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl"
                        >
                    <div className="text-center">
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={course.image_url}
                              alt={course.title}
                              fallbackIcon="bi bi-book"
                              fallbackGradient="from-purple-400 to-blue-500"
                          className="w-full h-full object-contain"
                            />
                          </div>

                      <h3 className="text-xl font-semibold text-gray-800 truncate max-w-full mb-2">
                              {getField(course, 'title')}
                            </h3>

                      <p className="text-gray-600 mb-4 text-sm overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        maxHeight: '4.5rem'
                      }}>
                              {getField(course, 'description')}
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

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourse(course);
                        }}
                        className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors text-sm inline-block"
                      >
                        Leggi di più
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
                )}

                {activeTab === 'eventi' && (
            <>
              { (loadingEvents || (events.length === 0 && firstLoad)) ? (
                <SkeletonCards icon="bi bi-calendar-event" gradient="from-green-400 to-blue-500" />
              ) : events.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="bg-white/70 rounded-2xl p-8 shadow-lg">
                    <i className="bi bi-calendar-event text-6xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Nessun evento disponibile</h3>
                    <p className="text-gray-500">Gli eventi saranno presto disponibili. Controlla di nuovo più tardi.</p>
                  </div>
                    </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white/70 hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl"
                  >
                    <div className="text-center">
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={event.image_url}
                              alt={event.title}
                              fallbackIcon="bi bi-calendar-event"
                              fallbackGradient="from-green-400 to-blue-500"
                          className="w-full h-full object-contain"
                            />
                          </div>

                      <h3 className="text-xl font-semibold text-gray-800 truncate max-w-full mb-2">
                              {getField(event, 'title')}
                            </h3>

                      <p className="text-gray-600 mb-4 text-sm overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        maxHeight: '4.5rem'
                      }}>
                              {getField(event, 'description')}
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

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors text-sm inline-block"
                      >
                        Leggi di più
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
                )}

                {activeTab === 'settimane' && (
            <>
              { (loadingStudyWeeks || (studyWeeks.length === 0 && firstLoad)) ? (
                <SkeletonCards icon="bi bi-globe" gradient="from-indigo-400 to-purple-500" />
              ) : studyWeeks.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="bg-white/70 rounded-2xl p-8 shadow-lg">
                    <i className="bi bi-globe text-6xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Nessuna settimana studio disponibile</h3>
                    <p className="text-gray-500">Le settimane studio saranno presto disponibili. Controlla di nuovo più tardi.</p>
                  </div>
                    </div>
              ) : (
                studyWeeks.map((studyWeek) => (
                  <div
                    key={studyWeek.id}
                    className="bg-white/70 hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl"
                  >
                    <div className="text-center">
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                            <ImageWithFallback
                          src={studyWeek.image_url}
                          alt={studyWeek.title}
                              fallbackIcon="bi bi-globe"
                              fallbackGradient="from-indigo-400 to-purple-500"
                          className="w-full h-full object-contain"
                            />
                          </div>

                      <h3 className="text-xl font-semibold truncate max-w-full text-gray-800 mb-2">
                        {getField(studyWeek, 'title')}
                            </h3>

                      <p className="text-gray-600 mb-4 text-sm overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        maxHeight: '4.5rem'
                      }}>
                        {getField(studyWeek, 'description')}
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
                          <span className="truncate">{getField(studyWeek, 'activities')}</span>
                              </div>
                            </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudyWeek(studyWeek);
                        }}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors text-sm inline-block"
                      >
                        Leggi di più
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
                )}
              </div>
            </div>
      </div>
    </>
  );
};

export default Attivita;