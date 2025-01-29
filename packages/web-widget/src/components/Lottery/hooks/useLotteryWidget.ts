import {
	getLastRoundId,
	createReferralWallet,
	getRefferalData,
	claimReferralReward,
	getTicketsPrice,
	buyTicket,
} from "@coin-unknown/lottery-core";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useState, useEffect, useRef } from "react";

export const useLotteryWidget = (onReady: () => void) => {
	const isReadyRef = useRef(false);
	const [tonConnectUI] = useTonConnectUI();
	const wallet = useTonWallet();
	const [refWallet, setRefWallet] = useState<string | null>(null);
	const [refBalance, setRefBalance] = useState<number>(0);
	const [roundIdx, setRoundIdx] = useState<number | null>(null);

	useEffect(() => {
		// Last round is ready to work
		if (!isReadyRef.current && typeof roundIdx === 'number' && roundIdx >= 0) {
			isReadyRef.current = true;
			onReady();
		}
	}, [roundIdx, onReady]);

	// Fetch last round index on mount
	useEffect(() => {
		const fetchRoundIdx = async () => {
			try {
				const round = await getLastRoundId();
				setRoundIdx(round);
			} catch (error) {
				console.error("Error fetching last round index:", error);
			}
		};
		fetchRoundIdx();
	}, []);

	// Fetch referral wallet data
	useEffect(() => {
		if (wallet) {
			getRefferalData(wallet)
				.then(({ refWallet, refReward }) => {
					setRefWallet(refWallet);
					setRefBalance(refReward);
				})
				.catch(console.error);
		}
	}, [wallet]);

	const buyTickets = async (qty: number) => {
		if (!wallet) {
			tonConnectUI.openModal();
		}
		if (!roundIdx) {
			alert("Lottery round not found.");
			return;
		}
		try {
			const cost = await getTicketsPrice(roundIdx, qty);
			await buyTicket(wallet, roundIdx, qty, cost, refWallet || undefined);
		} catch (error) {
			console.error("Error buying tickets:", error);
		}
	};

	const registerRefWallet = async () => {
		if (!wallet) {
            tonConnectUI.openModal();
			return;
		}
		try {
			await createReferralWallet(wallet);
		} catch (error) {
            console.error("Error registering referral wallet:", error);
		}
	};

	const claimRefReward = async () => {
		if (!wallet) {
            tonConnectUI.openModal();
			return;
		}
		try {
			await claimReferralReward(wallet);
		} catch (error) {
			console.error("Error claiming referral reward:", error);
		}
	};

	return {
		buyTickets,
		registerRefWallet,
		claimRefReward,
		refWallet,
		refBalance,
		wallet,
	};
};
