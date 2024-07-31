import { FC, useState } from 'react';
import appStyles from './app.module.css';
import MoreButton from '../more-button/more-button';
import DropdownMenu from '../dropdown-menu/dropdown-menu';
import MenuItem from '../menu-item/menu-item';
import shareIconPath from '../../images/share.svg';
import editIconPath from '../../images/edit.svg';
import trashIconPath from '../../images/trash.svg';

const App: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  function handleClick(): void {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }

  return (
    <div className={appStyles.container}>
      <div className={appStyles.buttons}>
        <MoreButton handleClick={handleClick} />
        <MoreButton handleClick={handleClick} />
        <MoreButton handleClick={handleClick} />
      </div>
      {isMenuOpen &&
        <DropdownMenu>
          <MenuItem
            text="Поделиться в социальных сетях"
            iconPath={shareIconPath}
            alt="Поделиться"
          />
          <MenuItem
            text="Редактировать страницу"
            iconPath={editIconPath}
            alt="Редактировать"
          />
          <MenuItem
            text="Удалить страницу"
            iconPath={trashIconPath}
            alt="Удалить"
          />
        </DropdownMenu>
      }
    </div>
  );
};

export default App;