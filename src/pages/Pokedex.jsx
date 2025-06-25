import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import Button from '../components/Button'; // <--- Importa tu nuevo componente Button
import '../styles/Pokedex.css';

const LIMIT = 50;

const generations = [
  { value: '', label: 'Todas' },
  { value: '1', label: 'Generación 1' },
  { value: '2', label: 'Generación 2' },
  { value: '3', label: 'Generación 3' },
  { value: '4', label: 'Generación 4' },
  { value: '5', label: 'Generación 5' },
  { value: '6', label: 'Generación 6' },
  { value: '7', label: 'Generación 7' },
  { value: '8', label: 'Generación 8' },
  { value: '9', label: 'Generación 9' },
];

const types = [
  '', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const initialFilters = {
  name: '',
  type: '',
  generation: '',
  number: ''
};

const generationRanges = {
  '1': [1, 151],
  '2': [152, 251],
  '3': [252, 386],
  '4': [387, 493],
  '5': [494, 649],
  '6': [650, 721],
  '7': [722, 809],
  '8': [810, 905],
  '9': [906, 1025],
};

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredDetailedList, setFilteredDetailedList] = useState([]);
  const [offset, setOffset] = useState(LIMIT);
  const [error, setError] = useState(null);

  // Cargar todos los pokémon una vez para filtrar localmente
  useEffect(() => {
    const fetchAllPokemons = async () => {
      setLoading(true);
      try {
        // Trae solo los nombres y urls de todos los Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1300&offset=0');
        const data = await response.json();
        setAllPokemons(data.results); // Guarda solo los datos básicos
        setFilteredList(data.results);

        // Carga detalles solo de los primeros 50
        const toShow = data.results.slice(0, LIMIT);
        const detailed = await fetchPokemonDetails(toShow);
        setPokemons(detailed);
        setOffset(LIMIT);
      } catch (error) {
        setError('Error al cargar los Pokémon');
        console.error('Error fetching Pokémon:', error);
      }
      setLoading(false);
    };
    fetchAllPokemons();
  }, []);

  const fetchPokemonDetails = async (pokemonList) => {
    return Promise.all(
      pokemonList.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return await res.json();
      })
    );
  };

  // Filtrar solo cuando se aprieta el botón "Buscar"
  const handleFilter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      const noFilters =
        !filters.name && !filters.type && !filters.generation && !filters.number;

      // Filtro básico solo con datos básicos
      const filtered = noFilters
        ? allPokemons
        : allPokemons.filter(pokemon => {
            const matchesName = filters.name
              ? pokemon.name.toLowerCase().includes(filters.name.toLowerCase())
              : true;
            const matchesGen = filters.generation
              ? (
                  pokemon.url &&
                  (() => {
                    const id = Number(pokemon.url.split('/').filter(Boolean).pop());
                    return (
                      id >= generationRanges[filters.generation][0] &&
                      id <= generationRanges[filters.generation][1]
                    );
                  })()
                )
              : true;
            const matchesNumber = filters.number
              ? (() => {
                  const id = Number(pokemon.url.split('/').filter(Boolean).pop());
                  return String(id) === String(filters.number);
                })()
              : true;
            return matchesName && matchesGen && matchesNumber;
          });

      setFilteredList(filtered);

      // Carga detalles de TODOS los filtrados (puede ser lento si hay muchos)
      let detailed = await fetchPokemonDetails(filtered);

      // Si hay filtro de tipo, filtra sobre los detalles
      if (filters.type) {
        detailed = detailed.filter(pokemon =>
          pokemon.types?.some(t => t.type.name === filters.type)
        );
      }

      setFilteredDetailedList(detailed); // Guarda todos los detallados filtrados
      setPokemons(detailed.slice(0, LIMIT));
      setOffset(LIMIT);
      setLoading(false);
    }, 100);
  };

  // Limpiar filtros y mostrar todos
  const handleClear = async () => {
    setFilters(initialFilters);
    setFilteredList(allPokemons);
    const toShow = allPokemons.slice(0, LIMIT);
    const detailed = await fetchPokemonDetails(toShow);
    setPokemons(detailed);
    setOffset(LIMIT);
  };

  // Cargar más pokémon filtrados
  const handleLoadMore = async () => {
    // Solo necesitas tomar los siguientes del array detallado filtrado
    const more = filteredDetailedList.slice(offset, offset + LIMIT);
    setPokemons([...pokemons, ...more]);
    setOffset(offset + LIMIT);
  };

  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (loading && pokemons.length === 0) {
    return <div style={{ marginTop: 40, textAlign: 'center' }}>Cargando...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', marginTop: 40, textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div>
      <div className="filters-container">
        <form className="pokedex-form" onSubmit={handleFilter}>
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              className="filter-input"
              id="name"
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </div>
          <div>
            <label htmlFor="number">N° Pokédex</label>
            <input
              className="filter-input"
              id="number"
              type="number"
              name="number"
              value={filters.number}
              onChange={handleChange}
              placeholder="N° Pokédex"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="type">Tipo</label>
            <select
              className="filter-input"
              id="type"
              name="type"
              value={filters.type}
              onChange={handleChange}
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Todos los tipos'}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="generation">Generación</label>
            <select
              className="filter-input"
              id="generation"
              name="generation"
              value={filters.generation}
              onChange={handleChange}
            >
              {generations.map(gen => (
                <option key={gen.value} value={gen.value}>{gen.label}</option>
              ))}
            </select>
          </div>
<div className="button-group">
  <Button type="submit">Buscar</Button>
  <Button type="button" onClick={handleClear}>Limpiar</Button>
</div>

        </form>
      </div>

      <div className="pokemon-list" tabIndex={-1}>
        {!loading && pokemons.length === 0 && <div>No hay pokémon para mostrar</div>}
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        {pokemons.length > 0 && pokemons.length < filteredDetailedList.length && (
          <Button onClick={handleLoadMore} disabled={loading}>
            {loading ? 'Cargando...' : 'Cargar más'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pokedex;