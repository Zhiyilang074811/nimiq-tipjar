// @ts-nocheck
import { useState, useCallback, useEffect, useRef } from 'react';
import { init, NimiqProvider } from '@nimiq/mini-app-sdk';

let _provider = null;
let _connectedAddress = null;
let _balance = null;
let _transactions = [];
let _stateListeners = new Set();

function notifyListeners() { _stateListeners.forEach(fn => fn()); }
function lunasToNim(lunas) { return lunas / 100000; }

export function useNimiq() {
  const [state, setState] = useState({ connected: false, address: null, balance: null, error: null, loading: false });
  const [transactions, setTransactions] = useState([]);
  const initializedRef = useRef(false);
  const updateState = useCallback((partial) => { setState(s => ({ ...s, ...partial})); notifyListeners(); }, []);
  const initSdk = useCallback(async () => {
    if (initializedRef.current) return; initializedRef.current = true;
    try { _provider = await init(); console.log('[TipJar] SDK init'); }
    catch (err) { console.warn('[TipJar] SDK not in Pay:', err?.message); _provider = null; }
  }, []);
  const connect = useCallback(async () => {
    updateState({ loading: true, error: null });
    try {
      if (!_provider) { await initSdk(); if (!_provider) throw new Error('Nimiq Pay not detected'); }
      await _provider.connect();
      const accounts = await _provider.listAccounts();
      if (accounts.error) throw new Error(accounts.error.message || 'Connection failed');
      if (!accounts.length) throw new Error('No accounts');
      _connectedAddress = accounts[0];
      try { const rpc = _provider.getRPC(); if (rpc) { const bal = await rpc.call({jsonrpc:'2.0',method:'getAccountBalance',params:[_connectedAddress]}); _balance = bal != null ? lunasToNim(bal) : 0; } } catch { _balance = 0; }
      updateState({ connected: true, address: _connectedAddress, balance: _balance, error: null, loading: false });
      setTransactions([..._transactions]);
    } catch (err) { updateState({ connected: false, address: null, balance: null, error: err?.message || 'Failed', loading: false }); }
  }, [initSdk, updateState]);
  const disconnect = useCallback(() => { if (_provider) { try { _provider.disconnect(); } catch {} } _connectedAddress = null; _balance = null; updateState({ connected: false, address: null, balance: null, error: null, loading: false }); setTransactions([]); }, [updateState]);
  const refreshBalance = useCallback(async () => { if (!_provider || !_connectedAddress) return; try { const rpc = _provider.getRPC(); if (rpc) { const bal = await rpc.call({jsonrpc:'2.0',method:'getAccountBalance',params:[_connectedAddress]}); _balance = bal != null ? lunasToNim(bal) : 0; updateState({ balance: _balance }); } } catch { updateState({ error: 'Refresh failed' }); } }, [updateState]);
  const sendTip = useCallback(async (to, amountNim) => { if (!_provider) return false; const value = Math.round(amountNim * 100000); try { const result = await _provider.sendBasicTransaction({ recipient: to.toUpperCase(), value, fee: 10000 }); if (result.error) throw new Error(result.error.message || 'Tx failed'); const newTx = { id: 'tx_' + Date.now(), to, amount: amountNim, timestamp: Date.now(), status: 'pending', hash: result }; _transactions = [newTx, ..._transactions]; setTransactions([..._transactions]); setTimeout(() => { _transactions[0] = { ..._transactions[0], status: 'confirmed' }; setTransactions([..._transactions]); }, 5000); return true; } catch (err) { throw new Error(err?.message || 'Send failed'); } }, []);
  useEffect(() => { _stateListeners.add(notifyListeners); initSdk(); return () => { _stateListeners.delete(notifyListeners); }; }, [initSdk]);
  return { ...state, transactions, connect, disconnect, refreshBalance, sendTip };
}
