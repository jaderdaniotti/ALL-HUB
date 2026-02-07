import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente per tornare automaticamente in cima alla pagina ad ogni cambio di route
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolla in cima alla pagina quando cambia il pathname
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Scroll fluido invece di istantaneo
    });
  }, [pathname]);

  return null; // Questo componente non renderizza nulla
};

export default ScrollToTop;
