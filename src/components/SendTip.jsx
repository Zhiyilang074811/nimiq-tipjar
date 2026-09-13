import React, { useState } from 'react'
import { sendTip } from '../utils/nimiq'

export default function SendTip({ onSend }) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)

  async function handleSend(e) {
    e.preventDefault()
    if (!recipient || !amount) return
    setSending(true)
    setResult(null)
    try {
      const tx = await sendTip(recipient, parseFloat(amount))
      setResult({ success: true, hash: tx.hash })
      setRecipient('')
      setAmount('')
      if (onSend) onSend()
    } catch (err) {
      setResult({ success: false, error: err.message })
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'1rem',padding:'1.5rem',marginBottom:'1rem'}}>
      <h2 style={{marginTop:'1rem'}}>Send a Tip</h2>
      <form onSubmit={handleSend}>
        <div style={{marginBottom:'1rem'}}>
          <label style={{display:'block',marginBottom:'0.5rem',color:'#94a3b8',fontSize:'0.875rem'}}>Recipient Address</label>
          <input type='text' value={recipient} onChange={(e)=>setRecipient(e.target.value)} placeholder='Enter Nimiq address...' style={{width:'100%',padding:'14px 16px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.2)',background:'rgba(255,255,255,0.08)',color:'white',fontSize:'16px',outline:'none'}} />
        </div>
        <div style={{marginBottom:'1rem'}}>
          <label style={{display:'block',marginBottom:'0.5rem',color:'#94a3b8',fontSize:'0.875rem'}}>Amount (NIM)</label>
          <input type='number' step='0.01' min='0.01' value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder='0.00' style={{width:'100%',padding:'14px 16px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.2)',background:'rgba(255,255,255,0.08)',color:'white',fontSize:'16px',outline:'none'}} />
        </div>
        <button type='submit' disabled={sending||!recipient||!amount} style={{background:'linear-gradient(135deg,#00d4aa 0%,#00b894 100%)',color:'#0f172a',fontWeight:'bold',padding:'14px 28px',border:'none',borderRadius:'12px',fontSize:'16px',cursor:sending?'not-allowed':'pointer',width:'100%',opacity:sending||!recipient||!amount?0.5:1}}>
          {sending ? 'Sending...' : 'Send Tip'}
        </button>
        {result && (
          <div style={{marginTop:'1rem',padding:'1rem',borderRadius:'12px',background:result.success?'rgba(0,212,170,0.1)':'rgba(239,68,68,0.1)',color:result.success?'#00d4aa':'#ef4444',fontSize:'0.875rem',textAlign:'center'}}>
            {result.success ? <>Success! Hash: {result.hash?.slice(0,10)}...</> : <>Error: {result.error}</>}
          </div>
        )}
      </form>
    </div>
  )
}
