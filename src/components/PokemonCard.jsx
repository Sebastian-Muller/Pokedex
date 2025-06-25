import React, { useState } from 'react';
import PopUp from './PopUp';
import '../styles/PokemonCard.css';

const typeBackgrounds = {
    fire: require('../assets/types-background/fire.jpg'),
    water: require('../assets/types-background/water.jpg'),
    grass: require('../assets/types-background/grass.jpg'),
    electric: require('../assets/types-background/electric.jpg'),
    poison:  require('../assets/types-background/poison.jpg'),
    ground: require('../assets/types-background/ground.jpg'),
    rock: require('../assets/types-background/rock.jpg'),
    fairy: require('../assets/types-background/fairy.jpg'),
    fighting: require('../assets/types-background/fighting.jpg'),
    psychic: require('../assets/types-background/psychic.jpg'),
    bug: require('../assets/types-background/bug.jpg'),
    normal: require('../assets/types-background/normal.jpg'),
    ice: require('../assets/types-background/ice.jpg'),
    dragon: require('../assets/types-background/dragon.jpg'),
    ghost: require('../assets/types-background/ghost.jpg'),
    steel: require('../assets/types-background/steel.jpg'),
    dark: require('../assets/types-background/dark.jpg'),
    flying: require('../assets/types-background/flying.jpg')
};

const PokemonCard = ({ pokemon }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    const primaryType = pokemon.types?.[0]?.type?.name;
    const bgImage = typeBackgrounds[primaryType];

    return (
        <div>
            <div className="pokemon-card" onClick={() => setShowPopUp(true)} style={{ cursor: 'pointer' }}>
                <span className="pokemon-number">{pokemon.id}</span>
                <div
                    className={`sprite-bg type-${primaryType}`}
                    style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                    <img className="pokemon-sprite" src={pokemon.sprites?.front_default} alt={pokemon.name} />
                </div>
                <h2 className="pokemon-name">{pokemon.name}</h2>
                <div className="pokemon-types">
                    {pokemon.types?.length > 0 && pokemon.types.map((typeObj) => (
                        <span key={typeObj.type.name} className={`type-badge type-${typeObj.type.name}`}>
                            {typeObj.type.name}
                        </span>
                    ))}
                </div>
            </div>
            {showPopUp && <PopUp pokemon={pokemon} onClose={() => setShowPopUp(false)} />}
        </div>
    );
};

export default PokemonCard;

