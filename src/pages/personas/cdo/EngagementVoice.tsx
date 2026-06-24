import { cdoEngagement } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { FilterBar } from '@/components/beeforce/FilterBar'
import { AIInsight } from '@/components/beeforce/AIInsight'
import { BarChart } from '@/components/beeforce/charts/BarChart'
import { LineChart } from '@/components/beeforce/charts/LineChart'
import { Gauge } from '@/components/beeforce/charts/Gauge'

export function CdoEngagementVoice() {
  const d = cdoEngagement
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Engagement & Voice" />
      <FilterBar />

      <SectionCard title="Workforce NPS — 12-Week Trend">
        <AIInsight insight={d.npsInsight} />
        <LineChart labels={d.npsTrend.weeks} series={[{ name: 'NPS', values: d.npsTrend.values, color: '#0056c1' }]} min={20} max={42} />
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Survey Participation Rate — by Site">
          <AIInsight insight={d.surveyInsight} />
          <BarChart bars={d.surveyBySite} max={100} />
        </SectionCard>
        <SectionCard title="Engagement Score — by Site">
          <BarChart bars={d.engagementBySite.map(s => ({ ...s, color: s.value < 60 ? '#EF4444' : '#00B37E' }))} max={100} />
        </SectionCard>
      </div>

      <SectionCard title="Content Consumption Rate — by Content Type">
        <AIInsight insight={d.contentInsight} />
        <BarChart bars={d.contentByType} max={100} />
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Referral Participation — by Site">
          <BarChart bars={d.referralBySite.map(s => ({ ...s, color: s.value < 20 ? '#EF4444' : '#00B37E' }))} max={55} />
        </SectionCard>
        <SectionCard title="Referral Reward Utilization">
          <div className="flex justify-center mt-2"><Gauge value={d.rewardUtilization} size={140} /></div>
        </SectionCard>
      </div>
    </div>
  )
}
