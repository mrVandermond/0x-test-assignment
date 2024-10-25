import React, { FC, useMemo } from 'react';

import styles from './CurrentTemperatureDot.module.css';

import { getTemperatureOffsets } from '../../utils';

interface CurrentTemperatureDotProps {
  minTemperature: number;
  maxTemperature: number;
  currentTemperature: number;
}

export const CurrentTemperatureDot: FC<CurrentTemperatureDotProps> = ({ minTemperature, maxTemperature, currentTemperature }) => {
  const style = useMemo(() => {
    const offset = getTemperatureOffsets(minTemperature, maxTemperature, currentTemperature, currentTemperature);

    return {
      left: `${offset.leftOffset}%`,
    }
  }, [minTemperature, maxTemperature, currentTemperature]);

  return (
    <div className={styles.rangeCurrent} style={style}/>
  );
};

CurrentTemperatureDot.displayName = 'CurrentTemperatureDot';
