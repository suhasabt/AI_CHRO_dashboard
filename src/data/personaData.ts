// Mock data for the CFO / CIO / CDO persona dashboards.
// Scoped to a single company (Tezo Manufacturing Ltd) per the UI spec — no company-switching here.

export const personas = [
  { id: 'chro', label: 'CHRO', title: 'Chief HR Officer' },
  { id: 'cfo', label: 'CFO', title: 'Chief Financial Officer' },
  { id: 'cio', label: 'CIO', title: 'Chief Intelligence Officer' },
  { id: 'cdo', label: 'CDO', title: 'Chief Digital Officer' },
] as const

export type PersonaId = typeof personas[number]['id']

export const personaNlqPlaceholder: Record<PersonaId, string> = {
  chro: 'Ask anything... e.g. which vendor has lowest compliance?',
  cfo: 'Ask a cost question — e.g. What is OT cost at Site B this month?',
  cio: 'Ask an intelligence question — e.g. Which vendor has the most anomalies?',
  cdo: 'Ask an adoption question — e.g. Which site has the lowest app usage?',
}

export const personaNav: Record<'cfo' | 'cio' | 'cdo', { id: string; label: string }[]> = {
  cfo: [
    { id: 'cfo-cost', label: 'Cost Overview' },
    { id: 'cfo-payroll', label: 'Payroll & Billing' },
    { id: 'cfo-vendor', label: 'Vendor Financials' },
    { id: 'cfo-compliance', label: 'Compliance Risk' },
    { id: 'cfo-productivity', label: 'Productivity ROI' },
  ],
  cio: [
    { id: 'cio-feed', label: 'Intelligence Feed' },
    { id: 'cio-data', label: 'Data Quality' },
    { id: 'cio-compliance', label: 'Compliance Intelligence' },
    { id: 'cio-vendor', label: 'Vendor Risk' },
    { id: 'cio-predictive', label: 'Predictive Signals' },
  ],
  cdo: [
    { id: 'cdo-health', label: 'Digital Health' },
    { id: 'cdo-adoption', label: 'App & Channel Adoption' },
    { id: 'cdo-engagement', label: 'Engagement & Voice' },
    { id: 'cdo-attendance', label: 'Digital Attendance' },
    { id: 'cdo-grievance', label: 'Digital Grievance' },
  ],
}

export const personaLandingTab: Record<PersonaId, string> = {
  chro: 'executive',
  cfo: 'cfo-cost',
  cio: 'cio-feed',
  cdo: 'cdo-health',
}

// ───────────────────────── CFO ─────────────────────────

export const cfoCostOverview = {
  totalWorkforceCost: { value: '₹1.84Cr', delta: '↑ 3.1%', tone: 'amber' as const },
  costControlScore: 71,
  weiNote: 'Compliance drop = ₹12–18L penalty exposure',
  alert: { message: 'OT cost alert: Plant 2 overtime crossed 18% this week — labour cost will exceed monthly budget by ₹2.4L if sustained.', cta: 'Review shifts' },
  kpis: [
    { label: 'Total Workforce Cost', value: '₹1.84Cr', delta: '↑ 3.1%', tone: 'amber' as const },
    { label: 'Cost Per Worker', value: '₹18,420', delta: '↑ ₹340 vs budget', tone: 'amber' as const },
    { label: 'Overtime Cost %', value: '14.6%', delta: '↑ 1.8%', tone: 'amber' as const },
    { label: 'Payroll Accuracy %', value: '94%', delta: '↑ 1%', tone: 'green' as const },
    { label: 'Invoice Accuracy %', value: '91%', delta: '3 invoices flagged', tone: 'amber' as const },
    { label: 'Vendor Invoice Accuracy %', value: '93%', delta: '₹1.4L at risk', tone: 'amber' as const },
    { label: 'Payroll Dispute Rate', value: '2.8%', delta: '14 disputes', tone: 'amber' as const },
    { label: 'Cost Per Unit Produced', value: '₹44.80', delta: '↑ ₹0.60', tone: 'amber' as const },
    { label: 'Revenue Per Worker', value: '₹84,200', delta: '↑ 0.8%', tone: 'green' as const },
    { label: 'Compliance Score', value: '76%', delta: '₹8–12L penalty exposure', tone: 'red' as const },
    { label: 'Cost Savings via Referrals', value: '₹2.4L', delta: 'this month', tone: 'green' as const },
    { label: 'F&F Settlement Pending', value: '6', delta: '₹4.1L liability', tone: 'amber' as const },
  ],
  costControlInsight: 'Cost Control Score is 71/100 — the primary drag is Overtime Cost % at 14.6%, concentrated at Plant 2. Payroll and Invoice Accuracy are both holding above 90%, so the leak is OT, not process failure.',
  weeklyNarrative: 'Total workforce cost: ₹1.84Cr (↑3.1% vs last week). OT cost % rose to 18% at Plant 2 — primary driver is 3 unfilled shifts. Vendor invoice accuracy at 91% — 3 invoices totalling ₹1.4L held for review. Referral hiring saved ₹2.4L vs traditional recruitment this month. Actions: Cap OT at Plant 2 · Hold Vendor B invoice · Review Batch 34 before payroll run.',
}

