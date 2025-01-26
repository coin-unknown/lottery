import { TonClient, WalletContractV5R1 } from '@ton/ton';
import { Address, toNano, Dictionary } from '@ton/core';
import { TON_CLIENT_ENDPOINT, TON_CLIENT_API_KEY, IS_TESTNET } from './constants';
import { getFactoryInstance, getLotteryInstance } from './utils/factory';
import { mnemonicToPrivateKey } from '@ton/crypto';

export interface BuyTicketParams {
  mnemonic: string;
  roundIdx: number;
  qty: number;
  recipient: string;
  refWallet?: string;
}

// Инициализация TON клиента
const client = new TonClient({
  endpoint: TON_CLIENT_ENDPOINT,
  apiKey: TON_CLIENT_API_KEY,
});

/**
 * Создание кошелька из мнемонической фразы
 * @param mnemonic
 */
async function getWalletFromMnemonic(mnemonic: string) {
  const keyPair = await mnemonicToPrivateKey(mnemonic.split(' '));
  return {
    publicKey: keyPair.publicKey,
    secretKey: keyPair.secretKey,
  };
}

/**
 * Восстановление и вывод информации о кошельке
 * @param mnemonic
 */
async function restoreWalletV5(mnemonic: string) {
  const walletKeys = await getWalletFromMnemonic(mnemonic);
  const walletV5 = WalletContractV5R1.create({
    publicKey: walletKeys.publicKey,
    walletId: { networkGlobalId: IS_TESTNET ? -3 : 0 },
  });

  return { walletV5, walletKeys };
}

/**
 * Покупка билетов
 * @param params
 */
export async function buyTicketsNode(params: BuyTicketParams) {
  try {
    const { mnemonic, roundIdx, qty, recipient, refWallet } = params;
    const { walletV5, walletKeys } = await restoreWalletV5(mnemonic);

    // Получаем инстанс лотереи
    const factory = await getFactoryInstance();
    const lotteryAddr = await factory.getLotteryAddress(BigInt(roundIdx));
    const lottery = await getLotteryInstance(lotteryAddr);
    const walletBalance = await client.getBalance(walletV5.address);
    const bigintQty = BigInt(qty);
    const round = await lottery.getInfo();
    const cost = (await lottery.getCalculateTotalPriceForBulkTickets(bigintQty)) + toNano('0.004') * BigInt(qty);

    if (round.status !== 0n) {
      throw new Error('The round is not active');
    }

    if (walletBalance < cost) {
      throw new Error(`Insufficient balance to complete the transaction ${walletBalance} ${cost}`);
    }

    // Создаем словарь билетов
    const ticketNumbers = Dictionary.empty(Dictionary.Keys.Uint(32), Dictionary.Values.Uint(32));
    for (let i = 0; i < qty; i++) {
      const rnd = Math.floor(Math.random() * 1000000) + 1000000;
      ticketNumbers.set(i, rnd);
    }

    const provider = client.provider(walletV5.address);

    await lottery.send(
      walletV5.sender(provider, walletKeys.secretKey),
      {
        value: cost,
      },
      {
        $$type: 'BuyTicket',
        amount: bigintQty,
        ticketNumbers,
        recipient: Address.parse(recipient),
        refWallet: refWallet ? Address.parse(refWallet) : null,
      }
    );

    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
