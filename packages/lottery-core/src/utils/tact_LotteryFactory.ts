import {
	Cell,
	Slice,
	Address,
	Builder,
	beginCell,
	Dictionary,
	contractAddress,
	ContractProvider,
	Sender,
	Contract,
	ContractABI,
	ABIType,
	ABIGetter,
	ABIReceiver,
	TupleBuilder,
	DictionaryValue,
} from "@ton/core";

export type StateInit = {
	$$type: "StateInit";
	code: Cell;
	data: Cell;
};

export function storeStateInit(src: StateInit) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeRef(src.code);
		b_0.storeRef(src.data);
	};
}

export function loadStateInit(slice: Slice) {
	let sc_0 = slice;
	let _code = sc_0.loadRef();
	let _data = sc_0.loadRef();
	return { $$type: "StateInit" as const, code: _code, data: _data };
}

export type StdAddress = {
	$$type: "StdAddress";
	workchain: bigint;
	address: bigint;
};

export function storeStdAddress(src: StdAddress) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeInt(src.workchain, 8);
		b_0.storeUint(src.address, 256);
	};
}

export function loadStdAddress(slice: Slice) {
	let sc_0 = slice;
	let _workchain = sc_0.loadIntBig(8);
	let _address = sc_0.loadUintBig(256);
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
		let b_0 = builder;
		b_0.storeInt(src.workchain, 32);
		b_0.storeRef(src.address.asCell());
	};
}

export function loadVarAddress(slice: Slice) {
	let sc_0 = slice;
	let _workchain = sc_0.loadIntBig(32);
	let _address = sc_0.loadRef().asSlice();
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
		let b_0 = builder;
		b_0.storeBit(src.bounced);
		b_0.storeAddress(src.sender);
		b_0.storeInt(src.value, 257);
		b_0.storeRef(src.raw.asCell());
	};
}

export function loadContext(slice: Slice) {
	let sc_0 = slice;
	let _bounced = sc_0.loadBit();
	let _sender = sc_0.loadAddress();
	let _value = sc_0.loadIntBig(257);
	let _raw = sc_0.loadRef().asSlice();
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
		let b_0 = builder;
		b_0.storeBit(src.bounce);
		b_0.storeAddress(src.to);
		b_0.storeInt(src.value, 257);
		b_0.storeInt(src.mode, 257);
		if (src.body !== null && src.body !== undefined) {
			b_0.storeBit(true).storeRef(src.body);
		} else {
			b_0.storeBit(false);
		}
		if (src.code !== null && src.code !== undefined) {
			b_0.storeBit(true).storeRef(src.code);
		} else {
			b_0.storeBit(false);
		}
		if (src.data !== null && src.data !== undefined) {
			b_0.storeBit(true).storeRef(src.data);
		} else {
			b_0.storeBit(false);
		}
	};
}

export function loadSendParameters(slice: Slice) {
	let sc_0 = slice;
	let _bounce = sc_0.loadBit();
	let _to = sc_0.loadAddress();
	let _value = sc_0.loadIntBig(257);
	let _mode = sc_0.loadIntBig(257);
	let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
	let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
	let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
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
		let b_0 = builder;
		b_0.storeUint(2490013878, 32);
		b_0.storeUint(src.queryId, 64);
	};
}

export function loadDeploy(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 2490013878) {
		throw Error("Invalid prefix");
	}
	let _queryId = sc_0.loadUintBig(64);
	return { $$type: "Deploy" as const, queryId: _queryId };
}

export type DeployOk = {
	$$type: "DeployOk";
	queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(2952335191, 32);
		b_0.storeUint(src.queryId, 64);
	};
}

export function loadDeployOk(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 2952335191) {
		throw Error("Invalid prefix");
	}
	let _queryId = sc_0.loadUintBig(64);
	return { $$type: "DeployOk" as const, queryId: _queryId };
}

export type FactoryDeploy = {
	$$type: "FactoryDeploy";
	queryId: bigint;
	cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(1829761339, 32);
		b_0.storeUint(src.queryId, 64);
		b_0.storeAddress(src.cashback);
	};
}

