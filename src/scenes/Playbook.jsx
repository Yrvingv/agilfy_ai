import React, { useEffect, useMemo, useState } from 'react'
import data from '../data/playbook.json'
import PlaybookCard from '../components/PlaybookCard'

// Normaliza búsqueda (sin tildes)
const norm = (s) => (s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function Playbook() {
  const [q, setQ] = useState('')
  const [rubro, setRubro] = useState('todos')
  const [dolor, setDolor] = useState('todos')

  // Valor hora (USD) — global en localStorage
  const [hourUSD, setHourUSD] = useState(() => {
    try { return localStorage.getItem('agilfy_hour_usd') || '' } catch { return '' }
  })
  const rateUSD = Number(hourUSD) > 0 ? Number(hourUSD) : null
  useEffect(() => {
    try {
      if (hourUSD === '' || Number.isNaN(Number(hourUSD))) localStorage.removeItem('agilfy_hour_usd')
      else localStorage.setItem('agilfy_hour_usd', String(hourUSD))
    } catch {}
  }, [hourUSD])

  const rubros = useMemo(() => {
    const set = new Set()
    data.forEach(d => (d.rubros || []).forEach(r => set.add(r)))
    return ['todos', ...Array.from(set)]
  }, [])
  const dolores = useMemo(() => {
    const set = new Set()
    data.forEach(d => d.dolor && set.add(d.dolor))
    return ['todos', ...Array.from(set)]
  }, [])

  // Filtro acento-insensible
  const items = data.filter(d => {
    const nq = norm(q)
    const hayQuery = nq.length > 0
    const objetivo = norm(`${d.titulo} ${d.valor} ${(d.stack || []).join(' ')} ${(d.rubros || []).join(' ')} ${d.dolor || ''}`)
    const okQ = hayQuery ? objetivo.includes(nq) : true
    const okRubro = rubro === 'todos' ? true : (d.rubros || []).some(r => norm(r) === norm(rubro))
    const okDolor = dolor === 'todos' ? true : norm(d.dolor || '') === norm(dolor)
    return okQ && okRubro && okDolor
  })

  return (
    <section
      id="playbook"
      className="panel relative w-screen h-screen flex-none" // altura EXACTA de viewport
    >
      {/* Respeta Navbar arriba y Sidebar a la izquierda en desktop */}
      <div className="h-full max-w-6xl mx-auto md:pl-[13rem] px-4 md:px-6">
        {/* Columna que ocupa toda la altura; la parte de abajo scrollea */}
        <div className="h-full flex flex-col pt-20 md:pt-24 pb-28 md:pb-12">
          {/* Header (no scrollea) */}
          <header className="mb-2">
            <h1 className="text-2xl md:text-4xl font-bold">Playbook de Automatizaciones</h1>
            <p className="text-text/90 text-sm md:text-base">
              Ideas listas para aplicar. Cada tarjeta muestra el ahorro estimado; si indicás tu hora, también lo verás en USD.
            </p>
          </header>

          {/* Controles sticky dentro del área scrollable */}
          <div className="sticky top-20 md:top-24 z-10 -mx-4 md:-mx-6 px-4 md:px-6 py-3 bg-background/75 backdrop-blur border-b border-secondary/30">
               {/* Controles compactos y nivelados */}
            <div className="grid gap-3 md:grid-cols-12 md:items-end mb-5">
              {/* Buscar */}
              <div className="md:col-span-5 flex flex-col">
                <input
                  aria-label="Buscar"
                  value={q}
                  onChange={(e)=>setQ(e.target.value)}
                  placeholder="Buscar (ej. 'facturas', 'dashboard', 'bot')"
                  className="h-10 w-full px-3 rounded-xl bg-surface/60 border border-secondary/40 outline-none focus:ring-2 focus:ring-primary/60 text-sm"
                />
                <p className="mt-1 text-[11px] text-text/60 h-1">Busca por palabra clave</p>
              </div>

              {/* Rubro */}
              <div className="md:col-span-3 flex flex-col">
                <select
                  aria-label="Rubro"
                  value={rubro}
                  onChange={e=>setRubro(e.target.value)}
                  className="h-10 px-3 rounded-xl bg-surface/60 border border-secondary/40 text-sm"
                >
                  {rubros.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <p className="mt-1 text-[11px] text-text/60 h-1">Rubro / sector</p>
              </div>

              {/* Dolor */}
              <div className="md:col-span-2 flex flex-col">
                <select
                  aria-label="Dolor"
                  value={dolor}
                  onChange={e=>setDolor(e.target.value)}
                  className="h-10 px-3 rounded-xl bg-surface/60 border border-secondary/40 text-sm"
                >
                  {dolores.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <p className="mt-1 text-[11px] text-text/60 h-1">Dolor / problema</p>
              </div>

              {/* Valor hora (USD) */}
              <div className="md:col-span-2 flex flex-col">
                <input
                  aria-label="Valor hora en USD"
                  type="number" min="0" step="1" inputMode="decimal"
                  value={hourUSD}
                  onChange={(e)=>setHourUSD(e.target.value)}
                  placeholder="18"
                  className="h-10 w-full px-3 rounded-xl bg-surface/60 border border-secondary/40 outline-none focus:ring-2 focus:ring-primary/60 text-sm"
                />
                <p className="mt-1 text-[11px] text-text/60 h-1">Tu hora vale (USD)?</p>
              </div>
            </div>

          </div>

          {/* Área SCROLLABLE (ocupa el resto de la altura) */}
          <div className="min-h-0 flex-1 overflow-y-auto pr-2">
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-4">
              {items.map(it => <PlaybookCard key={it.id} item={it} rateUSD={rateUSD} />)}
            </div>

            {items.length === 0 && (
              <div className="mt-10 text-neutral text-sm">No hay resultados con esos filtros.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
