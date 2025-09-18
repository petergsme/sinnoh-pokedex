import { createElement } from 'react';
import { icons } from './icons';
import classNames from 'classnames/bind';
import theme from './icon.module.scss';

const cx = classNames.bind(theme);

type IconName = keyof typeof icons;

interface IconProps {
  icon: IconName;
  size?: 'small' | 'medium' | 'large';
  color?: 'dark' | 'light';
  extraClass?: string;
}

export const Icon = ({ icon, size = 'small', color = 'light', extraClass }: IconProps) => {
  return (
    <span
      className={cx(
        {
          icon: true,
          [`icon__size--${size}`]: true,
          [`icon__color--${color}`]: true,
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
