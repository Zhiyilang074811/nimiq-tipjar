import React, { useState } from 'react'
export default function ConnectWallet({ onConnect }) {
  return (
    <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'1rem',padding:'2rem',textAlign:'center'}}>
      <div style={{fontSize:'3rem',marginTop:'1rem'}}>⚡</div>
      <h2 style={{marginTop:'0.5rem'}}>Connect Your Wallet</h2>
      <p style={{color:'#94a3b8',marginTop:'0.5rem'}}>Link your Nimiq wallet to start sending tips</p>
      <button onClick={onConnect} style={{background:'linear-gradient(135deg,#00d4aa 0%,#00b894 100%)',color:'#0f172a',fontWeight:'bold',padding:'1rem 2rem',border:'none',borderRadius:'0.75rem',fontSize:'1rem',cursor:'pointer',width:'100%',marginTop:'1.5rem'}}>
        Connect Nimiq Wallet
      </button>
      <p style={{color:'#64748b',fontSize:'0.75rem',marginTop:'1rem'}}>By connecting you agree to our Terms</p>
    </div>
  )
}
