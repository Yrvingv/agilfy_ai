import React, { useEffect, useRef } from 'react'

/** Lluvia de c�digo estilo Matrix � SOLO mobile (md:hidden).
 *  Ligera: canvas + requestAnimationFrame + trail suave.
 *  Paleta: #0A0F0D fondo, verdes #00e73aff / #39FF14.
 */
export default function MatrixRainMobile() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let raf = 0
    const fontSize = 14 // ? ajusta densidad (12�16 recomendado)
    const chars = '?????????????????????????0123456789'.split('')
    const density  = 3;         // ?? ancho por columna = fontSize * density (sub� este n�mero para menos columnas)
    const columnWidth = fontSize * density;
    
    let columns = 0
    let drops = []

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // scale, reset transform
      columns = Math.floor(w / columnWidth)
      drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * (h / fontSize)))
      // fondo base
      ctx.fillStyle = '#0A0F0D'
      ctx.fillRect(0, 0, w, h)
    }

    const draw = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      // trail (fade)
      ctx.fillStyle = 'rgba(10,15,13,0.08)' // #0A0F0D con alpha
      ctx.fillRect(0, 0, w, h)

      ctx.font = `${fontSize}px monospace`
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[(Math.random() * chars.length) | 0]
        const x = i * columnWidth
        const y = drops[i] * fontSize
        // verde principal + acentos fosforescentes ocasionales
        ctx.fillStyle = Math.random() > 0.96 ? '#39FF14' : '#00FF41'
        ctx.fillText(ch, x, y)

        // reset aleatorio cuando llega al final
        if (y > h && Math.random() > 0.975) drops[i] = 0
        else drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 md:hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
