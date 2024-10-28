import React, { PropsWithChildren } from 'react';

import { Button } from '../Button/Button';

import styles from './Error.module.css';

interface ErrorProps<T> {
  error: T;
  hasButton?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

export const Error = <T extends { message: string; }>({
  error,
  hasButton,
  buttonText,
  onClick,
  children,
}: ErrorProps<T> & PropsWithChildren) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorText}>
        {children ?? `Error:${error.message}`}
      </div>
      {hasButton && <Button onClick={onClick}>{buttonText}</Button>}
    </div>
  )
};

Error.displayName = 'Error';
