import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import udine from "../assets/img/udine.avif";
import udine2 from "../assets/img/udine2.avif";
import udine3 from "../assets/img/udine3.avif";
import dintorni from "../assets/img/dintorni.avif";
import malta from "../assets/img/malta.jpg";
import turchia from "../assets/img/turchia.jpg";
import vienna from "../assets/img/vienna.jpg";

const Location = () => {
  const { t } = useTranslation();

  return (
    <div className="">
      {/* Sezione principale */}
      <section className="py-16 bg-white/80">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t('location.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('location.subtitle')}
            </p>
          </div>

          {/* MAPPA */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1765023.770127099!2d11.4!3d46.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b2c88ef7b47a9%3A0xf90da6cf35e0b4b!2sFriuli-Venezia%20Giulia!5e0!3m2!1sit!2sit!4v1734317400000!5m2!1sit!2sit"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('location.mapTitle')}
            ></iframe>
          </div>



          {/* SEZIONE: Udine - Un gioiello nascosto */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            <img
              src={udine}
              alt="Udine centro storico"
              className="rounded-2xl shadow-md object-cover h-80 w-full"
            />
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                {t('location.udineSection.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('location.udineSection.description1')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('location.udineSection.description2')}
              </p>
            </div>
          </div>

          {/* SEZIONE: Storia */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                {t('location.historySection.title')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {t('location.historySection.description1')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('location.historySection.description2')}
              </p>
            </div>
            <img
              src={udine2}
              alt="Castello di Udine"
              className="rounded-2xl shadow-md object-cover h-80 w-full"
            />
          </div>

          {/* SEZIONE: Cosa fare */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              {t('location.activitiesSection.title')}
            </h2>
            <img
              src={udine3}
              alt="Piazza Libertà Udine"
              className="rounded-2xl shadow-md object-cover h-80 w-full mb-8"
            />
            <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              {t('location.activitiesSection.description')}
            </p>
          </div>

          {/* SEZIONE: I dintorni */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              {t('location.surroundingsSection.title')}
            </h2>
            <img
              src={dintorni}
              alt="Colline del Collio"
              className="rounded-2xl shadow-md object-cover h-80 w-full mb-8"
            />
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('location.surroundingsSection.description1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('location.surroundingsSection.description2')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('location.surroundingsSection.description3')}
            </p>
          </div>

          {/* SEZIONE: Sapori */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              {t('location.flavorsSection.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-center max-w-3xl mx-auto">
              {t('location.flavorsSection.description1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              {t('location.flavorsSection.description2')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('location.flavorsSection.description3')}
            </p>
          </div>

          {/* SEZIONE: Tradizioni */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              {t('location.traditionsSection.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 max-w-3xl mx-auto">
              {t('location.traditionsSection.description1')}
            </p>
            <p className="text-gray-700 italic">
              {t('location.traditionsSection.description2')}
            </p>
          </div>

{/* SEZIONE: E all'estero... */}
<div className="mb-16">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
    {t('location.abroadSection.title')}
  </h2>
  <p className="text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
    {t('location.abroadSection.description')}
  </p>
  <div className="grid md:grid-cols-3 gap-6">
    <div className="text-center">
      <img
        src={malta}
        alt="Malta"
        className="rounded-2xl shadow-md object-cover h-64 w-full mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {t('location.abroadSection.malta.title')}
      </h3>
      <p className="text-gray-600 text-sm">
        {t('location.abroadSection.malta.description')}
      </p>
    </div>
    <div className="text-center">
      <img
        src={turchia}
        alt="Turchia"
        className="rounded-2xl shadow-md object-cover h-64 w-full mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {t('location.abroadSection.turkey.title')}
      </h3>
      <p className="text-gray-600 text-sm">
        {t('location.abroadSection.turkey.description')}
      </p>
    </div>
    <div className="text-center">
      <img
        src={vienna}
        alt="Vienna"
        className="rounded-2xl shadow-md object-cover h-64 w-full mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {t('location.abroadSection.vienna.title')}
      </h3>
      <p className="text-gray-600 text-sm">
        {t('location.abroadSection.vienna.description')}
      </p>
    </div>
  </div>
</div>
          {/* CTA finale */}
          <div className="text-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-10 shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {t('location.finalCta.title')}
            </h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              {t('location.finalCta.description')}
            </p>
            <Link
              to="/contatti"
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              {t('location.finalCta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;
