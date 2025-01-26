# Lottery Smart Contract SDK

This SDK provides a set of functions to interact with a TON blockchain-based lottery system. The SDK facilitates operations such as buying tickets, claiming rewards, creating lottery rounds, and managing referral programs.

More details can be found at [Lottery Platform](https://unknown-coin.com/lottery).

## Installation

Ensure you have installed the necessary dependencies:

```sh
npm install @ton/core @tonconnect/sdk
```

## Functions Overview

### Factory Instance

#### `async getFactory(): Promise<OpenedContract<LotteryFactory>>`
Returns a singleton instance of the lottery factory contract.

---

### Referral Wallet Instance

#### `async getRefWallet(address: Address): Promise<OpenedContract<ReferralWallet>>`
Retrieves an instance of the referral wallet contract associated with the provided address.

---

### Lottery Instance

#### `async getLottery(roundIdx: number): Promise<OpenedContract<Lottery>>`
Gets a lottery contract instance for a specific round index.

---

### TonConnect Sender Instance

#### `getSender(tonconnect: TonConnect): TonConnectProvider`
Initializes and returns an instance of `TonConnectProvider` for blockchain interaction.

---

### Utility Functions

#### `getReadableTicketNumber(number: number | bigint): string`
Formats ticket numbers by adding leading zeros.

#### `getTicketMatch(ticket: string, draw: string): number`
Calculates the number of matching digits between a ticket and a draw result.

#### `async getLastRoundId(): Promise<number>`
Returns the index of the last created lottery round.

#### `getRoundStatus(status: bigint): RoundStatus`
Converts a numerical status code to a readable `RoundStatus` enum.

---

### Round Information

#### `async getRound(wallet: Wallet, roundIdx?: number): Promise<IRound>`
Retrieves detailed information about a lottery round, including ticket sales, draw time, and user data.

---

### Referral Wallet Operations

#### `async createReferralWallet(tonConnect: TonConnect)`
Creates a referral wallet with a small transaction fee.

#### `async claimReferralReward(tonConnect: TonConnect)`
Withdraws referral rewards from the referral wallet.

---

### Ticket Operations

#### `async getTicketsPrice(roundIdx: number, qty: number): Promise<string>`
Calculates the price of purchasing a specific number of tickets.

#### `async buyTicket(tonConnect: TonConnect, roundIdx: number, qty: number, cost: number, refWallet?: Address)`
Purchases lottery tickets for the sender.

#### `async buyTicketFor(tonConnect: TonConnect, roundIdx: number, qty: number, cost: number, recipient: Address, refWallet?: Address)`
Purchases lottery tickets for another wallet.

#### `async claimTickets(tonConnect: TonConnect, roundIdx: number, winTicketsIds: number[])`
Claims winnings for specified ticket IDs.

---

### Admin Operations

#### `async claimPlatformComission(tonConnect: TonConnect, roundIdx: number)`
Claims the commission earned from a lottery round.

#### `async createRound(tonConnect: TonConnect)`
Creates a new lottery round.

#### `async closeRound(tonConnect: TonConnect, roundIdx: number)`
Closes an ongoing lottery round.

#### `async drawRound(tonConnect: TonConnect, roundIdx: number)`
Initiates the draw process for a lottery round.

#### `async moveFunds(tonConnect: TonConnect, roundIdx: number)`
Transfers the remaining funds to the next lottery round.

---

### Internal Function

#### `async _buyTicket(tonConnect: TonConnect, params: BuyTicketParams): Promise<boolean>`
Helper function to handle ticket purchase transactions internally.

---

## Usage Example

```javascript
import TonConnect from '@tonconnect/sdk';
import { buyTicket, getRound } from '@coin-unknown/lottery-core';

const tonConnect = new TonConnect();
const roundInfo = await getRound(tonConnect.wallet);

await buyTicket(tonConnect, roundInfo.id, 2, 10);
console.log(roundInfo);
```

## License

This SDK is released under the MIT License.

