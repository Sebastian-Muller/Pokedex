import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

const LIMIT = 50;

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async (currentOffset) => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${currentOffset}`);
      const data = await response.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
      setPokemons((prev) => {
        // Filtra los nuevos que ya existen en prev
        const prevIds = new Set(prev.map(p => p.id));
        const nuevos = detailedPokemons.filter(p => !prevIds.has(p.id));
        return [...prev, ...nuevos];
      });
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons(offset);
    // eslint-disable-next-line
  }, [offset]);

  const handleLoadMore = () => {
    setOffset((prev) => prev + LIMIT);
  };

  return (
    <div>
      <div className="pokemon-list" tabIndex={-1}>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? 'Cargando...' : 'Cargar más'}
        </button>
      </div>
    </div>
  );
};

export default PokemonList;