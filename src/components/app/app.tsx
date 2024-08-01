import { FC, useEffect, useRef, useState } from 'react';
import appStyles from './app.module.css';
import MoreButton from '../more-button/more-button';
import DropdownMenu from '../dropdown-menu/dropdown-menu';
import MenuItem from '../menu-item/menu-item';
import shareIconPath from '../../images/share.svg';
import editIconPath from '../../images/edit.svg';
import trashIconPath from '../../images/trash.svg';
import { buttonDeleteText, buttonEditText, buttonShareText, menuWidth } from '../../utils/constants';
import { TMenuPosition } from '../../utils/types';

const App: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<TMenuPosition>({top: 0, left: 0});
  const menuRef = useRef<HTMLDivElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    if (menuRef.current === null) {
      return;
    }

    let left;
    let top;
    if (window.innerWidth - event.clientX >= menuWidth) {
      left = event.clientX;
    } else {
      left = event.clientX - menuWidth;
    }

    if (window.innerHeight - event.clientY >= menuRef.current.offsetHeight) {
      top = event.clientY;
    } else {
      top = event.clientY - menuRef.current.offsetHeight;
    }
    setMenuPosition({top: top, left: left});

    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }

  function showContextMenu(event: MouseEvent): void {
    event.preventDefault();
    if (menuRef.current === null) {
      return;
    }
    let left;
    let top;
    if (window.innerWidth - event.clientX >= menuWidth) {
      left = event.clientX;
    } else {
      left = event.clientX - menuWidth;
    }

    if (window.innerHeight - event.clientY >= menuRef.current.offsetHeight) {
      top = event.clientY;
    } else {
      top = event.clientY - menuRef.current.offsetHeight;
    }
    setMenuPosition({top: top, left: left});
    setIsMenuOpen(true);
  }

  function hideMenu(event: MouseEvent): void {
    if (event.target !== menuRef.current) {
      setIsMenuOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('contextmenu', showContextMenu);
    document.addEventListener('click', hideMenu);

    return () => {
      document.removeEventListener('contextmenu', showContextMenu);
      document.removeEventListener('click', hideMenu);
    }
  }, []);

  return (
    <div className={appStyles.container}>
      <div className={appStyles.buttons}>
        <MoreButton handleClick={handleClick} />
        <MoreButton handleClick={handleClick} />
        <MoreButton handleClick={handleClick} />
      </div>
      <DropdownMenu
        style={{visibility: isMenuOpen ? 'visible' : 'hidden'}}
        menuPosition={menuPosition}
        ref={menuRef}
      >
          <MenuItem
            text={buttonShareText}
            iconPath={shareIconPath}
            alt={buttonShareText}
          />
          <MenuItem
            text={buttonEditText}
            iconPath={editIconPath}
            alt={buttonEditText}
          />
          <MenuItem
            text={buttonDeleteText}
            iconPath={trashIconPath}
            alt={buttonDeleteText}
          />
        </DropdownMenu>
    </div>
  );
};

export default App;