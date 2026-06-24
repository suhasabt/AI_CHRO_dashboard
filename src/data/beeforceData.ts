// Shared/static data for the BeeForce AI Workforce Dashboard demo.
// Per-company data (which varies by the company switcher in the header) lives in companies.ts.

export type Trend = 'up' | 'down' | 'flat'

export interface KPI {
  id: string
  label: string
  value: string
  delta: string
  trend: Trend
  flag?: 'red' | 'amber'
  moduleId: string
}

const siteAttendanceOffset: Record<string, number> = {
  'All Sites': 0,
  'Plant 1': 4,
  'Plant 2': -7,
  'Plant 3': 3,
  'Warehouse A': 0,
  'Warehouse B': -1,
}

export const heatmapSiteOptions = Object.keys(siteAttendanceOffset)

export function adjustForSite(values: number[], site: string): number[] {
  const offset = siteAttendanceOffset[site] ?? 0
  return values.map(v => Math.max(40, Math.min(99, Math.round(v + offset))))
}

export function adjustGridForSite(grid: number[][], site: string): number[][] {
  return grid.map(row => adjustForSite(row, site))
}

export const defaultNlqAnswer = 'Searching workforce data... Here are the closest results for your query.'

export const navItems = [
  { id: 'executive', label: 'Executive Overview' },
  { id: 'onboarding', label: 'Workforce Onboarding' },
  { id: 'attendance', label: 'Attendance & Time' },
  { id: 'scheduling', label: 'Workforce Scheduling' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'vendor', label: 'Vendor Management' },
  { id: 'payroll', label: 'Payroll & Billing' },
  { id: 'engagement', label: 'Workforce Engagement' },
  { id: 'grievance', label: 'Grievance' },
  { id: 'referral', label: 'Referral' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'safety', label: 'Safety' },
  { id: 'offboarding', label: 'Offboarding' },
]

export const moduleHealth: Record<string, { label: string; value: string; tone: 'green' | 'amber' | 'red' }> = {
  executive: { label: 'Workforce Excellence Index', value: '74%', tone: 'amber' },
  onboarding: { label: 'Good', value: '88%', tone: 'green' },
  attendance: { label: 'Good', value: '89%', tone: 'green' },
  scheduling: { label: 'Watch', value: '85%', tone: 'amber' },
  compliance: { label: 'Needs Attention', value: '76%', tone: 'red' },
  vendor: { label: 'Good', value: '82%', tone: 'green' },
  payroll: { label: 'Good', value: '94%', tone: 'green' },
  engagement: { label: 'Watch', value: '+32 NPS', tone: 'amber' },
  grievance: { label: 'Watch', value: '78%', tone: 'amber' },
  productivity: { label: 'Good', value: '81%', tone: 'green' },
  safety: { label: 'Good', value: '96%', tone: 'green' },
  referral: { label: 'Good', value: '34%', tone: 'green' },
  offboarding: { label: 'Good', value: '91%', tone: 'green' },
}

