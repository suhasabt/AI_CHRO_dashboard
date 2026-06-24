import { useState } from 'react'
import { cn } from '@/lib/utils'

const severityStyle = {
  High: { dot: 'bg-[#EF4444]', badge: 'bg-[#EF4444]/10 text-[#C92A2A]' },
  Medium: { dot: 'bg-[#F59E0B]', badge: 'bg-[#F59E0B]/10 text-[#92670B]' },
  Low: { dot: 'bg-[#00B37E]', badge: 'bg-[#00B37E]/10 text-[#00875A]' },
} as const

export function AnomalyFeedItem({
  severity, module, text, time, status: initialStatus,
}: { severity: 'High' | 'Medium' | 'Low'; module: string; text: string; time: string; status: 'Active' | 'Resolved' }) {
  const [status, setStatus] = useState(initialStatus)
  const [expanded, setExpanded] = useState(false)
  const s = severityStyle[severity]

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <span className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', s.dot)} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded', s.badge)}>{severity.toUpperCase()}</span>
          <span className="text-[10.5px] font-medium text-muted-foreground">{module}</span>
          <span className="text-[10px] text-muted-foreground ml-auto whitespace-nowrap">{time}</span>
        </div>
        <p className="text-[12.5px] text-[#1B2B4B] leading-snug">{text}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <button onClick={() => setExpanded(v => !v)} className="text-[11px] font-semibold text-[#0056c1] hover:underline">
            {expanded ? 'Hide Detail' : 'View Detail →'}
          </button>
          {status === 'Active' ? (
            <button onClick={() => setStatus('Resolved')} className="text-[11px] font-semibold text-muted-foreground hover:text-[#00875A]">
              Mark Resolved
            </button>
          ) : (
            <span className="text-[11px] font-semibold text-[#00875A]">✓ Resolved</span>
          )}
        </div>
        {expanded && (
          <div className="mt-2 bg-muted/50 rounded-md p-2.5 text-[11.5px] text-muted-foreground">
            Detail view would drill into the {module} module with the annotated chart and affected worker/vendor list for this anomaly.
          </div>
        )}
      </div>
    </div>
  )
}
