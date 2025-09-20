import { useState, useEffect } from 'react';
import { fetchPokemon } from './services/pokeApi';
import type { Pokemon } from './models/Pokemon';
import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';
import { PokemonCard } from './components/PokemonCard/PokemonCard';
import { PokemonLogo } from './components/PokemonLogo/PokemonLogo';
import classNames from 'classnames/bind';
import theme from './App.module.scss';

const cx = classNames.bind(theme);

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch whatever pokemon chosen through id
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const pokemonData = await fetchPokemon(398);
        setPokemon(pokemonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading pokemon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  return (
    <>
      <ThemeSwitcher />

      <header>
        <PokemonLogo />
        <h1 className={cx('display-titles', 'text-align-center')}>sinnoh</h1>
      </header>

      <p className={cx('sinnoh-introductory-text', 'paragraph-s-regular')}>
        The Sinnoh region, formerly Hisui, is a region of the Pokémon world located north of Kanto, Johto, and Hoenn. It
        is the setting of Pokémon Diamond, Pearl, Platinum, Brilliant Diamond, Shining Pearl, and Legends: Arceus; the
        latter explores the region's earlier history when it was still known as Hisui. It was the fourth core series
        region to be introduced.
      </p>

      {loading && <p>Cargando Pokémon...</p>}
      {error && <p>Error: {error}</p>}
      {pokemon && <PokemonCard pokemon={pokemon} />}

      <p className={cx('paragraph-s-regular')}>Created by Pedro García</p>
    </>
  );
}

export default App;
