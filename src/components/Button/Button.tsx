import { useTheme } from '../../contexts/ThemeContext/useTheme';
import classNames from 'classnames/bind';
import theme from './button.module.scss';

const cx = classNames.bind(theme);

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  toggle?: boolean;
  name?: string;
  isDisabled?: boolean;
}

export const Button = ({ onClick, children, toggle = false, name, isDisabled = false }: ButtonProps) => {
  const { theme } = useTheme();

  const buttonClass = cx('btn', 'paragraph-s-medium', {
    [`btn--color-darkmode`]: theme === 'darkmode',
    [`btn--color-toggled`]: toggle,
  });

  return (
    <>
      <button type="button" onClick={onClick} className={buttonClass} title={name} disabled={isDisabled}>
        {children}
      </button>
    </>
  );
};
