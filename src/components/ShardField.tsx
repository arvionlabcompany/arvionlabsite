import { useId } from 'react'

import { cx } from '../lib/cx'

/*
  A field of glass shards catching neon light, drawn in SVG. Used as cover art
  for news, the careers header and the market panels; it fills its container.
  `variant` shifts the light from cyan to magenta.
*/
export function ShardField({ className, variant = 'mixed' }: { className?: string; variant?: 'cyan' | 'magenta' | 'mixed' }) {
  const id = useId().replace(/:/g, '')
  const g = (n: string) => `${id}-${n}`
  const shards: Array<{ p: string; o: number }> = [
    { p: 'M96 34 L126 18 L132 58 L104 70 Z', o: 0.9 },
    { p: 'M250 26 L286 40 L272 78 L238 58 Z', o: 0.75 },
    { p: 'M178 62 L206 40 L214 96 L186 112 Z', o: 0.95 },
    { p: 'M312 108 L342 96 L336 138 L306 146 Z', o: 0.6 },
    { p: 'M48 118 L76 106 L70 150 L42 158 Z', o: 0.55 },
    { p: 'M222 146 L258 130 L250 184 L216 192 Z', o: 0.85 },
    { p: 'M132 150 L162 138 L156 190 L126 196 Z', o: 0.7 },
    { p: 'M286 176 L318 168 L310 214 L280 218 Z', o: 0.5 },
    { p: 'M78 200 L108 190 L100 236 L72 240 Z', o: 0.45 },
    { p: 'M360 52 L386 46 L380 84 L356 88 Z', o: 0.4 },
    { p: 'M12 58 L34 52 L30 88 L10 92 Z', o: 0.35 },
    { p: 'M188 214 L216 204 L210 244 L184 248 Z', o: 0.5 },
  ]
  const primary = variant === 'cyan' ? '#22d3ee' : variant === 'magenta' ? '#e879f9' : '#5b8cff'
  const secondary = variant === 'cyan' ? '#5b8cff' : variant === 'magenta' ? '#8b5cf6' : '#c026d3'
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={cx('block h-full w-full', className)} aria-hidden>
      <defs>
        <linearGradient id={g('shard')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1230" />
          <stop offset="0.55" stopColor={primary} stopOpacity="0.55" />
          <stop offset="1" stopColor={secondary} stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={g('line')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={primary} stopOpacity="0" />
          <stop offset="0.5" stopColor={primary} stopOpacity="0.85" />
          <stop offset="1" stopColor={secondary} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={g('halo')} cx="0.5" cy="0.7" r="0.6">
          <stop offset="0" stopColor={secondary} stopOpacity="0.45" />
          <stop offset="0.6" stopColor={primary} stopOpacity="0.14" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id={g('glow')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <rect width="400" height="260" fill="#03040c" />
      <ellipse cx="200" cy="196" rx="220" ry="120" fill={`url(#${g('halo')})`} />
      <g filter={`url(#${g('glow')})`} opacity="0.55">
        <path d="M0 200 L400 130" stroke={`url(#${g('line')})`} strokeWidth="2" />
        <path d="M60 260 L400 176" stroke={`url(#${g('line')})`} strokeWidth="1.2" />
      </g>
      {shards.map((s, i) => (
        <g key={i} opacity={s.o}>
          <path d={s.p} fill={`url(#${g('shard')})`} stroke="#dbeafe" strokeOpacity="0.45" strokeWidth="0.8" />
          <path d={s.p} fill="none" stroke={i % 2 ? secondary : primary} strokeOpacity="0.7" strokeWidth="0.6" />
        </g>
      ))}
      <path d="M0 236 H400" stroke={`url(#${g('line')})`} strokeWidth="1.4" opacity="0.9" />
      <ellipse cx="200" cy="236" rx="150" ry="12" fill={primary} fillOpacity="0.18" filter={`url(#${g('glow')})`} />
    </svg>
  )
}
