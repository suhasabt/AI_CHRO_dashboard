import { cdoAdoption } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { BarChart } from '@/components/beeforce/charts/BarChart'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { DonutChart } from '@/components/beeforce/charts/DonutChart'

export function CdoAppAdoption() {
  const d = cdoAdoption
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="App & Channel Adoption" />
      <FilterBar />

      <SectionCard title="App Usage Rate — 8-Week Trend">
        <AIInsight insight={d.appUsageInsight} />
        <LineChart labels={d.appUsageTrend.weeks} series={d.appUsageTrend.series} min={25} max={88} />
        <div className="flex gap-4 text-[11px] text-muted-foreground mt-1">
          {d.appUsageTrend.series.map(s => (
            <span key={s.name} className="flex items-center gap-1"><span className="w-2 h-0.5 inline-block" style={{ background: s.color }} />{s.name}</span>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Notification Open Rate — by Site">
          <AIInsight insight={d.notificationInsight} />
          <BarChart bars={d.notificationOpenBySite} max={100} />
        </SectionCard>
        <SectionCard title="Communication Reach — by Vendor">
          <BarChart bars={d.reachByVendor.map(v => ({ ...v, color: '#0056c1' }))} max={100} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Channel Mix Breakdown">
          <div className="mt-2"><DonutChart slices={d.channelMix} /></div>
          <AIInsight insight={d.channelInsight} />
        </SectionCard>
        <SectionCard title="Feature Usage Breakdown">
          <BarChart bars={d.featureUsage.map(f => ({ ...f, color: f.value < 40 ? '#F59E0B' : '#00B37E' }))} max={100} />
        </SectionCard>
      </div>
    </div>
  )
}
