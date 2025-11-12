// 🎨 REACT APP.JSX - GLAVNA KOMPONENTA FRONTEND-A
// ==============================================
// Ovo je "root" komponenta koja organizuje celu React aplikaciju
// Ovde se definiše routing, autentifikacija i layout struktura

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// 🧩 KOMPONENTE - uvozimo custom komponente
import Sidebar from './components/Sidebar';
import Login from './components/Login';
// 📄 ROUTES (Stranice) - uvozimo različite "stranice" aplikacije  
import Onama from './routes/Onama';
import Casovi from './routes/Casovi';
import Kursevi from './routes/Kursevi';
import Lekcije from './routes/Lekcije';
import Kontakt from './routes/Kontakt';

// 🏠 GLAVNA APP KOMPONENTA
function App() {
  // 🔐 STATE ZA AUTENTIFIKACIJU
  // useState hook čuva stanje da li je korisnik ulogovan
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 💾 PROVERI SAČUVANU AUTENTIFIKACIJU (localStorage)
  // useEffect hook se izvršava kada se komponenta mount-uje (učita)
  useEffect(() => {
    // Browser localStorage trajno čuva podatke (kao cookies)
    const savedAuth = localStorage.getItem('matematika-app-auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);  // Korisnik je već ulogovan
    }
  }, []); // Prazan dependency array znači "izvršiti samo jednom"

  // 🔑 FUNKCIJA ZA USPEŠNU PRIJAVU
  const handleLogin = () => {
    setIsAuthenticated(true);  // Postavi state na "ulogovan"
    localStorage.setItem('matematika-app-auth', 'true');  // Sačuvaj u browser-u
  };

  // 🚪 FUNKCIJA ZA ODJAVU
  const handleLogout = () => {
    setIsAuthenticated(false);  // Postavi state na "nije ulogovan"
    localStorage.removeItem('matematika-app-auth');
  };

  // Ako korisnik nije prijavljen, prikaži login formu
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Ako je prijavljen, prikaži glavnu aplikaciju
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50">
        {/* Sidebar - fixed na levoj strani */}
        <Sidebar onLogout={handleLogout} />
        
        {/* Main content area - sa marginom za sidebar */}
        <main className="ml-80 min-h-screen">
          <div className="p-8">
            <Routes>
              <Route path="/" element={<Onama />} />
              <Route path="/casovi" element={<Casovi />} />
              <Route path="/kursevi" element={<Kursevi />} />
              <Route path="/lekcije" element={<Lekcije />} />
              <Route path="/kontakt" element={<Kontakt />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
