import { useRef } from "react";
import classes from "./Nottery.module.scss";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useLotteryWidget } from "./hooks/useLotteryWidget";
import { WidgetConfig } from "@/types";
import LotteryCard from "./NotteryCard";

// Define the exposed methods
export interface NotteryRef {
	buyTickets: (qty: number) => void;
	registerRefWallet: () => void;
	claimRefReward: () => void;
	getRefData: () => Promise<{ refReward: number; refWallet: string } | null>;
}

interface NotteryProps {
	config: WidgetConfig;
	className?: string;
}

export const Nottery = ({ className = "", config }: NotteryProps) => {
	const ref = useRef<NotteryRef | null>(null);
	useLotteryWidget(ref, config.onConnected);

	return (
		<div className={className}>
			<TonConnectButton className={classes.tonConnectButton} />
			<LotteryCard config={config} />
		</div>
	);
};
