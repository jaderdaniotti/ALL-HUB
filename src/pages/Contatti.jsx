import React from "react";
import { useTranslation } from 'react-i18next';
import booksImage from "../assets/img/books.jpg";

const Contatti = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${booksImage})`,
            filter: 'blur(3px) brightness(0.6)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('contacts.title')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {t('contacts.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-gradient-to-b from-white via-white/80 to-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            {t('contacts.contactOptions.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            {t('contacts.contactOptions.subtitle')}
          </p>

          {/* Social Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1BjGLxA7af/"
              target="__blank"
              className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="absolute inset-0 bg-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-blue-600 text-white w-14 h-14 flex items-center justify-center rounded-full mb-4">
                  <i className="bi bi-facebook text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('contacts.contactOptions.facebook.title')}</h3>
                <p className="text-gray-600 mb-3">{t('contacts.contactOptions.facebook.description')}</p>
                <span className="text-blue-600 font-medium">{t('contacts.contactOptions.facebook.brandName')}</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="#"
              target="__blank"
              className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-14 h-14 flex items-center justify-center rounded-full mb-4">
                  <i className="bi bi-instagram text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('contacts.contactOptions.instagram.title')}</h3>
                <p className="text-gray-600 mb-3">{t('contacts.contactOptions.instagram.description')}</p>
                <span className="text-pink-500 font-medium">{t('contacts.contactOptions.instagram.brandName')}</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/+393402218595"
              target="__blank"
              className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="absolute inset-0 bg-green-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-full mb-4">
                  <i className="bi bi-whatsapp text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('contacts.contactOptions.whatsapp.title')}</h3>
                <p className="text-gray-600 mb-3">{t('contacts.contactOptions.whatsapp.description')}</p>
                <span className="text-green-600 font-medium">{t('contacts.contactOptions.whatsapp.phoneNumber')}</span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:secretariat.allhub@gmail.com"
              target="__blank"
              className="group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gray-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-gray-700 text-white w-14 h-14 flex items-center justify-center rounded-full mb-4">
                  <i className="bi bi-envelope text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('contacts.contactOptions.email.title')}</h3>
                <p className="text-gray-600 mb-3">{t('contacts.contactOptions.email.description')}</p>
                <span className="text-gray-700 font-medium">{t('contacts.contactOptions.email.address')}</span>
              </div>
            </a>
          </div>

          <div className="mt-16 text-gray-700">
            <p className="text-lg mb-2 font-medium">{t('contacts.contactOptions.suggestion.title')}</p>
            <p className="text-gray-600">
              {t('contacts.contactOptions.suggestion.text')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contatti;
