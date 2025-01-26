import { contractAddress as p, Slice as r, beginCell as s, TupleBuilder as o, Dictionary as l, Builder as w, Cell as E, Address as f, storeStateInit as R } from "@ton/core";
import { TonClient as D } from "@ton/ton";
function k(i) {
  return (t) => {
    const e = t;
    e.storeUint(i.number, 32), e.storeAddress(i.owner);
  };
}
function M(i) {
  const t = i, e = t.loadUintBig(32), a = t.loadAddress();
  return { $$type: "Ticket", number: e, owner: a };
}
function L() {
  return {
    serialize: (i, t) => {
      t.storeRef(s().store(k(i)).endCell());
    },
    parse: (i) => M(i.loadRef().beginParse())
  };
}
function b(i) {
  return (t) => {
    const e = t;
    e.storeUint(1817793233, 32), e.storeAddress(i.creator), e.storeInt(i.price, 257), e.storeInt(i.endTime, 257);
    const a = new w();
    a.storeInt(i.discountDivisor, 257), e.storeRef(a.endCell());
  };
}
function h(i) {
  return (t) => {
    const e = t;
    e.storeUint(3310573309, 32), e.storeAddress(i.recipient), e.storeUint(i.amount, 32), e.storeDict(
      i.ticketNumbers,
      l.Keys.Uint(32),
      l.Values.Uint(32)
    ), e.storeAddress(i.refWallet);
  };
}
function H(i) {
  return (t) => {
    const e = t;
    e.storeUint(2609204369, 32), e.storeDict(
      i.ticketIds,
      l.Keys.Uint(32),
      l.Values.Uint(32)
    ), e.storeUint(i.ticketLength, 32);
  };
}
function v(i) {
  const t = i.readBigNumber(), e = i.readAddress(), a = i.readBigNumber(), n = i.readBigNumber(), A = i.readBigNumber(), g = i.readBigNumber(), d = i.readBigNumber();
  return {
    $$type: "LotteryInfo",
    seqno: t,
    creator: e,
    ticketCnt: a,
    endTime: n,
    price: A,
    status: g,
    amountCollected: d
  };
}
function F(i) {
  return (t) => {
    const e = t;
    e.storeUint(92236e4, 32), e.storeAddress(i.target);
  };
}
function J(i) {
  return (t) => {
    const e = t;
    e.storeAddress(i.factory), e.storeInt(i.seqno, 257);
  };
}
async function Q(i, t) {
  const e = E.fromBase64(
    "te6ccgECPgEADwMAART/APSkE/S88sgLAQIBYgIDA8LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABERERBV4Ns8ye1UOQQFAgEgJCUEeO2i7fsBkjB/4HAh10nCH5UwINcLH94gghBsWVLRuuMCIIIQxVNW/brjAiCCEJuFTJG64wIgghA2+hjAugYHCAkB9AEREQERECDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAOINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WHIEBAc8ACsiBAQHPABnL/xfL/xXLDwPIgQEBzwAS9ACBAQHPABKBAQHPABL0ABL0AAPI9AAUIwDuMNMfAYIQbFlS0bry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDUAdCBAQHXADAUQzBsFDQ8PT0/ggDZN/hCVhHHBfL0gggPQkCCCB6EgPhEbpf4JfgVf/hk3iGh+BGgEM8QnH8BzjDTHwGCEMVTVv268uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH/QEINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iFEMwbBTbPH8KAuIw0x8BghCbhUyRuvLggfQE0x9ZbBKCAMIHLcAC8vSCAKYIgQEL+EItWXhBM/QKb6GUAdcBMJJbbeJu8vRwIJNTArmK6BNfA/hCf1hyECNtbW3bPDCBAQv4QhAqcXghbpVbWfRZMJjIAc8BQTP0QeIIfxMhA7SPUDDTHwGCEDb6GMC68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDGCAJrf+EJWEwHHBfL0f/gnbxCCCJiWgKFyiBA0bW3bPDB/4MAAkTDjDXAgIRUC9oIAxxojwgDy9IIAv4YjwR/y9IIAkzr4I1YSufL0gRWzL8AA8vQREBEUERAPERMPDhESDg0REQ0MERQMCxETCwoREgoJEREJCBEUCAcREwcGERIGBRERBQQRFAQDERMDAhESAgEREQERFFYS2zyBHpH4QW8kE18DIr7y9DoLA/5RM6BwlCBWFbmPaIAgIFYVVCIzQTP0Dm+hlAHXATCSW23iIG7y0IAREBETERAPERIPDhERDg0REw0MERIMCxERCwoREwoJERIJCBERCAcREwcGERIGBRERBQQREwQDERIDARETARESVhLbPFYWgQEBERQB6DBXElcSVxJWEm6zDA0OARztou37cCKTIcEGiuhfAw8AvMhZAssfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQJQEREwFS4CBulTBZ9FowlEEz9BXiDKQREqQPERIPDhERDg0REA0QvhCtEJwQixB6EGkQWBBHECUCho8gERIgbvLQgH8REyWogScQqQRyiBA0AxEVAxA0bW3bPDCTMFcR4gwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGFFAzRRUSIQP+dSKhERARFBEQDxETDw4REg4NERENDBEUDAsREwsKERIKCRERCQgRFAgHERMHBhESBgUREQUEERQEAxETAwIREgIBEREBERRWFNs8elYWpCDC//KFcQGSIajkMVYTAakIUhCgelYXpCDC//KFcQGSIajkMVYWAakIEqC64wJXFCwQEQCyVxFXEVcRgQEBXFYUgwdBM/QMb6GUAdcBMJJbbeIgbvLQgKRBMAEREwGDByFulVtZ9FowmMgBzwFBM/RC4gwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGE0AF2zEAUBERpA8REw8OERIODRERDQwREAwQvxCuEJ0QjBB7EGoQWRBIEDdGBQQAFAAAAABhY2NlcHQB/IAgVFQAUjBBM/QOb6GUAdcBMJJbbeIgbvLQgIIA1WoqgQEBJFn0DW+hkjBt3yBukjBtjifQ0x/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwSbwLiIG7y0IBvIjH4QscF8vQREREVEREREBEUERAPERMPDhESDhQB0g0RFQ0MERQMCxETCwoREgoJERUJCBEUCAcREwcGERIGBREVBQQRFAQDERMDAhESAgERFQHbPAEREgGgERSkERARFBEQDxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQahBZEEgQN0ZQFCkC1vkBIILoHLjQ8d2kUbpEkVV8C6l0NMpb4ohd8J9FE/2yI4rzgbqOHDCCAMh6+EJWEQHHBfL0gRWzC8AAG/L0cQp/2zHgIILwngPr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"
  ), a = E.fromBase64(
    "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"
  ), n = s();
  n.storeRef(a), n.storeUint(0, 1), J({ $$type: "Lottery_init_args", factory: i, seqno: t })(n);
  const A = n.endCell();
  return { code: e, data: A };
}
const N = {
  2: { message: "Stack underflow" },
  3: { message: "Stack overflow" },
  4: { message: "Integer overflow" },
  5: { message: "Integer out of expected range" },
  6: { message: "Invalid opcode" },
  7: { message: "Type check error" },
  8: { message: "Cell overflow" },
  9: { message: "Cell underflow" },
  10: { message: "Dictionary error" },
  11: { message: "'Unknown' error" },
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
    message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree"
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
  55607: { message: "You are not factory" }
}, T = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: !1 } },
      { name: "data", type: { kind: "simple", type: "cell", optional: !1 } }
    ]
  },
  {
    name: "StdAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: !1, format: 8 }
      },
      {
        name: "address",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      }
    ]
  },
  {
    name: "VarAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: !1, format: 32 }
      },
      {
        name: "address",
        type: { kind: "simple", type: "slice", optional: !1 }
      }
    ]
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: !1 }
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: !1 } }
    ]
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: !1 }
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: !0 } },
      { name: "code", type: { kind: "simple", type: "cell", optional: !0 } },
      { name: "data", type: { kind: "simple", type: "cell", optional: !0 } }
    ]
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      }
    ]
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      }
    ]
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "ChangeOwner",
    header: 2174598809,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "ChangeOwnerOk",
    header: 846932810,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "Ticket",
    header: null,
    fields: [
      {
        name: "number",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "CreateLottery",
    header: 1817793233,
    fields: [
      {
        name: "creator",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "price",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "endTime",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "discountDivisor",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "BuyTicket",
    header: 3310573309,
    fields: [
      {
        name: "recipient",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "amount",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      },
      {
        name: "ticketNumbers",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 32,
          value: "uint",
          valueFormat: 32
        }
      },
      {
        name: "refWallet",
        type: { kind: "simple", type: "address", optional: !0 }
      }
    ]
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
          valueFormat: 32
        }
      },
      {
        name: "ticketLength",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      }
    ]
  },
  {
    name: "LotteryInfo",
    header: null,
    fields: [
      {
        name: "seqno",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "creator",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "ticketCnt",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "endTime",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "price",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "status",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "amountCollected",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "Withdraw",
    header: 92236e4,
    fields: [
      {
        name: "target",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "Lottery$Data",
    header: null,
    fields: [
      {
        name: "factory",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "creator",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "seqno",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "ticketCnt",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "endTime",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "price",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "status",
        type: { kind: "simple", type: "uint", optional: !1, format: 16 }
      },
      {
        name: "discountDivisor",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "claimed",
        type: { kind: "dict", key: "address", value: "uint", valueFormat: 8 }
      },
      {
        name: "feePercent",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "refPercent",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "rewardPerBracket",
        type: { kind: "dict", key: "int", value: "uint", valueFormat: 256 }
      },
      {
        name: "tickets",
        type: { kind: "dict", key: "int", value: "Ticket", valueFormat: "ref" }
      },
      {
        name: "winnerCntPerBracket",
        type: { kind: "dict", key: "int", value: "uint", valueFormat: 256 }
      },
      {
        name: "amountCollected",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "feeAmount",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "finalNumber",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      }
    ]
  },
  {
    name: "CreateWallet",
    header: 4268690758,
    fields: [
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "Move",
    header: 3211350992,
    fields: [
      {
        name: "target",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "ReferralWallet$Data",
    header: null,
    fields: [
      {
        name: "factory",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "seqno",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "Draw",
    header: 746428760,
    fields: [
      {
        name: "lotteryId",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "EmergencyWithdraw",
    header: 807739057,
    fields: [
      {
        name: "lotteryId",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "LotteryFactory$Data",
    header: null,
    fields: [
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "lotteryCnt",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "referrers",
        type: { kind: "dict", key: "int", value: "address" }
      },
      {
        name: "referrer_cnt",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "withdraw_end",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      }
    ]
  }
], P = [
  {
    name: "allTickets",
    arguments: [],
    returnType: {
      kind: "dict",
      key: "int",
      value: "Ticket",
      valueFormat: "ref"
    }
  },
  {
    name: "isClaimable",
    arguments: [
      {
        name: "user",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ],
    returnType: { kind: "simple", type: "bool", optional: !1 }
  },
  {
    name: "calculateTotalPriceForBulkTickets",
    arguments: [
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ],
    returnType: { kind: "simple", type: "int", optional: !1, format: 257 }
  },
  {
    name: "winningNumber",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: !1, format: 257 }
  },
  {
    name: "info",
    arguments: [],
    returnType: { kind: "simple", type: "LotteryInfo", optional: !1 }
  },
  {
    name: "calculateRewardsForTicketId",
    arguments: [
      {
        name: "ticketId",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ],
    returnType: { kind: "simple", type: "int", optional: !1, format: 257 }
  }
], S = [
  { receiver: "internal", message: { kind: "typed", type: "CreateLottery" } },
  { receiver: "internal", message: { kind: "typed", type: "BuyTicket" } },
  { receiver: "internal", message: { kind: "text", text: "close" } },
  { receiver: "internal", message: { kind: "text", text: "draw" } },
  { receiver: "internal", message: { kind: "typed", type: "ClaimTickets" } },
  { receiver: "internal", message: { kind: "text", text: "widrawCommission" } },
  { receiver: "internal", message: { kind: "text", text: "moveFunds" } },
  { receiver: "internal", message: { kind: "text", text: "addFunds" } },
  { receiver: "internal", message: { kind: "typed", type: "Withdraw" } }
];
class B {
  constructor(t, e) {
    this.abi = {
      types: T,
      getters: P,
      receivers: S,
      errors: N
    }, this.address = t, this.init = e;
  }
  static async init(t, e) {
    return await Q(t, e);
  }
  static async fromInit(t, e) {
    const a = await Q(t, e), n = p(0, a);
    return new B(n, a);
  }
  static fromAddress(t) {
    return new B(t);
  }
  async send(t, e, a, n) {
    let A = null;
    if (n && typeof n == "object" && !(n instanceof r) && n.$$type === "CreateLottery" && (A = s().store(b(n)).endCell()), n && typeof n == "object" && !(n instanceof r) && n.$$type === "BuyTicket" && (A = s().store(h(n)).endCell()), n === "close" && (A = s().storeUint(0, 32).storeStringTail(n).endCell()), n === "draw" && (A = s().storeUint(0, 32).storeStringTail(n).endCell()), n && typeof n == "object" && !(n instanceof r) && n.$$type === "ClaimTickets" && (A = s().store(H(n)).endCell()), n === "widrawCommission" && (A = s().storeUint(0, 32).storeStringTail(n).endCell()), n === "moveFunds" && (A = s().storeUint(0, 32).storeStringTail(n).endCell()), n === "addFunds" && (A = s().storeUint(0, 32).storeStringTail(n).endCell()), n && typeof n == "object" && !(n instanceof r) && n.$$type === "Withdraw" && (A = s().store(F(n)).endCell()), A === null)
      throw new Error("Invalid message type");
    await t.internal(e, { ...a, body: A });
  }
  async getAllTickets(t) {
    const e = new o(), a = (await t.get("allTickets", e.build())).stack;
    return l.loadDirect(
      l.Keys.BigInt(257),
      L(),
      a.readCellOpt()
    );
  }
  async getIsClaimable(t, e) {
    const a = new o();
    return a.writeAddress(e), (await t.get("isClaimable", a.build())).stack.readBoolean();
  }
  async getCalculateTotalPriceForBulkTickets(t, e) {
    const a = new o();
    return a.writeNumber(e), (await t.get("calculateTotalPriceForBulkTickets", a.build())).stack.readBigNumber();
  }
  async getWinningNumber(t) {
    const e = new o();
    return (await t.get("winningNumber", e.build())).stack.readBigNumber();
  }
  async getInfo(t) {
    const e = new o(), a = (await t.get("info", e.build())).stack;
    return v(a);
  }
  async getCalculateRewardsForTicketId(t, e) {
    const a = new o();
    return a.writeNumber(e), (await t.get("calculateRewardsForTicketId", a.build())).stack.readBigNumber();
  }
}
function x(i) {
  return (t) => {
    const e = t;
    e.storeUint(2490013878, 32), e.storeUint(i.queryId, 64);
  };
}
function G(i) {
  return (t) => {
    const e = t;
    e.storeUint(1817793233, 32), e.storeAddress(i.creator), e.storeInt(i.price, 257), e.storeInt(i.endTime, 257);
    const a = new w();
    a.storeInt(i.discountDivisor, 257), e.storeRef(a.endCell());
  };
}
function U(i) {
  return (t) => {
    const e = t;
    e.storeUint(746428760, 32), e.storeInt(i.lotteryId, 257);
  };
}
function z(i) {
  return (t) => {
    const e = t;
    e.storeUint(807739057, 32), e.storeInt(i.lotteryId, 257);
  };
}
async function I() {
  const i = E.fromBase64(
    "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"
  ), t = E.fromBase64(
    "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"
  ), e = s();
  e.storeRef(t), e.storeUint(0, 1);
  const a = e.endCell();
  return { code: i, data: a };
}
const Y = {
  2: { message: "Stack underflow" },
  3: { message: "Stack overflow" },
  4: { message: "Integer overflow" },
  5: { message: "Integer out of expected range" },
  6: { message: "Invalid opcode" },
  7: { message: "Type check error" },
  8: { message: "Cell overflow" },
  9: { message: "Cell underflow" },
  10: { message: "Dictionary error" },
  11: { message: "'Unknown' error" },
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
    message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree"
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
  55607: { message: "You are not factory" }
}, K = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: !1 } },
      { name: "data", type: { kind: "simple", type: "cell", optional: !1 } }
    ]
  },
  {
    name: "StdAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: !1, format: 8 }
      },
      {
        name: "address",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      }
    ]
  },
  {
    name: "VarAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: !1, format: 32 }
      },
      {
        name: "address",
        type: { kind: "simple", type: "slice", optional: !1 }
      }
    ]
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: !1 }
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: !1 } }
    ]
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: !1 }
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: !0 } },
      { name: "code", type: { kind: "simple", type: "cell", optional: !0 } },
      { name: "data", type: { kind: "simple", type: "cell", optional: !0 } }
    ]
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      }
    ]
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      }
    ]
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "ChangeOwner",
    header: 2174598809,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "ChangeOwnerOk",
    header: 846932810,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "Ticket",
    header: null,
    fields: [
      {
        name: "number",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "CreateLottery",
    header: 1817793233,
    fields: [
      {
        name: "creator",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "price",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "endTime",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "discountDivisor",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "BuyTicket",
    header: 3310573309,
    fields: [
      {
        name: "recipient",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "amount",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      },
      {
        name: "ticketNumbers",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 32,
          value: "uint",
          valueFormat: 32
        }
      },
      {
        name: "refWallet",
        type: { kind: "simple", type: "address", optional: !0 }
      }
    ]
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
          valueFormat: 32
        }
      },
      {
        name: "ticketLength",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      }
    ]
  },
  {
    name: "LotteryInfo",
    header: null,
    fields: [
      {
        name: "seqno",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "creator",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "ticketCnt",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "endTime",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "price",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "status",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "amountCollected",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "Withdraw",
    header: 92236e4,
    fields: [
      {
        name: "target",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "Lottery$Data",
    header: null,
    fields: [
      {
        name: "factory",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "creator",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "seqno",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "ticketCnt",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "endTime",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "price",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "status",
        type: { kind: "simple", type: "uint", optional: !1, format: 16 }
      },
      {
        name: "discountDivisor",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "claimed",
        type: { kind: "dict", key: "address", value: "uint", valueFormat: 8 }
      },
      {
        name: "feePercent",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "refPercent",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "rewardPerBracket",
        type: { kind: "dict", key: "int", value: "uint", valueFormat: 256 }
      },
      {
        name: "tickets",
        type: { kind: "dict", key: "int", value: "Ticket", valueFormat: "ref" }
      },
      {
        name: "winnerCntPerBracket",
        type: { kind: "dict", key: "int", value: "uint", valueFormat: 256 }
      },
      {
        name: "amountCollected",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "feeAmount",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "finalNumber",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      }
    ]
  },
  {
    name: "CreateWallet",
    header: 4268690758,
    fields: [
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "Move",
    header: 3211350992,
    fields: [
      {
        name: "target",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "ReferralWallet$Data",
    header: null,
    fields: [
      {
        name: "factory",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "seqno",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "Draw",
    header: 746428760,
    fields: [
      {
        name: "lotteryId",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "EmergencyWithdraw",
    header: 807739057,
    fields: [
      {
        name: "lotteryId",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "LotteryFactory$Data",
    header: null,
    fields: [
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "lotteryCnt",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "referrers",
        type: { kind: "dict", key: "int", value: "address" }
      },
      {
        name: "referrer_cnt",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "withdraw_end",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      }
    ]
  }
], V = [
  {
    name: "lotteryCnt",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: !1, format: 257 }
  },
  {
    name: "lotteryAddress",
    arguments: [
      {
        name: "seqno",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ],
    returnType: { kind: "simple", type: "address", optional: !1 }
  },
  {
    name: "referrerWalletAddress",
    arguments: [
      {
        name: "user",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ],
    returnType: { kind: "simple", type: "address", optional: !1 }
  },
  {
    name: "reffererNumber",
    arguments: [
      {
        name: "user",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ],
    returnType: { kind: "simple", type: "int", optional: !1, format: 257 }
  },
  {
    name: "owner",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: !1 }
  }
], W = [
  { receiver: "internal", message: { kind: "typed", type: "CreateLottery" } },
  { receiver: "internal", message: { kind: "typed", type: "Draw" } },
  { receiver: "internal", message: { kind: "text", text: "createRefWallet" } },
  { receiver: "internal", message: { kind: "text", text: "withdraw_ref" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "EmergencyWithdraw" }
  },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } }
];
class y {
  constructor(t, e) {
    this.abi = {
      types: K,
      getters: V,
      receivers: W,
      errors: Y
    }, this.address = t, this.init = e;
  }
  static async init() {
    return await I();
  }
  static async fromInit() {
    const t = await I(), e = p(0, t);
    return new y(e, t);
  }
  static fromAddress(t) {
    return new y(t);
  }
  async send(t, e, a, n) {
    let A = null;
    if (n && typeof n == "object" && !(n instanceof r) && n.$$type === "CreateLottery" && (A = s().store(G(n)).endCell()), n && typeof n == "object" && !(n instanceof r) && n.$$type === "Draw" && (A = s().store(U(n)).endCell()), n === "createRefWallet" && (A = s().storeUint(0, 32).storeStringTail(n).endCell()), n === "withdraw_ref" && (A = s().storeUint(0, 32).storeStringTail(n).endCell()), n && typeof n == "object" && !(n instanceof r) && n.$$type === "EmergencyWithdraw" && (A = s().store(z(n)).endCell()), n && typeof n == "object" && !(n instanceof r) && n.$$type === "Deploy" && (A = s().store(x(n)).endCell()), A === null)
      throw new Error("Invalid message type");
    await t.internal(e, { ...a, body: A });
  }
  async getLotteryCnt(t) {
    const e = new o();
    return (await t.get("lotteryCnt", e.build())).stack.readBigNumber();
  }
  async getLotteryAddress(t, e) {
    const a = new o();
    return a.writeNumber(e), (await t.get("lotteryAddress", a.build())).stack.readAddress();
  }
  async getReferrerWalletAddress(t, e) {
    const a = new o();
    return a.writeAddress(e), (await t.get("referrerWalletAddress", a.build())).stack.readAddress();
  }
  async getReffererNumber(t, e) {
    const a = new o();
    return a.writeAddress(e), (await t.get("reffererNumber", a.build())).stack.readBigNumber();
  }
  async getOwner(t) {
    const e = new o();
    return (await t.get("owner", e.build())).stack.readAddress();
  }
}
function X(i) {
  return (t) => {
    const e = t;
    e.storeUint(4268690758, 32), e.storeAddress(i.owner);
  };
}
function j(i) {
  return (t) => {
    const e = t;
    e.storeUint(3211350992, 32), e.storeAddress(i.target);
  };
}
function O(i) {
  return (t) => {
    const e = t;
    e.storeAddress(i.factory), e.storeInt(i.seqno, 257);
  };
}
async function u(i, t) {
  const e = E.fromBase64(
    "te6ccgECEgEAA50AART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCDgQFAgFYDA0CxO2i7fsBkjB/4HAh10nCH5UwINcLH94gghD+bw1Guo4wMNMfAYIQ/m8NRrry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMTN/4CCCEL9pU9C64wLAAJEw4w1wBgcAusj4QwHMfwHKAFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEoEBAc8AAciBAQHPAMkBzMntVAKeMNMfAYIQv2lT0Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMYIAmt/4QlJgxwXy9H/4J28QggiYloChcogQNG1t2zwwfwgKAbb5ASCC8AQsT5ZQDh7ii6FMXdxClcQFAO84NhlTP/HvNzy+jHyGup4w+EFvJBNfAxKgAX/bMeCC8AlRkBlK7mEc6JXFUDrfhf2GTeeQV0YUL2CNPrL6rRTkuuMCCQAYAAAAAGFkZEZ1bmRzAVAxggCa3/hCUkDHBfL0f/gnbxCCCJiWgKEjWXIQI21tbds8MHABf9sxCgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgLAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAhG5bA2zzbPGxBgODwARuCvu1E0NIAAYAdbtRNDUAfhj0gABjlP6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDUAdCBAQHXADAUQzBsFOD4KNcLCoMJuvLgiRAAAiEBVvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZAtEB2zwRAEyNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARwWA=="
  ), a = E.fromBase64(
    "te6cckECFAEAA6cAAQHAAQEFoRqhAgEU/wD0pBP0vPLICwMCAWIEDQN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLggg8FDALE7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEP5vDUa6jjAw0x8BghD+bw1GuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxM3/gIIIQv2lT0LrjAsAAkTDjDXAGCAKeMNMfAYIQv2lT0Lry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMYIAmt/4QlJgxwXy9H/4J28QggiYloChcogQNG1t2zwwfwcKABgAAAAAYWRkRnVuZHMBtvkBIILwBCxPllAOHuKLoUxd3EKVxAUA7zg2GVM/8e83PL6MfIa6njD4QW8kE18DEqABf9sx4ILwCVGQGUruYRzolcVQOt+F/YZN55BXRhQvYI0+svqtFOS64wIJAVAxggCa3/hCUkDHBfL0f/gnbxCCCJiWgKEjWXIQI21tbds8MHABf9sxCgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgLAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMALrI+EMBzH8BygBVMFBDINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhKBAQHPAAHIgQEBzwDJAczJ7VQCAVgOEwIRuWwNs82zxsQYDxIB1u1E0NQB+GPSAAGOU/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANQB0IEBAdcAMBRDMGwU4Pgo1wsKgwm68uCJEAFW+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFkC0QHbPBEATI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABHBYAAIhABG4K+7UTQ0gABg8q546"
  ), n = s();
  n.storeRef(a), n.storeUint(0, 1), O({
    $$type: "ReferralWallet_init_args",
    factory: i,
    seqno: t
  })(n);
  const A = n.endCell();
  return { code: e, data: A };
}
const Z = {
  2: { message: "Stack underflow" },
  3: { message: "Stack overflow" },
  4: { message: "Integer overflow" },
  5: { message: "Integer out of expected range" },
  6: { message: "Invalid opcode" },
  7: { message: "Type check error" },
  8: { message: "Cell overflow" },
  9: { message: "Cell underflow" },
  10: { message: "Dictionary error" },
  11: { message: "'Unknown' error" },
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
    message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree"
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
  55607: { message: "You are not factory" }
}, q = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: !1 } },
      { name: "data", type: { kind: "simple", type: "cell", optional: !1 } }
    ]
  },
  {
    name: "StdAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: !1, format: 8 }
      },
      {
        name: "address",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      }
    ]
  },
  {
    name: "VarAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: !1, format: 32 }
      },
      {
        name: "address",
        type: { kind: "simple", type: "slice", optional: !1 }
      }
    ]
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: !1 }
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: !1 } }
    ]
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: !1 }
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: !0 } },
      { name: "code", type: { kind: "simple", type: "cell", optional: !0 } },
      { name: "data", type: { kind: "simple", type: "cell", optional: !0 } }
    ]
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      }
    ]
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      }
    ]
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "ChangeOwner",
    header: 2174598809,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "ChangeOwnerOk",
    header: 846932810,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: !1, format: 64 }
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "Ticket",
    header: null,
    fields: [
      {
        name: "number",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "CreateLottery",
    header: 1817793233,
    fields: [
      {
        name: "creator",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "price",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "endTime",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "discountDivisor",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "BuyTicket",
    header: 3310573309,
    fields: [
      {
        name: "recipient",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "amount",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      },
      {
        name: "ticketNumbers",
        type: {
          kind: "dict",
          key: "uint",
          keyFormat: 32,
          value: "uint",
          valueFormat: 32
        }
      },
      {
        name: "refWallet",
        type: { kind: "simple", type: "address", optional: !0 }
      }
    ]
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
          valueFormat: 32
        }
      },
      {
        name: "ticketLength",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      }
    ]
  },
  {
    name: "LotteryInfo",
    header: null,
    fields: [
      {
        name: "seqno",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "creator",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "ticketCnt",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "endTime",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "price",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "status",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "amountCollected",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "Withdraw",
    header: 92236e4,
    fields: [
      {
        name: "target",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "Lottery$Data",
    header: null,
    fields: [
      {
        name: "factory",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "creator",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "seqno",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "ticketCnt",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "endTime",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "price",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "status",
        type: { kind: "simple", type: "uint", optional: !1, format: 16 }
      },
      {
        name: "discountDivisor",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "claimed",
        type: { kind: "dict", key: "address", value: "uint", valueFormat: 8 }
      },
      {
        name: "feePercent",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "refPercent",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "rewardPerBracket",
        type: { kind: "dict", key: "int", value: "uint", valueFormat: 256 }
      },
      {
        name: "tickets",
        type: { kind: "dict", key: "int", value: "Ticket", valueFormat: "ref" }
      },
      {
        name: "winnerCntPerBracket",
        type: { kind: "dict", key: "int", value: "uint", valueFormat: 256 }
      },
      {
        name: "amountCollected",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "feeAmount",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "finalNumber",
        type: { kind: "simple", type: "uint", optional: !1, format: 32 }
      }
    ]
  },
  {
    name: "CreateWallet",
    header: 4268690758,
    fields: [
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "Move",
    header: 3211350992,
    fields: [
      {
        name: "target",
        type: { kind: "simple", type: "address", optional: !1 }
      }
    ]
  },
  {
    name: "ReferralWallet$Data",
    header: null,
    fields: [
      {
        name: "factory",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "seqno",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "Draw",
    header: 746428760,
    fields: [
      {
        name: "lotteryId",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "EmergencyWithdraw",
    header: 807739057,
    fields: [
      {
        name: "lotteryId",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      }
    ]
  },
  {
    name: "LotteryFactory$Data",
    header: null,
    fields: [
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: !1 }
      },
      {
        name: "lotteryCnt",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      },
      {
        name: "referrers",
        type: { kind: "dict", key: "int", value: "address" }
      },
      {
        name: "referrer_cnt",
        type: { kind: "simple", type: "int", optional: !1, format: 257 }
      },
      {
        name: "withdraw_end",
        type: { kind: "simple", type: "uint", optional: !1, format: 256 }
      }
    ]
  }
], _ = [
  {
    name: "balance",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: !1, format: 257 }
  }
], $ = [
  { receiver: "internal", message: { kind: "typed", type: "CreateWallet" } },
  { receiver: "internal", message: { kind: "text", text: "accept" } },
  { receiver: "internal", message: { kind: "text", text: "withdraw" } },
  { receiver: "internal", message: { kind: "typed", type: "Move" } }
];
class m {
  constructor(t, e) {
    this.abi = {
      types: q,
      getters: _,
      receivers: $,
      errors: Z
    }, this.address = t, this.init = e;
  }
  static async init(t, e) {
    return await u(t, e);
  }
  static async fromInit(t, e) {
    const a = await u(t, e), n = p(0, a);
    return new m(n, a);
  }
  static fromAddress(t) {
    return new m(t);
  }
  async send(t, e, a, n) {
    let A = null;
    if (n && typeof n == "object" && !(n instanceof r) && n.$$type === "CreateWallet" && (A = s().store(X(n)).endCell()), n === "accept" && (A = s().storeUint(0, 32).storeStringTail(n).endCell()), n === "withdraw" && (A = s().storeUint(0, 32).storeStringTail(n).endCell()), n && typeof n == "object" && !(n instanceof r) && n.$$type === "Move" && (A = s().store(j(n)).endCell()), A === null)
      throw new Error("Invalid message type");
    await t.internal(e, { ...a, body: A });
  }
  async getBalance(t) {
    const e = new o();
    return (await t.get("balance", e.build())).stack.readBigNumber();
  }
}
const ee = "f74dc0225ef2f2dd07d1afcce76ac62b2a7667ce8810702c8552d99a184317f5", te = "https://testnet.toncenter.com/api/v2/jsonRPC", ne = "EQAndtP8cSPSkwlFK-lPMBYKDYMxsNUydc6yCiJcjnBuEfeO", c = new D({
  endpoint: te,
  apiKey: ee
}), se = async () => {
  const i = f.parse(ne);
  return c.open(y.fromAddress(i));
}, oe = async (i) => c.open(B.fromAddress(i)), re = async (i) => c.open(m.fromAddress(i));
class le {
  /**
   * The address of the current account.
   */
  get address() {
    var e;
    const t = (e = this.provider.account) == null ? void 0 : e.address;
    return t ? f.parse(t) : void 0;
  }
  /**
   * Creates a new TonConnectProvider.
   * @param provider
   */
  constructor(t) {
    this.provider = t;
  }
  /**
   * Sends a message using the TonConnect UI.
   * @param args
   */
  async send(t) {
    var C;
    const e = Math.floor(Date.now() / 1e3) + 600, a = t.to.toString({ urlSafe: !0, bounceable: !0 }), n = (C = this.address) == null ? void 0 : C.toRawString(), A = t.value.toString();
    let g;
    t.init && (g = s().store(R(t.init)).endCell().toBoc().toString("base64"));
    let d;
    t.body && (d = t.body.toBoc().toString("base64")), await this.provider.sendTransaction({
      validUntil: e,
      from: n,
      messages: [
        {
          address: a,
          amount: A,
          stateInit: g,
          payload: d
        }
      ]
    });
  }
}
export {
  le as T,
  re as a,
  oe as b,
  te as c,
  ee as d,
  se as g
};
//# sourceMappingURL=factory-DTmuZf2n.mjs.map
