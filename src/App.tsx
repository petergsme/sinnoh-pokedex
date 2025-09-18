import { Icon } from './assets/icons/Icon';
import pokemon_logo_dark from './assets/Pokemon-logo-dark.svg';
import './App.scss';

function App() {
  return (
    <>
      <img src={pokemon_logo_dark} alt="pokemon logo outlined" title="Pokemon logo" />
      <p className="display-titles">sinnoh</p>
      <Icon icon="Sun" color="light" size="large" />
    </>
  );
}

export default App;
