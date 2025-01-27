import { Address, type OpenedContract, type Sender, type SenderArguments, beginCell, storeStateInit } from '@ton/core';
import { TonClient } from '@ton/ton';
import type { TonConnect } from '@tonconnect/sdk';
import { Lottery } from './tact_Lottery';
import { LotteryFactory } from './tact_LotteryFactory';
import { ReferralWallet } from './tact_ReferralWallet';
import { TON_CLIENT_ENDPOINT, TON_CLIENT_API_KEY } from '../constants';

// TODO: Need to be moved to outside to json file and used as dynamic import
export const CONTRACT_ADDRESS = 'EQAndtP8cSPSkwlFK-lPMBYKDYMxsNUydc6yCiJcjnBuEfeO';

// Инициализация TON клиента
const client = new TonClient({
  endpoint: TON_CLIENT_ENDPOINT,
  apiKey: TON_CLIENT_API_KEY,
});

export const getFactoryInstance = async (): Promise<OpenedContract<LotteryFactory>> => {
  const address = Address.parse(CONTRACT_ADDRESS);
  const instance = client.open(LotteryFactory.fromAddress(address));
  return instance;
};

export const getLotteryInstance = async (lotteryAddr: Address): Promise<OpenedContract<Lottery>> => {
  const instance = client.open(Lottery.fromAddress(lotteryAddr));
  return instance;
};

export const getRefWalletInstance = async (refAddr: Address): Promise<OpenedContract<ReferralWallet>> => {
  const instance = client.open(ReferralWallet.fromAddress(refAddr));
  return instance;
};

export class TonConnectProvider implements Sender {
  /**
   * The TonConnect UI instance.
   * @private
   */
  private readonly provider: TonConnect;

  /**
   * The address of the current account.
   */
  public get address(): Address | undefined {
    const address = this.provider.account?.address;
    return address ? Address.parse(address) : undefined;
  }

  /**
   * Creates a new TonConnectProvider.
   * @param provider
   */
  public constructor(provider: TonConnect) {
    this.provider = provider;
  }

  /**
   * Sends a message using the TonConnect UI.
   * @param args
   */
  public async send(args: SenderArguments): Promise<void> {
    // The transaction is valid for 10 minutes.
    const validUntil = Math.floor(Date.now() / 1000) + 600;

    // The address of the recipient, should be in bounceable format for all smart contracts.
    const address = args.to.toString({ urlSafe: true, bounceable: true });

    // The address of the sender, if available.
    const from = this.address?.toRawString();

    // The amount to send in nano tokens.
    const amount = args.value.toString();

    // The state init cell for the contract.
    let stateInit: string | undefined;
    if (args.init) {
      // State init cell for the contract.
      const stateInitCell = beginCell().store(storeStateInit(args.init)).endCell();
      // Convert the state init cell to boc base64.
      stateInit = stateInitCell.toBoc().toString('base64');
    }

    // The payload for the message.
    let payload: string | undefined;
    if (args.body) {
      // Convert the message body to boc base64.
      payload = args.body.toBoc().toString('base64');
    }

    // Send the message using the TonConnect UI and wait for the message to be sent.
    await this.provider.sendTransaction({
      validUntil: validUntil,
      from: from,
      messages: [
        {
          address: address,
          amount: amount,
          stateInit: stateInit,
          payload: payload,
        },
      ],
    });
  }
}
