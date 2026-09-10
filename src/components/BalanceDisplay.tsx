// @ts-nocheck
import { useNimiq } from '../hooks/useNimiq';

export default function BalanceDisplay() {
  const { connected, balance, loading, refreshBalance } = useNimiq();

  if (!connected) return null;

  return (
    <div className="w-full max-w-sm mx-auto mb-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 glow">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-nimiq-gold flex items-center gap-2">
            <span className="text-2xl">💰</span> Balance
          </h2>
          <button
            onClick={refreshBalance}
            disabled={loading}
            className="text-xs text-gray-400 hover:text-nimiq-gold transition-colors disabled:opacity-50"
          >
            {loading ? '↻' : '↻ Refresh'}
          </button>
        </div>
        <p className="text-4xl font-bold text-white text-center my-4 float">
          {balance !== null ? balance.toFixed(4) : '—'}
          <span className="text-lg text-nimiq-gold ml-2">NIM</span>
        </p>
      </div>
    </div>
  );
}
