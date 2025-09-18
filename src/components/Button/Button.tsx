import classNames from 'classnames/bind';
import theme from './button.module.scss';

const cx = classNames.bind(theme);

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  const buttonClass = cx('btn', `btn--color-darkmodeneedscontext`, 'paragraph-s-medium');

  return (
    <>
      <button type="button" onClick={onClick} className={buttonClass}>
        {children}
      </button>
    </>
  );
};
