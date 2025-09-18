import { createElement } from 'react';
import { useTheme } from '../../contexts/ThemeContext/useTheme';
import { icons } from './icons';
import classNames from 'classnames/bind';
import theme from './icon.module.scss';

const cx = classNames.bind(theme);

type IconName = keyof typeof icons;

interface IconProps {
  icon: IconName;
  size?: 'small' | 'medium' | 'large';
  extraClass?: string;
}

export const Icon = ({ icon, size = 'small', extraClass }: IconProps) => {
  const { theme } = useTheme();

  return (
    <span
      className={cx(
        {
          icon: true,
          [`icon__size--${size}`]: true,
          [`icon__color--onlight`]: theme === 'lightmode',
          [`icon__color--ondark`]: theme === 'darkmode',
        },
        extraClass
      )}
      role="img"
      title={`${icon}-icon`}
    >
      {createElement(icons[icon], {})}
    </span>
  );
};
