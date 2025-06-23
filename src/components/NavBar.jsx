import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/pokemons">Pokémon</Link>
      <Link to="/team">Crea tu equipo</Link>
    </nav>
  );
};

export default NavBar;