import { MotionConfig, motion } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import { useState } from 'react'

import { cx } from '../lib/cx'

/*
  O palco da marca: a logo ARVION Lab (fundo transparente) flutuando, com um
  brilho que respira atrás e um reflexo de luz que passa só sobre a silhueta
  da logo. O movimento toca sempre (mesmo em celulares com "remover animações")
  e tem um botão de pausa, por acessibilidade.
*/
const LOGO = '/images/logo-arvion.webp'

export function BrandStage({ className }: { className?: string }) {
  const [paused, setPaused] = useState(false)
  const mask = {
    WebkitMaskImage: `url(${LOGO})`,
    maskImage: `url(${LOGO})`,
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  } as const

  return (
    <MotionConfig reducedMotion="never">
      <div className={cx('relative isolate mx-auto w-full max-w-[520px] py-6', className)}>
        <motion.div
          aria-hidden
          animate={paused ? { opacity: 0.6, scale: 1 } : { opacity: [0.45, 0.95, 0.45], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-[-8%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.45),rgba(34,211,238,0.18)_55%,transparent)]"
        />
        <motion.div
          animate={paused ? { y: 0 } : { y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <img src={LOGO} alt="ARVION Lab" width={720} height={457} decoding="async" fetchPriority="high" className="block h-auto w-full" />
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={mask}>
            <motion.span
              animate={paused ? { x: '-150%' } : { x: ['-150%', '380%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
              style={{ skewX: -20 }}
              className="absolute inset-y-0 left-0 w-[32%] bg-gradient-to-r from-transparent via-white/80 to-transparent"
            />
          </div>
        </motion.div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Reproduzir animação' : 'Pausar animação'}
          className="absolute bottom-0 right-0 grid size-9 place-items-center rounded-full bg-black/60 text-white/90 ring-1 ring-inset ring-white/20 hover:bg-black/80"
        >
          {paused ? <Play size={16} aria-hidden /> : <Pause size={16} aria-hidden />}
        </button>
      </div>
    </MotionConfig>
  )
}
