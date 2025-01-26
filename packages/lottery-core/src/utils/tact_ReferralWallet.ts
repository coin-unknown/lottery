import {
	type ABIGetter,
	type ABIReceiver,
	type ABIType,
	type Address,
	Builder,
	Cell,
	type Contract,
	type ContractABI,
	type ContractProvider,
	Dictionary,
	type DictionaryValue,
	type Sender,
	Slice,
	TupleBuilder,
	beginCell,
	contractAddress,
} from "@ton/core";

export type StateInit = {
	$$type: "StateInit";
	code: Cell;
	data: Cell;
};

export function storeStateInit(src: StateInit) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeRef(src.code);
		b0.storeRef(src.data);
	};
}

export function loadStateInit(slice: Slice) {
	const sc0 = slice;
	const _code = sc0.loadRef();
	const _data = sc0.loadRef();
	return { $$type: "StateInit" as const, code: _code, data: _data };
}

export type StdAddress = {
	$$type: "StdAddress";
	workchain: bigint;
	address: bigint;
};

export function storeStdAddress(src: StdAddress) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeInt(src.workchain, 8);
		b0.storeUint(src.address, 256);
	};
}

export function loadStdAddress(slice: Slice) {
	const sc0 = slice;
	const _workchain = sc0.loadIntBig(8);
	const _address = sc0.loadUintBig(256);
	return {
		$$type: "StdAddress" as const,
		workchain: _workchain,
		address: _address,
	};
}

export type VarAddress = {
	$$type: "VarAddress";
	workchain: bigint;
	address: Slice;
};

export function storeVarAddress(src: VarAddress) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeInt(src.workchain, 32);
		b0.storeRef(src.address.asCell());
	};
}

export function loadVarAddress(slice: Slice) {
	const sc0 = slice;
	const _workchain = sc0.loadIntBig(32);
	const _address = sc0.loadRef().asSlice();
	return {
		$$type: "VarAddress" as const,
		workchain: _workchain,
		address: _address,
	};
}

export type Context = {
	$$type: "Context";
	bounced: boolean;
	sender: Address;
	value: bigint;
	raw: Slice;
};

export function storeContext(src: Context) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeBit(src.bounced);
		b0.storeAddress(src.sender);
		b0.storeInt(src.value, 257);
		b0.storeRef(src.raw.asCell());
	};
}

export function loadContext(slice: Slice) {
	const sc0 = slice;
	const _bounced = sc0.loadBit();
	const _sender = sc0.loadAddress();
	const _value = sc0.loadIntBig(257);
	const _raw = sc0.loadRef().asSlice();
	return {
		$$type: "Context" as const,
		bounced: _bounced,
		sender: _sender,
		value: _value,
		raw: _raw,
	};
}

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

export function storeSendParameters(src: SendParameters) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeBit(src.bounce);
		b0.storeAddress(src.to);
		b0.storeInt(src.value, 257);
		b0.storeInt(src.mode, 257);
		if (src.body !== null && src.body !== undefined) {
			b0.storeBit(true).storeRef(src.body);
		} else {
			b0.storeBit(false);
		}
		if (src.code !== null && src.code !== undefined) {
			b0.storeBit(true).storeRef(src.code);
		} else {
			b0.storeBit(false);
		}
		if (src.data !== null && src.data !== undefined) {
			b0.storeBit(true).storeRef(src.data);
		} else {
			b0.storeBit(false);
		}
	};
}

export function loadSendParameters(slice: Slice) {
	const sc0 = slice;
	const _bounce = sc0.loadBit();
	const _to = sc0.loadAddress();
	const _value = sc0.loadIntBig(257);
	const _mode = sc0.loadIntBig(257);
	const _body = sc0.loadBit() ? sc0.loadRef() : null;
	const _code = sc0.loadBit() ? sc0.loadRef() : null;
	const _data = sc0.loadBit() ? sc0.loadRef() : null;
	return {
		$$type: "SendParameters" as const,
		bounce: _bounce,
		to: _to,
		value: _value,
		mode: _mode,
		body: _body,
		code: _code,
		data: _data,
	};
}

export type Deploy = {
	$$type: "Deploy";
	queryId: bigint;
};

export function storeDeploy(src: Deploy) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(2490013878, 32);
		b0.storeUint(src.queryId, 64);
	};
}

