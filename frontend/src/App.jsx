import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Onama from './routes/Onama';
import Casovi from './routes/Casovi';
import Kursevi from './routes/Kursevi';
import Lekcije from './routes/Lekcije';
import Definicije from './routes/Definicije';
import Kontakt from './routes/Kontakt';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Proveri da li je korisnik već prijavljen (localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('matematika-app-auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Funkcija za uspešnu prijavu
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('matematika-app-auth', 'true');
  };

  // Funkcija za odjavu (može se dodati kasnije)
  const handleLogout = () => {
    setIsAuthenticated(false);
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
              <Route path="/definicije" element={<Definicije />} />
              <Route path="/kontakt" element={<Kontakt />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
