# Lottery System by UNKNOWN COIN team

This repository contains the core functionalities and integration examples for a decentralized lottery system on the TON blockchain.

## Features
- Lottery ticket purchasing and management
- Referral system for affiliates
- Prize pool management
- Integration with TON wallets
- Web and server-side integration examples

## Installation

```sh
npm install
```

## Usage

### Web Integration Example
Below is an example of integrating the lottery system into a web page:

```html
<script>
    window.addEventListener("load", async () => {
        const refAddress = new URLSearchParams(location.search).get("ref");
        const refLintInput = document.getElementById("refLink");
        const copyReferralButton = document.getElementById("copyReferral");

        function copyReferral() {
            const copyText = document.getElementById("refLink");
            copyText.select();
            document.execCommand("copy");
            alert("Referral link copied!");
        }

        refLintInput.addEventListener("click", copyReferral);
        copyReferralButton.addEventListener("click", copyReferral);

        let cleanup = () => null;

        const onConnected = async (lotteryWidget) => {
            cleanup();

            const buyTicketsButton = document.getElementById("buy-tickets");
            const registrationButton = document.getElementById("registration");
            const registrationSpinner = document.getElementById("affilateRegistrationSpinner");
            const refRewardSpan = document.getElementById("refReward");
            const refWalletActive = document.getElementById("affilateActive");
            const prizePoolSpan = document.getElementById("pool");
            const refWalletRegistration = document.getElementById("affilateRegistration");

            registrationSpinner.style.display = "none";
            registrationButton.removeAttribute("disabled");

            lotteryWidget.getRoundData().then((round) => {
                prizePoolSpan.innerText = `$ ${Math.floor(round.roundPot * 5.5)}`;
            });

            const buyTicketCallback = () => {
                lotteryWidget.buyTickets(1, refAddress);
                setTimeout(() => onConnected(lotteryWidget), 30000);
            };

            const registrationCallback = async () => {
                await lotteryWidget.registerRefWallet();
                registrationSpinner.style.display = "flex";
                registrationButton.setAttribute("disabled", "disabled");
                setTimeout(() => onConnected(lotteryWidget), 30000);
            };

            buyTicketsButton.addEventListener("click", buyTicketCallback);
            registrationButton.addEventListener("click", registrationCallback);

            const { refReward = 0, refWallet = null } = (await lotteryWidget.getRefData()) || {};

            if (!refWallet) {
                refWalletActive.style.display = "none";
                refWalletRegistration.style.display = "flex";
            } else {
                refWalletActive.style.display = "flex";
                refWalletRegistration.style.display = "none";
                refLintInput.value = `https://unknown-coin.com/lottery.html?ref=${refWallet}`;
                refRewardSpan.innerText = `${refReward} TON`;
            }

            cleanup = () => {
                buyTicketsButton.removeEventListener("click", buyTicketCallback);
                registrationButton.removeEventListener("click", registrationCallback);
            };
        };

        window.createWidget({
            containerId: "lottery-widget",
            refferalWallet: refAddress,
            onConnected,
        });
    });
</script>
```

### Server Integration Example
Below is an example of integrating the lottery system on a Node.js server:

```javascript
import express from 'express';
import { buyTicketsNode } from '@coin-unknown/lottery-core/node';

const MNEMONIC = 'famous lift cousin ...';

const app = express();
app.use(express.json());

app.post('/buy-ticket', async (req, res) => {
    const { roundIdx, quantity, cost, recipient, refWallet } = req.body;
    const result = await buyTicketsNode({ mnemonic: MNEMONIC, roundIdx, qty: quantity, cost, recipient, refWallet });
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
});

const PORT = 27016;
app.listen(PORT, () => {
    console.log(`Lottery ticket service is running on port ${PORT}`);
});
```

## License
MIT

