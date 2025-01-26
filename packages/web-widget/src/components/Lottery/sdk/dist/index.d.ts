import { Address } from '@ton/core';
import { default as TonConnect, Wallet } from '@tonconnect/sdk';
import { IRound } from './types';
export * from './types';
/**
 * Returns last created round idx
 * @returns
 */
export declare const getLastRoundId: () => Promise<number>;
/**
 * Get information about a specific round
 * @param roundIdx round number
 * @returns
 */
export declare const getRound: (wallet: Wallet, roundIdx?: number) => Promise<IRound>;
/**
 * Create ref wallet address
 * @param tonConnect
 */
export declare const createReferralWallet: (tonConnect: TonConnect | any) => Promise<void>;
/**
 * Withdraw	referral rewards
 * @param tonConnect
 */
export declare const claimReferralReward: (tonConnect: TonConnect) => Promise<void>;
/**
 * Calculate the price of the tickets
 * @param roundIdx
 * @param qty
 * @returns
 */
export declare const getTicketsPrice: (roundIdx: number, qty: number) => Promise<string>;
/**
 * Buy a ticket for lottery for transaction sender
 * @param tonConnect
 * @param roundIdx
 * @param qty
 * @param cost
 * @param refWallet
 * @returns
 */
export declare const buyTicket: (tonConnect: TonConnect | any, roundIdx: number, qty: number, cost: number, refWallet?: Address) => Promise<boolean>;
/**
 * Buy a ticket for lottery not for transaction sender, for other wallet
 * @param tonConnect
 * @param roundIdx
 * @param qty
 * @param cost
 * @param recipient
 * @param refWallet
 * @returns
 */
export declare const buyTicketFor: (tonConnect: TonConnect | any, roundIdx: number, qty: number, cost: number, recipient: Address, refWallet?: Address) => Promise<boolean>;
/**
 * Claim winned tickets
 * @param tonConnect
 * @param roundIdx
 * @param winTicketsIds
 * @returns
 */
export declare const claimTickets: (tonConnect: TonConnect | any, roundIdx: number, winTicketsIds: number[]) => Promise<void>;
/**
 * Claim round comission for the lottery
 * @requires admin
 * @param tonConnect
 * @param roundIdx
 */
export declare const claimPlatformComission: (tonConnect: TonConnect | any, roundIdx: number) => Promise<void>;
/**
 * Create lottery round
 * @requires admin
 * @param tonConnect
 * @returns
 */
export declare const createRound: (tonConnect: TonConnect | any) => Promise<void>;
/**
 * Close lottery round
 * @requires admin
 * @param tonConnect
 * @param roundIdx
 */
export declare const closeRound: (tonConnect: TonConnect | any, roundIdx: number) => Promise<void>;
/**
 * Initiate lottery draw
 * @requires admin
 * @param tonConnect
 * @param roundIdx
 */
export declare const drawRound: (tonConnect: TonConnect | any, roundIdx: number) => Promise<void>;
/**
 * Move rount pot to the next round
 * @requires admin
 * @param tonConnect
 * @param roundIdx
 */
export declare const moveFunds: (tonConnect: TonConnect | any, roundIdx: number) => Promise<void>;
