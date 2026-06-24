// Demo company profiles spanning the workforce-health spectrum, so the same dashboard
// can show "low compliance / critical" through "excellent" at the click of the header dropdown.
import type { Trend } from './beeforceData'

type Tone = 'green' | 'amber' | 'red'
type Metric = { label: string; value: string; delta: string; tone: Tone }

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function clampPct(v: number) {
  return Math.max(1, Math.min(99, Math.round(v)))
}

// "Good" metric: higher offset (healthier company) → higher value.
function good(base: number, offset: number, k = 0.55): number {
  return clampPct(base + offset * k)
}

// "Bad" metric (absenteeism, OT%, dispute rate, etc.): higher offset (healthier company) → lower value.
function bad(base: number, offset: number, k = 0.45, floor = 1): number {
  return Math.max(floor, Math.round(base - offset * k))
}

function toneGood(v: number): Tone {
  if (v < 65) return 'red'
  if (v < 85) return 'amber'
  return 'green'
}

function toneBad(v: number, redAbove: number, amberAbove: number): Tone {
  if (v > redAbove) return 'red'
  if (v > amberAbove) return 'amber'
  return 'green'
}

function deltaTxt(offset: number, idx: number, improving: boolean): string {
  const wobble = ((idx * 7) % 5) - 2
  const mag = Math.abs(offset) * 0.12 + Math.abs(wobble) * 0.4
  if (mag < 0.6) return 'stable'
  const up = improving ? offset >= 0 : offset < 0
  return `${up ? '↑' : '↓'} ${mag.toFixed(1)}%`
}

// At offset 0 (the baseline Tezo profile), use the original hand-tuned delta text exactly;
// other companies get the generic formula above.
function deltaOr(original: string | undefined, offset: number, idx: number, improving: boolean): string {
  if (offset === 0 && original) return original
  return deltaTxt(offset, idx, improving)
}

// Generates a daily attendance % series for a given month: weekday baseline with a weekend dip
// and a payday absenteeism dip around the 25th, nudged per company/month so trends differ.
function generateMonthValues(year: number, monthIndex: number, drift: number): number[] {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const values: number[] = []
  for (let day = 1; day <= daysInMonth; day++) {
    const weekday = new Date(year, monthIndex, day).getDay()
    let base = weekday === 0 || weekday === 6 ? 68 : 90
    if (day >= 23 && day <= 27) base -= 12
    const wobble = ((day * 7 + monthIndex * 3) % 5) - 2
    values.push(clampPct(base + wobble + drift))
  }
  return values
}

export interface CompanyProfile {
  id: string
  name: string
  user: { name: string; role: string }
  period: string
  totalWorkforce: number
  activeVendors: number
  sites: string[]
  tier: 'critical' | 'moderate' | 'good' | 'excellent'
  tierLabel: string
  wei: { score: number; trend: number[]; weeks: string[]; narrative: string; bands: { label: string; range: string; color: string }[] }
  priorityActions: { id: number; severity: 'red' | 'amber'; text: string; cta: string; moduleId: string }[]
  kpis: { id: string; label: string; value: string; delta: string; trend: Trend; flag?: 'red' | 'amber'; moduleId: string }[]
  attendanceBadge: { value: string; tone: Tone }
  attendanceAlert: { message: string; cta: string }
  attendanceTrend: { weeks: string[]; attendance: number[]; target: number[]; insight: string }
  complianceBadge: { value: string; tone: Tone }
  complianceAlert: { message: string; cta: string }
  complianceByModule: { labels: string[]; values: number[]; insight: string }
  complianceMetrics: Metric[]
  vendorComplianceTable: { vendor: string; workers: number; pf: number; esi: number; license: 'Expired' | 'Expiring' | 'Valid'; lastAudit: string; risk: 'High' | 'Medium' | 'Low' }[]
  complianceTrend: { weeks: string[]; values: number[]; insight: string }
  attendanceMetrics: Metric[]
  attendanceBySite: { site: string; value: number }[]
  attendanceHeatmapWeekly: number[][]
  attendanceCalendarOptions: { year: number; monthIndex: number; monthLabel: string; values: number[] }[]
  vendorBadge: { value: string; tone: Tone }
  vendors: { name: string; workers: number; fulfillment: number; compliance: number; sla: number; invoiceAccuracy: number; score: number; tag: 'Underperforming' | 'Watch' | 'On track' }[]
  vendorModuleMetrics: Metric[]
  vendorSlaTrend: { weeks: string[]; worst: number[]; worstName: string; average: number[]; insight: string }
  nlqResponses: { match: string; answer: string }[]
}

interface CompanyConfig {
  id: string
  name: string
  userName: string
  userRole: string
  totalWorkforce: number
  activeVendors: number
  weiScore: number
  tier: CompanyProfile['tier']
  tierLabel: string
  vendorNames: [string, string, string, string]
  fifthVendorName: string
  licensePattern: ('Expired' | 'Expiring' | 'Valid')[]
  riskPattern: ('High' | 'Medium' | 'Low')[]
  narrative: string
  priorityActions: { severity: 'red' | 'amber'; text: string; cta: string; moduleId: string }[]
  attendanceBadgeLabel: string
  attendanceBadgeTone: Tone
  attendanceAlert: { message: string; cta: string }
  attendanceInsight: string
  complianceBadgeLabel: string
  complianceBadgeTone: Tone
  complianceAlert: { message: string; cta: string }
  complianceByModuleInsight: string
  complianceTrendInsight: string
  vendorBadgeLabel: string
  vendorBadgeTone: Tone
  vendorSlaInsight: string
  nlqAnswers: { vendor: string; compliance: string; attendance: string; overtime: string; shift: string }
}

const sites = ['Plant 1 (Pune)', 'Plant 2 (Chennai)', 'Plant 3 (Ahmedabad)', 'Warehouse A', 'Warehouse B']
const period = 'June 2026'

