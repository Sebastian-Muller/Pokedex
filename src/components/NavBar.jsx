import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';
import Signature from '../assets/logos/Firma.png';

const pageNames = {
  '/': 'Inicio',
  '/pokemons': 'Pokédex',
  '/search': 'Buscar',
  '/team': 'Equipo',
};

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = pageNames[location.pathname] || 'Pokémon';

  return (
    <nav className="navbar">
      <div className="navbar-title">{pageTitle}</div>
      <a href="https://sebamuller-portfolio-dev.web.app/" target="_blank" rel="noopener noreferrer" className="firma-link">
        <img src={Signature} alt="Created by" className="firma-navbar" />
      </a>
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
        <Link to="/pokedex" onClick={() => setOpen(false)}>Pokédex</Link>
        <Link to="/team" onClick={() => setOpen(false)}>Equipo</Link>
      </div>
    </nav>
  );
};

export default NavBar;