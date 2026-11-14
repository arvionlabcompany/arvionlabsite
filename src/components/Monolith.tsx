import { useId } from 'react'

import { cx } from '../lib/cx'

/*
  The Arvion monolith, drawn in SVG: a faceted A of dark glass lit along every
  edge, wrapped in two neon orbits, with shards and a wet-floor reflection.
  It stands in for the brand render and scales from a thumbnail to the hero.
*/
export function Monolith({
  className,
  label = 'The Arvion Lab monolith: a faceted neon A inside two orbit rings',
}: {
  className?: string
  label?: string
}) {
  const id = useId().replace(/:/g, '')
  const g = (n: string) => `${id}-${n}`
  return (
    <svg
      viewBox="0 0 400 440"
      className={cx('block', className)}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <defs>
        <linearGradient id={g('edge')} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.35" stopColor="#3b82f6" />
          <stop offset="0.7" stopColor="#a855f7" />
          <stop offset="1" stopColor="#f0abfc" />
        </linearGradient>
        <linearGradient id={g('glass')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#101a44" />
          <stop offset="0.45" stopColor="#070a1c" />
          <stop offset="1" stopColor="#1a0b33" />
        </linearGradient>
        <linearGradient id={g('facet')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#7c3aed" stopOpacity="0.35" />
          <stop offset="1" stopColor="#e879f9" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id={g('halo')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7c3aed" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#3b82f6" stopOpacity="0.22" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('beam')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="0.5" stopColor="#a5f3fc" stopOpacity="0.9" />
          <stop offset="1" stopColor="#e879f9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={g('floor')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0e7490" stopOpacity="0" />
          <stop offset="0.4" stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="0.75" stopColor="#c026d3" stopOpacity="0.4" />
          <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
        <filter id={g('blur')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={g('soft')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Atmosphere */}
      <ellipse cx="200" cy="215" rx="196" ry="150" fill={`url(#${g('halo')})`} filter={`url(#${g('blur')})`} />

      {/* Back half of the orbit */}
      <g fill="none" strokeLinecap="round">
        <ellipse cx="200" cy="196" rx="176" ry="52" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="3" transform="rotate(-18 200 196)" />
        <ellipse cx="200" cy="206" rx="150" ry="40" stroke="#e879f9" strokeOpacity="0.3" strokeWidth="1.6" transform="rotate(12 200 206)" />
      </g>
      <path d="M24 236 C 90 168, 310 168, 376 226" fill="none" stroke={`url(#${g('beam')})`} strokeWidth="2.2" opacity="0.9" filter={`url(#${g('soft')})`} />

      {/* Shards */}
      <g opacity="0.9">
        <path d="M72 150 L96 132 L104 158 L84 172 Z" fill="#0b1230" stroke={`url(#${g('edge')})`} strokeWidth="1.2" />
        <path d="M308 116 L330 126 L322 152 L302 140 Z" fill="#140a2c" stroke={`url(#${g('edge')})`} strokeWidth="1.2" />
        <path d="M330 262 L352 254 L346 282 L328 288 Z" fill="#0b1230" stroke={`url(#${g('edge')})`} strokeWidth="1" />
        <path d="M56 268 L78 260 L72 286 L52 292 Z" fill="#140a2c" stroke={`url(#${g('edge')})`} strokeWidth="1" />
      </g>

      {/* The monolith */}
      <g>
        {/* outer A */}
        <path
          d="M96 336 L180 84 H220 L304 336 H252 L200 176 L148 336 Z"
          fill={`url(#${g('glass')})`}
          stroke={`url(#${g('edge')})`}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* faceted faces */}
        <path d="M148 336 L200 176 L200 336 Z" fill={`url(#${g('facet')})`} opacity="0.35" />
        <path d="M200 176 L252 336 H200 Z" fill="#000000" opacity="0.35" />
        <path d="M96 336 L180 84 L200 176 Z" fill={`url(#${g('facet')})`} opacity="0.18" />
        {/* inner chevron */}
        <path
          d="M156 318 L200 206 L244 318 H222 L200 266 L178 318 Z"
          fill="#050716"
          stroke={`url(#${g('edge')})`}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path d="M178 302 H222" stroke="#e0f2fe" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        {/* edge highlights */}
        <path d="M180 84 L200 176" stroke="#a5f3fc" strokeOpacity="0.7" strokeWidth="1.4" />
        <path d="M220 84 L200 176" stroke="#f0abfc" strokeOpacity="0.6" strokeWidth="1.4" />
        <path d="M96 336 L148 336" stroke="#22d3ee" strokeWidth="2.2" />
        <path d="M252 336 L304 336" stroke="#e879f9" strokeWidth="2.2" />
      </g>

      {/* Floor light and a soft contact reflection */}
      <ellipse cx="200" cy="352" rx="168" ry="20" fill={`url(#${g('floor')})`} filter={`url(#${g('soft')})`} />
      <ellipse cx="200" cy="366" rx="96" ry="34" fill={`url(#${g('floor')})`} opacity="0.7" filter={`url(#${g('blur')})`} />
      <path d="M64 358 H336" stroke={`url(#${g('floor')})`} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
