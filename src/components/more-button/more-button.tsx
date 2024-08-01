import { FC } from 'react';
import moreButtonStyles from './more-button.module.css';
import moreIconPath from '../../images/more.svg';

interface IMoreButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MoreButton: FC<IMoreButtonProps> = ({ handleClick }) => {
  return (
    <button
      className={moreButtonStyles.button}
      type="button"
      aria-label="Открыть меню"
      onClick={handleClick}
    >
      <img className={moreButtonStyles.icon} src={moreIconPath} alt="Открыть меню" />
    </button>
  );
};

export default MoreButton;