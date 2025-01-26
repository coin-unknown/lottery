import { Address, Builder, Cell, Contract, ContractABI, ContractProvider, Dictionary, Sender, Slice } from '@ton/core';
export type StateInit = {
    $$type: "StateInit";
    code: Cell;
    data: Cell;
};
export declare function storeStateInit(src: StateInit): (builder: Builder) => void;
export declare function loadStateInit(slice: Slice): {
    $$type: "StateInit";
    code: Cell;
    data: Cell;
};
export type StdAddress = {
    $$type: "StdAddress";
    workchain: bigint;
    address: bigint;
};
export declare function storeStdAddress(src: StdAddress): (builder: Builder) => void;
export declare function loadStdAddress(slice: Slice): {
    $$type: "StdAddress";
    workchain: bigint;
    address: bigint;
};
export type VarAddress = {
    $$type: "VarAddress";
    workchain: bigint;
    address: Slice;
};
export declare function storeVarAddress(src: VarAddress): (builder: Builder) => void;
export declare function loadVarAddress(slice: Slice): {
    $$type: "VarAddress";
    workchain: bigint;
    address: Slice;
};
export type Context = {
    $$type: "Context";
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};
export declare function storeContext(src: Context): (builder: Builder) => void;
export declare function loadContext(slice: Slice): {
    $$type: "Context";
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
};
export type SendParameters = {
    $$type: "SendParameters";
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
};
export declare function storeSendParameters(src: SendParameters): (builder: Builder) => void;
export declare function loadSendParameters(slice: Slice): {
    $$type: "SendParameters";
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
};
export type Deploy = {
    $$type: "Deploy";
    queryId: bigint;
};
export declare function storeDeploy(src: Deploy): (builder: Builder) => void;
export declare function loadDeploy(slice: Slice): {
    $$type: "Deploy";
    queryId: bigint;
};
export type DeployOk = {
    $$type: "DeployOk";
    queryId: bigint;
};
export declare function storeDeployOk(src: DeployOk): (builder: Builder) => void;
export declare function loadDeployOk(slice: Slice): {
    $$type: "DeployOk";
    queryId: bigint;
};
export type FactoryDeploy = {
    $$type: "FactoryDeploy";
    queryId: bigint;
    cashback: Address;
};
export declare function storeFactoryDeploy(src: FactoryDeploy): (builder: Builder) => void;
export declare function loadFactoryDeploy(slice: Slice): {
    $$type: "FactoryDeploy";
    queryId: bigint;
    cashback: Address;
};
export type ChangeOwner = {
    $$type: "ChangeOwner";
    queryId: bigint;
    newOwner: Address;
};
export declare function storeChangeOwner(src: ChangeOwner): (builder: Builder) => void;
export declare function loadChangeOwner(slice: Slice): {
    $$type: "ChangeOwner";
    queryId: bigint;
    newOwner: Address;
};
export type ChangeOwnerOk = {
    $$type: "ChangeOwnerOk";
    queryId: bigint;
    newOwner: Address;
};
export declare function storeChangeOwnerOk(src: ChangeOwnerOk): (builder: Builder) => void;
export declare function loadChangeOwnerOk(slice: Slice): {
    $$type: "ChangeOwnerOk";
    queryId: bigint;
    newOwner: Address;
};
export type Ticket = {
    $$type: "Ticket";
    number: bigint;
    owner: Address;
};
export declare function storeTicket(src: Ticket): (builder: Builder) => void;
export declare function loadTicket(slice: Slice): {
    $$type: "Ticket";
    number: bigint;
    owner: Address;
};
export type CreateLottery = {
    $$type: "CreateLottery";
    creator: Address;
    price: bigint;
    endTime: bigint;
    discountDivisor: bigint;
};
export declare function storeCreateLottery(src: CreateLottery): (builder: Builder) => void;
export declare function loadCreateLottery(slice: Slice): {
    $$type: "CreateLottery";
    creator: Address;
    price: bigint;
    endTime: bigint;
    discountDivisor: bigint;
};
export type BuyTicket = {
    $$type: "BuyTicket";
    recipient: Address;
    amount: bigint;
    ticketNumbers: Dictionary<number, number>;
    refWallet: Address | null;
};
export declare function storeBuyTicket(src: BuyTicket): (builder: Builder) => void;
export declare function loadBuyTicket(slice: Slice): {
    $$type: "BuyTicket";
    recipient: Address;
    amount: bigint;
    ticketNumbers: Dictionary<number, number>;
    refWallet: Address | null;
};
export type ClaimTickets = {
    $$type: "ClaimTickets";
    ticketIds: Dictionary<number, number>;
    ticketLength: bigint;
};
export declare function storeClaimTickets(src: ClaimTickets): (builder: Builder) => void;
export declare function loadClaimTickets(slice: Slice): {
    $$type: "ClaimTickets";
    ticketIds: Dictionary<number, number>;
    ticketLength: bigint;
};
export type LotteryInfo = {
    $$type: "LotteryInfo";
    seqno: bigint;
    creator: Address;
    ticketCnt: bigint;
    endTime: bigint;
    price: bigint;
    status: bigint;
    amountCollected: bigint;
};
export declare function storeLotteryInfo(src: LotteryInfo): (builder: Builder) => void;
export declare function loadLotteryInfo(slice: Slice): {
    $$type: "LotteryInfo";
    seqno: bigint;
    creator: Address;
    ticketCnt: bigint;
    endTime: bigint;
    price: bigint;
    status: bigint;
    amountCollected: bigint;
};
export type Withdraw = {
    $$type: "Withdraw";
    target: Address;
};
export declare function storeWithdraw(src: Withdraw): (builder: Builder) => void;
export declare function loadWithdraw(slice: Slice): {
    $$type: "Withdraw";
    target: Address;
};
export type Lottery$Data = {
    $$type: "Lottery$Data";
    factory: Address;
    creator: Address;
    seqno: bigint;
    ticketCnt: bigint;
    endTime: bigint;
    price: bigint;
    status: bigint;
    discountDivisor: bigint;
    claimed: Dictionary<Address, number>;
    feePercent: bigint;
    refPercent: bigint;
    rewardPerBracket: Dictionary<bigint, bigint>;
    tickets: Dictionary<bigint, Ticket>;
    winnerCntPerBracket: Dictionary<bigint, bigint>;
    amountCollected: bigint;
    feeAmount: bigint;
    finalNumber: bigint;
};
export declare function storeLottery$Data(src: Lottery$Data): (builder: Builder) => void;
export declare function loadLottery$Data(slice: Slice): {
    $$type: "Lottery$Data";
    factory: Address;
    creator: Address;
    seqno: bigint;
    ticketCnt: bigint;
    endTime: bigint;
    price: bigint;
    status: bigint;
    discountDivisor: bigint;
    claimed: Dictionary<Address, number>;
    feePercent: bigint;
    refPercent: bigint;
    rewardPerBracket: Dictionary<bigint, bigint>;
    tickets: Dictionary<bigint, Ticket>;
    winnerCntPerBracket: Dictionary<bigint, bigint>;
    amountCollected: bigint;
    feeAmount: bigint;
    finalNumber: bigint;
};
export type CreateWallet = {
    $$type: "CreateWallet";
    owner: Address;
};
export declare function storeCreateWallet(src: CreateWallet): (builder: Builder) => void;
export declare function loadCreateWallet(slice: Slice): {
    $$type: "CreateWallet";
    owner: Address;
};
export type Move = {
    $$type: "Move";
    target: Address;
};
export declare function storeMove(src: Move): (builder: Builder) => void;
export declare function loadMove(slice: Slice): {
    $$type: "Move";
    target: Address;
};
export type ReferralWallet$Data = {
    $$type: "ReferralWallet$Data";
    factory: Address;
    owner: Address;
    amount: bigint;
    seqno: bigint;
};
export declare function storeReferralWallet$Data(src: ReferralWallet$Data): (builder: Builder) => void;
export declare function loadReferralWallet$Data(slice: Slice): {
    $$type: "ReferralWallet$Data";
    factory: Address;
    owner: Address;
    amount: bigint;
    seqno: bigint;
};
export type Draw = {
    $$type: "Draw";
    lotteryId: bigint;
};
export declare function storeDraw(src: Draw): (builder: Builder) => void;
export declare function loadDraw(slice: Slice): {
    $$type: "Draw";
    lotteryId: bigint;
};
export type EmergencyWithdraw = {
    $$type: "EmergencyWithdraw";
    lotteryId: bigint;
};
export declare function storeEmergencyWithdraw(src: EmergencyWithdraw): (builder: Builder) => void;
export declare function loadEmergencyWithdraw(slice: Slice): {
    $$type: "EmergencyWithdraw";
    lotteryId: bigint;
};
export type LotteryFactory$Data = {
    $$type: "LotteryFactory$Data";
    owner: Address;
    lotteryCnt: bigint;
    referrers: Dictionary<bigint, Address>;
    referrer_cnt: bigint;
    withdraw_end: bigint;
};
export declare function storeLotteryFactory$Data(src: LotteryFactory$Data): (builder: Builder) => void;
export declare function loadLotteryFactory$Data(slice: Slice): {
    $$type: "LotteryFactory$Data";
    owner: Address;
    lotteryCnt: bigint;
    referrers: Dictionary<bigint, Address>;
    referrer_cnt: bigint;
    withdraw_end: bigint;
};
export declare const ReferralWallet_getterMapping: {
    [key: string]: string;
};
export declare class ReferralWallet implements Contract {
    static init(factory: Address, seqno: bigint): Promise<{
        code: Cell;
        data: Cell;
    }>;
    static fromInit(factory: Address, seqno: bigint): Promise<ReferralWallet>;
    static fromAddress(address: Address): ReferralWallet;
    readonly address: Address;
    readonly init?: {
        code: Cell;
        data: Cell;
    };
    readonly abi: ContractABI;
    private constructor();
    send(provider: ContractProvider, via: Sender, args: {
        value: bigint;
        bounce?: boolean | null | undefined;
    }, message: CreateWallet | "accept" | "withdraw" | Move): Promise<void>;
    getBalance(provider: ContractProvider): Promise<bigint>;
}