function buildProfile(cfg: CompanyConfig): CompanyProfile {
  const offset = cfg.weiScore - 74 // Tezo (the original hand-tuned profile) is the offset=0 baseline.

  const weiTrendBase = [68, 71, 73, 77, 77, 74]
  const wei = {
    score: cfg.weiScore,
    trend: weiTrendBase.map(v => clampPct(v + offset)),
    weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
    narrative: cfg.narrative,
    bands: [
      { label: 'Critical', range: '0–40', color: '#EF4444' },
      { label: 'Moderate', range: '40–65', color: '#F59E0B' },
      { label: 'Good', range: '65–80', color: '#00B37E' },
      { label: 'Excellent', range: '80–100', color: '#0F9D58' },
    ],
  }

  const kpiSpecs: { id: string; label: string; base: number; unit: string; kind: 'good' | 'bad' | 'flat'; moduleId: string; delta0?: string }[] = [
    { id: 'headcount', label: 'Workforce Headcount', base: cfg.totalWorkforce, unit: '', kind: 'flat', moduleId: 'onboarding' },
    { id: 'availability', label: 'Workforce Availability', base: 87, unit: '%', kind: 'good', moduleId: 'attendance', delta0: '↓ 2%' },
    { id: 'attendance', label: 'Attendance Rate', base: 89, unit: '%', kind: 'good', moduleId: 'attendance', delta0: '↑ 4%' },
    { id: 'compliance', label: 'Compliance Score', base: 76, unit: '%', kind: 'good', moduleId: 'compliance', delta0: '↓ 6%' },
    { id: 'vendor', label: 'Vendor Performance', base: 82, unit: '%', kind: 'good', moduleId: 'vendor', delta0: 'stable' },
    { id: 'payroll', label: 'Payroll Accuracy', base: 94, unit: '%', kind: 'good', moduleId: 'payroll', delta0: '↑ 1%' },
    { id: 'nps', label: 'Workforce NPS', base: 32, unit: 'pts', kind: 'good', moduleId: 'engagement', delta0: '↓ 4 pts' },
    { id: 'grievance', label: 'Grievance Closure', base: 78, unit: '%', kind: 'good', moduleId: 'grievance', delta0: '↓ 8%' },
    { id: 'referral', label: 'Referral Hiring %', base: 34, unit: '%', kind: 'good', moduleId: 'referral', delta0: '↑ 3%' },
    { id: 'attrition', label: 'Contractor Dropout Rate', base: 6.2, unit: '%', kind: 'bad', moduleId: 'productivity', delta0: '↑ 0.8%' },
    { id: 'productivity', label: 'Productivity Index', base: 81, unit: '%', kind: 'good', moduleId: 'productivity', delta0: 'stable' },
    { id: 'risk', label: 'Workforce Risk Score', base: 0, unit: '', kind: 'flat', moduleId: 'compliance' },
  ]

  const riskByTier: Record<CompanyProfile['tier'], { value: string; tone: Tone }> = {
    critical: { value: 'High', tone: 'red' },
    moderate: { value: 'Medium', tone: 'amber' },
    good: { value: 'Low', tone: 'green' },
    excellent: { value: 'Very Low', tone: 'green' },
  }

  const kpis = kpiSpecs.map((s, i): CompanyProfile['kpis'][number] => {
    if (s.id === 'headcount') {
      return { id: s.id, label: s.label, value: cfg.totalWorkforce.toLocaleString('en-IN'), delta: '↑ 12 this week', trend: 'up' as Trend, moduleId: s.moduleId }
    }
    if (s.id === 'risk') {
      const r = riskByTier[cfg.tier]
      return { id: s.id, label: s.label, value: r.value, delta: '—', trend: 'flat' as Trend, flag: r.tone === 'green' ? undefined : (r.tone as 'red' | 'amber'), moduleId: s.moduleId }
    }
    if (s.id === 'nps') {
      const npsVal = Math.max(-100, Math.min(100, Math.round(s.base + offset * 0.7)))
      const tone: Tone = npsVal < 10 ? 'red' : npsVal < 30 ? 'amber' : 'green'
      return { id: s.id, label: s.label, value: `${npsVal >= 0 ? '+' : ''}${npsVal}`, delta: deltaOr(s.delta0, offset, i, true), trend: offset >= 0 ? 'up' as Trend : 'down' as Trend, flag: tone === 'red' ? 'red' : tone === 'amber' ? 'amber' : undefined, moduleId: s.moduleId }
    }
    const v = s.kind === 'bad' ? bad(s.base, offset, 0.35, 1) : good(s.base, offset)
    const tone = s.kind === 'bad' ? toneBad(v, s.base + 3, s.base - 1) : toneGood(v)
    const isUnit = s.unit === '%'
    return {
      id: s.id, label: s.label,
      value: isUnit ? `${v}%` : `${v}`,
      delta: deltaOr(s.delta0, offset, i, s.kind !== 'bad'),
      trend: (s.kind === 'bad' ? (offset >= 0 ? 'down' : 'up') : (offset >= 0 ? 'up' : 'down')) as Trend,
      flag: tone === 'red' ? 'red' : tone === 'amber' ? 'amber' : undefined,
      moduleId: s.moduleId,
    }
  })

  const attendanceMetricSpecs: { label: string; base: number; kind: 'good' | 'bad'; redAbove?: number; amberAbove?: number; delta0?: string }[] = [
    { label: 'Attendance Rate', base: 89, kind: 'good', delta0: '↑ 4%' },
    { label: 'Absenteeism Rate', base: 11, kind: 'bad', redAbove: 16, amberAbove: 10, delta0: '↓ 4%' },
    { label: 'Late Arrival Rate', base: 8.3, kind: 'bad', redAbove: 12, amberAbove: 7, delta0: '↓ 1%' },
    { label: 'Shift Adherence Rate', base: 92, kind: 'good', delta0: '↑ 1%' },
    { label: 'Geo Attendance Compliance', base: 94, kind: 'good', delta0: 'stable' },
    { label: 'Overtime Percentage', base: 16.2, kind: 'bad', redAbove: 18, amberAbove: 12, delta0: '↑ 2.1%' },
    { label: 'Workforce Availability Rate', base: 87, kind: 'good', delta0: '↓ 2%' },
  ]
  const attendanceMetrics: Metric[] = attendanceMetricSpecs.map((s, i) => {
    if (s.kind === 'good') {
      const v = good(s.base, offset)
      return { label: s.label, value: `${v}%`, delta: deltaOr(s.delta0, offset, i, true), tone: toneGood(v) }
    }
    const v = bad(s.base, offset, 0.3, 1)
    const decimals = s.base % 1 !== 0 ? 1 : 0
    return { label: s.label, value: `${v.toFixed(decimals)}%`, delta: deltaOr(s.delta0, offset, i, false), tone: toneBad(v, s.redAbove!, s.amberAbove!) }
  })

  const attendanceBySite = [
    { site: 'Plant 1', base: 92 }, { site: 'Plant 2', base: 82 }, { site: 'Plant 3', base: 91 },
    { site: 'Warehouse A', base: 88 }, { site: 'Warehouse B', base: 87 },
  ].map(s => ({ site: s.site, value: good(s.base, offset) }))

  const attendanceHeatmapWeekly = [
    [92, 88, 90, 91, 85, 70, 65],
    [90, 89, 87, 92, 86, 72, 68],
    [88, 90, 91, 89, 84, 75, 69],
    [93, 91, 90, 88, 87, 78, 71],
  ].map(row => row.map(v => good(v, offset, 0.45)))

  const attendanceCalendarOptions = [
    { year: 2026, monthIndex: 2, drift: -1 },
    { year: 2026, monthIndex: 3, drift: 1 },
    { year: 2026, monthIndex: 4, drift: 0 },
    { year: 2026, monthIndex: 5, drift: 0 },
  ].map(m => ({
    year: m.year, monthIndex: m.monthIndex, monthLabel: `${monthNames[m.monthIndex]} 2026`,
    values: generateMonthValues(m.year, m.monthIndex, m.drift + offset * 0.45),
  }))

  const complianceSpecs: { label: string; base: number; chartLabel?: string; k?: number; delta0?: string }[] = [
    { label: 'PF Compliance Rate', base: 91, chartLabel: 'PF Compliance', delta0: 'stable' },
    { label: 'ESI Compliance Rate', base: 88, chartLabel: 'ESI Compliance', delta0: '↑ 2%' },
    { label: 'License Validity Score', base: 67, chartLabel: 'License Validity', k: 0.85, delta0: '↓ 11%' },
    { label: 'Audit Closure Rate', base: 72, chartLabel: 'Audit Closure', delta0: '↓ 3%' },
    { label: 'Wage Compliance Rate', base: 94, chartLabel: 'Wage Compliance', delta0: '↑ 1%' },
  ]
  const complianceValues = complianceSpecs.map(s => good(s.base, offset, s.k ?? 0.55))
  const complianceScore = good(76, offset, 0.6)
  const nonComplianceIncidents = Math.max(1, Math.round(bad(7, offset, 0.6, 0)))

  const complianceMetrics: Metric[] = [
    { label: 'Compliance Score', value: `${complianceScore}%`, delta: deltaOr('↓ 6%', offset, 0, true), tone: toneGood(complianceScore) },
    ...complianceSpecs.map((s, i) => {
      const v = complianceValues[i]
      return { label: s.label, value: `${v}%`, delta: deltaOr(s.delta0, offset, i + 1, true), tone: toneGood(v) }
    }),
    { label: 'Non-Compliance Incidents', value: `${nonComplianceIncidents} this month`, delta: deltaOr('↑ 3', offset, 5, false), tone: toneBad(nonComplianceIncidents, 8, 3) },
  ]

  const complianceByModule = {
    labels: complianceSpecs.map(s => s.chartLabel!),
    values: complianceValues,
    insight: cfg.complianceByModuleInsight,
  }

  const vendorComplianceBase = [
    { vendor: cfg.vendorNames[0], workers: 312, pf: 94, esi: 91 },
    { vendor: cfg.vendorNames[1], workers: 289, pf: 88, esi: 85 },
    { vendor: cfg.vendorNames[2], workers: 445, pf: 96, esi: 93 },
    { vendor: cfg.fifthVendorName, workers: 198, pf: 79, esi: 74 },
    { vendor: cfg.vendorNames[3], workers: 387, pf: 92, esi: 89 },
  ]
  const vendorComplianceTable = vendorComplianceBase.map((v, i) => ({
    vendor: v.vendor, workers: v.workers,
    pf: good(v.pf, offset, 0.4), esi: good(v.esi, offset, 0.4),
    license: cfg.licensePattern[i], lastAudit: ['45 days ago', '62 days ago', '12 days ago', '30 days ago', '8 days ago'][i],
    risk: cfg.riskPattern[i],
  }))

  const complianceTrendBase = [82, 83, 81, 84, 85, 84, 82, 76]
  const complianceTrend = {
    weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    values: complianceTrendBase.map(v => good(v, offset, 0.6)),
    insight: cfg.complianceTrendInsight,
  }

  const attendanceTrendBase = [84, 85, 86, 87, 88, 89]
  const attendanceTrend = {
    weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    attendance: attendanceTrendBase.map(v => good(v, offset, 0.4)),
    target: [90, 90, 90, 90, 90, 90],
    insight: cfg.attendanceInsight,
  }

  const vendorBaseList = [
    { name: cfg.vendorNames[0], workers: 312, fulfillment: 76, compliance: 64, sla: 69, invoiceAccuracy: 88 },
    { name: cfg.vendorNames[1], workers: 289, fulfillment: 84, compliance: 71, sla: 74, invoiceAccuracy: 90 },
    { name: cfg.vendorNames[2], workers: 445, fulfillment: 96, compliance: 89, sla: 92, invoiceAccuracy: 97 },
    { name: cfg.vendorNames[3], workers: 387, fulfillment: 93, compliance: 85, sla: 88, invoiceAccuracy: 95 },
  ]
  const vendors = vendorBaseList.map(v => {
    const fulfillment = good(v.fulfillment, offset, 0.5)
    const compliance = good(v.compliance, offset, 0.5)
    const sla = good(v.sla, offset, 0.5)
    const invoiceAccuracy = good(v.invoiceAccuracy, offset, 0.4)
    // Matches the original hand-tuned Tezo data, where overall score tracked the compliance figure.
    const score = compliance
    const tag: 'Underperforming' | 'Watch' | 'On track' = score < 70 ? 'Underperforming' : score < 85 ? 'Watch' : 'On track'
    return { name: v.name, workers: v.workers, fulfillment, compliance, sla, invoiceAccuracy, score, tag }
  })

  const vendorModuleSpecs = [
    { label: 'Contractor Fulfillment Rate', base: 87, delta0: '↓ 3%' },
    { label: 'Vendor Compliance Score', base: 77, delta0: '↓ 5%' },
    { label: 'Vendor Retention Rate', base: 90, delta0: 'stable' },
    { label: 'Vendor SLA Achievement', base: 81, delta0: '↓ 2%' },
    { label: 'Vendor Invoice Accuracy', base: 93, delta0: '↑ 1%' },
    { label: 'Vendor Performance Score', base: 82, delta0: 'stable' },
  ]
  const vendorModuleMetrics: Metric[] = vendorModuleSpecs.map((s, i) => {
    const v = good(s.base, offset, 0.5)
    return { label: s.label, value: `${v}%`, delta: deltaOr(s.delta0, offset, i, true), tone: toneGood(v) }
  })

  const worstVendor = [...vendors].sort((a, b) => a.score - b.score)[0]
  const vendorSlaBase = [88, 85, 82, 79, 76, 74, 72, 69]
  const vendorSlaAvgBase = [84, 85, 84, 86, 85, 85, 84, 83]
  const vendorSlaTrend = {
    weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    worst: vendorSlaBase.map(v => good(v, offset, 0.5)),
    worstName: worstVendor.name,
    average: vendorSlaAvgBase.map(v => good(v, offset, 0.5)),
    insight: cfg.vendorSlaInsight,
  }

  // Badge percentages are derived from the same computed numbers shown in the metric cards
  // right below them, so the headline badge never contradicts the detail.
  const attendanceRateValue = attendanceMetrics[0].value // "Attendance Rate" — always first in the spec list
  const vendorAvgScore = Math.round(vendors.reduce((sum, v) => sum + v.score, 0) / vendors.length)

  return {
    id: cfg.id, name: cfg.name, user: { name: cfg.userName, role: cfg.userRole }, period,
    totalWorkforce: cfg.totalWorkforce, activeVendors: cfg.activeVendors, sites,
    tier: cfg.tier, tierLabel: cfg.tierLabel,
    wei,
    priorityActions: cfg.priorityActions.map((a, i) => ({ id: i + 1, ...a })),
    kpis,
    attendanceBadge: { value: `${cfg.attendanceBadgeLabel} — ${attendanceRateValue}`, tone: cfg.attendanceBadgeTone },
    attendanceAlert: cfg.attendanceAlert,
    attendanceTrend,
    complianceBadge: { value: `${cfg.complianceBadgeLabel} — ${complianceScore}%`, tone: cfg.complianceBadgeTone },
    complianceAlert: cfg.complianceAlert,
    complianceByModule,
    complianceMetrics,
    vendorComplianceTable,
    complianceTrend,
    attendanceMetrics,
    attendanceBySite,
    attendanceHeatmapWeekly,
    attendanceCalendarOptions,
    vendorBadge: { value: `${cfg.vendorBadgeLabel} — ${vendorAvgScore}%`, tone: cfg.vendorBadgeTone },
    vendors,
    vendorModuleMetrics,
    vendorSlaTrend,
    nlqResponses: [
      { match: 'vendor', answer: cfg.nlqAnswers.vendor },
      { match: 'compliance', answer: cfg.nlqAnswers.compliance },
      { match: 'attendance', answer: cfg.nlqAnswers.attendance },
      { match: 'overtime', answer: cfg.nlqAnswers.overtime },
      { match: 'shift', answer: cfg.nlqAnswers.shift },
    ],
  }
}

