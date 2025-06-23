import React, { useState } from 'react';
import '../styles/PopUp.css';

const PopUp = ({ pokemon, onClose }) => {
    if (!pokemon) return null;
    const mainAbility = pokemon.abilities?.[0]?.ability?.name;

    // Estado para alternar entre normal y shiny
    const [isShiny, setIsShiny] = useState(false);

    // Elige el sprite según el estado
    const frontSprite = isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;
    const backSprite = isShiny ? pokemon.sprites.back_shiny : pokemon.sprites.back_default;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <button className="popup-close" onClick={onClose}>X</button>
                <div className="popup-flex">
                    {/* Columna izquierda: nombre, sprites, tipos */}
                    <div className="popup-col popup-col-left">
                        <h2 className="popup-name">{pokemon.name} #{pokemon.id}</h2>
                        <div
                            className="popup-sprites-row"
                            onClick={() => setIsShiny((prev) => !prev)}
                            style={{ cursor: 'pointer' }}
                            title="Haz clic para ver la versión shiny"
                        >
                            <img src={frontSprite} alt={pokemon.name + (isShiny ? " shiny frente" : " frente")} className="popup-sprite" />
                            <img src={backSprite} alt={pokemon.name + (isShiny ? " shiny detrás" : " detrás")} className="popup-sprite" />
                        </div>
                        <div className="popup-types">
                            {pokemon.types.map(t => (
                                <span key={t.type.name} className={`type-badge type-${t.type.name}`}>{t.type.name}</span>
                            ))}
                        </div>
                    </div>
                    {/* Columna centro: habilidad, altura, peso */}
                    <div className="popup-col popup-col-center">
                        <div><strong>Habilidad:</strong> {mainAbility}</div>
                        <div><strong>Altura:</strong> {pokemon.height}</div>
                        <div><strong>Peso:</strong> {pokemon.weight}</div>
                    </div>
                    {/* Columna derecha: stats */}
                    <div className="popup-col popup-col-right">
                        <div className="popup-stats-title">Stats</div>
                        <div className="popup-stats-list">
                            <div className="popup-stats-names">
                                {pokemon.stats.map(stat => (
                                    <div key={stat.stat.name}>{stat.stat.name}</div>
                                ))}
                            </div>
                            <div className="popup-stats-values">
                                {pokemon.stats.map(stat => (
                                    <div key={stat.stat.name}>{stat.base_stat}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;