import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { ReadingInput, ReadingRecord, Preferences } from './types'
import { DEFAULT_PALM, DEFAULT_PREFS } from './types'

const DRAFT_KEY = 'bhagya:draft'
const PREFS_KEY = 'bhagya:prefs'
const HISTORY_KEY = 'bhagya:history'

const emptyDraft: ReadingInput = {
  fullName: '',
  preferredName: '',
  dob: '',
  gender: '',
  hand: 'right',
  palm: { ...DEFAULT_PALM },
  imageProvided: false,
  currentYear: new Date().getFullYear(),
}

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback
  } catch {
    return fallback
  }
}
function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage disabled — reading still works in-memory */
  }
}

interface Store {
  draft: ReadingInput
  setDraft: (partial: Partial<ReadingInput>) => void
  resetDraft: () => void
  prefs: Preferences
  setPrefs: (partial: Partial<Preferences>) => void
  history: ReadingRecord[]
  addToHistory: (record: ReadingRecord) => void
  removeFromHistory: (id: string) => void
  clearHistory: () => void
}

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<ReadingInput>(() => load(DRAFT_KEY, emptyDraft))
  const [prefs, setPrefsState] = useState<Preferences>(() => load(PREFS_KEY, DEFAULT_PREFS))
  const [history, setHistory] = useState<ReadingRecord[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const raw = window.localStorage.getItem(HISTORY_KEY)
      return raw ? (JSON.parse(raw) as ReadingRecord[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => save(DRAFT_KEY, draft), [draft])
  useEffect(() => save(PREFS_KEY, prefs), [prefs])
  useEffect(() => save(HISTORY_KEY, history), [history])

  // reflect motion preference on <html>
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-motion', prefs.motion === 'reduced' ? 'off' : 'on')
  }, [prefs.motion])

  const setDraft = useCallback((partial: Partial<ReadingInput>) => {
    setDraftState((d) => ({ ...d, ...partial }))
  }, [])
  const resetDraft = useCallback(() => setDraftState({ ...emptyDraft, currentYear: new Date().getFullYear() }), [])
  const setPrefs = useCallback((partial: Partial<Preferences>) => {
    setPrefsState((p) => ({ ...p, ...partial }))
  }, [])
  const addToHistory = useCallback((record: ReadingRecord) => {
    setHistory((h) => [record, ...h].slice(0, 24))
  }, [])
  const removeFromHistory = useCallback((id: string) => {
    setHistory((h) => h.filter((r) => r.id !== id))
  }, [])
  const clearHistory = useCallback(() => setHistory([]), [])

  return (
    <Ctx.Provider
      value={{ draft, setDraft, resetDraft, prefs, setPrefs, history, addToHistory, removeFromHistory, clearHistory }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useStore(): Store {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