export function loadFactoryDeploy(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 1829761339) {
		throw Error("Invalid prefix");
	}
	let _queryId = sc_0.loadUintBig(64);
	let _cashback = sc_0.loadAddress();
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
		let b_0 = builder;
		b_0.storeUint(2174598809, 32);
		b_0.storeUint(src.queryId, 64);
		b_0.storeAddress(src.newOwner);
	};
}

export function loadChangeOwner(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 2174598809) {
		throw Error("Invalid prefix");
	}
	let _queryId = sc_0.loadUintBig(64);
	let _newOwner = sc_0.loadAddress();
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
		let b_0 = builder;
		b_0.storeUint(846932810, 32);
		b_0.storeUint(src.queryId, 64);
		b_0.storeAddress(src.newOwner);
	};
}

export function loadChangeOwnerOk(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 846932810) {
		throw Error("Invalid prefix");
	}
	let _queryId = sc_0.loadUintBig(64);
	let _newOwner = sc_0.loadAddress();
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
		let b_0 = builder;
		b_0.storeUint(src.number, 32);
		b_0.storeAddress(src.owner);
	};
}

export function loadTicket(slice: Slice) {
	let sc_0 = slice;
	let _number = sc_0.loadUintBig(32);
	let _owner = sc_0.loadAddress();
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
	operator: Address | null;
	price: bigint;
	endTime: bigint;
	discountDivisor: bigint;
};

export function storeCreateLottery(src: CreateLottery) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(231917926, 32);
		b_0.storeAddress(src.creator);
		b_0.storeAddress(src.operator);
		b_0.storeInt(src.price, 257);
		let b_1 = new Builder();
		b_1.storeInt(src.endTime, 257);
		b_1.storeInt(src.discountDivisor, 257);
		b_0.storeRef(b_1.endCell());
	};
}

export function loadCreateLottery(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 231917926) {
		throw Error("Invalid prefix");
	}
	let _creator = sc_0.loadAddress();
	let _operator = sc_0.loadMaybeAddress();
	let _price = sc_0.loadIntBig(257);
	let sc_1 = sc_0.loadRef().beginParse();
	let _endTime = sc_1.loadIntBig(257);
	let _discountDivisor = sc_1.loadIntBig(257);
	return {
		$$type: "CreateLottery" as const,
		creator: _creator,
		operator: _operator,
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
		let b_0 = builder;
		b_0.storeUint(3310573309, 32);
		b_0.storeAddress(src.recipient);
		b_0.storeUint(src.amount, 32);
		b_0.storeDict(
			src.ticketNumbers,
			Dictionary.Keys.Uint(32),
			Dictionary.Values.Uint(32)
		);
		b_0.storeAddress(src.refWallet);
	};
}

export function loadBuyTicket(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 3310573309) {
		throw Error("Invalid prefix");
	}
	let _recipient = sc_0.loadAddress();
	let _amount = sc_0.loadUintBig(32);
	let _ticketNumbers = Dictionary.load(
		Dictionary.Keys.Uint(32),
		Dictionary.Values.Uint(32),
		sc_0
	);
	let _refWallet = sc_0.loadMaybeAddress();
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
		let b_0 = builder;
		b_0.storeUint(2609204369, 32);
		b_0.storeDict(
			src.ticketIds,
			Dictionary.Keys.Uint(32),
			Dictionary.Values.Uint(32)
		);
		b_0.storeUint(src.ticketLength, 32);
	};
}

export function loadClaimTickets(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 2609204369) {
		throw Error("Invalid prefix");
	}
	let _ticketIds = Dictionary.load(
		Dictionary.Keys.Uint(32),
		Dictionary.Values.Uint(32),
		sc_0
	);
	let _ticketLength = sc_0.loadUintBig(32);
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
		let b_0 = builder;
		b_0.storeInt(src.seqno, 257);
		b_0.storeAddress(src.creator);
		b_0.storeInt(src.ticketCnt, 257);
		let b_1 = new Builder();
		b_1.storeInt(src.endTime, 257);
		b_1.storeInt(src.price, 257);
		b_1.storeInt(src.status, 257);
		let b_2 = new Builder();
		b_2.storeInt(src.amountCollected, 257);
		b_1.storeRef(b_2.endCell());
		b_0.storeRef(b_1.endCell());
	};
}

