import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Pokemon } from '../../models/Pokemon';
import { fetchMultiplePokemon, sinnohPokemonIds } from '../../services/pokeApi';
import { getFavorites } from '../../utils/favoritesUtils';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { Button } from '../Button/Button';
import classNames from 'classnames/bind';
import theme from './Pokedex.module.scss';
import { Icon } from '../../assets/icons/Icon';

const cx = classNames.bind(theme);

export const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useLocalStorage('viewMode', 'grid', ['grid', 'list']);

  const [showPokemon, setShowPokemon] = useLocalStorage('selectedPokemon', 'all', ['all', 'favorites']);
  const [favorites, setFavorites] = useState<number[]>(getFavorites);

  const [searchParams, setSearchParams] = useSearchParams();

  const totalPokemon = showPokemon === 'favorites' ? favorites.length : sinnohPokemonIds.length;
  const pokemonPerPage = 30;
  const totalPages = Math.ceil(totalPokemon / pokemonPerPage);
  const currentPage = (() => {
    const page = Number(searchParams.get('page')) || 1;
    return page > totalPages ? 1 : page;
  })();
  const goToPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  useEffect(() => {
    const loadPokemon = async () => {
      setError(null);

      try {
        let ids: number[];

        if (showPokemon === 'favorites') {
          const startIndex = (currentPage - 1) * pokemonPerPage;
          const endIndex = startIndex + pokemonPerPage;
          ids = favorites.slice(startIndex, endIndex);
        } else {
          const startIndex = (currentPage - 1) * pokemonPerPage;
          const endIndex = startIndex + pokemonPerPage;
          ids = sinnohPokemonIds.slice(startIndex, endIndex);
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
            onClick={() => {
              setShowPokemon('favorites');
              goToPage(1);
            }}
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
            <PokemonCard
              key={monster.id}
              pokemon={monster}
              viewMode={viewMode as 'grid' | 'list'}
              onFavoritesChange={setFavorites}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <section className={cx('pokedex__pagination')}>
          {/* If we are on page 3 or higher, a button to go to the first page appears */}
          {currentPage >= 3 && (
            <Button onClick={() => goToPage(1)} name={`Page ${currentPage - 1}`}>
              First
            </Button>
          )}

          {/* If not on the first page, create a button that will dynamically take you to the previous page */}
          {currentPage !== 1 && (
            <Button onClick={() => goToPage(currentPage - 1)} name={`Page ${currentPage - 1}`}>
              {currentPage - 1}
            </Button>
          )}

          {/* Current page button */}
          <Button onClick={() => {}} name={`Page ${currentPage}`} toggle={currentPage === currentPage}>
            {currentPage}
          </Button>

          {/* If not on the lastPage, create a button to go to the next page. */}
          {currentPage !== totalPages && (
            <Button onClick={() => goToPage(currentPage + 1)} name={`Page ${currentPage + 1}`}>
              {currentPage + 1}
            </Button>
          )}

          {/* If on a page before the page previous to the last one, create a button to go to the last page. */}
          {currentPage < totalPages - 1 && (
            <Button onClick={() => goToPage(totalPages)} name={`Page ${currentPage - 1}`}>
              Last
            </Button>
          )}
        </section>
      )}
    </div>
  );
};
