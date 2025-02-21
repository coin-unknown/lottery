import {
	Address,
	Dictionary,
	type OpenedContract,
	address,
	fromNano,
	toNano,
} from "@ton/core";
import type TonConnect from "@tonconnect/sdk";
import type { Wallet } from "@tonconnect/sdk";
import { type IRound, type ITicket, RoundStatus } from "./types";
import {
	TonConnectProvider,
	getFactoryInstance,
	getLotteryInstance,
	getRefWalletInstance,
} from "./utils/factory";
import type { Lottery } from "./utils/tact_Lottery";
import type { LotteryFactory } from "./utils/tact_LotteryFactory";
import type { ReferralWallet } from "./utils/tact_ReferralWallet";

export * from "./types";

let factorySingleton: Promise<OpenedContract<LotteryFactory>>;
let refWalletSingleton: Promise<OpenedContract<ReferralWallet>>;
let lotterySingleton: Promise<OpenedContract<Lottery>>;
let lotterySingletonIdx = 0;
let tonconnectSingleton: TonConnectProvider;

/**
 * Factory instance
 * @returns
 */
async function getFactory(): Promise<OpenedContract<LotteryFactory>> {
	if (!factorySingleton) {
		factorySingleton = getFactoryInstance();
	}

	return factorySingleton;
}

/**
 * Wallet ref instance
 * @param address
 * @returns
 */
async function getRefWallet(
	address: Address
): Promise<OpenedContract<ReferralWallet>> {
	if (!refWalletSingleton) {
		refWalletSingleton = getRefWalletInstance(address);
	}

	return refWalletSingleton;
}

/**
 * Lottery instance
 * @param roundIdx
 * @returns
 */
async function getLottery(roundIdx: number): Promise<OpenedContract<Lottery>> {
	if (!lotterySingleton || roundIdx !== lotterySingletonIdx) {
		const factory = await getFactory();
		const lotteryAddr = await factory.getLotteryAddress(BigInt(roundIdx));
		lotterySingletonIdx = roundIdx;
		lotterySingleton = getLotteryInstance(lotteryAddr);
	}

	return lotterySingleton;
}

/**
 * Sender instance
 * @param tonconnect
 * @returns
 */
function getSender(tonconnect: TonConnect): TonConnectProvider {
	if (!tonconnectSingleton) {
		tonconnectSingleton = new TonConnectProvider(tonconnect);
	}

	return tonconnectSingleton;
}

/**
 * Add leading zeros to a number
 * @param number
 * @returns
 */
function getReadableTicketNumber(number: number | bigint) {
	const numbers = number.toString().split("").reverse();

	if (numbers.length === 7) {
		numbers.pop();
	}

	return numbers.join("").padStart(6, "0");
}

/**
 * Get the number of matching digits between a ticket and a draw
 * @param ticket
 * @param draw
 * @returns
 */
function getTicketMatch(ticket: string, draw: string) {
	let matched = 0;

	for (let i = 0; i < 6; i++) {
		if (ticket[i] === draw[i]) {
			matched++;
		} else {
			break;
		}
	}

	return matched;
}

/**
 * Returns last created round idx
 * @returns
 */
export const getLastRoundId = async () => {
	const factory = await getFactory();
	return Number(await factory.getLotteryCnt()) - 1;
};

function getRoundStatus(status: bigint): RoundStatus {
	switch (status) {
		case 0n:
			return RoundStatus.Open;
		case 1n:
			return RoundStatus.Closed;
		case 2n:
			return RoundStatus.Drawn;
		default:
			throw new Error(`Unknown status: ${status}`);
	}
}

/**
 * Get information about a specific round for the unauthorized user
 * @param roundIdx round number
 * @returns
 */
