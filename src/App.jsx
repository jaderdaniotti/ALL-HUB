import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Home from './pages/home'
import About from './pages/About'
import Attivita from './pages/Attivita'
import Contatti from './pages/Contatti'
import Location from './pages/Location'
import PrivacyPolicy from './pages/PrivacyPolicy'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import SEO from './components/SEO'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from './components/CookieBanner';
import useLoader from './hooks/useLoader';
import { hasConsent, getPreferences, initializeServices } from './utils/cookieManager';

function App() {
  // const isLoading = useLoader(500); // Disabilitato per vedere subito lo skeleton
  const isLoading = false; // Caricamento istantaneo

  // Inizializza i servizi basati sul consenso cookie salvato
  useEffect(() => {
    if (hasConsent()) {
      const preferences = getPreferences();
      initializeServices(preferences);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/attivita" element={<Attivita />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/location" element={<Location />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/login"
            element={
              <>
                <SEO title="Login | All-Hub" path="/login" noindex />
                <AdminLogin />
              </>
            }
          />
          <Route
            path="/admin/login"
            element={
              <>
                <SEO title="Admin Login | All-Hub" path="/admin/login" noindex />
                <AdminLogin />
              </>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <>
                <SEO title="Admin | All-Hub" path="/admin/dashboard" noindex />
                <AdminDashboard />
              </>
            }
          />
        </Routes>
        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  )
}

export default App
