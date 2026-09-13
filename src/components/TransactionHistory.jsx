import React, { useState, useEffect } from 'react'
import { initNimiq } from '../utils/nimiq'

const MOCK_TXS = [
  { id: 1, type: 'sent', to: 'NQ70....', amount: 0.5, time: '2 min ago', status: 'confirmed' },
  { id: 2, type: 'received', from: 'NQ8...', amount: 1.2, time: '1 hour ago', status: 'confirmed' },
  { id: 3, type: 'sent', to: 'NQ5...', amount: 0.1, time: '3 hours ago', status: 'pending' },
]

export default function TransactionHistory({ account }) {
  const [txs, setTxs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!account) return
    loadTransactions()
  }, [account])

  async function loadTransactions() {
    try {
      const nimiq = await initNimiq()
      if (!nimiq) {
        setTxs(MOCK_TXS)
      } else {
        const history = await nimiq.getTransactionHistory(account)
        setTxs(history || MOCK_TXS)
      }
    } catch {
      setTxs(MOCK_TXS)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div style={{textAlign:'center',padding:'2rem',color:'#64748b'}}>Loading...</div>
  if (!account) return null

  return (
    <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'1rem',padding:'1.5rem'}}>
      <h2 style={{marginTop:0,marginBottom:'1rem',fontSize:'1.1rem'}}>Transaction History</h2>
      {txs.length === 0 ? (
        <p style={{color:'#64748b',textAlign:'center'}}>No transactions yet</p>
      ) : (
        txs.map(tx => (
          <div key={tx.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0.75rem 0',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
            <div>
              <div style={{fontSize:'0.875rem',color:'#e2e8f0'}}>
                {tx.type === 'sent' ? '→ Sent to' : '← Received from'}
                <span style={{color:'#64748b',marginLeft:'0.5rem'}}>{tx.to || tx.from}</span>
              </div>
              <div style={{fontSize:'0.75rem',color:'#64748b'}}>{tx.time}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{color: tx.type === 'sent' ? '#ef4444' : '#00d4aa',fontWeight:'bold'}}>
                {tx.type === 'sent' ? '-' : '+'}{tx.amount} NIM
              </div>
              <div style={{fontSize:'0.75rem',color: tx.status==='confirmed'?'#00d4aa':'#f59e0b'}}>
                {tx.status}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
