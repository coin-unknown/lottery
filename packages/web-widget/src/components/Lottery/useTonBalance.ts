import { useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect, useRef } from 'react';

export function useTonBalance(onBalanceChange: (balance: number) => void) {
  const balanceRef = useRef(0);
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    let interval: number = 0;

    const fetchBalance = async () => {
      try {
        // Проверка, подключен ли кошелек
        if (tonConnectUI.wallet) {
          const walletAddress = tonConnectUI.wallet.account.address;

          // Получение баланса через официальный API TON
          const response = await fetch(`https://testnet.tonapi.io/v2/accounts/${walletAddress}`);
          const data = await response.json();

          if (data && data.balance) {
            const newBalance = parseInt(data.balance, 10) / 1e9; // Конвертация в TON
            if (newBalance !== balanceRef.current && balanceRef.current !== 0) {
              onBalanceChange(newBalance);
            }

            balanceRef.current = newBalance;
          }
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }

      interval = window.setTimeout(fetchBalance, 10000); // Проверка каждые 10 секунд
    };

    fetchBalance();

    return () => window.clearTimeout(interval);
  }, [onBalanceChange, tonConnectUI]);
}
