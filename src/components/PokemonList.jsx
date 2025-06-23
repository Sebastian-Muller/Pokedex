import React, { useEffect, useState } from 'react';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
      .then((response) => response.json())
      .then((data) => setPokemons(data.results))
      .catch((error) => console.error('Error fetching Pokémon:', error));
  }, []);

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon, index) => (
        <div key={index} className="pokemon-card">
          <h3 className="pokemon-name">{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;