export function loadLotteryInfo(slice: Slice) {
	let sc_0 = slice;
	let _seqno = sc_0.loadIntBig(257);
	let _creator = sc_0.loadAddress();
	let _ticketCnt = sc_0.loadIntBig(257);
	let sc_1 = sc_0.loadRef().beginParse();
	let _endTime = sc_1.loadIntBig(257);
	let _price = sc_1.loadIntBig(257);
	let _status = sc_1.loadIntBig(257);
	let sc_2 = sc_1.loadRef().beginParse();
	let _amountCollected = sc_2.loadIntBig(257);
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
		let b_0 = builder;
		b_0.storeUint(922360000, 32);
		b_0.storeAddress(src.target);
	};
}

export function loadWithdraw(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 922360000) {
		throw Error("Invalid prefix");
	}
	let _target = sc_0.loadAddress();
	return { $$type: "Withdraw" as const, target: _target };
}

export type Lottery$Data = {
	$$type: "Lottery$Data";
	factory: Address;
	creator: Address;
	operator: Address;
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
		let b_0 = builder;
		b_0.storeAddress(src.factory);
		b_0.storeAddress(src.creator);
		b_0.storeAddress(src.operator);
		let b_1 = new Builder();
		b_1.storeInt(src.seqno, 257);
		b_1.storeInt(src.ticketCnt, 257);
		b_1.storeUint(src.endTime, 256);
		let b_2 = new Builder();
		b_2.storeUint(src.price, 256);
		b_2.storeUint(src.status, 16);
		b_2.storeInt(src.discountDivisor, 257);
		b_2.storeDict(
			src.claimed,
			Dictionary.Keys.Address(),
			Dictionary.Values.Uint(8)
		);
		b_2.storeInt(src.feePercent, 257);
		let b_3 = new Builder();
		b_3.storeInt(src.refPercent, 257);
		b_3.storeDict(
			src.rewardPerBracket,
			Dictionary.Keys.BigInt(257),
			Dictionary.Values.BigUint(256)
		);
		b_3.storeDict(
			src.tickets,
			Dictionary.Keys.BigInt(257),
			dictValueParserTicket()
		);
		b_3.storeDict(
			src.winnerCntPerBracket,
			Dictionary.Keys.BigInt(257),
			Dictionary.Values.BigUint(256)
		);
		b_3.storeUint(src.amountCollected, 256);
		b_3.storeUint(src.feeAmount, 256);
		b_3.storeUint(src.finalNumber, 32);
		b_2.storeRef(b_3.endCell());
		b_1.storeRef(b_2.endCell());
		b_0.storeRef(b_1.endCell());
	};
}

export function loadLottery$Data(slice: Slice) {
	let sc_0 = slice;
	let _factory = sc_0.loadAddress();
	let _creator = sc_0.loadAddress();
	let _operator = sc_0.loadAddress();
	let sc_1 = sc_0.loadRef().beginParse();
	let _seqno = sc_1.loadIntBig(257);
	let _ticketCnt = sc_1.loadIntBig(257);
	let _endTime = sc_1.loadUintBig(256);
	let sc_2 = sc_1.loadRef().beginParse();
	let _price = sc_2.loadUintBig(256);
	let _status = sc_2.loadUintBig(16);
	let _discountDivisor = sc_2.loadIntBig(257);
	let _claimed = Dictionary.load(
		Dictionary.Keys.Address(),
		Dictionary.Values.Uint(8),
		sc_2
	);
	let _feePercent = sc_2.loadIntBig(257);
	let sc_3 = sc_2.loadRef().beginParse();
	let _refPercent = sc_3.loadIntBig(257);
	let _rewardPerBracket = Dictionary.load(
		Dictionary.Keys.BigInt(257),
		Dictionary.Values.BigUint(256),
		sc_3
	);
	let _tickets = Dictionary.load(
		Dictionary.Keys.BigInt(257),
		dictValueParserTicket(),
		sc_3
	);
	let _winnerCntPerBracket = Dictionary.load(
		Dictionary.Keys.BigInt(257),
		Dictionary.Values.BigUint(256),
		sc_3
	);
	let _amountCollected = sc_3.loadUintBig(256);
	let _feeAmount = sc_3.loadUintBig(256);
	let _finalNumber = sc_3.loadUintBig(32);
	return {
		$$type: "Lottery$Data" as const,
		factory: _factory,
		creator: _creator,
		operator: _operator,
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
		let b_0 = builder;
		b_0.storeUint(4268690758, 32);
		b_0.storeAddress(src.owner);
	};
}

