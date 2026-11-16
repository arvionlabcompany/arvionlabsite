import { cx } from '../lib/cx'

/*
  Arte de capa da marca: o "A" em cristal neon (imagens geradas a partir do
  material da ARVION Lab). Preenche o contêiner. `variant` troca a cor da luz:
  cyan (azul), magenta (violeta/rosa) ou mixed (azul e violeta).
*/
const SRC = {
  cyan: '/images/art-cristais-cyan.webp',
  magenta: '/images/art-cristais-magenta.webp',
  mixed: '/images/art-cristais-mixed.webp',
} as const

export function ShardField({ className, variant = 'mixed' }: { className?: string; variant?: 'cyan' | 'magenta' | 'mixed' }) {
  return <img src={SRC[variant]} alt="" aria-hidden width={1000} height={650} loading="lazy" decoding="async" className={cx('block h-full w-full object-cover', className)} />
}
