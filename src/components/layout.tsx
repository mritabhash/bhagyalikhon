import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'
import { buttonClass } from './ui'
import { AlponaMandala } from './ornaments'

const NAV = [
  { to: '/palm', label: 'Palm Reading' },
  { to: '/numerology', label: 'Numerology' },
  { to: '/combined', label: 'Combined' },
  { to: '/sample', label: 'Sample' },
  { to: '/method', label: 'Method' },
]

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="Bhagyalikhon home">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-antique/60 bg-ivory transition-transform duration-500 group-hover:rotate-[18deg]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2 C15 8 15 8 12 12 C9 8 9 8 12 2Z" stroke="var(--sindoor)" strokeWidth="1.3" />
          <path d="M4 12 C10 9 14 9 20 12 C14 15 10 15 4 12Z" stroke="var(--sindoor)" strokeWidth="1.3" />
          <circle cx="12" cy="12" r="2" fill="var(--marigold)" />
          <circle cx="12" cy="20" r="1.3" fill="var(--gold)" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight text-heading">Bhagyalikhon</span>
        {!compact && <span className="font-bengali text-[0.62rem] text-sindoor/80">ভাগ্যলিখন</span>}
      </span>
    </Link>
  )
}

export function ScrollProgressThread() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-marigold via-sindoor to-ritual"
      aria-hidden="true"
    />
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={cn(
          'container-wide flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6',
          scrolled ? 'border-parchment bg-paper/85 shadow-paper backdrop-blur-md' : 'border-transparent bg-paper/40 backdrop-blur-sm',
        )}
      >
        <Wordmark />
        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  'relative rounded-full px-3.5 py-2 font-sans text-sm font-medium transition-colors',
                  isActive ? 'text-sindoor' : 'text-ink-soft hover:text-ritual',
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link to="/combined" className={cn(buttonClass('primary', 'sm'), 'hidden sm:inline-flex')}>
            Start Your Reading
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-parchment bg-paper-50 text-ritual lg:hidden cursor-pointer"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="container-wide mt-2 overflow-hidden rounded-3xl border border-parchment bg-paper/95 p-3 shadow-paper-lg backdrop-blur-md lg:hidden"
          >
            {[{ to: '/', label: 'Home' }, ...NAV, { to: '/access', label: 'Access' }, { to: '/settings', label: 'Settings' }].map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn('block rounded-2xl px-4 py-3 font-sans font-medium transition-colors', isActive ? 'bg-ivory text-sindoor' : 'text-ink hover:bg-ivory/60')
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/combined" className={cn(buttonClass('primary', 'md'), 'mt-2 w-full')}>
              Start Your Reading
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export function Footer() {
  const cols = [
    { title: 'Readings', links: [{ to: '/palm', label: 'Palm Reading' }, { to: '/numerology', label: 'Numerology' }, { to: '/combined', label: 'Combined Reading' }, { to: '/sample', label: 'Sample Report' }] },
    { title: 'Understand', links: [{ to: '/method', label: 'The Method' }, { to: '/access', label: 'Access' }, { to: '/settings', label: 'Preferences' }] },
    { title: 'Trust', links: [{ to: '/privacy', label: 'Privacy' }, { to: '/terms', label: 'Terms' }] },
  ]
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-parchment bg-ivory/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-70">
        <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-gold-antique to-transparent" />
      </div>
      <div className="container-page grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs font-report text-sm leading-relaxed text-ink-soft">
            Where your lines and numbers quietly reveal their pattern. A reflective space for palm reading and numerology, offered in a warm, traditional spirit.
          </p>
          <div className="mt-5"><AlponaMandala size={64} /></div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 font-sans text-xs font-bold uppercase tracking-wide2 text-sindoor">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-sans text-sm text-ink-soft transition-colors hover:text-ritual">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-page flex flex-col items-center gap-3 border-t border-parchment/70 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-sans text-xs text-ink-muted">© {new Date().getFullYear()} Bhagyalikhon · For reflection & cultural tradition, not prediction or professional advice.</p>
        <p className="font-bengali text-sm text-sindoor/70">ভাগ্যলিখন</p>
      </div>
    </footer>
  )
}

export function CustomCursor({ enabled = true }: { enabled?: boolean }) {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [fine, setFine] = useState(false)
  useEffect(() => {
    if (!enabled) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    setFine(true)
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [enabled])
  if (!enabled || !fine) return null
  return (
    <div
      className="pointer-events-none fixed z-[70] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-candle-glow mix-blend-multiply blur-[2px] transition-transform duration-150 ease-out"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }}
      aria-hidden="true"
    />
  )
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}
