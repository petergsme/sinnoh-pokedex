import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext/useTheme';
import type { Pokemon } from '../../models/Pokemon';
import { PokemonModal } from '../PokemonModal/PokemonModal';
import classNames from 'classnames/bind';
import theme from './PokemonCard.module.scss';

const cx = classNames.bind(theme);

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = (props: PokemonCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { theme } = useTheme();

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpenModal(false);
      setIsClosing(false);
    }, 300);
  };

  const { pokemon } = props;

  const capitalizedName = pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1);

  return (
    <>
      <article
        className={cx('pokeCard', { 'pokeCard--color-darkmode': theme === 'darkmode' })}
        onClick={() => setIsOpenModal(true)}
      >
        <p className={cx('paragraph-s-medium')}>{`No ${pokemon.id}`}</p>
        <img src={pokemon.image} alt={`${pokemon.name} image`} className={cx('pokeCard__image--size')} />
        <p className={cx('paragraph-m')}>{capitalizedName}</p>
      </article>

      {isOpenModal && (
        <PokemonModal onClose={handleCloseModal} isClosing={isClosing}>
          <section className={cx('')}></section>
        </PokemonModal>
      )}
    </>
  );
};
