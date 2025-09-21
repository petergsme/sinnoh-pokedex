import { useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext/useTheme';
import theme from './pokemonModal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(theme);

interface PokemonModalProps {
  children: React.ReactNode;
  isClosing: boolean;
  onClose: () => void;
}

export const PokemonModal = ({ children, isClosing, onClose }: PokemonModalProps) => {
  const { theme } = useTheme();

  const handleModalClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      onClick={handleModalClick}
      className={cx('pokemonModal__background', {
        'pokemonModal__background--closing': isClosing,
        'pokemonModal__background--color-darkmode': theme === 'darkmode',
      })}
    >
      <section
        className={cx('pokemonModal__card', {
          'pokemonModal__card--closing': isClosing,
          'pokemonModal__card--color-darkmode': theme === 'darkmode',
        })}
      >
        {children}
      </section>
    </div>
  );
};
