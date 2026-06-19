import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const motivations = [
  {
    type: 'Necessity',
    want: 'Solve a critical problem',
    drives: 'Risk avoidance, compliance, survival',
    message: '"You need this to avoid losses, penalties, and operational disruption."',
    color: 'bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-700',
    chro: ['Labour law compliance', 'Contractor compliance', 'Statutory audits', 'Avoid workforce fraud', 'Reduce legal exposure', 'Ensure worker documentation', 'Prevent unauthorized workforce deployment', 'Maintain audit readiness'],
    cfo: ['Avoid penalties', 'Control contractor leakages', 'Reduce payroll errors', 'Prevent duplicate payments', 'Improve cost visibility', 'Reduce compliance-related financial risks'],
    cfomsg: '"Without workforce governance, companies expose themselves to compliance risks, penalties, workforce fraud, and operational disruption."',
  },
  {
    type: 'Comfort / Convenience',
    want: 'Make life easier',
    drives: 'Save time, effort, frustration',
    message: '"This simplifies work and reduces manual effort."',
    color: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    chro: ['One platform instead of spreadsheets', 'Faster onboarding', 'Less paperwork', 'Easier contractor management', 'Better visibility', 'Automated workflows'],
    cfo: ['Automated approvals', 'Faster reconciliation', 'Real-time reports', 'Less manual intervention', 'Better cost tracking'],
    cfomsg: '"BeeForce eliminates manual coordination and gives you complete visibility across your contract workforce operations."',
  },
  {
    type: 'Emotion',
    want: 'Feel secure, appreciated, or connected',
    drives: 'Personal satisfaction, peace of mind',
    message: '"Your teams will feel valued, engaged, and supported."',
    color: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    chro: ['Confidence during audits', 'Peace of mind', 'Better employee experience', 'Reduced stress', 'Stronger employer brand'],
    cfo: ['Confidence in reported numbers', 'Assurance against surprises', 'Reduced operational anxiety'],
    cfomsg: '"Sleep peacefully knowing every worker, contractor, and compliance document is under control."',
  },
  {
    type: 'Prestige',
    want: 'Gain status, recognition, competitive advantage',
    drives: 'Reputation and visibility',
    message: '"Leading organizations are already doing this."',
    color: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    chro: ['Become a digital HR leader', 'Drive workforce transformation', 'Present modern workforce practices to the board', 'Benchmark against industry leaders'],
    cfo: ['Showcase governance excellence', 'Demonstrate financial discipline', 'Present data-driven workforce decisions'],
    cfomsg: '"Industry leaders are moving from workforce administration to workforce intelligence."',
  },
  {
    type: 'Mastery & Adventure',
    want: 'Learn, innovate, achieve excellence',
    drives: 'Growth, achievement, transformation',
    message: '"This helps you build a future-ready workforce and outperform competition."',
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-700',
    chro: ['Workforce analytics', 'Predictive workforce planning', 'Future-ready HR', 'AI-driven workforce insights', 'Strategic workforce management'],
    cfo: ['Workforce productivity analytics', 'Workforce ROI measurement', 'Data-driven investment decisions', 'Advanced forecasting'],
    cfomsg: '"Move beyond workforce management and build a strategic workforce advantage."',
  },
]

const personas = [
  {
    role: 'Plant Head',
    primary: 'Necessity + Convenience',
    points: ['Ensure manpower availability', 'Avoid production disruption', 'Faster workforce deployment', 'Better contractor control'],
  },
  {
    role: 'HR Head',
    primary: 'Necessity + Emotion',
    points: ['Compliance', 'Audit readiness', 'Employee experience', 'Workforce governance'],
  },
  {
    role: 'Procurement Head',
    primary: 'Necessity + Prestige',
    points: ['Vendor governance', 'Contractor accountability', 'Cost optimization', 'Best-in-class sourcing controls'],
  },
  {
    role: 'CFO',
    primary: 'Necessity',
    points: ['Financial control', 'Risk mitigation', 'Cost reduction', 'Governance'],
  },
  {
    role: 'CEO / MD',
    primary: 'Prestige + Mastery',
    points: ['Digital transformation', 'Competitive advantage', 'Organizational excellence', 'Enterprise-wide visibility'],
  },
]

export default function BuyingMotivations() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">5 Customer Buying Motivations</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Customers rarely buy software itself — they buy an outcome that satisfies one of these five motivations.
          Useful for training SDRs, AEs, and founders.
        </p>
      </div>

      {/* Overview Table */}
      <Card className="mb-8">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Customer Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">What They Want</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">What Drives Purchase</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Sales Message</th>
                </tr>
              </thead>
              <tbody>
                {motivations.map((m, i) => (
                  <tr key={m.type} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                    <td className="px-4 py-3 font-medium text-foreground">{m.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{m.want}</td>
                    <td className="px-4 py-3 text-muted-foreground">{m.drives}</td>
                    <td className="px-4 py-3 text-muted-foreground italic">{m.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Applying to BeeForce */}
      <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Applying This to BeeForce</h2>
      <div className="space-y-4 mb-10">
        {motivations.map((m, idx) => (
          <Card key={m.type} className={`border ${m.color}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-foreground">{idx + 1}. {m.type} Customer</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.badge}`}>{m.type}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-5 mb-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">CHRO Priorities</p>
                  <ul className="space-y-1">
                    {m.chro.map(c => (
                      <li key={c} className="text-xs text-foreground flex items-start gap-1.5">
                        <span className="text-primary mt-0.5">›</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">CFO Priorities</p>
                  <ul className="space-y-1">
                    {m.cfo.map(c => (
                      <li key={c} className="text-xs text-foreground flex items-start gap-1.5">
                        <span className="text-primary mt-0.5">›</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-white/70 rounded-md px-4 py-3 border border-current/10">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Message</p>
                <p className="text-sm text-foreground italic leading-relaxed">{m.cfomsg}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Persona Mapping */}
      <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Mapping to Enterprise Personas</h2>
      <div className="grid grid-cols-1 gap-3 mb-10">
        {personas.map((p) => (
          <Card key={p.role}>
            <CardContent className="py-4 px-5">
              <div className="flex items-start gap-5">
                <div className="min-w-[140px]">
                  <p className="font-semibold text-sm text-foreground">{p.role}</p>
                  <Badge variant="secondary" className="text-[11px] mt-1.5">{p.primary}</Badge>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {p.points.map(pt => (
                    <span key={pt} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="text-primary">·</span> {pt}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Buying Trigger */}
      <Card className="bg-primary text-primary-foreground border-0">
        <CardContent className="py-5 px-6">
          <p className="font-bold text-sm mb-3">The Most Powerful Enterprise Buying Trigger</p>
          <p className="text-xs opacity-90 mb-4 leading-relaxed">
            For BeeForce, most deals start with <strong>Necessity</strong> but close because of <strong>Convenience</strong>, <strong>Prestige</strong>, or <strong>Mastery</strong>.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Entry Point', value: '"You have a compliance and workforce governance problem."' },
              { label: 'Expansion', value: '"We can automate and simplify operations."' },
              { label: 'Executive Justification', value: '"This positions your organization as a leader in workforce transformation."' },
            ].map(t => (
              <div key={t.label} className="bg-white/10 rounded-md px-4 py-3 flex-1 min-w-[200px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider opacity-70 mb-1.5">{t.label}</p>
                <p className="text-xs italic leading-relaxed">{t.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 opacity-70">
            This progression mirrors how large enterprises typically buy: <strong>Fear → Efficiency → Strategic Advantage</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