export function loadCreateWallet(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 4268690758) {
		throw Error("Invalid prefix");
	}
	let _owner = sc_0.loadAddress();
	return { $$type: "CreateWallet" as const, owner: _owner };
}

export type Move = {
	$$type: "Move";
	target: Address;
};

export function storeMove(src: Move) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(3211350992, 32);
		b_0.storeAddress(src.target);
	};
}

export function loadMove(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 3211350992) {
		throw Error("Invalid prefix");
	}
	let _target = sc_0.loadAddress();
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
		let b_0 = builder;
		b_0.storeAddress(src.factory);
		b_0.storeAddress(src.owner);
		b_0.storeInt(src.amount, 257);
		let b_1 = new Builder();
		b_1.storeInt(src.seqno, 257);
		b_0.storeRef(b_1.endCell());
	};
}

export function loadReferralWallet$Data(slice: Slice) {
	let sc_0 = slice;
	let _factory = sc_0.loadAddress();
	let _owner = sc_0.loadAddress();
	let _amount = sc_0.loadIntBig(257);
	let sc_1 = sc_0.loadRef().beginParse();
	let _seqno = sc_1.loadIntBig(257);
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
		let b_0 = builder;
		b_0.storeUint(746428760, 32);
		b_0.storeInt(src.lotteryId, 257);
	};
}

export function loadDraw(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 746428760) {
		throw Error("Invalid prefix");
	}
	let _lotteryId = sc_0.loadIntBig(257);
	return { $$type: "Draw" as const, lotteryId: _lotteryId };
}

export type EmergencyWithdraw = {
	$$type: "EmergencyWithdraw";
	lotteryId: bigint;
};

export function storeEmergencyWithdraw(src: EmergencyWithdraw) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(807739057, 32);
		b_0.storeInt(src.lotteryId, 257);
	};
}

export function loadEmergencyWithdraw(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 807739057) {
		throw Error("Invalid prefix");
	}
	let _lotteryId = sc_0.loadIntBig(257);
	return { $$type: "EmergencyWithdraw" as const, lotteryId: _lotteryId };
}

export type SetOperator = {
	$$type: "SetOperator";
	operator: Address;
};

export function storeSetOperator(src: SetOperator) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(1568312693, 32);
		b_0.storeAddress(src.operator);
	};
}

export function loadSetOperator(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 1568312693) {
		throw Error("Invalid prefix");
	}
	let _operator = sc_0.loadAddress();
	return { $$type: "SetOperator" as const, operator: _operator };
}

export type Create = {
	$$type: "Create";
	price: bigint;
	endTime: bigint;
	discountDivisor: bigint;
};

export function storeCreate(src: Create) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeUint(506403218, 32);
		b_0.storeInt(src.price, 257);
		b_0.storeInt(src.endTime, 257);
		b_0.storeInt(src.discountDivisor, 257);
	};
}

export function loadCreate(slice: Slice) {
	let sc_0 = slice;
	if (sc_0.loadUint(32) !== 506403218) {
		throw Error("Invalid prefix");
	}
	let _price = sc_0.loadIntBig(257);
	let _endTime = sc_0.loadIntBig(257);
	let _discountDivisor = sc_0.loadIntBig(257);
	return {
		$$type: "Create" as const,
		price: _price,
		endTime: _endTime,
		discountDivisor: _discountDivisor,
	};
}

export type LotteryFactory$Data = {
	$$type: "LotteryFactory$Data";
	owner: Address;
	operator: Address;
	lotteryCnt: bigint;
	referrers: Dictionary<bigint, Address>;
	referrer_cnt: bigint;
	withdraw_end: bigint;
};

