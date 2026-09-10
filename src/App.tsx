// @ts-nocheck
import WalletConnect from './components/WalletConnect';
import BalanceDisplay from './components/BalanceDisplay';
import TipForm from './components/TipForm';
import TransactionHistory from './components/TransactionHistory';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-sm text-center mb-6">
        <h1 className="text-3xl font-bold text-nimiq-gold mb-1 float">Nimiq TipJar</h1>
        <p className="text-gray-400 text-sm">Send tips instantly via Nimiq Pay</p>
      </div>
      <WalletConnect />
      <BalanceDisplay />
      <TipForm />
      <TransactionHistory />
      <footer className="mt-4 text-center">
        <p className="text-xs text-gray-600">Built for Nimiq Mini Apps Competition 2026</p>
      </footer>
    </div>
  );
}
