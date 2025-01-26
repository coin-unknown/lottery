import NotteryCard from "./NotteryCard";
import { TonConnectButton, TonConnectUIProvider } from "@tonconnect/ui-react";

export function Nottery() {
	return (
		<TonConnectUIProvider
			manifestUrl="https://app.unknown-coin.com/tonconnect-manifest.json"
			actionsConfiguration={{
				twaReturnUrl: "https://app.unknown-coin.com/lottery",
			}}
		>
      <TonConnectButton />
			<NotteryCard />
		</TonConnectUIProvider>
	);
}
