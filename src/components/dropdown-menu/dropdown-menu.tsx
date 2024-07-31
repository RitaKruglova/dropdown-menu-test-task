import { FC, ReactNode } from 'react';
import dropdownMenuStyles from './dropdown-menu.module.css';

interface IDropdownMenuProps {
  children: ReactNode;
}

const DropdownMenu: FC<IDropdownMenuProps> = ({ children }) => {
  return <div className={dropdownMenuStyles.container}>{children}</div>;
};

export default DropdownMenu;
