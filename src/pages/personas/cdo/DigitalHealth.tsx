import { cdoHealth } from '@/data/personaData'
import { PageHeader, MetricCard, SectionCard } from '@/components/beeforce/Shared'
import { Gauge } from '@/components/beeforce/charts/Gauge'
import { HorizontalBarChart } from '@/components/beeforce/charts/BarChart'

export function CdoDigitalHealth() {
  const d = cdoHealth
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Digital Health Score" subtitle="How connected is our workforce to the platform — and where are we losing them?" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
          <Gauge value={d.digitalHealthScore} size={92} />
          <div>
            <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wide">Digital Health Score</p>
            <p className="text-[11px] text-muted-foreground">App Usage + Comm Reach + Geo Compliance</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1">
          <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wide">Active Users This Week</p>
          <span className="text-[26px] font-extrabold text-[#1B2B4B] leading-none">{d.activeUsers.value}</span>
          <span className="text-[11px] text-muted-foreground">{d.activeUsers.pct} of total workforce</span>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1">
          <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wide">Lowest Adoption Site</p>
          <span className="text-[20px] font-extrabold text-[#EF4444] leading-none">{d.lowestSite.site}: {d.lowestSite.value}%</span>
          <span className="text-[11px] text-muted-foreground">Flagged automatically — investigate</span>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1">
          <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wide">WEI — Engagement Lens</p>
          <span className="text-[26px] font-extrabold text-[#1B2B4B] leading-none">74<span className="text-sm text-muted-foreground"> /100</span></span>
          <p className="text-[11px] text-[#1B2B4B] italic">{d.weiNote}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Digital Engagement KPIs</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {d.kpis.map(k => <MetricCard key={k.label} {...k} />)}
        </div>
      </div>

      <SectionCard title="Site Adoption Heatmap (App Usage %)">
        <HorizontalBarChart bars={d.siteAdoption.map(s => ({ label: s.site, value: s.value, color: s.value >= 70 ? '#00B37E' : s.value >= 40 ? '#F59E0B' : '#EF4444' }))} height={200} />
      </SectionCard>
    </div>
  )
}
