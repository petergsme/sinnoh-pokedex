import { useTheme } from '../../contexts/ThemeContext/useTheme';
import classNames from 'classnames/bind';
import theme from './button.module.scss';

const cx = classNames.bind(theme);

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  const { theme } = useTheme();

  const buttonClass = cx('btn', 'paragraph-s-medium', { [`btn--color-darkmode`]: theme === 'darkmode' });

  return (
    <>
      <button type="button" onClick={onClick} className={buttonClass}>
        {children}
      </button>
    </>
  );
};
