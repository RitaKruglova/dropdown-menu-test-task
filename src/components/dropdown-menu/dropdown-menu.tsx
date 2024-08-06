import { forwardRef } from 'react';
import dropdownMenuStyles from './dropdown-menu.module.css';
import { IDropdownMenuProps } from '../../utils/types';



const DropdownMenu = forwardRef<HTMLUListElement, IDropdownMenuProps>(({ children, style, menuPosition }, ref) => {
  return (
    <ul
      ref={ref}
      className={dropdownMenuStyles.container}
      style={{ ...style, top: menuPosition.top, left: menuPosition.left }}
      role="menu"
    >
      {children}
    </ul>
  );
});

export default DropdownMenu;