export function storeLotteryFactory$Data(src: LotteryFactory$Data) {
	return (builder: Builder) => {
		let b_0 = builder;
		b_0.storeAddress(src.owner);
		b_0.storeAddress(src.operator);
		b_0.storeUint(src.lotteryCnt, 256);
		b_0.storeDict(
			src.referrers,
			Dictionary.Keys.BigInt(257),
			Dictionary.Values.Address()
		);
		let b_1 = new Builder();
		b_1.storeInt(src.referrer_cnt, 257);
		b_1.storeUint(src.withdraw_end, 256);
		b_0.storeRef(b_1.endCell());
	};
}

export function loadLotteryFactory$Data(slice: Slice) {
	let sc_0 = slice;
	let _owner = sc_0.loadAddress();
	let _operator = sc_0.loadAddress();
	let _lotteryCnt = sc_0.loadUintBig(256);
	let _referrers = Dictionary.load(
		Dictionary.Keys.BigInt(257),
		Dictionary.Values.Address(),
		sc_0
	);
	let sc_1 = sc_0.loadRef().beginParse();
	let _referrer_cnt = sc_1.loadIntBig(257);
	let _withdraw_end = sc_1.loadUintBig(256);
	return {
		$$type: "LotteryFactory$Data" as const,
		owner: _owner,
		operator: _operator,
		lotteryCnt: _lotteryCnt,
		referrers: _referrers,
		referrer_cnt: _referrer_cnt,
		withdraw_end: _withdraw_end,
	};
}

type LotteryFactory_init_args = {
	$$type: "LotteryFactory_init_args";
};

function initLotteryFactory_init_args(src: LotteryFactory_init_args) {
	return (builder: Builder) => {};
}

