import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { useMagnetic, useTilt } from '../hooks'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export function buttonClass(variant: Variant = 'primary', size: Size = 'md'): string {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-wide transition-all duration-300 ease-candle cursor-pointer focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
  const sizes: Record<Size, string> = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-[0.95rem]',
    lg: 'px-9 py-4 text-base',
  }
  const variants: Record<Variant, string> = {
    primary: 'bg-sindoor text-paper shadow-glow-red hover:bg-sindoor-light hover:shadow-[0_16px_44px_-12px_rgba(192,42,34,0.55)]',
    secondary: 'border border-gold-antique/70 bg-paper-50 text-ritual hover:border-marigold hover:bg-ivory hover:shadow-glow-gold',
    ghost: 'text-ritual hover:text-sindoor',
  }
  return cn(base, sizes[size], variants[variant])
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  className,
  ...rest
}: {
  children: ReactNode
  variant?: Variant
  size?: Size
  magnetic?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useMagnetic<HTMLButtonElement>(magnetic ? 0.25 : 0)
  return (
    <button ref={ref} className={cn(buttonClass(variant, size), className)} {...rest}>
      {variant === 'primary' && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition group-hover:translate-x-full group-hover:opacity-100 duration-700" />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  )
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('kicker', className)}>
      <span className="h-px w-6 bg-gradient-to-r from-transparent to-sindoor" />
      {children}
    </span>
  )
}

// Fade + rise when scrolled into view
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'span'
}) {
  const M = motion[as] as typeof motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </M>
  )
}

// Word-by-word reveal for headings — line-by-line premium feel
export function RevealText({
  text,
  className,
  as = 'h2',
  delay = 0,
  stagger = 0.045,
}: {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  delay?: number
  stagger?: number
}) {
  const Tag = as
  const words = text.split(' ')
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(5)
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('card-paper transition-transform duration-200 ease-out will-change-transform', className)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

export function Field({
  label,
  hint,
  htmlFor,
  optional,
  children,
  className,
}: {
  label: string
  hint?: string
  htmlFor?: string
  optional?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <label htmlFor={htmlFor} className={cn('block', className)}>
      <span className="mb-1.5 flex items-baseline justify-between">
        <span className="font-sans text-sm font-semibold text-ink">{label}</span>
        {optional && <span className="text-xs text-ink-muted">optional</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-muted">{hint}</span>}
    </label>
  )
}

const inputBase =
  'w-full rounded-xl border border-parchment bg-paper-50 px-4 py-3 font-sans text-ink placeholder:text-ink-muted/70 shadow-inset-hair transition focus:border-marigold focus:outline-none focus:ring-2 focus:ring-marigold/30'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputBase, props.className)} />
}

