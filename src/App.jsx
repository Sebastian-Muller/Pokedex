import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import NavBar from './components/NavBar';
import Loader from './components/Loader';
import './styles/App.css';
import Pokedex from './pages/Pokedex.jsx';

const appStyle = {
  minHeight: '100vh',
  width: '100vw',
  background: 'radial-gradient(circle at 50% 30%, #1e1e2a, #0e0e14 80%)',
  overflowX: 'hidden',
};

// Componente para manejar el loader en los cambios de página
function AppRoutesWithLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemons" element={<Pokedex />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App" style={appStyle}>
        <NavBar />
        <AppRoutesWithLoader />
      </div>
    </Router>
  );
}

export default App;
