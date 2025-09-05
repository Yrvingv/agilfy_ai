import React from 'react'
import Carousel from '../components/Carousel'
import items from '../data/projects.json'

export default function Proyectos() {
  return (
    <section
      id="proyectos"
      className="panel relative w-screen h-screen flex-none flex items-center justify-center"
    >
      {/* Contenido limpio, sin overlays que tapen */}
      <div className="relative w-full px-4">
        <p className="text-text/90 text-center mb-2 max-w-2xl mx-auto">
          Galería de proyectos
        </p>

        {/* Caja del reel centrada */}
        <div className="flex items-center justify-center">
          <Carousel items={items} />
        </div>
      </div>
    </section>
  )
}
