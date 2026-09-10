// @ts-nocheck
import { useState } from 'react';
import { useNimiq } from '../hooks/useNimiq';

export default function TipForm() {
  const { connected, balance, sendTip, loading } = useNimiq();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!connected) return;
    setResult(null);
    const amt = parseFloat(amount);
    if (!recipient.trim()) { setResult({ ok: false, msg: 'Please enter a recipient address' }); return; }
    if (isNaN(amt) || amt <= 0) { setResult({ ok: false, msg: 'Please enter a valid amount' }); return; }
    if (balance !== null && amt > balance) { setResult({ ok: false, msg: 'Insufficient balance' }); return; }
    try {
      await sendTip(recipient.trim(), amt);
      setResult({ ok: true, msg: 'Tip sent successfully!' });
      setRecipient('');
      setAmount('');
    } catch (err) {
      setResult({ ok: false, msg: err?.message || 'Send failed' });
    }
  };

  if (!connected) return null;

  return (
    <div className="w-full max-w-sm mx-auto mb-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 glow">
        <h2 className="text-lg font-semibold text-nimiq-gold mb-4 flex items-center gap-2">
          <span className="text-2xl">✉️</span> Send a Tip
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Nq..."
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-nimiq-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount (NIM)</label>
            <input
              type="number"
              step="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0000"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-nimiq-gold transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-nimiq-gold hover:bg-yellow-400 text-gray-900 font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Tip'}
          </button>
        </form>
        {result && (
          <p className={`mt-3 text-sm text-center ${result.ok ? 'text-green-400' : 'text-red-400'}`}>
            {result.msg}
          </p>
        )}
      </div>
    </div>
  );
}
