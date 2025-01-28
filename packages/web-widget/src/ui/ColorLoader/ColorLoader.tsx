import React from 'react';
import classes from './ColorLoader.module.scss';

interface ColorLoaderProps {
  className?: string;
}

const ColorLoader: React.FC<ColorLoaderProps> = () => {
  return (
    <div className={classes.spinner}>
      <svg x="0px" y="0px" width="48px" height="48px" viewBox="0 0 50 50">
        <path fill="transparent" strokeWidth="4px" stroke="#000" d="M 41 25 A 16 16 0 1 1 25 9">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default ColorLoader;
