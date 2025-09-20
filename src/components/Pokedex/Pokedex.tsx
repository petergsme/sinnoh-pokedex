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
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isloading, setisLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadPokemon = async () => {
      const startId = 387;
      const pokemonCount = 15;

      const ids = [];
      for (let counter = 0; counter < pokemonCount; counter++) {
        ids.push(startId + counter);
      }

      const pokemonData = await fetchMultiplePokemon(ids);
      setPokemon(pokemonData);
      setisLoading(false);
    };
    loadPokemon();
  }, []);
  //   WE'LL ADD ERROR HANDLING

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
      ) : (
        <div className={cx(`pokedex__${viewMode}`)}>
          {pokemon.map((monster) => (
            <PokemonCard key={monster.id} pokemon={monster} />
          ))}
        </div>
      )}
    </div>
  );
};
