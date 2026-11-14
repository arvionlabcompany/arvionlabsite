import { useId } from 'react'

import { brand } from '../content'
import { cx } from '../lib/cx'

/** The Arvion mark: a neon A monolith inside an orbit. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 32 32" className={cx('size-7', className)} aria-hidden>
      <defs>
        <linearGradient id={`al-${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#5b8cff" />
          <stop offset="1" stopColor="#c026d3" />
        </linearGradient>
        <filter id={`gl-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="16" cy="17" rx="14.6" ry="7" fill="none" stroke={`url(#al-${id})`} strokeOpacity="0.45" strokeWidth="1" transform="rotate(-24 16 17)" />
      <g filter={`url(#gl-${id})`}>
        <path d="M4.6 27.2 L14.2 4.4 H18.4 L27.6 27.2 H21.7 L16.3 12.1 L10.6 27.2 Z" fill={`url(#al-${id})`} />
        <path d="M12.2 21.3 H20.4 L22.2 26.2 H10.4 Z" fill="#ffffff" fillOpacity="0.92" />
      </g>
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  const [first, ...rest] = brand.name.split(' ')
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="text-[16px] font-semibold uppercase tracking-[0.14em]">
        {first}
        {rest.length ? (
          <span className="ml-1.5 bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
            {rest.join(' ')}
          </span>
        ) : null}
      </span>
    </span>
  )
}
