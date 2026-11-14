import { useReducedMotion } from '../lib/useReducedMotion'
import { cx } from '../lib/cx'

/*
  O palco da marca: o fundo animado (stage-arvion.webp, feito do GIF de cristais
  neon) dentro de uma placa iluminada. Sem 3D nem órbitas, para o site rolar
  leve no celular. Com prefers-reduced-motion, o fundo fica parado (poster).
*/
export function BrandStage({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div className={cx('relative isolate mx-auto w-full max-w-[540px]', className)}>
      <div className="absolute inset-[-8%] -z-10 bg-[radial-gradient(closest-side,rgba(139,92,246,0.35),rgba(34,211,238,0.12)_60%,transparent)]" aria-hidden />
      <div className="relative aspect-[3/2] overflow-hidden rounded-[22px] bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/15">
        <img
          src={reduce ? '/images/stage-arvion-poster.webp' : '/images/stage-arvion.webp'}
          alt="Cristais de luz neon em azul e violeta, identidade visual da ARVION Lab"
          width={504}
          height={336}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060d]/60 via-transparent to-transparent" aria-hidden />
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" aria-hidden />
      </div>
    </div>
  )
}
