import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import type { PointerEvent } from 'react'

import { useReducedMotion } from '../lib/useReducedMotion'
import { cx } from '../lib/cx'

/*
  O palco da marca: o fundo animado (stage-arvion.webp, feito do GIF de cristais
  neon) dentro de uma placa iluminada, com o personagem da ARVION à frente,
  saindo da placa. Tudo flutua e inclina suavemente seguindo o ponteiro. Com
  prefers-reduced-motion, o fundo fica parado (poster) e sem inclinação.
*/
export function BrandStage({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18 })
  const sy = useSpring(my, { stiffness: 120, damping: 18 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10])
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7])

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cx('relative isolate mx-auto w-full max-w-[540px] pt-[18%] [perspective:1200px]', className)}
    >
      {/* Luz ao fundo */}
      <div className="absolute left-1/2 top-[45%] -z-20 size-[520px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35)_0%,rgba(34,211,238,0.16)_45%,transparent_72%)]" aria-hidden />

      {/* Órbitas */}
      <div className="pointer-events-none absolute inset-0 -z-10 grid place-items-center" aria-hidden>
        <div className="round aspect-square w-[88%] animate-[spin_28s_linear_infinite] rounded-full border border-cyan-300/25 [transform:rotateX(70deg)]" />
        <div className="round absolute aspect-square w-[70%] animate-[spin_40s_linear_infinite_reverse] rounded-full border border-fuchsia-400/30 [transform:rotateX(64deg)_rotateZ(24deg)]" />
      </div>

      <motion.div style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
        <div className="relative animate-float">
          {/* Placa com o fundo animado */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/15">
            <img
              src={reduce ? '/images/stage-arvion-poster.webp' : '/images/stage-arvion.webp'}
              alt=""
              width={504}
              height={336}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060d]/75 via-transparent to-transparent" aria-hidden />
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" aria-hidden />
          </div>

          {/* Personagem saindo da placa */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[-7%] flex h-[128%] justify-center">
            <div className="absolute bottom-0 left-1/2 h-[90%] w-[75%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(139,92,246,0.35),transparent)]" aria-hidden />
            <img
              src="/images/personagem-arvion.webp"
              alt="Personagem da ARVION Lab apresentando a marca"
              width={700}
              height={1445}
              decoding="async"
              className="relative h-full w-auto max-w-none"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