// Selectable option cards (hand choice, palm refinements)
export interface Choice {
  value: string
  label: string
  desc?: string
}
export function ChoiceGroup({
  options,
  value,
  onChange,
  columns = 3,
  size = 'md',
}: {
  options: Choice[]
  value: string
  onChange: (v: string) => void
  columns?: 2 | 3 | 4
  size?: 'sm' | 'md'
}) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 md:grid-cols-4' }[columns]
  return (
    <div className={cn('grid grid-cols-1 gap-3', cols)}>
      {options.map((o) => {
        const selected = value === o.value
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={selected}
            className={cn(
              'relative overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-candle cursor-pointer',
              size === 'sm' ? 'px-4 py-3' : 'px-5 py-4',
              selected
                ? 'border-sindoor/60 bg-ivory shadow-glow-red'
                : 'border-parchment bg-paper-50 hover:border-marigold/60 hover:bg-ivory/60',
            )}
          >
            {selected && (
              <motion.span layoutId="choice-glow" className="pointer-events-none absolute inset-0 bg-candle-glow" />
            )}
            <span className="relative">
              <span className={cn('block font-sans font-semibold', selected ? 'text-sindoor' : 'text-ink', size === 'sm' ? 'text-sm' : 'text-[0.95rem]')}>{o.label}</span>
              {o.desc && <span className="relative mt-0.5 block text-xs leading-relaxed text-ink-muted">{o.desc}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// Accordion — report sections that unfold like paper
export interface AccordionItem {
  id: string
  title: string
  kicker?: string
  content: ReactNode
}
export function Accordion({ items, defaultOpen }: { items: AccordionItem[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? items[0]?.id ?? null)
  return (
    <div className="divide-y divide-parchment/70 overflow-hidden rounded-2xl border border-parchment bg-paper-50 shadow-paper">
      {items.map((it) => {
        const isOpen = open === it.id
        return (
          <div key={it.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : it.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ivory/50 cursor-pointer sm:px-6"
            >
              <span>
                {it.kicker && <span className="mb-0.5 block text-[0.68rem] font-semibold uppercase tracking-wide2 text-sindoor">{it.kicker}</span>}
                <span className="font-serif text-lg text-heading sm:text-xl">{it.title}</span>
              </span>
              <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold-antique/50 text-sindoor transition-transform duration-300', isOpen && 'rotate-45')}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 pt-1 sm:px-6">{it.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// Animated tabs with a sliding marigold underline
export interface TabItem {
  id: string
  label: string
  content: ReactNode
}
export function Tabs({ tabs, className }: { tabs: TabItem[]; className?: string }) {
  const [active, setActive] = useState(tabs[0]?.id)
  const current = tabs.find((t) => t.id === active) ?? tabs[0]
  return (
    <div className={className}>
      <div className="no-scrollbar mb-6 flex gap-1 overflow-x-auto border-b border-parchment">
        {tabs.map((t) => {
          const on = t.id === active
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={cn('relative whitespace-nowrap px-4 py-3 font-sans text-sm font-semibold transition-colors cursor-pointer', on ? 'text-sindoor' : 'text-ink-muted hover:text-ink')}
            >
              {t.label}
              {on && <motion.span layoutId="tab-underline" className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-marigold to-sindoor" />}
            </button>
          )
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current?.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {current?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Brass-stamped numerology tile
export function NumberTile({
  value,
  label,
  sub,
  master,
  karmic,
  active,
  size = 'md',
  className,
}: {
  value: number | string
  label?: string
  sub?: string
  master?: boolean
  karmic?: number | null
  active?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const dim = { sm: 'h-16 w-16 text-2xl', md: 'h-24 w-24 text-4xl', lg: 'h-32 w-32 text-6xl' }[size]
  return (
    <div className={cn('flex flex-col items-center gap-2 text-center', className)}>
      <div
        className={cn(
          'relative grid place-items-center rounded-2xl border font-serif font-semibold transition-all duration-500',
          dim,
          active || master ? 'border-marigold bg-ivory text-ritual shadow-glow-gold' : 'border-gold-antique/50 bg-paper-50 text-heading shadow-paper',
        )}
      >
        <span className="absolute inset-1 rounded-xl border border-gold-antique/25" />
        <span className="relative leading-none">{value}</span>
        {master && (
          <span className="absolute -right-2 -top-2 rounded-full bg-sindoor px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-paper shadow">Master</span>
        )}
      </div>
      {label && <span className="font-sans text-xs font-semibold uppercase tracking-wide2 text-ink-soft">{label}</span>}
      {sub && <span className="font-sans text-[0.7rem] text-ink-muted">{sub}</span>}
      {karmic ? <span className="rounded-full bg-alta/10 px-2 py-0.5 text-[0.65rem] font-semibold text-alta">Karmic {karmic}</span> : null}
    </div>
  )
}

// Golden-thread step indicator
export function StepDots({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((label, i) => {
        const done = i < current
        const on = i === current
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span className={cn('grid h-8 w-8 place-items-center rounded-full border text-xs font-semibold transition-all duration-500', on ? 'border-sindoor bg-sindoor text-paper shadow-glow-red' : done ? 'border-marigold bg-marigold/20 text-ritual' : 'border-parchment bg-paper-50 text-ink-muted')}>
                {done ? '✦' : i + 1}
              </span>
              <span className={cn('hidden text-[0.68rem] font-semibold sm:block', on ? 'text-sindoor' : 'text-ink-muted')}>{label}</span>
            </div>
            {i < steps.length - 1 && <span className={cn('mx-1 h-px w-8 sm:w-14 transition-colors duration-500', done ? 'bg-gradient-to-r from-marigold to-sindoor' : 'bg-parchment')} />}
          </div>
        )
      })}
    </div>
  )
}
