import React from "react";

const Footer = () => (
  <footer className="footer footer-center p-6 bg-base-200 text-base-content mt-12 font-sans">
    <nav className="mb-2 flex gap-4">
      <a href="#" className="link link-hover">Privacy</a>
      <a href="#" className="link link-hover">Termini</a>
      <a href="#" className="link link-hover">Contatti</a>
    </nav>
    <nav className="mb-2 flex gap-4">
      <a href="#" aria-label="Instagram" className="text-xl hover:text-primary transition"><i className="bi bi-instagram"></i></a>
      <a href="#" aria-label="LinkedIn" className="text-xl hover:text-primary transition"><i className="bi bi-linkedin"></i></a>
      <a href="#" aria-label="GitHub" className="text-xl hover:text-primary transition"><i className="bi bi-github"></i></a>
    </nav>
    <aside>
      <p>&copy; {new Date().getFullYear()} MyBrand. Tutti i diritti riservati.</p>
    </aside>
  </footer>
);

export default Footer; 