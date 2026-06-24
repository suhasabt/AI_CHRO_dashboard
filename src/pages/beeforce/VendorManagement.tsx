import { useCompany } from '@/state/CompanyContext'
import { PageHeader, HealthBadge, MetricCard, SectionCard } from '@/components/beeforce/Shared'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { cn } from '@/lib/utils'

const tagStyle = {
  Underperforming: 'bg-[#EF4444]/10 text-[#C92A2A]',
  Watch: 'bg-[#F59E0B]/10 text-[#92670B]',
  'On track': 'bg-[#00B37E]/10 text-[#00875A]',
} as const

function scoreColor(score: number) {
  if (score < 70) return '#EF4444'
  if (score < 85) return '#F59E0B'
  return '#00B37E'
}

export function VendorManagementPage() {
  const { company } = useCompany()
  const { vendors, vendorSlaTrend, vendorModuleMetrics, vendorBadge } = company

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Contractor & Vendor Management" badge={<HealthBadge value={vendorBadge.value} tone={vendorBadge.tone} />} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {vendorModuleMetrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {vendors.map(v => (
          <div key={v.name} className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-[#1B2B4B]">{v.name}</p>
                <p className="text-[11px] text-muted-foreground">{v.workers} workers</p>
              </div>
              <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap', tagStyle[v.tag])}>{v.tag}</span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold" style={{ color: scoreColor(v.score) }}>{v.score}%</span>
              <span className="text-[11px] text-muted-foreground">overall score</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex justify-between border-b border-border pb-1"><span className="text-muted-foreground">Fulfillment</span><span className="font-semibold">{v.fulfillment}%</span></div>
              <div className="flex justify-between border-b border-border pb-1"><span className="text-muted-foreground">Compliance</span><span className="font-semibold">{v.compliance}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">SLA</span><span className="font-semibold">{v.sla}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Invoice Acc.</span><span className="font-semibold">{v.invoiceAccuracy}%</span></div>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title={`Vendor SLA Trend — ${vendorSlaTrend.worstName} vs Average (8 Weeks)`}>
        <AIInsight insight={vendorSlaTrend.insight} />
        <LineChart
          labels={vendorSlaTrend.weeks}
          series={[
            { name: vendorSlaTrend.worstName, values: vendorSlaTrend.worst, color: '#EF4444' },
            { name: 'Average', values: vendorSlaTrend.average, color: '#9AA5B5', dashed: true },
          ]}
          min={20} max={100}
        />
        <div className="flex gap-4 text-[11px] text-muted-foreground mt-1">
          <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#EF4444] inline-block" />{vendorSlaTrend.worstName}</span>
          <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#9AA5B5] inline-block" />Average</span>
        </div>
      </SectionCard>
    </div>
  )
}
