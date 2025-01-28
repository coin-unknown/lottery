import { PartnerConfig } from "@/types";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Partner } from "./Partner";

interface PartnerWidgetProps {
	config: PartnerConfig;
	className?: string;
}

export function PartnerWidget(props: PartnerWidgetProps) {
	return (
		<TonConnectUIProvider
			manifestUrl="https://app.unknown-coin.com/tonconnect-manifest.json"
			actionsConfiguration={{
				twaReturnUrl: "https://unknown-coin.com/lottery",
			}}
		>
      		<Partner config={props.config}/>
		</TonConnectUIProvider>
	);
}
