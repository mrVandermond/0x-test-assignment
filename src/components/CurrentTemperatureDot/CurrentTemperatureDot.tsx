import React, { FC, useLayoutEffect, useRef } from 'react';

import styles from './CurrentTemperatureDot.module.css';

import { getTemperatureOffsets } from '../../utils';

interface CurrentTemperatureDotProps {
  minTemperature: number;
  maxTemperature: number;
  currentTemperature: number;
}

export const CurrentTemperatureDot: FC<CurrentTemperatureDotProps> = ({
  minTemperature,
  maxTemperature,
  currentTemperature,
}) => {
  const rangeCurrent = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (!rangeCurrent.current) return;

    const offset = getTemperatureOffsets(minTemperature, maxTemperature, currentTemperature, currentTemperature);

    rangeCurrent.current.style.setProperty('--left-offset', `${offset.leftOffset}%`);
  }, [minTemperature, maxTemperature, currentTemperature]);

  return (
    <div
      ref={rangeCurrent}
      className={styles.rangeCurrent}
    />
  );
};

CurrentTemperatureDot.displayName = 'CurrentTemperatureDot';
