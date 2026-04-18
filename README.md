# AI Finance — DeFi App with AI Integration

A decentralized finance (DeFi) frontend built with React, featuring AI-powered price prediction, token staking, and a real-time asset dashboard.

## Tech Stack
- **React 18** — UI framework
- **Recharts** — Charts (bar chart, area/sparkline)
- **CSS Modules** — Scoped component styles
- **Google Fonts** — Syne (display) + DM Sans (body) + DM Mono (mono)

> Web3.js / MetaMask / smart contract integration comes in the next phase. All blockchain calls are currently mocked with comments showing where to plug in the real calls.

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm start
```
Opens at `http://localhost:3000`

### 3. Build for production
```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.js / .module.css       — Top navigation bar
│   ├── StatCard.js / .module.css     — Reusable metric card
│   ├── Toast.js / .module.css        — Notification toast
│   └── WalletBanner.js / .module.css — Connect wallet prompt
│
├── pages/
│   ├── Home.js / .module.css         — Landing page
│   ├── Dashboard.js / .module.css    — Portfolio dashboard
│   ├── Staking.js / .module.css      — Token staking
│   └── Predict.js / .module.css      — AI price prediction
│
├── styles/
│   ├── global.css                    — CSS variables + base reset
│   └── App.module.css                — App shell layout
│
├── App.js                            — Root component + routing state
└── index.js                          — React entry point
```

---

## Next Steps (Phase 2 — Blockchain Integration)

### MetaMask connection
In `App.js`, replace the mock wallet connect with:
```js
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
setWallet(accounts[0]);
```

### Read ETH balance
```js
import { ethers } from 'ethers';
const provider = new ethers.BrowserProvider(window.ethereum);
const balance  = await provider.getBalance(accounts[0]);
console.log(ethers.formatEther(balance));
```

### Staking smart contract interaction
In `Staking.js`, replace `handleStake()` with:
```js
const provider = new ethers.BrowserProvider(window.ethereum);
const signer   = await provider.getSigner();
const contract = new ethers.Contract(STAKING_ADDRESS, STAKING_ABI, signer);
const tx       = await contract.stake(ethers.parseUnits(amount, 18));
await tx.wait();
```

### AI prediction API
In `Predict.js`, replace the `setTimeout` mock with:
```js
const res  = await fetch('/api/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ asset, timeframe }),
});
const data = await res.json();
```

---

## Deployment
```bash
npm run build
# Deploy the /build folder to Vercel, Netlify, or any static host
```
For Vercel:
```bash
npx vercel --prod
```
