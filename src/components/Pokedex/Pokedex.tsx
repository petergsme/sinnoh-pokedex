import { useEffect, useState } from 'react';
import type { Pokemon } from '../../models/Pokemon';
import { fetchMultiplePokemon } from '../../services/pokeApi';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { Button } from '../Button/Button';
import classNames from 'classnames/bind';
import theme from './Pokedex.module.scss';
import { Icon } from '../../assets/icons/Icon';

const cx = classNames.bind(theme);

export const Pokedex = () => {
  const getLocalViewMode = () => {
    const savedViewMode = localStorage.getItem('viewMode');

    if (savedViewMode === 'grid' || savedViewMode === 'list') {
      return savedViewMode;
    }
    return 'grid';
  };

  const getLocalSelectedPokemon = () => {
    const savedSelectedPokemon = localStorage.getItem('selectedPokemon');

    if (savedSelectedPokemon === 'all' || savedSelectedPokemon === 'favorites') {
      return savedSelectedPokemon;
    }
    return 'all';
  };

  const getFavorites = (): number[] => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  };

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(getLocalViewMode());
  const [showPokemon, setShowPokemon] = useState<'all' | 'favorites'>(getLocalSelectedPokemon());
  const [favorites, setFavorites] = useState<number[]>(getFavorites);

  useEffect(() => {
    const loadPokemon = async () => {
      setError(null);

      try {
        const startId = 387;
        const pokemonCount = 15;

        let ids: number[];

        if (showPokemon === 'favorites') {
          ids = favorites;
        } else {
          ids = [];
          for (let i = 0; i < pokemonCount; i++) {
            ids.push(startId + i);
          }
        }

        const pokemonData = await fetchMultiplePokemon(ids);
        setPokemon(pokemonData);
      } catch (error) {
        setError(`Sorry we've encountered an error: "${error}", please refresh the site`);
      }

      setIsLoading(false);
    };

    loadPokemon();
  }, [showPokemon, favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('viewMode', viewMode);
    } catch (error) {
      console.warn(`Couldn't store viewMode:`, error);
    }
  }, [viewMode]);

  useEffect(() => {
    try {
      localStorage.setItem('selectedPokemon', showPokemon);
    } catch (error) {
      console.warn(`Couldn't store selectedPokemon:`, error);
    }
  }, [showPokemon]);

  return (
    <div className={cx('pokedex')}>
      <section className={cx('pokedex__controls')}>
        <div>
          <p className={cx('paragraph-s-medium')}>View:</p>
          <Button onClick={() => setViewMode('grid')} toggle={viewMode === 'grid'} name="View as grid">
            Grid
          </Button>
          <Button onClick={() => setViewMode('list')} toggle={viewMode === 'list'} name="View as list">
            List
          </Button>
        </div>

        <div>
          <Button onClick={() => setShowPokemon('all')} toggle={showPokemon === 'all'} name="Show all Pokémon">
            All
          </Button>
          <Button
            onClick={() => setShowPokemon('favorites')}
            toggle={showPokemon === 'favorites'}
            name="Show favorite Pokémon"
          >
            <Icon icon="Heart" />
          </Button>
        </div>
      </section>

      {isloading ? (
        <p className={cx('paragraph-m')}>Loading Pokémon...</p>
      ) : error ? (
        <p className={cx('paragraph-m')}>{error}</p>
      ) : showPokemon === 'favorites' && pokemon.length === 0 ? (
        <p className={cx('paragraph-m', 'pokedex__messages')}>You haven't added favorites yet</p>
      ) : (
        <div className={cx(`pokedex__${viewMode}`)}>
          {pokemon.map((monster) => (
            <PokemonCard key={monster.id} pokemon={monster} viewMode={viewMode} onFavoritesChange={setFavorites} />
          ))}
        </div>
      )}
    </div>
  );
};
