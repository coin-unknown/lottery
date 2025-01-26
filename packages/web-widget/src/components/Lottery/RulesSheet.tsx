import React, { useCallback, useState } from 'react';

import { TabType } from '@/types';
import classes from './RulesSheet.module.scss';
import { Sheet } from 'react-modal-sheet';
import { useAppStore } from '../../store/appStore';
import ModalButtonClose from '../../ui/ModalButtonClose';
import notteryRulesPic from '../../assets/rules-pic.png?url';
import notteryRulesPic2 from '../../assets/rules-pic2.png?url';
import WalletTabButton from '../../ui/WalletTabButton/WalletTabButton';
import { sharedSheetProps } from '../../ui/Sheet/sheet-config';

interface IPopUpInsufficientBalanceProps {}

const RulesSheet: React.FC<IPopUpInsufficientBalanceProps> = () => {
  const { setIsShowNotteryRulesModal, isShowNotteryRulesModal } = useAppStore();
  const onClickCloseSheet = useCallback(() => setIsShowNotteryRulesModal(false), [setIsShowNotteryRulesModal]);
  const tabs: TabType[] = [
    { id: 'tickets', title: 'Tickets' },
    { id: 'prizes', title: 'Jackpot distribution' },
  ];
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);
  const isActiveTabTickets = activeTab.id === 'tickets';

  const onTabClick = () => {
    if (isActiveTabTickets) {
      setActiveTab(tabs[1]);
    } else {
      setActiveTab(tabs[0]);
    }
  };

  function renderRules() {
    if (activeTab.id === 'tickets') {
      return (
        <div className={classes.sectionsContainer}>
          <img src={notteryRulesPic} alt="" className={classes.rulesPic} />
          <p>To win, your digits must match in order. Here’s an example:</p>

          <ul>
            <li>
              <strong>Ticket A</strong>: The first three digits and the last two digits match, but the fourth digit is
              off. That means it only gets the “Match 3” prize.
            </li>
            <li>
              <strong>Ticket B</strong>: It matches the last five digits but fails on the first one, so it wins nothing.
            </li>
          </ul>

          <p>
            <em>Note:</em> Prizes don’t stack. If you match the first three digits, you only get the “Match 3”
            bracket—no “Match 1” or “Match 2” included.
          </p>
        </div>
      );
    } else {
      return (
        <div className={classes.sectionsContainer}>
          <img src={notteryRulesPic2} alt="" className={classes.rulesPic} />
          <h2>Jackpot Distribution Rules</h2>
          <ul>
            <li>
              The Jackpot is shared in proportions based on how many numbers on your ticket match. The image shows an
              example of how the jackpot is allocated according to matched tickets.
            </li>
            <br />
            <li>If multiple players have identical ticket numbers, the prize is split evenly among them.</li>
          </ul>
        </div>
      );
    }
  }
  return (
    <Sheet
      className={classes.sheetModal}
      isOpen={isShowNotteryRulesModal}
      onClose={onClickCloseSheet}
      snapPoints={[720]}
      tweenConfig={sharedSheetProps.tweenConfig}
    >
      <Sheet.Container className={classes.modalContainer}>
        <Sheet.Header className={classes.modalHead}>
          <div className={classes.infoBlock}>
            <div className={classes.infoContainer}>
              <div className={classes.amountRow}>{'The rules'}</div>
            </div>
          </div>
          <ModalButtonClose onClick={onClickCloseSheet} />
        </Sheet.Header>
        <Sheet.Content>
          <div className={classes.tabsSection}>
            <div className={classes.tabsContainer}>
              <div className={classes.tabsRow}>
                <WalletTabButton tab={tabs[0]} isActive={tabs[0].id === activeTab.id} onClick={onTabClick} />
                <WalletTabButton tab={tabs[1]} isActive={tabs[1].id === activeTab.id} onClick={onTabClick} />
              </div>
            </div>
          </div>

          <Sheet.Scroller>{renderRules()}</Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop className={classes.modalBackdrop} onTap={onClickCloseSheet} />
    </Sheet>
  );
};

export default RulesSheet;
