import { useTheme } from '../../contexts/ThemeContext/useTheme';
import classNames from 'classnames/bind';
import theme from './PokemonCard.module.scss';
import type { Pokemon } from '../../models/Pokemon';

const cx = classNames.bind(theme);

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = (props: PokemonCardProps) => {
  const { theme } = useTheme();

  const { pokemon } = props;

  const capitalizedName = pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1);

  return (
    <>
      <article className={cx('pokeCard', { 'pokeCard--color-darkmode': theme === 'darkmode' })}>
        <p className={cx('paragraph-s-medium')}>{`No ${pokemon.id}`}</p>
        <img src={pokemon.image} alt={`${pokemon.name} image`} className={cx('pokeCard__image--size')} />
        <p className={cx('paragraph-m')}>{capitalizedName}</p>
      </article>
    </>
  );
};
