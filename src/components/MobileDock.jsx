import React from 'react'
import site from '../data/site.json'

export default function MobileDock() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/80 backdrop-blur border-t border-secondary/40 safe-bottom">
      <div className="grid grid-cols-5 text-center">
        {site.routes.map(id => (
          <a key={id} href={`#${id}`} className="py-3 text-sm hover:text-primary">{id.split('-')[0]}</a>
        ))}
      </div>
    </div>
  )
}
