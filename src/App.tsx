import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher';
import { Pokedex } from './components/Pokedex/Pokedex';
import { PokemonLogo } from './components/PokemonLogo/PokemonLogo';
import classNames from 'classnames/bind';
import theme from './App.module.scss';

const cx = classNames.bind(theme);

function App() {
  return (
    <>
      <ThemeSwitcher />

      <header>
        <PokemonLogo />
        <h1 className={cx('display-titles', 'text-align-center')}>sinnoh</h1>
      </header>

      <p className={cx('sinnoh-introductory-text', 'paragraph-s-regular')}>
        The Sinnoh region, formerly Hisui, is a region of the Pokémon world located north of Kanto, Johto, and Hoenn. It
        is the setting of Pokémon Diamond, Pearl, Platinum, Brilliant Diamond, Shining Pearl, and Legends: Arceus; the
        latter explores the region's earlier history when it was still known as Hisui. It was the fourth core series
        region to be introduced.
      </p>

      <Pokedex />

      <p className={cx('paragraph-s-regular')}>Created by Pedro García</p>
    </>
  );
}

export default App;