export function loadDeploy(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 2490013878) {
		throw new Error("Invalid prefix");
	}
	const _queryId = sc0.loadUintBig(64);
	return { $$type: "Deploy" as const, queryId: _queryId };
}

export type DeployOk = {
	$$type: "DeployOk";
	queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(2952335191, 32);
		b0.storeUint(src.queryId, 64);
	};
}

export function loadDeployOk(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 2952335191) {
		throw new Error("Invalid prefix");
	}
	const _queryId = sc0.loadUintBig(64);
	return { $$type: "DeployOk" as const, queryId: _queryId };
}

export type FactoryDeploy = {
	$$type: "FactoryDeploy";
	queryId: bigint;
	cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(1829761339, 32);
		b0.storeUint(src.queryId, 64);
		b0.storeAddress(src.cashback);
	};
}

export function loadFactoryDeploy(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 1829761339) {
		throw new Error("Invalid prefix");
	}
	const _queryId = sc0.loadUintBig(64);
	const _cashback = sc0.loadAddress();
	return {
		$$type: "FactoryDeploy" as const,
		queryId: _queryId,
		cashback: _cashback,
	};
}

export type ChangeOwner = {
	$$type: "ChangeOwner";
	queryId: bigint;
	newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(2174598809, 32);
		b0.storeUint(src.queryId, 64);
		b0.storeAddress(src.newOwner);
	};
}

export function loadChangeOwner(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 2174598809) {
		throw new Error("Invalid prefix");
	}
	const _queryId = sc0.loadUintBig(64);
	const _newOwner = sc0.loadAddress();
	return {
		$$type: "ChangeOwner" as const,
		queryId: _queryId,
		newOwner: _newOwner,
	};
}

export type ChangeOwnerOk = {
	$$type: "ChangeOwnerOk";
	queryId: bigint;
	newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(846932810, 32);
		b0.storeUint(src.queryId, 64);
		b0.storeAddress(src.newOwner);
	};
}

export function loadChangeOwnerOk(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 846932810) {
		throw new Error("Invalid prefix");
	}
	const _queryId = sc0.loadUintBig(64);
	const _newOwner = sc0.loadAddress();
	return {
		$$type: "ChangeOwnerOk" as const,
		queryId: _queryId,
		newOwner: _newOwner,
	};
}

export type Ticket = {
	$$type: "Ticket";
	number: bigint;
	owner: Address;
};

export function storeTicket(src: Ticket) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(src.number, 32);
		b0.storeAddress(src.owner);
	};
}

export function loadTicket(slice: Slice) {
	const sc0 = slice;
	const _number = sc0.loadUintBig(32);
	const _owner = sc0.loadAddress();
	return { $$type: "Ticket" as const, number: _number, owner: _owner };
}

function dictValueParserTicket(): DictionaryValue<Ticket> {
	return {
		serialize: (src, builder) => {
			builder.storeRef(beginCell().store(storeTicket(src)).endCell());
		},
		parse: (src) => {
			return loadTicket(src.loadRef().beginParse());
		},
	};
}

export type CreateLottery = {
	$$type: "CreateLottery";
	creator: Address;
	price: bigint;
	endTime: bigint;
	discountDivisor: bigint;
};

export function storeCreateLottery(src: CreateLottery) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(1817793233, 32);
		b0.storeAddress(src.creator);
		b0.storeInt(src.price, 257);
		b0.storeInt(src.endTime, 257);
		const b1 = new Builder();
		b1.storeInt(src.discountDivisor, 257);
		b0.storeRef(b1.endCell());
	};
}

export function loadCreateLottery(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 1817793233) {
		throw new Error("Invalid prefix");
	}
	const _creator = sc0.loadAddress();
	const _price = sc0.loadIntBig(257);
	const _endTime = sc0.loadIntBig(257);
	const sc1 = sc0.loadRef().beginParse();
	const _discountDivisor = sc1.loadIntBig(257);
	return {
		$$type: "CreateLottery" as const,
		creator: _creator,
		price: _price,
		endTime: _endTime,
		discountDivisor: _discountDivisor,
	};
}

export type BuyTicket = {
	$$type: "BuyTicket";
	recipient: Address;
	amount: bigint;
	ticketNumbers: Dictionary<number, number>;
	refWallet: Address | null;
};

