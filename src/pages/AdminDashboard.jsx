import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    price: "",
    category: "Lingue",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Verifica se l'admin è loggato
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Carica eventi dal localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem("adminEvents");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Eventi di default
      const defaultEvents = [
        {
          id: 1,
          title: "Workshop di Inglese Conversazionale",
          date: "15 Marzo 2024",
          time: "18:00 - 19:30",
          location: "A LIFELONG LEARNING HUB",
          description: "Un workshop interattivo per migliorare le tue capacità di conversazione in inglese. Pratica con madrelingua in un ambiente rilassato e stimolante.",
          price: "Gratuito",
          category: "Lingue"
        },
        {
          id: 2,
          title: "Laboratorio di Scrittura Creativa",
          date: "22 Marzo 2024",
          time: "17:00 - 19:00",
          location: "A LIFELONG LEARNING HUB",
          description: "Esplora la tua creatività attraverso la scrittura. Tecniche innovative per sviluppare il tuo stile personale e raccontare storie coinvolgenti.",
          price: "€15",
          category: "Creatività"
        }
      ];
      setEvents(defaultEvents);
      localStorage.setItem("adminEvents", JSON.stringify(defaultEvents));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUsername");
    navigate("/admin/login");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setNewEvent({ ...newEvent, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const event = {
      id: Date.now(),
      ...newEvent,
      image: newEvent.image || "/src/assets/img/books.jpg" // Default image
    };
    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    localStorage.setItem("adminEvents", JSON.stringify(updatedEvents));
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      price: "",
      category: "Lingue",
      image: null
    });
    setImagePreview(null);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo evento?")) {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem("adminEvents", JSON.stringify(updatedEvents));
    }
  };

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });
  };

  const categories = ["Lingue", "Creatività", "Benessere", "Sociale", "Sviluppo Personale"];

  return (
    <div className="">
      {/* Header */}
      <section className="bg-white/90 backdrop-blur-md shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/eventi" className="text-purple-600 hover:text-purple-700">
                <i className="bi bi-arrow-left text-xl"></i>
              </Link>
              <h1 className="text-2xl font-semibold text-gray-800">
                Pannello Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Benvenuto, {localStorage.getItem("adminUsername")}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container bg-white/80 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Add Event Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Aggiungi Evento
              </h2>

              <form onSubmit={handleAddEvent} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Immagine Evento
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="imageUpload"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 transition-colors"
                    >
                      <i className="bi bi-cloud-upload text-2xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-600">
                        Clicca per caricare un'immagine
                      </p>
                    </label>
                    
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Anteprima"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setNewEvent({ ...newEvent, image: null });
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titolo *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newEvent.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Nome dell'evento"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria *
                      </label>
                      <select
                        name="category"
                        value={newEvent.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        required
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prezzo *
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={newEvent.price}
                        onChange={handleChange}
                        placeholder="€25 o Gratuito"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data *
                      </label>
                      <input
                        type="text"
                        name="date"
                        value={newEvent.date}
                        onChange={handleChange}
                        placeholder="15 Marzo 2024"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Orario *
                      </label>
                      <input
                        type="text"
                        name="time"
                        value={newEvent.time}
                        onChange={handleChange}
                        placeholder="18:00 - 19:30"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={newEvent.location}
                      onChange={handleChange}
                      placeholder="A LIFELONG LEARNING HUB"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrizione *
                    </label>
                    <textarea
                      name="description"
                      value={newEvent.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                      placeholder="Descrizione dell'evento..."
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
                >
                  Aggiungi Evento
                </button>
              </form>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Eventi ({events.length})
              </h2>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-white/80 rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                          {event.category}
                        </span>
                        <span className="text-purple-600 font-semibold text-sm">
                          {event.price}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-1"
                    >
                      <i className="bi bi-trash text-sm"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <i className="bi bi-calendar-event text-purple-500 mr-2"></i>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-clock text-purple-500 mr-2"></i>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="bi bi-geo-alt text-purple-500 mr-2"></i>
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>

            {events.length === 0 && (
              <div className="text-center py-12 bg-white/50 rounded-xl">
                <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="bi bi-calendar-x text-gray-400"></i>
                </div>
                <h3 className="text-gray-600 font-medium mb-2">
                  Nessun evento presente
                </h3>
                <p className="text-gray-500 text-sm">
                  Inizia aggiungendo il tuo primo evento
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
