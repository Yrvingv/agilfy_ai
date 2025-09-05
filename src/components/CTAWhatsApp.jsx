import React from 'react'
import site from '../data/site.json'

export default function CTAWhatsApp() {
  const wa = site?.whatsapp?.url || 'https://wa.me/5493813594194?text=Hola!'
  return (
    <a
      href={wa}
      target="_blank"
      rel="noreferrer"
      aria-label="Hablar por WhatsApp"
      // POSICIÓN: 3/4 de pantalla (vertical) y pegado al borde derecho
      className="fixed top-3/4 right-[-8px] md:right-[-12px] z-50 group"
    >
      {/* MEDIO CÍRCULO: mitad afuera del viewport */}
      <div className="
        h-14 w-14 md:h-16 md:w-16
        rounded-l-full
        bg-primary text-background
        border border-secondary/50
        shadow-[0_0_24px_rgba(0,255,65,0.35)]
        flex items-center justify-center
        transition-transform duration-200
        group-hover:-translate-x-2
      ">
        {/* Ícono WhatsApp en SVG inline (sin dependencias) */}
        <svg viewBox="0 0 32 32" className="h-7 w-7 md:h-8 md:w-8" fill="currentColor" aria-hidden="true">
          <path d="M19.1 17.3c-.3-.1-1.7-.8-1.9-.9-.2-.1-.4-.1-.6.1-.2.2-.7.9-.8 1-.1.2-.3.2-.5.1-1.4-.7-2.3-1.3-3.2-2.8-.2-.2 0-.4.1-.5.1-.1.2-.3.3-.4.1-.2.1-.3 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.8.8-1 2.1-.3 3.5.8 1.6 2.3 3.2 4.2 4.4 1.7 1 3 .1 3.4-.5.3-.5.3-.9.2-1.1-.1-.1-.2-.2-.4-.2z"/>
          <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.8L4 29l8.4-1.6c1.7.9 3.7 1.4 5.6 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 22.2c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-5 .9.9-4.9-.2-.4C5.5 18.7 5 16.9 5 15 5 9 10 4 16 4s11 5 11 11-5 10.2-11 10.2z"/>
        </svg>
      </div>
    </a>
  )
}
