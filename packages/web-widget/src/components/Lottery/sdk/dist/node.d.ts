export interface BuyTicketParams {
    mnemonic: string;
    roundIdx: number;
    qty: number;
    recipient: string;
    refWallet?: string;
}
/**
 * Покупка билетов
 * @param params
 */
export declare function buyTicketsNode(params: BuyTicketParams): Promise<{
    success: boolean;
    error?: undefined;
} | {
    success: boolean;
    error: string;
}>;
