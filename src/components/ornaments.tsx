import { motion } from 'framer-motion'
import { cn, range } from '../lib/utils'

// ── Alpona divider: an ornamental line that draws itself into view ──
export function AlponaDivider({ className, width = 460 }: { className?: string; width?: number }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }, opacity: { duration: 0.4, delay: i * 0.12 } },
    }),
  }
  return (
    <div className={cn('flex justify-center', className)} aria-hidden="true">
      <motion.svg
        viewBox="0 0 460 44"
        width={width}
        className="max-w-full overflow-visible"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        fill="none"
      >
        {/* horizontal guide lines */}
        <motion.path variants={draw} custom={0} d="M40 22 H196" stroke="var(--gold-antique)" strokeWidth="1.4" strokeLinecap="round" />
        <motion.path variants={draw} custom={0} d="M264 22 H420" stroke="var(--gold-antique)" strokeWidth="1.4" strokeLinecap="round" />
        {/* end curls */}
        <motion.path variants={draw} custom={2} d="M40 22 C28 22 26 14 34 12 C40 11 41 18 34 18" stroke="var(--alta)" strokeWidth="1.4" strokeLinecap="round" />
        <motion.path variants={draw} custom={2} d="M420 22 C432 22 434 14 426 12 C420 11 419 18 426 18" stroke="var(--alta)" strokeWidth="1.4" strokeLinecap="round" />
        {/* petals along the line */}
        {[110, 350].map((x) => (
          <motion.path key={x} variants={draw} custom={1} d={`M${x} 22 c-8 -7 -8 7 0 0 c8 -7 8 7 0 0`} stroke="var(--marigold)" strokeWidth="1.2" />
        ))}
        {/* central lotus motif */}
        <motion.path variants={draw} custom={1} d="M230 6 C244 22 244 22 230 38 C216 22 216 22 230 6 Z" stroke="var(--sindoor)" strokeWidth="1.5" />
        <motion.path variants={draw} custom={1} d="M206 22 C222 12 238 12 254 22 C238 32 222 32 206 22 Z" stroke="var(--sindoor)" strokeWidth="1.5" />
        <motion.circle variants={draw} custom={2} cx="230" cy="22" r="3.4" stroke="var(--gold)" strokeWidth="1.5" />
      </motion.svg>
    </div>
  )
}

// ── Corner ornament for cards & report pages ──
export function AlponaCorner({ className, size = 64 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M6 6 H30" stroke="var(--gold-antique)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M6 6 V30" stroke="var(--gold-antique)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M6 6 C22 8 24 22 20 32 C16 26 18 16 6 14" stroke="var(--alta)" strokeWidth="1.2" fill="none" />
      <path d="M30 6 c-6 4 -6 10 0 12 c6 -2 6 -8 0 -12 Z" stroke="var(--sindoor)" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2" fill="var(--marigold)" />
      <circle cx="34" cy="10" r="1.4" fill="var(--gold)" />
      <circle cx="10" cy="34" r="1.4" fill="var(--gold)" />
    </svg>
  )
}

// ── Soft candle glow backdrop ──
export function CandleGlow({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={cn('pointer-events-none absolute rounded-full bg-candle-glow blur-2xl', className)} style={style} aria-hidden="true" />
}

// ── Marigold petals drifting down, very subtly ──
export function MarigoldParticles({ count = 10, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {range(count).map((i) => {
        const left = (i * 97) % 100
        const delay = (i * 1.7) % 12
        const dur = 14 + ((i * 3) % 10)
        const scale = 0.5 + ((i * 7) % 5) / 10
        return (
          <span
            key={i}
            className="absolute -top-8 motion-safe:animate-[fall_linear_infinite]"
            style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${dur}s`, transform: `scale(${scale})` }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g stroke="var(--marigold)" strokeWidth="1" opacity="0.7">
                {range(6).map((p) => (
                  <ellipse key={p} cx="8" cy="8" rx="2.2" ry="5" transform={`rotate(${p * 60} 8 8)`} fill="var(--marigold-light)" fillOpacity="0.35" />
                ))}
              </g>
              <circle cx="8" cy="8" r="1.6" fill="var(--gold)" />
            </svg>
          </span>
        )
      })}
    </div>
  )
}

// ── Concentric alpona mandala (footer / loader centrepiece) ──
export function AlponaMandala({ size = 120, className, spin = false }: { size?: number; className?: string; spin?: boolean }) {
  return (
    <svg
      className={cn(spin && 'motion-safe:animate-spin-slow', className)}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="52" stroke="var(--gold-antique)" strokeWidth="1" strokeDasharray="2 5" />
      <circle cx="60" cy="60" r="40" stroke="var(--alta)" strokeWidth="1" />
      {range(12).map((i) => (
        <ellipse key={i} cx="60" cy="60" rx="5" ry="30" transform={`rotate(${i * 30} 60 60)`} stroke="var(--sindoor)" strokeWidth="1" opacity="0.55" />
      ))}
      {range(8).map((i) => (
        <circle key={i} cx="60" cy="16" r="1.8" fill="var(--marigold)" transform={`rotate(${i * 45} 60 60)`} />
      ))}
      <circle cx="60" cy="60" r="10" stroke="var(--gold)" strokeWidth="1.4" />
      <circle cx="60" cy="60" r="3" fill="var(--sindoor)" />
    </svg>
  )
}

// ── Small ink flourish used to punctuate section headings ──
export function InkStroke({ className }: { className?: string }) {
  return (
    <svg className={className} width="120" height="12" viewBox="0 0 120 12" fill="none" aria-hidden="true">
      <path d="M2 6 C30 2 40 10 60 6 C80 2 92 10 118 6" stroke="var(--alta)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="60" cy="6" r="2" fill="var(--marigold)" />
    </svg>
  )
}
