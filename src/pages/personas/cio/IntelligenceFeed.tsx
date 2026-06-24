import { cioFeed } from '@/data/personaData'
import { PageHeader, SectionCard } from '@/components/beeforce/Shared'
import { AnomalyFeedItem } from '@/components/beeforce/AnomalyFeedItem'

export function CioIntelligenceFeed() {
  const d = cioFeed
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Intelligence Feed" subtitle="What is the data telling us that human eyes haven't caught yet?" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1">
          <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wide">Workforce Risk Score</p>
          <span className="text-[28px] font-extrabold text-[#1B2B4B] leading-none">{d.riskScore.value}<span className="text-sm text-muted-foreground"> /100</span></span>
          <span className="text-[11px] font-semibold text-[#92670B]">{d.riskScore.delta}</span>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1">
          <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wide">Active Anomalies</p>
          <span className="text-[28px] font-extrabold text-[#1B2B4B] leading-none">{d.activeAnomalies.active}</span>
          <span className="text-[11px] text-muted-foreground">{d.activeAnomalies.resolved} resolved this week</span>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1 lg:col-span-1">
          <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wide">Predictive Risk Flag</p>
          <p className="text-[12px] text-[#1B2B4B] leading-snug">{d.predictiveFlag}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1">
          <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-wide">WEI — Intelligence Lens</p>
          <span className="text-[28px] font-extrabold text-[#1B2B4B] leading-none">74<span className="text-sm text-muted-foreground"> /100</span></span>
          <p className="text-[11px] text-[#1B2B4B] italic">{d.weiNote}</p>
        </div>
      </div>

      <SectionCard title="Live Anomaly Feed">
        <div className="mt-2">
          {d.items.map((item, i) => <AnomalyFeedItem key={i} {...item} />)}
        </div>
      </SectionCard>
    </div>
  )
}
