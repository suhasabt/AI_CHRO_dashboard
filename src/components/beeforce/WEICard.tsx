import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useCompany } from '@/state/CompanyContext'
import { Sparkline } from './charts/Sparkline'

export function WEICard() {
  const { company } = useCompany()
  const wei = company.wei
  const [animated, setAnimated] = useState(0)

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 900
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setAnimated(Math.round(t * wei.score))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [wei.score])

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Workforce Excellence Index</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[36px] font-extrabold text-[#1B2B4B] leading-none">{animated}</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
        </div>
        <Sparkline values={wei.trend} color="#F59E0B" width={110} height={36} />
      </div>

      <div className="mt-3">
        <div className="h-2.5 rounded-full bg-[#EEF1F6] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#00B37E] transition-all duration-700"
            style={{ width: `${animated}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[9.5px] text-muted-foreground">
          {wei.bands.map(b => (
            <span key={b.label} className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: b.color }} />
              {b.label} ({b.range})
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 items-start bg-[#EAF2FF] border border-[#0056c1]/15 rounded-lg p-3 mt-4">
        <Sparkles className="w-4 h-4 text-[#0056c1] mt-0.5 shrink-0" />
        <p className="text-[12px] italic text-[#1B2B4B] leading-relaxed">{wei.narrative}</p>
      </div>
    </div>
  )
}
