import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/src/assets/img/logo.png" 
              alt="A LIFELONG LEARNING HUB" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-800">
              A LIFELONG LEARNING HUB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 font-medium  linear ${
                location.pathname === '/' ? 'text-purple-600 border-b-2 border-purple-600' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 font-medium  linear ${
                location.pathname === '/about' ? 'text-purple-600 border-b-2 border-purple-600' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/servizi" 
              className={`text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 font-medium  linear ${
                location.pathname === '/servizi' ? 'text-purple-600 border-b-2 border-purple-600' : ''
              }`}
            >
              Servizi
            </Link>
            <Link 
              to="/contatti" 
              className={`text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 font-medium  linear ${
                location.pathname === '/contatti' ? 'text-purple-600 border-b-2 border-purple-600' : ''
              }`}
            >
              Contatti
            </Link>
            <Link 
              to="/eventi" 
              className={`text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 font-medium  linear ${
                location.pathname === '/eventi' ? 'text-purple-600 border-b-2 border-purple-600' : ''
              }`}
            >
              Eventi
            </Link>
            <Link 
              to="/contatti" 
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors font-medium"
            >
              Contattaci
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                onClick={closeMenu}
                className={`block text-gray-700 hover:text-purple-600 font-medium text-lg ${
                  location.pathname === '/' ? 'text-purple-600' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={closeMenu}
                className={`block text-gray-700 hover:text-purple-600 font-medium text-lg ${
                  location.pathname === '/about' ? 'text-purple-600' : ''
                }`}
              >
                About
              </Link>
              <Link 
                to="/servizi" 
                onClick={closeMenu}
                className={`block text-gray-700 hover:text-purple-600 font-medium text-lg ${
                  location.pathname === '/servizi' ? 'text-purple-600' : ''
                }`}
              >
                Servizi
              </Link>
              <Link 
                to="/contatti" 
                onClick={closeMenu}
                className={`block text-gray-700 hover:text-purple-600 font-medium text-lg ${
                  location.pathname === '/contatti' ? 'text-purple-600' : ''
                }`}
              >
                Contatti
              </Link>
              <Link 
                to="/eventi" 
                onClick={closeMenu}
                className={`block text-gray-700 hover:text-purple-600 font-medium text-lg ${
                  location.pathname === '/eventi' ? 'text-purple-600' : ''
                }`}
              >
                Eventi
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Link 
                  to="/contatti"
                  onClick={closeMenu}
                  className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors font-medium text-center block"
                >
                  Contattaci
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 