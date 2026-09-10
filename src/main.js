// Nimiq TipJar Mini App
// SDK v0.1.0 API: init(), getHostLanguage(), requestDeviceIdentifier()
import { init, getHostLanguage } from '@nimiq/mini-app-sdk';

let nimiq = null;

async function main() {
  console.log('Nimiq TipJar initializing...');
  
  const locale = getHostLanguage() ?? 'en';
  console.log('Host language:', locale);
  
  try {
    nimiq = await init({ timeout: 15000 });
    console.log('Nimiq provider ready');
    
    const accounts = await nimiq.listAccounts();
    if (accounts && !('error' in accounts)) {
      console.log('Accounts:', accounts);
      updateUI(accounts[0] ?? null, locale);
    } else {
      console.warn('No accounts or error:', accounts);
      updateUI(null, locale);
    }
  } catch (err) {
    console.error('Nimiq init failed:', err.message);
    updateUI(null, locale);
  }
}

function updateUI(account, locale) {
  const el = (id) => document.getElementById(id);
  if (!el) return;
  
  const statusEl = el('status');
  const btnEl = el('tipBtn');
  const acctEl = el('account');
  
  if (account) {
    statusEl.textContent = 'Connected as ' + account.substring(0, 10) + '...';
    btnEl.disabled = false;
    acctEl.textContent = account;
    btnEl.onclick = async () => {
      const amount = parseFloat(el('amount').value) || 0.01;
      const value = Math.round(amount * 100000); // NIM to Lunas
      try {
        // TODO: Replace with your actual TipJar address
        const txHash = await nimiq.sendBasicTransaction({ 
          recipient: 'NQ54 0000 0000 0000 0000 0000 0000 0000 0000', 
          value 
        });
        if (txHash.error) {
          el('result').textContent = 'Failed: ' + txHash.error.message;
        } else {
          el('result').textContent = 'Sent ' + amount + ' NIM! Hash: ' + txHash.substring(0, 20) + '...';
        }
      } catch(e) {
        el('result').textContent = 'Error: ' + e.message;
      }
    };
  } else {
    statusEl.textContent = locale === 'zh' ? '未连接钱包，请点击按钮授权' : 'Connect wallet to start tipping';
    btnEl.disabled = true;
  }
}

document.addEventListener('DOMContentLoaded', main);
