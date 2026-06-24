import { cfoCostOverview } from '@/data/personaData'
import { PageHeader, MetricCard, SectionCard } from '@/components/beeforce/Shared'
import { AlertBanner } from '@/components/beeforce/AlertBanner'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { Gauge } from '@/components/beeforce/charts/Gauge'

export function CfoCostOverview() {
  const d = cfoCostOverview
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Cost Overview" subtitle="What is this workforce costing me and where is money at risk?" />

      <AlertBanner message={d.alert.message} cta={d.alert.cta} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <SectionCard title="Cost Control Score">
          <div className="flex items-center gap-5 mt-2">
            <Gauge value={d.costControlScore} />
            <p className="text-[12px] text-muted-foreground leading-relaxed">Composite of OT %, Payroll Accuracy, and Invoice Accuracy.</p>
          </div>
          <AIInsight insight={d.costControlInsight} label="Generate Insight" />
        </SectionCard>

        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total Workforce Cost</p>
          <span className="text-[30px] font-extrabold text-[#1B2B4B] leading-none">{d.totalWorkforceCost.value}</span>
          <span className="text-[11.5px] font-semibold text-[#92670B]">{d.totalWorkforceCost.delta} vs last week</span>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">WEI — Cost Lens</p>
          <span className="text-[30px] font-extrabold text-[#1B2B4B] leading-none">74<span className="text-sm text-muted-foreground"> / 100</span></span>
          <p className="text-[11.5px] text-[#1B2B4B] italic">{d.weiNote}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Cost KPIs</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {d.kpis.map(k => <MetricCard key={k.label} {...k} />)}
        </div>
      </div>

      <SectionCard title="Weekly Auto Narrative">
        <AIInsight insight={d.weeklyNarrative} label="Expand Narrative" />
      </SectionCard>
    </div>
  )
}
