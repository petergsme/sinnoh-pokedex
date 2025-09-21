import { useEffect, useState } from 'react';
import { usePagination } from '../../hooks/usePagination';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Pokemon } from '../../models/Pokemon';
import { fetchMultiplePokemon, sinnohPokemonIds } from '../../services/pokeApi';
import { getFavorites } from '../../utils/favoritesUtils';
import { getPaginatedIds } from '../../utils/paginationUtils';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { Pagination } from '../Pagination/Pagination';
import { PokedexControls } from '../PokedexControls/PokedexControls';
import classNames from 'classnames/bind';
import theme from './Pokedex.module.scss';

const cx = classNames.bind(theme);

export const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useLocalStorage('viewMode', 'grid', ['grid', 'list']);

  const [showPokemon, setShowPokemon] = useLocalStorage('selectedPokemon', 'all', ['all', 'favorites']);
  const [favorites, setFavorites] = useState<number[]>(getFavorites);

  const totalPokemon = showPokemon === 'favorites' ? favorites.length : sinnohPokemonIds.length;
  const pokemonPerPage = 30;
  const { currentPage, totalPages, goToPage } = usePagination(totalPokemon, pokemonPerPage);

  useEffect(() => {
    const loadPokemon = async () => {
      setError(null);

      try {
        let ids: number[];

        if (showPokemon === 'favorites') {
          ids = getPaginatedIds(favorites, currentPage, pokemonPerPage);
        } else {
          ids = getPaginatedIds(sinnohPokemonIds, currentPage, pokemonPerPage);
        }

        const pokemonData = await fetchMultiplePokemon(ids);
        setPokemon(pokemonData);
      } catch (error) {
        setError(`Sorry we've encountered an error: "${error}", please refresh the site`);
      }

      setIsLoading(false);
    };

    loadPokemon();
  }, [showPokemon, favorites, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className={cx('pokedex')}>
      <PokedexControls
        onPageChange={goToPage}
        setShow={setShowPokemon}
        show={showPokemon}
        setView={setViewMode}
        view={viewMode}
      />

      {isloading ? (
        <p className={cx('paragraph-m')}>Loading Pokémon...</p>
      ) : error ? (
        <p className={cx('paragraph-m')}>{error}</p>
      ) : showPokemon === 'favorites' && pokemon.length === 0 ? (
        <p className={cx('paragraph-m', 'pokedex__messages')}>You haven't added favorites yet</p>
      ) : (
        <div className={cx(`pokedex__${viewMode}`)}>
          {pokemon.map((monster) => (
            <PokemonCard
              key={monster.id}
              pokemon={monster}
              viewMode={viewMode as 'grid' | 'list'}
              onFavoritesChange={setFavorites}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />}
    </div>
  );
};
