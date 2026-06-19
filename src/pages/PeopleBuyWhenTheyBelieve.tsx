import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const sections = [
  {
    belief: '1. The Problem is Real',
    personas: [
      {
        role: 'CHRO',
        cares: ['Workforce visibility', 'Compliance', 'Governance', 'Employee experience', 'Risk', 'Productivity'],
        conversation: [
          '"Most organizations believe they have workforce control because they receive monthly reports from contractors. The reality is that they only have contractor visibility, not workforce visibility."',
          '"Can you tell me today exactly how many contract workers are active across all locations, who has expired documents, who has completed mandatory training, and which contractors are exposing you to compliance risk?"',
        ],
        hiddenProblems: ['Ghost workers', 'Expired certifications', 'Missing compliance documents', 'Unapproved workforce deployment', 'Contractor dependency', 'Inconsistent onboarding processes', 'Workforce attrition patterns', 'Training gaps', 'Audit vulnerabilities'],
        powerfulStatement: '"The biggest workforce risks are rarely the ones you know. They are the ones hidden inside spreadsheets, contractor records, emails, and disconnected systems."',
        belief: '"We have less visibility and control than we thought."',
        color: 'bg-blue-50 border-blue-200',
      },
      {
        role: 'CFO',
        cares: ['Financial leakage', 'Compliance penalties', 'Audit risk', 'Cost optimization', 'Productivity', 'ROI'],
        conversation: [
          '"Workforce cost is often one of the largest expenses after raw materials and payroll. Yet many organizations manage contract workforce through fragmented processes."',
          'Ask: How much workforce cost is under management? How many contractors are involved? How much effort is spent reconciling attendance and payroll inputs? How much exposure exists if a contractor fails compliance requirements?',
        ],
        hiddenProblems: ['Duplicate worker payments', 'Attendance inaccuracies', 'Overbilling by contractors', 'Ghost workers', 'Compliance penalties', 'Audit observations', 'Administrative inefficiencies', 'Productivity losses'],
        powerfulStatement: '"The cost of workforce inefficiency rarely appears as a line item. It is hidden across payroll leakage, compliance exposure, management effort, and operational delays."',
        belief: '"We are probably losing more money than we realize."',
        color: 'bg-green-50 border-green-200',
      },
    ],
  },
  {
    belief: '2. You Are the Safest Choice',
    note: 'The safest choice is not the cheapest vendor. The safest choice is the one least likely to create future problems.',
    personas: [
      {
        role: 'CHRO',
        cares: [],
        conversation: [],
        hiddenProblems: [],
        powerfulStatement: '',
        belief: '"These people understand my world."',
        color: 'bg-blue-50 border-blue-200',
        safetyPoints: [
          { title: 'Proven Experience', desc: '"We manage millions of workers across thousands of locations." The CHRO immediately thinks: "If they can handle that scale, they can handle ours."' },
          { title: 'Domain Expertise', desc: '"We specialize in workforce management, compliance, onboarding, attendance, contractor governance, and workforce analytics." Not generic HR software. Not generic ERP. A specialist.' },
          { title: 'Proven Methodology', desc: '"We\'ve seen the mistakes companies make and built the platform around avoiding them."' },
          { title: 'Strong Customer Success', desc: '"Implementation is not a software project. It\'s an adoption and governance project."' },
        ],
      },
      {
        role: 'CFO',
        cares: [],
        conversation: [],
        hiddenProblems: [],
        powerfulStatement: '',
        belief: '"This is a low-risk investment."',
        color: 'bg-green-50 border-green-200',
        safetyPoints: [
          { title: 'Business Stability', desc: 'Profitable company · Long operating history · Enterprise customer base · Founder-led execution' },
          { title: 'Risk Reduction', desc: '"Our platform is designed to reduce workforce-related financial and compliance risk."' },
          { title: 'Proven ROI', desc: 'Show examples of: Reduced manpower effort · Faster audits · Lower compliance risk · Improved workforce productivity' },
          { title: 'Scalability', desc: '"The platform can scale without requiring proportional increases in administrative staff."' },
        ],
      },
    ],
  },
  {
    belief: '3. Waiting is More Expensive Than Acting',
    note: 'Most deals are not lost to competitors. Most deals are lost to inertia. The customer agrees there is a problem. The customer agrees your solution works. But they postpone. Your job is to make the cost of delay visible.',
    personas: [
      {
        role: 'CHRO',
        cares: [],
        conversation: [],
        hiddenProblems: [],
        powerfulStatement: '"Workforce complexity grows automatically. Governance does not."',
        belief: '"The problem will become larger if I wait."',
        color: 'bg-blue-50 border-blue-200',
        waitingPoints: {
          reframe: 'The decision is not: "Should we buy BeeForce?" The decision is: "How much longer should we continue operating with the current risks?"',
          questions: ['How many workers will be onboarded over the next 12 months?', 'How many audits are expected?', 'How many compliance documents will expire?', 'How much workforce growth is planned?'],
          statement: '"Every month of delay means another month of manual processes, limited visibility, and avoidable compliance exposure."',
        },
      },
      {
        role: 'CFO',
        cares: [],
        conversation: [],
        hiddenProblems: [],
        powerfulStatement: '"Doing nothing is not free. It simply means continuing to pay the hidden cost every month."',
        belief: '"The cost of waiting exceeds the cost of investment."',
        color: 'bg-green-50 border-green-200',
        waitingPoints: {
          reframe: 'The decision is not: "Should we spend money?" The decision is: "What is the cost of doing nothing?"',
          questions: ['How much manpower is spent managing workforce administration?', 'How much effort goes into audit preparation?', 'What is the financial impact of one compliance violation?', 'What is the cost of one payroll error across thousands of workers?'],
          statement: 'Quantify Delay: If inefficiencies cost ₹10 lakh/month → 6 months delay = ₹60 lakh → 12 months delay = ₹1.2 crore',
        },
      },
    ],
  },
]

