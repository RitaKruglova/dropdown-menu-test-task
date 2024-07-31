import { FC } from 'react';
import moreButtonStyles from './more-button.module.css';
import moreIconPath from '../../images/more.svg';

const MoreButton: FC = () => {
  return (
    <button
      className={moreButtonStyles.button}
      type="button"
      aria-label="Открыть меню"
    >
      <img className={moreButtonStyles.icon} src={moreIconPath} alt="Открыть меню" />
    </button>
  );
};

export default MoreButton;