export function storeBuyTicket(src: BuyTicket) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(3310573309, 32);
		b0.storeAddress(src.recipient);
		b0.storeUint(src.amount, 32);
		b0.storeDict(
			src.ticketNumbers,
			Dictionary.Keys.Uint(32),
			Dictionary.Values.Uint(32),
		);
		b0.storeAddress(src.refWallet);
	};
}

export function loadBuyTicket(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 3310573309) {
		throw new Error("Invalid prefix");
	}
	const _recipient = sc0.loadAddress();
	const _amount = sc0.loadUintBig(32);
	const _ticketNumbers = Dictionary.load(
		Dictionary.Keys.Uint(32),
		Dictionary.Values.Uint(32),
		sc0,
	);
	const _refWallet = sc0.loadMaybeAddress();
	return {
		$$type: "BuyTicket" as const,
		recipient: _recipient,
		amount: _amount,
		ticketNumbers: _ticketNumbers,
		refWallet: _refWallet,
	};
}

export type ClaimTickets = {
	$$type: "ClaimTickets";
	ticketIds: Dictionary<number, number>;
	ticketLength: bigint;
};

export function storeClaimTickets(src: ClaimTickets) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(2609204369, 32);
		b0.storeDict(
			src.ticketIds,
			Dictionary.Keys.Uint(32),
			Dictionary.Values.Uint(32),
		);
		b0.storeUint(src.ticketLength, 32);
	};
}

export function loadClaimTickets(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 2609204369) {
		throw new Error("Invalid prefix");
	}
	const _ticketIds = Dictionary.load(
		Dictionary.Keys.Uint(32),
		Dictionary.Values.Uint(32),
		sc0,
	);
	const _ticketLength = sc0.loadUintBig(32);
	return {
		$$type: "ClaimTickets" as const,
		ticketIds: _ticketIds,
		ticketLength: _ticketLength,
	};
}

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

export function storeLotteryInfo(src: LotteryInfo) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeInt(src.seqno, 257);
		b0.storeAddress(src.creator);
		b0.storeInt(src.ticketCnt, 257);
		const b1 = new Builder();
		b1.storeInt(src.endTime, 257);
		b1.storeInt(src.price, 257);
		b1.storeInt(src.status, 257);
		const b2 = new Builder();
		b2.storeInt(src.amountCollected, 257);
		b1.storeRef(b2.endCell());
		b0.storeRef(b1.endCell());
	};
}

export function loadLotteryInfo(slice: Slice) {
	const sc0 = slice;
	const _seqno = sc0.loadIntBig(257);
	const _creator = sc0.loadAddress();
	const _ticketCnt = sc0.loadIntBig(257);
	const sc1 = sc0.loadRef().beginParse();
	const _endTime = sc1.loadIntBig(257);
	const _price = sc1.loadIntBig(257);
	const _status = sc1.loadIntBig(257);
	const sc2 = sc1.loadRef().beginParse();
	const _amountCollected = sc2.loadIntBig(257);
	return {
		$$type: "LotteryInfo" as const,
		seqno: _seqno,
		creator: _creator,
		ticketCnt: _ticketCnt,
		endTime: _endTime,
		price: _price,
		status: _status,
		amountCollected: _amountCollected,
	};
}

export type Withdraw = {
	$$type: "Withdraw";
	target: Address;
};

export function storeWithdraw(src: Withdraw) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(922360000, 32);
		b0.storeAddress(src.target);
	};
}

export function loadWithdraw(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 922360000) {
		throw new Error("Invalid prefix");
	}
	const _target = sc0.loadAddress();
	return { $$type: "Withdraw" as const, target: _target };
}

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

