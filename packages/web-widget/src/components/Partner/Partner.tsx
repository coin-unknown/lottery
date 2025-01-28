import { PartnerConfig } from "@/types";
import { TonConnectButton, TonConnectUIProvider, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { createReferralWallet, claimReferralReward, getRefferalData } from '@coin-unknown/lottery-core';
import CopyLinkInput from "./CopyLinkInput";
import { useEffect, useState } from "react";

interface NotteryProps {
	config: PartnerConfig;
	className?: string;
}

const SITE_PREFIX = 'https://unknown-coin.com/lottery?ref=';

export function Partner(props: NotteryProps) {
	const [tonConnectUI] = useTonConnectUI();
	const wallet = useTonWallet();
	const [refData, setRefData] = useState<{ refReward: number; refWallet: string; }>();

	useEffect(() => {
		if (wallet) {
			getRefferalData(wallet).then((data: any) => {
				setRefData(data);
			});
		}
	}, [tonConnectUI, wallet]);

	if (!wallet) {
		return <TonConnectButton />;
	}

	return <CopyLinkInput link={SITE_PREFIX + refData?.refWallet} />;
}
