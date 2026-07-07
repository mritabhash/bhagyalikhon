import { useEffect, useRef, useState, useCallback } from 'react'

/** True when the user (or the app's motion toggle) asks for reduced motion. */
export function useReducedMotionPref(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const check = () => {
      const attr = document.documentElement.getAttribute('data-motion')
      const media = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setReduced(attr === 'off' || (attr !== 'on' && media))
    }
    check()
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mq.addEventListener('change', check)
    const obs = new MutationObserver(check)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] })
    return () => {
      mq.removeEventListener('change', check)
      obs.disconnect()
    }
  }, [])
  return reduced
}

/** Reveal-on-scroll: adds a class / boolean when the element enters the viewport once. */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  margin = '0px 0px -12% 0px',
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: margin, threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return { ref, inView }
}

/** Magnetic hover — the element drifts gently toward the pointer. */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 0.35) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotionPref()
  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.transform = 'translate(0px, 0px)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [strength, reduced])
  return ref
}

/** Soft 3D tilt for paper cards, following the pointer. */
export function useTilt<T extends HTMLElement = HTMLDivElement>(max = 6) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotionPref()
  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el || reduced) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`
    },
    [max, reduced],
  )
  const onLeave = useCallback(() => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)'
  }, [])
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}

/** Count a number up when it scrolls into view. */
export function useCountUp(end: number, duration = 1400) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>()
  const [value, setValue] = useState(0)
  const reduced = useReducedMotionPref()
  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setValue(end)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(eased * end))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, end, duration, reduced])
  return { ref, value }
}