export const cfoPayroll = {
  payrollAccuracyTrend: { weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'], values: [96, 95, 96, 94, 95, 93, 94, 94] },
  payrollAccuracyInsight: 'Payroll accuracy dipped to 93% in Week 6, traced to Batch 34 — a new vendor onboarding batch with incomplete bank verification. The batch has since been corrected, but is worth a pre-check next cycle.',
  disputesBySite: [
    { label: 'Plant 1', value: 4 }, { label: 'Plant 2', value: 14 }, { label: 'Plant 3', value: 3 },
    { label: 'Warehouse A', value: 5 }, { label: 'Warehouse B', value: 2 },
  ],
  disputesInsight: 'Plant 2 accounts for 14 of 28 disputes this month — more than every other site combined. Disputes there are concentrated on overtime calculation, consistent with the OT spike flagged elsewhere.',
  otBySite: {
    weeks: ['W1', 'W2', 'W3', 'W4'],
    sites: [
      { name: 'Plant 1', color: '#00B37E', values: [10, 11, 9, 10] },
      { name: 'Plant 2', color: '#EF4444', values: [14, 16, 17, 18] },
      { name: 'Plant 3', color: '#0056c1', values: [9, 10, 10, 11] },
    ],
  },
  otInsight: 'Plant 2 has been over-indexing on overtime for 4 straight weeks, now at 18% vs a company average of 11%. No other site shows a comparable trend.',
  costPerWorkerBySite: [
    { label: 'Plant 1', value: 17800 }, { label: 'Plant 2', value: 20100 }, { label: 'Plant 3', value: 18200 },
    { label: 'Warehouse A', value: 17200 }, { label: 'Warehouse B', value: 17600 },
  ],
  costPerWorkerInsight: 'Plant 2\'s cost per worker is ₹2,300 above the company average of ₹17,780 — almost entirely attributable to its overtime premium, not base wage differences.',
  fnfTatBuckets: [
    { label: '0–10 days', value: 18 }, { label: '11–20 days', value: 9 }, { label: '21–30 days', value: 4 }, { label: '30+ days', value: 6 },
  ],
  fnfInsight: '6 settlements are pending past 30 days, representing roughly ₹4.1L in unsettled liability. These should be prioritized before quarter close.',
}

export const cfoVendor = {
  invoiceAccuracyByVendor: [
    { label: 'Shree Contracts', value: 88, color: '#F59E0B' },
    { label: 'KPR Workforce', value: 90, color: '#F59E0B' },
    { label: 'Apex Labour', value: 97, color: '#00B37E' },
    { label: 'JK Staffing', value: 95, color: '#00B37E' },
  ],
  invoiceAccuracyInsight: 'Shree Contracts has the lowest invoice accuracy at 88% — 3 invoices this cycle total ₹1.4L in flagged discrepancies. Recommend holding payment pending review.',
  billingTrend: {
    weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
    series: [
      { name: 'Shree Contracts', color: '#EF4444', values: [14.2, 14.8, 15.6, 16.1, 17.0, 17.8] },
      { name: 'KPR Workforce', color: '#F59E0B', values: [12.1, 12.3, 12.0, 12.4, 12.6, 12.5] },
      { name: 'Apex Labour', color: '#00B37E', values: [18.4, 18.6, 18.5, 18.9, 19.0, 19.1] },
    ],
  },
  billingTrendInsight: 'Shree Contracts\' billing has grown 25% over 6 weeks — the fastest of any vendor — while its worker count has stayed flat, suggesting a rate or invoicing issue rather than genuine cost growth.',
  scatterInvoiceVsPerformance: [
    { name: 'Shree Contracts', x: 64, y: 88 }, { name: 'KPR Workforce', x: 71, y: 90 },
    { name: 'Apex Labour', x: 89, y: 97 }, { name: 'JK Staffing', x: 85, y: 95 },
  ],
  scatterInsight: 'Shree Contracts sits in the high-cost, low-quality quadrant — low performance score (64%) paired with the lowest invoice accuracy. It is the clearest candidate for renegotiation or replacement.',
  scatterFulfillmentVsCost: [
    { name: 'Shree Contracts', x: 76, y: 20100 }, { name: 'KPR Workforce', x: 84, y: 18400 },
    { name: 'Apex Labour', x: 96, y: 17600 }, { name: 'JK Staffing', x: 93, y: 17900 },
  ],
  scatterFulfillmentInsight: 'Shree Contracts has both the lowest fulfillment rate (76%) and the highest cost per worker (₹20,100) — an expensive-but-underdelivering vendor.',
  actionTile: '3 invoices from Shree Contracts total ₹1.4L — flagged before this billing cycle.',
}

export const cfoCompliance = {
  penaltyExposure: { value: '₹8.6L', delta: '↑ ₹1.2L this week', tone: 'red' as const },
  metrics: [
    { label: 'PF Compliance Rate', value: '91%', delta: '38 non-compliant workers', tone: 'green' as const },
    { label: 'ESI Compliance Rate', value: '88%', delta: '51 non-compliant workers', tone: 'green' as const },
    { label: 'Wage Compliance Rate', value: '94%', delta: '₹0.6L potential liability', tone: 'green' as const },
    { label: 'License Validity Score', value: '67%', delta: '4 expiring in 14 days', tone: 'red' as const },
    { label: 'Non-Compliance Incidents', value: '7 this month', delta: '↑ 3', tone: 'amber' as const },
  ],
  predictiveInsight: '3 vendor licenses expire in 14 days. If not renewed, estimated non-compliance penalty exposure is ₹6.2L across the 3 affected sites.',
  alertInsight: 'Compliance score dropped 6 points this week — estimated audit penalty exposure rose by ₹8L as a direct result of the License Validity decline.',
}

export const cfoProductivity = {
  revenuePerWorkerBySite: [
    { label: 'Plant 1', value: 88400 }, { label: 'Plant 2', value: 76100 }, { label: 'Plant 3', value: 86900 },
    { label: 'Warehouse A', value: 81200 }, { label: 'Warehouse B', value: 80600 },
  ],
  revenueInsight: 'Plant 2 has the lowest revenue per worker at ₹76,100 — about 14% below the company average, despite carrying the highest OT spend.',
  productivityTrend: { weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'], values: [83, 82, 81, 80, 81, 81] },
  productivityInsight: 'Labour Productivity Index slipped from 83 to 80 over Weeks 1–4 before stabilizing — the dip lines up with the start of Plant 2\'s overtime spike, not a company-wide trend.',
  costPerUnitBySite: [
    { label: 'Plant 1', value: 41.2 }, { label: 'Plant 2', value: 51.6 }, { label: 'Plant 3', value: 42.8 },
    { label: 'Warehouse A', value: 44.1 }, { label: 'Warehouse B', value: 43.9 },
  ],
  costPerUnitInsight: 'Plant 2 is the least cost-efficient site at ₹51.60 per unit, ₹10 above the next-highest site — directly tied to its overtime premium rather than lower output.',
  scatterOtVsProductivity: [
    { name: 'Plant 1', x: 10, y: 86 }, { name: 'Plant 2', x: 18, y: 76 }, { name: 'Plant 3', x: 9, y: 88 },
    { name: 'Warehouse A', x: 12, y: 81 }, { name: 'Warehouse B', x: 11, y: 80 },
  ],
  scatterInsight: 'Plant 2 has the highest OT % but the 3rd-lowest productivity — OT spend there is not converting to output.',
  utilizationBySite: [
    { label: 'Plant 1', value: 89 }, { label: 'Plant 2', value: 79 }, { label: 'Plant 3', value: 88 },
    { label: 'Warehouse A', value: 84 }, { label: 'Warehouse B', value: 83 },
  ],
}

// ───────────────────────── CIO ─────────────────────────

export const cioFeed = {
  riskScore: { value: 58, delta: '↓ 4 pts this week', tone: 'amber' as const },
  activeAnomalies: { active: 4, resolved: 3 },
  predictiveFlag: 'Site B attendance may drop below 80% next Friday — 73% confidence (payday absenteeism pattern)',
  weiNote: 'Drop attributed to Compliance — predicted 9 days ago when license expiry risk was first flagged',
  items: [
    { severity: 'High' as const, module: 'Geo Attendance', text: 'Bulk punch anomaly detected at Site D, Vendor F — 38 identical timestamps (fraud pattern)', time: '2 hours ago', status: 'Active' as const },
    { severity: 'High' as const, module: 'Compliance', text: '3 contractor licenses expire in 14 days — non-compliance certain if not actioned', time: '6 hours ago', status: 'Active' as const },
    { severity: 'Medium' as const, module: 'Attendance', text: 'Site C absenteeism 22% today — 2.1x weekly average. Possible AWOL batch.', time: 'Yesterday', status: 'Active' as const },
    { severity: 'Medium' as const, module: 'Vendor', text: 'Vendor D SLA on track to miss 70% threshold by month-end (trend-based)', time: 'Yesterday', status: 'Active' as const },
    { severity: 'Low' as const, module: 'Onboarding', text: 'First week dropout rate at 6.2% — 1.8x last month average. Check vendor quality.', time: '2 days ago', status: 'Resolved' as const },
    { severity: 'Medium' as const, module: 'Payroll', text: 'Batch 34 flagged for incomplete bank verification — payroll accuracy risk this cycle', time: '3 days ago', status: 'Resolved' as const },
    { severity: 'Low' as const, module: 'Engagement', text: 'Site D app adoption declining — down to 31%, 3rd consecutive week', time: '4 days ago', status: 'Resolved' as const },
  ],
}

export const cioDataQuality = {
  geoComplianceByVendor: [
    { label: 'Shree Contracts', value: 82, color: '#F59E0B' }, { label: 'KPR Workforce', value: 79, color: '#F59E0B' },
    { label: 'Apex Labour', value: 95, color: '#00B37E' }, { label: 'JK Staffing', value: 71, color: '#EF4444' },
  ],
  geoInsight: 'Vendor F (JK Staffing) is at 71% geo compliance — well below the 85% threshold. Site D punch pattern shows 38 identical timestamps across different workers, statistically anomalous. Likely bulk punch manipulation.',
  verificationByVendor: [
    { label: 'Shree Contracts', value: 92, color: '#00B37E' }, { label: 'KPR Workforce', value: 87, color: '#F59E0B' },
    { label: 'Apex Labour', value: 98, color: '#00B37E' }, { label: 'JK Staffing', value: 84, color: '#F59E0B' },
  ],
  verificationInsight: 'KPR Workforce and JK Staffing are both below the 90% verification threshold — worth a data-quality audit before their next onboarding batch.',
  dataCompletenessGrid: {
    sites: ['Plant 1', 'Plant 2', 'Plant 3', 'Warehouse A', 'Warehouse B'],
    modules: ['Attendance', 'Compliance', 'Payroll', 'Engagement'],
    values: [
      [98, 96, 99, 91], [94, 92, 97, 88], [97, 95, 98, 90], [62, 95, 96, 89], [96, 93, 97, 87],
    ],
  },
  duplicatePunchByVendor: [
    { vendor: 'Shree Contracts', flagged: 3, confidence: '64%' },
    { vendor: 'KPR Workforce', flagged: 2, confidence: '58%' },
    { vendor: 'JK Staffing (Vendor F)', flagged: 38, confidence: '91%' },
    { vendor: 'Apex Labour', flagged: 0, confidence: '—' },
  ],
  lastSync: [
    { site: 'Plant 1', status: 'OK', lastSync: '12 min ago' },
    { site: 'Plant 2', status: 'OK', lastSync: '8 min ago' },
    { site: 'Plant 3', status: 'OK', lastSync: '15 min ago' },
    { site: 'Warehouse A', status: 'Gap', lastSync: '7 hr 40 min ago' },
    { site: 'Warehouse B', status: 'OK', lastSync: '22 min ago' },
  ],
}

export const cioCompliance = {
  trend: { weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'], values: [85, 84, 83, 84, 85, 84, 82, 83, 84, 82, 79, 76] },
  trendInsight: 'Compliance has trended down across 12 weeks with two distinct step-downs — Week 7 (vendor onboarding) and Week 11 (license expiries). The current 76% is the lowest point in the period.',
  byType: [
    { label: 'PF', value: 38 }, { label: 'ESI', value: 24 }, { label: 'Wage', value: 11 }, { label: 'License', value: 27 },
  ],
  clusterInsight: '81% of non-compliance incidents are from 2 vendors onboarded in May — Shree Contracts and KPR Workforce. This is a vendor-level issue, not a worker-level compliance failure.',
  auditClosureTrend: { weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'], values: [78, 80, 76, 74, 73, 75, 72, 72] },
  auditInsight: 'At the current closure rate of 72%, 4 audit findings will remain open past the 90-day SLA — escalate the oldest 2 immediately.',
  licenseCalendar: [
    { vendor: 'Shree Contracts', license: 'Trade License', daysUntil: -2, status: 'Expired' as const },
    { vendor: 'KPR Workforce', license: 'Labour License', daysUntil: -2, status: 'Expired' as const },
    { vendor: 'Sai Enterprises', license: 'Trade License', daysUntil: 6, status: 'Expiring' as const },
    { vendor: 'Apex Labour', license: 'Labour License', daysUntil: 48, status: 'Valid' as const },
    { vendor: 'JK Staffing', license: 'Trade License', daysUntil: 61, status: 'Valid' as const },
  ],
  repeatByVendor: [
    { vendor: 'Shree Contracts', incidents: 5, repeat: true },
    { vendor: 'KPR Workforce', incidents: 4, repeat: true },
    { vendor: 'Sai Enterprises', incidents: 2, repeat: false },
    { vendor: 'Apex Labour', incidents: 0, repeat: false },
  ],
}

export const cioVendor = {
  performanceRanked: [
    { label: 'Apex Labour', value: 89, color: '#00B37E' }, { label: 'JK Staffing', value: 85, color: '#00B37E' },
    { label: 'KPR Workforce', value: 71, color: '#F59E0B' }, { label: 'Shree Contracts', value: 64, color: '#EF4444' },
  ],
  performanceInsight: 'Shree Contracts is the lowest-ranked vendor at 64% and trending further down — its 8-week SLA trajectory points to continued decline without intervention.',
  slaTrend: {
    weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    series: [
      { name: 'Shree Contracts', color: '#EF4444', values: [88, 85, 82, 79, 76, 74, 72, 69] },
      { name: 'KPR Workforce', color: '#F59E0B', values: [80, 79, 78, 77, 76, 75, 75, 74] },
      { name: 'Apex Labour', color: '#00B37E', values: [90, 91, 92, 91, 92, 93, 92, 92] },
    ],
  },
  complianceRanked: [
    { label: 'Apex Labour', value: 89, color: '#00B37E' }, { label: 'JK Staffing', value: 85, color: '#00B37E' },
    { label: 'KPR Workforce', value: 71, color: '#F59E0B' }, { label: 'Shree Contracts', value: 64, color: '#EF4444' },
  ],
  scatterFulfillmentVsSla: [
    { name: 'Shree Contracts', x: 76, y: 69 }, { name: 'KPR Workforce', x: 84, y: 74 },
    { name: 'Apex Labour', x: 96, y: 92 }, { name: 'JK Staffing', x: 93, y: 88 },
  ],
  scatterInsight: 'Shree Contracts sits in the high-risk quadrant — low fulfillment (76%) and low SLA (69%) together, the only vendor below both thresholds simultaneously.',
  dropoutByVendor: [
    { label: 'Shree Contracts', value: 6.8 }, { label: 'KPR Workforce', value: 5.1 },
    { label: 'Apex Labour', value: 2.1 }, { label: 'JK Staffing', value: 2.9 },
  ],
  dropoutInsight: 'Vendors onboarded via the agency referral channel show 2.3x higher first-week dropout — Shree Contracts and KPR Workforce, both agency-sourced, are the two highest.',
}

export const cioPredictions = [
  { label: 'Site B attendance < 80% next Friday', module: 'Attendance', confidence: 73, timeframe: '5 days', signal: 'Payday absenteeism pattern observed over 6 consecutive weeks.', action: 'Pre-position backup roster for Site B.' },
  { label: 'Vendor D (KPR Workforce) SLA miss', module: 'Vendor', confidence: 68, timeframe: '14 days', signal: 'SLA declining 3% per week — will cross the 70% threshold at current rate.', action: 'Schedule a performance review meeting this week.' },
  { label: 'License expiry — Shree Contracts, KPR Workforce', module: 'Compliance', confidence: 100, timeframe: '14 days', signal: 'Licenses already expired or confirmed expiring within window.', action: 'Trigger renewal workflow immediately.' },
  { label: 'Batch 34 payroll error elevated risk', module: 'Payroll', confidence: 64, timeframe: 'This cycle', signal: 'Incomplete bank verification detected in batch intake.', action: 'Flag Batch 34 for manual pre-check before processing.' },
  { label: 'Site D app adoption declining below 25%', module: 'Engagement', confidence: 71, timeframe: '2 weeks', signal: '3-week declining trend in active app usage at Site D.', action: 'Push SMS fallback channel and investigate device access.' },
]

// ───────────────────────── CDO ─────────────────────────

export const cdoHealth = {
  digitalHealthScore: 69,
  activeUsers: { value: '3,386', pct: '79%' },
  lowestSite: { site: 'Warehouse A', value: 31 },
  weiNote: 'Engagement component fell 1.2 points — survey participation declined sharply at Warehouse A',
  kpis: [
    { label: 'Active App Usage Rate', value: '79%', delta: '3,386 active users', tone: 'green' as const },
    { label: 'Notification Open Rate', value: '67%', delta: '↓ 3%', tone: 'amber' as const },
    { label: 'Communication Reach %', value: '88%', delta: '514 unreached', tone: 'green' as const },
    { label: 'Survey Participation Rate', value: '61%', delta: '↓ 5%', tone: 'amber' as const },
    { label: 'Content Consumption Rate', value: '58%', delta: '2,484 completions', tone: 'amber' as const },
    { label: 'Geo Attendance Compliance %', value: '94%', delta: 'stable', tone: 'green' as const },
    { label: 'Average Onboarding TAT', value: '55 hrs', delta: '↓ 9 hrs', tone: 'green' as const },
    { label: 'Referral Participation Rate', value: '41%', delta: '↑ 2%', tone: 'green' as const },
    { label: 'Workforce Utilization %', value: '86%', delta: '↓ 1%', tone: 'amber' as const },
    { label: 'Payroll Dispute Rate', value: '2.8%', delta: '↑ 0.6%', tone: 'amber' as const },
    { label: 'Grievance Resolution Rate', value: '78%', delta: '↓ 8%', tone: 'amber' as const },
    { label: 'First Contact Resolution Rate', value: '54%', delta: '↓ 5%', tone: 'amber' as const },
  ],
  siteAdoption: [
    { site: 'Plant 1', value: 84 }, { site: 'Plant 2', value: 72 }, { site: 'Plant 3', value: 81 },
    { site: 'Warehouse A', value: 31 }, { site: 'Warehouse B', value: 68 },
  ],
}

export const cdoAdoption = {
  appUsageTrend: {
    weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    series: [
      { name: 'Plant 1', color: '#00B37E', values: [78, 79, 80, 81, 82, 83, 84, 84] },
      { name: 'Warehouse A', color: '#EF4444', values: [52, 47, 42, 38, 35, 33, 32, 31] },
      { name: 'Plant 2', color: '#0056c1', values: [70, 71, 70, 71, 72, 71, 72, 72] },
    ],
  },
  appUsageInsight: 'Warehouse A has declined for 8 straight weeks, now at 31% — the only site moving in the wrong direction. Every other site is flat or improving.',
  notificationOpenBySite: [
    { label: 'Plant 1', value: 74, color: '#00B37E' }, { label: 'Plant 2', value: 69, color: '#00B37E' },
    { label: 'Plant 3', value: 71, color: '#00B37E' }, { label: 'Warehouse A', value: 38, color: '#EF4444' },
    { label: 'Warehouse B', value: 64, color: '#F59E0B' },
  ],
  notificationInsight: 'Warehouse A\'s notification open rate has dropped 14% since the new format rollout — workers there are not engaging with the new layout. Recommend reverting or A/B testing.',
  reachByVendor: [
    { label: 'Shree Contracts', value: 79 }, { label: 'KPR Workforce', value: 84 },
    { label: 'Apex Labour', value: 94 }, { label: 'JK Staffing', value: 91 },
  ],
  channelMix: [
    { label: 'App', value: 64, color: '#00B37E' }, { label: 'SMS', value: 18, color: '#0056c1' },
    { label: 'In-person', value: 12, color: '#F59E0B' }, { label: 'Unreached', value: 6, color: '#EF4444' },
  ],
  channelInsight: '6% of the workforce — roughly 257 workers — is digitally unreachable through any channel, concentrated at Warehouse A. SMS fallback would cover most of this gap.',
  featureUsage: [
    { label: 'Attendance Punch', value: 91 }, { label: 'Payslip View', value: 76 }, { label: 'Notices', value: 68 },
    { label: 'Grievance Filing', value: 34 }, { label: 'Survey', value: 28 },
  ],
}

export const cdoEngagement = {
  npsTrend: { weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'], values: [38, 37, 39, 38, 36, 35, 34, 36, 35, 33, 30, 28] },
  npsInsight: 'NPS has declined steadily over the last 5 weeks, now at 28 — the lowest point in 12 weeks, tracking closely with the overtime spike at Plant 2.',
  surveyBySite: [
    { label: 'Plant 1', value: 68, color: '#00B37E' }, { label: 'Plant 2', value: 54, color: '#F59E0B' },
    { label: 'Plant 3', value: 71, color: '#00B37E' }, { label: 'Warehouse A', value: 18, color: '#EF4444' },
    { label: 'Warehouse B', value: 58, color: '#F59E0B' },
  ],
  surveyInsight: 'Warehouse A survey participation is at 18% — a 3rd consecutive decline. Workers there may not be receiving survey invitations; check notification delivery.',
  engagementBySite: [
    { label: 'Plant 1', value: 81 }, { label: 'Plant 2', value: 68 }, { label: 'Plant 3', value: 79 },
    { label: 'Warehouse A', value: 52 }, { label: 'Warehouse B', value: 70 },
  ],
  contentByType: [
    { label: 'Safety', value: 92, color: '#00B37E' }, { label: 'Compliance', value: 34, color: '#EF4444' },
    { label: 'Onboarding', value: 78, color: '#00B37E' }, { label: 'Wellness', value: 61, color: '#F59E0B' },
  ],
  contentInsight: 'Workers are completing safety content (92%) but skipping compliance content (34%) — worth reviewing the compliance module\'s format or length.',
  referralBySite: [
    { label: 'Plant 1', value: 48 }, { label: 'Plant 2', value: 31 }, { label: 'Plant 3', value: 44 },
    { label: 'Warehouse A', value: 12 }, { label: 'Warehouse B', value: 38 },
  ],
  rewardUtilization: 76,
}

export const cdoAttendance = {
  geoBySite: [
    { label: 'Plant 1', value: 96, color: '#00B37E' }, { label: 'Plant 2', value: 89, color: '#00B37E' },
    { label: 'Plant 3', value: 95, color: '#00B37E' }, { label: 'Warehouse A', value: 54, color: '#EF4444' },
    { label: 'Warehouse B', value: 91, color: '#00B37E' },
  ],
  geoBySiteInsight: 'Only 54% of Warehouse A attendance is via geo-punch — the rest is manual override. This is the lowest geo-adoption site by a wide margin.',
  geoTrend: { weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'], values: [88, 89, 90, 91, 92, 93, 94, 94] },
  geoTrendInsight: 'Company-wide geo compliance has improved steadily for 8 weeks, now at 94% — driven mostly by gains outside Warehouse A.',
  geoVsManual: [
    { label: 'Plant 1', geo: 96, manual: 4 }, { label: 'Plant 2', geo: 89, manual: 11 },
    { label: 'Plant 3', geo: 95, manual: 5 }, { label: 'Warehouse A', geo: 54, manual: 46 },
    { label: 'Warehouse B', geo: 91, manual: 9 },
  ],
  anomalyFlags: [
    { site: 'Warehouse A', flag: 'Punch rate high but geo compliance low — workers punching without the app', severity: 'High' as const },
    { site: 'Plant 2', flag: 'Geo compliance improved 8% after in-app tutorial — replicate elsewhere', severity: 'Low' as const },
  ],
}

export const cdoGrievance = {
  resolutionTrend: { weeks: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'], values: [86, 85, 84, 82, 80, 79, 78, 78] },
  resolutionInsight: 'Grievance resolution rate has slipped from 86% to 78% over 8 weeks, broadly tracking the OT-driven dispute increase at Plant 2.',
  channelBreakdown: [
    { label: 'App', value: 41, color: '#00B37E' }, { label: 'Supervisor', value: 32, color: '#0056c1' },
    { label: 'Phone', value: 18, color: '#F59E0B' }, { label: 'Paper', value: 9, color: '#EF4444' },
  ],
  channelInsight: 'Digital grievance resolution TAT is 2.4 days vs 6.1 days for non-digital — this gap is worth surfacing to drive further app adoption.',
  firstContactBySite: [
    { label: 'Plant 1', value: 61 }, { label: 'Plant 2', value: 44 }, { label: 'Plant 3', value: 58 },
    { label: 'Warehouse A', value: 0 }, { label: 'Warehouse B', value: 52 },
  ],
  firstContactInsight: 'Warehouse A has 0% digital grievance submissions — workers there are not using the grievance feature at all. Investigate awareness or access barriers.',
  tatByChannel: [
    { label: 'Digital', value: 2.4, color: '#00B37E' }, { label: 'Non-digital', value: 6.1, color: '#F59E0B' },
  ],
  repeatBySite: [
    { label: 'Plant 1', value: 6 }, { label: 'Plant 2', value: 14 }, { label: 'Plant 3', value: 5 },
    { label: 'Warehouse A', value: 3 }, { label: 'Warehouse B', value: 7 },
  ],
}