export const getRoundGuest = async (roundIdx?: number): Promise<IRound> => {
	if (roundIdx === undefined) {
		roundIdx = await getLastRoundId();
	}

	const response: IRound = {
		id: roundIdx,
		ticketsSold: 0,
		drawTime: 0,
		price: 0,
		status: RoundStatus.Open,
		claimable: false,
		roundPot: "0",
		roundDraw: "",
		userData: {
			refReward: 0,
			refWallet: null,
			tickets: [],
		},
		tickets: [],
	};

	const lottery = await getLottery(roundIdx);
	const [lotteryInfo, roundDraw] = await Promise.all([
		lottery.getInfo(),
		lottery.getWinningNumber(),
	]);

	// Reverse back number
	let roundDrawString = "";

	if (roundDraw > 0) {
		roundDrawString = getReadableTicketNumber(roundDraw);
	}

	const endTime = Number(lotteryInfo.endTime) * 1000;

	response.ticketsSold = Number(fromNano(lotteryInfo.ticketCnt));
	response.drawTime = endTime;
	response.price = Number(fromNano(lotteryInfo.price));
	response.status = getRoundStatus(lotteryInfo.status);
	response.roundPot = Number(fromNano(lotteryInfo.amountCollected)).toFixed(2);
	response.roundDraw = roundDrawString;

	return response;
};

/**
 * Get information about a specific round
 * @param roundIdx round number
 * @returns
 */
export const getRound = async (
	wallet: Wallet,
	roundIdx?: number
): Promise<IRound> => {
	if (roundIdx === undefined) {
		roundIdx = await getLastRoundId();
	}

	const response: IRound = {
		id: roundIdx,
		ticketsSold: 0,
		drawTime: 0,
		price: 0,
		status: RoundStatus.Open,
		claimable: false,
		roundPot: "0",
		roundDraw: "",
		tickets: [],
		userData: {
			refReward: 0,
			refWallet: null,
			tickets: [],
		},
	};

	const [factory, lottery] = await Promise.all([
		getFactory(),
		getLottery(roundIdx),
	]);
	const walletAddress = address(wallet.account.address);
	const [refNum, tickets, lotteryInfo, roundDraw, isClaimable] =
		await Promise.all([
			factory.getReffererNumber(walletAddress).catch(() => 0),
			lottery.getAllTickets(),
			lottery.getInfo(),
			lottery.getWinningNumber(),
			lottery.getIsClaimable(walletAddress),
		]);

	if (Number(refNum) > 0) {
		const { refWallet, refReward } = await getRefferalData(wallet);

		response.userData.refReward = refReward;
		response.userData.refWallet = refWallet;
	}

	// Reverse back number
	let roundDrawString = "";

	if (roundDraw > 0) {
		roundDrawString = getReadableTicketNumber(roundDraw);
	}

	for (let i = 0; i < tickets.size; i++) {
		const bigI = BigInt(i);
		const ticket = tickets.get(bigI);
		const ticketString = getReadableTicketNumber(ticket?.number ?? 0);
		const isMyTicket = ticket?.owner.equals(walletAddress);
		const matched = roundDrawString
			? getTicketMatch(ticketString, roundDrawString)
			: 0;

		const ticketData: ITicket = {
			id: i,
			numbers: ticketString,
			prizeAmount: 0,
			matched,
			address: ticket?.owner.toString({ urlSafe: true }) || "",
		};

		if (isMyTicket) {
			response.userData.tickets.push(ticketData);
			const prize =
				matched > 0 ? await lottery.getCalculateRewardsForTicketId(bigI) : 0;
			ticketData.prizeAmount = Number(fromNano(prize)) || 0;
		}

		response.tickets.push(ticketData);
	}

	const endTime = Number(lotteryInfo.endTime) * 1000;

	response.ticketsSold = Number(fromNano(lotteryInfo.ticketCnt));
	response.drawTime = endTime;
	response.price = Number(fromNano(lotteryInfo.price));
	response.status = getRoundStatus(lotteryInfo.status);
	response.roundPot = Number(fromNano(lotteryInfo.amountCollected)).toFixed(2);
	response.roundDraw = roundDrawString;
	response.claimable = isClaimable;

	return response;
};

/**
 * Create ref wallet address
 * @param tonConnect
 */
export const createReferralWallet = async (tonConnect: TonConnect | any) => {
	const factory = await getFactory();
	const sender = getSender(tonConnect);

	await factory.send(
		sender,
		{
			value: toNano("0.015"),
		},
		"createRefWallet"
	);
};

