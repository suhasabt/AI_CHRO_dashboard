import { cioDataQuality } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { BarChart } from '@/components/beeforce/charts/BarChart'

function cellColor(v: number) {
  if (v >= 90) return '#0F9D58'
  if (v >= 80) return '#00B37E'
  if (v >= 70) return '#F59E0B'
  return '#EF4444'
}

export function CioDataQuality() {
  const d = cioDataQuality
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Data Quality & Authenticity" subtitle="Is the data coming into BeeForce trustworthy?" />
      <FilterBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Geo Attendance Compliance % — by Vendor">
          <AIInsight insight={d.geoInsight} />
          <BarChart bars={d.geoComplianceByVendor} max={100} />
        </SectionCard>
        <SectionCard title="Verification Success Rate — by Vendor">
          <AIInsight insight={d.verificationInsight} />
          <BarChart bars={d.verificationByVendor} max={100} />
        </SectionCard>
      </div>

      <SectionCard title="Data Completeness — Sites × Modules">
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-[11.5px]">
            <thead>
              <tr><th className="py-1.5 text-left font-medium text-muted-foreground">Site</th>
                {d.dataCompletenessGrid.modules.map(m => <th key={m} className="py-1.5 font-medium text-muted-foreground">{m}</th>)}
              </tr>
            </thead>
            <tbody>
              {d.dataCompletenessGrid.sites.map((site, ri) => (
                <tr key={site}>
                  <td className="py-1 font-semibold text-[#1B2B4B]">{site}</td>
                  {d.dataCompletenessGrid.values[ri].map((v, ci) => (
                    <td key={ci} className="py-1 px-1">
                      <div className="rounded text-center text-white font-semibold py-1.5" style={{ background: cellColor(v) }}>{v}%</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">Red cell = data gap. Warehouse A's Attendance completeness (62%) is the standout gap.</p>
      </SectionCard>

      <SectionCard title="Duplicate / Anomalous Punch Rate — by Vendor">
        <table className="w-full text-[12px] mt-2">
          <thead><tr className="text-left text-muted-foreground border-b border-border">
            <th className="py-2 font-medium">Vendor</th><th className="py-2 font-medium">Flagged Punches</th><th className="py-2 font-medium">Confidence</th>
          </tr></thead>
          <tbody>
            {d.duplicatePunchByVendor.map(v => (
              <tr key={v.vendor} className="border-b border-border last:border-0">
                <td className="py-2 font-semibold text-[#1B2B4B]">{v.vendor}</td>
                <td className="py-2">{v.flagged}</td>
                <td className={`py-2 font-semibold ${v.flagged > 10 ? 'text-[#EF4444]' : 'text-muted-foreground'}`}>{v.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      <SectionCard title="Last Data Sync — by Site">
        <table className="w-full text-[12px] mt-2">
          <thead><tr className="text-left text-muted-foreground border-b border-border">
            <th className="py-2 font-medium">Site</th><th className="py-2 font-medium">Status</th><th className="py-2 font-medium">Last Sync</th>
          </tr></thead>
          <tbody>
            {d.lastSync.map(s => (
              <tr key={s.site} className="border-b border-border last:border-0">
                <td className="py-2 font-semibold text-[#1B2B4B]">{s.site}</td>
                <td className={`py-2 font-semibold ${s.status === 'Gap' ? 'text-[#EF4444]' : 'text-[#00875A]'}`}>{s.status === 'Gap' ? '⚠ Gap' : '✓ OK'}</td>
                <td className="py-2 text-muted-foreground">{s.lastSync}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  )
}
