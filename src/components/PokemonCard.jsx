import React, { useState } from 'react';
import PopUp from './PopUp';
import '../styles/PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    // Obtén el tipo primario
    const primaryType = pokemon.types[0]?.type.name;

    return (
        <>
            <div className="pokemon-card" onClick={() => setShowPopUp(true)} style={{ cursor: 'pointer' }}>
                <span className="pokemon-number">{pokemon.id}</span>
                <div className={`sprite-bg type-${primaryType}`}>
                    <img className="pokemon-sprite" src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <h2 className="pokemon-name">{pokemon.name}</h2>
                <div className="pokemon-types">
                    {pokemon.types && pokemon.types.map((typeObj) => (
                        <span key={typeObj.type.name} className={`type-badge type-${typeObj.type.name}`}>
                            {typeObj.type.name}
                        </span>
                    ))}
                </div>
            </div>
            {showPopUp && <PopUp pokemon={pokemon} onClose={() => setShowPopUp(false)} />}
        </>
    );
};

export default PokemonCard;

