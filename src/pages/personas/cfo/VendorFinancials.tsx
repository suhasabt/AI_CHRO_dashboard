import { cfoVendor } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { BarChart } from '@/components/beeforce/charts/BarChart'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { ScatterChart } from '@/components/beeforce/charts/ScatterChart'

export function CfoVendorFinancials() {
  const d = cfoVendor
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Vendor Financials" />
      <FilterBar />

      <div className="flex items-start gap-2.5 bg-[#EAF2FF] border border-[#0056c1]/15 rounded-lg p-3">
        <span className="text-[12.5px] italic text-[#1B2B4B] leading-relaxed">⚡ {d.actionTile}</span>
        <div className="ml-auto flex gap-2 shrink-0">
          <button className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#0056c1] text-white">Approve</button>
          <button className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#EF4444] text-white">Hold</button>
          <button className="text-[11px] font-semibold px-2.5 py-1 rounded-md border border-border">Review</button>
        </div>
      </div>

      <SectionCard title="Vendor Invoice Accuracy — per Vendor">
        <AIInsight insight={d.invoiceAccuracyInsight} />
        <BarChart bars={d.invoiceAccuracyByVendor} max={100} />
      </SectionCard>

      <SectionCard title="Vendor Billing Trend — Top 3 Vendors (₹L/week)">
        <AIInsight insight={d.billingTrendInsight} />
        <LineChart labels={d.billingTrend.weeks} series={d.billingTrend.series} min={10} max={22} />
        <div className="flex gap-4 text-[11px] text-muted-foreground mt-1">
          {d.billingTrend.series.map(s => (
            <span key={s.name} className="flex items-center gap-1"><span className="w-2 h-0.5 inline-block" style={{ background: s.color }} />{s.name}</span>
          ))}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Invoice Accuracy vs Vendor Performance Score">
          <AIInsight insight={d.scatterInsight} />
          <ScatterChart points={d.scatterInvoiceVsPerformance} xLabel="Vendor Performance Score %" yLabel="Invoice Accuracy %" />
        </SectionCard>

        <SectionCard title="Fulfillment Rate vs Cost Per Worker">
          <AIInsight insight={d.scatterFulfillmentInsight} />
          <ScatterChart points={d.scatterFulfillmentVsCost} xLabel="Fulfillment Rate %" yLabel="Cost Per Worker ₹" />
        </SectionCard>
      </div>
    </div>
  )
}
