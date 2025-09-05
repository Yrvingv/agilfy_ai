import React from 'react'
import { motion } from 'framer-motion'
import site from '../data/site.json'

export default function Hub() {
  return (
    <section id="hub" className="panel relative w-screen h-screen flex-none flex items-center justify-center">
      <video
        className="absolute inset-0 w-full h-full object-cover hidden sm:block"
        autoPlay muted loop playsInline preload="auto" poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Agilidad & Automatización <span className="text-primary">AGILFY_ai</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 text-lg md:text-2xl text-text/90"
        >
          Procesos más rápidos, datos claros, bots que atienden y micro-SaaS a medida.
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {site.metrics.map(m => (
            <div key={m.label} className="px-4 py-2 rounded-xl border border-secondary/40 bg-surface/60">
              <span className="text-primary font-bold">{m.value}{m.suffix}</span> <span className="text-neutral">{m.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <a href="#procesos" className="px-6 py-3 rounded-2xl bg-primary text-background font-semibold shadow-glow hover:opacity-90 transition">Recorrer</a>
        </div>
      </div>
    </section>
  )
}

