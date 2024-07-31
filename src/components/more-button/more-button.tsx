import { FC } from 'react';
import moreButtonStyles from './more-button.module.css';

const MoreButton: FC = () => {
  return (
    <button
      className={moreButtonStyles.button}
      type="button"
      aria-label="Открыть меню"
    />
  );
};

export default MoreButton;