export default function PeopleBuyWhenTheyBelieve() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">People Buy When They Believe...</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          The most effective enterprise sales conversations are not about software. They are about helping executives reach three conclusions:
          <strong className="text-foreground font-semibold"> (1) The problem is real. (2) You are the safest choice. (3) Waiting is more expensive than acting.</strong>
        </p>
        <p className="text-xs text-muted-foreground mt-3 max-w-2xl leading-relaxed">
          The way you establish these beliefs should be different for a CHRO and a CFO because they view the same problem through different lenses.
        </p>
      </div>

      {sections.map((section, si) => (
        <div key={section.belief} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0">
              {si + 1}
            </div>
            <h2 className="text-base font-bold text-foreground">{section.belief}</h2>
          </div>
          {section.note && (
            <p className="text-sm text-muted-foreground italic mb-5 ml-11 leading-relaxed">{section.note}</p>
          )}
          <div className="grid grid-cols-2 gap-5 ml-11">
            {section.personas.map(p => (
              <Card key={p.role} className={`border ${p.color}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">{p.role[0]}</span>
                    <CardTitle className="text-sm">For a {p.role}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {p.cares.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">What the {p.role} cares about</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.cares.map(c => <span key={c} className="text-[11px] bg-white/70 border border-border rounded px-2 py-1">{c}</span>)}
                      </div>
                    </div>
                  )}
                  {p.conversation.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Conversation</p>
                      {p.conversation.map((c, i) => <p key={i} className="text-xs text-foreground italic mb-1.5 leading-relaxed">{c}</p>)}
                    </div>
                  )}
                  {p.hiddenProblems.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Hidden Problems {p.role}s Often Don't See</p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                        {p.hiddenProblems.map(h => <p key={h} className="text-[11px] text-foreground flex items-start gap-1.5"><span className="text-red-400 mt-0.5">·</span> {h}</p>)}
                      </div>
                    </div>
                  )}
                  {(p as any).safetyPoints && (
                    <div className="space-y-2.5">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">What Creates Safety?</p>
                      {(p as any).safetyPoints.map((sp: any) => (
                        <div key={sp.title} className="bg-white/60 rounded p-3">
                          <p className="text-[11px] font-semibold text-foreground mb-0.5">{sp.title}</p>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">{sp.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {(p as any).waitingPoints && (
                    <div className="space-y-2.5">
                      <div className="bg-white/60 rounded p-3">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Reframe the Decision</p>
                        <p className="text-xs text-foreground leading-relaxed">{(p as any).waitingPoints.reframe}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Questions</p>
                        {(p as any).waitingPoints.questions.map((q: string) => (
                          <p key={q} className="text-xs text-foreground flex items-start gap-1.5 mb-1"><span className="text-primary mt-0.5">?</span> {q}</p>
                        ))}
                      </div>
                      <p className="text-xs text-foreground italic bg-white/60 rounded p-3 leading-relaxed">{(p as any).waitingPoints.statement}</p>
                    </div>
                  )}
                  {p.powerfulStatement && (
                    <div className="bg-white/60 rounded p-3">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Powerful Statement</p>
                      <p className="text-xs text-foreground italic leading-relaxed">{p.powerfulStatement}</p>
                    </div>
                  )}
                  <div className="bg-primary/10 rounded px-3 py-2">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-0.5">{p.role} Belief</p>
                    <p className="text-xs text-primary font-medium italic">{p.belief}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Closing */}
      <Card className="bg-primary text-primary-foreground border-0 mt-8">
        <CardContent className="py-5 px-6 space-y-4">
          <p className="text-sm font-bold">Executive-Level Closing</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { role: 'For CHRO', text: '"If workforce visibility, governance, compliance, and scalability are strategic priorities, the question is not whether transformation should happen. The question is whether it happens proactively today or reactively after a problem forces it."' },
              { role: 'For CFO', text: '"The strongest business cases are rarely created by software. They are created by eliminating risk, reducing inefficiency, and preventing avoidable losses. The longer those losses continue, the more expensive the decision to wait becomes."' },
              { role: 'Combined Message', text: '"Organizations move forward when leadership believes three things: the problem is real, the solution is proven, and the cost of delay is greater than the cost of action. Our role is simply to help you evaluate those three factors objectively and make the best decision for the business."' },
            ].map(c => (
              <div key={c.role} className="bg-white/10 rounded-md p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider opacity-70 mb-2">{c.role}</p>
                <p className="text-xs italic opacity-90 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
