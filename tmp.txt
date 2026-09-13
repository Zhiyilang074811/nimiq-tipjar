// Nimiq Mini App SDK wrapper
// Uses @nimiq/mini-app-sdk for wallet connection and transactions

let nimiqClient = null

export async function initNimiq() {
  if (nimiqClient) return nimiqClient
  try {
    const { init } = await import('@nimiq/mini-app-sdk')
    nimiqClient = await init()
    return nimiqClient
  } catch (err) {
    console.warn('Nimiq SDK not available (not in Nimiq Pay):', err.message)
    return null
  }
}

export async function connectWallet() {
  const nimiq = await initNimiq()
  if (!nimiq) throw new Error('Nimiq Pay not detected. Open this app inside Nimiq Pay.')
  const accounts = await nimiq.listAccounts()
  if (accounts.length === 0) throw new Error('No Nimiq account found. Please create one in Nimiq Pay.')
  return accounts[0]
}

export async function getBalance(address) {
  const nimiq = await initNimiq()
  if (!nimiq) return 0
  try {
    const balance = await nimiq.getBalance(address)
    return balance ? balance / 100000 : 0
  } catch {
    return 0
  }
}

export async function sendTip(recipient, amountNim, memo = '') {
  const nimiq = await initNimiq()
  if (!nimiq) throw new Error('Nimiq Pay not available')
  const sender = await nimiq.listAccounts()
  if (sender.length === 0) throw new Error('No account available')
  const amountNmq = Math.round(amountNim * 100000)
  const tx = {
    type: 'payment',
    recipient: recipient,
    amount: amountNmq,
    fee: 10000,
    validityStartHeight: await nimiq.getBlockNumber(),
  }
  if (memo) tx.memo = memo
  const result = await nimiq.sendTransaction(tx)
  return result
}

export async function validateAddress(address) {
  const nimiq = await initNimiq()
  if (!nimiq) return true
  try {
    const parsed = await nimiq.parseAddress(address)
    return !!parsed
  } catch {
    return false
  }
}
