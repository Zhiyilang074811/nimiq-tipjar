// @ts-nocheck
import { useEffect, useState } from 'react';
import { useNimiq as useNimiqRaw } from '../hooks/useNimiq';

export default function WalletConnect() {
  const { connected, address, loading, connect, disconnect, error } = useNimiqRaw() as any;
  const [shortAddr, setShortAddr] = useState('');

  useEffect(() => {
    if (address) {
      setShortAddr(address.slice(0, 6) + '...' + address.slice(-4));
    }
  }, [address]);

  return (
    <div className="w-full max-w-sm mx-auto mb-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 glow">
        <h2 className="text-lg font-semibold text-nimiq-gold mb-4 flex items-center gap-2">
          <span className="text-2xl">🔗</span> Connect Wallet
        </h2>
        {!connected ? (
          <button
            onClick={connect}
            disabled={loading}
            className="w-full py-3 px-4 bg-nimiq-gold hover:bg-yellow-400 text-gray-900 font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connecting...' : 'Connect Nimiq Pay'}
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-black/30 rounded-xl px-4 py-3">
              <span className="text-sm text-gray-300">Address</span>
              <span className="text-xs font-mono text-nimiq-gold">{shortAddr}</span>
            </div>
            <button
              onClick={disconnect}
              className="w-full py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-xl transition-all duration-200 text-sm"
            >
              Disconnect
            </button>
          </div>
        )}
        {error && (
          <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
