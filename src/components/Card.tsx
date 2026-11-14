import type { ReactNode } from 'react'

import { cx } from '../lib/cx'

/*
  Surfaces. Every card is a lit squircle; `tone` picks its light:
  - plain: near-black glass, for lists and forms
  - fire: violet to magenta, the neon end of the palette
  - ocean: deep navy lifting to electric blue
  - stripes: blue-violet light through vertical slats (the stat card)
  - steel: cool slate, for neutral media
*/
export type CardTone = 'plain' | 'fire' | 'ocean' | 'stripes' | 'steel'

const tones: Record<CardTone, string> = {
  plain: 'bg-surface',
  fire: 'bg-[radial-gradient(120%_80%_at_50%_100%,#f5d0fe_0%,#c084fc_22%,#7c3aed_52%,#2e1065_84%,#0b0518_100%)]',
  ocean: 'bg-[radial-gradient(120%_90%_at_50%_100%,#a5d8ff_0%,#3b82f6_36%,#1e2f7a_72%,#080f28_100%)]',
  stripes:
    'bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0)_0_7px,rgb(196_181_253/0.16)_7px_9px),radial-gradient(90%_70%_at_50%_15%,#a5b4fc_0%,#5b4bc4_45%,#221a5c_100%)]',
  steel: 'bg-[linear-gradient(160deg,#232840_0%,#0b0e18_100%)]',
}

export function Card({
  tone = 'plain',
  children,
  className,
  as: As = 'div',
  interactive = false,
  id,
}: {
  id?: string
  tone?: CardTone
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li' | 'section'
  interactive?: boolean
}) {
  return (
    <As
      id={id}
      className={cx(
        'depth relative isolate overflow-hidden rounded-card',
        tones[tone],
        interactive && 'transition-transform duration-300 ease-out hover:-translate-y-1',
        className,
      )}
    >
      {children}
    </As>
  )
}

/** The text block that sits at the top of a feature card. */
export function CardText({ title, body, className }: { title: ReactNode; body: ReactNode; className?: string }) {
  return (
    <div className={cx('relative z-10 flex flex-col gap-1 p-5 sm:p-6', className)}>
      <h3 className="text-[16px] font-medium text-white">{title}</h3>
      <p className="text-pretty text-[16px] leading-[1.42] text-white/85">{body}</p>
    </div>
  )
}
