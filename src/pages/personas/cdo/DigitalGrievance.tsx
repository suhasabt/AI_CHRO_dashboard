import { cdoGrievance } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { BarChart } from '@/components/beeforce/charts/BarChart'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { DonutChart } from '@/components/beeforce/charts/DonutChart'

export function CdoDigitalGrievance() {
  const d = cdoGrievance
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Digital Grievance & Support" />
      <FilterBar />

      <SectionCard title="Grievance Resolution Rate — Trend">
        <AIInsight insight={d.resolutionInsight} />
        <LineChart labels={d.resolutionTrend.weeks} series={[{ name: 'Resolution Rate', values: d.resolutionTrend.values, color: '#0056c1' }]} min={74} max={90} />
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Grievance Channel Breakdown">
          <div className="mt-2"><DonutChart slices={d.channelBreakdown} /></div>
        </SectionCard>
        <SectionCard title="Average Resolution TAT — by Channel (days)">
          <AIInsight insight={d.channelInsight} />
          <BarChart bars={d.tatByChannel} max={8} unit=" d" />
        </SectionCard>
      </div>

      <SectionCard title="First Contact Resolution Rate — by Site">
        <AIInsight insight={d.firstContactInsight} />
        <BarChart bars={d.firstContactBySite.map(s => ({ ...s, color: s.value === 0 ? '#EF4444' : s.value < 50 ? '#F59E0B' : '#00B37E' }))} max={70} />
      </SectionCard>

      <SectionCard title="Repeat Grievance Rate — by Site (count)">
        <BarChart bars={d.repeatBySite.map(s => ({ ...s, color: s.value > 10 ? '#EF4444' : '#00B37E' }))} max={16} unit="" />
      </SectionCard>
    </div>
  )
}
