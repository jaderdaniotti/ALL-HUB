import React, { useState } from "react";
import booksImage from "../assets/img/books.jpg";

const Contatti = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    messaggio: '',
    privacy: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui gestirai l'invio del form
    console.log('Form submitted:', formData);
    alert('Messaggio inviato con successo! Ti risponderemo presto.');
  };

  return (
    <div className="">
    {/* Hero Section */}
    <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${booksImage})`,
            filter: 'blur(3px) brightness(0.6)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Contattaci
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Contattaci per scoprire come possiamo aiutarti a crescere
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-12 bg-white/70">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                Informazioni di Contatto
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <i className="bi bi-envelope text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600">info@alifelonglearninghub.it</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <i className="bi bi-telephone text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Telefono</h3>
                    <p className="text-gray-600">+39 06 98765432</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <i className="bi bi-geo-alt text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Indirizzo</h3>
                    <p className="text-gray-600">Via della Conoscenza 10, Roma (RM)</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Seguici sui Social</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                    <i className="bi bi-facebook text-xl"></i>
                  </a>
                  <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors">
                    <i className="bi bi-instagram text-xl"></i>
                  </a>
                  <a href="#" className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors">
                    <i className="bi bi-whatsapp text-xl"></i>
                  </a>
                  <a href="#" className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 transition-colors">
                    <i className="bi bi-envelope text-xl"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                Invia un Messaggio
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Il tuo nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="La tua email"
                  />
                </div>

                <div>
                  <label htmlFor="messaggio" className="block text-sm font-medium text-gray-700 mb-2">
                    Messaggio *
                  </label>
                  <textarea
                    id="messaggio"
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Il tuo messaggio"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    Accetto il trattamento dei miei dati personali da parte del proprietario di questo sito web. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Invia Messaggio
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Dove Siamo
            </h2>
            <p className="text-xl text-gray-600">
              Vieni a trovarci nella nostra sede a Roma
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.7316286656884!2d12.492230315444348!3d41.90278397922051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6196f9928ebb%3A0xb90f770693656e38!2sVia%20della%20Conoscenza%2C%2000133%20Roma%20RM!5e0!3m2!1sit!2sit!4v1640000000000!5m2!1sit!2sit"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa della sede"
              ></iframe>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">A LIFELONG LEARNING HUB</h3>
              <p className="text-gray-600 mb-4">
                Via della Conoscenza 10, 00133 Roma (RM)
              </p>
              <p className="text-gray-600">
                Siamo facilmente raggiungibili con i mezzi pubblici e disponiamo di parcheggio gratuito per i nostri studenti.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contatti;
