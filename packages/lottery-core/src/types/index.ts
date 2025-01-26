import type { Address } from "@ton/core";

export interface User {
	ticketCnt: number;
	ticketIds: number[];
	ticketNumbers: number[];
}

export interface WinTicket {
	number: number;
	reward: string;
	id: number;
}

export enum RoundStatus {
	Open = "Open",
	Closed = "Closed",
	Drawn = "Drawn",
}

export interface ITicket {
	id: number;
	numbers: string;
	prizeAmount: number;
	matched: number;
}

export interface IUserData {
	refWallet: Address | null;
	refReward: number;
	tickets: ITicket[];
}

export interface IRound {
	id: number;
	ticketsSold: number;
	drawTime: number;
	price: number;
	status: RoundStatus;
	claimable: boolean;
	roundPot: string;
	roundDraw: string;
	userData: IUserData;
}