export function storeLottery$Data(src: Lottery$Data) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeAddress(src.factory);
		b0.storeAddress(src.creator);
		b0.storeInt(src.seqno, 257);
		const b1 = new Builder();
		b1.storeInt(src.ticketCnt, 257);
		b1.storeUint(src.endTime, 256);
		b1.storeUint(src.price, 256);
		b1.storeUint(src.status, 16);
		const b2 = new Builder();
		b2.storeInt(src.discountDivisor, 257);
		b2.storeDict(
			src.claimed,
			Dictionary.Keys.Address(),
			Dictionary.Values.Uint(8),
		);
		b2.storeInt(src.feePercent, 257);
		b2.storeInt(src.refPercent, 257);
		b2.storeDict(
			src.rewardPerBracket,
			Dictionary.Keys.BigInt(257),
			Dictionary.Values.BigUint(256),
		);
		b2.storeDict(
			src.tickets,
			Dictionary.Keys.BigInt(257),
			dictValueParserTicket(),
		);
		const b3 = new Builder();
		b3.storeDict(
			src.winnerCntPerBracket,
			Dictionary.Keys.BigInt(257),
			Dictionary.Values.BigUint(256),
		);
		b3.storeUint(src.amountCollected, 256);
		b3.storeUint(src.feeAmount, 256);
		b3.storeUint(src.finalNumber, 32);
		b2.storeRef(b3.endCell());
		b1.storeRef(b2.endCell());
		b0.storeRef(b1.endCell());
	};
}

export function loadLottery$Data(slice: Slice) {
	const sc0 = slice;
	const _factory = sc0.loadAddress();
	const _creator = sc0.loadAddress();
	const _seqno = sc0.loadIntBig(257);
	const sc1 = sc0.loadRef().beginParse();
	const _ticketCnt = sc1.loadIntBig(257);
	const _endTime = sc1.loadUintBig(256);
	const _price = sc1.loadUintBig(256);
	const _status = sc1.loadUintBig(16);
	const sc2 = sc1.loadRef().beginParse();
	const _discountDivisor = sc2.loadIntBig(257);
	const _claimed = Dictionary.load(
		Dictionary.Keys.Address(),
		Dictionary.Values.Uint(8),
		sc2,
	);
	const _feePercent = sc2.loadIntBig(257);
	const _refPercent = sc2.loadIntBig(257);
	const _rewardPerBracket = Dictionary.load(
		Dictionary.Keys.BigInt(257),
		Dictionary.Values.BigUint(256),
		sc2,
	);
	const _tickets = Dictionary.load(
		Dictionary.Keys.BigInt(257),
		dictValueParserTicket(),
		sc2,
	);
	const sc3 = sc2.loadRef().beginParse();
	const _winnerCntPerBracket = Dictionary.load(
		Dictionary.Keys.BigInt(257),
		Dictionary.Values.BigUint(256),
		sc3,
	);
	const _amountCollected = sc3.loadUintBig(256);
	const _feeAmount = sc3.loadUintBig(256);
	const _finalNumber = sc3.loadUintBig(32);
	return {
		$$type: "Lottery$Data" as const,
		factory: _factory,
		creator: _creator,
		seqno: _seqno,
		ticketCnt: _ticketCnt,
		endTime: _endTime,
		price: _price,
		status: _status,
		discountDivisor: _discountDivisor,
		claimed: _claimed,
		feePercent: _feePercent,
		refPercent: _refPercent,
		rewardPerBracket: _rewardPerBracket,
		tickets: _tickets,
		winnerCntPerBracket: _winnerCntPerBracket,
		amountCollected: _amountCollected,
		feeAmount: _feeAmount,
		finalNumber: _finalNumber,
	};
}

export type CreateWallet = {
	$$type: "CreateWallet";
	owner: Address;
};

export function storeCreateWallet(src: CreateWallet) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(4268690758, 32);
		b0.storeAddress(src.owner);
	};
}

export function loadCreateWallet(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 4268690758) {
		throw new Error("Invalid prefix");
	}
	const _owner = sc0.loadAddress();
	return { $$type: "CreateWallet" as const, owner: _owner };
}

export type Move = {
	$$type: "Move";
	target: Address;
};

export function storeMove(src: Move) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(3211350992, 32);
		b0.storeAddress(src.target);
	};
}

export function loadMove(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 3211350992) {
		throw new Error("Invalid prefix");
	}
	const _target = sc0.loadAddress();
	return { $$type: "Move" as const, target: _target };
}

export type ReferralWallet$Data = {
	$$type: "ReferralWallet$Data";
	factory: Address;
	owner: Address;
	amount: bigint;
	seqno: bigint;
};

export function storeReferralWallet$Data(src: ReferralWallet$Data) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeAddress(src.factory);
		b0.storeAddress(src.owner);
		b0.storeInt(src.amount, 257);
		const b1 = new Builder();
		b1.storeInt(src.seqno, 257);
		b0.storeRef(b1.endCell());
	};
}

