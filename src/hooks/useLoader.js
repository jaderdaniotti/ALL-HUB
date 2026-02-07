import { useState, useEffect } from 'react';

const useLoader = (delay = 2000) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Precarica le immagini principali
    const preloadImages = () => {
      // Le immagini ora sono importate direttamente nei componenti
      // Non serve più precaricarle qui
      return Promise.resolve();

    };

    // Simula il caricamento con un delay minimo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Precarica le immagini
    preloadImages().then(() => {
      // Rimuovi il timer se le immagini si caricano prima
      clearTimeout(timer);
      setIsLoading(false);
    });

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading;
};

export default useLoader;
