import { WidgetConfig } from "@/types";
import LotteryCard from "./NotteryCard";
import { TonConnectButton, TonConnectUIProvider } from "@tonconnect/ui-react";
import classes from "./Nottery.module.scss";

interface NotteryProps {
	config: WidgetConfig;
	className?: string;
}

export function Nottery(props: NotteryProps) {
	return (
		<TonConnectUIProvider
			manifestUrl="https://app.unknown-coin.com/tonconnect-manifest.json"
			actionsConfiguration={{
				twaReturnUrl: "https://app.unknown-coin.com/lottery",
			}}
		>
      		<TonConnectButton className={classes.tonConnectButton} />
			<LotteryCard config={props.config} />
		</TonConnectUIProvider>
	);
}
