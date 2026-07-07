import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PalmArt } from './palm'
import { AlponaMandala } from './ornaments'
import { range } from '../lib/utils'

const DEFAULT_STEPS = ['Reading the lines', 'Calculating your numbers', 'Finding the shared pattern', 'Preparing your report']

export function ReadingLoader({
  steps = DEFAULT_STEPS,
  duration = 3800,
  onDone,
}: {
  steps?: string[]
  duration?: number
  onDone?: () => void
}) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const per = duration / steps.length
    const tick = window.setInterval(() => setI((v) => Math.min(steps.length - 1, v + 1)), per)
    const done = window.setTimeout(() => onDone?.(), duration)
    return () => {
      window.clearInterval(tick)
      window.clearTimeout(done)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nums = [1, 3, 7, 9, 11, 5, 22, 8]
  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center overflow-hidden bg-paper/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-candle-glow opacity-70" />
      <div className="relative flex flex-col items-center">
        <div className="relative grid h-64 w-64 place-items-center">
          <AlponaMandala size={256} spin className="absolute opacity-40" />
          {/* orbiting numbers in gold */}
          <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 26, ease: 'linear', repeat: Infinity }}>
            {nums.map((n, idx) => {
              const a = (idx / nums.length) * Math.PI * 2
              const r = 118
              return (
                <span
                  key={idx}
                  className="absolute left-1/2 top-1/2 font-serif text-lg text-gold-deep"
                  style={{ transform: `translate(-50%,-50%) translate(${Math.cos(a) * r}px, ${Math.sin(a) * r}px)` }}
                >
                  {n}
                </span>
              )
            })}
          </motion.div>
          <PalmArt className="h-44 w-auto" />
        </div>

        <div className="mt-10 h-8 overflow-hidden text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-xl text-heading"
            >
              {steps[i]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex gap-1.5">
          {range(steps.length).map((s) => (
            <span key={s} className={`h-1.5 rounded-full transition-all duration-500 ${s <= i ? 'w-8 bg-gradient-to-r from-marigold to-sindoor' : 'w-1.5 bg-parchment'}`} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
