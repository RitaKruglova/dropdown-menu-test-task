import { FC } from 'react';
import menuItemStyles from './menu-item.module.css';

interface IMenuItemProps {
  text: string;
  iconPath: string;
  alt: string;
}

const MenuItem: FC<IMenuItemProps> = ({ text, iconPath, alt }) => {
  return (
    <div className={menuItemStyles.container}>
      <p className={menuItemStyles.text}>{text}</p>
      <img className={menuItemStyles.icon} src={iconPath} alt={alt} />
    </div>
  );
};

export default MenuItem;