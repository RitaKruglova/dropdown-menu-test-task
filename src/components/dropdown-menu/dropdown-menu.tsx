import { CSSProperties, FC, ReactNode, forwardRef } from 'react';
import dropdownMenuStyles from './dropdown-menu.module.css';
import { TMenuPosition } from '../../utils/types';

interface IDropdownMenuProps {
  children: ReactNode;
  style?: CSSProperties;
  menuPosition: TMenuPosition;
}

const DropdownMenu = forwardRef<HTMLUListElement, IDropdownMenuProps>(
  ({ children, style, menuPosition }, ref) => {
    return (
      <ul
        ref={ref}
        className={dropdownMenuStyles.container}
        style={{...style, top: menuPosition.top, left: menuPosition.left}}
        role="menu"
      >
        {children}
      </ul>
    );
  }
);

export default DropdownMenu;
