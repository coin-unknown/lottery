import React from 'react';
import classes from './AnimatedButton.module.scss';
import DotsLoader from '../DotsLoader/DotsLoader';

interface IMainButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
  className?: string;
  inverted?: boolean;
  bubbled?: boolean;
  shining?: boolean;
  processing?: boolean;
  secondary?: boolean;
  overlottie?: boolean;
}

const MainButton: React.FC<IMainButtonProps> = ({
  title,
  icon,
  onClick,
  className,
  shining = false,
  processing = false,
  bubbled = false,
  overlottie = false,
  disabled,
  secondary,
}) => {
  const onClickHandler = () => {
    if (disabled) {
      return;
    }

    onClick && onClick();
  };

  const iconRects = { width: 24, height: 24 };

  if (overlottie) {
    iconRects.width = 64;
    iconRects.height = 64;
  }

  return (
    <button
      className={`${classes.button} 
      ${secondary ? classes['is-secondary'] : ''}
      ${className} 
      ${disabled ? classes['is-disabled'] : ''} 
      ${bubbled ? classes['is-bubbled'] : ''} 
      ${shining ? classes['is-shining'] : ''}`}
      onClick={onClickHandler}
    >
      {processing ? (
        <DotsLoader />
      ) : (
        <>
          <span>{title}</span>
          {bubbled && (
            <>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </>
          )}
        </>
      )}
    </button>
  );
};

export default MainButton;
