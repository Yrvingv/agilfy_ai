import React, { useEffect, useState } from 'react'

export default function Metric({ label, value, suffix='' }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setN(value); return }
    let start = performance.now()
    const dur = 900
    const tick = (t) => {
      const p = Math.min(1, (t - start)/dur)
      setN(Math.round(value * p))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])
  return (
    <div className="p-4 rounded-xl bg-surface/70 border border-secondary/40">
      <div className="text-3xl font-bold text-primary drop-shadow">{n}{suffix}</div>
      <div className="text-sm text-neutral">{label}</div>
    </div>
  )
}
