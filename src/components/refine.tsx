import { ChoiceGroup, Field, type Choice } from './ui'
import type { PalmIndicators } from '../lib/types'

interface RefineRow {
  key: keyof PalmIndicators
  label: string
  hint?: string
  choices: Choice[]
}

const c = (v: string): Choice => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) })

export const HAND_CHOICES: Choice[] = [
  { value: 'left', label: 'Left hand', desc: 'Inherited tendencies, inner patterns, natural disposition.' },
  { value: 'right', label: 'Right hand', desc: 'Active choices, current direction, developed personality.' },
  { value: 'both', label: 'Both hands', desc: 'A fuller, more layered reading of the two together.' },
]

export const REFINE_ROWS: RefineRow[] = [
  { key: 'shape', label: 'Palm shape', choices: [c('square'), c('rectangular'), c('long'), c('broad')] },
  { key: 'fingerLength', label: 'Finger length', choices: [c('short'), c('balanced'), c('long')] },
  { key: 'thumb', label: 'Thumb', choices: [c('flexible'), c('balanced'), c('firm')] },
  { key: 'lifeDepth', label: 'Life Line depth', choices: [c('faint'), c('medium'), c('deep')] },
  { key: 'lifeCurve', label: 'Life Line curve', choices: [c('narrow'), c('balanced'), c('wide')] },
  { key: 'headStyle', label: 'Head Line', choices: [c('straight'), c('curved'), c('sloping'), c('forked')] },
  { key: 'heartStyle', label: 'Heart Line', choices: [c('straight'), c('curved'), c('long'), c('short'), c('chained')] },
  { key: 'fate', label: 'Fate Line', choices: [c('absent'), c('faint'), c('clear'), c('broken')] },
  { key: 'sun', label: 'Sun Line', choices: [c('absent'), c('faint'), c('clear')] },
  { key: 'mercury', label: 'Mercury Line', choices: [c('absent'), c('faint'), c('clear')] },
  { key: 'venus', label: 'Mount of Venus', choices: [c('soft'), c('balanced'), c('full')] },
  { key: 'jupiter', label: 'Mount of Jupiter', choices: [c('low'), c('balanced'), c('prominent')] },
  { key: 'moon', label: 'Mount of Moon', choices: [c('low'), c('balanced'), c('prominent')] },
]

export function PalmRefine({
  palm,
  onChange,
}: {
  palm: PalmIndicators
  onChange: (partial: Partial<PalmIndicators>) => void
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {REFINE_ROWS.map((row) => (
        <Field key={row.key} label={row.label} hint={row.hint}>
          <div className="mt-1">
            <ChoiceGroup
              options={row.choices}
              value={String(palm[row.key])}
              onChange={(v) => onChange({ [row.key]: v } as Partial<PalmIndicators>)}
              columns={row.choices.length > 3 ? 2 : 3}
              size="sm"
            />
          </div>
        </Field>
      ))}
    </div>
  )
}