async function LotteryFactory_init() {
	const __code = Cell.fromBase64(
		"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"
	);
	const __system = Cell.fromBase64(
		"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AI1QAYAQ9A9vofLghwGCAI1QIgKAEPQXyAHI9ADJAcxwAcoAQANZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJAQW3ENA/ART/APSkE/S88sgLQAIBYkFjA87QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwRERETEREREBESERAPEREPDhEQDlUd2zzy4ILI+EMBzH8BygAREhERERBV4Ns8ye1UekJhBHjtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQDdLJZrrjAiCCEMVTVv264wIgghCbhUyRuuMCIIIQNvoYwLpDRU9SAe4w0x8BghAN0slmuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAYEBAdcA1AHQgQEB1wCBAQHXADAQJRAkECNsFUQAejU9Pj5XEFcQggDZN/hCVhLHBfL0CyBu8tCAgggPQkCCCB6EgPhEbpf4JfgVf/hk3iGh+BGgDxEQDx8ZHH8BzjDTHwGCEMVTVv268uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH/QEINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iFEMwbBTbPH9GAvSCAMcaI8IA8vSCAL+GI8Ef8vSCAJM6+CNWErny9IEVsy/AAPL0ERERFRERERARFBEQDxETDw4REg4NERUNDBEUDAsREwsKERIKCREVCQgRFAgHERMHBhESBgURFQUEERQEAxETAwIREgIBERUBERRWEts8gR6R+EFvJH9HA8QTXwMivvL0UTOgcJQgVhW5iugwVxNXE1cUVhJus48gERIgbvLQgH8REyWogScQqQRyiBA0AxEVAxA0bW3bPDCTMFcR4g0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RhRQU0hOXwLcgCAgVhlUIjNBM/QOb6GUAdcBMJJbbeIgbvLQgBERERQREREQERMREA8REg8OERQODRETDQwREgwLERQLChETCgkREgkIERQIBxETBwYREgYFERQFBBETBAMREgMBERMBERJWEts8VhaB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uvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJABgAAAAAYWRkRnVuZHMByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsIYACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAH2ARESARERINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUA8g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQDSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgvIgQEBzwAagQEBzwAYy/8GyMv/FcsPYgBeE4EBAc8A9ACBAQHPAAHIgQEBzwAT9AAT9AAU9AAUy/8Vy/8Tyx/JWMzJAczJAcwCASBkbgIBIGVnAhW5YK2zzbPGznbEeHpmABAuVhFUf+1T9wI9ueSts8EREREhERERAREREQDxEQD1UO2zxXEF8PbCGHpoAartou37IYEBAVRHE1n0DW+hkjBt3yBukjBtjifQ0x/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSbwLiIG7y0IBvIjB1kyDC/4roXwNwaQL4ERERFBERERARExEQDxESDw4RFA4NERMNDBESDAsRFAsKERMKCRESCQgRFAgHERMHBhESBgURFAUEERMEAxESAwIRFAIBERMBERJWEts8elYUpCDC//KFcQGSIajkMVYWAakIoBERERIREREQERIREA8REg8OERIODRESDWtqA/wMERIMCxESCwoREgoJERIJERIIBwZVQFYT2zx6VhWkIML/8oVxAZIhqOQxVhYBqQigARETAbqOHiKBAQFWFIMHQTP0DG+hlAHXATCSW23iIG7y0IDDAJFw4uMCERKlERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHtrbG0AWnEhwAGTMIAL3iHAApMwgG/eIcADlDCBBFfeIcAElDCBK2feAcAFlTCCAbIH3gCKVxNXE4EBASMCERKDB0Ez9AxvoZQB1wEwkltt4iBu8tCADhESDg0REQ0MERAMEL8QrhCdEIwQexBqEFkQSBA3RlBBMNsxABgQahBZEEgQN0ZQRDACASBvdwIBIHB1AgEgcXMCGbD8ts82zxXEF8PbCGB6cgACJAJ1si6INdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8EREREhERERAREREQDxEQD1UO2zxXEF8PbCGB6dAA0gQELKgJ4QTP0Cm+hlAHXATCSW23ibpF/4HACGbTm22ebZ4riC+HthDB6dgAOKsMCkXDgIAIBSHh5ABGwr7tRNDSAAGACPbJGNs8EREREhERERAREREQDxEQD1UO2zxXEF8PbCGB6fwKm7UTQ1AH4Y9IAAY6Q2zxXEhEQEREREA8REA9VDuD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZAtEB2zx7fQH2+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQgQEB1wCBAQHXANP/1DDQ0//TD4EBAdcAfABQ9ASBAQHXANQw0IEBAdcA9AT0BPQE0//T/9MfMA8REg8PEREPDxEQDwHQjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEcFRwACBtgQDIgQcIbW1tVHZmIJMgwQaK6DAPERAPEO9+ADgEgQEBJXCDByFulVtZ9FowmMgBzwFBM/RC4gSkABZTwKgrpFihqCqpBJ/W59o="
	);
	let builder = beginCell();
	builder.storeRef(__system);
	builder.storeUint(0, 1);
	initLotteryFactory_init_args({ $$type: "LotteryFactory_init_args" })(builder);
	const __data = builder.endCell();
	return { code: __code, data: __data };
}

