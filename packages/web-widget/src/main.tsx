import React, { createRef } from "react";
import ReactDOM from "react-dom/client";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Nottery, NotteryRef } from "./components/Lottery/Nottery";
import classes from "./styles.module.scss";
import { WidgetConfig } from "./types";

declare global {
	interface Window {
    createWidget: (config: WidgetConfig) => void;
		lotteryWidget: NotteryRef | null;
	}
}

const createWidget = (config: WidgetConfig) => {
	const lotteryRef = createRef<NotteryRef>();
	const widgetContainer = document.getElementById(config.containerId);

	if (!widgetContainer) {
		throw new Error("Widget container not found");
	}

	// Assign to global window object
	window.lotteryWidget = lotteryRef.current;
  
	const root = ReactDOM.createRoot(widgetContainer);

	root.render(
		<React.StrictMode>
			<TonConnectUIProvider
				manifestUrl="https://app.unknown-coin.com/tonconnect-manifest.json"
				actionsConfiguration={{
					twaReturnUrl: "https://unknown-coin.com/lottery",
				}}
			>
				<div className={classes.widgetContainer}>
					<Nottery
						ref={lotteryRef}
						className={classes.widget}
						config={config}
					/>
				</div>
			</TonConnectUIProvider>
		</React.StrictMode>
	);
};

window.createWidget = createWidget;