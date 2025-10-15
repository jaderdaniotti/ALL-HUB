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
  const [selectedCourse, setSelectedCourse] = React.useState(null);


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


      {/* Loading State - Skeleton */}
      {loading && (
        <section className="py-12 bg-white/70 min-h-screen">
          <div className="container mx-auto px-4">
            {/* Tab Navigation Skeleton */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/80 rounded-full p-2 shadow-lg">
                <div className="flex space-x-2">
                  <div className="px-6 py-3 rounded-full bg-gray-200 animate-pulse w-24 h-12"></div>
                  <div className="px-6 py-3 rounded-full bg-gray-200 animate-pulse w-24 h-12"></div>
                  <div className="px-6 py-3 rounded-full bg-gray-200 animate-pulse w-24 h-12"></div>
                </div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="max-w-6xl mx-auto">
              {/* Header Skeleton */}
              <div className="text-center mb-12">
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse mx-auto mb-6 w-96"></div>
                <div className="h-6 bg-gray-200 rounded-lg animate-pulse mx-auto w-80"></div>
              </div>

              {/* Cards Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white/65 rounded-2xl shadow-xl p-6 border border-gray-100">
                    <div className="text-center">
                      {/* Image Skeleton */}
                      <div className="w-full h-50 mb-4 rounded-lg bg-gray-200 animate-pulse"></div>
                      
                      {/* Title Skeleton */}
                      <div className="h-6 bg-gray-200 rounded-lg animate-pulse mb-2 w-3/4 mx-auto"></div>
                      
                      {/* Description Skeleton */}
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-full"></div>
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse w-2/3 mx-auto"></div>
                      </div>
                      
                      {/* Chips Skeleton */}
                      <div className="space-y-2 mb-4">
                        <div className="h-8 bg-gray-200 rounded-full animate-pulse w-32 mx-auto"></div>
                        <div className="h-8 bg-gray-200 rounded-full animate-pulse w-28 mx-auto"></div>
                        <div className="h-8 bg-gray-200 rounded-full animate-pulse w-36 mx-auto"></div>
                      </div>
                      
                      {/* Button Skeleton */}
                      <div className="h-10 bg-gray-200 rounded-full animate-pulse w-32 mx-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <div className="py-20 text-center min-h-screen">
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
          <section className="py-12 bg-white/70 min-h-screen">
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
  <div
    key={course.id}
    className="bg-white/80 rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between p-6"
  >
    {/* Immagine */}
    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
      <ImageWithFallback
        src={course.image_url}
        alt={course.title}
        fallbackIcon="bi bi-book"
        fallbackGradient="from-purple-400 to-blue-500"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Contenuto testuale */}
    <div className="flex flex-col flex-grow text-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
        {course.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[3.5rem]">
        {course.description}
      </p>

      {/* Chips */}
      <div className="space-y-2 mb-5">
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

      {/* Note aggiuntive */}
      {course.additional_notes && (
        <div className="bg-gray-50 rounded-lg p-3 mb-5 text-left text-sm text-gray-600 italic flex items-start justify-center">
          <i className="bi bi-info-circle mr-2 mt-[2px] text-purple-500"></i>
          <span>{course.additional_notes}</span>
        </div>
      )}
    </div>

    {/* Bottoni finali */}
    <div className="mt-auto flex flex-wrap justify-center gap-3 pt-4 border-t border-gray-100">
      <button
        onClick={() => setSelectedCourse(course)}
        className="text-purple-600 border border-purple-600 px-5 py-2 rounded-full font-medium hover:bg-purple-600 hover:text-white transition-colors text-sm"
      >
        Leggi tutto
      </button>

      <Link
        to="/contatti"
        className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors text-sm"
      >
        {t("activities.course.bookNow")}
      </Link>
    </div>
  </div>
))}

                  {/* Modal descrizione corso */}
{selectedCourse && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative overflow-y-auto max-h-[80vh] animate-fadeIn">
      <button
        onClick={() => setSelectedCourse(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
      >
        <i className="bi bi-x-lg"></i>
      </button>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {selectedCourse.title}
      </h3>

      {selectedCourse.image_url && (
        <div className="w-full h-auto mb-5 rounded-lg overflow-hidden">
          <ImageWithFallback
            src={selectedCourse.image_url}
            alt={selectedCourse.title}
            fallbackIcon="bi bi-book"
            fallbackGradient="from-purple-400 to-blue-500"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <p className="text-gray-700 text-sm leading-relaxed mb-6 whitespace-pre-line">
        {selectedCourse.description}
      </p>

      {selectedCourse.additional_notes && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 italic">
            <i className="bi bi-info-circle mr-2"></i>
            {selectedCourse.additional_notes}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-700 mb-6">
        <div className="chip chip-purple w-full justify-center">
          <i className="bi bi-clock mr-2"></i> {selectedCourse.duration}
        </div>
        <div className="chip chip-blue w-full justify-center">
          <i className="bi bi-graph-up mr-2"></i> {selectedCourse.level}
        </div>
        <div className="chip chip-green w-full justify-center">
          <i className="bi bi-people mr-2"></i> {selectedCourse.type}
        </div>
        {selectedCourse.modality && (
          <div className="chip chip-indigo w-full justify-center">
            <i className="bi bi-laptop mr-2"></i> {selectedCourse.modality}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Link
          to="/contatti"
          onClick={() => setSelectedCourse(null)}
          className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors text-sm"
        >
          {t("activities.course.bookNow")}
        </Link>
      </div>
    </div>
  </div>
)}

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
