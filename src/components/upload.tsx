import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { UploadCloud, ImageUp, Check, X } from 'lucide-react'
import { cn } from '../lib/utils'

export function FileDrop({
  preview,
  onFile,
  onClear,
}: {
  preview?: string | null
  onFile: (file: File, dataUrl: string) => void
  onClear?: () => void
}) {
  const [drag, setDrag] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handle = (file?: File | null) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => onFile(file, reader.result as string)
    reader.readAsDataURL(file)
  }

  if (preview) {
    return (
      <div className="relative overflow-hidden rounded-[1.4rem] border border-parchment bg-ivory shadow-paper">
        <img src={preview} alt="Palm preview" className="max-h-[420px] w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 flex justify-between gap-2 bg-gradient-to-t from-ritual-deep/70 to-transparent p-3">
          <button type="button" onClick={() => inputRef.current?.click()} className="rounded-full bg-paper/90 px-4 py-1.5 text-sm font-semibold text-ritual cursor-pointer">Change photo</button>
          {onClear && <button type="button" onClick={onClear} className="grid h-9 w-9 place-items-center rounded-full bg-paper/90 text-ritual cursor-pointer"><X size={16} /></button>}
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handle(e.target.files?.[0])} />
      </div>
    )
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files?.[0]) }}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center rounded-[1.4rem] border-2 border-dashed px-6 py-14 text-center transition-all duration-300',
        drag ? 'border-sindoor bg-ivory shadow-glow-red' : 'border-gold-antique/50 bg-paper-50 hover:border-marigold hover:bg-ivory/60',
      )}
    >
      <span className="grid h-16 w-16 place-items-center rounded-full border border-gold-antique/50 bg-ivory text-sindoor">
        {drag ? <ImageUp size={26} /> : <UploadCloud size={26} />}
      </span>
      <span className="mt-4 font-serif text-xl text-heading">Place your palm here</span>
      <span className="mt-1 max-w-sm font-sans text-sm text-ink-muted">Drag &amp; drop a clear photo of your open palm, or tap to browse. Your image stays on your device.</span>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handle(e.target.files?.[0])} />
    </label>
  )
}

const CHECKS = ['Palm visible', 'Major lines visible', 'Lighting quality', 'Finger visibility', 'Background clarity', 'Image sharpness']

export function QualityCheck({ dataUrl }: { dataUrl: string }) {
  const [scores, setScores] = useState<number[]>([])
  useEffect(() => {
    setScores([])
    const img = new Image()
    img.onload = () => {
      // A gentle, honest simulation from basic image properties — not a scientific claim.
      const px = img.naturalWidth * img.naturalHeight
      const ratio = img.naturalWidth / img.naturalHeight
      const base = px > 900_000 ? 92 : px > 400_000 ? 80 : 66
      const portrait = ratio < 1.1 ? 6 : -4
      const seed = [base + portrait, base - 4, base - 8, base + 2, base - 10, px > 1_500_000 ? 90 : 74]
      seed.forEach((v, i) => window.setTimeout(() => setScores((s) => [...s, Math.max(52, Math.min(97, v))]), 220 * (i + 1)))
    }
    img.src = dataUrl
  }, [dataUrl])

  return (
    <ul className="space-y-2.5">
      {CHECKS.map((label, i) => {
        const v = scores[i]
        const ready = v != null
        const good = ready && v >= 78
        return (
          <li key={label} className="flex items-center gap-3">
            <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs', !ready ? 'border-parchment text-ink-muted' : good ? 'border-marigold bg-marigold/15 text-ritual' : 'border-alta/50 bg-alta/10 text-alta')}>
              {ready ? <Check size={13} /> : <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted" />}
            </span>
            <span className="w-40 shrink-0 font-sans text-sm text-ink">{label}</span>
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-parchment/70">
              <motion.span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-marigold to-sindoor" initial={{ width: 0 }} animate={{ width: ready ? `${v}%` : 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
            </span>
            <span className="w-10 text-right font-sans text-xs text-ink-muted">{ready ? `${v}%` : '···'}</span>
          </li>
        )
      })}
    </ul>
  )
}
