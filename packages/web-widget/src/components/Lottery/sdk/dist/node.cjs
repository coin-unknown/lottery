"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const p=require("@ton/ton"),e=require("@ton/core"),n=require("./factory-BWOFBbo4.js"),N=require("@ton/crypto"),f=new p.TonClient({endpoint:n.TON_CLIENT_ENDPOINT,apiKey:n.TON_CLIENT_API_KEY});async function k(r){const t=await N.mnemonicToPrivateKey(r.split(" "));return{publicKey:t.publicKey,secretKey:t.secretKey}}async function h(r){const t=await k(r);return{walletV5:p.WalletContractV5R1.create({publicKey:t.publicKey,walletId:{networkGlobalId:-3}}),walletKeys:t}}async function B(r){try{const{mnemonic:t,roundIdx:l,qty:o,recipient:g,refWallet:y}=r,{walletV5:a,walletKeys:I}=await h(t),T=await(await n.getFactoryInstance()).getLotteryAddress(BigInt(l)),c=await n.getLotteryInstance(T),u=await f.getBalance(a.address),d=BigInt(o),m=await c.getInfo(),s=await c.getCalculateTotalPriceForBulkTickets(d)+e.toNano("0.004")*BigInt(o);if(m.status!==0n)throw new Error("The round is not active");if(u<s)throw new Error(`Insufficient balance to complete the transaction ${u} ${s}`);const w=e.Dictionary.empty(e.Dictionary.Keys.Uint(32),e.Dictionary.Values.Uint(32));for(let i=0;i<o;i++){const b=Math.floor(Math.random()*1e6)+1e6;w.set(i,b)}const K=f.provider(a.address);return await c.send(a.sender(K,I.secretKey),{value:s},{$$type:"BuyTicket",amount:d,ticketNumbers:w,recipient:e.Address.parse(g),refWallet:y?e.Address.parse(y):null}),{success:!0}}catch(t){return{success:!1,error:t instanceof Error?t.message:"Unknown error"}}}exports.buyTicketsNode=B;
//# sourceMappingURL=node.cjs.map
