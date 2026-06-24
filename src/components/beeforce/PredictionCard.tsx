import { useState } from 'react'
import { cn } from '@/lib/utils'

function confidenceColor(c: number) {
  if (c >= 90) return '#EF4444'
  if (c >= 70) return '#F59E0B'
  return '#0056c1'
}

export function PredictionCard({
  label, module, confidence, timeframe, signal, action,
}: { label: string; module: string; confidence: number; timeframe: string; signal: string; action: string }) {
  const [state, setState] = useState<'open' | 'dismissed' | 'actioned'>('open')

  return (
    <div className={cn('bg-card border border-border rounded-xl p-4 flex flex-col gap-2', state !== 'open' && 'opacity-50')}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wide">{module}</span>
        <span className="text-[11px] font-bold" style={{ color: confidenceColor(confidence) }}>{confidence}% confidence</span>
      </div>
      <p className="text-[13px] font-semibold text-[#1B2B4B] leading-snug">{label}</p>
      <p className="text-[11.5px] text-muted-foreground leading-relaxed">{signal}</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[10.5px] text-muted-foreground">⏱ {timeframe}</span>
      </div>
      <p className="text-[11.5px] text-[#0056c1] font-medium">→ {action}</p>
      {state === 'open' && (
        <div className="flex gap-2 mt-1">
          <button onClick={() => setState('actioned')} className="flex-1 text-[11px] font-semibold px-2 py-1.5 rounded-md bg-[#0056c1] text-white hover:bg-[#0056c1]/90">
            Action Taken
          </button>
          <button onClick={() => setState('dismissed')} className="flex-1 text-[11px] font-semibold px-2 py-1.5 rounded-md border border-border text-muted-foreground hover:bg-muted">
            Dismiss
          </button>
        </div>
      )}
      {state !== 'open' && (
        <p className="text-[11px] font-semibold text-muted-foreground">{state === 'actioned' ? '✓ Action taken' : 'Dismissed'}</p>
      )}
    </div>
  )
}
