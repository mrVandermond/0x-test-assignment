import React, { FC } from 'react';

import { Loader } from '../../icons/Loader';

import styles from './BackgroundLoader.module.css';

export const BackgroundLoader: FC = () => {
  return (
    <div className={styles.backgroundLoaderContainer}>
      <div className={styles.backgroundLoader}>
        <span className={styles.backgroundLoaderText}>Refreshing</span>
        <Loader size={16}/>
      </div>
    </div>
  );
};

BackgroundLoader.displayName = 'BackgroundLoader';
