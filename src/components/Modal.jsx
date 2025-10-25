// Componente modale riutilizzabile per mostrare dettagli completi
import React, { useEffect } from 'react';
import { ImageWithFallback } from './ImageWithFallback';

export const Modal = ({ isOpen, onClose, children }) => {
  // Chiudi modale con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Blocca scroll body
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pulsante chiudi */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
          aria-label="Chiudi"
        >
          <i className="bi bi-x-lg text-xl text-gray-700"></i>
        </button>

        {/* Contenuto */}
        {children}
      </div>
    </div>
  );
};

// Modale specifica per Corsi
export const CourseModal = ({ course, isOpen, onClose }) => {
  if (!course) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* Immagine */}
        <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
          <ImageWithFallback
            src={course.image_url}
            alt={course.title}
            fallbackIcon="bi bi-book"
            fallbackGradient="from-purple-400 to-blue-500"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Titolo */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {course.title}
        </h2>

        {/* Descrizione completa */}
        <p className="text-gray-600 mb-6 text-base leading-relaxed whitespace-pre-wrap">
          {course.description}
        </p>

        {/* Informazioni */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center text-purple-700 mb-2">
              <i className="bi bi-clock text-xl mr-2"></i>
              <span className="font-semibold">Durata</span>
            </div>
            <p className="text-gray-700">{course.duration}</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center text-blue-700 mb-2">
              <i className="bi bi-graph-up text-xl mr-2"></i>
              <span className="font-semibold">Livello</span>
            </div>
            <p className="text-gray-700">{course.level}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center text-green-700 mb-2">
              <i className="bi bi-people text-xl mr-2"></i>
              <span className="font-semibold">Tipo</span>
            </div>
            <p className="text-gray-700">{course.type}</p>
          </div>

          {course.modality && (
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex items-center text-indigo-700 mb-2">
                <i className="bi bi-laptop text-xl mr-2"></i>
                <span className="font-semibold">Modalità</span>
              </div>
              <p className="text-gray-700">{course.modality}</p>
            </div>
          )}
        </div>

        {/* Note aggiuntive */}
        {course.additional_notes && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <i className="bi bi-info-circle mr-2"></i>
              Note aggiuntive
            </h3>
            <p className="text-gray-600 whitespace-pre-wrap">{course.additional_notes}</p>
          </div>
        )}

        {/* CTA */}
        <button 
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          onClick={() => {/* TODO: Logica prenotazione */}}
        >
          Prenota Ora
        </button>
      </div>
    </Modal>
  );
};

// Modale specifica per Eventi
export const EventModal = ({ event, isOpen, onClose }) => {
  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* Immagine */}
        <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
          <ImageWithFallback
            src={event.image_url}
            alt={event.title}
            fallbackIcon="bi bi-calendar-event"
            fallbackGradient="from-green-400 to-blue-500"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Titolo */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {event.title}
        </h2>

        {/* Descrizione completa */}
        <p className="text-gray-600 mb-6 text-base leading-relaxed whitespace-pre-wrap">
          {event.description}
        </p>

        {/* Informazioni */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center text-green-700 mb-2">
              <i className="bi bi-calendar text-xl mr-2"></i>
              <span className="font-semibold">Data</span>
            </div>
            <p className="text-gray-700">
              {new Date(event.date).toLocaleDateString('it-IT', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center text-blue-700 mb-2">
              <i className="bi bi-clock text-xl mr-2"></i>
              <span className="font-semibold">Orario</span>
            </div>
            <p className="text-gray-700">{event.time}</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center text-purple-700 mb-2">
              <i className="bi bi-geo-alt text-xl mr-2"></i>
              <span className="font-semibold">Luogo</span>
            </div>
            <p className="text-gray-700">{event.location}</p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center text-indigo-700 mb-2">
              <i className="bi bi-tag text-xl mr-2"></i>
              <span className="font-semibold">Categoria</span>
            </div>
            <p className="text-gray-700">{event.category}</p>
          </div>
        </div>

        {/* CTA */}
        <button 
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          onClick={() => {/* TODO: Logica prenotazione */}}
        >
          Prenota Evento
        </button>
      </div>
    </Modal>
  );
};

// Modale specifica per Settimane Studio
export const StudyWeekModal = ({ studyWeek, isOpen, onClose }) => {
  if (!studyWeek) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        {/* Immagine */}
        <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
          <ImageWithFallback
            src={studyWeek.image_url}
            alt={studyWeek.title}
            fallbackIcon="bi bi-globe"
            fallbackGradient="from-indigo-400 to-purple-500"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Titolo */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {studyWeek.title}
        </h2>

        {/* Descrizione completa */}
        <p className="text-gray-600 mb-6 text-base leading-relaxed whitespace-pre-wrap">
          {studyWeek.description}
        </p>

        {/* Informazioni */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center text-indigo-700 mb-2">
              <i className="bi bi-clock text-xl mr-2"></i>
              <span className="font-semibold">Durata</span>
            </div>
            <p className="text-gray-700">{studyWeek.duration}</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center text-purple-700 mb-2">
              <i className="bi bi-tag text-xl mr-2"></i>
              <span className="font-semibold">Tipo</span>
            </div>
            <p className="text-gray-700">{studyWeek.type}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 col-span-2">
            <div className="flex items-center text-green-700 mb-2">
              <i className="bi bi-geo-alt text-xl mr-2"></i>
              <span className="font-semibold">Città</span>
            </div>
            <p className="text-gray-700">{studyWeek.city}</p>
          </div>
        </div>

        {/* Attività */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
            <i className="bi bi-list-check text-xl mr-2"></i>
            Attività Incluse
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{studyWeek.activities}</p>
        </div>

        {/* CTA */}
        <button 
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          onClick={() => {/* TODO: Logica prenotazione */}}
        >
          Prenota Settimana Studio
        </button>
      </div>
    </Modal>
  );
};

