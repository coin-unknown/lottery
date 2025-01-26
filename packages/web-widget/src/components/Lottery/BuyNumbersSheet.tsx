import React, { useCallback, useEffect, useRef } from 'react';
import classes from './BuyNumbersSheet.module.scss';
import { buyTicket, getTicketsPrice } from '@coin-unknown/lottery-core';
import { Sheet } from 'react-modal-sheet';
import QuantitySelector from './QuantitySelector';
import { useTonConnectUI } from '@tonconnect/ui-react';
import ModalButtonClose from '../../ui/ModalButtonClose';
import { sharedSheetProps } from '../../ui/Sheet/sheet-config';
import { useAppStore } from '../../store/appStore';
import MainButton from '../../ui/MainButton/AnimatedButton';

interface IPopUpInsufficientBalanceProps {
  roundIdx: number;
  ticketPrice: number;
}

const BuyNumbersSheet: React.FC<IPopUpInsufficientBalanceProps> = ({ roundIdx, ticketPrice }) => {
  const { setIsShowNotteryBuyModal, isShowNotteryBuyModal } = useAppStore();
  const [totalPrice, setTotalPrice] = React.useState(`${ticketPrice.toFixed(2)}`);
  const [tonConnectUI] = useTonConnectUI();
  const [qty, setQty] = React.useState(1);
  const qtyRef = useRef(qty);
  const [isLoading, setIsLoading] = React.useState(false);
  const onClickCloseSheet = useCallback(() => {
    setQty(1);
    qtyRef.current = 1;
    setIsShowNotteryBuyModal(false);
  }, [setIsShowNotteryBuyModal]);

  const onQuantityChange = useCallback(
    async (qty: number) => {
      setQty(qty);
      qtyRef.current = qty;
      setIsLoading(true);
      const totalPrice = await getTicketsPrice(roundIdx, qty);

      // Race condition
      if (qtyRef.current !== qty) {
        return;
      }

      setIsLoading(false);
      setTotalPrice(totalPrice);
    },
    [roundIdx]
  );

  const onBuyTickets = useCallback(async () => {
    await buyTicket(tonConnectUI, roundIdx, qtyRef.current, Number(totalPrice));
    onClickCloseSheet();
  }, [onClickCloseSheet, roundIdx, tonConnectUI, totalPrice]);

  useEffect(() => {
    onQuantityChange(1);
    setIsLoading(false);
  }, [onQuantityChange]);

  return (
    <Sheet
      className={classes.sheetModal}
      isOpen={isShowNotteryBuyModal}
      onClose={onClickCloseSheet}
      snapPoints={[400]}
      tweenConfig={sharedSheetProps.tweenConfig}
    >
      <Sheet.Container className={classes.modalContainer}>
        <Sheet.Header className={classes.modalHead}>
          <div className={classes.infoBlock}>
            <div className={classes.infoContainer}>
              <div className={classes.amountRow}>{'Buy numbers'}</div>
              <div className={classes.descriptionRow}>{'Buy the numbers to get chance to win'}</div>
            </div>
          </div>
          <ModalButtonClose onClick={onClickCloseSheet} />
        </Sheet.Header>
        <Sheet.Content>
          <div className={classes.sectionsContainer}>
            <h3>{'Quantity:'}</h3>
            <QuantitySelector className={classes.quantity} onChange={onQuantityChange} />
            {qty >= 4 ? (
              <h2>
                {'Discount:'} {isLoading ? '...' : `${Number(qty * ticketPrice - Number(totalPrice)).toFixed(2)} TON`}
              </h2>
            ) : null}
            <MainButton
              className={classes.buyButton}
              onClick={onBuyTickets}
              disabled={isLoading}
              title={`Pay ${totalPrice} TON`}
            />
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop className={classes.modalBackdrop} onTap={onClickCloseSheet} />
    </Sheet>
  );
};

export default BuyNumbersSheet;
