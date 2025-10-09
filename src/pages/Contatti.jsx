import React from "react";
import { useTranslation } from 'react-i18next';
import booksImage from "../assets/img/books.jpg";

const Contatti = () => {
  const { t } = useTranslation();
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
            {t('contacts.title')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {t('contacts.subtitle')}
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
                {t('contacts.contactInfo')}
              </h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <i className="bi bi-envelope text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('contacts.info.email')}</h3>
                    <p className="text-gray-600">secretariat.allhub@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <i className="bi bi-telephone text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('contacts.info.phone')}</h3>
                    <p className="text-gray-600">+39 06 98765432</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <i className="bi bi-geo-alt text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('contacts.info.address')}</h3>
                    <p className="text-gray-600">Via della Cartiera, 36, Gemona del Friuli (UD)</p>
                  </div>
                </div>
              </div>


            </div>
            {/* Social Media */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Seguici sui Social</h3>
              <div className="grid xl:grid-cols-2 gap-4">
                <a href="https://www.facebook.com/share/1BjGLxA7af/" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2" target="__blank">
                  <i className="bi bi-facebook text-xl"></i> <span className="font-medium">A lifelong learning hub</span>
                </a>
                <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center justify-center gap-2">
                  <i className="bi bi-instagram text-xl"></i> <span className="font-medium">A lifelong learning hub</span>
                </a>
                <a href="https://wa.me/+393402218595" className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center gap-2" target="__blank">
                  <i className="bi bi-whatsapp text-xl"></i> <span className="font-medium">+39 340 221 8595 </span>
                </a>
                <a href="mailto:secretariat.allhub@gmail.com" className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                  <i className="bi bi-envelope text-xl"></i> <span className="font-medium">secretariat.allhub@gmail.com</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


    </div>
  );
};

export default Contatti;
