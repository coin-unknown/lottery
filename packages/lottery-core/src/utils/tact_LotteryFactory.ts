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

type LotteryFactoryInitArgs = {
	$$type: "LotteryFactory_init_args";
};

function initLotteryFactoryInitArgs(_src: LotteryFactoryInitArgs) {
	return (_builder: Builder) => {};
}

async function lotteryFactoryInit() {
	const __code = Cell.fromBase64(
		"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",
	);
	const __system = Cell.fromBase64(
		"te6cckECeAEAGNEAAQHAAQIBWAISAQW41QgDART/APSkE/S88sgLBAIBYgULA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCDQYKAsTtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQ/m8NRrqOMDDTHwGCEP5vDUa68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEzf+AgghC/aVPQuuMCwACRMOMNcAcIAp4w0x8BghC/aVPQuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxggCa3/hCUmDHBfL0f/gnbxCCCJiWgKFyiBA0bW3bPDB/WlsBtvkBIILwBCxPllAOHuKLoUxd3EKVxAUA7zg2GVM/8e83PL6MfIa6njD4QW8kE18DEqABf9sx4ILwCVGQGUruYRzolcVQOt+F/YZN55BXRhQvYI0+svqtFOS64wIJAVAxggCa3/hCUkDHBfL0f/gnbxCCCJiWgKEjWXIQI21tbds8MHABf9sxWwC6yPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSgQEBzwAByIEBAc8AyQHMye1UAgFYDBECEblsDbPNs8bEGA0QAdbtRNDUAfhj0gABjlP6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDUAdCBAQHXADAUQzBsFOD4KNcLCoMJuvLgiQ4BVvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZAtEB2zwPAEyNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARwWAACIQARuCvu1E0NIAAYAgEgEzwBBbVaEBQBFP8A9KQT9LzyyAsVAgFiFioDetAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUU2zzy4II3FykD9u2i7fsBkjB/4HAh10nCH5UwINcLH94gghBsWVLRuo7JMNMfAYIQbFlS0bry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFNs8f+AgghAsfZlYuuMCIIIQMCUesRgaHgO4EEgQN0ZY2zz4Q/goJds8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIGoIJycOAUJpyDRIgWRkBqshVMIIQbFlS0VAFyx9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AgQEBzwAByIEBAc8AyQHMyV40EDpBkH8GBQRBM9s8MAGkUENbATAw0x8BghAsfZlYuvLggYEBAdcAATHbPH8bBMJVQNs8MPhD+ChBBts8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIggnJw4ByiBA1RDASfwYFBEEzIFkcHQAQAAAAAGRyYXcBHts8MPgjgggEBWCgEDRBMFsDrLqOmDDTHwGCEDAlHrG68uCBgQEB1wABMds8f+AgghCUapi2uo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAJEw4w1wHyIjA6xVQNs8+EP4KEEH2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiCCJiWgHL4QiBZIQAS+EJSUMcF8uCEAXbIAYIQNvoYwFjLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJEDVEMBJ/BgUEQTPbPDBVA1sBPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MFsCtPkBIILwEiGfMFMJx0Sw7ky8EPpxASMcoIPu5QCGreww67uznJW6joYw2zx/2zHggvBpJWnv20wTlowtE0VKMa3/GmMjqmGC5FreGDe5I66NmLqOhds8f9sx4CQmAqYBpPhD+Cgi2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiCCJiWgHL4QjslAaLIAYIQ/m8NRljLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJEDVEMBJ/BgUEQTPbPDCBAQH4QiIQNQEgbpUwWfRaMJRBM/QU4llbBL74Qts8+EP4KFjbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiIIImJaAcogQNUQwEn8GBQRBMzo7JygAGAAAAAB3aXRoZHJhdwEG2zwwWwCAyPhDAcx/AcoAVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhLL//QAEoEBAc8AAcjL/8kBzMntVAIBICsxAgEgLDACASAtLwIVtxW7Z4qgm2eNijA3LgGQ+EP4KFjbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIWQJNtxvEGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eKoJtnjYowNzoCEbhR3bPNs8bFGDdtAgEgMjQCEbkAvbPNs8bFGDczAAIjAgEgNTYAEbRX3aiaGkAAMAJNtCBkGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eKoJtnjYowNzkBoO1E0NQB+GPSAAGONfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//0BIEBAdcA1AHQ0/8wFRRDMGwV4DD4KNcLCoMJuvLgids8OAAUbfhCcFMAEDQQIwKU2zz4Q/goWNs8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ig6OwBU7aLt+3CTUwO7jh2kJIEBASJZ9AxvoZIwbd8gbvLQgFIgxwWTMdsx4OgxAKYC0PQEMG0BggCNUAGAEPQPb6Hy4IcBggCNUCICgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AyQEFtxDQPQEU/wD0pBP0vPLICz4CAWI/YAPC0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ERAREhEQDxERDw4REA4Q31Uc2zzy4ILI+EMBzH8BygAREREQVeDbPMntVHNAXgR47aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEGxZUtG64wIgghDFU1b9uuMCIIIQm4VMkbrjAiCCEDb6GMC6QUJMTwDuMNMfAYIQbFlS0bry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFDQ8PT0/ggDZN/hCVhHHBfL0gggPQkCCCB6EgPhEbpf4JfgVf/hk3iGh+BGgEM8QnH8BzjDTHwGCEMVTVv268uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH/QEINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iFEMwbBTbPH9DAvaCAMcaI8IA8vSCAL+GI8Ef8vSCAJM6+CNWErny9IEVsy/AAPL0ERARFBEQDxETDw4REg4NERENDBEUDAsREwsKERIKCRERCQgRFAgHERMHBhESBgUREQUEERQEAxETAwIREgIBEREBERRWEts8gR6R+EFvJBNfAyK+8vR3RAP+UTOgcJQgVhW5j2iAICBWFVQiM0Ez9A5voZQB1wEwkltt4iBu8tCAERARExEQDxESDw4REQ4NERMNDBESDAsREQsKERMKCRESCQgREQgHERMHBhESBgUREQUEERMEAxESAwEREwERElYS2zxWFoEBAREUAegwVxJXElcSVhJus0VJSgEc7aLt+3AikyHBBoroXwNGA/51IqEREBEUERAPERMPDhESDg0REQ0MERQMCxETCwoREgoJEREJCBEUCAcREwcGERIGBRERBQQRFAQDERMDAhESAgEREQERFFYU2zx6VhakIML/8oVxAZIhqOQxVhMBqQhSEKB6VhekIML/8oVxAZIhqOQxVhYBqQgSoLrjAlcUaEdIALJXEVcRVxGBAQFcVhSDB0Ez9AxvoZQB1wEwkltt4iBu8tCApEEwARETAYMHIW6VW1n0WjCYyAHPAUEz9ELiDBEQDBC/EK4QnRCMEHsQahBZEEgQN0YTQAXbMQBQERGkDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQahBZEEgQN0YFBAC8yFkCyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRAlARETAVLgIG6VMFn0WjCUQTP0FeIMpBESpA8REg8OEREODREQDRC+EK0QnBCLEHoQaRBYEEcQJQKGjyAREiBu8tCAfxETJaiBJxCpBHKIEDQDERUDEDRtbds8MJMwVxHiDBEQDBC/EK4QnRCMEHsQahBZEEgQN0YUUDNFFUtbABQAAAAAYWNjZXB0AuIw0x8BghCbhUyRuvLggfQE0x9ZbBKCAMIHLcAC8vSCAKYIgQEL+EItWXhBM/QKb6GUAdcBMJJbbeJu8vRwIJNTArmK6BNfA/hCf1hyECNtbW3bPDCBAQv4QhAqcXghbpVbWfRZMJjIAc8BQTP0QeIIf01bAfyAIFRUAFIwQTP0Dm+hlAHXATCSW23iIG7y0ICCANVqKoEBASRZ9A1voZIwbd8gbpIwbY4n0NMf+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEm8C4iBu8tCAbyIx+ELHBfL0ERERFRERERARFBEQDxETDw4REg5OAdINERUNDBEUDAsREwsKERIKCREVCQgRFAgHERMHBhESBgURFQUEERQEAxETAwIREgIBERUB2zwBERIBoBEUpBEQERQREA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGUBRlA7SPUDDTHwGCEDb6GMC68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDGCAJrf+EJWEwHHBfL0f/gnbxCCCJiWgKFyiBA0bW3bPDB/4MAAkTDjDXBaW1AC1vkBIILoHLjQ8d2kUbpEkVV8C6l0NMpb4ohd8J9FE/2yI4rzgbqOHDCCAMh6+EJWEQHHBfL0gRWzC8AAG/L0cQp/2zHgIILwngPrD/rziUu6edywfVP6CKSRNuSQcQz3r8uFCfzlMRC64wIgUVcBfjCCAMh6+EJWEgHHBfL0gV/GK8AB8vT4J28QgScQKaGogScQqQRwkyDBBoroECNfAzlyUxaogScQqQRQCn/bMVIC/CWBAQEigwdBM/QMb6GUAdcBMJJbbeIgbvLQgMMAjjgHgQEBKHCDByFulVtZ9FowmMgBzwFBM/RC4gcREgcBEREBBxEQBx8Qfh0QfBsQelCVUHNQCAZEFOMNERKkERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRlNWAowREBESERBePg0REQ0MERIMCxERCwoREgoJEREJCBESCAcREQcGERIGBRERBQQREgQDEREDAhESAgEREQERElYS2zzDAOMAVVQBjlYS2zxWEqgkgQEBVhWDB0Ez9AxvoZQB1wEwkltt4iBu8tCAqQSBJxCpBBaBAQEBVhQBgwchbpVbWfRaMJjIAc8BQTP0QuIFVQBggQDIIcABlDCBASzeIcAClDCBAfTeIcADlDCBA+jeIcAElDCBB9DeAcAFlDCBD6DeAAgQNUQwA/qC8Fzuglg8DcVkNy1Gtc4EI4hwaz7hJO55nOoWdDg6OGdzuo6xMIIAyHr4QlYRAccF8vT4Qn/4QW8kE18DFKGCCJiWgKFBMIBCECNtbW3bPDBwAX/bMeAggvC/hRZKbWFKKmxJKzDcdBHSl1TLum4hFT6VUlYnh8T2M7rjAltYXQPeMIIAyHr4QlYRAccF8vT4Qy+kVhIB2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiH/4J28QggiYloChcogQNG1t2zwwf9sxWVpbAKYC0PQEMG0BggD4hgGAEPQPb6Hy4IcBggD4hiICgBD0F8gByPQAyQHMcAHKAEADWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AyQAYAAAAAGFkZEZ1bmRzAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7CFwAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAZILwwmGmaPn+gbuiLEgKV8t8f6Denqi/AWQbwgUe4/dRnp+6nfhBbyQTXwMToAJ/2zHgAfQBEREBERAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQDiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhyBAQHPAArIgQEBzwAZy/8Xy/8Vyw8DyIEBAc8AEvQAgQEBzwASgQEBzwAS9AAS9AADyPQAFF8AIsv/Fcv/E8sfyVjMyQHMyQHMAgEgYWoCASBiZAIVuWCts82zxs52w3hzYwAOVH79VH/tKAIvueSts8ERAREREQDxEQD1UO2zxXEF8PMYc2UBqu2i7fshgQEBVEcTWfQNb6GSMG3fIG6SMG2OJ9DTH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJvAuIgbvLQgG8iMHWTIML/iuhfA3BmAvgREBETERAPERIPDhERDg0REw0MERIMCxERCwoREwoJERIJCBERCAcREwcGERIGBRERBQQREwQDERIDAhERAgEREwERElYS2zx6VhSkIML/8oVxAZIhqOQxVhMBqQigERAREREQDxERDw4REQ4NERENDBERDAsREQsKEREKaGcC8gkREQkREQgHBlVAVhPbPHpWFaQgwv/yhXEBkiGo5DFWFgGpCKABERIBuo4eIoEBAVYUgwdBM/QMb6GUAdcBMJJbbeIgbvLQgMMAkXDi4wIREqUPERMPDhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlBBQBNoaQBacSHAAZMwgAveIcACkzCAb94hwAOUMIEEV94hwASUMIErZ94BwAWVMIIBsgfeAIJXEVcSgQEBIwIREoMHQTP0DG+hlAHXATCSW23iIG7y0IANERENDBEQDBC/EK4QnRCMEHsQahBZEEgQN0ZQQzDbMQIBIGtwAgEgbG4CF7R+W2ebZ4riC+HmMHNtAAIkAhe05ttnm2eK4gvh5jBzbwAOKsMCkXDgIAIBSHFyABGwr7tRNDSAAGACL7JGNs8ERAREREQDxEQD1UO2zxXEF8PMYHN3AprtRNDUAfhj0gABjorbPFcRDxEQD1UO4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFkC0QHbPHR2Afb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDUAdCBAQHXANP/0//TD9Qw0IEBAdcA9ASBAQHXAIEBAdcA9AT0BNQw0PQE0//T/9MfMA4REQ51AAwOERAOEO8Auo0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHBUcAAgbYEAyIEHCG1tbVR2ZiCTIMEGjhwEgQEBJXCDByFulVtZ9FowmMgBzwFBM/RC4gSk6DAQ7wAWU8CoK6RYoagqqQRMWvBe",
	);
	const builder = beginCell();
	builder.storeRef(__system);
	builder.storeUint(0, 1);
	initLotteryFactoryInitArgs({ $$type: "LotteryFactory_init_args" })(builder);
	const __data = builder.endCell();
	return { code: __code, data: __data };
}

