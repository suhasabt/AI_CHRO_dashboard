import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const tabs = ['WHY BUY?', 'WHY FROM ME?', 'WHY NOW?', 'CASE STUDIES']

const caseStudies = [
  {
    title: 'Manufacturing Company',
    situation: ['15 plants', '8,000+ contract workers', 'Workforce managed through spreadsheets and contractors'],
    complication: ['Compliance records scattered', 'Audit preparation took weeks', 'No centralized workforce visibility'],
    question: 'How can the company gain control over workforce compliance and operations across all locations?',
    answer: ['Centralized workforce database', 'Real-time compliance visibility', 'Faster audits', 'Reduced administrative effort', 'Improved contractor accountability'],
  },
  {
    title: 'FMCG Company',
    situation: ['Rapid workforce growth across India', 'Multiple contractors at each location'],
    complication: ['Slow onboarding', 'Duplicate worker records', 'Attendance disputes'],
    question: 'How can onboarding and workforce governance be standardized nationwide?',
    answer: ['Faster onboarding', 'Single source of truth', 'Reduced disputes', 'Better workforce visibility'],
  },
  {
    title: 'Logistics Company',
    situation: ['Thousands of workers operating across multiple hubs'],
    complication: ['No real-time workforce visibility', 'Manual reporting processes'],
    question: 'How can leadership gain real-time workforce intelligence?',
    answer: ['Live workforce visibility', 'Better deployment decisions', 'Faster reporting', 'Improved productivity management'],
  },
  {
    title: 'Enterprise Facing Compliance Audits',
    situation: ['Frequent customer and statutory audits'],
    complication: ['Teams spent weeks collecting documents', 'High risk of missing records'],
    question: 'How can audit readiness become a continuous capability rather than a last-minute exercise?',
    answer: ['Instant document availability', 'Improved audit confidence', 'Reduced compliance risk', 'Significant time savings'],
  },
  {
    title: 'Multi-Location Enterprise',
    situation: ['Workforce spread across hundreds of locations'],
    complication: ['Inconsistent processes', 'Different practices at each site'],
    question: 'How can workforce governance be standardized across all locations?',
    answer: ['Standardized processes', 'Better governance', 'Increased visibility', 'Easier management at scale'],
  },
]

const feelFeltFound = [
  { feel: 'Many CHROs felt they had workforce visibility until they saw how much data was scattered across contractors.', found: 'Complete transparency after implementing BeeForce.' },
  { feel: 'Many organizations felt compliance was under control because audits were passed.', found: 'Significant hidden risk when workforce data was digitized.' },
  { feel: 'Many leaders felt onboarding delays were unavoidable.', found: 'Onboarding times reduced dramatically after automation.' },
  { feel: 'Many companies felt contractor management required large teams.', found: 'Automation allowed the same team to manage much larger workforce volumes.' },
  { feel: 'Many customers initially viewed workforce management software as another tool.', found: 'It became mission-critical infrastructure.' },
]

