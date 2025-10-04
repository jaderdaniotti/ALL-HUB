import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="w-full z-50 bg-white/90 backdrop-blur-md shadow-sm py-3">
    <div className="container mx-auto px-4  border-gray-700 py-3">
      <div className="grid">


        {/* Contact Info */}
        <div className="space-y-4 grid ">
         
          {/* Social Media Icons */}
          <div className="flex justify-center gap-6">
            <a href="#" aria-label="Facebook" className="text-gray-900 hover:text-blue-500 transition-colors duration-300">
              <i className="bi bi-facebook text-2xl"></i>
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-900 hover:text-pink-500 transition-colors duration-300">
              <i className="bi bi-instagram text-2xl"></i>
            </a>
            <a href="#" aria-label="WhatsApp" className="text-gray-900 hover:text-green-500 transition-colors duration-300">
              <i className="bi bi-whatsapp text-2xl"></i>
            </a>
            <a href="#" aria-label="Email" className="text-gray-900 hover:text-purple-500 transition-colors duration-300">
              <i className="bi bi-envelope text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className=" border-gray-700 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} A LIFELONG LEARNING HUB. Tutti i diritti riservati.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer; 