import React, { useState } from 'react'

export default function SecureDownload({ itemId }) {
  const [token, setToken] = useState('')
  const [status, setStatus] = useState(null)

  async function claim() {
    try {
      setStatus('Procesando...')
      const res = await fetch('/api/claim-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, itemId })
      })
      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
        setStatus('Enlace generado (expira pronto).')
      } else {
        setStatus(data.error || 'Error desconocido')
      }
    } catch {
      setStatus('No se pudo contactar el servidor')
    }
  }

  return (
    <div className="p-3 rounded-xl bg-surface/60 border border-secondary/40">
      <div className="text-sm mb-2">Descarga protegida � token de un solo uso</div>
      <div className="flex gap-2">
        <input
          value={token}
          onChange={e=>setToken(e.target.value)}
          placeholder="Ingres� tu token"
          className="flex-1 px-3 py-2 rounded-lg bg-background border border-secondary/40 outline-none focus:ring-2 focus:ring-primary/60"
        />
        <button onClick={claim} className="px-4 py-2 rounded-lg bg-primary text-background font-medium">Desbloquear</button>
      </div>
      {status && <div className="mt-2 text-sm text-neutral">{status}</div>}
    </div>
  )
}
