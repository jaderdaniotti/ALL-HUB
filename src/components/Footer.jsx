import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { seoConfig } from '../config/seo';

const Footer = () => {
  const { t } = useTranslation();
  const { whatsapp, facebook } = seoConfig.local.contact;
  
  return (
  <footer className="w-full z-50 bg-white/90 backdrop-blur-md shadow-sm py-3">
    <div className="container mx-auto px-4  border-gray-700 py-3">
      <div className="grid">


        {/* Contact Info */}
        <div className="space-y-4 grid ">
         
          {/* Social Media Icons */}
          <div className="flex justify-center gap-6">
            <a href={facebook} aria-label="Facebook" className="text-gray-900 hover:text-blue-500 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook text-2xl"></i>
            </a>
            <a href={whatsapp} aria-label="WhatsApp" className="text-gray-900 hover:text-green-500 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-whatsapp text-2xl"></i>
            </a>
            <a href={`mailto:${seoConfig.local.contact.email}`} aria-label="Email" className="text-gray-900 hover:text-purple-500 transition-colors duration-300">
              <i className="bi bi-envelope text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className=" border-gray-700 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          {t('footer.copyright')}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          {t('footer.vat')}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          <Link to="/privacy" className="hover:text-purple-600 underline-offset-2 hover:underline">
            Privacy &amp; Cookie Policy
          </Link>
        </p>
        <p className="font-normal text-md mt-2">
          Made with <i className="bi bi-heart-fill text-red-500"></i> by <a href="https://jaderweb.com/" target="__blank" className="underline transition-colors duration-300 underline-offset-2 hover:underline text-violet-500  font-bold">Jaderweb</a>
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
