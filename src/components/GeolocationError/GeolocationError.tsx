import React, { FC } from 'react';

import { Error } from '../Error/Error';

interface GeolocationErrorProps {
  error: GeolocationPositionError;
  onRefetchGetGeolocation: () => void;
}

export const GeolocationError: FC<GeolocationErrorProps> = ({ error, onRefetchGetGeolocation }) => {
  return (
    <Error
      error={error}
      onClick={onRefetchGetGeolocation}
      hasButton
      buttonText="Try again!"
    >
      <p>
        Unfortunately we can't detect your geolocation.<br/>
        Please, ensure you gave a permission and geolocation is on.
      </p>
    </Error>
  )
};

GeolocationError.displayName = 'GeolocationError';
