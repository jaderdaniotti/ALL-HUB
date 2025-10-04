import React from "react";
import { Link } from "react-router-dom";

const Eventi = () => {
  const events = [
    {
      id: 1,
      title: "Workshop di Inglese Conversazionale",
      date: "15 Marzo 2024",
      time: "18:00 - 19:30",
      location: "A LIFELONG LEARNING HUB",
      description: "Un workshop interattivo per migliorare le tue capacità di conversazione in inglese. Pratica con madrelingua in un ambiente rilassato e stimolante.",
      price: "Gratuito",
      category: "Lingue",
      image: "/src/assets/img/books.jpg"
    },
    {
      id: 2,
      title: "Laboratorio di Scrittura Creativa",
      date: "22 Marzo 2024",
      time: "17:00 - 19:00",
      location: "A LIFELONG LEARNING HUB",
      description: "Esplora la tua creatività attraverso la scrittura. Tecniche innovative per sviluppare il tuo stile personale e raccontare storie coinvolgenti.",
      price: "€15",
      category: "Creatività",
      image: "/src/assets/img/books.jpg"
    },
    {
      id: 3,
      title: "Corso di Spagnolo per Principianti",
      date: "29 Marzo 2024",
      time: "19:00 - 20:30",
      location: "A LIFELONG LEARNING HUB",
      description: "Inizia il tuo viaggio nell'apprendimento dello spagnolo. Metodologie innovative per acquisire le basi linguistiche in modo divertente ed efficace.",
      price: "€25",
      category: "Lingue",
      image: "/src/assets/img/books.jpg"
    },
    {
      id: 4,
      title: "Seminario di Mindfulness e Benessere",
      date: "5 Aprile 2024",
      time: "18:30 - 20:00",
      location: "A LIFELONG LEARNING HUB",
      description: "Scopri tecniche di mindfulness per migliorare il tuo benessere psicofisico. Pratiche meditative e esercizi di respirazione per la vita quotidiana.",
      price: "€20",
      category: "Benessere",
      image: "/src/assets/img/books.jpg"
    },
    {
      id: 5,
      title: "Evento Sociale Multilingue",
      date: "12 Aprile 2024",
      time: "19:30 - 22:00",
      location: "A LIFELONG LEARNING HUB",
      description: "Una serata speciale per praticare diverse lingue in un ambiente sociale e rilassato. Cibo, musica e conversazioni in inglese, spagnolo e francese.",
      price: "€10",
      category: "Sociale",
      image: "/src/assets/img/books.jpg"
    },
    {
      id: 6,
      title: "Workshop di Public Speaking",
      date: "19 Aprile 2024",
      time: "17:00 - 19:30",
      location: "A LIFELONG LEARNING HUB",
      description: "Supera la paura di parlare in pubblico. Tecniche pratiche per migliorare la tua comunicazione, gestire l'ansia e coinvolgere il tuo pubblico.",
      price: "€30",
      category: "Sviluppo Personale",
      image: "/src/assets/img/books.jpg"
    }
  ];

  const categories = ["Tutti", "Lingue", "Creatività", "Benessere", "Sociale", "Sviluppo Personale"];

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/src/assets/img/books.jpg')`,
            filter: 'blur(2px) brightness(0.6)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            I Nostri Eventi
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Scopri i nostri workshop, seminari e attività per la crescita personale e l'apprendimento
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 bg-white/70">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${event.image}')`,
                    filter: 'brightness(0.8)'
                  }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      {event.price}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <i className="bi bi-calendar-event text-purple-600 mr-2"></i>
                      <span className="text-xs">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="bi bi-clock text-purple-600 mr-2"></i>
                      <span className="text-xs">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="bi bi-geo-alt text-purple-600 mr-2"></i>
                      <span className="text-xs">{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm font- mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Section */}
      <section className="py-12 bg-white/60">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Gestisci Eventi
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Sei un amministratore? Accedi al pannello di controllo per gestire gli eventi
          </p>
          
          <Link 
            to="/admin/login"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
          >
            Aggiungi Evento
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Eventi;
