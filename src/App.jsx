
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import About from './pages/About'
import Attivita from './pages/Attivita'
import Contatti from './pages/Contatti'
import Location from './pages/Location'
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
          <Route path="/attivita" element={<Attivita />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/location" element={<Location />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