// Full metric sets per the BeeForce Metric Framework (Krishna RK, June 2026), module by module.
// These secondary modules stay constant across companies in this demo — the company switcher
// varies Executive/Compliance/Attendance/Vendor, which carry the primary health signal.
export const placeholderModules: Record<string, { metrics: { label: string; value: string; delta: string }[]; note: string }> = {
  onboarding: {
    metrics: [
      { label: 'Onboarding Completion Rate', value: '94%', delta: '↑ 2%' },
      { label: 'Day-Zero Compliance Rate', value: '81%', delta: '↑ 4%' },
      { label: 'Average Onboarding TAT', value: '2.3 days', delta: '↓ 0.4 days' },
      { label: 'Verification Success Rate', value: '96%', delta: '↑ 1%' },
      { label: 'Contractor Onboarding TAT', value: '3.1 days', delta: '↓ 0.2 days' },
      { label: 'First Week Dropout Rate', value: '3.1%', delta: '↓ 0.5%' },
    ],
    note: 'Onboarding velocity has improved this month with the new digital KYC flow at Plant 1 and Plant 3. Day-Zero compliance still lags completion rate — 13% of joiners start before PF/ESI paperwork clears.',
  },
  scheduling: {
    metrics: [
      { label: 'Shift Coverage Rate', value: '91%', delta: '↓ 3%' },
      { label: 'Roster Compliance', value: '88%', delta: 'stable' },
      { label: 'Overtime Avoidance Index', value: '82%', delta: '↓ 4%' },
      { label: 'Shift Vacancy Rate', value: '9%', delta: '↑ 3%' },
      { label: 'Workforce Utilization', value: '86%', delta: '↓ 1%' },
    ],
    note: 'Shift vacancy at Plant 2 is driving the overtime spike flagged on the Attendance module — 14 unfilled shifts this week, concentrated on the night roster.',
  },
  payroll: {
    metrics: [
      { label: 'Payroll Accuracy', value: '94%', delta: '↑ 1%' },
      { label: 'Payroll TAT', value: '3.2 days', delta: '↓ 0.3 days' },
      { label: 'Invoice Accuracy', value: '91%', delta: '↓ 2%' },
      { label: 'Payroll Dispute Rate', value: '2.8%', delta: '↑ 0.6%' },
      { label: 'Cost Per Worker', value: '₹18,420', delta: '↑ ₹340' },
      { label: 'Overtime Cost %', value: '14.6%', delta: '↑ 1.8%' },
    ],
    note: 'Invoice disputes and overtime cost are both rising in step with the lowest-scoring vendor — payroll disputes are concentrated on OT calculation queries at Plant 2.',
  },
  engagement: {
    metrics: [
      { label: 'Workforce NPS', value: '+32', delta: '↓ 4 pts' },
      { label: 'Engagement Score', value: '74%', delta: '↓ 2%' },
      { label: 'Communication Reach', value: '88%', delta: 'stable' },
      { label: 'Notification Open Rate', value: '67%', delta: '↓ 3%' },
      { label: 'Survey Participation Rate', value: '61%', delta: '↓ 5%' },
      { label: 'Active App Usage Rate', value: '79%', delta: '↑ 1%' },
      { label: 'Content Consumption Rate', value: '58%', delta: '↓ 4%' },
    ],
    note: 'NPS and survey participation softened together at Plant 2, correlating with the overtime spike — workers cite fatigue in open survey comments.',
  },
  grievance: {
    metrics: [
      { label: 'Grievance Resolution Rate', value: '78%', delta: '↓ 8%' },
      { label: 'Average Resolution TAT', value: '6.4 days', delta: '↑ 1.1 days' },
      { label: 'Escalation Rate', value: '12%', delta: '↑ 3%' },
      { label: 'Repeat Grievance Rate', value: '9%', delta: '↑ 1%' },
      { label: 'Open Grievance Aging', value: '11 days', delta: '↑ 3 days' },
      { label: 'First Contact Resolution Rate', value: '54%', delta: '↓ 5%' },
      { label: 'Satisfaction After Resolution', value: '71%', delta: '↓ 4%' },
    ],
    note: '4 grievance cases are nearing SLA breach — pay disputes dominate at 42% of volume, mostly tied to OT calculation queries at Plant 2.',
  },
  referral: {
    metrics: [
      { label: 'Referral Participation Rate', value: '41%', delta: '↑ 2%' },
      { label: 'Referral-to-Hire Ratio', value: '58%', delta: '↑ 4%' },
      { label: 'Referral Contribution Rate', value: '34%', delta: '↑ 3%' },
      { label: 'Referral Retention Rate', value: '88%', delta: '↑ 2%' },
      { label: 'Cost Savings Through Referrals', value: '₹6.1L', delta: '↑ ₹0.4L' },
      { label: 'Referral Reward Utilization', value: '76%', delta: 'stable' },
    ],
    note: 'Referral hiring continues to outperform open-market sourcing on 90-day retention — referral hires retain 12 points better than agency-sourced hires.',
  },
  productivity: {
    metrics: [
      { label: 'Output Per Worker', value: '412 units', delta: '↑ 1.2%' },
      { label: 'Revenue Per Worker', value: '₹84,200', delta: '↑ 0.8%' },
      { label: 'Labour Productivity Index', value: '81%', delta: 'stable' },
      { label: 'Workforce Utilization', value: '86%', delta: '↓ 1%' },
      { label: 'Cost Per Unit Produced', value: '₹44.80', delta: '↑ ₹0.60' },
    ],
    note: 'Productivity is holding steady despite a rise in contractor dropout — supervisors are absorbing the gap with overtime, which is pushing cost per unit up slightly.',
  },
  safety: {
    metrics: [
      { label: 'LTIFR', value: '1.8', delta: '↓ 0.3' },
      { label: 'Incident Rate', value: '4.2 / 1000', delta: '↓ 0.9' },
      { label: 'PPE Compliance', value: '91%', delta: 'stable' },
      { label: 'Safety Training Completion', value: '96%', delta: '↑ 1%' },
      { label: 'Near Miss Reporting Rate', value: '2.4%', delta: '↑ 0.3%' },
    ],
    note: 'No lost-time incidents this month. PPE compliance gaps are concentrated at Warehouse B loading bays — flagged for a spot audit.',
  },
  offboarding: {
    metrics: [
      { label: 'Exit Completion Rate', value: '91%', delta: '↑ 2%' },
      { label: 'F&F Settlement TAT', value: '9.2 days', delta: '↓ 1.1 days' },
      { label: 'Absconding Rate', value: '2.6%', delta: '↑ 0.4%' },
      { label: 'Asset Recovery Rate', value: '88%', delta: '↓ 2%' },
      { label: 'Exit Reason (Top)', value: 'Better pay elsewhere', delta: '38% of exits' },
    ],
    note: 'Absconding ticked up at Plant 2, mirroring the OT fatigue signal from Engagement — F&F settlement TAT improved after the new digital clearance workflow.',
  },
}