const lotteryFactoryErrors: { [key: number]: { message: string } } = {
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

const lotteryFactoryTypes: ABIType[] = [
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

const lotteryFactoryGetters: ABIGetter[] = [
	{
		name: "lotteryCnt",
		arguments: [],
		returnType: { kind: "simple", type: "int", optional: false, format: 257 },
	},
	{
		name: "lotteryAddress",
		arguments: [
			{
				name: "seqno",
				type: { kind: "simple", type: "int", optional: false, format: 257 },
			},
		],
		returnType: { kind: "simple", type: "address", optional: false },
	},
	{
		name: "referrerWalletAddress",
		arguments: [
			{
				name: "user",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
		returnType: { kind: "simple", type: "address", optional: false },
	},
	{
		name: "reffererNumber",
		arguments: [
			{
				name: "user",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
		returnType: { kind: "simple", type: "int", optional: false, format: 257 },
	},
	{
		name: "owner",
		arguments: [],
		returnType: { kind: "simple", type: "address", optional: false },
	},
];

export const LotteryFactory_getterMapping: { [key: string]: string } = {
	lotteryCnt: "getLotteryCnt",
	lotteryAddress: "getLotteryAddress",
	referrerWalletAddress: "getReferrerWalletAddress",
	reffererNumber: "getReffererNumber",
	owner: "getOwner",
};

const lotteryFactoryReceivers: ABIReceiver[] = [
	{ receiver: "internal", message: { kind: "typed", type: "CreateLottery" } },
	{ receiver: "internal", message: { kind: "typed", type: "Draw" } },
	{ receiver: "internal", message: { kind: "text", text: "createRefWallet" } },
	{ receiver: "internal", message: { kind: "text", text: "withdraw_ref" } },
	{
		receiver: "internal",
		message: { kind: "typed", type: "EmergencyWithdraw" },
	},
	{ receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class LotteryFactory implements Contract {
	static async init() {
		return await lotteryFactoryInit();
	}

	static async fromInit() {
		const init = await lotteryFactoryInit();
		const address = contractAddress(0, init);
		return new LotteryFactory(address, init);
	}

	static fromAddress(address: Address) {
		return new LotteryFactory(address);
	}

	readonly address: Address;
	readonly init?: { code: Cell; data: Cell };
	readonly abi: ContractABI = {
		types: lotteryFactoryTypes,
		getters: lotteryFactoryGetters,
		receivers: lotteryFactoryReceivers,
		errors: lotteryFactoryErrors,
	};

	private constructor(address: Address, init?: { code: Cell; data: Cell }) {
		this.address = address;
		this.init = init;
	}

	async send(
		provider: ContractProvider,
		via: Sender,
		args: { value: bigint; bounce?: boolean | null | undefined },
		message:
			| CreateLottery
			| Draw
			| "createRefWallet"
			| "withdraw_ref"
			| EmergencyWithdraw
			| Deploy,
	) {
		let body: Cell | null = null;
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "CreateLottery"
		) {
			body = beginCell().store(storeCreateLottery(message)).endCell();
		}
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "Draw"
		) {
			body = beginCell().store(storeDraw(message)).endCell();
		}
		if (message === "createRefWallet") {
			body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
		}
		if (message === "withdraw_ref") {
			body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
		}
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "EmergencyWithdraw"
		) {
			body = beginCell().store(storeEmergencyWithdraw(message)).endCell();
		}
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "Deploy"
		) {
			body = beginCell().store(storeDeploy(message)).endCell();
		}
		if (body === null) {
			throw new Error("Invalid message type");
		}

		await provider.internal(via, { ...args, body: body });
	}

	async getLotteryCnt(provider: ContractProvider) {
		const builder = new TupleBuilder();
		const source = (await provider.get("lotteryCnt", builder.build())).stack;
		const result = source.readBigNumber();
		return result;
	}

	async getLotteryAddress(provider: ContractProvider, seqno: bigint) {
		const builder = new TupleBuilder();
		builder.writeNumber(seqno);
		const source = (await provider.get("lotteryAddress", builder.build()))
			.stack;
		const result = source.readAddress();
		return result;
	}

	async getReferrerWalletAddress(provider: ContractProvider, user: Address) {
		const builder = new TupleBuilder();
		builder.writeAddress(user);
		const source = (
			await provider.get("referrerWalletAddress", builder.build())
		).stack;
		const result = source.readAddress();
		return result;
	}

	async getReffererNumber(provider: ContractProvider, user: Address) {
		const builder = new TupleBuilder();
		builder.writeAddress(user);
		const source = (await provider.get("reffererNumber", builder.build()))
			.stack;
		const result = source.readBigNumber();
		return result;
	}

	async getOwner(provider: ContractProvider) {
		const builder = new TupleBuilder();
		const source = (await provider.get("owner", builder.build())).stack;
		const result = source.readAddress();
		return result;
	}
}
