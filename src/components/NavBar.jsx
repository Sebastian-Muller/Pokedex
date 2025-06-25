import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';

const pageNames = {
  '/': 'Inicio',
  '/pokemons': 'Pokédex',
  '/search': 'Buscar',
  '/team': 'Crea tu equipo',
};

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = pageNames[location.pathname] || 'Pokémon';

  return (
    <nav className="navbar">
      <div className="navbar-title">{pageTitle}</div>
      <button
        className="navbar-hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`navbar-links${open ? ' open' : ''}`}>
        <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
        <Link to="/pokemons" onClick={() => setOpen(false)}>Pokédex</Link>
        <Link to="/search" onClick={() => setOpen(false)}>Buscar</Link>
        <Link to="/team" onClick={() => setOpen(false)}>Crea tu equipo</Link>
      </div>
    </nav>
  );
};

export default NavBar;