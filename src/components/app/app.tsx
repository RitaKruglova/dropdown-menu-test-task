import { FC } from 'react';
import appStyles from './app.module.css';
import MoreButton from '../more-button/more-button';

const App: FC = () => {
  return (
    <div className={appStyles.container}>
      <MoreButton />
      <MoreButton />
      <MoreButton />
    </div>
  );
};

export default App;