/**
 * Get you ref wallet address in lottery smart contract
 * @param wallet
 */
export const getRefferalData = async (wallet: Wallet) => {
	let refReward = 0;
	let refWallet = null;

	const factory = await getFactory();
	// TODO: test it
	const refAddress = await factory.getReferrerWalletAddress(
		Address.parse(wallet.account.address)
	);
	const ref = await getRefWallet(refAddress);

	try {
		const refBalance = await ref.getBalance();
		refReward = Number(fromNano(refBalance));
	} catch (e) {}

	refWallet = ref.address.toString();

	return { refReward, refWallet };
};

/**
 * Withdraw	referral rewards
 * @param tonConnect
 */
export const claimReferralReward = async (tonConnect: TonConnect | any) => {
	const sender = getSender(tonConnect);
	const factory = await getFactory();

	await factory.send(
		sender,
		{
			value: toNano("0.02"),
		},
		"withdraw_ref"
	);
};

/**
 * Calculate the price of the tickets
 * @param roundIdx
 * @param qty
 * @returns
 */
export const getTicketsPrice = async (roundIdx: number, qty: number) => {
	const lottery = await getLottery(roundIdx);
	const cost = await lottery.getCalculateTotalPriceForBulkTickets(BigInt(qty));

	return Number(fromNano(cost));
};

/**
 * Buy a ticket for lottery for transaction sender
 * @param tonConnect
 * @param roundIdx
 * @param qty
 * @param cost
 * @param refWallet
 * @returns
 */
export const buyTicket = async (
	tonConnect: TonConnect | any,
	roundIdx: number,
	qty: number,
	cost: number,
	numbers?: string[],
	ref?: string
) => {
	const refWallet = ref ? Address.parse(ref) : undefined;

	return _buyTicket(tonConnect, { roundIdx, qty, cost, refWallet, numbers });
};

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
export const buyTicketFor = async (
	tonConnect: TonConnect | any,
	roundIdx: number,
	qty: number,
	cost: number,
	recipient: Address,
	refWallet?: Address
) => {
	return _buyTicket(tonConnect, { roundIdx, qty, cost, refWallet, recipient });
};

/**
 * Claim winned tickets
 * @param tonConnect
 * @param roundIdx
 * @param winTicketsIds
 * @returns
 */
export const claimTickets = async (
	tonConnect: TonConnect | any,
	roundIdx: number,
	winTicketsIds: number[]
) => {
	const sender = new TonConnectProvider(tonConnect);

	if (!sender.address) {
		return;
	}

	const lottery = await getLottery(roundIdx);
	const ticketIds: Dictionary<number, number> = Dictionary.empty();

	for (let i = 0; i < winTicketsIds.length; i++) {
		ticketIds.set(i, winTicketsIds[i]);
	}

	await lottery.send(
		sender,
		{
			value: toNano("0.02") * BigInt(winTicketsIds.length),
		},
		{
			$$type: "ClaimTickets",
			ticketIds,
			ticketLength: BigInt(winTicketsIds.length),
		}
	);
};

/**
 * Claim round comission for the lottery
 * @requires admin
 * @param tonConnect
 * @param roundIdx
 */
export const claimPlatformComission = async (
	tonConnect: TonConnect | any,
	roundIdx: number
) => {
	const lottery = await getLottery(roundIdx);
	const sender = getSender(tonConnect);

	await lottery.send(
		sender,
		{
			value: toNano("0.01"),
		},
		"widrawCommission"
	);
};

/**
 * Set operator for the lottery
 * @requires admin
 * @param tonConnect
 * @param address
 */
export const setOperator = async (
	tonConnect: TonConnect | any,
	address: string
) => {
	const sender = getSender(tonConnect);
	const fullAddress = Address.parse(address);
	const factory = await getFactory();

	await factory.send(
		sender,
		{
			value: toNano("0.005"),
		},
		{
			$$type: "SetOperator",
			operator: fullAddress,
		}
	);
};

