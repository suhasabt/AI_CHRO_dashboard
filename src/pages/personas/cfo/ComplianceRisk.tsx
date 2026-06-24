import { cfoCompliance } from '@/data/personaData'
import { PageHeader, MetricCard, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'

export function CfoComplianceRisk() {
  const d = cfoCompliance
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Compliance Risk — Financial Lens" subtitle="Compliance translated into ₹ exposure, not just % scores" />
      <FilterBar />

      <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-5">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Penalty Exposure Estimate</p>
          <span className="text-[32px] font-extrabold text-[#EF4444] leading-none">{d.penaltyExposure.value}</span>
        </div>
        <span className="text-[11.5px] font-semibold text-[#C92A2A]">{d.penaltyExposure.delta}</span>
        <p className="text-[11.5px] text-muted-foreground ml-auto max-w-sm">Non-compliant workers × average statutory penalty = ₹ at risk.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {d.metrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      <SectionCard title="Predictive Risk">
        <AIInsight insight={d.predictiveInsight} label="Generate Insight" />
      </SectionCard>

      <SectionCard title="Active Alert">
        <AIInsight insight={d.alertInsight} label="Generate Insight" />
      </SectionCard>
    </div>
  )
}
