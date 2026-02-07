// Sistema di debug per il dashboard admin
// Sostituisci il contenuto di src/pages/AdminDashboard.jsx con questo

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabaseService, testSupabaseConnection } from "../lib/supabase";
import { EventPreview, CoursePreview, StudyWeekPreview } from "../components/PreviewCards";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('corsi');
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [studyWeeks, setStudyWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  
  // Modal states
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    itemId: null,
    itemType: null,
    itemTitle: ''
  });
  
  // Edit mode states
  const [editMode, setEditMode] = useState({
    isEditing: false,
    editingId: null,
    editingType: null
  });
  
  // Form states
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    duration: "",
    level: "Principiante",
    type: "Individuale",
    modality: "",
    additional_notes: "",
    image: null
  });
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "18:00",
    location: "",
    description: "",
    category: "Lingue",
    image: null
  });
  
  const [newStudyWeek, setNewStudyWeek] = useState({
    title: "",
    description: "",
    duration: "",
    type: "Intensiva",
    activities: "",
    city: "",
    image: null
  });
  
  const [courseImagePreview, setCourseImagePreview] = useState(null);
  const [eventImagePreview, setEventImagePreview] = useState(null);
  const [studyWeekImagePreview, setStudyWeekImagePreview] = useState(null);
  const navigate = useNavigate();

  // Verifica se l'admin è loggato
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Debug: Test connessione Supabase
  useEffect(() => {
    const testConnection = async () => {
      console.log('🧪 Testing Supabase connection from AdminDashboard...')
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
        console.log('🔄 Starting data load for AdminDashboard...')
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
        console.error('❌ Error loading data in AdminDashboard:', err);
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
        <h3 className="text-sm font-semibold text-blue-800 mb-2">Debug Info - Admin Dashboard</h3>
        <div className="text-xs text-blue-700">
          <p>Connection: {debugInfo.success ? '✅ Success' : '❌ Failed'}</p>
          {debugInfo.error && <p>Error: {debugInfo.error}</p>}
          <p>Data loaded: Courses: {courses.length}, Events: {events.length}, Study Weeks: {studyWeeks.length}</p>
          <p>Admin logged in: {localStorage.getItem("adminLoggedIn") === "true" ? "✅ Yes" : "❌ No"}</p>
        </div>
      </div>
    );
  };

  // Gestione upload immagine
  const handleImageUpload = (file, setter, previewSetter) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewSetter(e.target.result);
        setter(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Gestione aggiunta/modifica corso
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      console.log('➕ Adding/updating course...')
      
      const courseData = {
        title: newCourse.title,
        description: newCourse.description,
        duration: newCourse.duration,
        level: newCourse.level,
        type: newCourse.type,
        modality: newCourse.modality,
        additional_notes: newCourse.additional_notes,
        image_url: newCourse.image
      };
      
      if (editMode.isEditing && editMode.editingType === 'course') {
        // Modifica corso esistente
        const updatedCourse = await supabaseService.updateCorso(editMode.editingId, courseData);
        const updatedCourses = courses.map(course => 
          course.id === editMode.editingId ? updatedCourse : course
        );
        setCourses(updatedCourses);
        cancelEdit();
      } else {
        // Aggiungi nuovo corso
        const addedCourse = await supabaseService.addCorso(courseData);
        setCourses([...courses, addedCourse]);
        
        // Reset form
        setNewCourse({
          title: "",
          description: "",
          duration: "",
          level: "Principiante",
          type: "Individuale",
          modality: "",
          additional_notes: "",
          image: null
        });
        setCourseImagePreview(null);
      }
    } catch (error) {
      console.error('❌ Error in handleAddCourse:', error);
      setError(`Errore nella gestione del corso: ${error.message}`);
    }
  };

  // Gestione aggiunta/modifica evento
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      console.log('➕ Adding/updating event...')
      
      const eventData = {
        title: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.location,
        category: newEvent.category,
        image_url: newEvent.image
      };
      
      if (editMode.isEditing && editMode.editingType === 'event') {
        // Modifica evento esistente
        const updatedEvent = await supabaseService.updateEvento(editMode.editingId, eventData);
        const updatedEvents = events.map(event => 
          event.id === editMode.editingId ? updatedEvent : event
        );
        setEvents(updatedEvents);
        cancelEdit();
      } else {
        // Aggiungi nuovo evento
        const addedEvent = await supabaseService.addEvento(eventData);
        setEvents([...events, addedEvent]);
        
        // Reset form
        setNewEvent({
          title: "",
          date: "",
          time: "18:00",
          location: "",
          description: "",
          category: "Lingue",
          image: null
        });
        setEventImagePreview(null);
      }
    } catch (error) {
      console.error('❌ Error in handleAddEvent:', error);
      setError(`Errore nella gestione dell'evento: ${error.message}`);
    }
  };

  // Gestione aggiunta/modifica settimana studio
  const handleAddStudyWeek = async (e) => {
    e.preventDefault();
    try {
      console.log('➕ Adding/updating study week...')
      
      const studyWeekData = {
        title: newStudyWeek.title,
        description: newStudyWeek.description,
        duration: newStudyWeek.duration,
        type: newStudyWeek.type,
        activities: newStudyWeek.activities,
        city: newStudyWeek.city,
        image_url: newStudyWeek.image
      };
      
      if (editMode.isEditing && editMode.editingType === 'studyWeek') {
        // Modifica settimana esistente
        const updatedStudyWeek = await supabaseService.updateSettimanaStudio(editMode.editingId, studyWeekData);
        const updatedStudyWeeks = studyWeeks.map(studyWeek => 
          studyWeek.id === editMode.editingId ? updatedStudyWeek : studyWeek
        );
        setStudyWeeks(updatedStudyWeeks);
        cancelEdit();
      } else {
        // Aggiungi nuova settimana
        const addedStudyWeek = await supabaseService.addSettimanaStudio(studyWeekData);
        setStudyWeeks([...studyWeeks, addedStudyWeek]);
        
        // Reset form
        setNewStudyWeek({
          title: "",
          description: "",
          duration: "",
          type: "Intensiva",
          activities: "",
          city: "",
          image: null
        });
        setStudyWeekImagePreview(null);
      }
    } catch (error) {
      console.error('❌ Error in handleAddStudyWeek:', error);
      setError(`Errore nella gestione della settimana studio: ${error.message}`);
    }
  };

  // Gestione eliminazione
  const handleDelete = async () => {
    try {
      console.log('🗑️ Deleting item...', deleteModal)
      
      if (deleteModal.itemType === 'course') {
        await supabaseService.deleteCorso(deleteModal.itemId);
        setCourses(courses.filter(course => course.id !== deleteModal.itemId));
      } else if (deleteModal.itemType === 'event') {
        await supabaseService.deleteEvento(deleteModal.itemId);
        setEvents(events.filter(event => event.id !== deleteModal.itemId));
      } else if (deleteModal.itemType === 'studyWeek') {
        await supabaseService.deleteSettimanaStudio(deleteModal.itemId);
        setStudyWeeks(studyWeeks.filter(studyWeek => studyWeek.id !== deleteModal.itemId));
      }
      
      setDeleteModal({ isOpen: false, itemId: null, itemType: null, itemTitle: '' });
    } catch (error) {
      console.error('❌ Error in handleDelete:', error);
      setError(`Errore nell'eliminazione: ${error.message}`);
    }
  };

  // Gestione modifica
  const handleEdit = (item, type) => {
    console.log('✏️ Editing item:', { item, type })
    
    setEditMode({
      isEditing: true,
      editingId: item.id,
      editingType: type
    });
    
    if (type === 'course') {
      setNewCourse({
        title: item.title,
        description: item.description,
        duration: item.duration,
        level: item.level,
        type: item.type,
        modality: item.modality || "",
        additional_notes: item.additional_notes || "",
        image: item.image_url
      });
      setCourseImagePreview(item.image_url);
    } else if (type === 'event') {
      setNewEvent({
        title: item.title,
        description: item.description,
        date: item.date,
        time: item.time,
        location: item.location,
        category: item.category,
        image: item.image_url
      });
      setEventImagePreview(item.image_url);
    } else if (type === 'studyWeek') {
      setNewStudyWeek({
        title: item.title,
        description: item.description,
        duration: item.duration,
        type: item.type,
        activities: item.activities,
        city: item.city,
        image: item.image_url
      });
      setStudyWeekImagePreview(item.image_url);
    }
  };

  // Annulla modifica
  const cancelEdit = () => {
    setEditMode({ isEditing: false, editingId: null, editingType: null });
    setNewCourse({
      title: "",
      description: "",
      duration: "",
      level: "Principiante",
      type: "Individuale",
      modality: "",
      additional_notes: "",
      image: null
    });
    setNewEvent({
      title: "",
      date: "",
      time: "18:00",
      location: "",
      description: "",
      category: "Lingue",
      image: null
    });
    setNewStudyWeek({
      title: "",
      description: "",
      duration: "",
      type: "Intensiva",
      activities: "",
      city: "",
      image: null
    });
    setCourseImagePreview(null);
    setEventImagePreview(null);
    setStudyWeekImagePreview(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Debug Info */}
      <DebugInfo />
      
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mx-4">
          <h3 className="text-sm font-semibold text-red-800 mb-2">Errore</h3>
          <p className="text-red-700 text-sm">{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="mt-2 text-red-600 hover:text-red-800 text-sm"
          >
            Chiudi
          </button>
        </div>
      )}

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard Amministratore
          </h1>
          <p className="text-gray-600">
            Gestisci corsi, eventi e settimane studio
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
              Corsi ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab('eventi')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'eventi'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Eventi ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('settimane')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'settimane'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Settimane Studio ({studyWeeks.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white/70 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editMode.isEditing ? 'Modifica' : 'Aggiungi'} {activeTab === 'corsi' ? 'Corso' : activeTab === 'eventi' ? 'Evento' : 'Settimana Studio'}
            </h2>
            
            {activeTab === 'corsi' && (
              <form onSubmit={handleAddCourse} className="space-y-4">
                <input
                  type="text"
                  placeholder="Titolo del corso"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <textarea
                  placeholder="Descrizione"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="3"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Durata"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <select
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzato">Avanzato</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newCourse.type}
                    onChange={(e) => setNewCourse({...newCourse, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Individuale">Individuale</option>
                    <option value="Gruppo">Gruppo</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Modalità (es. Online, Presenza)"
                    value={newCourse.modality}
                    onChange={(e) => setNewCourse({...newCourse, modality: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <textarea
                  placeholder="Note aggiuntive"
                  value={newCourse.additional_notes}
                  onChange={(e) => setNewCourse({...newCourse, additional_notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="2"
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {editMode.isEditing ? 'Aggiorna' : 'Aggiungi'} Corso
                  </button>
                  {editMode.isEditing && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annulla
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* Forms per eventi e settimane studio simili... */}
          </div>

          {/* Lista */}
          <div className="bg-white/70 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {activeTab === 'corsi' ? 'Corsi' : activeTab === 'eventi' ? 'Eventi' : 'Settimane Studio'}
            </h2>
            
            <div className="space-y-4">
              {activeTab === 'corsi' && courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg p-4 shadow-sm border">
                  <h3 className="font-semibold text-gray-800">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleEdit(course, 'course')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Modifica
                    </button>
                    <button
                      onClick={() => setDeleteModal({
                        isOpen: true,
                        itemId: course.id,
                        itemType: 'course',
                        itemTitle: course.title
                      })}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              ))}
              
              {activeTab === 'corsi' && courses.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  Nessun corso aggiunto ancora
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal di conferma eliminazione */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, itemId: null, itemType: null, itemTitle: '' })}
        onConfirm={handleDelete}
        itemType={deleteModal.itemType}
        itemTitle={deleteModal.itemTitle}
      />
    </div>
  );
};

export default AdminDashboard;
