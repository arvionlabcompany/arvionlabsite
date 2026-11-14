import { brand } from '../content'
import { cx } from '../lib/cx'

/** A marca da ARVION: o "A" neon em cristal. */
export function LogoMark({ className }: { className?: string }) {
  return <img src="/images/arvion-mark.webp" alt="" width={80} height={80} className={cx('size-8 rounded-[8px]', className)} aria-hidden />
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
