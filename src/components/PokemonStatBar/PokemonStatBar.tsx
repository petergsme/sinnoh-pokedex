import { useTheme } from '../../contexts/ThemeContext/useTheme';
import { Icon, type IconName } from '../../assets/icons/Icon';
import classNames from 'classnames/bind';
import theme from './PokemonStatBar.module.scss';

const cx = classNames.bind(theme);

interface PokemonStatBarProps {
  type?: 'attack' | 'defense';
  value: number;
}

export const PokemonStatBar = ({ type, value }: PokemonStatBarProps) => {
  const { theme } = useTheme();

  let iconType: IconName = 'Heart';
  let maxRange = 170;

  if (type === 'attack') {
    iconType = 'Arm';
    maxRange = 170;
  }

  if (type === 'defense') {
    iconType = 'Shield';
    maxRange = 170;
  }

  return (
    <div className={cx('pokemonStatBar', { 'pokemonStatBar__progress--color-darkmode': theme === 'darkmode' })}>
      <span className={cx('pokemonStatBar__values')}>
        <Icon icon={iconType} />
        <p className={cx('paragraph-s-medium')}>{value}</p>
      </span>

      <progress max={maxRange} value={value}></progress>
    </div>
  );
};
