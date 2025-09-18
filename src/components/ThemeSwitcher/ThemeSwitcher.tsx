import theme from './ThemeSwitcher.module.scss';
import classNames from 'classnames/bind';
import { useTheme } from '../../contexts/ThemeContext/useTheme';
import { Button } from '../Button/Button';
import { Icon } from '../../assets/icons/Icon';

const cx = classNames.bind(theme);

export const ThemeSwitcher = () => {
  const { theme, setLightMode, setDarkMode } = useTheme();

  return (
    <div className={cx('align-end', 'color-switch-block')}>
      <Button onClick={() => setLightMode()} toggle={theme === 'lightmode'}>
        <Icon icon="Sun" size="small" />
      </Button>

      <Button onClick={() => setDarkMode()} toggle={theme === 'darkmode'}>
        <Icon icon="Moon" size="small" />
      </Button>
    </div>
  );
};

// toggledependency inicia en false, puede ser boolean, se usa para sacar una condicion, todos los botones, si esto es true
// adquieren clase que indica toggled, dependes de crear condiciones excluyentes para que 2 en una pareja nunca sean a la vez,
