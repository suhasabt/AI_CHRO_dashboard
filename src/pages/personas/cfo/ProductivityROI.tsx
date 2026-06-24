import { cfoProductivity } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { BarChart } from '@/components/beeforce/charts/BarChart'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { ScatterChart } from '@/components/beeforce/charts/ScatterChart'
import { Gauge } from '@/components/beeforce/charts/Gauge'

export function CfoProductivityRoi() {
  const d = cfoProductivity
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Productivity ROI" />
      <FilterBar />

      <SectionCard title="Revenue Per Worker — by Site (₹)">
        <AIInsight insight={d.revenueInsight} />
        <BarChart bars={d.revenuePerWorkerBySite.map(s => ({ label: s.label, value: s.value, color: s.value < 80000 ? '#EF4444' : '#00B37E' }))} max={92000} unit="" />
      </SectionCard>

      <SectionCard title="Labour Productivity Index — Trend">
        <AIInsight insight={d.productivityInsight} />
        <LineChart labels={d.productivityTrend.weeks} series={[{ name: 'Productivity Index', values: d.productivityTrend.values, color: '#0056c1' }]} min={75} max={90} />
      </SectionCard>

      <SectionCard title="Cost Per Unit Produced — by Site (₹)">
        <AIInsight insight={d.costPerUnitInsight} />
        <BarChart bars={d.costPerUnitBySite.map(s => ({ label: s.label, value: s.value, color: s.value > 48 ? '#EF4444' : '#00B37E' }))} max={56} unit="" />
      </SectionCard>

      <SectionCard title="OT % vs Productivity Index">
        <AIInsight insight={d.scatterInsight} />
        <ScatterChart points={d.scatterOtVsProductivity} xLabel="Overtime %" yLabel="Productivity Index" />
      </SectionCard>

      <SectionCard title="Workforce Utilization % — by Site">
        <div className="flex flex-wrap gap-6 mt-2 justify-around">
          {d.utilizationBySite.map(s => <Gauge key={s.label} value={s.value} label={s.label} size={110} />)}
        </div>
      </SectionCard>
    </div>
  )
}
