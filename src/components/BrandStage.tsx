import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import type { PointerEvent } from 'react'

import { useReducedMotion } from '../lib/useReducedMotion'
import { cx } from '../lib/cx'
import { ShardField } from './ShardField'

/*
  O palco da marca: a logo real da ARVION flutua sobre órbitas e shards, com
  brilho neon e uma varredura de luz. Tudo inclina suavemente seguindo o mouse
  (sem 3D com prefers-reduced-motion). O personagem entra no mesmo palco a
  partir de /images/personagem.png (ou .webp); se o arquivo ainda não existir,
  o palco segue só com a logo.
*/
export function BrandStage({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18 })
  const sy = useSpring(my, { stiffness: 120, damping: 18 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12])
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9])
  const [source, setSource] = useState(0)
  const [hasCharacter, setHasCharacter] = useState(true)
  const sources = ['/images/personagem.png', '/images/personagem.webp']

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
      className={cx('relative isolate mx-auto w-full max-w-[540px] [perspective:1200px]', className)}
    >
      {/* Luz e campo de shards ao fundo */}
      <div className="absolute left-1/2 top-[38%] -z-20 size-[520px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35)_0%,rgba(34,211,238,0.16)_45%,transparent_72%)] blur-2xl" aria-hidden />
      <div className="absolute inset-0 -z-10 opacity-45 [mask-image:radial-gradient(60%_58%_at_50%_42%,#000_20%,transparent_78%)]" aria-hidden>
        <ShardField variant="mixed" />
      </div>

      {/* Órbitas */}
      <div className="pointer-events-none absolute inset-0 -z-10 grid place-items-center" aria-hidden>
        <div className="round aspect-square w-[88%] animate-[spin_28s_linear_infinite] rounded-full border border-cyan-300/25 [transform:rotateX(70deg)]" />
        <div className="round absolute aspect-square w-[70%] animate-[spin_40s_linear_infinite_reverse] rounded-full border border-fuchsia-400/30 [transform:rotateX(64deg)_rotateZ(24deg)]" />
        <div className="round absolute aspect-square w-[52%] animate-[spin_32s_linear_infinite] rounded-full border border-blue-400/25 [transform:rotateX(76deg)_rotateZ(-18deg)]" />
      </div>

      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative flex flex-col items-center">
        {/* Logo real em uma placa de marca iluminada */}
        <div className="relative w-[94%] animate-float [transform:translateZ(50px)]">
          <div className="absolute inset-x-[8%] bottom-[2%] -z-10 h-12 rounded-full bg-fuchsia-500/35 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(155deg,#0b1122_0%,#05060d_60%,#0a0718_100%)] p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/12 [--depth-edge:rgb(165_243_252/0.22)]">
            <img
              src="/images/logo.png"
              alt="Logotipo da ARVION Lab: desenvolvimento, programação e design"
              width={680}
              height={215}
              fetchPriority="high"
              className="w-full rounded-[16px]"
            />
            <span
              className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(105deg,transparent_38%,rgba(255,255,255,0.22)_50%,transparent_62%)] bg-[length:250%_100%] mix-blend-overlay"
              aria-hidden
            />
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" aria-hidden />
          </div>
        </div>

        {/* Personagem, se o arquivo estiver no projeto */}
        {hasCharacter ? (
          <div className="relative -mt-[2%] w-[64%] [transform:translateZ(90px)]">
            <div className="absolute inset-x-[8%] bottom-[2%] -z-10 h-16 rounded-full bg-cyan-400/25 blur-3xl" aria-hidden />
            <img
              key={source}
              src={sources[source]}
              alt="Ilustração de um especialista da ARVION Lab apresentando a marca"
              loading="lazy"
              decoding="async"
              onError={() => (source < sources.length - 1 ? setSource(source + 1) : setHasCharacter(false))}
              className="w-full animate-float [animation-delay:-2s] drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)]"
            />
          </div>
        ) : null}

      </motion.div>
    </div>
  )
}
