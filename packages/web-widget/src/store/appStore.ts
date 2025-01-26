import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AppStoreType = {
  isShowNotteryBuyModal: boolean;
  isShowNotteryRulesModal: boolean;
  isShowNotteryNumbersModal: boolean;
  setIsShowNotteryBuyModal: (val: boolean) => void;
  setIsShowNotteryRulesModal: (val: boolean) => void;
  setIsShowNotteryNumbersModal: (val: boolean) => void;
};

export const useAppStore = create(
  devtools<AppStoreType>((set) => ({
    isShowNotteryBuyModal: false,
    isShowNotteryRulesModal: false,
    isShowNotteryNumbersModal: false,
    isShowWelcomeScreen: true,
    setIsShowNotteryBuyModal: (val: boolean) => set({ isShowNotteryBuyModal: val }),
    setIsShowNotteryRulesModal: (val: boolean) => set({ isShowNotteryRulesModal: val }),
    setIsShowNotteryNumbersModal: (val: boolean) => set({ isShowNotteryNumbersModal: val }),
  }))
);
