// @ts-nocheck
import { useNimiq } from '../hooks/useNimiq';

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function TransactionHistory() {
  const { connected, transactions } = useNimiq();

  if (!connected) return null;

  return (
    <div className="w-full max-w-sm mx-auto mb-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
        <h2 className="text-lg font-semibold text-nimiq-gold mb-4 flex items-center gap-2">
          <span className="text-2xl">📋</span> Recent Tips
        </h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-6 text-sm">No transactions yet</p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between bg-black/30 rounded-xl px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-gray-400 truncate">{tx.to.slice(0, 8)}...</p>
                  <p className="text-xs text-gray-500">{formatTime(tx.timestamp)}</p>
                </div>
                <div className="text-right ml-3">
                  <p className="text-sm font-semibold text-white">-{tx.amount.toFixed(4)} NIM</p>
                  <p className={`text-xs ${tx.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {tx.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
