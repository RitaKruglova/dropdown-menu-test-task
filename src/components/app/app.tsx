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
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    if (menuRef.current === null) {
      return;
    }

    let left;
    let top;

    const target = event.currentTarget as HTMLButtonElement;

    if (document.documentElement.offsetWidth - target.offsetLeft >= menuWidth) {
      left = target.offsetLeft;
    } else {
      left = target.offsetLeft + target.offsetWidth - menuWidth;
    }

    if (document.documentElement.offsetHeight - target.offsetTop - target.offsetHeight >= menuRef.current.offsetHeight) {
      top = target.offsetTop + target.offsetHeight;
    } else {
      top = target.offsetTop - menuRef.current.offsetHeight;
    }
    setMenuPosition({top: top, left: left});
    setIsMenuOpen(true);
  }

  function showContextMenu(event: MouseEvent): void {
    event.preventDefault();
    if (menuRef.current === null) {
      return;
    }
    let left;
    let top;
    if (document.documentElement.offsetWidth - event.pageX > menuWidth) {
      left = event.pageX;
    } else {
      left = event.pageX - menuWidth;
    }

    if (document.documentElement.offsetHeight - event.pageY > menuRef.current.offsetHeight) {
      top = event.pageY;
    } else {
      top = event.pageY - menuRef.current.offsetHeight;
    }
    setMenuPosition({top: top, left: left});
    console.log(top, left);
    setIsMenuOpen(true);
  }

  function hideMenu(event: MouseEvent): void {
    if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
        buttonRefs.current.every(buttonRef => buttonRef && !buttonRef.contains(event.target as Node))) {
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
        {[0, 1, 2].map((index) => (
          <MoreButton
            key={index}
            ref={(el) => (buttonRefs.current[index] = el)}
            handleClick={handleClick}
          />
        ))}
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
