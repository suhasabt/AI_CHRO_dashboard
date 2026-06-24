import { cfoPayroll } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { BarChart } from '@/components/beeforce/charts/BarChart'

export function CfoPayrollBilling() {
  const d = cfoPayroll
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Payroll & Billing" />
      <FilterBar />

      <SectionCard title="Payroll Accuracy — Weekly Trend">
        <AIInsight insight={d.payrollAccuracyInsight} />
        <LineChart labels={d.payrollAccuracyTrend.weeks} series={[{ name: 'Accuracy %', values: d.payrollAccuracyTrend.values, color: '#0056c1' }]} min={88} max={100} />
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Payroll Disputes — by Site (count)">
          <AIInsight insight={d.disputesInsight} />
          <BarChart bars={d.disputesBySite.map(s => ({ label: s.label, value: s.value, color: s.value > 10 ? '#EF4444' : '#00B37E' }))} max={16} unit="" />
        </SectionCard>

        <SectionCard title="Cost Per Worker — Site Comparison (₹)">
          <AIInsight insight={d.costPerWorkerInsight} />
          <BarChart bars={d.costPerWorkerBySite.map(s => ({ label: s.label, value: s.value, color: s.value > 19000 ? '#EF4444' : '#00B37E' }))} max={22000} defaultColor="#0056c1" unit="" />
        </SectionCard>
      </div>

      <SectionCard title="OT Cost % — by Site, by Week">
        <AIInsight insight={d.otInsight} />
        <LineChart
          labels={d.otBySite.weeks}
          series={d.otBySite.sites.map(s => ({ name: s.name, values: s.values, color: s.color }))}
          min={5} max={20}
        />
        <div className="flex gap-4 text-[11px] text-muted-foreground mt-1">
          {d.otBySite.sites.map(s => (
            <span key={s.name} className="flex items-center gap-1"><span className="w-2 h-0.5 inline-block" style={{ background: s.color }} />{s.name}</span>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="F&F Settlement TAT — Distribution (count)">
        <AIInsight insight={d.fnfInsight} />
        <BarChart bars={d.fnfTatBuckets.map(b => ({ label: b.label, value: b.value, color: b.label === '30+ days' ? '#EF4444' : '#00B37E' }))} max={20} unit="" />
      </SectionCard>
    </div>
  )
}
