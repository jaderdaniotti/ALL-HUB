// Piccole card di anteprima per i form (non salvano dati)
import React from 'react'
import { ImageWithFallback } from './ImageWithFallback.jsx'

export const EventPreview = ({ eventData }) => {
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''
  return (
    <div className="bg-white/65 rounded-2xl shadow-xl p-6 border">
      <div className="text-center">
        <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
          <ImageWithFallback src={eventData.image} alt={eventData.title || 'Evento'} fallbackIcon="bi bi-calendar-event" fallbackGradient="from-green-400 to-blue-500" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{eventData.title || "Titolo dell'evento"}</h3>
        <p className="text-gray-600 mb-4 text-sm">{eventData.description || "Descrizione dell'evento..."}</p>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="chip chip-green"><i className="bi bi-calendar mr-2"></i><span>{formatDate(eventData.date) || 'Data da definire'}</span></div>
          <div className="chip chip-blue"><i className="bi bi-clock mr-2"></i><span>{eventData.time || 'Orario da definire'}</span></div>
          <div className="chip chip-purple"><i className="bi bi-geo-alt mr-2"></i><span>{eventData.location || 'Luogo da definire'}</span></div>
          <div className="chip chip-indigo"><i className="bi bi-tag mr-2"></i><span>{eventData.category || 'Categoria'}</span></div>
        </div>
        <div className="bg-green-600 text-white px-6 py-2 rounded-full text-sm inline-block">Prenota Ora</div>
      </div>
    </div>
  )
}

export const CoursePreview = ({ courseData }) => (
  <div className="bg-white/65 rounded-2xl shadow-xl p-6 border">
    <div className="text-center">
      <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
        <ImageWithFallback src={courseData.image} alt={courseData.title || 'Corso'} fallbackIcon="bi bi-book" fallbackGradient="from-purple-400 to-blue-500" className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{courseData.title || 'Titolo del corso'}</h3>
      <p className="text-gray-600 mb-4 text-sm">{courseData.description || 'Descrizione del corso...'}</p>
      <div className="grid space-y-2 mb-4">
        <div className="chip chip-purple"><i className="bi bi-clock mr-2"></i><span>{courseData.duration || 'Durata da definire'}</span></div>
        <div className="chip chip-blue"><i className="bi bi-graph-up mr-2"></i><span>{courseData.level || 'Livello da definire'}</span></div>
        <div className="chip chip-green"><i className="bi bi-people mr-2"></i><span>{courseData.type || 'Tipo da definire'}</span></div>
      </div>
      <div className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm inline-block">Prenota Ora</div>
    </div>
  </div>
)

export const StudyWeekPreview = ({ studyWeekData }) => (
  <div className="bg-white/65 rounded-2xl shadow-xl p-6 border">
    <div className="text-center">
      <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
        <ImageWithFallback src={studyWeekData.image} alt={studyWeekData.title || 'Settimana Studio'} fallbackIcon="bi bi-globe" fallbackGradient="from-indigo-400 to-purple-500" className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{studyWeekData.title || 'Titolo della settimana'}</h3>
      <p className="text-gray-600 mb-4 text-sm">{studyWeekData.description || 'Descrizione della settimana...'}</p>
      <div className="grid space-y-2 mb-4">
        <div className="chip chip-indigo"><i className="bi bi-clock mr-2"></i><span>{studyWeekData.duration || 'Durata da definire'}</span></div>
        <div className="chip chip-purple"><i className="bi bi-tag mr-2"></i><span>{studyWeekData.type || 'Tipo da definire'}</span></div>
        <div className="chip chip-green"><i className="bi bi-geo-alt mr-2"></i><span>{studyWeekData.city || 'Città da definire'}</span></div>
        <div className="chip chip-blue"><i className="bi bi-list-check mr-2"></i><span className="truncate">{studyWeekData.activities || 'Attività da definire'}</span></div>
      </div>
      <div className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm inline-block">Prenota Settimana</div>
    </div>
  </div>
)
