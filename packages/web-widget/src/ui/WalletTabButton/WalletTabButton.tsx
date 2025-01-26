import React from 'react';

import { TabType } from '@/types';
import classes from './WalletTabButton.module.scss';

interface IWalletTabButtonProps {
  tab: TabType;
  isActive: boolean;
  onClick: (tab: TabType) => void;
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
