import { useId } from 'react'

import { cx } from '../lib/cx'

/*
  Small neon objects for the page furniture: a floating glass beacon with an
  orbit. Variants stand in for the three kinds of build; drawn in SVG so they
  recolour and scale with the layout.
*/
export type BeaconKind = 'product' | 'ai' | 'platform'

const labels: Record<BeaconKind, string> = {
  product: 'Illustration of a glass product slab inside an orbit',
  ai: 'Illustration of a neon triangular prism inside an orbit',
  platform: 'Illustration of stacked platform plates inside an orbit',
}

export function Beacon({ kind, className, decorative = false }: { kind: BeaconKind; className?: string; decorative?: boolean }) {
  const id = useId().replace(/:/g, '')
  const g = (n: string) => `${id}-${n}`
  const accent = kind === 'ai' ? '#e879f9' : kind === 'product' ? '#22d3ee' : '#8b5cf6'
  const a11y = decorative ? { 'aria-hidden': true as const } : { role: 'img', 'aria-label': labels[kind] }
  return (
    <svg viewBox="0 0 180 120" className={cx('block', className)} {...a11y}>
      <defs>
        <linearGradient id={g('edge')} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.55" stopColor="#5b8cff" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
        <linearGradient id={g('glass')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#101a3c" />
          <stop offset="1" stopColor="#0a0618" />
        </linearGradient>
        <radialGradient id={g('halo')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={accent} stopOpacity="0.45" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="90" cy="62" rx="78" ry="46" fill={`url(#${g('halo')})`} />
      <ellipse cx="90" cy="64" rx="64" ry="18" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.6" transform="rotate(-14 90 64)" />
      {kind === 'product' ? (
        <g>
          <path d="M64 82 L64 34 L90 20 L116 34 L116 82 L90 96 Z" fill={`url(#${g('glass')})`} stroke={`url(#${g('edge')})`} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M90 20 V96" stroke="#a5f3fc" strokeOpacity="0.6" strokeWidth="1.2" />
          <path d="M72 46 H108 M72 58 H108 M72 70 H100" stroke={accent} strokeOpacity="0.7" strokeWidth="1.4" />
        </g>
      ) : kind === 'ai' ? (
        <g>
          <path d="M90 22 L124 88 H56 Z" fill={`url(#${g('glass')})`} stroke={`url(#${g('edge')})`} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M90 22 L90 88" stroke="#f0abfc" strokeOpacity="0.6" strokeWidth="1.2" />
          <path d="M73 68 H107" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.6" />
          <circle cx="90" cy="52" r="5" fill={accent} />
        </g>
      ) : (
        <g>
          <path d="M52 62 L90 46 L128 62 L90 78 Z" fill={`url(#${g('glass')})`} stroke={`url(#${g('edge')})`} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M58 76 L90 62 L122 76 L90 90 Z" fill={`url(#${g('glass')})`} stroke={accent} strokeOpacity="0.8" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M90 46 V62 M52 62 V78 M128 62 V78" stroke="#a5f3fc" strokeOpacity="0.55" strokeWidth="1" />
        </g>
      )}
      <path d="M26 106 H154" stroke={`url(#${g('edge')})`} strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  )
}
