import React, { useState, useEffect } from 'react';
import '../styles/PopUp.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const PopUp = ({ pokemon, onClose }) => {
    if (!pokemon) return null;
    const mainAbility = pokemon.abilities?.[0]?.ability?.name;
    const mainAbilityUrl = pokemon.abilities?.[0]?.ability?.url;
    const [abilityDesc, setAbilityDesc] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);

    const [isShiny, setIsShiny] = useState(false);
    const [glow, setGlow] = useState(false);

    const frontSprite = isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default;
    const backSprite = isShiny ? pokemon.sprites.back_shiny : pokemon.sprites.back_default;

    // Chart.js data
    const statLabels = pokemon.stats.map(stat => stat.stat.name);
    const statValues = pokemon.stats.map(stat => stat.base_stat);

    const maxStat = Math.max(...statValues) + 20;

    const statColors = [
        '#FF6384', // HP
        '#36A2EB', // Attack
        '#FFCE56', // Defense
        '#4BC0C0', // Sp. Atk
        '#9966FF', // Sp. Def
        '#FF9F40', // Speed
    ];

    const data = {
        labels: statLabels,
        datasets: [
            {
                label: 'Stats',
                data: statValues,
                backgroundColor: statColors,
                borderRadius: 6,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        plugins: {
            legend: { display: false },
            title: { display: false },
            datalabels: {
                color: '#222',
                anchor: 'end',
                align: 'right',
                font: { weight: 'bold', size: 14 },
                formatter: value => value,
            },
        },
        scales: {
            x: {
                min: 0,
                max: maxStat, // <--- aquí usas la variable calculada
                grid: { display: false },
            },
            y: {
                grid: { display: false },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    // Maneja el click para alternar y activar el glow
    const handleSpriteClick = () => {
        setIsShiny(prev => !prev);
        setGlow(true);
        setTimeout(() => setGlow(false), 800); // Dura lo mismo que la animación
    };

    const primaryType = pokemon.types[0]?.type.name;
    const typeColor = getComputedStyle(document.documentElement).getPropertyValue(`--type-${primaryType}`) || '#fff';

    const popupBg = `linear-gradient(135deg, ${typeColor.trim()} 0%, #fff 80%)`;

    useEffect(() => {
        if (!mainAbilityUrl) return;
        fetch(mainAbilityUrl)
            .then(res => res.json())
            .then(data => {
                const entry = data.effect_entries.find(e => e.language.name === 'es') ||
                              data.effect_entries.find(e => e.language.name === 'en');
                setAbilityDesc(entry ? entry.effect : '');
            });
    }, [mainAbilityUrl]);

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div
                className="popup-content"
                style={{ background: popupBg }}
                onClick={e => e.stopPropagation()}
            >
                <button className="popup-close" onClick={onClose}>X</button>
                <div className="popup-flex">
                    {/* Columna izquierda: nombre, sprites, tipos */}
                    <div className="popup-col popup-col-left">
                        <h2 className="popup-name">{pokemon.name}</h2>
                        <div
                            className="popup-sprites-row"
                            onClick={handleSpriteClick}
                            style={{ cursor: 'pointer' }}
                            title="Haz clic para ver la versión shiny"
                        >
                            <img
                                src={frontSprite}
                                alt={pokemon.name + (isShiny ? " shiny frente" : " frente")}
                                className={`popup-sprite${glow ? ' shiny-glow' : ''}`}
                            />
                            <img
                                src={backSprite}
                                alt={pokemon.name + (isShiny ? " shiny detrás" : " detrás")}
                                className={`popup-sprite${glow ? ' shiny-glow' : ''}`}
                            />
                        </div>
                        <div className="popup-types">
                            {pokemon.types.map(t => (
                                <span key={t.type.name} className={`type-badge type-${t.type.name}`}>{t.type.name}</span>
                            ))}
                        </div>
                    </div>
                    {/* Columna centro: habilidad, altura, peso */}
                    <div className="popup-col popup-col-center">
                        <div style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                            <strong>Habilidad:</strong>{' '}
                            <span
                                style={{ textDecoration: 'underline', cursor: 'help', color: 'black', fontWeight: 'bold' }}
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                {mainAbility}
                            </span>
                            {showTooltip && abilityDesc && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '120%',
                                        transform: 'translateX(-50%)',
                                        background: '#fff',
                                        color: 'black',
                                        border: '1px solid #ccc',
                                        borderRadius: 8,
                                        padding: '8px 12px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                        zIndex: 10,
                                        minWidth: 180,
                                        maxWidth: 260,
                                        fontSize: '0.95em',
                                        whiteSpace: 'normal'
                                    }}
                                >
                                    {abilityDesc}
                                </div>
                            )}
                        </div>
                        <div style={{color: 'black' }}><strong>Altura:</strong> {(pokemon.height / 10).toFixed(2)} m</div>
                        <div style={{color: 'black' }}><strong>Peso:</strong> {(pokemon.weight / 10).toFixed(1)} kg</div>
                    </div>
                    {/* Columna derecha: stats con Chart.js */}
                    <div className="popup-col popup-col-right" style={{ minWidth: 220, maxWidth: 260 }}>
                        <div className="popup-stats-title" style={{color: 'black' }}>Stats</div>
                        <div style={{ width: 300, height: 180 }}>
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;