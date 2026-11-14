import { useId } from 'react'

import { cx } from '../lib/cx'

/*
  The night skyline at the foot of the mission panel: dark glass towers with
  lit data grids, a horizon line and an orbit arc overhead. Pure SVG, so it
  recolours with the panel.
*/
export function Skyline({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  const towers = [
    [0, 70, 34, 90],
    [38, 40, 30, 120],
    [72, 86, 40, 74],
    [116, 22, 26, 138],
    [146, 60, 46, 100],
    [196, 96, 34, 64],
    [234, 50, 30, 110],
    [268, 104, 52, 56],
  ]
  return (
    <svg viewBox="0 0 420 160" className={cx('block', className)} aria-hidden>
      <defs>
        <linearGradient id={`sky-glass-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2270" stopOpacity="0.95" />
          <stop offset="1" stopColor="#0a0824" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`sky-lit-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a5f3fc" />
          <stop offset="0.6" stopColor="#818cf8" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
        <linearGradient id={`sky-arc-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="0.5" stopColor="#a5f3fc" stopOpacity="0.85" />
          <stop offset="1" stopColor="#e879f9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M-30 44 C 90 -18, 330 -18, 450 44" fill="none" stroke={`url(#sky-arc-${id})`} strokeWidth="1.6" />
      {towers.map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill={`url(#sky-glass-${id})`} stroke="#a5b4fc" strokeOpacity="0.5" strokeWidth="0.7" />
          {Array.from({ length: Math.floor(h / 10) }, (_, r) => (
            <path
              key={r}
              d={`M${x + 3} ${y + 6 + r * 10} H${x + w - 3}`}
              stroke={i % 3 === 0 ? '#67e8f9' : i % 3 === 1 ? '#c4b5fd' : '#e879f9'}
              strokeOpacity={0.25 + ((r + i) % 4) * 0.14}
              strokeWidth="0.9"
            />
          ))}
        </g>
      ))}
      <ellipse cx="129" cy="96" rx="40" ry="36" fill={`url(#sky-lit-${id})`} opacity="0.22" />
      <ellipse cx="334" cy="122" rx="34" ry="22" fill="#a5f3fc" opacity="0.12" />
      <path d="M0 160 H420" stroke={`url(#sky-arc-${id})`} strokeWidth="1.4" />
    </svg>
  )
}
