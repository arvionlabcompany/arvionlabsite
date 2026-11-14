import { useId } from 'react'

import { cx } from '../lib/cx'

/*
  The ARVION stack, drawn in SVG: three glass plates floating one above the
  other, threaded by a column of light. The Soluções page maps its hotspots
  onto the plates. Pass label="" when it is decorative.
*/
export function Core({ className, label = 'Illustration of the Arvion stack: four glass layers threaded by a column of light' }: { className?: string; label?: string }) {
  const id = useId().replace(/:/g, '')
  const g = (n: string) => `${id}-${n}`
  const layers = [
    { y: 116, top: '#a5f3fc', side: '#0ea5e9', edge: '#22d3ee' },
    { y: 200, top: '#c4b5fd', side: '#6d28d9', edge: '#8b5cf6' },
    { y: 284, top: '#f0abfc', side: '#a21caf', edge: '#e879f9' },
  ]
  return (
    <svg viewBox="0 0 400 380" className={cx('block', className)} {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}>
      <defs>
        <radialGradient id={g('halo')} cx="0.5" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('beam')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a5f3fc" stopOpacity="0.1" />
          <stop offset="0.4" stopColor="#a5f3fc" stopOpacity="0.8" />
          <stop offset="0.75" stopColor="#c4b5fd" stopOpacity="0.7" />
          <stop offset="1" stopColor="#e879f9" stopOpacity="0.05" />
        </linearGradient>
        <filter id={g('glow')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <ellipse cx="200" cy="218" rx="190" ry="140" fill={`url(#${g('halo')})`} />
      <path d="M200 48 V340" stroke={`url(#${g('beam')})`} strokeWidth="10" filter={`url(#${g('glow')})`} opacity="0.55" />
      <path d="M200 60 V336" stroke={`url(#${g('beam')})`} strokeWidth="1.4" />

      {layers.map((l, i) => (
        <g key={l.y}>
          {/* left face */}
          <path d={`M70 ${l.y} L200 ${l.y + 34} V${l.y + 52} L70 ${l.y + 18} Z`} fill={l.side} fillOpacity="0.28" />
          {/* right face */}
          <path d={`M330 ${l.y} L200 ${l.y + 34} V${l.y + 52} L330 ${l.y + 18} Z`} fill={l.side} fillOpacity="0.55" />
          {/* top plate */}
          <path d={`M200 ${l.y - 34} L330 ${l.y} L200 ${l.y + 34} L70 ${l.y} Z`} fill={l.top} fillOpacity="0.16" stroke={l.edge} strokeWidth="1.8" strokeLinejoin="round" />
          <path d={`M200 ${l.y - 34} L330 ${l.y} L200 ${l.y + 34} L70 ${l.y} Z`} fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="0.8" />
          {/* inner circuit lines */}
          <path d={`M200 ${l.y - 18} L286 ${l.y} L200 ${l.y + 18} L114 ${l.y} Z`} fill="none" stroke={l.edge} strokeOpacity="0.55" strokeWidth="0.9" />
          <circle cx="200" cy={l.y} r="4.5" fill="#fff" />
          <circle cx="200" cy={l.y} r="10" fill="none" stroke={l.edge} strokeOpacity="0.6" strokeWidth="1.4" />
          {/* nodes on the plate */}
          <circle cx="140" cy={l.y + 8} r="2.4" fill={l.edge} />
          <circle cx="262" cy={l.y + 8} r="2.4" fill={l.edge} />
          {i < layers.length - 1 ? (
            <path d={`M200 ${l.y + 14} V${l.y + 54}`} stroke={l.edge} strokeOpacity="0.45" strokeWidth="1" />
          ) : null}
        </g>
      ))}

      {/* Beam pulse at the base */}
      <ellipse cx="200" cy="340" rx="120" ry="16" fill="#8b5cf6" fillOpacity="0.35" filter={`url(#${g('glow')})`} />
      <ellipse cx="200" cy="340" rx="60" ry="8" fill="#e0f2fe" fillOpacity="0.55" filter={`url(#${g('glow')})`} />
    </svg>
  )
}
