import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonList from './pages/Pokedex.jsx';
import Team from './pages/Team';
import Search from './pages/Search';
import NavBar from './components/NavBar';
import './styles/App.css';
import Pokedex from './pages/Pokedex.jsx';

const appStyle = {
  minHeight: '100vh',
  width: '100vw',
  background: 'radial-gradient(circle at 50% 30%, #1e1e2a, #0e0e14 80%)',
  overflowX: 'hidden',
};

function App() {
  return (
    <Router>
      <div className="App" style={appStyle}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemons" element={<Pokedex />} />
          <Route path="/search" element={<Search />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
