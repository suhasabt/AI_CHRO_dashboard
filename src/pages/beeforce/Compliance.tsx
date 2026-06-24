import { useCompany } from '@/state/CompanyContext'
import { PageHeader, HealthBadge, MetricCard, SectionCard } from '@/components/beeforce/Shared'
import { AlertBanner } from '@/components/beeforce/AlertBanner'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { cn } from '@/lib/utils'

const riskTone = { High: 'text-[#EF4444]', Medium: 'text-[#F59E0B]', Low: 'text-[#00B37E]' } as const
const licenseTone = { Expired: 'text-[#EF4444]', Expiring: 'text-[#F59E0B]', Valid: 'text-[#00B37E]' } as const
const licenseMark = { Expired: '🔴', Expiring: '🟡', Valid: '✅' } as const

export function CompliancePage() {
  const { company } = useCompany()
  const { complianceMetrics, vendorComplianceTable, complianceTrend, complianceBadge, complianceAlert } = company

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Compliance Module" badge={<HealthBadge value={complianceBadge.value} tone={complianceBadge.tone} />} />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {complianceMetrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      <AlertBanner message={complianceAlert.message} cta={complianceAlert.cta} />

      <SectionCard title="Vendor Compliance">
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="py-2 font-medium">Vendor</th>
                <th className="py-2 font-medium">Workers</th>
                <th className="py-2 font-medium">PF %</th>
                <th className="py-2 font-medium">ESI %</th>
                <th className="py-2 font-medium">License</th>
                <th className="py-2 font-medium">Last Audit</th>
                <th className="py-2 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {vendorComplianceTable.map(v => (
                <tr key={v.vendor} className="border-b border-border last:border-0 hover:bg-muted/40">
                  <td className="py-2.5 font-semibold text-[#1B2B4B]">{v.vendor}</td>
                  <td className="py-2.5">{v.workers}</td>
                  <td className="py-2.5">{v.pf}%</td>
                  <td className="py-2.5">{v.esi}%</td>
                  <td className={cn('py-2.5 font-medium', licenseTone[v.license])}>
                    {licenseMark[v.license]} {v.license}
                  </td>
                  <td className="py-2.5 text-muted-foreground">{v.lastAudit}</td>
                  <td className={cn('py-2.5 font-semibold', riskTone[v.risk])}>{v.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Compliance Trend — Last 8 Weeks">
        <AIInsight insight={complianceTrend.insight} />
        <LineChart
          labels={complianceTrend.weeks}
          series={[{ name: 'Overall Compliance', values: complianceTrend.values, color: '#0056c1' }]}
          min={30} max={100}
        />
      </SectionCard>
    </div>
  )
}
