import React, { useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import MobileDock from './components/MobileDock'
import CTAWhatsApp from './components/CTAWhatsApp'
import MatrixRainMobile from './components/MatrixRainMobile'  

import Hub from './scenes/Hub'
import Procesos from './scenes/Procesos'
import Datos from './scenes/Datos'
import Comunicacion from './scenes/Comunicacion'
import MicroSaaS from './scenes/MicroSaaS'
import Proyectos from './scenes/Proyectos'
import Playbook from './scenes/Playbook'


export default function App() {
  const scroller = useRef(null)

  useEffect(() => {
    function onKey(e){
      if (!scroller.current) return
      const el = scroller.current
      const w = el.clientWidth
      if (e.key === 'ArrowRight') el.scrollBy({ left: w, behavior: 'smooth' })
      if (e.key === 'ArrowLeft') el.scrollBy({ left: -w, behavior: 'smooth' })
      if (e.key === 'Home') el.scrollTo({ left: 0, behavior: 'smooth' })
      if (e.key === 'End') el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <Sidebar />
      <CTAWhatsApp />
      <div
        id="hscroll"
        ref={scroller}
        className="horizontal relative z-20 overflow-x-auto overflow-y-hidden h-screen flex snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
        aria-label="Recorrido horizontal por escenas"
      >

        <Hub />
        <Procesos />
        <Datos />
        <Comunicacion />
        <MicroSaaS />
        <Proyectos />
        {/* NUEVO: Playbook vive como una sección más */}
        <Playbook />
      </div>
      <MobileDock />
      {/* Lluvia Matrix SOLO en mobile (queda al fondo) */}
      <MatrixRainMobile />
    </div>
  )
}
