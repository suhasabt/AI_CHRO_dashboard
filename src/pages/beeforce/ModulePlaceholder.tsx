import { Sparkles } from 'lucide-react'
import { placeholderModules, moduleHealth, navItems } from '@/data/beeforceData'
import { PageHeader, HealthBadge, SectionCard } from '@/components/beeforce/Shared'

export function ModulePlaceholder({ moduleId }: { moduleId: string }) {
  const data = placeholderModules[moduleId]
  const health = moduleHealth[moduleId]
  const label = navItems.find(n => n.id === moduleId)?.label ?? moduleId

  if (!data) return null

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title={label} badge={health && <HealthBadge value={health.value} tone={health.tone} />} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.metrics.map(m => (
          <div key={m.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-[11px] font-medium text-muted-foreground mb-1.5">{m.label}</p>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-[#1B2B4B]">{m.value}</span>
              <span className="text-[10.5px] font-semibold text-muted-foreground">{m.delta}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="AI Summary">
        <div className="flex gap-2.5 items-start bg-[#EAF2FF] border border-[#0056c1]/15 rounded-lg p-3 mt-2">
          <Sparkles className="w-4 h-4 text-[#0056c1] mt-0.5 shrink-0" />
          <p className="text-[12.5px] italic text-[#1B2B4B] leading-relaxed">{data.note}</p>
        </div>
      </SectionCard>
    </div>
  )
}