export function loadReferralWallet$Data(slice: Slice) {
	const sc0 = slice;
	const _factory = sc0.loadAddress();
	const _owner = sc0.loadAddress();
	const _amount = sc0.loadIntBig(257);
	const sc1 = sc0.loadRef().beginParse();
	const _seqno = sc1.loadIntBig(257);
	return {
		$$type: "ReferralWallet$Data" as const,
		factory: _factory,
		owner: _owner,
		amount: _amount,
		seqno: _seqno,
	};
}

export type Draw = {
	$$type: "Draw";
	lotteryId: bigint;
};

export function storeDraw(src: Draw) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(746428760, 32);
		b0.storeInt(src.lotteryId, 257);
	};
}

export function loadDraw(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 746428760) {
		throw new Error("Invalid prefix");
	}
	const _lotteryId = sc0.loadIntBig(257);
	return { $$type: "Draw" as const, lotteryId: _lotteryId };
}

export type EmergencyWithdraw = {
	$$type: "EmergencyWithdraw";
	lotteryId: bigint;
};

export function storeEmergencyWithdraw(src: EmergencyWithdraw) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeUint(807739057, 32);
		b0.storeInt(src.lotteryId, 257);
	};
}

export function loadEmergencyWithdraw(slice: Slice) {
	const sc0 = slice;
	if (sc0.loadUint(32) !== 807739057) {
		throw new Error("Invalid prefix");
	}
	const _lotteryId = sc0.loadIntBig(257);
	return { $$type: "EmergencyWithdraw" as const, lotteryId: _lotteryId };
}

export type LotteryFactory$Data = {
	$$type: "LotteryFactory$Data";
	owner: Address;
	lotteryCnt: bigint;
	referrers: Dictionary<bigint, Address>;
	referrer_cnt: bigint;
	withdraw_end: bigint;
};

export function storeLotteryFactory$Data(src: LotteryFactory$Data) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeAddress(src.owner);
		b0.storeUint(src.lotteryCnt, 256);
		b0.storeDict(
			src.referrers,
			Dictionary.Keys.BigInt(257),
			Dictionary.Values.Address(),
		);
		b0.storeInt(src.referrer_cnt, 257);
		const b1 = new Builder();
		b1.storeUint(src.withdraw_end, 256);
		b0.storeRef(b1.endCell());
	};
}

export function loadLotteryFactory$Data(slice: Slice) {
	const sc0 = slice;
	const _owner = sc0.loadAddress();
	const _lotteryCnt = sc0.loadUintBig(256);
	const _referrers = Dictionary.load(
		Dictionary.Keys.BigInt(257),
		Dictionary.Values.Address(),
		sc0,
	);
	const _referrerCnt = sc0.loadIntBig(257);
	const sc1 = sc0.loadRef().beginParse();
	const _withdrawEnd = sc1.loadUintBig(256);
	return {
		$$type: "LotteryFactory$Data" as const,
		owner: _owner,
		lotteryCnt: _lotteryCnt,
		referrers: _referrers,
		referrer_cnt: _referrerCnt,
		withdraw_end: _withdrawEnd,
	};
}

type ReferralWalletInitArgs = {
	$$type: "ReferralWallet_init_args";
	factory: Address;
	seqno: bigint;
};

function initReferralWalletInitArgs(src: ReferralWalletInitArgs) {
	return (builder: Builder) => {
		const b0 = builder;
		b0.storeAddress(src.factory);
		b0.storeInt(src.seqno, 257);
	};
}