/**
 * Create lottery round
 * @requires admin
 * @param tonConnect
 * @returns
 */
export const createRound = async (
	tonConnect: TonConnect | any,
	drawAt: number,
	price: number = 0.2,
) => {
	const sender = getSender(tonConnect);

	if (!sender.address) {
		return;
	}

	const factory = await getFactory();
	await factory.send(
		sender,
		{
			value: toNano("0.1"),
		},
		{
			$$type: "Create",
			endTime: BigInt(Math.floor(drawAt / 1000)),
			price: toNano(price),
			discountDivisor: BigInt(300),
		}
	);
};

/**
 * Close lottery round
 * @requires admin
 * @param tonConnect
 * @param roundIdx
 */
export const closeRound = async (
	tonConnect: TonConnect | any,
	roundIdx: number
) => {
	const lottery = await getLottery(roundIdx);
	const sender = getSender(tonConnect);

	await lottery.send(
		sender,
		{
			value: toNano("0.01"),
		},
		"close"
	);
};

/**
 * Initiate lottery draw
 * @requires admin
 * @param tonConnect
 * @param roundIdx
 */
export const drawRound = async (
	tonConnect: TonConnect | any,
	roundIdx: number
) => {
	const factory = await getFactory();
	const sender = getSender(tonConnect);

	await factory.send(
		sender,
		{
			value: toNano("0.04"),
		},
		{
			$$type: "Draw",
			lotteryId: BigInt(roundIdx),
		}
	);
};

/**
 * Move rount pot to the next round
 * @requires admin
 * @param tonConnect
 * @param roundIdx
 */
export const moveFunds = async (
	tonConnect: TonConnect | any,
	roundIdx: number
) => {
	const sender = getSender(tonConnect);
	const lottery = await getLottery(roundIdx);

	await lottery.send(
		sender,
		{
			value: toNano("0.01"),
		},
		"moveFunds"
	);
};

/**
 * @requires admin
 * @param tonConnect
 * @param roundIdx
 */
export const _emergencyWitdraw = async (
	tonConnect: TonConnect | any,
	roundIdx: number
) => {
	const factory = await getFactory();
	const sender = getSender(tonConnect);

	await factory.send(
		sender,
		{
			value: toNano("0.02"),
		},
		{
			$$type: "EmergencyWithdraw",
			lotteryId: BigInt(roundIdx),
		}
	);
};


/**
 * Add funds to the lottery
 * @requires admin
 * @param tonConnect 
 * @param roundIdx 
 * @param amount 
 * @returns 
 */
export const _addFunds = async (
	tonConnect: TonConnect | any,
	roundIdx: number,
	amount: number
) => {
	const sender = getSender(tonConnect);

	if (!sender.address) {
		return false;
	}

	const lottery = await getLottery(roundIdx);
	await lottery.send(
		sender,
		{
			value: toNano(String(amount)),
		},
		"addFunds"
	);

	return true;
};

type BuyTicketParams = {
	roundIdx: number;
	qty: number;
	cost: number;
	recipient?: Address;
	refWallet?: Address;
	numbers?: string[];
};

async function _buyTicket(
	tonConnect: TonConnect | any,
	params: BuyTicketParams
) {
	const sender = getSender(tonConnect);

	if (!sender.address) {
		return false;
	}

	const {
		roundIdx,
		qty,
		cost,
		refWallet = null,
		recipient = sender.address,
		numbers,
	} = params;
	const ticketNumbers: Dictionary<number, number> = Dictionary.empty();

	for (let i = 0; i < qty; i++) {
		const rnd = 1000000 * Math.random();
		const number = numbers ? numbers[i] : Number.parseInt(rnd.toString());
		ticketNumbers.set(i, Number(number) + 1000000);
	}

	const lottery = await getLottery(roundIdx);
	const bigintQty = BigInt(qty);
	await lottery.send(
		sender,
		{
			value: toNano(cost) + toNano("0.004") * bigintQty,
		},
		{
			$$type: "BuyTicket",
			amount: bigintQty,
			ticketNumbers,
			recipient,
			refWallet,
		}
	);

	return true;
}

