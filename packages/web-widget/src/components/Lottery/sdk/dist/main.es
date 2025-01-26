import { address as P, fromNano as g, toNano as o, Dictionary as S } from "@ton/core";
import { g as A, a as L, b as M, T as W } from "./factory-DTmuZf2n.mjs";
var m = /* @__PURE__ */ ((t) => (t.Open = "Open", t.Closed = "Closed", t.Drawn = "Drawn", t))(m || {});
let N, v, D, I = 0, R;
async function y() {
  return N || (N = A()), N;
}
async function O(t) {
  return v || (v = L(t)), v;
}
async function w(t) {
  if (!D || t !== I) {
    const e = await (await y()).getLotteryAddress(BigInt(t));
    I = t, D = M(e);
  }
  return D;
}
function d(t) {
  return R || (R = new W(t)), R;
}
function B(t) {
  const n = t.toString().split("").reverse();
  return n.length === 7 && n.pop(), n.join("").padStart(6, "0");
}
function q(t, n) {
  let e = 0;
  for (let a = 0; a < 6 && t[a] === n[a]; a++)
    e++;
  return e;
}
const z = async () => {
  const t = await y();
  return Number(await t.getLotteryCnt()) - 1;
};
function _(t) {
  switch (t) {
    case 0n:
      return m.Open;
    case 1n:
      return m.Closed;
    case 2n:
      return m.Drawn;
    default:
      throw new Error(`Unknown status: ${t}`);
  }
}
const U = async (t, n) => {
  n === void 0 && (n = await z());
  const e = {
    id: n,
    ticketsSold: 0,
    drawTime: 0,
    price: 0,
    status: m.Open,
    claimable: !1,
    roundPot: "0",
    roundDraw: "",
    userData: {
      refReward: 0,
      refWallet: null,
      tickets: []
    }
  }, [a, r] = await Promise.all([y(), w(n)]), s = P(t.account.address), [i, b, l, p, k] = await Promise.all([
    a.getReffererNumber(s).catch(() => 0),
    r.getAllTickets(),
    r.getInfo(),
    r.getWinningNumber(),
    r.getIsClaimable(s)
  ]);
  if (Number(i) > 0) {
    const f = await a.getReferrerWalletAddress(s), c = await O(f);
    e.userData.refReward = Number(g(await c.getBalance())), e.userData.refWallet = c.address;
  }
  let u = "";
  p > 0 && (u = B(p));
  for (let f = 0; f < b.size; f++) {
    const c = b.get(BigInt(f)), h = B((c == null ? void 0 : c.number) ?? 0);
    if (c == null ? void 0 : c.owner.equals(s)) {
      const C = u ? q(h, u) : 0, $ = {
        id: f,
        numbers: h,
        prizeAmount: C > 0 ? Number(g(await r.getCalculateRewardsForTicketId(BigInt(f)))) : 0,
        matched: C
      };
      e.userData.tickets.push($);
    }
  }
  const T = Number(l.endTime) * 1e3;
  return e.ticketsSold = Number(g(l.ticketCnt)), e.drawTime = T, e.price = Number(g(l.price)), e.status = _(l.status), e.roundPot = Number(g(l.amountCollected)).toFixed(2), e.roundDraw = u, e.claimable = k, e;
}, x = async (t) => {
  const n = await y(), e = d(t);
  await n.send(
    e,
    {
      value: o("0.015")
    },
    "createRefWallet"
  );
}, G = async (t) => {
  const n = d(t);
  await (await y()).send(
    n,
    {
      value: o("0.02")
    },
    "withdraw_ref"
  );
}, H = async (t, n) => {
  const a = await (await w(t)).getCalculateTotalPriceForBulkTickets(BigInt(n));
  return Number(g(a)).toFixed(2);
}, J = async (t, n, e, a, r) => F(t, { roundIdx: n, qty: e, cost: a, refWallet: r }), K = async (t, n, e, a, r, s) => F(t, { roundIdx: n, qty: e, cost: a, refWallet: s, recipient: r }), V = async (t, n, e) => {
  const a = new W(t);
  if (!a.address)
    return;
  const r = await w(n), s = S.empty();
  for (let i = 0; i < e.length; i++)
    s.set(i, e[i]);
  await r.send(
    a,
    {
      value: o("0.02") * BigInt(e.length)
    },
    {
      $$type: "ClaimTickets",
      ticketIds: s,
      ticketLength: BigInt(e.length)
    }
  );
}, X = async (t, n) => {
  const e = await w(n), a = d(t);
  await e.send(
    a,
    {
      value: o("0.01")
    },
    "widrawCommission"
  );
}, Y = async (t) => {
  const n = d(t);
  if (!n.address)
    return;
  const e = Math.floor(Date.now() / 1e3);
  await (await y()).send(
    n,
    {
      value: o("0.05")
    },
    {
      $$type: "CreateLottery",
      endTime: BigInt(e + 3600 * 10),
      price: o("0.02"),
      discountDivisor: BigInt(400),
      creator: n.address
    }
  );
}, Z = async (t, n) => {
  const e = await w(n), a = d(t);
  await e.send(
    a,
    {
      value: o("0.01")
    },
    "close"
  );
}, tt = async (t, n) => {
  const e = await y(), a = d(t);
  await e.send(
    a,
    {
      value: o("0.04")
    },
    {
      $$type: "Draw",
      lotteryId: BigInt(n)
    }
  );
}, et = async (t, n) => {
  const e = d(t);
  await (await w(n)).send(
    e,
    {
      value: o("0.01")
    },
    "moveFunds"
  );
};
async function F(t, n) {
  const e = d(t);
  if (!e.address)
    return !1;
  const { roundIdx: a, qty: r, cost: s, refWallet: i = null, recipient: b = e.address } = n, l = S.empty();
  for (let u = 0; u < r; u++) {
    const T = 1e6 * Math.random();
    l.set(u, Number.parseInt(T.toString()) + 1e6);
  }
  const p = await w(a), k = BigInt(r);
  return await p.send(
    e,
    {
      value: o(s) + o("0.004") * k
    },
    {
      $$type: "BuyTicket",
      amount: k,
      ticketNumbers: l,
      recipient: b,
      refWallet: i
    }
  ), !0;
}
export {
  m as RoundStatus,
  J as buyTicket,
  K as buyTicketFor,
  X as claimPlatformComission,
  G as claimReferralReward,
  V as claimTickets,
  Z as closeRound,
  x as createReferralWallet,
  Y as createRound,
  tt as drawRound,
  z as getLastRoundId,
  U as getRound,
  H as getTicketsPrice,
  et as moveFunds
};
//# sourceMappingURL=main.es.map
