import React from 'react'
import site from '../data/site.json'

function fmtUSD(n) {
  try { return n.toLocaleString('en-US', { maximumFractionDigits: 0 }) } catch { return String(n) }
}

export default function PlaybookCard({ item, rateUSD = null }) {
  const wa = site?.whatsapp?.url || 'https://wa.me/5493813594194?text=Hola!'
  const {
    id, titulo, rubros = [], valor, minutos_por_tarea, tareas_por_semana,
    dificultad, stack = [], media = {}
  } = item

  const horasMes = Math.max(0, Math.round((minutos_por_tarea * tareas_por_semana * 4) / 60))
  const usdMes = rateUSD ? Math.max(0, Math.round(horasMes * rateUSD)) : null
  const fallbackPoster = '/images/hero-poster.jpg'

  const msg = encodeURIComponent(
    `Hola! Vi el Playbook y me interesa "${titulo}" (id: ${id}). ` +
    `Estimo ahorro ~${horasMes} h/mes${usdMes ? ` (≈ USD ${fmtUSD(usdMes)})` : ''}. ¿Lo vemos?`
  )

  return (
    <article className="group rounded-2xl border border-secondary/40 bg-surface/60 overflow-hidden hover:bg-surface transition">
      {/* Media 16:9 */}
      <div className="relative aspect-[16/9] bg-black">
        {media.type === 'video' ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay muted loop playsInline
            poster={media.poster || fallbackPoster}
          >
            {media.webm && <source src={media.webm} type="video/webm" />}
            {media.mp4 && <source src={media.mp4} type="video/mp4" />}
          </video>
        ) : (
          <img className="absolute inset-0 h-full w-full object-cover" src={media.src || fallbackPoster} alt={titulo} />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 md:h-16 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Contenido compacto */}
      <div className="p-3 md:p-4 space-y-2.5 md:space-y-3">
        <h3 className="text-base md:text-lg font-semibold leading-tight">{titulo}</h3>
        <p className="text-xs md:text-sm text-text/80">{valor}</p>

        {/* Chips compactos */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 text-[11px] md:text-xs">
          <span className="px-2 py-1 rounded bg-background/60 border border-secondary/40">Dificultad: {dificultad}</span>
          <span className="px-2 py-1 rounded bg-background/60 border border-secondary/40">Ahorro: ≈ {horasMes} h/mes</span>
          {usdMes !== null && (
            <span className="px-2 py-1 rounded bg-background/60 border border-secondary/40">≈ USD {fmtUSD(usdMes)}/mes</span>
          )}
          {rubros.slice(0,2).map(r => (
            <span key={r} className="px-2 py-1 rounded bg-background/60 border border-secondary/40">{r}</span>
          ))}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 text-[11px] md:text-xs text-neutral">
          {stack.map(s => <span key={s} className="px-2 py-1 rounded bg-surface/60 border border-secondary/30">{s}</span>)}
        </div>

        {/* CTA */}
        <div className="flex gap-2 pt-1">
          <a
            href={`${wa}&text=${msg}`}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-background font-medium shadow-glow hover:opacity-90 transition text-sm"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}
