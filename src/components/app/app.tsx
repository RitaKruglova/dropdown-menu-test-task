import { FC, useState } from 'react';
import appStyles from './app.module.css';
import MoreButton from '../more-button/more-button';
import DropdownMenu from '../dropdown-menu/dropdown-menu';
import MenuItem from '../menu-item/menu-item';
import shareIconPath from '../../images/share.svg';
import editIconPath from '../../images/edit.svg';
import trashIconPath from '../../images/trash.svg';
import { buttonDeleteText, buttonEditText, buttonShareText } from '../../utils/constants';

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
      }
    </div>
  );
};

export default App;