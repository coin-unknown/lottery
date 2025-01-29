import { useImperativeHandle, forwardRef } from "react";
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
	getRefWallet: () => { refWallet: string | null; refBalance: number };
}

interface NotteryProps {
	config: WidgetConfig;
	className?: string;
	onReady: () => void;
}

export const Nottery = forwardRef<NotteryRef, NotteryProps>(
	({ className = '', config, onReady }, ref) => {
		const {
			buyTickets,
			registerRefWallet,
			claimRefReward,
			refWallet,
			refBalance,
		} = useLotteryWidget(onReady);

		// Expose methods via useImperativeHandle
		useImperativeHandle(ref, () => ({
			buyTickets,
			registerRefWallet,
			claimRefReward,
			getRefWallet: () => ({ refWallet, refBalance }),
		}));

		return (
			<div className={className}>
				<TonConnectButton className={classes.tonConnectButton} />
				<LotteryCard config={config} />
			</div>
		);
	}
);
