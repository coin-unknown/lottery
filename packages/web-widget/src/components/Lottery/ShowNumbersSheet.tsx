import React, { useCallback } from 'react';

import classes from './ShowNumbersSheet.module.scss';
import { Sheet } from 'react-modal-sheet';
import NotteryList from './NotteryList';
import { IRound } from '@coin-unknown/lottery-core';
import { useAppStore } from '../../store/appStore';
import ModalButtonClose from '../../ui/ModalButtonClose';
import { sharedSheetProps } from '../../ui/Sheet/sheet-config';

interface IPopUpInsufficientBalanceProps {
  roundData: IRound;
}

const ShowNumbersSheet: React.FC<IPopUpInsufficientBalanceProps> = ({ roundData }) => {
  const { setIsShowNotteryNumbersModal, isShowNotteryNumbersModal } = useAppStore();
  const onClickCloseSheet = useCallback(() => {
    setIsShowNotteryNumbersModal(false);
  }, [setIsShowNotteryNumbersModal]);

  return (
    <Sheet
      className={classes.sheetModal}
      isOpen={isShowNotteryNumbersModal}
      onClose={onClickCloseSheet}
      snapPoints={[520]}
      tweenConfig={sharedSheetProps.tweenConfig}
    >
      <Sheet.Container className={classes.modalContainer}>
        <Sheet.Header className={classes.modalHead}>
          <div className={classes.infoBlock}>
            <div className={classes.infoContainer}>
              <div className={classes.amountRow}>{'Your numbers'}</div>
            </div>
          </div>
          <ModalButtonClose onClick={onClickCloseSheet} />
        </Sheet.Header>
        <Sheet.Content>
          <Sheet.Scroller>
            <div className={classes.sectionsContainer}>
              <NotteryList data={roundData} />
            </div>
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop className={classes.modalBackdrop} onTap={onClickCloseSheet} />
    </Sheet>
  );
};

export default ShowNumbersSheet;
