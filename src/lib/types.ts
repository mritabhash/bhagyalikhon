// Core shared types for the Bhagyalikhon reading experience.

export type Hand = 'left' | 'right' | 'both'

// ---- Palm refinement indicators (the "refine your reading" guided fallback) ----
export type LifeLineDepth = 'faint' | 'medium' | 'deep'
export type LifeLineCurve = 'narrow' | 'balanced' | 'wide'
export type HeadLineStyle = 'straight' | 'curved' | 'sloping' | 'forked'
export type HeartLineStyle = 'straight' | 'curved' | 'long' | 'short' | 'chained'
export type Visibility = 'absent' | 'faint' | 'clear' | 'broken'
export type SimpleVisibility = 'absent' | 'faint' | 'clear'
export type PalmShape = 'square' | 'rectangular' | 'long' | 'broad'
export type FingerLength = 'short' | 'balanced' | 'long'
export type ThumbStrength = 'flexible' | 'balanced' | 'firm'
export type MountLevel = 'low' | 'balanced' | 'prominent'
export type MountSoftness = 'soft' | 'balanced' | 'full'

export interface PalmIndicators {
  lifeDepth: LifeLineDepth
  lifeCurve: LifeLineCurve
  headStyle: HeadLineStyle
  heartStyle: HeartLineStyle
  fate: Visibility
  sun: SimpleVisibility
  mercury: SimpleVisibility
  shape: PalmShape
  fingerLength: FingerLength
  thumb: ThumbStrength
  venus: MountSoftness
  jupiter: MountLevel
  moon: MountLevel
}

export const DEFAULT_PALM: PalmIndicators = {
  lifeDepth: 'medium',
  lifeCurve: 'balanced',
  headStyle: 'curved',
  heartStyle: 'curved',
  fate: 'clear',
  sun: 'faint',
  mercury: 'faint',
  shape: 'square',
  fingerLength: 'balanced',
  thumb: 'balanced',
  venus: 'balanced',
  jupiter: 'balanced',
  moon: 'balanced',
}

// Elemental hand type derived from shape + finger length
export type HandElement = 'earth' | 'air' | 'fire' | 'water'

// ---- Numerology ----
export interface ReductionStep {
  label: string
  expression: string
  value: number
}

export interface NumberResult {
  key: string
  label: string
  value: number
  rawTotal: number
  isMaster: boolean
  karmicDebt: number | null
  steps: ReductionStep[]
}

export interface NumerologyChart {
  lifePath: NumberResult
  birthday: NumberResult
  expression: NumberResult
  soulUrge: NumberResult
  personality: NumberResult
  maturity: NumberResult
  personalYear: NumberResult
  masterNumbers: number[]
  karmicDebts: number[]
  currentYear: number
}

// ---- Reading input & output ----
export interface ReadingInput {
  fullName: string
  preferredName?: string
  dob: string // ISO yyyy-mm-dd
  gender?: string
  hand: Hand
  palm: PalmIndicators
  imageProvided?: boolean
  currentYear?: number
}

export interface ReadingSection {
  id: string
  title: string
  kicker?: string
  paragraphs: string[]
  bullets?: { heading: string; text: string }[]
}

export interface FullReading {
  palm: ReadingSection[]
  numerology: ReadingSection[]
  combined: ReadingSection[]
}

export interface ReadingRecord {
  id: string
  createdAt: number
  input: ReadingInput
  chart: NumerologyChart
  wordCounts: { palm: number; numerology: number; combined: number }
}

// ---- Preferences ----
export interface Preferences {
  motion: 'full' | 'reduced'
  cursorGlow: boolean
  reportFont: 'serif' | 'sans'
  particles: boolean
}

export const DEFAULT_PREFS: Preferences = {
  motion: 'full',
  cursorGlow: true,
  reportFont: 'serif',
  particles: true,
}
