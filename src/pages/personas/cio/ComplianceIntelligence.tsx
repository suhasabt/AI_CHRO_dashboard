import { cioCompliance } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { DonutChart } from '@/components/beeforce/charts/DonutChart'
import { cn } from '@/lib/utils'

const statusTone = { Expired: 'text-[#EF4444]', Expiring: 'text-[#F59E0B]', Valid: 'text-[#00B37E]' } as const

export function CioComplianceIntelligence() {
  const d = cioCompliance
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Compliance Intelligence" subtitle="Compliance viewed as a risk signal, not just a score" />
      <FilterBar />

      <SectionCard title="Compliance Score Trend — 12 Weeks">
        <AIInsight insight={d.trendInsight} />
        <LineChart labels={d.trend.weeks} series={[{ name: 'Compliance', values: d.trend.values, color: '#0056c1' }]} min={70} max={90} />
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Non-Compliance by Type">
          <div className="mt-2">
            <DonutChart slices={[
              { label: 'PF', value: d.byType[0].value, color: '#0056c1' },
              { label: 'ESI', value: d.byType[1].value, color: '#00B37E' },
              { label: 'Wage', value: d.byType[2].value, color: '#F59E0B' },
              { label: 'License', value: d.byType[3].value, color: '#EF4444' },
            ]} />
          </div>
          <AIInsight insight={d.clusterInsight} />
        </SectionCard>

        <SectionCard title="Audit Closure Rate — Trend">
          <AIInsight insight={d.auditInsight} />
          <LineChart labels={d.auditClosureTrend.weeks} series={[{ name: 'Audit Closure %', values: d.auditClosureTrend.values, color: '#F59E0B' }]} min={65} max={85} />
        </SectionCard>
      </div>

      <SectionCard title="License Expiry Calendar">
        <table className="w-full text-[12px] mt-2">
          <thead><tr className="text-left text-muted-foreground border-b border-border">
            <th className="py-2 font-medium">Vendor</th><th className="py-2 font-medium">License</th><th className="py-2 font-medium">Days Until</th><th className="py-2 font-medium">Status</th>
          </tr></thead>
          <tbody>
            {d.licenseCalendar.map(l => (
              <tr key={`${l.vendor}-${l.license}`} className="border-b border-border last:border-0">
                <td className="py-2 font-semibold text-[#1B2B4B]">{l.vendor}</td>
                <td className="py-2 text-muted-foreground">{l.license}</td>
                <td className="py-2">{l.daysUntil < 0 ? `${Math.abs(l.daysUntil)} days ago` : `in ${l.daysUntil} days`}</td>
                <td className={cn('py-2 font-semibold', statusTone[l.status])}>{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <SectionCard title="Repeat Non-Compliance — by Vendor">
        <table className="w-full text-[12px] mt-2">
          <thead><tr className="text-left text-muted-foreground border-b border-border">
            <th className="py-2 font-medium">Vendor</th><th className="py-2 font-medium">Incidents</th><th className="py-2 font-medium">Repeat Pattern</th>
          </tr></thead>
          <tbody>
            {d.repeatByVendor.map(v => (
              <tr key={v.vendor} className="border-b border-border last:border-0">
                <td className="py-2 font-semibold text-[#1B2B4B]">{v.vendor}</td>
                <td className="py-2">{v.incidents}</td>
                <td className={cn('py-2 font-semibold', v.repeat ? 'text-[#EF4444]' : 'text-[#00875A]')}>{v.repeat ? 'Yes — recurring' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  )
}