export default function WhyBuyFromMeNow() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">Sales Framework: WHY BUY? FROM ME? NOW?</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          A repository for discovery, demos, value presentation, and objection handling.
          <span className="font-medium text-foreground"> People buy when they believe: (1) the problem is real, (2) you are the safest choice, (3) waiting is more expensive than acting.</span>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-border">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActiveTab(i)}
            className={cn(
              'px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors border-b-2 -mb-px',
              activeTab === i
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* WHY BUY */}
      {activeTab === 0 && (
        <div className="space-y-6">
          {[
            {
              heading: 'By Using BeeForce, Customers Will Be Able To DO:',
              items: ['Digitize contractor workforce operations', 'Onboard workers faster', 'Verify worker documents automatically', 'Track attendance in real time', 'Manage multiple contractors centrally', 'Automate workforce compliance checks', 'Reduce manual HR effort', 'Track workforce productivity', 'Generate compliance reports instantly', 'Automate payroll input collection', 'Reduce dependency on spreadsheets', 'Manage workforce across multiple locations', 'Standardize contractor onboarding processes', 'Monitor contractor performance', 'Track workforce deployment in real time', 'Manage worker training and certifications', 'Digitize gate entry and workforce movement', 'Improve audit readiness', 'Reduce workforce-related disputes', 'Make data-driven workforce decisions'],
              color: 'border-blue-200 bg-blue-50',
              label: 'DO',
              labelColor: 'bg-blue-100 text-blue-700',
            },
            {
              heading: 'By Using BeeForce, Customers Will HAVE:',
              items: ['Better workforce visibility', 'Higher compliance scores', 'Reduced legal exposure', 'Faster onboarding cycles', 'Lower administrative costs', 'Accurate workforce records', 'Stronger contractor accountability', 'Better governance', 'Increased operational efficiency', 'Real-time workforce intelligence', 'Better vendor control', 'Reduced payroll errors', 'Improved workforce productivity', 'Faster management reporting', 'Centralized workforce database', 'Improved worker engagement', 'Better customer audit outcomes', 'Better risk management', 'Greater business continuity', 'Scalability without increasing headcount'],
              color: 'border-green-200 bg-green-50',
              label: 'HAVE',
              labelColor: 'bg-green-100 text-green-700',
            },
            {
              heading: 'By Using BeeForce, Customers Will FEEL:',
              items: ['More in control', 'More confident during audits', 'Less stressed about compliance', 'More secure about workforce data', 'Better prepared for inspections', 'Confident in workforce decisions', 'Assured that workers are compliant', 'Less dependent on manual follow-ups', 'Empowered by real-time information', 'Peace of mind regarding labor law compliance'],
              color: 'border-purple-200 bg-purple-50',
              label: 'FEEL',
              labelColor: 'bg-purple-100 text-purple-700',
            },
          ].map(section => (
            <Card key={section.label} className={`border ${section.color}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${section.labelColor}`}>{section.label}</span>
                  <CardTitle className="text-sm font-semibold">{section.heading}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                  {section.items.map(item => (
                    <p key={item} className="text-xs text-foreground flex items-start gap-1.5">
                      <span className="text-primary font-bold mt-0.5">›</span> {item}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Feel-Felt-Found */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Faith-Based Value: Feel-Felt-Found Statements</h3>
            <div className="space-y-2.5">
              {feelFeltFound.map((f, i) => (
                <Card key={i}>
                  <CardContent className="py-4 px-5">
                    <p className="text-xs text-foreground leading-relaxed">
                      <span className="font-medium">I understand how you feel. </span>{f.feel}
                      <span className="font-medium text-primary"> What they found was </span>{f.found}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WHY FROM ME */}
      {activeTab === 1 && (
        <div className="space-y-5">
          {[
            {
              heading: 'Product-Centric',
              items: ['Built specifically for large enterprise workforce management', 'Covers the entire workforce lifecycle', 'Deep compliance automation capabilities', 'Enterprise-grade security and controls', 'AI-powered workforce automation', 'Highly configurable workflows', 'Continuous innovation and product upgrades', 'Multiple products integrated into one ecosystem'],
            },
            {
              heading: 'Service-Centric',
              items: ['Dedicated implementation teams', 'Enterprise consulting approach', 'Custom workflows and approvals', 'Industry-specific expertise', 'High-touch customer success model', 'Strong post-implementation support', 'Deep change management support'],
            },
            {
              heading: 'Sales-Centric',
              items: ['One partner for multiple workforce challenges', 'Ability to bundle multiple solutions', 'Consultative selling approach', 'Strategic workforce advisory capability', 'Long-term partnership mindset', 'Executive-level engagement'],
            },
            {
              heading: 'Domain Expertise',
              items: ['More than a decade in workforce technology', 'Millions of workers managed', 'Thousands of locations managed', 'Experience across manufacturing, logistics, FMCG, retail, infrastructure, and services sectors', 'Deep understanding of Indian labor compliance'],
            },
            {
              heading: 'Business Stability',
              items: ['Profitable company', 'Founder-led business', 'Strong customer retention', 'Proven scalability', 'Continuous investment in innovation'],
            },
          ].map(s => (
            <Card key={s.heading}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{s.heading}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {s.items.map(item => (
                    <li key={item} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">›</span> {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3"><CardTitle className="text-sm">What BlueTree Stands For — Faith-Based Value</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
                {['Customer success before revenue', 'Long-term partnerships over short-term transactions', 'Innovation over stagnation', 'Transparency over surprises', 'Ownership over excuses', 'Execution over promises', 'Enterprise-grade reliability', 'Continuous improvement', 'Trust through consistent delivery', 'Building products that solve real business problems'].map(v => (
                  <p key={v} className="text-xs text-foreground flex items-start gap-1.5">
                    <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" /> {v}
                  </p>
                ))}
              </div>
              <div className="space-y-1.5 border-t border-border pt-4">
                {["We don't sell software. We solve workforce management problems.", "We prefer telling customers 'no' rather than overpromising.", "We treat customer success as our responsibility.", "We are committed to continuous innovation.", "We build relationships measured in years, not quarters."].map(s => (
                  <p key={s} className="text-xs text-foreground italic">"{s}"</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* WHY NOW */}
      {activeTab === 2 && (
        <div className="space-y-4">
          {[
            { heading: 'Compliance Risk', color: 'border-red-200 bg-red-50', items: ['Every day without automation increases compliance exposure', 'Upcoming audits could reveal gaps', 'Regulatory scrutiny is increasing', 'Workforce documentation gaps compound over time'] },
            { heading: 'Operational Efficiency', color: 'border-orange-200 bg-orange-50', items: ['Manual effort continues to grow as workforce scales', 'Delayed decisions increase operational costs', 'Existing inefficiencies continue to drain productivity'] },
            { heading: 'Business Growth', color: 'border-blue-200 bg-blue-50', items: ['Workforce expansion becomes harder without systems', 'Scaling manually is expensive', 'Future projects require stronger workforce controls'] },
            { heading: 'Technology Advantage', color: 'border-green-200 bg-green-50', items: ['Competitors are digitizing workforce operations', 'AI capabilities are creating productivity advantages', 'Early adopters gain operational leverage'] },
            { heading: 'Implementation Reality', color: 'border-purple-200 bg-purple-50', items: ['Enterprise implementations require planning', 'Waiting delays realization of benefits', 'Budget approvals are available now', 'Project teams are aligned today'] },
          ].map(s => (
            <Card key={s.heading} className={`border ${s.color}`}>
              <CardHeader className="pb-3"><CardTitle className="text-sm">{s.heading}</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {s.items.map(i => <li key={i} className="text-xs text-foreground flex items-start gap-1.5"><span className="text-primary mt-0.5">›</span> {i}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3"><CardTitle className="text-sm">Faith-Based Urgency</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                {[
                  'Clarity is more important than delay.',
                  'A "No" is acceptable. An indefinite "Maybe" helps nobody.',
                  'If the problem is real and the value is clear, leadership means making a decision.',
                  'Every month of delay is another month of inefficiency.',
                  'Inertia is often more expensive than action.',
                  'Most organizations regret delayed transformation more than thoughtful action.',
                  'Waiting rarely improves the problem.',
                  'Progress starts with a decision.',
                  'The best time to fix workforce challenges was yesterday. The next best time is today.',
                ].map(s => (
                  <p key={s} className="text-xs text-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">›</span> {s}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CASE STUDIES */}
      {activeTab === 3 && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground mb-3">Case Study Repository (SCQA Format)</p>
          {caseStudies.map((cs, i) => (
            <Card key={cs.title}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2.5">
                  <Badge variant="outline" className="text-[11px]">Case {i + 1}</Badge>
                  <CardTitle className="text-sm">{cs.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Situation</p>
                    <ul className="space-y-1">{cs.situation.map(s => <li key={s} className="text-xs text-foreground">· {s}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Complication</p>
                    <ul className="space-y-1">{cs.complication.map(c => <li key={c} className="text-xs text-foreground">· {c}</li>)}</ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-muted/50 rounded text-xs text-muted-foreground italic leading-relaxed">
                  <span className="font-semibold not-italic text-foreground">Question: </span>{cs.question}
                </div>
                <div className="mt-3">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Answer (BeeForce Results)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.answer.map(a => <Badge key={a} variant="secondary" className="text-[11px]">{a}</Badge>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
