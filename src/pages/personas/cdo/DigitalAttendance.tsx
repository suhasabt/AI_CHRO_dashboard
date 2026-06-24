import { cdoAttendance } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { BarChart } from '@/components/beeforce/charts/BarChart'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { cn } from '@/lib/utils'

export function CdoDigitalAttendance() {
  const d = cdoAttendance
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Digital Attendance (Geo)" subtitle="Is the workforce actually using the digital attendance channel — and is the data trustworthy?" />
      <FilterBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Geo Compliance % — by Site">
          <AIInsight insight={d.geoBySiteInsight} />
          <BarChart bars={d.geoBySite} max={100} />
        </SectionCard>
        <SectionCard title="Geo Compliance % — 8-Week Trend">
          <AIInsight insight={d.geoTrendInsight} />
          <LineChart labels={d.geoTrend.weeks} series={[{ name: 'Geo Compliance', values: d.geoTrend.values, color: '#0056c1' }]} min={84} max={96} />
        </SectionCard>
      </div>

      <SectionCard title="Geo vs Manual Punch Ratio — by Site">
        <div className="mt-2 flex flex-col gap-2.5">
          {d.geoVsManual.map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-[11.5px] w-24 shrink-0 text-[#1B2B4B] font-medium">{s.label}</span>
              <div className="flex-1 h-5 rounded-full overflow-hidden flex bg-muted">
                <div style={{ width: `${s.geo}%`, background: '#00B37E' }} />
                <div style={{ width: `${s.manual}%`, background: '#F59E0B' }} />
              </div>
              <span className="text-[11px] text-muted-foreground w-20 text-right shrink-0">{s.geo}% geo</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 text-[11px] text-muted-foreground mt-2">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block bg-[#00B37E]" />Geo punch</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm inline-block bg-[#F59E0B]" />Manual override</span>
        </div>
      </SectionCard>

      <SectionCard title="Geo Anomaly Flags (CDO Lens — Adoption, Not Fraud)">
        <div className="flex flex-col gap-2.5 mt-2">
          {d.anomalyFlags.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', f.severity === 'High' ? 'bg-[#EF4444]' : 'bg-[#00B37E]')} />
              <p className="text-[12.5px] text-[#1B2B4B] leading-snug"><span className="font-semibold">{f.site}:</span> {f.flag}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
