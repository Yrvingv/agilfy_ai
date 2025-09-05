import React, { useEffect, useState } from 'react'
import site from '../data/site.json'

export default function Sidebar() {
  const [active, setActive] = useState('hub')

  
  useEffect(() => {
    const sections = site.routes.map(id => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && setActive(e.target.id))
    }, { root: document.querySelector('#hscroll'), threshold: 0.6 })

    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <aside className="hidden md:block fixed left-0 top-16 bottom-0 w-44 z-30 border-r border-secondary/40 bg-background/60 backdrop-blur">
      <ul className="p-3 space-y-2">
        {site.routes.map(id => (
          <li key={id}>
            <a href={`#${id}`} className={`block px-3 py-2 rounded-lg transition ${
              active===id ? 'bg-surface text-primary shadow-glow' : 'hover:bg-surface/60'
            }`}>
              {id.replace('-', ' ').toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
