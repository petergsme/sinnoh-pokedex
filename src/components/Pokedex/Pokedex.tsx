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

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(getLocalViewMode());

  useEffect(() => {
    const loadPokemon = async () => {
      setError(null);

      try {
        const startId = 387;
        const pokemonCount = 15;

        const ids = [];
        for (let i = 0; i < pokemonCount; i++) {
          ids.push(startId + i);
        }

        const pokemonData = await fetchMultiplePokemon(ids);
        setPokemon(pokemonData);
      } catch (error) {
        setError(`Sorry we've encountered an error: "${error}", please refresh the site`);
      }

      setIsLoading(false);
    };

    loadPokemon();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('viewMode', viewMode);
    } catch (error) {
      console.warn(`Couldn't store theme:`, error);
    }
  }, [viewMode]);

  return (
    <div className={cx('pokedex')}>
      <section className={cx('pokedex__controls')}>
        <div>
          <p className={cx('paragraph-s-medium')}>View:</p>
          <Button onClick={() => setViewMode('grid')} toggle={viewMode === 'grid'}>
            Grid
          </Button>
          <Button onClick={() => setViewMode('list')} toggle={viewMode === 'list'}>
            List
          </Button>
        </div>

        <div>
          <Button onClick={() => console.log('hola')}>All</Button>
          <Button onClick={() => console.log('hola')}>
            <Icon icon="Heart" />
          </Button>
        </div>
      </section>

      {isloading ? (
        <p className={'paragraph-m'}>Loading Pokémon...</p>
      ) : error ? (
        <div className={cx('error-container')}>
          <p className={'paragraph-m'}>{error}</p>
        </div>
      ) : (
        <div className={cx(`pokedex__${viewMode}`)}>
          {pokemon.map((monster) => (
            <PokemonCard key={monster.id} pokemon={monster} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
};
