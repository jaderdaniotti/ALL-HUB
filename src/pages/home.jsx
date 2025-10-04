import React from "react";

const Home = () => (
  <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-sans">
    <h1 className="text-4xl md:text-6xl font-extrabold text-base-content mb-4 leading-tight">
      Benvenuto in <span className="text-primary">MyBrand</span>
    </h1>
    <p className="text-lg md:text-2xl text-base-content/70 mb-8 max-w-2xl">
      Sviluppo web moderno, veloce e su misura. Inizia il tuo prossimo progetto con una base solida e design accattivante.
    </p>
    <a href="#contact" className="btn btn-primary btn-lg">Contattaci ora</a>
  </section>
);

export default Home;

