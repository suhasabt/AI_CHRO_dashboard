import { ArrowUp, ArrowDown, Minus } from 'lucide-react'
import type { KPI } from '@/data/beeforceData'
import { cn } from '@/lib/utils'

export function KPITile({ kpi, onClick }: { kpi: KPI; onClick?: () => void }) {
  const dotColor = kpi.flag === 'red' ? 'bg-[#EF4444]' : kpi.flag === 'amber' ? 'bg-[#F59E0B]' : 'bg-[#00B37E]'
  const TrendIcon = kpi.trend === 'up' ? ArrowUp : kpi.trend === 'down' ? ArrowDown : Minus
  const trendColor = kpi.flag
    ? (kpi.flag === 'red' ? 'text-[#EF4444]' : 'text-[#F59E0B]')
    : kpi.trend === 'up' ? 'text-[#00B37E]' : kpi.trend === 'down' ? 'text-[#EF4444]' : 'text-muted-foreground'

  return (
    <button
      onClick={onClick}
      className="text-left bg-card border border-border rounded-lg p-3.5 hover:shadow-md hover:border-[#0056c1]/30 transition-all group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-medium text-muted-foreground leading-tight pr-2">{kpi.label}</span>
        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColor)} />
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-xl font-bold text-[#1B2B4B] group-hover:text-[#0056c1] transition-colors">{kpi.value}</span>
        <span className={cn('flex items-center gap-0.5 text-[10.5px] font-semibold', trendColor)}>
          <TrendIcon className="w-3 h-3" />
          {kpi.delta.replace(/^[↑↓→]\s*/, '')}
        </span>
      </div>
    </button>
  )
}
