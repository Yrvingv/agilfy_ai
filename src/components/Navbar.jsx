import React from 'react'
import site from '../data/site.json'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-background/60 border-b border-secondary/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="#hub" className="flex items-center gap-2 group">
          <img src="/icons/logo-agilfy.svg" alt="AGILFY" className="h-12 w-auto" />
          <span className="font-semibold tracking-wide text-primary group-hover:drop-shadow-md">AGILFY_ai</span>
        </a>
        {/* BOTÓN → PROYECTOS */}
        <a
          href="#proyectos"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-background font-medium shadow-glow hover:opacity-90 transition"
          aria-label="Ir a Proyectos"
        >
          Proyectos
        <div className="flex items-center gap-3">
          <a href="#playbook" className="px-3 py-2 rounded-lg hover:bg-surface/60">Playbook</a>
        </div>
        </a>
      </div>
    </nav>
  )
}

