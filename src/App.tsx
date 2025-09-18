import { Icon } from './assets/icons/Icon';
import pokemon_logo_dark from './assets/Pokemon-logo-dark.svg';
import classNames from 'classnames/bind';
import theme from './App.module.scss';
import { Button } from './components/Button/Button';
import { ThemeProvider } from './contexts/ThemeContext/ThemeProvider';

const cx = classNames.bind(theme);

function App() {
  return (
    <ThemeProvider>
      <div className={cx('align-end', 'color-switch-block')}>
        <Button onClick={() => console.log('hambre')}>Judías</Button>
        <Button onClick={() => console.log('hambre')}>
          <Icon icon="Moon" size="small" />
        </Button>
      </div>

      <header>
        <img src={pokemon_logo_dark} alt="pokemon logo outlined" title="Pokemon logo" className={cx('pokemon-logo')} />
        <h1 className={cx('display-titles', 'text-align-center')}>sinnoh</h1>
      </header>

      <p className={cx('sinnoh-introductory-text', 'paragraph-s-regular')}>
        The Sinnoh region, formerly Hisui, is a region of the Pokémon world located north of Kanto, Johto, and Hoenn. It
        is the setting of Pokémon Diamond, Pearl, Platinum, Brilliant Diamond, Shining Pearl, and Legends: Arceus; the
        latter explores the region's earlier history when it was still known as Hisui. It was the fourth core series
        region to be introduced.
      </p>
    </ThemeProvider>
  );
}

export default App;
