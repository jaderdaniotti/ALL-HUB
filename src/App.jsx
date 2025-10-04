
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from './pages/Home'
import About from './pages/About'
import Servizi from './pages/Servizi'
import Contatti from './pages/Contatti'
import Eventi from './pages/Eventi'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import useLoader from './hooks/useLoader';

function App() {
  const isLoading = useLoader(1500); // 1.5 secondi di caricamento

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/eventi" element={<Eventi />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
