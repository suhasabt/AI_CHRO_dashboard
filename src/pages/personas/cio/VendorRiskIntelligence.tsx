import { cioVendor } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { BarChart } from '@/components/beeforce/charts/BarChart'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { ScatterChart } from '@/components/beeforce/charts/ScatterChart'

export function CioVendorRiskIntelligence() {
  const d = cioVendor
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Vendor Risk Intelligence" />
      <FilterBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Vendor Performance Score — Ranked">
          <AIInsight insight={d.performanceInsight} />
          <BarChart bars={d.performanceRanked} max={100} />
        </SectionCard>
        <SectionCard title="Vendor Compliance Score — Ranked">
          <BarChart bars={d.complianceRanked} max={100} />
        </SectionCard>
      </div>

      <SectionCard title="Vendor SLA Achievement — Trend (Top 3)">
        <LineChart labels={d.slaTrend.weeks} series={d.slaTrend.series} min={65} max={95} />
        <div className="flex gap-4 text-[11px] text-muted-foreground mt-1">
          {d.slaTrend.series.map(s => (
            <span key={s.name} className="flex items-center gap-1"><span className="w-2 h-0.5 inline-block" style={{ background: s.color }} />{s.name}</span>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Fulfillment Rate vs SLA Achievement">
          <AIInsight insight={d.scatterInsight} />
          <ScatterChart points={d.scatterFulfillmentVsSla} xLabel="Fulfillment Rate %" yLabel="SLA Achievement %" />
        </SectionCard>
        <SectionCard title="First Week Dropout Rate — by Vendor">
          <AIInsight insight={d.dropoutInsight} />
          <BarChart bars={d.dropoutByVendor.map(v => ({ ...v, color: v.value > 5 ? '#EF4444' : '#00B37E' }))} max={8} />
        </SectionCard>
      </div>
    </div>
  )
}