async function referralWalletInit(factory: Address, seqno: bigint) {
	const __code = Cell.fromBase64(
		"te6ccgECEgEAA50AART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCDgQFAgFYDA0CxO2i7fsBkjB/4HAh10nCH5UwINcLH94gghD+bw1Guo4wMNMfAYIQ/m8NRrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMTN/4CCCEL9pU9C64wLAAJEw4w1wBgcAusj4QwHMfwHKAFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEoEBAc8AAciBAQHPAMkBzMntVAKeMNMfAYIQv2lT0Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMYIAmt/4QlJgxwXy9H/4J28QggiYloChcogQNG1t2zwwfwgKAbb5ASCC8AQsT5ZQDh7ii6FMXdxClcQFAO84NhlTP/HvNzy+jHyGup4w+EFvJBNfAxKgAX/bMeCC8AlRkBlK7mEc6JXFUDrfhf2GTeeQV0YUL2CNPrL6rRTkuuMCCQAYAAAAAGFkZEZ1bmRzAVAxggCa3/hCUkDHBfL0f/gnbxCCCJiWgKEjWXIQI21tbds8MHABf9sxCgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgLAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAhG5bA2zzbPGxBgODwARuCvu1E0NIAAYAdbtRNDUAfhj0gABjlP6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDUAdCBAQHXADAUQzBsFOD4KNcLCoMJuvLgiRAAAiEBVvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZAtEB2zwRAEyNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARwWA==",
	);
	const __system = Cell.fromBase64(
		"te6cckECFAEAA6cAAQHAAQEFoRqhAgEU/wD0pBP0vPLICwMCAWIEDQN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLggg8FDALE7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEP5vDUa6jjAw0x8BghD+bw1GuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxM3/gIIIQv2lT0LrjAsAAkTDjDXAGCAKeMNMfAYIQv2lT0Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMYIAmt/4QlJgxwXy9H/4J28QggiYloChcogQNG1t2zwwfwcKABgAAAAAYWRkRnVuZHMBtvkBIILwBCxPllAOHuKLoUxd3EKVxAUA7zg2GVM/8e83PL6MfIa6njD4QW8kE18DEqABf9sx4ILwCVGQGUruYRzolcVQOt+F/YZN55BXRhQvYI0+svqtFOS64wIJAVAxggCa3/hCUkDHBfL0f/gnbxCCCJiWgKEjWXIQI21tbds8MHABf9sxCgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgLAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMALrI+EMBzH8BygBVMFBDINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAAHIgQEBzwDJAczJ7VQCAVgOEwIRuWwNs82zxsQYDxIB1u1E0NQB+GPSAAGOU/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANQB0IEBAdcAMBRDMGwU4Pgo1wsKgwm68uCJEAFW+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFkC0QHbPBEATI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHBYAAIhABG4K+7UTQ0gABg8q546",
	);
	const builder = beginCell();
	builder.storeRef(__system);
	builder.storeUint(0, 1);
	initReferralWalletInitArgs({
		$$type: "ReferralWallet_init_args",
		factory,
		seqno,
	})(builder);
	const __data = builder.endCell();
	return { code: __code, data: __data };
}

const referralWalletErrors: { [key: number]: { message: string } } = {
	2: { message: "Stack underflow" },
	3: { message: "Stack overflow" },
	4: { message: "Integer overflow" },
	5: { message: "Integer out of expected range" },
	6: { message: "Invalid opcode" },
	7: { message: "Type check error" },
	8: { message: "Cell overflow" },
	9: { message: "Cell underflow" },
	10: { message: "Dictionary error" },
	11: { message: `'Unknown' error` },
	12: { message: "Fatal error" },
	13: { message: "Out of gas error" },
	14: { message: "Virtualization error" },
	32: { message: "Action list is invalid" },
	33: { message: "Action list is too long" },
	34: { message: "Action is invalid or not supported" },
	35: { message: "Invalid source address in outbound message" },
	36: { message: "Invalid destination address in outbound message" },
	37: { message: "Not enough TON" },
	38: { message: "Not enough extra-currencies" },
	39: { message: "Outbound message does not fit into a cell after rewriting" },
	40: { message: "Cannot process a message" },
	41: { message: "Library reference is null" },
	42: { message: "Library change action error" },
	43: {
		message:
			"Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree",
	},
	50: { message: "Account state size exceeded limits" },
	128: { message: "Null reference exception" },
	129: { message: "Invalid serialization prefix" },
	130: { message: "Invalid incoming message" },
	131: { message: "Constraints error" },
	132: { message: "Access denied" },
	133: { message: "Contract stopped" },
	134: { message: "Invalid argument" },
	135: { message: "Code of a contract was not found" },
	136: { message: "Invalid address" },
	137: { message: "Masterchain support is not enabled for this contract" },
	5555: { message: "Lottery is not active" },
	7825: { message: "Not enough Ton" },
	24518: { message: "Lottery not close" },
	37690: { message: "Lottery is over" },
	39647: { message: "Access is denied" },
	42504: { message: "Already claimed" },
	49030: { message: "Too many tickets" },
	49671: { message: "Lottery not claimable" },
	50970: { message: "No ticket specified" },
	51322: { message: "You are not creator" },
	54634: { message: "You are not owner" },
	55607: { message: "You are not factory" },
};

