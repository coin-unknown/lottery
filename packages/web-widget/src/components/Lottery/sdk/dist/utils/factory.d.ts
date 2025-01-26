import { Address, OpenedContract, Sender, SenderArguments } from '@ton/core';
import { TonConnect } from '@tonconnect/sdk';
import { Lottery } from './tact_Lottery';
import { LotteryFactory } from './tact_LotteryFactory';
import { ReferralWallet } from './tact_ReferralWallet';
export declare const CONTRACT_ADDRESS = "EQAndtP8cSPSkwlFK-lPMBYKDYMxsNUydc6yCiJcjnBuEfeO";
export declare const getFactoryInstance: () => Promise<OpenedContract<LotteryFactory>>;
export declare const getLotteryInstance: (lotteryAddr: Address) => Promise<OpenedContract<Lottery>>;
export declare const getRefWalletInstance: (refAddr: Address) => Promise<OpenedContract<ReferralWallet>>;
export declare class TonConnectProvider implements Sender {
    /**
     * The TonConnect UI instance.
     * @private
     */
    private readonly provider;
    /**
     * The address of the current account.
     */
    get address(): Address | undefined;
    /**
     * Creates a new TonConnectProvider.
     * @param provider
     */
    constructor(provider: TonConnect);
    /**
     * Sends a message using the TonConnect UI.
     * @param args
     */
    send(args: SenderArguments): Promise<void>;
}
