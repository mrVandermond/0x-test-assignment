import React, { FC, useMemo } from 'react';

import { getTemperatureOffsets } from '../utils';

interface CurrentTemperatureDotProps {
  minTemperature: number;
  maxTemperature: number;
  currentTemperature: number;
}

export const CurrentTemperatureDot: FC<CurrentTemperatureDotProps> = ({ minTemperature, maxTemperature, currentTemperature }) => {
  const styles = useMemo(() => {
    const offset = getTemperatureOffsets(minTemperature, maxTemperature, currentTemperature, currentTemperature);

    return {
      left: `${offset.leftOffset}%`,
    }
  }, [minTemperature, maxTemperature, currentTemperature]);

  return (
    <div className="range-current" style={styles}/>
  );
};

CurrentTemperatureDot.displayName = 'CurrentTemperatureDot';
