import React from "react";
import { useTranslation } from 'react-i18next';
import booksImage from "../assets/img/books.jpg";

const About = () => {
  const { t } = useTranslation();
  
  return (
  <div className="">
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
            {t('about.testimonials.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/70 p-8 rounded-2xl">
            <p className="text-gray-700 text-lg mb-4 italic">
              "{t('about.testimonials.testimonial1')}"
            </p>
            <p className="text-purple-600 font-semibold">- Anna B.</p>
          </div>

          <div className="bg-white/70 p-8 rounded-2xl">
            <p className="text-gray-700 text-lg mb-4 italic">
              "{t('about.testimonials.testimonial2')}"
            </p>
            <p className="text-purple-600 font-semibold">- Sara V.</p>
          </div>

          <div className="bg-white/70 p-8 rounded-2xl">
            <p className="text-gray-700 text-lg mb-4 italic">
              "{t('about.testimonials.testimonial3')}"
            </p>
            <p className="text-purple-600 font-semibold">- Marco R.</p>
          </div>

          <div className="bg-white/70 p-8 rounded-2xl">
            <p className="text-gray-700 text-lg mb-4 italic">
              "{t('about.testimonials.testimonial4')}"
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
