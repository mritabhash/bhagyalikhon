import type { NumberResult, NumerologyChart, ReductionStep } from './types'

// Pythagorean letter → number chart
// A J S = 1 · B K T = 2 · C L U = 3 · D M V = 4 · E N W = 5
// F O X = 6 · G P Y = 7 · H Q Z = 8 · I R = 9
const LETTER_VALUES: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u'])
const MASTERS = new Set([11, 22, 33])
const KARMIC = new Set([13, 14, 16, 19])

export function letterValue(ch: string): number {
  return LETTER_VALUES[ch.toLowerCase()] ?? 0
}

export function isVowel(ch: string): boolean {
  return VOWELS.has(ch.toLowerCase())
}

function sumDigits(n: number): number {
  return Math.abs(n)
    .toString()
    .split('')
    .reduce((a, d) => a + Number(d), 0)
}

/**
 * Reduce a total to a single digit, preserving master numbers (11/22/33).
 * Returns the final value plus the visible reduction chain and any karmic-debt
 * number (13/14/16/19) encountered before the final digit.
 */
export function reduceWithSteps(
  total: number,
  keepMaster = true,
): { value: number; steps: ReductionStep[]; karmicDebt: number | null; isMaster: boolean } {
  const steps: ReductionStep[] = []
  let current = total
  let karmicDebt: number | null = KARMIC.has(total) ? total : null

  while (current > 9 && !(keepMaster && MASTERS.has(current))) {
    if (KARMIC.has(current)) karmicDebt = current
    const digits = current.toString().split('')
    const next = digits.reduce((a, d) => a + Number(d), 0)
    steps.push({
      label: `${current}`,
      expression: digits.join(' + '),
      value: next,
    })
    current = next
  }

  return {
    value: current,
    steps,
    karmicDebt,
    isMaster: MASTERS.has(current),
  }
}

function makeResult(
  key: string,
  label: string,
  rawTotal: number,
  keepMaster = true,
  seedSteps: ReductionStep[] = [],
): NumberResult {
  const r = reduceWithSteps(rawTotal, keepMaster)
  return {
    key,
    label,
    value: r.value,
    rawTotal,
    isMaster: r.isMaster,
    karmicDebt: r.karmicDebt,
    steps: [...seedSteps, ...r.steps],
  }
}

function lettersOf(name: string): string[] {
  return name.toLowerCase().replace(/[^a-z]/g, '').split('')
}

// ---- Individual number calculations ----

export function lifePathNumber(dob: string): NumberResult {
  // dob: yyyy-mm-dd
  const [y, m, d] = dob.split('-').map(Number)
  const mr = reduceWithSteps(m)
  const dr = reduceWithSteps(d)
  const yr = reduceWithSteps(y)
  const total = mr.value + dr.value + yr.value
  const seed: ReductionStep[] = [
    { label: 'Month', expression: `${m} → ${mr.value}`, value: mr.value },
    { label: 'Day', expression: `${d} → ${dr.value}`, value: dr.value },
    { label: 'Year', expression: `${y} → ${yr.value}`, value: yr.value },
    { label: 'Sum', expression: `${mr.value} + ${dr.value} + ${yr.value}`, value: total },
  ]
  return makeResult('lifePath', 'Life Path', total, true, seed)
}

export function birthdayNumber(dob: string): NumberResult {
  const d = Number(dob.split('-')[2])
  return makeResult('birthday', 'Birthday', d, true)
}

export function expressionNumber(fullName: string): NumberResult {
  const letters = lettersOf(fullName)
  const total = letters.reduce((a, ch) => a + letterValue(ch), 0)
  return makeResult('expression', 'Expression / Destiny', total, true)
}

export function soulUrgeNumber(fullName: string): NumberResult {
  const total = lettersOf(fullName)
    .filter(isVowel)
    .reduce((a, ch) => a + letterValue(ch), 0)
  return makeResult('soulUrge', 'Soul Urge', total, true)
}

export function personalityNumber(fullName: string): NumberResult {
  const total = lettersOf(fullName)
    .filter((ch) => !isVowel(ch))
    .reduce((a, ch) => a + letterValue(ch), 0)
  return makeResult('personality', 'Personality', total, true)
}

export function maturityNumber(lifePath: number, expression: number): NumberResult {
  const total = lifePath + expression
  const seed: ReductionStep[] = [
    { label: 'Life Path + Expression', expression: `${lifePath} + ${expression}`, value: total },
  ]
  return makeResult('maturity', 'Maturity', total, true, seed)
}

export function personalYearNumber(dob: string, currentYear: number): NumberResult {
  const [, m, d] = dob.split('-').map(Number)
  const mr = reduceWithSteps(m)
  const dr = reduceWithSteps(d)
  const yr = reduceWithSteps(currentYear)
  const total = mr.value + dr.value + yr.value
  const seed: ReductionStep[] = [
    { label: 'Birth month', expression: `${m} → ${mr.value}`, value: mr.value },
    { label: 'Birth day', expression: `${d} → ${dr.value}`, value: dr.value },
    { label: 'Current year', expression: `${currentYear} → ${yr.value}`, value: yr.value },
    { label: 'Sum', expression: `${mr.value} + ${dr.value} + ${yr.value}`, value: total },
  ]
  return makeResult('personalYear', 'Personal Year', total, false, seed)
}

// ---- Full chart ----

export function buildChart(fullName: string, dob: string, currentYear: number): NumerologyChart {
  const lifePath = lifePathNumber(dob)
  const birthday = birthdayNumber(dob)
  const expression = expressionNumber(fullName)
  const soulUrge = soulUrgeNumber(fullName)
  const personality = personalityNumber(fullName)
  const maturity = maturityNumber(lifePath.value, expression.value)
  const personalYear = personalYearNumber(dob, currentYear)

  const all = [lifePath, birthday, expression, soulUrge, personality, maturity, personalYear]
  const masterNumbers = Array.from(
    new Set(all.filter((r) => r.isMaster).map((r) => r.value)),
  ).sort((a, b) => a - b)
  const karmicDebts = Array.from(
    new Set(all.map((r) => r.karmicDebt).filter((k): k is number => k !== null)),
  ).sort((a, b) => a - b)

  return {
    lifePath,
    birthday,
    expression,
    soulUrge,
    personality,
    maturity,
    personalYear,
    masterNumbers,
    karmicDebts,
    currentYear,
  }
}

export function isMaster(n: number): boolean {
  return MASTERS.has(n)
}
