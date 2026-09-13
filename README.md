# Nimiq TipJar

A Nimiq Pay mini app for instant micro-tipping in NIM.

## Overview

Nimiq TipJar is a lightweight mini app built with the Nimiq Mini App SDK. It runs directly inside Nimiq Pay, allowing users to connect their wallet, check balance, send tips, and view transaction history in a clean mobile-first interface.

## Features

- One-click wallet connection via Nimiq Pay
- Real-time NIM balance display
- Send micro-tips with recipient address and amount
- Transaction history tracking
- Error handling and loading states
- Responsive UI for mobile and desktop
- Built with React 18, Vite 5, Tailwind CSS, and @nimiq/mini-app-sdk

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- @nimiq/mini-app-sdk
- JavaScript / JSX

## Project Structure

src/
  App.jsx
  components/
    Header.jsx
    ConnectWallet.jsx
    SendTip.jsx
    TransactionHistory.jsx
  utils/
    nimiq.js
  styles/
    main.css

## Getting Started

### Install dependencies

bash
npm install

### Run locally

bash
npm run dev

### Build for production

bash
npm run build

The production output is generated in dist/.

## Demo

- Live App: [Add your Vercel URL]
- Demo Video: [Add your video URL]
- GitHub: [Add your GitHub URL]

## How It Works

1. User opens the mini app inside Nimiq Pay.
2. User connects their wallet.
3. The app reads and displays the current NIM balance.
4. User enters a recipient address and tip amount.
5. The app sends the transaction through the Nimiq Mini App SDK.
6. The transaction appears in the history section.

## Roadmap

- QR code tipping
- Multi-recipient split payments
- Social sharing to X / Telegram
- Leaderboard for top supporters
- Fiat on-ramp integration
- Multi-language support

## Team

Stitch - CSDN 3000+ follower blogger, AI x Web3 builder.

## License

MIT
