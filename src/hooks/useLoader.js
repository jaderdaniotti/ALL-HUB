import { useState, useEffect } from 'react';

const useLoader = (delay = 2000) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Precarica le immagini principali
    const preloadImages = () => {
      const imageUrls = [
        '/src/assets/img/logo.png',
        '/src/assets/img/books.jpg',
        '/src/assets/img/sfondobianco.jpg'
      ];

      const promises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continua anche se un'immagine fallisce
          img.src = url;
        });
      });

      return Promise.all(promises);
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