const configs: CompanyConfig[] = [
  {
    id: 'tezo', name: 'Tezo Manufacturing Ltd', userName: 'Suhasa Nayak', userRole: 'CHRO',
    totalWorkforce: 4284, activeVendors: 9, weiScore: 74, tier: 'moderate', tierLabel: 'Moderate',
    vendorNames: ['Shree Contracts', 'KPR Workforce', 'Apex Labour', 'JK Staffing'], fifthVendorName: 'Sai Enterprises',
    licensePattern: ['Expired', 'Expired', 'Valid', 'Expiring', 'Valid'],
    riskPattern: ['High', 'High', 'Low', 'Medium', 'Low'],
    narrative: 'Score dropped 3 points this week. Compliance is the primary drag — 4 vendor licenses expired. Attendance improved at Sites A and D.',
    priorityActions: [
      { severity: 'red', text: 'Renew licenses for Vendor Shree Contracts & KPR Workforce (expired 2 days ago)', cta: 'View vendors', moduleId: 'compliance' },
      { severity: 'amber', text: '4 grievance cases aging 10+ days — escalate before SLA breach', cta: 'View cases', moduleId: 'grievance' },
      { severity: 'amber', text: 'OT cost at Plant 2 crossed 18% — review shift scheduling', cta: 'View attendance', moduleId: 'attendance' },
    ],
    attendanceBadgeLabel: 'Good', attendanceBadgeTone: 'green',
    attendanceAlert: { message: 'OT cost alert: Overtime at Plant 2 has crossed 18% for 3 consecutive days. At current rate, labour cost will exceed monthly budget by ₹2.4L. Check shift vacancy at Plant 2.', cta: 'Review shifts' },
    attendanceInsight: 'Attendance improved steadily over 6 weeks, closing the gap with the 90% target. Week 6 performance was driven by improved shift coverage at Sites A and D. Site B remains below target at 82%.',
    complianceBadgeLabel: 'Needs Attention', complianceBadgeTone: 'red',
    complianceAlert: { message: 'AI Alert: License Validity dropped to 67%. 4 vendors have expired licenses and 2 have licenses expiring in the next 7 days. This creates audit risk across 3 sites. Recommended: trigger renewal workflow immediately.', cta: 'View Affected Vendors' },
    complianceByModuleInsight: 'License Validity is the critical gap at 67%. 6 out of 9 active vendors have at least one expired or expiring license. Immediate action required to avoid statutory penalties.',
    complianceTrendInsight: 'Compliance score declined sharply in Week 8. The drop correlates with 4 vendor license expirations that were not renewed on schedule. The underlying PF and ESI compliance remains strong, indicating this is a vendor governance issue, not a worker-level compliance failure.',
    vendorBadgeLabel: 'Good', vendorBadgeTone: 'green',
    vendorSlaInsight: 'Shree Contracts has shown a consistent 19-point decline in SLA achievement over 8 weeks. The primary cause appears to be a shortfall in worker supply — fulfillment rate dropped from 94% to 76% in the same period. Recommend: performance review meeting and contingency sourcing plan.',
    nlqAnswers: {
      vendor: 'Shree Contracts is the lowest-performing vendor with an SLA achievement of 69% this quarter — a 19-point decline over 8 weeks, driven by a drop in worker fulfillment from 94% to 76%.',
      compliance: 'License Validity is the critical compliance gap at 67%. 4 vendor licenses expired in the last 2 weeks and 2 more expire within 7 days, creating audit exposure across 3 sites.',
      attendance: 'Plant 2 has the lowest attendance at 82%, well below the 90% target. Night shift (10 PM – 6 AM) drives this, with 18.4% absenteeism vs 8.2% for day shift.',
      overtime: 'Overtime at Plant 2 has crossed 18% for 3 consecutive days. At the current rate, labour cost will exceed the monthly budget by ₹2.4L.',
      shift: 'Night shift (10 PM – 6 AM) has the highest absenteeism at 18.4%, compared to 8.2% for day shift and 11.1% for afternoon shift. This pattern is consistent over the last 4 weeks.',
    },
  },
  {
    id: 'apex', name: 'Apex Textiles Pvt Ltd', userName: 'Rahul Mehta', userRole: 'COO',
    totalWorkforce: 3120, activeVendors: 7, weiScore: 86, tier: 'good', tierLabel: 'Good',
    vendorNames: ['Lakshmi Manpower', 'Suresh Staffing', 'Vijay Workforce', 'Bright Labour'], fifthVendorName: 'Om Enterprises',
    licensePattern: ['Valid', 'Expiring', 'Valid', 'Valid', 'Valid'],
    riskPattern: ['Medium', 'Medium', 'Low', 'Low', 'Low'],
    narrative: 'Score held steady this week at 86. Attendance and vendor performance remain strong — the only watch item is a single vendor license expiring in 7 days.',
    priorityActions: [
      { severity: 'amber', text: 'Suresh Staffing license expires in 7 days — start renewal now to avoid a compliance dip', cta: 'View vendors', moduleId: 'compliance' },
      { severity: 'amber', text: 'Survey participation softened slightly at Warehouse A — check welfare scheme messaging', cta: 'View engagement', moduleId: 'engagement' },
      { severity: 'amber', text: 'Referral reward utilization at 76% — nudge eligible workers before month-end', cta: 'View referral', moduleId: 'referral' },
    ],
    attendanceBadgeLabel: 'Excellent', attendanceBadgeTone: 'green',
    attendanceAlert: { message: 'OT is well controlled this week — overtime % is steady at 9.8%, comfortably under budget across all sites.', cta: 'Review shifts' },
    attendanceInsight: 'Attendance has tracked above the 90% target for 5 of the last 6 weeks. Plant 1 and Plant 3 are leading at 96%+; Warehouse B is the only site trailing slightly at 89%.',
    complianceBadgeLabel: 'Good', complianceBadgeTone: 'green',
    complianceAlert: { message: 'AI Alert: Suresh Staffing\'s trade license expires in 7 days. Every other vendor is current — start the renewal workflow now to keep the compliance score above 85%.', cta: 'View Affected Vendors' },
    complianceByModuleInsight: 'All five compliance pillars are tracking green except License Validity, which sits at 86% due to one upcoming expiry. PF, ESI and Wage Compliance are all above 92%.',
    complianceTrendInsight: 'Compliance has held in the high-80s for 8 straight weeks with no major dips. The slight Week 8 softening traces to the single upcoming Suresh Staffing license expiry, not a worker-level issue.',
    vendorBadgeLabel: 'Excellent', vendorBadgeTone: 'green',
    vendorSlaInsight: 'Suresh Staffing is the relative laggard on SLA achievement but is still tracking near the vendor average — no vendor has shown a sustained decline this quarter, unlike peer companies.',
    nlqAnswers: {
      vendor: 'Suresh Staffing is the relative laggard with SLA achievement a few points under the vendor average, but it is not declining — fulfillment has stayed above 90% all quarter.',
      compliance: 'Compliance is in good shape at 89%. The only flag is Suresh Staffing\'s license expiring in 7 days — every other vendor and statutory metric is current.',
      attendance: 'Warehouse B has the lowest attendance at 89%, still close to the 90% target. No shift shows unusual absenteeism this month.',
      overtime: 'Overtime is well controlled at 9.8% company-wide, comfortably within budget at every site.',
      shift: 'Night shift has marginally higher absenteeism than day shift, but the gap is under 4 points — well within normal variation.',
    },
  },
  {
    id: 'velocity', name: 'Velocity Logistics Pvt Ltd', userName: 'Anita Rao', userRole: 'CHRO',
    totalWorkforce: 6840, activeVendors: 12, weiScore: 49, tier: 'critical', tierLabel: 'Critical',
    vendorNames: ['Speedwell Manpower', 'Falcon Staffing', 'Crown Labour', 'Metro Workforce'], fifthVendorName: 'Highway Enterprises',
    licensePattern: ['Expired', 'Expired', 'Expiring', 'Expired', 'Expiring'],
    riskPattern: ['High', 'High', 'Medium', 'High', 'Medium'],
    narrative: 'Score is critical at 49, down 6 points this week. Compliance has collapsed to 46% — 8 of 12 vendors have expired or expiring licenses. Absenteeism and OT cost are both breaching budget at multiple sites.',
    priorityActions: [
      { severity: 'red', text: '8 of 12 vendors have expired or expiring licenses — statutory audit exposure across all 3 plants', cta: 'View vendors', moduleId: 'compliance' },
      { severity: 'red', text: 'Absenteeism at Plant 2 has crossed 28% — possible contractor batch walkout, investigate today', cta: 'View attendance', moduleId: 'attendance' },
      { severity: 'red', text: '11 grievance cases open past SLA — escalation risk is severe', cta: 'View cases', moduleId: 'grievance' },
    ],
    attendanceBadgeLabel: 'Critical', attendanceBadgeTone: 'red',
    attendanceAlert: { message: 'OT cost alert: Overtime has crossed 29% company-wide for 5 consecutive days — projected to exceed the monthly labour budget by ₹9.1L. Plant 2 and Plant 3 are both critically short-staffed.', cta: 'Review shifts' },
    attendanceInsight: 'Attendance has fallen further behind the 90% target every week for 6 straight weeks, now trailing by double digits. Plant 2 is the worst performer at 58% — consistent with a possible contractor batch walkout.',
    complianceBadgeLabel: 'Critical', complianceBadgeTone: 'red',
    complianceAlert: { message: 'AI Alert: License Validity has collapsed to 35%. 8 of 12 vendors have expired or imminently-expiring licenses, exposing all 3 plants to statutory penalties. Immediate vendor governance escalation required.', cta: 'View Affected Vendors' },
    complianceByModuleInsight: 'License Validity at 35% is now the dominant risk — most vendors are non-compliant. PF and ESI compliance have also slipped below 75%, suggesting this is no longer purely a vendor governance issue.',
    complianceTrendInsight: 'Compliance has declined for 6 straight weeks with no sign of stabilizing. The Week 8 drop to 46% reflects both vendor license expiries and a genuine deterioration in worker-level PF/ESI compliance.',
    vendorBadgeLabel: 'Critical', vendorBadgeTone: 'red',
    vendorSlaInsight: 'Speedwell Manpower has collapsed to 41% SLA achievement, down 35 points in 8 weeks — worker fulfillment has dropped from 90% to under 50%. This vendor needs an immediate performance review or replacement.',
    nlqAnswers: {
      vendor: 'Speedwell Manpower is critically underperforming at 41% SLA achievement, down 35 points over 8 weeks — fulfillment has collapsed from 90% to under 50%, putting 3 sites at risk.',
      compliance: 'Compliance has collapsed to 46%. License Validity is the worst pillar at 35% — 8 of 12 vendors are non-compliant, and PF/ESI compliance has also slipped below 75%.',
      attendance: 'Plant 2 has the lowest attendance at 58%, far below the 90% target — consistent with a contractor batch walkout. Night shift absenteeism is above 35%.',
      overtime: 'Overtime has crossed 29% company-wide for 5 consecutive days. Projected labour cost overrun is ₹9.1L this month if unaddressed.',
      shift: 'Night shift absenteeism has spiked above 35%, more than double the day shift rate — a strong signal of worker attrition or an unreported walkout.',
    },
  },
  {
    id: 'northstar', name: 'Northstar Foods Pvt Ltd', userName: 'Priya Iyer', userRole: 'CIO',
    totalWorkforce: 5210, activeVendors: 8, weiScore: 93, tier: 'excellent', tierLabel: 'Excellent',
    vendorNames: ['Everest Manpower', 'Summit Staffing', 'Pioneer Labour', 'Trident Workforce'], fifthVendorName: 'Horizon Enterprises',
    licensePattern: ['Valid', 'Valid', 'Valid', 'Valid', 'Valid'],
    riskPattern: ['Low', 'Low', 'Low', 'Low', 'Low'],
    narrative: 'Score is excellent at 93, up 2 points this week. Every module is tracking green — compliance, attendance and vendor performance are all above 90%, with no statutory exposure.',
    priorityActions: [
      { severity: 'amber', text: 'Referral reward utilization is at 91% — consider raising the program cap before it saturates', cta: 'View referral', moduleId: 'referral' },
      { severity: 'amber', text: 'Productivity index dipped 0.3% at Warehouse A — minor, worth a routine check', cta: 'View productivity', moduleId: 'productivity' },
      { severity: 'amber', text: 'One vendor (Trident Workforce) is trending toward "Watch" — proactive check-in recommended', cta: 'View vendors', moduleId: 'vendor' },
    ],
    attendanceBadgeLabel: 'Excellent', attendanceBadgeTone: 'green',
    attendanceAlert: { message: 'No overtime concerns this week — OT% is steady at 6.1%, the lowest of the last 6 months across every site.', cta: 'Review shifts' },
    attendanceInsight: 'Attendance has stayed above 95% for all 6 weeks, consistently ahead of the 90% target. Every site is within 3 points of each other — there is no laggard site this month.',
    complianceBadgeLabel: 'Excellent', complianceBadgeTone: 'green',
    complianceAlert: { message: 'No active compliance alerts. All vendor licenses are current and PF/ESI/Wage compliance are all above 95% — the strongest compliance position across BeeForce\'s portfolio this month.', cta: 'View Vendor Scorecard' },
    complianceByModuleInsight: 'All five compliance pillars are above 92%, with License Validity at 96% — every active vendor license is current. This is the strongest compliance posture in the portfolio.',
    complianceTrendInsight: 'Compliance has held above 90% for all 8 weeks with a gentle upward trend. No single pillar is dragging the score — this reflects sustained vendor governance discipline, not a one-off improvement.',
    vendorBadgeLabel: 'Excellent', vendorBadgeTone: 'green',
    vendorSlaInsight: 'Trident Workforce is the only vendor trending downward, though still 8 points above the underperformance threshold. Worth a proactive check-in before it becomes a real issue.',
    nlqAnswers: {
      vendor: 'All vendors are performing well. Trident Workforce is the relative laggard at a still-healthy 88% SLA achievement, trending down slightly — worth a proactive check-in.',
      compliance: 'Compliance is excellent at 95%. Every vendor license is current and PF/ESI/Wage compliance are all above 95% — no audit exposure anywhere in the portfolio.',
      attendance: 'All sites are within 3 points of each other, all above 94% — there is no laggard site this month.',
      overtime: 'Overtime is at a 6-month low of 6.1% company-wide — no site is near budget risk.',
      shift: 'Shift-level absenteeism is evenly distributed — night shift is only 2 points higher than day shift, well within normal range.',
    },
  },
  {
    id: 'sundar', name: 'Sundar Apparel Exports', userName: 'Vikram Desai', userRole: 'CHRO',
    totalWorkforce: 2860, activeVendors: 6, weiScore: 63, tier: 'moderate', tierLabel: 'Moderate',
    vendorNames: ['Ganesh Manpower', 'Royal Staffing', 'Dependable Labour', 'United Workforce'], fifthVendorName: 'Heritage Enterprises',
    licensePattern: ['Expiring', 'Expired', 'Valid', 'Expiring', 'Valid'],
    riskPattern: ['Medium', 'High', 'Low', 'Medium', 'Low'],
    narrative: 'Score sits at the low end of Moderate at 63, down 2 points this week. Compliance and attendance are both soft — Royal Staffing\'s license lapsed and Plant 2 attendance has slid for 3 straight weeks.',
    priorityActions: [
      { severity: 'red', text: 'Royal Staffing license has lapsed — 78 workers are technically non-compliant pending renewal', cta: 'View vendors', moduleId: 'compliance' },
      { severity: 'amber', text: 'Attendance at Plant 2 has slid for 3 straight weeks — now 9 points behind target', cta: 'View attendance', moduleId: 'attendance' },
      { severity: 'amber', text: 'Payroll dispute rate ticked up alongside the attendance dip — check OT calculation accuracy', cta: 'View payroll', moduleId: 'payroll' },
    ],
    attendanceBadgeLabel: 'Watch', attendanceBadgeTone: 'amber',
    attendanceAlert: { message: 'OT cost alert: Overtime has crept up to 21% at Plant 2 over the last 2 weeks as supervisors cover the attendance gap. Budget risk if the trend continues into next month.', cta: 'Review shifts' },
    attendanceInsight: 'Attendance has declined for 3 consecutive weeks, moving further from the 90% target each week. Plant 2 is the clear laggard, now 9 points behind the next-worst site.',
    complianceBadgeLabel: 'Needs Attention', complianceBadgeTone: 'red',
    complianceAlert: { message: 'AI Alert: Royal Staffing\'s trade license lapsed this week and Ganesh Manpower\'s is expiring in 9 days. Together they cover 41% of the contract workforce — audit exposure is significant.', cta: 'View Affected Vendors' },
    complianceByModuleInsight: 'License Validity is the weakest pillar, dragged down by one lapsed and one expiring license covering a large share of the workforce. PF and ESI compliance remain comparatively stable.',
    complianceTrendInsight: 'Compliance has drifted down gradually over 8 weeks rather than dropping sharply — a slow erosion in vendor governance rather than a single triggering event.',
    vendorBadgeLabel: 'Watch', vendorBadgeTone: 'amber',
    vendorSlaInsight: 'Royal Staffing\'s SLA achievement has fallen alongside its lapsed license — the two issues appear linked, since the vendor has been unable to fully staff shifts while renewal is pending.',
    nlqAnswers: {
      vendor: 'Royal Staffing is the weakest vendor this month — its license has lapsed and SLA achievement has dropped in step, since it has been short-staffing shifts during the renewal delay.',
      compliance: 'Compliance is soft at the low end of Moderate. Royal Staffing\'s license has lapsed and Ganesh Manpower\'s expires in 9 days — together they cover 41% of the workforce.',
      attendance: 'Plant 2 has the lowest attendance, now 9 points behind the next-worst site and declining for 3 straight weeks.',
      overtime: 'Overtime at Plant 2 has crept up to 21% over the last 2 weeks as supervisors cover the attendance gap.',
      shift: 'Night shift absenteeism is elevated at Plant 2 specifically — other sites show normal shift-level variation.',
    },
  },
  {
    id: 'brightspark', name: 'BrightSpark Electronics Ltd', userName: 'Neha Kapoor', userRole: 'COO',
    totalWorkforce: 3940, activeVendors: 8, weiScore: 80, tier: 'good', tierLabel: 'Good',
    vendorNames: ['Sunrise Manpower', 'Pinnacle Staffing', 'Reliable Workforce', 'Goldline Labour'], fifthVendorName: 'Bestway Enterprises',
    licensePattern: ['Valid', 'Valid', 'Expiring', 'Valid', 'Valid'],
    riskPattern: ['Low', 'Low', 'Medium', 'Low', 'Low'],
    narrative: 'Score is a solid 80 this week, up 1 point. Most modules are tracking well — the one watch item is Pinnacle Staffing\'s license renewal due in 10 days, otherwise compliance and attendance are both healthy.',
    priorityActions: [
      { severity: 'amber', text: 'Pinnacle Staffing license renewal due in 10 days — start the paperwork now to stay ahead', cta: 'View vendors', moduleId: 'compliance' },
      { severity: 'amber', text: 'Grievance resolution TAT crept up slightly this week — worth a quick check on case backlog', cta: 'View cases', moduleId: 'grievance' },
      { severity: 'amber', text: 'Safety near-miss reporting dipped slightly at Warehouse A — reinforce reporting culture', cta: 'View safety', moduleId: 'safety' },
    ],
    attendanceBadgeLabel: 'Good', attendanceBadgeTone: 'green',
    attendanceAlert: { message: 'Overtime is within normal range at 11.4% company-wide. No site is showing unusual cost pressure this week.', cta: 'Review shifts' },
    attendanceInsight: 'Attendance has held comfortably above target for 5 of the last 6 weeks. No site is more than 4 points off the company average — a stable, well-distributed pattern.',
    complianceBadgeLabel: 'Good', complianceBadgeTone: 'green',
    complianceAlert: { message: 'AI Alert: Pinnacle Staffing\'s license renews in 10 days — no action overdue yet, but start the paperwork this week to avoid a last-minute scramble.', cta: 'View Affected Vendors' },
    complianceByModuleInsight: 'All five compliance pillars are tracking green-to-amber, with License Validity the only pillar below 85% due to the upcoming Pinnacle Staffing renewal.',
    complianceTrendInsight: 'Compliance has held steady in a narrow band for 8 weeks with no sharp moves in either direction — a sign of consistent vendor governance rather than reactive fixes.',
    vendorBadgeLabel: 'Good', vendorBadgeTone: 'green',
    vendorSlaInsight: 'Pinnacle Staffing trails the vendor average on SLA achievement by a modest margin, consistent with the upcoming license renewal rather than a deeper performance issue.',
    nlqAnswers: {
      vendor: 'Pinnacle Staffing is the relative laggard, trailing the vendor average by a modest margin on SLA achievement — consistent with its upcoming license renewal, not a deeper issue.',
      compliance: 'Compliance is healthy at the high end of Good. The only item to track is Pinnacle Staffing\'s license, which renews in 10 days.',
      attendance: 'No site is more than 4 points off the company average this month — attendance is well-distributed across all 5 sites.',
      overtime: 'Overtime is within normal range at 11.4% company-wide — no site shows unusual cost pressure.',
      shift: 'Shift-level absenteeism is balanced — night shift runs only slightly above day shift, within normal variation.',
    },
  },
  {
    id: 'coastal', name: 'Coastal Seafoods Pvt Ltd', userName: 'Meera Pillai', userRole: 'Plant Head',
    totalWorkforce: 1980, activeVendors: 5, weiScore: 55, tier: 'critical', tierLabel: 'Critical',
    vendorNames: ['Tidewater Manpower', 'Anchor Staffing', 'Marina Labour', 'Coral Workforce'], fifthVendorName: 'Seabreeze Enterprises',
    licensePattern: ['Expiring', 'Valid', 'Expired', 'Valid', 'Expiring'],
    riskPattern: ['Medium', 'Low', 'High', 'Low', 'Medium'],
    narrative: 'Score is critical at 55. Unlike a compliance-driven crisis, this one is safety- and grievance-led — near-miss reports have spiked and 9 grievance cases are aging past SLA, while compliance itself is only moderately soft.',
    priorityActions: [
      { severity: 'red', text: 'Near-miss incident reports tripled this week at the processing line — halt and inspect before a lost-time injury occurs', cta: 'View safety', moduleId: 'safety' },
      { severity: 'red', text: '9 grievance cases are aging past SLA, mostly safety-related complaints — escalation risk is high', cta: 'View cases', moduleId: 'grievance' },
      { severity: 'amber', text: 'Marina Labour\'s license has expired — 156 workers are technically non-compliant', cta: 'View vendors', moduleId: 'compliance' },
    ],
    attendanceBadgeLabel: 'Watch', attendanceBadgeTone: 'amber',
    attendanceAlert: { message: 'Attendance itself is only moderately soft this week — the bigger risk is the safety incident spike, which is starting to drive voluntary absenteeism on the processing line.', cta: 'Review shifts' },
    attendanceInsight: 'Attendance has dipped moderately, but the more telling signal is which workers are staying away — early data suggests absenteeism is concentrated on the processing line, the same area flagging safety near-misses.',
    complianceBadgeLabel: 'Needs Attention', complianceBadgeTone: 'amber',
    complianceAlert: { message: 'AI Alert: Marina Labour\'s license has expired, affecting 156 workers. Compliance is soft but not the primary crisis this week — safety near-misses and grievance aging are more urgent.', cta: 'View Affected Vendors' },
    complianceByModuleInsight: 'Compliance is moderately soft across the board rather than collapsed in one pillar — License Validity and Audit Closure are both trailing, but neither has cratered the way it would in a pure compliance crisis.',
    complianceTrendInsight: 'Compliance has eased gradually over 8 weeks, a secondary symptom of the same operational strain showing up as safety incidents and grievance aging — not the root cause this month.',
    vendorBadgeLabel: 'Watch', vendorBadgeTone: 'amber',
    vendorSlaInsight: 'Marina Labour is the weakest vendor, dragged down by its expired license, but SLA achievement across all vendors has softened slightly — consistent with the broader operational strain at the plant.',
    nlqAnswers: {
      vendor: 'Marina Labour is the weakest vendor this month, dragged down by an expired license covering 156 workers — though all vendors have softened slightly amid the broader operational strain.',
      compliance: 'Compliance is soft but not the primary issue this month — Marina Labour\'s expired license is the main flag, while safety and grievance metrics are more urgent.',
      attendance: 'Attendance is moderately soft, concentrated on the processing line — the same area driving the safety near-miss spike, suggesting workers may be avoiding it.',
      overtime: 'Overtime is elevated on the processing line specifically, as supervisors juggle the safety inspection and short-staffing at once.',
      shift: 'Day shift on the processing line shows the sharpest rise in absenteeism — directly overlapping with the area flagging safety near-misses.',
    },
  },
]

export const companies: CompanyProfile[] = configs.map(buildProfile)
export const defaultCompanyId = 'tezo'