const referralWalletTypes: ABIType[] = [
	{
		name: "StateInit",
		header: null,
		fields: [
			{ name: "code", type: { kind: "simple", type: "cell", optional: false } },
			{ name: "data", type: { kind: "simple", type: "cell", optional: false } },
		],
	},
	{
		name: "StdAddress",
		header: null,
		fields: [
			{
				name: "workchain",
				type: { kind: "simple", type: "int", optional: false, format: 8 },
			},
			{
				name: "address",
				type: { kind: "simple", type: "uint", optional: false, format: 256 },
			},
		],
	},
	{
		name: "VarAddress",
		header: null,
		fields: [
			{
				name: "workchain",
				type: { kind: "simple", type: "int", optional: false, format: 32 },
			},
			{
				name: "address",
				type: { kind: "simple", type: "slice", optional: false },
			},
		],
	},
	{
		name: "Context",
		header: null,
		fields: [
			{
				name: "bounced",
				type: { kind: "simple", type: "bool", optional: false },
			},
			{
				name: "sender",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "value",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{ name: "raw", type: { kind: "simple", type: "slice", optional: false } },
		],
	},
	{
		name: "SendParameters",
		header: null,
		fields: [
			{
				name: "bounce",
				type: { kind: "simple", type: "bool", optional: false },
			},
			{
				name: "to",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "value",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "mode",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{ name: "body", type: { kind: "simple", type: "cell", optional: true } },
			{ name: "code", type: { kind: "simple", type: "cell", optional: true } },
			{ name: "data", type: { kind: "simple", type: "cell", optional: true } },
		],
	},
	{
		name: "Deploy",
		header: 2490013878,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
		],
	},
	{
		name: "DeployOk",
		header: 2952335191,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
		],
	},
	{
		name: "FactoryDeploy",
		header: 1829761339,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "cashback",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "ChangeOwner",
		header: 2174598809,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "newOwner",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "ChangeOwnerOk",
		header: 846932810,
		fields: [
			{
				name: "queryId",
				type: { kind: "simple", type: "uint", optional: false, format: 64 },
			},
			{
				name: "newOwner",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "Ticket",
		header: null,
		fields: [
			{
				name: "number",
				type: { kind: "simple", type: "uint", optional: false, format: 32 },
			},
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "CreateLottery",
		header: 1817793233,
		fields: [
			{
				name: "creator",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "price",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "endTime",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "discountDivisor",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
		],
	},
	{
		name: "BuyTicket",
		header: 3310573309,
		fields: [
			{
				name: "recipient",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "amount",
				type: { kind: "simple", type: "uint", optional: false, format: 32 },
			},
			{
				name: "ticketNumbers",
				type: {
					kind: "dict",
					key: "uint",
					keyFormat: 32,
					value: "uint",
					valueFormat: 32,
				},
			},
			{
				name: "refWallet",
				type: { kind: "simple", type: "address", optional: true },
			},
		],
	},
	{
		name: "ClaimTickets",
		header: 2609204369,
		fields: [
			{
				name: "ticketIds",
				type: {
					kind: "dict",
					key: "uint",
					keyFormat: 32,
					value: "uint",
					valueFormat: 32,
				},
			},
			{
				name: "ticketLength",
				type: { kind: "simple", type: "uint", optional: false, format: 32 },
			},
		],
	},
	{
		name: "LotteryInfo",
		header: null,
		fields: [
			{
				name: "seqno",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "creator",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "ticketCnt",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "endTime",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "price",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "status",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "amountCollected",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
		],
	},
	{
		name: "Withdraw",
		header: 922360000,
		fields: [
			{
				name: "target",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "Lottery$Data",
		header: null,
		fields: [
			{
				name: "factory",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "creator",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "seqno",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "ticketCnt",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "endTime",
				type: { kind: "simple", type: "uint", optional: false, format: 256 },
			},
			{
				name: "price",
				type: { kind: "simple", type: "uint", optional: false, format: 256 },
			},
			{
				name: "status",
				type: { kind: "simple", type: "uint", optional: false, format: 16 },
			},
			{
				name: "discountDivisor",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "claimed",
				type: { kind: "dict", key: "address", value: "uint", valueFormat: 8 },
			},
			{
				name: "feePercent",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "refPercent",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "rewardPerBracket",
				type: { kind: "dict", key: "int", value: "uint", valueFormat: 256 },
			},
			{
				name: "tickets",
				type: { kind: "dict", key: "int", value: "Ticket", valueFormat: "ref" },
			},
			{
				name: "winnerCntPerBracket",
				type: { kind: "dict", key: "int", value: "uint", valueFormat: 256 },
			},
			{
				name: "amountCollected",
				type: { kind: "simple", type: "uint", optional: false, format: 256 },
			},
			{
				name: "feeAmount",
				type: { kind: "simple", type: "uint", optional: false, format: 256 },
			},
			{
				name: "finalNumber",
				type: { kind: "simple", type: "uint", optional: false, format: 32 },
			},
		],
	},
	{
		name: "CreateWallet",
		header: 4268690758,
		fields: [
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "Move",
		header: 3211350992,
		fields: [
			{
				name: "target",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "ReferralWallet$Data",
		header: null,
		fields: [
			{
				name: "factory",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "amount",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "seqno",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
		],
	},
	{
		name: "Draw",
		header: 746428760,
		fields: [
			{
				name: "lotteryId",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
		],
	},
	{
		name: "EmergencyWithdraw",
		header: 807739057,
		fields: [
			{
				name: "lotteryId",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
		],
	},
	{
		name: "LotteryFactory$Data",
		header: null,
		fields: [
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "lotteryCnt",
				type: { kind: "simple", type: "uint", optional: false, format: 256 },
			},
			{
				name: "referrers",
				type: { kind: "dict", key: "int", value: "address" },
			},
			{
				name: "referrer_cnt",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
			{
				name: "withdraw_end",
				type: { kind: "simple", type: "uint", optional: false, format: 256 },
			},
		],
	},
];

const referralWalletGetters: ABIGetter[] = [
	{
		name: "balance",
		arguments: [],
		returnType: { kind: "simple", type: "int", optional: false, format: 257 },
	},
];

export const ReferralWallet_getterMapping: { [key: string]: string } = {
	balance: "getBalance",
};

const referralWalletReceivers: ABIReceiver[] = [
	{ receiver: "internal", message: { kind: "typed", type: "CreateWallet" } },
	{ receiver: "internal", message: { kind: "text", text: "accept" } },
	{ receiver: "internal", message: { kind: "text", text: "withdraw" } },
	{ receiver: "internal", message: { kind: "typed", type: "Move" } },
];

export class ReferralWallet implements Contract {
	static async init(factory: Address, seqno: bigint) {
		return await referralWalletInit(factory, seqno);
	}

	static async fromInit(factory: Address, seqno: bigint) {
		const init = await referralWalletInit(factory, seqno);
		const address = contractAddress(0, init);
		return new ReferralWallet(address, init);
	}

	static fromAddress(address: Address) {
		return new ReferralWallet(address);
	}

	readonly address: Address;
	readonly init?: { code: Cell; data: Cell };
	readonly abi: ContractABI = {
		types: referralWalletTypes,
		getters: referralWalletGetters,
		receivers: referralWalletReceivers,
		errors: referralWalletErrors,
	};

	private constructor(address: Address, init?: { code: Cell; data: Cell }) {
		this.address = address;
		this.init = init;
	}

	async send(
		provider: ContractProvider,
		via: Sender,
		args: { value: bigint; bounce?: boolean | null | undefined },
		message: CreateWallet | "accept" | "withdraw" | Move,
	) {
		let body: Cell | null = null;
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "CreateWallet"
		) {
			body = beginCell().store(storeCreateWallet(message)).endCell();
		}
		if (message === "accept") {
			body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
		}
		if (message === "withdraw") {
			body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
		}
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "Move"
		) {
			body = beginCell().store(storeMove(message)).endCell();
		}
		if (body === null) {
			throw new Error("Invalid message type");
		}

		await provider.internal(via, { ...args, body: body });
	}

	async getBalance(provider: ContractProvider) {
		const builder = new TupleBuilder();
		const source = (await provider.get("balance", builder.build())).stack;
		const result = source.readBigNumber();
		return result;
	}
}
