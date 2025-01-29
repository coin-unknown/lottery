import {
	getLastRoundId,
	createReferralWallet,
	getRefferalData,
	claimReferralReward,
	getTicketsPrice,
	buyTicket,
} from "@coin-unknown/lottery-core";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useState, useEffect, useRef, useImperativeHandle, RefObject } from "react";
import { NotteryRef } from "../Nottery";

export const useLotteryWidget = (ref: RefObject<NotteryRef>, onConnected?: (ref: NotteryRef | null) => void) => {
	const isReadyRef = useRef(false);
	const [tonConnectUI] = useTonConnectUI();
	const wallet = useTonWallet();
	const [roundIdx, setRoundIdx] = useState<number | null>(null);

	// Fetch referral wallet data
	const getRefData = async () => {
		if (!wallet) {
			return null;
		}

		return getRefferalData(wallet)
	};

	const buyTickets = async (qty: number, refWallet?: string) => {
		if (!wallet) {
			tonConnectUI.openModal();
		}
		if (roundIdx === null) {
			alert("Lottery round not found.");
			return;
		}
		try {
			const cost = await getTicketsPrice(roundIdx, qty);
			await buyTicket(tonConnectUI, roundIdx, qty, cost, refWallet);
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
			await createReferralWallet(tonConnectUI);
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
			await claimReferralReward(tonConnectUI);
		} catch (error) {
			console.error("Error claiming referral reward:", error);
		}
	};

	// Expose methods via useImperativeHandle
	useImperativeHandle(ref, () => ({
		buyTickets,
		registerRefWallet,
		claimRefReward,
		getRefData,
	}));

	useEffect(() => {
        if (isReadyRef.current && ref) {
			onConnected?.(ref.current);
        }
    }, [wallet]); // Отслеживаем изменения

	useEffect(() => {
		// Last round is ready to work
		if (!isReadyRef.current && typeof roundIdx === 'number' && roundIdx >= 0) {
			isReadyRef.current = true;
			onConnected?.(ref.current);
		}
	}, [roundIdx, onConnected]);

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
};
