import React, { forwardRef } from 'react';
import moreButtonStyles from './more-button.module.css';
import moreIconPath from '../../images/more.svg';
import { IMoreButtonProps } from '../../utils/types';

const MoreButton = forwardRef<HTMLButtonElement, IMoreButtonProps>(({ handleClick }, ref) => {
  return (
    <button
      className={moreButtonStyles.button}
      type="button"
      aria-label="Открыть меню"
      onClick={handleClick}
      ref={ref}
      role="button"
    >
      <img className={moreButtonStyles.icon} src={moreIconPath} alt="Открыть меню" />
    </button>
  );
});

export default MoreButton;
