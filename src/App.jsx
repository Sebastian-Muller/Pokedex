import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonList from './components/PokemonList';
import Team from './pages/Team';
import NavBar from './components/NavBar';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* La barra de navegación está fuera de las rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemons" element={<PokemonList />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;