import React from 'react';

import classes from './WalletTabButton.module.css';
import { WalletTabType } from '../../../../types/types';

interface IWalletTabButtonProps {
  tab: WalletTabType;
  isActive: boolean;
  onClick: (tab: WalletTabType) => void;
}

const WalletTabButton: React.FC<IWalletTabButtonProps> = ({ tab, isActive, onClick }) => {
  const onClickHandler = () => {
    onClick(tab);
  };

  return (
    <div className={`${classes.container} ${isActive ? classes.active : ''}`} onClick={onClickHandler}>
      <div className={classes.title}>{tab.title}</div>
    </div>
  );
};

export default WalletTabButton;
