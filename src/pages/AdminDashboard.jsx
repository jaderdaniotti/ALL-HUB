import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from 'react-i18next'; // Non utilizzato al momento
import { supabaseService } from "../lib/supabase";
import { EventPreview, CoursePreview, StudyWeekPreview } from "../components/PreviewCards";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

const AdminDashboard = () => {
  // const { t } = useTranslation(); // Non utilizzato al momento
  const [activeTab, setActiveTab] = useState('corsi');
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);
  const [studyWeeks, setStudyWeeks] = useState([]);
  
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
    time: "",
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

  // Carica dati da Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesData, eventsData, studyWeeksData] = await Promise.all([
          supabaseService.getCorsi(),
          supabaseService.getEventi(),
          supabaseService.getSettimaneStudio()
        ]);
        
        setCourses(coursesData);
        setEvents(eventsData);
        setStudyWeeks(studyWeeksData);
      } catch (error) {
        console.error('Errore nel caricamento dati:', error);
      }
    };

    loadData();
  }, []);

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
      console.error('Errore nella gestione del corso:', error);
    }
  };

  // Gestione aggiunta/modifica evento
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
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
        time: "",
        location: "",
        description: "",
        category: "Lingue",
        image: null
      });
      setEventImagePreview(null);
      }
    } catch (error) {
      console.error('Errore nella gestione dell\'evento:', error);
    }
  };

  // Gestione aggiunta/modifica settimana studio
  const handleAddStudyWeek = async (e) => {
    e.preventDefault();
    
    try {
      const studyWeekData = {
        title: newStudyWeek.title,
        description: newStudyWeek.description,
        duration: newStudyWeek.duration,
        type: newStudyWeek.type,
        city: newStudyWeek.city,
        activities: newStudyWeek.activities,
        image_url: newStudyWeek.image
      };
      
      if (editMode.isEditing && editMode.editingType === 'studyWeek') {
        // Modifica settimana studio esistente
        const updatedStudyWeek = await supabaseService.updateSettimanaStudio(editMode.editingId, studyWeekData);
        const updatedStudyWeeks = studyWeeks.map(week => 
          week.id === editMode.editingId ? updatedStudyWeek : week
        );
        setStudyWeeks(updatedStudyWeeks);
        cancelEdit();
      } else {
        // Aggiungi nuova settimana studio
        const addedStudyWeek = await supabaseService.addSettimanaStudio(studyWeekData);
        setStudyWeeks([...studyWeeks, addedStudyWeek]);
        
        // Reset form
        setNewStudyWeek({
          title: "",
          description: "",
          duration: "",
          type: "Intensiva",
          city: "",
          activities: "",
          image: null
        });
        setStudyWeekImagePreview(null);
      }
    } catch (error) {
      console.error('Errore nella gestione della settimana studio:', error);
    }
  };

  // Gestione eliminazione
  const handleDelete = async (id, type) => {
    try {
      if (type === 'course') {
        await supabaseService.deleteCorso(id);
        const updatedCourses = courses.filter(course => course.id !== id);
        setCourses(updatedCourses);
      } else if (type === 'event') {
        await supabaseService.deleteEvento(id);
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
      } else if (type === 'studyWeek') {
        await supabaseService.deleteSettimanaStudio(id);
        const updatedStudyWeeks = studyWeeks.filter(week => week.id !== id);
        setStudyWeeks(updatedStudyWeeks);
      }
    } catch (error) {
      console.error('Errore nell\'eliminazione:', error);
    }
  };

  // Gestione logout
  const handleLogout = () => {
    if (window.confirm("Sei sicuro di voler uscire dal pannello admin?")) {
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminUsername");
      localStorage.removeItem("adminEmail");
      
      // Notifica il cambio di stato alla navbar
      window.dispatchEvent(new Event('storage'));
      
      navigate("/");
    }
  };

  // Funzione per aprire la modale di conferma eliminazione
  const openDeleteModal = (id, type, title) => {
    setDeleteModal({
      isOpen: true,
      itemId: id,
      itemType: type,
      itemTitle: title
    });
  };

  // Funzione per chiudere la modale
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      itemId: null,
      itemType: null,
      itemTitle: ''
    });
  };

  // Funzione per confermare l'eliminazione
  const confirmDelete = async () => {
    if (deleteModal.itemId && deleteModal.itemType) {
      await handleDelete(deleteModal.itemId, deleteModal.itemType);
      closeDeleteModal();
    }
  };

  // Funzione per modificare un elemento
  const handleEdit = (item, type) => {
    // Imposta la modalità di modifica
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
      setActiveTab('corsi');
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
      setActiveTab('eventi');
    } else if (type === 'studyWeek') {
      setNewStudyWeek({
        title: item.title,
        description: item.description,
        duration: item.duration,
        type: item.type,
        city: item.city,
        activities: item.activities,
        image: item.image_url
      });
      setActiveTab('settimane');
    }
    
    // Scroll to top per vedere il form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Funzione per cancellare la modalità di modifica
  const cancelEdit = () => {
    setEditMode({
      isEditing: false,
      editingId: null,
      editingType: null
    });
    
    // Reset dei form
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
      time: "",
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
      city: "",
      activities: "",
      image: null
    });
    
    // Reset delle preview delle immagini
    setCourseImagePreview(null);
    setEventImagePreview(null);
    setStudyWeekImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-white/80">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Pannello di Controllo</h1>
              <p className="text-gray-600">Gestisci corsi, eventi e settimane formative</p>
            </div>
            <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              Torna al Sito
            </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
                title="Logout"
              >
                <i className="bi bi-box-arrow-right mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white/80 rounded-full p-2 shadow-lg inline-block">
            <div className="flex space-x-2">
              <button 
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'corsi' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 hover:bg-purple-100'
                }`}
                onClick={() => setActiveTab('corsi')}
              >
                Corsi
              </button>
              <button 
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'eventi' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 hover:bg-purple-100'
                }`}
                onClick={() => setActiveTab('eventi')}
              >
                Eventi
              </button>
              <button 
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'settimane' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 hover:bg-purple-100'
                }`}
                onClick={() => setActiveTab('settimane')}
              >
                Settimane Formative
              </button>
            </div>
          </div>
        </div>

        {/* Form e Anteprima */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Form Section */}
          <div className="bg-white/90 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {activeTab === 'corsi' && (editMode.isEditing && editMode.editingType === 'course' ? 'Modifica Corso' : 'Aggiungi Nuovo Corso')}
              {activeTab === 'eventi' && (editMode.isEditing && editMode.editingType === 'event' ? 'Modifica Evento' : 'Aggiungi Nuovo Evento')}
              {activeTab === 'settimane' && (editMode.isEditing && editMode.editingType === 'studyWeek' ? 'Modifica Settimana Studio' : 'Aggiungi Nuova Settimana Studio')}
            </h2>

            {/* Form Corsi */}
            {activeTab === 'corsi' && (
              <form onSubmit={handleAddCourse} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titolo del Corso
                  </label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrizione
                  </label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durata
                    </label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                      placeholder="es. 1 ora, 2 ore"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Livello
                    </label>
                    <select
                      value={newCourse.level}
                      onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                    >
                        <option value="Principiante">Principiante</option>
                        <option value="Da base a intermedio">Da base a intermedio</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Da intermedio ad avanzato">Da intermedio ad avanzato</option>
                        <option value="Da base ad avanzato">Da base ad avanzato</option>
                        <option value="Avanzato">Avanzato</option>
                        <option value="Base">Base</option>
                        <option value="Esperto">Esperto</option>
                        <option value="Principiante Assoluto">Principiante Assoluto</option>
                        <option value="Principiante con Basi">Principiante con Basi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo di Corso
                  </label>
                  <select
                    value={newCourse.type}
                    onChange={(e) => setNewCourse({...newCourse, type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Individuale">Individuale</option>
                    <option value="Gruppo">Gruppo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Modalità
                  </label>
                  <select
                    value={newCourse.modality}
                    onChange={(e) => setNewCourse({...newCourse, modality: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Seleziona modalità</option>
                    <option value="Online">Online</option>
                    <option value="In presenza">In presenza</option>
                    <option value="Blended">Blended</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note Aggiuntive
                  </label>
                  <textarea
                    value={newCourse.additional_notes}
                    onChange={(e) => setNewCourse({...newCourse, additional_notes: e.target.value})}
                    placeholder="Note aggiuntive sul corso (opzionale)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Immagine
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], setNewCourse, setCourseImagePreview)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {courseImagePreview && (
                    <div className="mt-4">
                      <img src={courseImagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                <button
                  type="submit"
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                    {editMode.isEditing && editMode.editingType === 'course' ? 'Modifica Corso' : 'Aggiungi Corso'}
                </button>
                  {editMode.isEditing && editMode.editingType === 'course' && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    >
                      Annulla
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* Form Eventi */}
            {activeTab === 'eventi' && (
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titolo dell'Evento
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Orario
                    </label>
                    <input
                      type="text"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      placeholder="es. 18:00 - 19:30"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Luogo
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Lingue">Lingue</option>
                    <option value="Benessere">Benessere</option>
                    <option value="Cultura">Cultura</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrizione
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Immagine
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], setNewEvent, setEventImagePreview)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {eventImagePreview && (
                    <div className="mt-4">
                      <img src={eventImagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                <button
                  type="submit"
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                    {editMode.isEditing && editMode.editingType === 'event' ? 'Modifica Evento' : 'Aggiungi Evento'}
                </button>
                  {editMode.isEditing && editMode.editingType === 'event' && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    >
                      Annulla
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* Form Skill Up Camps */}
            {activeTab === 'settimane' && (
              <form onSubmit={handleAddStudyWeek} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titolo della Settimana
                  </label>
                  <input
                    type="text"
                    value={newStudyWeek.title}
                    onChange={(e) => setNewStudyWeek({...newStudyWeek, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrizione
                  </label>
                  <textarea
                    value={newStudyWeek.description}
                    onChange={(e) => setNewStudyWeek({...newStudyWeek, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durata
                    </label>
                    <input
                      type="text"
                      value={newStudyWeek.duration}
                      onChange={(e) => setNewStudyWeek({...newStudyWeek, duration: e.target.value})}
                      placeholder="es. 5 giorni, 1 settimana"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo
                    </label>
                    <select
                      value={newStudyWeek.type}
                      onChange={(e) => setNewStudyWeek({...newStudyWeek, type: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Intensiva">Intensiva</option>
                      <option value="Culturale">Culturale</option>
                      <option value="Mista">Mista</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Città di Destinazione
                  </label>
                  <input
                    type="text"
                    value={newStudyWeek.city}
                    onChange={(e) => setNewStudyWeek({...newStudyWeek, city: e.target.value})}
                    placeholder="es. Londra, Parigi, Madrid..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attività Incluse
                  </label>
                  <textarea
                    value={newStudyWeek.activities}
                    onChange={(e) => setNewStudyWeek({...newStudyWeek, activities: e.target.value})}
                    placeholder="Descrivi le attività incluse nella settimana..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Immagine
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], setNewStudyWeek, setStudyWeekImagePreview)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {studyWeekImagePreview && (
                    <div className="mt-4">
                      <img src={studyWeekImagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                <button
                  type="submit"
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                    {editMode.isEditing && editMode.editingType === 'studyWeek' ? 'Modifica Settimana Studio' : 'Aggiungi Settimana Studio'}
                </button>
                  {editMode.isEditing && editMode.editingType === 'studyWeek' && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    >
                      Annulla
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Anteprima Section */}
          <div className="bg-white/90 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Anteprima Card
            </h2>
            
            <div className="sticky top-4">
              {activeTab === 'corsi' && (
                <CoursePreview courseData={newCourse} />
              )}
              
              {activeTab === 'eventi' && (
                <EventPreview eventData={newEvent} />
              )}
              
              {activeTab === 'settimane' && (
                <StudyWeekPreview studyWeekData={newStudyWeek} />
              )}
            </div>
          </div>
        </div>
        <h3 className="text-3xl text-center font-semibold text-gray-800 mb-6">Anteprime</h3>
          {/* List Section */}
          <div className="bg-white/90 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {activeTab === 'corsi' && `Corsi (${courses.length})`}
              {activeTab === 'eventi' && `Eventi (${events.length})`}
              {activeTab === 'settimane' && `Skill Up Camps (${studyWeeks.length})`}
            </h2>

          <div className="space-y-6">
            {/* Card Corsi */}
            {activeTab === 'corsi' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white/65 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl relative">
                    <div className="text-center">
                      {/* Immagine del corso */}
                      <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
                        <ImageWithFallback 
                          src={course.image_url}
                          alt={course.title}
                          fallbackIcon="bi bi-book"
                          fallbackGradient="from-purple-400 to-blue-500"
                          className="w-full h-full object-cover"
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
                        {course.modality && (
                          <div className="chip chip-indigo">
                            <i className="bi bi-laptop mr-2"></i>
                            <span>{course.modality}</span>
                          </div>
                        )}
                      </div>

                      {/* Note aggiuntive se presenti */}
                      {course.additional_notes && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-gray-600 italic">
                            <i className="bi bi-info-circle mr-2"></i>
                            {course.additional_notes}
                          </p>
                        </div>
                      )}

                      <div className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors text-sm inline-block mb-2">
                        Prenota Ora
                      </div>
                    </div>
                    
                    {/* Pulsanti di azione */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                        onClick={() => handleEdit(course, 'course')}
                        className="text-blue-500 hover:text-blue-700 bg-white/80 rounded-full p-2 shadow-lg"
                        title="Modifica corso"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => openDeleteModal(course.id, 'course', course.title)}
                        className="text-red-500 hover:text-red-700 bg-white/80 rounded-full p-2 shadow-lg"
                        title="Elimina corso"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              </div>
            )}

            {/* Card Eventi */}
            {activeTab === 'eventi' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white/65 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl relative">
                    <div className="text-center">
                      {/* Immagine dell'evento */}
                      <div className="w-full h-50 mb-4 rounded-lg overflow-hidden">
                        <ImageWithFallback 
                          src={event.image_url}
                          alt={event.title}
                          fallbackIcon="bi bi-calendar-event"
                          fallbackGradient="from-green-400 to-blue-500"
                          className="w-full h-full object-cover"
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

                      <div className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors text-sm inline-block mb-2">
                        Prenota Ora
                      </div>
                    </div>
                    
                    {/* Pulsanti di azione */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                        onClick={() => handleEdit(event, 'event')}
                        className="text-blue-500 hover:text-blue-700 bg-white/80 rounded-full p-2 shadow-lg"
                        title="Modifica evento"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => openDeleteModal(event.id, 'event', event.title)}
                        className="text-red-500 hover:text-red-700 bg-white/80 rounded-full p-2 shadow-lg"
                        title="Elimina evento"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              </div>
            )}

            {/* Card Skill Up Camps */}
            {activeTab === 'settimane' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyWeeks.map((week) => (
                  <div key={week.id} className="bg-white/65 hover:scale-105 transition-all duration-300 rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl relative">
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

                      <div className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors text-sm inline-block mb-2">
                        Prenota Settimana
                      </div>
                    </div>
                    
                    {/* Pulsanti di azione */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                        onClick={() => handleEdit(week, 'studyWeek')}
                        className="text-blue-500 hover:text-blue-700 bg-white/80 rounded-full p-2 shadow-lg"
                        title="Modifica settimana studio"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        onClick={() => openDeleteModal(week.id, 'studyWeek', week.title)}
                        className="text-red-500 hover:text-red-700 bg-white/80 rounded-full p-2 shadow-lg"
                        title="Elimina settimana studio"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              </div>
            )}

              {/* Messaggio se non ci sono elementi */}
              {activeTab === 'corsi' && courses.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <i className="bi bi-book text-4xl mb-4"></i>
                  <p>Nessun corso aggiunto ancora</p>
                </div>
              )}

              {activeTab === 'eventi' && events.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <i className="bi bi-calendar-event text-4xl mb-4"></i>
                  <p>Nessun evento aggiunto ancora</p>
                </div>
              )}

              {activeTab === 'settimane' && studyWeeks.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <i className="bi bi-globe text-4xl mb-4"></i>
                  <p>Nessuna settimana studio aggiunta ancora</p>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Modale di conferma eliminazione */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        itemType={deleteModal.itemType}
        itemTitle={deleteModal.itemTitle}
      />
    </div>
  );
};

export default AdminDashboard;
