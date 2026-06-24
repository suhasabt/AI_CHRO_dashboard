import { useCompany } from '@/state/CompanyContext'
import { WEICard } from '@/components/beeforce/WEICard'
import { PriorityActions } from '@/components/beeforce/PriorityActions'
import { KPITile } from '@/components/beeforce/KPITile'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { SectionCard } from '@/components/beeforce/Shared'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { BarChart } from '@/components/beeforce/charts/BarChart'

export function ExecutiveOverview({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { company } = useCompany()
  const { kpis, attendanceTrend, complianceByModule } = company

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2"><WEICard /></div>
        <PriorityActions onNavigate={onNavigate} />
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Workforce KPIs</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {kpis.map(k => (
            <KPITile key={k.id} kpi={k} onClick={() => onNavigate(k.moduleId)} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Attendance Trend — Last 6 Weeks">
          <AIInsight insight={attendanceTrend.insight} />
          <LineChart
            labels={attendanceTrend.weeks}
            series={[
              { name: 'Attendance %', values: attendanceTrend.attendance, color: '#00B37E' },
              { name: 'Target', values: attendanceTrend.target, color: '#9AA5B5', dashed: true },
            ]}
            min={50} max={100}
          />
          <div className="flex gap-4 text-[11px] text-muted-foreground mt-1">
            <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#00B37E] inline-block" />Attendance %</span>
            <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-[#9AA5B5] inline-block" />Target</span>
          </div>
        </SectionCard>

        <SectionCard title="Compliance by Module">
          <AIInsight insight={complianceByModule.insight} />
          <BarChart
            bars={complianceByModule.labels.map((l, i) => ({
              label: l,
              value: complianceByModule.values[i],
              color: complianceByModule.values[i] < 70 ? '#EF4444' : '#00B37E',
            }))}
          />
        </SectionCard>
      </div>
    </div>
  )
}
