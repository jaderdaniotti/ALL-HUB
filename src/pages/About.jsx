import React from "react";

const About = () => (
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
        <h1 className="text-5xl md:text-6xl tracking-tight font-semibold text-white mb-6">
          Chi Siamo
        </h1>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
          Scopri la nostra passione per l'insegnamento e la crescita personale
        </p>
      </div>
    </section>

    {/* About Content */}
    <section className="py-12 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
            Il team
          </h2>
        </div>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-xl leading-relaxed mb-8">
              Siamo un gruppo di insegnanti madrelingua o bilingue che offrono percorsi didattici ed attività per apprendere, ad ogni età, le lingue straniere. Proponiamo inoltre laboratori per accrescere le proprie conoscenze e ricercare il proprio benessere psicofisico in un ambiente divertente, stimolante e vivace.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              L'insegnamento è la nostra passione e ci impegniamo per condividere le nostre competenze con studenti di ogni età e nazione. Le necessità e le richieste degli studenti sono il punto di partenza per creare programmi specifici utilizzando metodologie non-formali pensate specificamente per ogni gruppo.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Mission & Values */}
    <section className="py-12 bg-white/80 px-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">LA NOSTRA MISSIONE</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">I nostri obiettivi sono:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>Incoraggiare gli utenti a diventare "appassionati studenti permanenti - LIFELONG LEARNERS"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>Incoraggiare l'interazione tra insegnanti e studenti</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>Offrire programmi educativi creati su misura per assecondare interessi e competenze dei nostri allievi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>Creare esperienze trasformative, divertenti e utili per migliorarci come persone</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>Imparare le lingue mentre si praticano attività quotidiane</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">COSA OFFRIAMO</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Formazione continua in educazione e sviluppo personale</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Esperienza in metodi didattici innovativi</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Competenze nella crescita emotiva e cognitiva</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Supporto per l'apprendimento personalizzato</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Sviluppo di programmi di miglioramento personale</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Promozione del successo attraverso l'educazione continua</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-12 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
            Cosa dicono i nostri clienti
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/70 p-8 rounded-2xl">
            <p className="text-gray-700 text-lg mb-4 italic">
              "Un centro che nutre mente e anima con passione e professionalità."
            </p>
            <p className="text-purple-600 font-semibold">- Anna B.</p>
          </div>

          <div className="bg-white/70 p-8 rounded-2xl">
            <p className="text-gray-700 text-lg mb-4 italic">
              "Un ambiente che favorisce crescita personale e relazioni autentiche."
            </p>
            <p className="text-purple-600 font-semibold">- Sara V.</p>
          </div>

          <div className="bg-white/70 p-8 rounded-2xl">
            <p className="text-gray-700 text-lg mb-4 italic">
              "Centro che stimola mente e anima per una crescita reale e duratura."
            </p>
            <p className="text-purple-600 font-semibold">- Marco R.</p>
          </div>

          <div className="bg-white/70 p-8 rounded-2xl">
            <p className="text-gray-700 text-lg mb-4 italic">
              "Centro che trasmette passione e competenza, trasformando la crescita personale."
            </p>
            <p className="text-purple-600 font-semibold">- Elena T.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    {/* <section className="py-12 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/img/books.jpg')`,
          filter: 'blur(3px) brightness(0.6)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
          Scopri oggi il nostro centro!
        </h2>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Contattaci per iniziare il tuo percorso di crescita personale
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:secretaria.allhub@gmail.com" 
            className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Contattaci ora
          </a>
          <a 
            href="mailto:secretaria.allhub@gmail.com" 
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
          >
            secretaria.allhub@gmail.com
          </a>
        </div>
      </div>
    </section> */}
  </div>
);

export default About;
