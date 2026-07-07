import { clsx, type ClassValue } from 'clsx'

// Public-folder assets referenced from JS need the Vite base prefix by hand
// (Vite only rewrites URLs in index.html and CSS, not string literals in JSX).
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

/** Tailwind-friendly class merge. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

export function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i)
}

export function uid(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export function titleCase(s: string): string {
  return s
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Deterministic small hash from a string — used to vary phrasing without randomness. */
export function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

/** Pick a deterministic item from a list based on a seed string. */
export function pick<T>(items: T[], seed: string): T {
  return items[hashString(seed) % items.length]
}

export function formatLongDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function firstName(full: string): string {
  const t = full.trim().split(/\s+/)[0]
  return t ? titleCase(t) : 'Traveller'
}

export function wordCount(
  sections: { paragraphs: string[]; bullets?: { text: string }[] }[],
): number {
  let n = 0
  for (const s of sections) {
    for (const p of s.paragraphs) n += p.trim().split(/\s+/).length
    for (const b of s.bullets ?? []) n += b.text.trim().split(/\s+/).length
  }
  return n
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
