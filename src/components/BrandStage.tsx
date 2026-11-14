import { Pause, Play } from 'lucide-react'
import { useState } from 'react'

import { cx } from '../lib/cx'

/*
  O palco da marca: o fundo animado (stage-arvion.webp, feito do GIF de cristais
  neon) dentro de uma placa iluminada. Toca sempre, mesmo em celulares com
  "remover animações" ou economia de bateria, e tem um botão para pausar
  (acessibilidade). Se a imagem animada falhar, mostra a imagem parada.
*/
export function BrandStage({ className }: { className?: string }) {
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState(false)
  const still = paused || failed
  return (
    <div className={cx('relative isolate mx-auto w-full max-w-[540px]', className)}>
      <div className="absolute inset-[-8%] -z-10 bg-[radial-gradient(closest-side,rgba(139,92,246,0.35),rgba(34,211,238,0.12)_60%,transparent)]" aria-hidden />
      <div className="relative aspect-[3/2] overflow-hidden rounded-[22px] bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/15">
        <img
          src={still ? '/images/stage-arvion-poster.webp' : '/images/stage-arvion.webp'}
          alt="Cristais de luz neon em azul e violeta, identidade visual da ARVION Lab"
          width={504}
          height={336}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060d]/60 via-transparent to-transparent" aria-hidden />
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" aria-hidden />
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Reproduzir animação' : 'Pausar animação'}
          className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-black/60 text-white/90 ring-1 ring-inset ring-white/20 hover:bg-black/80"
        >
          {paused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}
        </button>
      </div>
    </div>
  )
}