const LotteryFactory_errors: { [key: number]: { message: string } } = {
	2: { message: `Stack underflow` },
	3: { message: `Stack overflow` },
	4: { message: `Integer overflow` },
	5: { message: `Integer out of expected range` },
	6: { message: `Invalid opcode` },
	7: { message: `Type check error` },
	8: { message: `Cell overflow` },
	9: { message: `Cell underflow` },
	10: { message: `Dictionary error` },
	11: { message: `'Unknown' error` },
	12: { message: `Fatal error` },
	13: { message: `Out of gas error` },
	14: { message: `Virtualization error` },
	32: { message: `Action list is invalid` },
	33: { message: `Action list is too long` },
	34: { message: `Action is invalid or not supported` },
	35: { message: `Invalid source address in outbound message` },
	36: { message: `Invalid destination address in outbound message` },
	37: { message: `Not enough TON` },
	38: { message: `Not enough extra-currencies` },
	39: { message: `Outbound message does not fit into a cell after rewriting` },
	40: { message: `Cannot process a message` },
	41: { message: `Library reference is null` },
	42: { message: `Library change action error` },
	43: {
		message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree`,
	},
	50: { message: `Account state size exceeded limits` },
	128: { message: `Null reference exception` },
	129: { message: `Invalid serialization prefix` },
	130: { message: `Invalid incoming message` },
	131: { message: `Constraints error` },
	132: { message: `Access denied` },
	133: { message: `Contract stopped` },
	134: { message: `Invalid argument` },
	135: { message: `Code of a contract was not found` },
	136: { message: `Invalid address` },
	137: { message: `Masterchain support is not enabled for this contract` },
	5555: { message: `Lottery is not active` },
	6767: { message: `Sufficient balance` },
	7825: { message: `Not enough Ton` },
	24518: { message: `Lottery not close` },
	37690: { message: `Lottery is over` },
	39647: { message: `Access is denied` },
	42504: { message: `Already claimed` },
	49030: { message: `Too many tickets` },
	49671: { message: `Lottery not claimable` },
	50970: { message: `No ticket specified` },
	54634: { message: `You are not owner` },
	55607: { message: `You are not factory` },
};

const LotteryFactory_types: ABIType[] = [
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
		header: 231917926,
		fields: [
			{
				name: "creator",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "operator",
				type: { kind: "simple", type: "address", optional: true },
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
				name: "operator",
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
		name: "SetOperator",
		header: 1568312693,
		fields: [
			{
				name: "operator",
				type: { kind: "simple", type: "address", optional: false },
			},
		],
	},
	{
		name: "Create",
		header: 506403218,
		fields: [
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
		name: "LotteryFactory$Data",
		header: null,
		fields: [
			{
				name: "owner",
				type: { kind: "simple", type: "address", optional: false },
			},
			{
				name: "operator",
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

const LotteryFactory_getters: ABIGetter[] = [
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

const LotteryFactory_receivers: ABIReceiver[] = [
	{ receiver: "internal", message: { kind: "typed", type: "SetOperator" } },
	{ receiver: "internal", message: { kind: "typed", type: "Create" } },
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
		return await LotteryFactory_init();
	}

	static async fromInit() {
		const init = await LotteryFactory_init();
		const address = contractAddress(0, init);
		return new LotteryFactory(address, init);
	}

	static fromAddress(address: Address) {
		return new LotteryFactory(address);
	}

	readonly address: Address;
	readonly init?: { code: Cell; data: Cell };
	readonly abi: ContractABI = {
		types: LotteryFactory_types,
		getters: LotteryFactory_getters,
		receivers: LotteryFactory_receivers,
		errors: LotteryFactory_errors,
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
			| SetOperator
			| Create
			| Draw
			| "createRefWallet"
			| "withdraw_ref"
			| EmergencyWithdraw
			| Deploy
	) {
		let body: Cell | null = null;
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "SetOperator"
		) {
			body = beginCell().store(storeSetOperator(message)).endCell();
		}
		if (
			message &&
			typeof message === "object" &&
			!(message instanceof Slice) &&
			message.$$type === "Create"
		) {
			body = beginCell().store(storeCreate(message)).endCell();
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
		let builder = new TupleBuilder();
		let source = (await provider.get("lotteryCnt", builder.build())).stack;
		let result = source.readBigNumber();
		return result;
	}

	async getLotteryAddress(provider: ContractProvider, seqno: bigint) {
		let builder = new TupleBuilder();
		builder.writeNumber(seqno);
		let source = (await provider.get("lotteryAddress", builder.build())).stack;
		let result = source.readAddress();
		return result;
	}

	async getReferrerWalletAddress(provider: ContractProvider, user: Address) {
		let builder = new TupleBuilder();
		builder.writeAddress(user);
		let source = (await provider.get("referrerWalletAddress", builder.build()))
			.stack;
		let result = source.readAddress();
		return result;
	}

	async getReffererNumber(provider: ContractProvider, user: Address) {
		let builder = new TupleBuilder();
		builder.writeAddress(user);
		let source = (await provider.get("reffererNumber", builder.build())).stack;
		let result = source.readBigNumber();
		return result;
	}

	async getOwner(provider: ContractProvider) {
		let builder = new TupleBuilder();
		let source = (await provider.get("owner", builder.build())).stack;
		let result = source.readAddress();
		return result;
	}
}
