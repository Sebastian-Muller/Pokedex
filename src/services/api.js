import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemons = async (limit = 20, offset = 0) => {
    try {
        const response = await axios.get(`${API_URL}?limit=${limit}&offset=${offset}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
};

export const fetchPokemonDetails = async (pokemonName) => {
    try {
        const response = await axios.get(`${API_URL}/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for ${pokemonName}:`, error);
        throw error;
    }
};