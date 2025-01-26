import React from 'react';

import classes from './SecondaryButton.module.scss';

interface ISecondaryButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
}

const SecondaryButton: React.FC<ISecondaryButtonProps> = ({ title, onClick, className }) => {
  const onClickHandler = () => {
    onClick && onClick();
  };
  return (
    <button className={`${classes.container} ${className ? className : ''}`} onClick={onClickHandler}>
      {title}
    </button>
  );
};

export default SecondaryButton;
