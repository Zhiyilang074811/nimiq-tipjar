import { useState, useEffect } from 'react'
import Header from './components/Header'
import ConnectWallet from './components/ConnectWallet'
import SendTip from './components/SendTip'
import TransactionHistory from './components/TransactionHistory'
import { initX402, getBalance } from './utils/x402'

export default function App() {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { checkx402Provider() }, [])

  async function checkx402Provider() {
    try {
      setError(null)
      const x402 = await initX402()
      if (x402) {
        const accounts = await x402.listAccounts()
        if (accounts.length > 0) {
          const addr = accounts[0]
          setAccount(addr)
          setConnected(true)
          const bal = await getBalance(addr)
          setBalance(bal)
        } else {
          setError('No x402 account found. Create one in x402 Wallet.')
        }
      } else {
        setError('x402 Wallet not detected. Open this app inside x402 Wallet browser.')
      }
    } catch (err) {
      console.error('Connection error:', err)
      setError(err.message || 'Failed to connect to x402')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'linear-gradient(180deg,#0f172a,#1e293b)'}}>
        <div style={{fontSize:'3rem',marginBottom:'1rem'}}>⚡</div>
        <p style={{color:'#94a3b8'}}>Loading TipJar...</p>
      </div>
    )
  }

  return (
    <div style={{maxWidth:'480px',margin:'0 auto',padding:'1rem'}}>
      <Header balance={balance} connected={connected} account={account} />
      {error && (
        <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:'12px',padding:'1rem',marginBottom:'1rem',color:'#fca5a5',textAlign:'center'}}>
          {error}
        </div>
      )}
      {!connected ? (
        <ConnectWallet onConnect={() => checkx402Provider()} />
      ) : (
        <>
          <SendTip onSend={() => checkx402Provider()} />
          <TransactionHistory account={account} />
        </>
      )}
      {!connected && !loading && (
        <div style={{padding:'1rem',textAlign:'center'}}>
          <p style={{color:'#64748b',fontSize:'0.875rem'}}>Open inside x402 Wallet to connect your wallet</p>
        </div>
      )}
    </div>
  )
}
