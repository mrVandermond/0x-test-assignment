import React, { PropsWithChildren, FC, MouseEventHandler } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FC<ButtonProps & PropsWithChildren> = ({ onClick, children }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >{children}</button>
  )
};
