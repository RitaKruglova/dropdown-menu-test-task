import { FC } from 'react';
import menuItemStyles from './menu-item.module.css';
import { IMenuItemProps } from '../../utils/types';

const MenuItem: FC<IMenuItemProps> = ({ text, iconPath, alt }) => {
  function handleClick(): void {
    console.log(`Нажата кнопка "${text}"`);
  }

  return (
    <li className={menuItemStyles.container} aria-label={alt} onClick={handleClick} role="menuitem">
      <p className={menuItemStyles.text}>{text}</p>
      <img className={menuItemStyles.icon} src={iconPath} alt={alt} />
    </li>
  );
};

export default MenuItem;
