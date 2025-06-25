import React, { useEffect } from 'react';
import '../styles/Home.css';
import pokemonLogo from '../assets/logos/Pokemon.png';

const Home = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="home">
      <div>
        <img src={pokemonLogo} alt="Pokémon Logo" className="home-logo" />
      </div>
    </div>
  );
};

export default Home;