import React, { useState } from 'react'

/**
 * Reel/Story 9:16 simple + fallback:
 * - Si el asset no existe, muestra hero-poster.jpg
 * - Sin dependencias, sin framer-motion
 */
export default function Carousel({ items = [] }) {
  const [i, setI] = useState(0)
  const n = items.length
  const curr = n ? items[i] : null
  const fallbackPoster = '/images/hero-poster.jpg'

  const prev = () => n && setI((i - 1 + n) % n)
  const next = () => n && setI((i + 1) % n)

  return (
    <div className="relative mx-auto w-[min(88vw,280px)] md:w-[270px] aspect-[9/16]">
      {/* Marco del reel */}
      <div className="absolute inset-0 rounded-[18px] overflow-hidden border border-secondary/40 shadow-2xl bg-black">
        {/* Contenido */}
        {!curr ? (
          <img
            src={fallbackPoster}
            alt="Poster"
            className="h-full w-full object-cover"
          />
        ) : curr.type === 'video' ? (
          <video
            className="h-full w-full object-cover"
            autoPlay muted loop playsInline controls={false}
            poster={curr.poster || fallbackPoster}
            onError={(e) => { e.currentTarget.poster = fallbackPoster }}
          >
            {curr.webm && <source src={curr.webm} type="video/webm" />}
            {curr.mp4 && <source src={curr.mp4} type="video/mp4" />}
          </video>
        ) : (
          <img
            className="h-full w-full object-cover"
            src={curr.src || fallbackPoster}
            alt={curr.title || 'Proyecto'}
            onError={(e) => { e.currentTarget.src = fallbackPoster }}
          />
        )}

        {/* Gradientes suaves tipo story */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

        {/* Etiqueta opcional */}
        {curr?.title && (
          <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 rounded-xl bg-background/60 border border-secondary/40 text-xs">
            <span className="inline-block h-5 w-5 rounded-full bg-primary/30 ring-2 ring-primary/40" />
            <span className="text-text/90">{curr.title}</span>
          </div>
        )}
      </div>

      {/* Controles */}
      {n > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute -left-10 top-1/2 -translate-y-1/2 hidden md:inline-flex px-3 py-2 rounded-xl bg-background/70 hover:bg-background border border-secondary/40"
          >‹</button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute -right-10 top-1/2 -translate-y-1/2 hidden md:inline-flex px-3 py-2 rounded-xl bg-background/70 hover:bg-background border border-secondary/40"
          >›</button>

          <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-2">
            {items.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Ir al slide ${k + 1}`}
                className={`h-2.5 w-2.5 rounded-full ${i === k ? 'bg-primary' : 'bg-secondary/60 hover:bg-secondary'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

