import React from 'react';

import classes from './DotsLoader.module.scss';

const DotsLoader: React.FC<{ className?: string }> = (props) => {
  return (
    <div className={`${classes.loader} ${props.className || ''}`}>
      <div className={classes.dot} />
      <div className={classes.dot} />
      <div className={classes.dot} />
    </div>
  );
};

export default DotsLoader;
