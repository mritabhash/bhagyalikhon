import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { asset, cn } from '../lib/utils'

export interface LineInfo {
  id: string
  label: string
  d: string
  color: string
}

// The six major lines (+ optional minor lines) as SVG paths over the palm body.
export const PALM_LINES: LineInfo[] = [
  { id: 'life', label: 'Life Line', d: 'M120 168 C96 188 86 238 100 288 C110 322 130 346 150 362', color: 'var(--sindoor)' },
  { id: 'head', label: 'Head Line', d: 'M116 214 C150 226 188 228 210 240', color: 'var(--alta)' },
  { id: 'heart', label: 'Heart Line', d: 'M118 190 C150 174 190 176 216 192', color: 'var(--ritual)' },
  { id: 'fate', label: 'Fate Line', d: 'M150 360 C150 300 150 250 150 176', color: 'var(--gold-deep)' },
  { id: 'sun', label: 'Sun Line', d: 'M186 348 C188 300 190 250 192 182', color: 'var(--marigold)' },
  { id: 'mercury', label: 'Mercury Line', d: 'M206 330 C210 300 214 272 216 236', color: 'var(--turmeric)' },
]

export const MINOR_LINES: LineInfo[] = [
  { id: 'marriage', label: 'Union Lines', d: 'M214 168 H236 M214 176 H232', color: 'var(--alta)' },
  { id: 'bracelet', label: 'Bracelet Lines', d: 'M112 388 Q150 400 188 388 M116 398 Q150 408 184 398', color: 'var(--gold-antique)' },
]

const HAND_BODY =
  'M78 214 C78 152 100 132 150 132 C200 132 222 152 222 214 C222 304 205 362 176 394 C160 410 140 410 125 394 C95 362 78 304 78 214 Z'
const FINGERS = [
  'M108 150 C104 100 104 92 112 78 C118 70 128 70 134 78 C140 92 138 100 136 150',
  'M143 140 C141 84 141 70 150 58 C157 50 165 52 170 62 C176 76 174 90 172 140',
  'M178 146 C178 96 178 84 186 72 C192 64 202 66 206 78 C210 92 208 104 206 150',
  'M210 160 C210 124 210 112 218 104 C224 98 232 100 235 110 C238 122 236 134 234 168',
]
const THUMB = 'M80 252 C56 252 40 238 40 216 C40 200 54 192 68 198 C82 204 90 218 92 238'

interface PalmProps {
  className?: string
  active?: string | null
  drawn?: boolean
  glowAll?: boolean
  showMinor?: boolean
  strokeVariant?: 'ink' | 'faint'
}

export function PalmIllustration({
  className,
  active = null,
  drawn = true,
  glowAll = false,
  showMinor = false,
  strokeVariant = 'ink',
}: PalmProps) {
  const lines = showMinor ? [...PALM_LINES, ...MINOR_LINES] : PALM_LINES
  const bodyStroke = strokeVariant === 'faint' ? 'var(--parchment-deep)' : 'var(--ink-muted)'
  return (
    <svg viewBox="0 0 300 440" className={cn('overflow-visible', className)} role="img" aria-label="Illustration of an open palm and its lines" fill="none">
      <g stroke={bodyStroke} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="rgba(234, 221, 191, 0.18)">
        <path d={HAND_BODY} />
        {FINGERS.map((d, i) => (
          <path key={i} d={d} />
        ))}
        <path d={THUMB} />
      </g>
      <g fill="none" strokeLinecap="round">
        {lines.map((ln) => {
          const isActive = active === ln.id
          const on = glowAll || isActive || active === null
          return (
            <motion.path
              key={ln.id}
              d={ln.d}
              stroke={ln.color}
              strokeWidth={isActive ? 3.2 : 2}
              initial={drawn ? { pathLength: 0, opacity: 0 } : false}
              whileInView={drawn ? { pathLength: 1, opacity: on ? (isActive ? 1 : 0.85) : 0.28 } : undefined}
              animate={!drawn ? { opacity: on ? (isActive ? 1 : 0.85) : 0.28 } : undefined}
              viewport={{ once: true }}
              transition={{ pathLength: { duration: 1.8, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.6 } }}
              style={ isActive ? { filter: 'drop-shadow(0 0 6px rgba(232,163,23,0.7))' } : undefined }
            />
          )
        })}
      </g>
    </svg>
  )
}

// Big, faint palm that drifts with scroll — the living background of the site.
export function PalmBackground({ opacity = 0.07 }: { opacity?: number }) {
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], ['14%', '-8%'])
  const y = useTransform(scrollYProgress, [0, 1], ['2%', '-4%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [10, -8])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.14, 1.28])
  return (
    <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-end overflow-hidden" aria-hidden="true">
      <motion.div style={{ x, y, rotate, scale, opacity }} className="w-[62vh] max-w-[90vw] translate-x-[6%]">
        <PalmArt className="h-auto w-full" />
      </motion.div>
    </div>
  )
}

// Frames an uploaded palm photo and overlays approximate lines that highlight one by one.
export function PalmLineViewer({
  src,
  active = null,
  showMinor = true,
  onLineClick,
  className,
}: {
  src?: string | null
  active?: string | null
  showMinor?: boolean
  onLineClick?: (id: string) => void
  className?: string
}) {
  const lines = showMinor ? [...PALM_LINES, ...MINOR_LINES] : PALM_LINES
  return (
    <div className={cn('relative aspect-[3/4] w-full overflow-hidden rounded-[1.4rem] border border-parchment bg-ivory shadow-paper', className)}>
      {src ? (
        <img src={src} alt="Your uploaded palm" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-alpona-dots text-ink-muted">
          <PalmArt className="h-3/4 w-auto" />
        </div>
      )}
      {/* warm wash so overlaid lines read on any photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-ritual-deep/25 via-transparent to-transparent" />
      <svg viewBox="0 0 300 440" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" fill="none">
        {lines.map((ln) => {
          const isActive = active === ln.id
          return (
            <motion.path
              key={ln.id}
              d={ln.d}
              stroke={isActive ? 'var(--marigold-light)' : ln.color}
              strokeWidth={isActive ? 3.4 : 2}
              strokeLinecap="round"
              className={onLineClick ? 'cursor-pointer' : ''}
              onClick={() => onLineClick?.(ln.id)}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: active === null || isActive ? 0.95 : 0.4 }}
              transition={{ pathLength: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.4 } }}
              style={isActive ? { filter: 'drop-shadow(0 0 7px rgba(242,197,85,0.9))' } : undefined}
            />
          )
        })}
      </svg>
    </div>
  )
}

// Real illustrated palm artwork, blended to sit seamlessly on the warm paper.
export function PalmArt({
  src = asset('/art/palm-hand.png'),
  alt = 'An illustrated open palm and its lines',
  className,
  blend = true,
  feather = true,
}: {
  src?: string
  alt?: string
  className?: string
  blend?: boolean
  feather?: boolean
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      className={cn('pointer-events-none select-none object-contain', blend && 'mix-blend-multiply', feather && 'art-feather', className)}
    />
  )
}
