import type { PokemonApiResponse } from '../models/PokeApiResponse';
import type { PokemonSpeciesResponse } from '../models/PokemonSpeciesResponse';
import type { Pokemon } from '../models/Pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const sinnohPokemonIds = [
  387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 63, 64, 65, 129, 130,
  406, 315, 407, 41, 42, 169, 74, 75, 76, 95, 208, 408, 409, 410, 411, 66, 67, 68, 54, 55, 412, 413, 414, 265, 266, 267,
  268, 269, 415, 416, 417, 418, 419, 420, 421, 422, 423, 214, 190, 424, 425, 426, 427, 428, 92, 93, 94, 200, 429, 198,
  430, 431, 432, 118, 119, 339, 340, 433, 358, 434, 435, 307, 308, 436, 437, 77, 78, 438, 185, 439, 122, 440, 113, 242,
  173, 35, 36, 441, 172, 25, 26, 163, 164, 442, 443, 444, 445, 446, 143, 201, 447, 448, 194, 195, 278, 279, 203, 449,
  450, 298, 183, 184, 451, 452, 453, 454, 455, 223, 224, 456, 457, 72, 73, 349, 350, 458, 226, 459, 460, 215, 461, 480,
  481, 482, 483, 484, 490, 479, 207, 472, 299, 476, 280, 281, 282, 475, 108, 463, 133, 134, 135, 136, 196, 197, 470,
  471, 333, 334, 175, 176, 468, 228, 229, 81, 82, 462, 114, 465, 193, 469, 357, 111, 112, 464, 355, 356, 477, 137, 233,
  474, 123, 212, 239, 125, 466, 240, 126, 467, 220, 221, 473, 361, 362, 478, 359, 487,
];

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

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${apiData.id}.png`;
  };

  const normalizeName = (name: string, id: number): string => {
    if ((id === 413 || id === 487) && name.includes('-')) {
      return name.split('-')[0];
    }
    return name;
  };

  return {
    id: apiData.id,
    name: normalizeName(apiData.name, apiData.id),
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
