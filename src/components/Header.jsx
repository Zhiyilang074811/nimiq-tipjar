import React from 'react'
export default function Header({ balance, connected, account }) {
  return (
    <div style={{background:'linear-gradient(135deg,#1e293b,#0f172a)',padding:'1.5rem 1rem',borderRadius:'0 0 1.5rem 1.5rem',marginBottom:'1rem',boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h1 style={{margin:0,fontSize:'1.5rem',fontWeight:'bold'}}>🌱 TipJar</h1>
          <p style={{margin:'0.25rem 0 0',color:'#94a3b8',fontSize:'0.875rem'}}>Nimiq Mini App</p>
        </div>
        {connected && (
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:'1.25rem',fontWeight:'bold',color:'#00d4aa'}}>{balance.toFixed(2)} NIM</div>
            <div style={{fontSize:'0.75rem',color:'#64748b'}}>{account ? account.slice(0,8) + '...' : ''}</div>
          </div>
        )}
      </div>
    </div>
  )
}
