import React, { useCallback } from 'react';
import classes from './NotteryList.module.scss';
import NotteryNumbers from './NotteryNumbers';
import { IRound } from '@coin-unknown/lottery-core';

interface INotteryListProps {
  data: IRound;
}
export const NotteryList: React.FC<INotteryListProps> = (props: INotteryListProps) => {
  const round = props.data;
  const tickets = round.userData.tickets.sort((a, b) => b.matched - a.matched);
  const renderList = useCallback(() => {
    if (tickets.length === 0) {
      return 'You dont have a numbers yet, buy the numbers to get a chance to win big prize';
    }

    return (
      <>
        {tickets.map((item) => (
          <NotteryNumbers
            key={item.id}
            className={classes.numbers}
            secondary={true}
            digits={item.numbers}
            matched={item.matched}
          />
        ))}
      </>
    );
  }, [tickets]);

  const renderNumbers = () => {
    return (
      <>
        <div className={`${classes.container}`}>
          <div className={classes.singleResultsMore}>{renderList()}</div>
        </div>
      </>
    );
  };

  return <>{renderNumbers()}</>;
};

export default NotteryList;
