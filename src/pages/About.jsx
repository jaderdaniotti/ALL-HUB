import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { seoConfig, breadcrumbSchema } from '../config/seo';
import SEO from '../components/SEO';
import booksImage from "../assets/img/books.jpg";

const About = () => {
  const { t } = useTranslation();
  const page = seoConfig.pages.about;

  // Array delle nuove testimonianze dei corsi di inglese
  const testimonials = [
    {
      id: 1,
      text: "Ho trovato il corso ben strutturato anche se aperto a continue modifiche per colmare lacune, dubbi o rispondere a richieste dei partecipanti. Le lezioni sono divise in 3 momenti: correzione dei compiti assegnati, argomento grammaticale e ascolto/lettura/discussione di un brano; questo permette di accrescere le proprie competenze linguistiche senza annoiarsi, in maniera divertente e varia. Grazie per la bella esperienza che sicuramente vorrò continuare.",
      author: "Elisabetta",
      level: "CORSO LIVELLO A2"
    },
    {
      id: 2,
      text: "The weekly English lessons are very useful in terms of both practice and grammar. The fact that the course teacher sends us the course topic 1 week before the lesson and that the notes used as course material can also be listened to with the audio description method and that new words are given in advance within the subject facilitate and reinforce learning. Thanks to the participants being from different countries, a multi-minded environment is created by the people who contribute to the course topics and content, and thus the social and cognitive levels of the participants develop faster and a multicultural environment is created thanks to the new cultures getting to know each other. I would like to thank our teacher Lavinya Hanım, who constantly works to develop both our personal and social skills thanks to the English course, and everyone who provided this course opportunity.",
      author: "Hakan E.",
      level: "CORSO LIVELLO B2 - CONVERSAZIONE"
    },
    {
      id: 3,
      text: "I was hesitant to speak English before starting the classes, but thanks to the lessons, I can now speak comfortably. My reading and understanding have improved due to the paragraphs we read in class. I would like to thank Lavinia for helping me in my development.",
      author: "Irem",
      level: "CORSO LIVELLO A2/B1 - CONVERSAZIONE"
    },
    {
      id: 4,
      text: "Mi è interessato parlare di argomenti di varia attualità (molti dei quali non sapevo). Preparare domande mi è stato di molto aiuto perché così ho dovuto studiare i brani. Rispondere alle domande che mi venivano fatte mi hanno aiutato a sforzarmi a cercare i vocaboli in inglese nella mia mente. L'insegnante era molto preparata ed è venuta incontro alle esigenze di tutti, aiutando coloro come me che hanno più difficoltà. Grazie.",
      author: "Roberta",
      level: "CORSO LIVELLO A2/B1 - CONVERSAZIONE"
    },
    {
      id: 5,
      text: "Attività proposte: ogni settimana è stato proposto un nuovo argomento attraverso la lettura, comprensione e discussione del contenuto di un articolo. Metodologia utilizzata: il puntuale invio settimanale degli articoli sull'argomento da trattare in classe e l'attenzione dell'insegnante durante la discussione e argomentazione di ciascun tema trattato, ha permesso il miglioramento della mia capacità comunicativa e comprensiva della lingua Inglese. Il mio suggerimento è quello di continuare con questo metodo in quanto l'ho trovato molto stimolante ed efficace. Un particolare ringraziamento va all'insegnante Lavinia che, grazie alla sua serietà e dedizione, mi ha sempre motivato verso l'impegno costante sullo studio della lingua Inglese.",
      author: "Lucia D.",
      level: "CORSO LIVELLO B1 – CONVERSAZIONE"
    },
    {
      id: 6,
      text: "Nel 2025 ho partecipato al corso di inglese B1. Trovo molto piacevole poter migliorare la conoscenza di una lingua straniera e contemporaneamente poter parlare e confrontarmi su differenti argomenti di attualità con altre persone. Non diventa quindi solo un momento di studio della lingua ma anche di incontro di diverse opinioni che proviamo ad esprimere utilizzando l'inglese. Questo è reso possibile dalla pazienza e competenza dell'insegnante che rispetta i tempi di ognuno pur proponendo ogni lezione nuovi stimoli come l'introduzione della ricerca dei sinonimi delle parole che già conoscevamo per aumentare il nostro vocabolario.",
      author: "Anna C.",
      level: "CORSO LIVELLO B1 - CONVERSAZIONE"
    },
    {
      id: 7,
      text: "Ho frequentato con grande piacere questo corso di inglese. La modalità proposta - con articoli in lingua inviati prima della lezione e discussi poi in classe - si è rivelata estremamente efficace e stimolante. Le tematiche erano sempre interessanti e ben selezionate, perfette per arricchire il vocabolario e migliorare la comprensione. Il gruppo era affiatato e l'atmosfera in classe molto coinvolgente. L'insegnante ha saputo guidare la discussione con competenza e passione, rendendo ogni incontro un'occasione di apprendimento attivo. Ringrazio e consiglio vivamente questo corso a chi vuole migliorare l'inglese in modo dinamico e partecipato!",
      author: "Lucia C.",
      level: "CORSO LIVELLO B1 - CONVERSAZIONE"
    },
    {
      id: 8,
      text: "A proposito del corso di inglese, per me l'impostazione va bene, nel senso che per un corso di conversazione l'assegnazione di brani in anticipo permette di prepararsi un minimo e rinfrescare conoscenze. Per me, per esempio, un corso più strutturato sarebbe pesante, perché le giornate di lavoro sono lunghe e quello che cercavo l'ho trovato nei corsi da voi proposti.",
      author: "Arianna",
      level: "CORSO LIVELLO B2 - CONVERSAZIONE"
    },
    {
      id: 9,
      text: "Trovo che il metodo di insegnamento proposto sia efficace, soprattutto la possibilità di ascoltare/leggere i testi con livelli diversi di difficoltà. Anche il 'gioco' di indovinare il personaggio sulla base di domanda-risposta per me è stato efficace, soprattutto per cercare di costruire in autonomia delle frasi.",
      author: "Claudia",
      level: "CORSO LIVELLO B2 - CONVERSAZIONE"
    },
    {
      id: 10,
      text: "Sono molto soddisfatto del modo con cui si tengono le lezioni in quanto l'insegnante è attenta al coinvolgimento dei partecipanti. Bene le tabelle descrittive e riassuntive a casa con grammatica, esercizi e approfondimenti. Personalmente mi sono impegnato anche con i compiti per casa e ritengo che oggi mi sento di poter dire qualche frase in inglese senza sentirmi in imbarazzo se commetto qualche errore. Grazie di tutto. Have a good life.",
      author: "Giampaolo",
      level: "CORSO LIVELLO A2"
      
    }
   
  ];

  // State per gestire le testimonianze visibili
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Funzione per passare alle prossime testimonianze
  const nextTestimonials = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2
      );
      setIsAnimating(false);
    }, 300);
  };

  // Funzione per tornare alle testimonianze precedenti
  const prevTestimonials = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex - 2 < 0 ? testimonials.length - 2 : prevIndex - 2
      );
      setIsAnimating(false);
    }, 300);
  };

  // Auto-rotate delle testimonianze ogni 8 secondi
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => 
            prevIndex + 2 >= testimonials.length ? 0 : prevIndex + 2
          );
          setIsAnimating(false);
        }, 300);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isAnimating, testimonials.length]);

  return (
  <div className="">
    <SEO
      title={page.title}
      description={page.description}
      keywords={page.keywords}
      path={page.path}
      structuredData={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Chi siamo', url: '/about' },
      ])}
    />
    {/* Hero Section */}
    <section className="relative py-20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${booksImage})`,
          filter: 'blur(2px) brightness(0.6)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl tracking-tight font-semibold text-white mb-6">
          {t('about.title')}
        </h1>
        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>
    </section>

    {/* About Content */}
    <section className="py-12 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
            {t('about.team.title')}
          </h2>
        </div>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-xl leading-relaxed mb-8">
              {t('about.team.description1')}
            </p>
            <p className="text-lg leading-relaxed mb-8">
              {t('about.team.description2')}
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
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">{t('about.mission.title')}</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('about.mission.subtitle')}</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>{t('about.mission.goals.lifelong')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>{t('about.mission.goals.interaction')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>{t('about.mission.goals.programs')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>{t('about.mission.goals.experiences')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span>{t('about.mission.goals.languages')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">{t('about.offerings.title')}</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('about.offerings.items.training')}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('about.offerings.items.methods')}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('about.offerings.items.growth')}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('about.offerings.items.support')}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('about.offerings.items.programs')}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('about.offerings.items.success')}</span>
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
            Testimonianze dei Corsi di Inglese
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Scopri cosa dicono i nostri studenti sui corsi di inglese
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Container delle testimonianze con animazioni */}
          <div className="relative">
            <div 
              className={`grid grid-cols-1  gap-8 transition-all duration-300 ${
                isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
              }`}
            >
              {/* Prima testimonianza */}
              <div className="bg-white/70 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    {testimonials[currentIndex]?.level}
                  </span>
                </div>
                <p className="text-gray-700 text-md mb-6 italic leading-relaxed">
                  "{testimonials[currentIndex]?.text}"
                </p>
                <p className="text-purple-600 font-semibold text-right">
                  - {testimonials[currentIndex]?.author}
                </p>
              </div>

              {/* Seconda testimonianza */}
              <div className="bg-white/70 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    {testimonials[currentIndex + 1]?.level}
                  </span>
                </div>
                <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                  "{testimonials[currentIndex + 1]?.text}"
                </p>
                <p className="text-purple-600 font-semibold text-right">
                  - {testimonials[currentIndex + 1]?.author}
                </p>
              </div>
            </div>

            {/* Controlli di navigazione */}
            <div className="flex justify-center items-center mt-12 space-x-4">
              <button
                onClick={prevTestimonials}
                disabled={isAnimating}
                className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Testimonianze precedenti"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Indicatori di pagina */}
              <div className="flex space-x-2">
                {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (isAnimating) return;
                      setIsAnimating(true);
                      setTimeout(() => {
                        setCurrentIndex(index * 2);
                        setIsAnimating(false);
                      }, 300);
                    }}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      Math.floor(currentIndex / 2) === index 
                        ? 'bg-purple-600' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Vai alla pagina ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonials}
                disabled={isAnimating}
                className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Prossime testimonianze"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Informazioni aggiuntive */}
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
                Le testimonianze cambiano automaticamente ogni 20 secondi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    {/* <section className="py-12 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${booksImage})`,
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
};

export default About;
