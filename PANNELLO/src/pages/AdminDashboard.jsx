import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabaseService, testSupabaseConnection } from '../lib/supabase.js'
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal.jsx'
import { ImageWithFallback } from '../components/ImageWithFallback.jsx'
import { EventPreview, CoursePreview, StudyWeekPreview } from '../components/PreviewCards.jsx'

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('corsi')
  const [courses, setCourses] = useState([])
  const [events, setEvents] = useState([])
  const [studyWeeks, setStudyWeeks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [debug, setDebug] = useState(null)

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, itemId: null, itemType: null, itemTitle: '' })
  const [editMode, setEditMode] = useState({ isEditing: false, editingId: null, editingType: null })

  const [newCourse, setNewCourse] = useState({ title: '', description: '', duration: '', level: 'Principiante', type: 'Individuale', modality: '', additional_notes: '', image: null })
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '18:00', location: '', description: '', category: 'Lingue', image: null })
  const [newStudyWeek, setNewStudyWeek] = useState({ title: '', description: '', duration: '', type: 'Intensiva', activities: '', city: '', image: null })

  const [courseImagePreview, setCourseImagePreview] = useState(null)
  const [eventImagePreview, setEventImagePreview] = useState(null)
  const [studyWeekImagePreview, setStudyWeekImagePreview] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (isLoggedIn !== 'true') navigate('/login')
  }, [navigate])

  useEffect(() => {
    const boot = async () => {
      setLoading(true)
      setError(null)
      const test = await testSupabaseConnection().catch(() => ({ success: false }))
      setDebug(test)
      try {
        const [c, e, s] = await Promise.all([
          supabaseService.getCorsi(),
          supabaseService.getEventi(),
          supabaseService.getSettimaneStudio(),
        ])
        setCourses(c || [])
        setEvents(e || [])
        setStudyWeeks(s || [])
      } catch (err) {
        setError('Errore nel caricamento dei dati. Verifica configurazione Supabase.')
      } finally {
        setLoading(false)
      }
    }
    boot()
  }, [])

  const handleImageUpload = (file, setter, previewSetter) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      previewSetter(e.target.result)
      setter((prev) => ({ ...prev, image: e.target.result }))
    }
    reader.readAsDataURL(file)
  }

  const cancelEdit = () => {
    setEditMode({ isEditing: false, editingId: null, editingType: null })
    setNewCourse({ title: '', description: '', duration: '', level: 'Principiante', type: 'Individuale', modality: '', additional_notes: '', image: null })
    setNewEvent({ title: '', date: '', time: '18:00', location: '', description: '', category: 'Lingue', image: null })
    setNewStudyWeek({ title: '', description: '', duration: '', type: 'Intensiva', activities: '', city: '', image: null })
    setCourseImagePreview(null)
    setEventImagePreview(null)
    setStudyWeekImagePreview(null)
  }

  const handleAddCourse = async (e) => {
    e.preventDefault()
    try {
      const payload = { title: newCourse.title, description: newCourse.description, duration: newCourse.duration, level: newCourse.level, type: newCourse.type, modality: newCourse.modality, additional_notes: newCourse.additional_notes, image_url: newCourse.image }
      if (editMode.isEditing && editMode.editingType === 'course') {
        const updated = await supabaseService.updateCorso(editMode.editingId, payload)
        setCourses((prev) => prev.map((x) => (x.id === editMode.editingId ? updated : x)))
        cancelEdit()
      } else {
        const added = await supabaseService.addCorso(payload)
        setCourses((prev) => [...prev, added])
        cancelEdit()
      }
    } catch (err) {
      setError(err?.message || 'Errore nella gestione del corso')
    }
  }

  const handleAddEvent = async (e) => {
    e.preventDefault()
    try {
      if (!newEvent.time || !/^\d{2}:\d{2}$/.test(newEvent.time)) {
        alert('Inserisci un orario valido nel formato HH:MM')
        return
      }
      const payload = { title: newEvent.title, description: newEvent.description, date: newEvent.date, time: newEvent.time, location: newEvent.location, category: newEvent.category, image_url: newEvent.image }
      if (editMode.isEditing && editMode.editingType === 'event') {
        const updated = await supabaseService.updateEvento(editMode.editingId, payload)
        setEvents((prev) => prev.map((x) => (x.id === editMode.editingId ? updated : x)))
        cancelEdit()
      } else {
        const added = await supabaseService.addEvento(payload)
        setEvents((prev) => [...prev, added])
        cancelEdit()
      }
    } catch (err) {
      setError(err?.message || "Errore nella gestione dell'evento")
    }
  }

  const handleAddStudyWeek = async (e) => {
    e.preventDefault()
    try {
      const payload = { title: newStudyWeek.title, description: newStudyWeek.description, duration: newStudyWeek.duration, type: newStudyWeek.type, city: newStudyWeek.city, activities: newStudyWeek.activities, image_url: newStudyWeek.image }
      if (editMode.isEditing && editMode.editingType === 'studyWeek') {
        const updated = await supabaseService.updateSettimanaStudio(editMode.editingId, payload)
        setStudyWeeks((prev) => prev.map((x) => (x.id === editMode.editingId ? updated : x)))
        cancelEdit()
      } else {
        const added = await supabaseService.addSettimanaStudio(payload)
        setStudyWeeks((prev) => [...prev, added])
        cancelEdit()
      }
    } catch (err) {
      setError(err?.message || 'Errore nella gestione della settimana studio')
    }
  }

  const openDeleteModal = (id, type, title) => setDeleteModal({ isOpen: true, itemId: id, itemType: type, itemTitle: title })
  const closeDeleteModal = () => setDeleteModal({ isOpen: false, itemId: null, itemType: null, itemTitle: '' })
  const confirmDelete = async () => {
    try {
      if (!deleteModal.itemId || !deleteModal.itemType) return
      if (deleteModal.itemType === 'course') {
        await supabaseService.deleteCorso(deleteModal.itemId)
        setCourses((prev) => prev.filter((x) => x.id !== deleteModal.itemId))
      } else if (deleteModal.itemType === 'event') {
        await supabaseService.deleteEvento(deleteModal.itemId)
        setEvents((prev) => prev.filter((x) => x.id !== deleteModal.itemId))
      } else if (deleteModal.itemType === 'studyWeek') {
        await supabaseService.deleteSettimanaStudio(deleteModal.itemId)
        setStudyWeeks((prev) => prev.filter((x) => x.id !== deleteModal.itemId))
      }
      closeDeleteModal()
    } catch (err) {
      setError(err?.message || "Errore nell'eliminazione")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mx-4">
          <h3 className="text-sm font-semibold text-red-800 mb-2">Errore</h3>
          <p className="text-red-700 text-sm">{error}</p>
          <button onClick={() => setError(null)} className="mt-2 text-red-600 hover:text-red-800 text-sm">Chiudi</button>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Pannello di Controllo</h1>
            <p className="text-gray-600 text-sm">Gestisci corsi, eventi e settimane formative</p>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => { localStorage.removeItem('adminLoggedIn'); localStorage.removeItem('adminUsername'); localStorage.removeItem('adminEmail'); navigate('/login') }} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">Logout</button>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white/80 rounded-full p-2 shadow-lg inline-block">
            <div className="flex space-x-2">
              <button onClick={() => setActiveTab('corsi')} className={`px-6 py-3 rounded-full font-medium ${activeTab === 'corsi' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-purple-100'}`}>Corsi</button>
              <button onClick={() => setActiveTab('eventi')} className={`px-6 py-3 rounded-full font-medium ${activeTab === 'eventi' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-purple-100'}`}>Eventi</button>
              <button onClick={() => setActiveTab('settimane')} className={`px-6 py-3 rounded-full font-medium ${activeTab === 'settimane' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-purple-100'}`}>Settimane Formative</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/90 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {activeTab === 'corsi' && (editMode.isEditing && editMode.editingType === 'course' ? 'Modifica Corso' : 'Aggiungi Nuovo Corso')}
              {activeTab === 'eventi' && (editMode.isEditing && editMode.editingType === 'event' ? 'Modifica Evento' : 'Aggiungi Nuovo Evento')}
              {activeTab === 'settimane' && (editMode.isEditing && editMode.editingType === 'studyWeek' ? 'Modifica Settimana Studio' : 'Aggiungi Nuova Settimana Studio')}
            </h2>

            {activeTab === 'corsi' && (
              <form onSubmit={handleAddCourse} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titolo del Corso</label>
                  <input type="text" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                  <textarea value={newCourse.description} onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durata</label>
                    <input type="text" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} placeholder="es. 1 ora, 2 ore" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Livello</label>
                    <input type="text" value={newCourse.level} onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })} placeholder="es. Principiante, Intermedio, Avanzato" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo di Corso</label>
                  <input type="text" value={newCourse.type} onChange={(e) => setNewCourse({ ...newCourse, type: e.target.value })} placeholder="es. Individuale, Gruppo, Semi-privato" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Modalità</label>
                  <input type="text" value={newCourse.modality} onChange={(e) => setNewCourse({ ...newCourse, modality: e.target.value })} placeholder="es. Online, In presenza, Blended" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Note Aggiuntive</label>
                  <textarea value={newCourse.additional_notes} onChange={(e) => setNewCourse({ ...newCourse, additional_notes: e.target.value })} placeholder="Note aggiuntive sul corso (opzionale)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Immagine</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], setNewCourse, setCourseImagePreview)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  {courseImagePreview && <div className="mt-4"><img src={courseImagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" /></div>}
                </div>
                <div className="flex space-x-3">
                  <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">{editMode.isEditing && editMode.editingType === 'course' ? 'Modifica Corso' : 'Aggiungi Corso'}</button>
                  {editMode.isEditing && editMode.editingType === 'course' && <button type="button" onClick={cancelEdit} className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium">Annulla</button>}
                </div>
              </form>
            )}

            {activeTab === 'eventi' && (
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titolo dell'Evento</label>
                  <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                    <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Orario</label>
                    <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Luogo</label>
                  <input type="text" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <input type="text" value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} placeholder="es. Lingue, Benessere, Cultura, Workshop" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                  <textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Immagine</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], setNewEvent, setEventImagePreview)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  {eventImagePreview && <div className="mt-4"><img src={eventImagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" /></div>}
                </div>
                <div className="flex space-x-3">
                  <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">{editMode.isEditing && editMode.editingType === 'event' ? 'Modifica Evento' : 'Aggiungi Evento'}</button>
                  {editMode.isEditing && editMode.editingType === 'event' && <button type="button" onClick={cancelEdit} className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium">Annulla</button>}
                </div>
              </form>
            )}

            {activeTab === 'settimane' && (
              <form onSubmit={handleAddStudyWeek} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titolo della Settimana</label>
                  <input type="text" value={newStudyWeek.title} onChange={(e) => setNewStudyWeek({ ...newStudyWeek, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                  <textarea value={newStudyWeek.description} onChange={(e) => setNewStudyWeek({ ...newStudyWeek, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durata</label>
                    <input type="text" value={newStudyWeek.duration} onChange={(e) => setNewStudyWeek({ ...newStudyWeek, duration: e.target.value })} placeholder="es. 5 giorni, 1 settimana" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                    <input type="text" value={newStudyWeek.type} onChange={(e) => setNewStudyWeek({ ...newStudyWeek, type: e.target.value })} placeholder="es. Intensiva, Culturale, Mista" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Città di Destinazione</label>
                  <input type="text" value={newStudyWeek.city} onChange={(e) => setNewStudyWeek({ ...newStudyWeek, city: e.target.value })} placeholder="es. Londra, Parigi, Madrid..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attività Incluse</label>
                  <textarea value={newStudyWeek.activities} onChange={(e) => setNewStudyWeek({ ...newStudyWeek, activities: e.target.value })} placeholder="Descrivi le attività incluse nella settimana..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Immagine</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files[0], setNewStudyWeek, setStudyWeekImagePreview)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  {studyWeekImagePreview && <div className="mt-4"><img src={studyWeekImagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" /></div>}
                </div>
                <div className="flex space-x-3">
                  <button type="submit" className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">{editMode.isEditing && editMode.editingType === 'studyWeek' ? 'Modifica Settimana Studio' : 'Aggiungi Settimana Studio'}</button>
                  {editMode.isEditing && editMode.editingType === 'studyWeek' && <button type="button" onClick={cancelEdit} className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium">Annulla</button>}
                </div>
              </form>
            )}
          </div>

          <div className="bg-white/90 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Anteprima Card</h2>
            <div className="sticky top-4">
              {activeTab === 'corsi' && <CoursePreview courseData={newCourse} />}
              {activeTab === 'eventi' && <EventPreview eventData={newEvent} />}
              {activeTab === 'settimane' && <StudyWeekPreview studyWeekData={newStudyWeek} />}
            </div>
          </div>
        </div>

        <h3 className="text-3xl text-center font-semibold text-gray-800 mb-6">Anteprime</h3>
        <div className="bg-white/90 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {activeTab === 'corsi' && `Corsi (${courses.length})`}
            {activeTab === 'eventi' && `Eventi (${events.length})`}
            {activeTab === 'settimane' && `Skill Up Camps (${studyWeeks.length})`}
          </h2>

          <div className="space-y-6">
            {activeTab === 'corsi' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white/65 rounded-2xl shadow-xl p-6 border relative">
                    <div className="text-center">
                      <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
                        <ImageWithFallback src={course.image_url} alt={course.title} fallbackIcon="bi bi-book" fallbackGradient="from-purple-400 to-blue-500" className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                      <div className="grid space-y-2 mb-4">
                        <div className="chip chip-purple"><i className="bi bi-clock mr-2"></i><span>{course.duration}</span></div>
                        <div className="chip chip-blue"><i className="bi bi-graph-up mr-2"></i><span>{course.level}</span></div>
                        <div className="chip chip-green"><i className="bi bi-people mr-2"></i><span>{course.type}</span></div>
                        {course.modality && <div className="chip chip-indigo"><i className="bi bi-laptop mr-2"></i><span>{course.modality}</span></div>}
                      </div>
                      <div className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium text-sm inline-block mb-2">Prenota Ora</div>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button onClick={() => { setEditMode({ isEditing: true, editingId: course.id, editingType: 'course' }); setNewCourse({ title: course.title, description: course.description, duration: course.duration, level: course.level, type: course.type, modality: course.modality || '', additional_notes: course.additional_notes || '', image: course.image_url }); setCourseImagePreview(course.image_url); setActiveTab('corsi') }} className="text-blue-500 hover:text-blue-700 bg-white/80 rounded-full p-2 shadow-lg" title="Modifica corso"><i className="bi bi-pencil"></i></button>
                      <button onClick={() => openDeleteModal(course.id, 'course', course.title)} className="text-red-500 hover:text-red-700 bg-white/80 rounded-full p-2 shadow-lg" title="Elimina corso"><i className="bi bi-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'eventi' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white/65 rounded-2xl shadow-xl p-6 border relative">
                    <div className="text-center">
                      <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
                        <ImageWithFallback src={event.image_url} alt={event.title} fallbackIcon="bi bi-calendar-event" fallbackGradient="from-green-400 to-blue-500" className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{event.description}</p>
                      <div className="flex flex-col space-y-2 mb-4">
                        <div className="chip chip-green"><i className="bi bi-calendar mr-2"></i><span>{new Date(event.date).toLocaleDateString('it-IT')}</span></div>
                        <div className="chip chip-blue"><i className="bi bi-clock mr-2"></i><span>{event.time}</span></div>
                        <div className="chip chip-purple"><i className="bi bi-geo-alt mr-2"></i><span>{event.location}</span></div>
                        <div className="chip chip-indigo"><i className="bi bi-tag mr-2"></i><span>{event.category}</span></div>
                      </div>
                      <div className="bg-green-600 text-white px-6 py-2 rounded-full font-medium text-sm inline-block mb-2">Prenota Ora</div>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button onClick={() => { setEditMode({ isEditing: true, editingId: event.id, editingType: 'event' }); setNewEvent({ title: event.title, description: event.description, date: event.date, time: event.time, location: event.location, category: event.category, image: event.image_url }); setEventImagePreview(event.image_url); setActiveTab('eventi') }} className="text-blue-500 hover:text-blue-700 bg-white/80 rounded-full p-2 shadow-lg" title="Modifica evento"><i className="bi bi-pencil"></i></button>
                      <button onClick={() => openDeleteModal(event.id, 'event', event.title)} className="text-red-500 hover:text-red-700 bg-white/80 rounded-full p-2 shadow-lg" title="Elimina evento"><i className="bi bi-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settimane' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyWeeks.map((week) => (
                  <div key={week.id} className="bg-white/65 rounded-2xl shadow-xl p-6 border relative">
                    <div className="text-center">
                      <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
                        <ImageWithFallback src={week.image_url} alt={week.title} fallbackIcon="bi bi-globe" fallbackGradient="from-indigo-400 to-purple-500" className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{week.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{week.description}</p>
                      <div className="grid space-y-2 mb-4">
                        <div className="chip chip-indigo"><i className="bi bi-clock mr-2"></i><span>{week.duration}</span></div>
                        <div className="chip chip-purple"><i className="bi bi-tag mr-2"></i><span>{week.type}</span></div>
                        <div className="chip chip-green"><i className="bi bi-geo-alt mr-2"></i><span>{week.city}</span></div>
                        <div className="chip chip-blue"><i className="bi bi-list-check mr-2"></i><span className="truncate">{week.activities}</span></div>
                      </div>
                      <div className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium text-sm inline-block mb-2">Prenota Settimana</div>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button onClick={() => { setEditMode({ isEditing: true, editingId: week.id, editingType: 'studyWeek' }); setNewStudyWeek({ title: week.title, description: week.description, duration: week.duration, type: week.type, activities: week.activities, city: week.city, image: week.image_url }); setStudyWeekImagePreview(week.image_url); setActiveTab('settimane') }} className="text-blue-500 hover:text-blue-700 bg-white/80 rounded-full p-2 shadow-lg" title="Modifica settimana studio"><i className="bi bi-pencil"></i></button>
                      <button onClick={() => openDeleteModal(week.id, 'studyWeek', week.title)} className="text-red-500 hover:text-red-700 bg-white/80 rounded-full p-2 shadow-lg" title="Elimina settimana studio"><i className="bi bi-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'corsi' && courses.length === 0 && (
              <div className="text-center text-gray-500 py-8"><i className="bi bi-book text-4xl mb-4"></i><p>Nessun corso aggiunto ancora</p></div>
            )}
            {activeTab === 'eventi' && events.length === 0 && (
              <div className="text-center text-gray-500 py-8"><i className="bi bi-calendar-event text-4xl mb-4"></i><p>Nessun evento aggiunto ancora</p></div>
            )}
            {activeTab === 'settimane' && studyWeeks.length === 0 && (
              <div className="text-center text-gray-500 py-8"><i className="bi bi-globe text-4xl mb-4"></i><p>Nessuna settimana studio aggiunta ancora</p></div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDeleteModal isOpen={deleteModal.isOpen} onClose={closeDeleteModal} onConfirm={confirmDelete} itemType={deleteModal.itemType} itemTitle={deleteModal.itemTitle} />
    </div>
  )
}
