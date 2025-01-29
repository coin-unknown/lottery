import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IRound, RoundStatus, claimTickets, getRound, getRoundGuest  } from '@coin-unknown/lottery-core';
import classes from './NotteryCard.module.scss';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import ShowNumbersSheet from './ShowNumbersSheet';
import NotteryNumbers from './NotteryNumbers';
import BuyNumbersSheet from './BuyNumbersSheet';
import { useTonBalance } from './useTonBalance';
import RulesSheet from './RulesSheet';
import { useAppStore } from '../../store/appStore';
import MainButton from '../../ui/MainButton/AnimatedButton';
import SecondaryButton from '../../ui/SecondaryButton/SecondaryButton';
import { TimerCountDown } from '../../ui/TimerCountDown/TimerCountDown';
import iconInfo from '../../assets/icon-info.svg?url';
import arrowLeft from '../../assets/arrow-left.svg?url';
import arrowRight from '../../assets/arrow-right.svg?url';
import ColorLoader from '../../ui/ColorLoader/ColorLoader';
import { WidgetConfig } from '@/types';

// crate symlink in folder to another folder bash

// const ADMIN_WALLET = '0QC9xvzwT26Ttkdu6lEUpLn6VjnK9fK1AipYaBKIq21okQ6M';
// const OPERATOR_WALLET = '0QC9xvzwT26Ttkdu6lEUpLn6VjnK9fK1AipYaBKIq21okQ6M';

