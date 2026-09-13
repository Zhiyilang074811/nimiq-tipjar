import { useState, useEffect } from 'react'
import Header from './components/Header'
import ConnectWallet from './components/ConnectWallet'
import SendTip from './components/SendTip'
import TransactionHistory from './components/TransactionHistory'
import { initNimiq, getBalance } from './utils/nimiq'

export default function App() {
  const [connected, setConnected] = useState(false)
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { checkNimiqProvider() }, [])

  async function checkNimiqProvider() {
    try {
      setError(null)
      const nimiq = await initNimiq()
      if (nimiq) {
        const accounts = await nimiq.listAccounts()
        if (accounts.length > 0) {
          const addr = accounts[0]
          setAccount(addr)
          setConnected(true)
          const bal = await getBalance(addr)
          setBalance(bal)
        } else {
          setError('No Nimiq account found. Create one in Nimiq Pay.')
        }
      } else {
        setError('Nimiq Pay not detected. Open this app inside Nimiq Pay browser.')
      }
    } catch (err) {
      console.error('Connection error:', err)
      setError(err.message || 'Failed to connect to Nimiq')
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
        <ConnectWallet onConnect={() => checkNimiqProvider()} />
      ) : (
        <>
          <SendTip onSend={() => checkNimiqProvider()} />
          <TransactionHistory account={account} />
        </>
      )}
      {!connected && !loading && (
        <div style={{padding:'1rem',textAlign:'center'}}>
          <p style={{color:'#64748b',fontSize:'0.875rem'}}>Open inside Nimiq Pay to connect your wallet</p>
        </div>
      )}
    </div>
  )
}
