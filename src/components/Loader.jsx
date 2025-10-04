import React from "react";
import logoImage from "../assets/img/logo.png";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Logo con animazione personalizzata */}
        <div className="loader-logo">
          <img
            src={logoImage}
            alt="A LIFELONG LEARNING HUB"
            className="h-20 w-auto"
          />
        </div>
        
        {/* Testo di caricamento */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            A LIFELONG LEARNING HUB
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full loader-dot"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full loader-dot"></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full loader-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
