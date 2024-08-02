import { FC, forwardRef } from 'react';
import moreButtonStyles from './more-button.module.css';
import moreIconPath from '../../images/more.svg';

interface IMoreButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MoreButton = forwardRef<HTMLButtonElement, IMoreButtonProps>(
  ({ handleClick }, ref) => {
    return (
      <button
        className={moreButtonStyles.button}
        type="button"
        aria-label="Открыть меню"
        onClick={handleClick}
        ref={ref}
      >
        <img className={moreButtonStyles.icon} src={moreIconPath} alt="Открыть меню" />
      </button>
    );
  });

export default MoreButton;