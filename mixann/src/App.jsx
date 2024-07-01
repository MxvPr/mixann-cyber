// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; // Retirez BrowserRouter as Router
import Header from "./components/Header"; // Assurez-vous que le chemin d'importation est correct
import Footer from "./components/Footer"; // Assurez-vous que le chemin d'importation est correct
import Accueil from "./pages/Accueil";
import Profil from "./pages/Profil";
import Galerie from "./pages/Galerie";
import AuthPage from "./pages/AuthPage";
import UserProfile from './pages/UserProfile'; // Assurez-vous d'avoir ce composant
import RencontrezLesArtistes from './pages/RencontrezLesArtistes';
import PrivacyPolicy from './pages/Politique'; // Assurez-vous d'avoir ce composant
import Contact from './pages/Contact';
import About from './pages/About'; // Assurez-vous d'avoir ce composant
// Importez d'autres pages au besoin

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header /> {/* Le Header est ajouté ici pour qu'il apparaisse sur toutes les pages */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/artistes" element={<RencontrezLesArtistes />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        {/* Ajoutez d'autres routes ici */}
        </Routes>
        <Footer /> {/* Le Footer est ajouté ici pour qu'il apparaisse sur toutes les pages */}
    </div>
  );
}

export default App;
