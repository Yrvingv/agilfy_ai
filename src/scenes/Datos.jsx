import React from 'react'
import site from '../data/site.json'
import services from '../data/services.json'

export default function Scene() {
  const svc = services.find(s => s.route === 'datos')
  return (
    <section id="datos" className="panel relative w-screen h-screen flex-none flex items-center">
      <video
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
        autoPlay muted loop playsInline preload="metadata" poster={`/images/datos-poster.jpg`}
      >
        <source src={`/videos/datos-bg.webm`} type="video/webm" />
        <source src={`/videos/datos-bg.mp4`} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-background/20" />

      <div className="relative z-10 md:pl-[13rem] px-6 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold">Inteligencia de datos</h2>
        <p className="mt-3 text-text/90">Dashboards claros y captura automatizada de información externa. Scraping ético y profesional.</p>

        <div className="mt-6">
          <ul className="space-y-2 text-text/90">
            <li className='flex gap-2'><span class='text-primary'>▸</span>Dashboards accionables</li><li className='flex gap-2'><span class='text-primary'>▸</span>Limpieza y unificación de datos</li><li className='flex gap-2'><span class='text-primary'>▸</span>Web scraping responsable</li>
          </ul>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-surface/70 border border-secondary/40 text-sm">Métrica: tiempo ↓</div>
          <div className="p-4 rounded-xl bg-surface/70 border border-secondary/40 text-sm">Métrica: errores ↓</div>
        </div>

        <div className="mt-6">
          <a href={site.whatsapp.url} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl bg-primary text-background font-semibold shadow-glow hover:opacity-90 transition">Ordenar mis datos</a>
        </div>
      </div>
    </section>
  )
}

