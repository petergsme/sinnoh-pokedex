import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext/useTheme';
import type { Pokemon } from '../../models/Pokemon';
import { getFavorites, isPokemonFavorite } from '../../utils/favoritesUtils';
import { PokemonModal } from '../PokemonModal/PokemonModal';
import { Button } from '../Button/Button';
import { Icon } from '../../assets/icons/Icon';
import { PokemonType } from '../PokemonType/PokemonType';
import { PokemonStatBar } from '../PokemonStatBar/PokemonStatBar';
import classNames from 'classnames/bind';
import theme from './PokemonCard.module.scss';

const cx = classNames.bind(theme);

interface PokemonCardProps {
  pokemon: Pokemon;
  viewMode: 'grid' | 'list';
  onFavoritesChange: (favorites: number[]) => void;
}

export const PokemonCard = ({ pokemon, viewMode, onFavoritesChange }: PokemonCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { theme } = useTheme();

  const togglePokemonFavorite = (pokemonId: number) => {
    const favorites = getFavorites();

    if (isPokemonFavorite(pokemonId)) {
      const newFavorites = favorites.filter((id) => id !== pokemonId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
      onFavoritesChange(newFavorites);
    } else {
      const newFavorites = [...favorites, pokemonId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(true);
      onFavoritesChange(newFavorites);
    }
  };

  const [isFavorite, setIsFavorite] = useState(isPokemonFavorite(pokemon.id));

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpenModal(false);
      setIsClosing(false);
    }, 200);
  };

  const capitalizedName = pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1);

  return (
    <>
      {viewMode === 'grid' ? (
        <article
          className={cx('pokeCard', 'pokeCard__grid', { 'pokeCard--color-darkmode': theme === 'darkmode' })}
          onClick={() => setIsOpenModal(true)}
        >
          <p className={cx('paragraph-s-medium')}>{`No ${pokemon.id}`}</p>
          <img src={pokemon.image} alt={`${pokemon.name} image`} className={cx('pokeCard__grid-image--size')} />
          <p className={cx('paragraph-m')}>{capitalizedName}</p>
        </article>
      ) : (
        <article
          className={cx('pokeCard', 'pokeCard__list', { 'pokeCard--color-darkmode': theme === 'darkmode' })}
          onClick={() => setIsOpenModal(true)}
        >
          <div>
            <p className={cx('paragraph-s-medium')}>{`No ${pokemon.id}`}</p>
            <p className={cx('paragraph-m')}>{capitalizedName}</p>
          </div>
          <img src={pokemon.image} alt={`${pokemon.name} image`} className={cx('pokeCard__list-image--size')} />
        </article>
      )}

      {isOpenModal && (
        <PokemonModal onClose={handleCloseModal} isClosing={isClosing}>
          <section className={cx('pokeCardDetail__topSection')}>
            <div className={cx('pokeCardDetail__buttons')}>
              <Button onClick={() => togglePokemonFavorite(pokemon.id)} toggle={isFavorite} name="Add to favorites">
                <Icon icon="Heart" />
              </Button>

              <Button onClick={() => handleCloseModal()} name="Close">
                <Icon icon="Cross" />
              </Button>
            </div>

            <img src={pokemon.image} alt={`${pokemon.name} image`} className={cx('pokeCardDetail__image--size')} />
          </section>

          <section className={cx('pokeCardDetail__basicInfo')}>
            <h3 className={cx('paragraph-s-medium')}>{`No ${pokemon.id}`}</h3>
            <h2 className={cx('paragraph-l')}>{capitalizedName}</h2>

            <span className={cx('pokeCardDetail__basicInfo-measurements')}>
              <p className={cx('display-label-medium')}>{`${pokemon.height}M`}</p>
              <p className={cx('display-label-medium')}>{`${pokemon.weight}KG`}</p>
            </span>
          </section>

          <div className={cx('pokeCardDetail__types')}>
            {pokemon.types.map((pokemonType) => {
              return <PokemonType key={pokemonType} type={pokemonType} />;
            })}
          </div>

          <p className={cx('paragraph-s-regular')}>{pokemon.description}</p>

          <section className={cx('pokeCardDetail__stats')}>
            <PokemonStatBar value={pokemon.stats.hp} />
            <PokemonStatBar type="attack" value={pokemon.stats.attack} />
            <PokemonStatBar type="defense" value={pokemon.stats.defense} />
          </section>
        </PokemonModal>
      )}
    </>
  );
};
