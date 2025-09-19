import type { PokemonApiResponse } from '../models/PokeApiResponse';
import type { PokemonSpeciesResponse } from '../models/PokemonSpeciesResponse';
import type { Pokemon } from '../models/Pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

const getDescription = async (id: number): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
    const data: PokemonSpeciesResponse = await response.json();

    const englishEntry = data.flavor_text_entries.find((entry) => entry.language.name === 'en');

    if (englishEntry) {
      return englishEntry.flavor_text.replace(/[\f\n\s]+/g, ' ').trim();
    }
    // Description may not be a clean string, since we're not specifying a game we have to clean it up.

    return 'No description available.';
  } catch (error) {
    console.warn(`Could not fetch description for pokemon ${id}:`, error);
    return 'Description unavailable.';
  }
};

const transformPokemon = (apiData: PokemonApiResponse, description: string): Pokemon => {
  const getImage = () => {
    const homeSprite = apiData.sprites.other.home.front_default;
    const officialSprite = apiData.sprites.other['official-artwork'].front_default;

    if (homeSprite) {
      return homeSprite;
    } else if (officialSprite) {
      return officialSprite;
    }
    // If somehow the url sprites aren't in the apiResponse, we try to get it from the github repo.
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${apiData.id}.png`;
  };

  return {
    id: apiData.id,
    name: apiData.name,
    image: getImage(),
    types: apiData.types.map((typeObj) => typeObj.type.name),
    height: apiData.height / 10,
    weight: apiData.weight / 10,
    description,
    stats: {
      hp: apiData.stats.find((statObj) => statObj.stat.name === 'hp')?.base_stat ?? 0,
      attack: apiData.stats.find((statObj) => statObj.stat.name === 'attack')?.base_stat ?? 0,
      defense: apiData.stats.find((statObj) => statObj.stat.name === 'defense')?.base_stat ?? 0,
    },
  };
};

export const fetchPokemon = async (id: number): Promise<Pokemon> => {
  try {
    const [pokemonResponse, description] = await Promise.all([fetch(`${BASE_URL}/pokemon/${id}`), getDescription(id)]);

    if (!pokemonResponse.ok) {
      throw new Error(`Pokemon ${id} not found`);
    }

    const pokemonData: PokemonApiResponse = await pokemonResponse.json();
    // Parsing body takes time hence the await.
    return transformPokemon(pokemonData, description);
  } catch (error) {
    console.error(`Error fetching pokemon ${id}:`, error);
    throw error;
  }
};

export const fetchMultiplePokemon = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    const promises = ids.map((id) => fetchPokemon(id));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching multiple pokemon:', error);
    throw error;
  }
};
