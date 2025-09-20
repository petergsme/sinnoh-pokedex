import classNames from 'classnames/bind';
import theme from './pokemonType.module.scss';

const cx = classNames.bind(theme);

interface PokemonTypeProps {
  type: string;
}

export const PokemonType = ({ type }: PokemonTypeProps) => {
  return (
    <span className={cx('pokemonType', `pokemonType--background-color-${type}`)}>
      <p className={cx('display-label-regular')}>{type}</p>
    </span>
  );
};
