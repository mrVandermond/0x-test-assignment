import React, { FC, ReactNode } from 'react';

import styles from './ForecastTitle.module.css';

export const ForecastTitle: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={styles.forecastTitle}>{children}</div>
)
