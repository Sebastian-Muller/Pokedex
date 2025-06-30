import React, { useState, useEffect } from 'react';
import '../styles/Team.css';
import {  DndContext,  closestCenter,  PointerSensor,  useSensor,  useSensors,  KeyboardSensor,} from '@dnd-kit/core';
import {  arrayMove,  SortableContext,  useSortable,  horizontalListSortingStrategy,} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PopUp from '../components/PopUp';
import { MdDragHandle } from "react-icons/md";

const SortableItem = ({ pokemon, index, onRemove, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pokemon.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative',
    paddingTop: '30px', // espacio para el ícono arriba
  };

  return (
    <div className="team-member" ref={setNodeRef} style={style}>
      {/* Ícono de drag como handle, centrado arriba */}
      <div
        {...attributes}
        {...listeners}
        style={{
            position: 'absolute',
            top: '-10px', // antes estaba en '4px', lo subimos más
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'grab',
            zIndex: 10,
            color: '#4e4e4e',
        }}
        title="Arrastrar para reordenar"
      >
        <MdDragHandle size={24} className="drag-handle"/>
      </div>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        onClick={() => onClick(pokemon)}
        style={{ cursor: 'pointer' }}
      />
      <p>{pokemon.name}</p>
      <div>
        {pokemon.types.map(t => (
          <span key={t.type.name} className={`type-badge type-${t.type.name}`}>
            {t.type.name}
          </span>
        ))}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(pokemon.name);
        }}
      >
        ✕
      </button>
    </div>
  );
};


const Team = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [team, setTeam] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('pokemon-team');
    if (saved) setTeam(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemon-team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await res.json();
      setAllPokemon(data.results);
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered([]);
      return;
    }
    const results = allPokemon.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results.slice(0, 10));
  }, [search, allPokemon]);

  const addToTeam = async (pokemon) => {
    if (team.length >= 6 || team.find(p => p.name === pokemon.name)) return;
    const res = await fetch(pokemon.url);
    const data = await res.json();
    setTeam([...team, data]);
    setSearch('');
    setFiltered([]);
  };

  const removeFromTeam = (name) => {
    setTeam(team.filter(p => p.name !== name));
  };

  const clearTeam = () => setTeam([]);

  // Sensores para detectar drag (mouse/touch/keyboard)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = team.findIndex(p => p.name === active.id);
      const newIndex = team.findIndex(p => p.name === over.id);
      setTeam((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const exportTeam = () => {
    const names = team.map(p => p.name.charAt(0).toUpperCase() + p.name.slice(1)).join(', ');
    navigator.clipboard.writeText(`Mi equipo Pokémon: ${names}`);
    alert('¡Equipo copiado al portapapeles!');
  };

  return (
    <div className="team-container">
      <h1>Tu equipo Pokémon</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {filtered.length > 0 && (
          <ul className="search-results">
            {filtered.map(p => (
              <li key={p.name} onClick={() => addToTeam(p)}>
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={team.map(p => p.name)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="team-grid">
            {[...Array(6)].map((_, i) => {
              const pokemon = team[i];
              return (
                <div className="team-slot" key={i}>
                  {pokemon ? (
                    <SortableItem
                      pokemon={pokemon}
                      index={i}
                      onRemove={removeFromTeam}
                      onClick={setSelected}
                    />
                  ) : (
                    <span className="empty-slot">Slot vacío</span>
                  )}
                </div>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {team.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button className="clear-btn" onClick={clearTeam}>Limpiar equipo</button>
        </div>
      )}

      {selected && <PopUp pokemon={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default Team;


