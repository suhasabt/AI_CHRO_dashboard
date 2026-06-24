import { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { heatmapSiteOptions, adjustForSite, adjustGridForSite, defaultNlqAnswer } from '@/data/beeforceData'
import { useCompany } from '@/state/CompanyContext'
import { PageHeader, HealthBadge, MetricCard, SectionCard } from '@/components/beeforce/Shared'
import { AlertBanner } from '@/components/beeforce/AlertBanner'
import { HorizontalBarChart } from '@/components/beeforce/charts/BarChart'
import { Heatmap } from '@/components/beeforce/charts/Heatmap'
import { MonthHeatmap } from '@/components/beeforce/charts/MonthHeatmap'
import { cn } from '@/lib/utils'

export function AttendanceTimePage() {
  const { company } = useCompany()
  const { attendanceMetrics, attendanceBySite, attendanceHeatmapWeekly, attendanceCalendarOptions, attendanceBadge, attendanceAlert, nlqResponses } = company

  const [question, setQuestion] = useState('Which shift has the highest absenteeism?')
  const [submitted, setSubmitted] = useState('Which shift has the highest absenteeism?')
  const [heatmapView, setHeatmapView] = useState<'week' | 'month'>('week')
  const [heatmapSite, setHeatmapSite] = useState('All Sites')
  const [heatmapMonth, setHeatmapMonth] = useState(attendanceCalendarOptions.length - 1)

  const lower = submitted.toLowerCase()
  const answer = nlqResponses.find(r => lower.includes(r.match))?.answer ?? defaultNlqAnswer

  const weeklyData = adjustGridForSite(attendanceHeatmapWeekly, heatmapSite)
  const monthIndex = Math.min(heatmapMonth, attendanceCalendarOptions.length - 1)
  const selectedMonth = attendanceCalendarOptions[monthIndex]
  const monthlyData = adjustForSite(selectedMonth.values, heatmapSite)

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Attendance & Time" badge={<HealthBadge value={attendanceBadge.value} tone={attendanceBadge.tone} />} />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {attendanceMetrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>

      <AlertBanner message={attendanceAlert.message} cta={attendanceAlert.cta} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard title="Attendance by Site">
          <HorizontalBarChart
            bars={attendanceBySite.map(s => ({ label: s.site, value: s.value, color: s.value < 85 ? '#F59E0B' : '#00B37E' }))}
            height={200}
          />
        </SectionCard>

        <SectionCard
          title={heatmapView === 'week' ? 'Attendance Heatmap — Last 4 Weeks' : `Attendance Heatmap — ${selectedMonth.monthLabel}`}
          action={
            <div className="flex items-center gap-2">
              {heatmapView === 'month' && (
                <select
                  value={monthIndex}
                  onChange={e => setHeatmapMonth(Number(e.target.value))}
                  className="text-[11.5px] border border-border rounded-md px-2 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-[#0056c1]/30"
                >
                  {attendanceCalendarOptions.map((m, i) => <option key={m.monthLabel} value={i}>{m.monthLabel}</option>)}
                </select>
              )}
              <select
                value={heatmapSite}
                onChange={e => setHeatmapSite(e.target.value)}
                className="text-[11.5px] border border-border rounded-md px-2 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-[#0056c1]/30"
              >
                {heatmapSiteOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <div className="flex rounded-md border border-border overflow-hidden">
                <button
                  onClick={() => setHeatmapView('week')}
                  className={cn('text-[11.5px] font-medium px-2.5 py-1', heatmapView === 'week' ? 'bg-[#0056c1] text-white' : 'bg-background text-muted-foreground hover:bg-muted')}
                >
                  Week view
                </button>
                <button
                  onClick={() => setHeatmapView('month')}
                  className={cn('text-[11.5px] font-medium px-2.5 py-1', heatmapView === 'month' ? 'bg-[#0056c1] text-white' : 'bg-background text-muted-foreground hover:bg-muted')}
                >
                  Month view
                </button>
              </div>
            </div>
          }
        >
          <div className="mt-2">
            {heatmapView === 'week'
              ? <Heatmap data={weeklyData} />
              : <MonthHeatmap year={selectedMonth.year} monthIndex={selectedMonth.monthIndex} values={monthlyData} />}
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            {heatmapView === 'week'
              ? 'Daily attendance % by weekday, last 4 weeks.'
              : 'Daily attendance % for every day this month — darker red marks the payday absenteeism dip around the 25th.'}
          </p>
        </SectionCard>
      </div>

      <SectionCard title="Ask About Attendance">
        <form
          onSubmit={e => { e.preventDefault(); setSubmitted(question) }}
          className="flex gap-2 mt-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="e.g. Which site has the highest late arrival rate?"
              className="w-full pl-9 pr-3 py-2 text-[12.5px] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#0056c1]/30"
            />
          </div>
          <button type="submit" className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#0056c1] text-white hover:bg-[#0056c1]/90">
            Ask
          </button>
        </form>
        <div className="flex gap-2.5 items-start bg-[#EAF2FF] border border-[#0056c1]/15 rounded-lg p-3 mt-3">
          <Sparkles className="w-4 h-4 text-[#0056c1] mt-0.5 shrink-0" />
          <p className="text-[12.5px] italic text-[#1B2B4B] leading-relaxed">{answer}</p>
        </div>
      </SectionCard>
    </div>
  )
}
