import { useTheme } from '../../contexts/Themecontext';
import classNames from 'classnames/bind';
import theme from './button.module.scss';

const cx = classNames.bind(theme);

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  const { theme } = useTheme();

  const buttonClass = cx('btn', `btn--color-${theme}`, 'paragraph-s-medium');

  return (
    <>
      <button type="button" onClick={onClick} className={buttonClass}>
        {children}
      </button>
    </>
  );
};