export const LotteryCard: React.FC<{config: WidgetConfig }> = (props) => {
  const { setIsShowNotteryBuyModal, setIsShowNotteryNumbersModal, setIsShowNotteryRulesModal } = useAppStore();
  const [activeRound, setActiveRound] = useState<IRound | null>(null);
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [activeRoundIdx, setActiveRoundIdx] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastRoundIdx, setLastRoundIdx] = useState<number>(0);
  const initRef = useRef(false);
  // const address = useTonAddress();
  // const isAdmin = address === ADMIN_WALLET;
  // const isOperator = isAdmin || address === OPERATOR_WALLET;

  const tickets = activeRound?.userData.tickets || [];
  const claimableTickets = tickets?.filter((item) => item.matched > 0);
  const claimPrize = claimableTickets?.reduce((acc, item) => acc + item.prizeAmount, 0).toFixed(2);
  const isDrawClosed = activeRound?.status === RoundStatus.Closed;
  const isDrawComplete = activeRound?.status === RoundStatus.Drawn;
  const isDrawOpen = activeRound?.status === RoundStatus.Open;

  const requestRoundData = useCallback(
    async (idx?: number) => {
      let info: IRound;
      const silent = idx === activeRoundIdx;

      if (!silent) {
        setIsLoading(true);
      }

      if (wallet) {
        info = await getRound(wallet, idx);
      } else {
        info = await getRoundGuest(idx);
      }

      if (idx === undefined) {
        setLastRoundIdx(info.id);
      }

      setActiveRound(info);
      setIsLoading(false);

      return info;
    },
    [activeRoundIdx, wallet]
  );

  const onBalanceChange = useCallback(async () => {
    requestRoundData(activeRoundIdx).catch(() => {});
  }, [activeRoundIdx, requestRoundData]);

  const onClaimTickets = useCallback(async () => {
    const ticketsIds = claimableTickets.map((item) => item.id);

    await claimTickets(tonConnectUI, activeRoundIdx, ticketsIds).then(() => {});
  }, [activeRoundIdx, claimableTickets, tonConnectUI]);

  useTonBalance(onBalanceChange);

  useEffect(() => {
    if (initRef.current) {
      return;
    }

    initRef.current = true;
    requestRoundData().then((round) => {
      if (round) {
        setActiveRoundIdx(round.id);
      }
    });
  }, [requestRoundData, wallet]);

  const nextRound = useCallback(() => {
    if (isLoading) {
      return;
    }

    setActiveRoundIdx((prev) => {
      const next = prev + 1;

      if (next > lastRoundIdx) {
        return prev;
      }

      requestRoundData(next).catch(() => {
        setActiveRoundIdx(prev);
      });

      return next;
    });
  }, [isLoading, lastRoundIdx, requestRoundData]);

  const prevRound = useCallback(() => {
    if (isLoading) {
      return;
    }

    setActiveRoundIdx((prev) => {
      const next = prev - 1;

      if (next < 0) {
        return prev;
      }

      requestRoundData(next).catch(() => {
        setActiveRoundIdx(prev);
      });

      return next;
    });
  }, [isLoading, requestRoundData]);

  const onRulesClick = useCallback(() => {
    setIsShowNotteryRulesModal(true);
  }, [setIsShowNotteryRulesModal]);

  const onBuyClick = useCallback(() => {
    if (wallet) {
      setIsShowNotteryBuyModal(true);
    } else {
      tonConnectUI.openModal();
    }
  }, [setIsShowNotteryBuyModal, tonConnectUI, wallet]);

  const onShowNumbersSheet = useCallback(() => {
    setIsShowNotteryNumbersModal(true);
  }, [setIsShowNotteryNumbersModal]);

  function renderDraw() {
    if (!activeRound || !tickets) {
      return null;
    }

    return (
      <>
        <span className={classes.drawDetails}>Winning number:</span>
        <NotteryNumbers digits={activeRound.roundDraw || ''} />
        <div className={classes.ticketInfo}>
          You have <span className={classes.ticketCount}>{claimableTickets?.length}</span> winning number
          {tickets?.length !== 1 ? 's' : ''}
        </div>
        {tickets.length > 0 ? <SecondaryButton title={'My numbers'} onClick={onShowNumbersSheet} /> : null}
      </>
    );
  }

  function renderText() {
    if (isDrawOpen) {
      return (
        <div className={classes.ticketInfo}>
          You have <span className={classes.ticketCount}>{tickets?.length}</span> number
          {tickets?.length !== 1 ? 's' : ''} this round
        </div>
      );
    }

    if (isDrawClosed) {
      return <div className={classes.ticketInfo}>Draw is closed, drawing...</div>;
    }
  }

  function renderOpen() {
    if (!tickets) {
      return null;
    }

    return (
      <>
        {tickets.length > 0 ? <SecondaryButton title={'My numbers'} onClick={onShowNumbersSheet} /> : null}
        <MainButton
          secondary={true}
          shining={true}
          className={classes.playButton}
          onClick={onBuyClick}
          title={'Buy tickets'}
        />
      </>
    );
  }

  function renderTitle() {
    if (!activeRound) {
      return null;
    }

    if (activeRound.status === RoundStatus.Open) {
      return (
        <>
          Until draw: <TimerCountDown className={classes.drawTimer} initTimeInMs={activeRound.drawTime - Date.now()} />
        </>
      );
    }

    return `${new Date(activeRound.drawTime).toLocaleDateString()}`;
  }

  function renderRound() {
    if (!activeRound) {
      return null;
    }

    return (
      <div className={classes.lotteryRound}>
        <div className={classes.header}>
          <span className={classes.drawDetails}>{renderTitle()}</span>
          <div className={classes.rules} onClick={onRulesClick}>
            <img className={classes.rulesIcon} src={iconInfo} alt="" />
          </div>
        </div>

        <div className={classes.prizePot}>
          <span className={classes.prizePotLabel}>Prize Pot: {activeRound.roundPot} TON</span>
          <span className={classes.prizePotValue}>~${(Number(activeRound.roundPot) * 5.5).toFixed(2)}</span>
        </div>
        {isDrawComplete ? renderDraw() : null}
        {renderText()}
        {isDrawOpen ? renderOpen() : null}

        {claimableTickets.length > 0 && activeRound.claimable ? (
          <MainButton
            secondary={true}
            shining={true}
            className={classes.playButton}
            onClick={onClaimTickets}
            title={`Claim prize ${claimPrize} TON`}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className={props.config.className || ''}>
      <div className={classes.controls}>
        <img
          src={arrowLeft}
          alt=""
          className={`${classes.arrow} ${activeRoundIdx === 0 ? classes.disabled : ''}`}
          onClick={prevRound}
        />
        <div className={classes.round}>
          {'Game'} {activeRoundIdx}
        </div>
        <img
          src={arrowRight}
          alt=""
          className={`${classes.arrow} ${lastRoundIdx === activeRoundIdx ? classes.disabled : ''}`}
          onClick={nextRound}
        />
      </div>

      {isLoading || !activeRound ? <ColorLoader className={classes.loading} /> : renderRound()}
      {activeRound && <ShowNumbersSheet roundData={activeRound} />}
      <BuyNumbersSheet roundIdx={activeRound?.id || 0} ticketPrice={activeRound?.price || 0} />
      <RulesSheet />
    </div>
  );
};

export default LotteryCard;
