import { TonClient as b, WalletContractV5R1 as N } from "@ton/ton";
import { toNano as k, Dictionary as c, Address as w } from "@ton/core";
import { c as h, d as B, g as E, b as V } from "./factory-DTmuZf2n.mjs";
import { mnemonicToPrivateKey as v } from "@ton/crypto";
const p = new b({
  endpoint: h,
  apiKey: B
});
async function C(e) {
  const t = await v(e.split(" "));
  return {
    publicKey: t.publicKey,
    secretKey: t.secretKey
  };
}
async function P(e) {
  const t = await C(e);
  return { walletV5: N.create({
    publicKey: t.publicKey,
    walletId: { networkGlobalId: -3 }
  }), walletKeys: t };
}
async function F(e) {
  try {
    const { mnemonic: t, roundIdx: i, qty: r, recipient: f, refWallet: l } = e, { walletV5: n, walletKeys: m } = await P(t), I = await (await E()).getLotteryAddress(BigInt(i)), a = await V(I), y = await p.getBalance(n.address), u = BigInt(r), g = await a.getInfo(), o = await a.getCalculateTotalPriceForBulkTickets(u) + k("0.004") * BigInt(r);
    if (g.status !== 0n)
      throw new Error("The round is not active");
    if (y < o)
      throw new Error(`Insufficient balance to complete the transaction ${y} ${o}`);
    const d = c.empty(c.Keys.Uint(32), c.Values.Uint(32));
    for (let s = 0; s < r; s++) {
      const T = Math.floor(Math.random() * 1e6) + 1e6;
      d.set(s, T);
    }
    const K = p.provider(n.address);
    return await a.send(
      n.sender(K, m.secretKey),
      {
        value: o
      },
      {
        $$type: "BuyTicket",
        amount: u,
        ticketNumbers: d,
        recipient: w.parse(f),
        refWallet: l ? w.parse(l) : null
      }
    ), { success: !0 };
  } catch (t) {
    return { success: !1, error: t instanceof Error ? t.message : "Unknown error" };
  }
}
export {
  F as buyTicketsNode
};
//# sourceMappingURL=node.es.map
