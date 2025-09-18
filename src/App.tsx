import pokemon_logo_dark from './assets/Pokemon-logo-dark.svg';
import pokemon_logo_light from './assets/pokemon-logo-light.svg';
import classNames from 'classnames/bind';
import theme from './App.module.scss';
import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';
import { useTheme } from './contexts/ThemeContext/useTheme';

const cx = classNames.bind(theme);

function App() {
  const { theme } = useTheme();

  const isThemeLight = theme === 'lightmode';

  return (
    <>
      <ThemeSwitcher />

      <header>
        <img
          src={isThemeLight ? pokemon_logo_dark : pokemon_logo_light}
          alt="pokemon logo outlined"
          title="Pokemon logo"
          className={cx('pokemon-logo')}
        />
        <h1 className={cx('display-titles', 'text-align-center')}>sinnoh</h1>
      </header>

      <p className={cx('sinnoh-introductory-text', 'paragraph-s-regular')}>
        The Sinnoh region, formerly Hisui, is a region of the Pokémon world located north of Kanto, Johto, and Hoenn. It
        is the setting of Pokémon Diamond, Pearl, Platinum, Brilliant Diamond, Shining Pearl, and Legends: Arceus; the
        latter explores the region's earlier history when it was still known as Hisui. It was the fourth core series
        region to be introduced.
      </p>
    </>
  );
}

export default App;
