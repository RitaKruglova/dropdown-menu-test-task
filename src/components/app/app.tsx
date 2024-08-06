import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import appStyles from './app.module.css';
import MoreButton from '../more-button/more-button';
import DropdownMenu from '../dropdown-menu/dropdown-menu';
import MenuItem from '../menu-item/menu-item';
import shareIconPath from '../../images/share.svg';
import editIconPath from '../../images/edit.svg';
import trashIconPath from '../../images/trash.svg';
import { buttonDeleteText, buttonEditText, buttonShareText, menuWidth, pagePadding } from '../../utils/constants';
import { TMenuPosition } from '../../utils/types';

const App: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<TMenuPosition>({
    top: 0,
    left: 0,
  });
  const [currentButton, setCurrentButton] = useState<HTMLButtonElement | null>(null);
  const [wasHide, setWasHide] = useState<boolean>(false);
  const [isTopDirection, setIsTopDirection] = useState<boolean>(false);
  const [buttonHeight, setButtonHeight] = useState<number>(0);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function updateMenuPositionForButtonClick(target: HTMLButtonElement): void {
    if (menuRef.current === null) {
      return;
    }
    let left;
    let top;
    if (document.documentElement.offsetWidth - target.offsetLeft >= menuWidth + pagePadding) {
      left = target.offsetLeft;
    } else {
      left = target.offsetLeft + target.offsetWidth - menuWidth;
    }

    if (
      document.documentElement.clientHeight - target.getBoundingClientRect().y - target.offsetHeight >=
      menuRef.current.offsetHeight + pagePadding
    ) {
      top = target.offsetTop + target.offsetHeight;
    } else {
      top = target.offsetTop - menuRef.current.offsetHeight;
    }
    setMenuPosition({ top: top, left: left });
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    if (menuRef.current === null) {
      return;
    }

    const target = event.currentTarget as HTMLButtonElement;
    setButtonHeight(target.offsetHeight);
    updateMenuPositionForButtonClick(target);

    if (isMenuOpen && target === currentButton) {
      setIsMenuOpen(false);
      setWasHide(false);
    } else {
      setIsMenuOpen(true);
      setCurrentButton(target);
    }
  }

  const showContextMenu = (event: MouseEvent): void => {
    event.preventDefault();

    if (menuRef.current === null) {
      return;
    }

    setButtonHeight(0);
    let left;
    let top;
    if (document.documentElement.offsetWidth - event.pageX > menuWidth + pagePadding) {
      left = event.pageX;
    } else {
      left = event.pageX - menuWidth;
    }

    if (document.documentElement.clientHeight - event.clientY > menuRef.current.offsetHeight + pagePadding) {
      top = event.pageY;
      setIsTopDirection(false);
    } else {
      top = event.pageY - menuRef.current.offsetHeight;
      setIsTopDirection(true);
    }

    setMenuPosition({ top: top, left: left });
    setIsMenuOpen(true);
  };

  const handleScroll = useCallback(() => {
    if (!isMenuOpen || menuRef.current === null) {
      return;
    }
    
    let top;

    top = menuPosition.top;
    if (window.scrollY >= menuPosition.top && isTopDirection) {
      top = menuPosition.top + menuRef.current.offsetHeight + buttonHeight;
      setIsTopDirection(false);
    } else if (
      window.scrollY + document.documentElement.clientHeight
      <= menuPosition.top + menuRef.current.offsetHeight
      && isTopDirection  === false
    ) {
      top = menuPosition.top - menuRef.current.offsetHeight - buttonHeight;
      setIsTopDirection(true);
    }
    setMenuPosition({ top: top, left: menuPosition.left });
  }, [isMenuOpen, menuPosition, isTopDirection, buttonHeight]);

  function hideMenu(event: MouseEvent): void {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRefs.current.every(buttonRef => buttonRef && !buttonRef.contains(event.target as Node))
    ) {
      setIsMenuOpen(false);
      setWasHide(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (wasHide && entry.isIntersecting) {
          setIsMenuOpen(true);
          setWasHide(false);
        } else if (!wasHide && !entry.isIntersecting && isMenuOpen) {
          setIsMenuOpen(false);
          setWasHide(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1
      }
    );

    const currentMenuRef = menuRef.current;
    if (currentMenuRef) {
      observer.observe(currentMenuRef);
    }

    return () => {
      if (currentMenuRef) {
        observer.unobserve(currentMenuRef);
      }
    };
  }, [isMenuOpen, wasHide]);

  useEffect(() => {
    document.addEventListener('contextmenu', showContextMenu);
    document.addEventListener('click', hideMenu);

    return () => {
      document.removeEventListener('contextmenu', showContextMenu);
      document.removeEventListener('click', hideMenu);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && currentButton) {
        updateMenuPositionForButtonClick(currentButton);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen, currentButton]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className={appStyles.container}>
      <div className={appStyles.buttons}>
        {[0, 1, 2].map(index => (
          <MoreButton key={index} ref={el => (buttonRefs.current[index] = el)} handleClick={handleClick} />
        ))}
      </div>
      <DropdownMenu style={{ visibility: isMenuOpen ? 'visible' : 'hidden' }} menuPosition={menuPosition} ref={menuRef}>
        <MenuItem text={buttonShareText} iconPath={shareIconPath} alt={buttonShareText} />
        <MenuItem text={buttonEditText} iconPath={editIconPath} alt={buttonEditText} />
        <MenuItem text={buttonDeleteText} iconPath={trashIconPath} alt={buttonDeleteText} />
      </DropdownMenu>
    </div>
  );
};

export default App;
