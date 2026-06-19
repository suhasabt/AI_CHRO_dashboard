import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Eye, HelpCircle, PenLine, Target, Mic, Ban, X, Check } from 'lucide-react'

const sequenceSteps = [
  {
    num: 1, key: 'ASK', label: 'Ask Questions', subLabel: 'Gain Clarity',
    purpose: 'The purpose is not to impress the customer. The purpose is to understand:',
    points: ['Current situation', 'Problems', 'Impact of those problems', 'Desired outcomes', 'Decision-making process', 'Timeline', 'Budget', 'Stakeholders'],
    examples: ['How are you managing this today?', 'What challenges are you facing?', 'What happens if this problem continues?', 'What would success look like?', 'Who else is involved in this decision?'],
    rule: 'Curiosity before Capability.',
    avoid: [],
    instead: [],
    color: 'bg-blue-500',
    bg: 'bg-blue-50 border-blue-200',
  },
  {
    num: 2, key: 'LISTEN', label: 'Listen', subLabel: 'Understand and Engage',
    purpose: 'Most salespeople listen to respond. Great salespeople listen to understand.',
    points: ['Facts', 'Emotions', 'Concerns', 'Priorities', 'Hidden risks', 'Buying signals'],
    examples: ['Tell me more about that.', 'Why is that important?', 'Can you help me understand that better?'],
    rule: 'The customer should speak more than you.',
    avoid: ['Interrupting', 'Jumping into demos', 'Offering solutions too early'],
    instead: ['Take notes', 'Encourage elaboration', 'Ask follow-up questions'],
    color: 'bg-green-500',
    bg: 'bg-green-50 border-green-200',
  },
  {
    num: 3, key: 'SUMMARIZE', label: 'Summarize', subLabel: 'Align and Agree',
    purpose: 'Before presenting any solution, confirm your understanding. This achieves three things:',
    points: ['Shows respect', 'Builds trust', 'Prevents misunderstandings'],
    examples: ['"Let me make sure I understood correctly. You currently manage 12,000 contract workers across 150 locations. Visibility into contractor compliance is limited, audits consume significant HR bandwidth, and leadership wants a centralized system before the next financial year. Is that accurate?"'],
    rule: 'Never prescribe before diagnosis.',
    avoid: [],
    instead: [],
    color: 'bg-amber-500',
    bg: 'bg-amber-50 border-amber-200',
  },
  {
    num: 4, key: 'LEAD', label: 'Lead', subLabel: 'Move the Buying Process Forward',
    purpose: 'Only after agreement should you lead. Your role is not to push. Your role is to guide.',
    points: ['Product demonstration', 'Discovery workshop', 'Process study', 'Business case', 'Pilot', 'Proposal', 'Stakeholder meeting', 'Commercial discussion'],
    examples: ['"Based on what you\'ve shared, I believe the next logical step is a 60-minute workshop where we map your contractor lifecycle and identify compliance gaps. Would that be useful?"'],
    rule: 'Every meeting should end with a mutually agreed next step.',
    avoid: [],
    instead: [],
    color: 'bg-primary',
    bg: 'bg-blue-50 border-primary/30',
  },
]

const listenFramework = [
  {
    letter: 'L', word: 'Look at the Speaker', icon: Eye,
    description: 'Give complete attention to the customer.',
    points: ['Maintain eye contact', 'Avoid interrupting', 'Take notes', 'Observe tone, emotions, and body language'],
    example: '"Mr. Sharma, I want to fully understand your contractor management process before I suggest anything."',
    color: 'bg-blue-500',
  },
  {
    letter: 'I', word: 'Inquire (Ask Questions)', icon: HelpCircle,
    description: 'Ask questions to uncover needs, pain points, risks, and goals.',
    points: [],
    example: '',
    subSections: [
      { label: 'Requirements Questions', items: ['How are you currently managing contract workers?', 'What challenges are you facing today?'] },
      { label: 'Impact Questions', items: ['What happens when attendance data is inaccurate?', 'How does non-compliance affect operations?'] },
      { label: 'Future Questions', items: ['If you could fix one thing immediately, what would it be?'] },
    ],
    color: 'bg-green-500',
  },
  {
    letter: 'S', word: 'Summarize', icon: PenLine,
    description: 'Repeat back what you heard to confirm understanding.',
    points: ['Builds trust', 'Prevents misunderstandings', 'Makes customers feel heard'],
    example: '"Let me summarize to ensure I\'ve understood correctly. You have 8,000 contract workers across 120 locations, attendance is captured manually, compliance tracking is decentralized, and payroll errors are creating escalations. Is that accurate?"',
    color: 'bg-amber-500',
  },
  {
    letter: 'T', word: 'Take Away', icon: Target,
    description: 'Challenge assumptions and test urgency. This prevents prospects from saying "yes" to everything without commitment.',
    points: [],
    example: '',
    takeaways: ['"Maybe this isn\'t a priority right now?"', '"Perhaps the current system is working well enough?"', '"Would it be fair to say that payroll errors aren\'t causing significant business impact?"'],
    customerResponse: '"No, actually it\'s becoming a major issue for us."',
    note: 'Now the pain becomes self-discovered.',
    color: 'bg-orange-500',
  },
  {
    letter: 'E', word: 'Encourage the Speaker', icon: Mic,
    description: 'Keep them talking. Use short verbal prompts.',
    points: ['Tell me more.', 'Interesting.', 'What happened next?', 'Can you elaborate on that?', 'How long has this been happening?', 'That\'s helpful. Please continue.'],
    example: '',
    note: 'Research consistently shows that the more the customer speaks, the more likely they are to buy.',
    color: 'bg-purple-500',
  },
  {
    letter: 'N', word: 'Never Negate', icon: Ban,
    description: 'Never tell the customer they are wrong. Instead of correcting, redirect.',
    points: [],
    example: '',
    comparisons: [
      { wrong: '"No, that\'s not how workforce management works."', right: '"I understand why you\'d see it that way. May I share what we\'ve observed with other enterprises managing large contract workforces?"' },
      { wrong: '"Your process is outdated."', right: '"Many organizations started with a similar process before moving to automation."' },
    ],
    color: 'bg-red-500',
  },
]

export default function CommunicationAndListening() {
  const [activeSection, setActiveSection] = useState<'sequence' | 'listen'>('sequence')
  const [activeStep, setActiveStep] = useState(0)
  const [activeListen, setActiveListen] = useState(0)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">Communication & L.I.S.T.E.N</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Two complementary frameworks that keep conversations customer-centric, not salesperson-centric.
        </p>
      </div>

      {/* Section Toggle */}
      <div className="flex gap-1 mb-8 bg-muted rounded-lg p-1 w-fit">
        {[{ id: 'sequence', label: 'Sales Communication Sequence' }, { id: 'listen', label: 'L.I.S.T.E.N Framework' }].map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id as any)}
            className={cn('px-4 py-2 rounded-md text-xs font-semibold transition-all', activeSection === s.id ? 'bg-white shadow text-foreground' : 'text-muted-foreground')}>
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === 'sequence' && (
        <div>
          {/* Formula banner */}
          <div className="flex items-center gap-3 mb-8 p-4 bg-primary text-primary-foreground rounded-lg">
            <p className="text-xs font-bold mr-2 uppercase tracking-wider">The Formula</p>
            {['Ask', 'Listen', 'Summarize', 'Lead'].map((s, i, arr) => (
              <div key={s} className="flex items-center gap-2">
                <span className="font-bold text-sm">{s}</span>
                {i < arr.length - 1 && <span className="opacity-60">→</span>}
              </div>
            ))}
            <div className="ml-auto text-xs opacity-70">NOT: Lead → Pitch → Demo → Hope</div>
          </div>

          {/* Step selector */}
          <div className="flex gap-2.5 mb-6">
            {sequenceSteps.map((s, i) => (
              <button key={s.key} onClick={() => setActiveStep(i)}
                className={cn('flex-1 py-3 px-3 rounded-lg border text-center transition-all', activeStep === i ? `${s.color} text-white border-transparent` : 'border-border hover:bg-muted')}>
                <p className="text-[11px] font-bold">{s.num}.</p>
                <p className="text-xs font-semibold">{s.key}</p>
                <p className="text-[11px] opacity-70">{s.subLabel}</p>
              </button>
            ))}
          </div>

          {/* Active step detail */}
          {sequenceSteps.map((s, i) => i === activeStep && (
            <Card key={s.key} className={`border ${s.bg}`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{s.num}. {s.label} — {s.subLabel}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm text-foreground leading-relaxed">{s.purpose}</p>
                <div className="grid grid-cols-2 gap-5">
                  {s.points.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Key Focus Areas</p>
                      <ul className="space-y-1.5">{s.points.map(p => <li key={p} className="text-xs text-foreground flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${s.color} flex-shrink-0`}></span>{p}</li>)}</ul>
                    </div>
                  )}
                  {s.avoid.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Avoid</p>
                      <ul className="space-y-1.5">{s.avoid.map(a => <li key={a} className="text-xs text-foreground flex items-center gap-2"><X className="w-3 h-3 text-red-500 flex-shrink-0" />{a}</li>)}</ul>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 mt-4">Instead</p>
                      <ul className="space-y-1.5">{s.instead.map(a => <li key={a} className="text-xs text-foreground flex items-center gap-2"><Check className="w-3 h-3 text-green-500 flex-shrink-0" />{a}</li>)}</ul>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Example</p>
                  {s.examples.map(e => <p key={e} className="text-xs text-foreground italic bg-white/70 rounded p-3 mb-1.5 leading-relaxed">"{e}"</p>)}
                </div>
                <div className={`${s.color} text-white rounded-md px-4 py-3`}>
                  <p className="text-[11px] font-bold uppercase tracking-wider opacity-70 mb-1">Rule</p>
                  <p className="text-xs font-semibold">{s.rule}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeSection === 'listen' && (
        <div>
          {/* LISTEN letters row */}
          <div className="flex gap-1.5 mb-8">
            {listenFramework.map((f, i) => (
              <button key={f.letter} onClick={() => setActiveListen(i)}
                className={cn('flex-1 py-4 rounded-lg border text-center transition-all', activeListen === i ? `${f.color} text-white border-transparent` : 'border-border hover:bg-muted')}>
                <p className="text-2xl font-black">{f.letter}</p>
                <p className="text-[11px] mt-1 opacity-80">{f.word.split(' ')[0]}</p>
              </button>
            ))}
          </div>

          {/* Active letter detail */}
          {listenFramework.map((f, i) => i === activeListen && (
            <Card key={f.letter} className="border-2" style={{ borderColor: `hsl(var(--border))` }}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl font-black shrink-0', f.color)}>{f.letter}</div>
                  <div>
                    <CardTitle className="text-base">{f.word}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.description}</p>
                  </div>
                  <f.icon className="w-6 h-6 ml-auto text-muted-foreground shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {f.points.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Key Points</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {f.points.map(p => <p key={p} className="text-xs text-foreground flex items-start gap-1.5"><span className={cn('w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0', f.color)}></span>{p}</p>)}
                    </div>
                  </div>
                )}
                {(f as any).subSections && (
                  <div className="grid grid-cols-3 gap-4">
                    {(f as any).subSections.map((ss: any) => (
                      <div key={ss.label} className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs font-bold text-muted-foreground mb-1.5">{ss.label}</p>
                        {ss.items.map((it: string) => <p key={it} className="text-xs text-foreground flex items-start gap-1">{it}</p>)}
                      </div>
                    ))}
                  </div>
                )}
                {(f as any).takeaways && (
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Take Away Examples</p>
                    {(f as any).takeaways.map((t: string) => <p key={t} className="text-xs italic text-foreground bg-muted/50 rounded px-3 py-1.5 mb-1.5">"{t}"</p>)}
                    <div className="flex gap-3 mt-3">
                      <div className="flex-1 bg-red-50 border border-red-200 rounded p-3">
                        <p className="text-xs font-bold text-red-600 mb-1">Customer Response</p>
                        <p className="text-xs italic text-foreground">{(f as any).customerResponse}</p>
                      </div>
                      <div className="flex-1 bg-green-50 border border-green-200 rounded p-3">
                        <p className="text-xs font-bold text-green-600 mb-1">Result</p>
                        <p className="text-xs text-foreground">{(f as any).note}</p>
                      </div>
                    </div>
                  </div>
                )}
                {(f as any).comparisons && (
                  <div className="space-y-3">
                    {(f as any).comparisons.map((c: any, ci: number) => (
                      <div key={ci} className="grid grid-cols-2 gap-3">
                        <div className="bg-red-50 border border-red-200 rounded p-3">
                          <p className="text-xs font-bold text-red-600 mb-1 flex items-center gap-1"><X className="w-3 h-3" /> Wrong</p>
                          <p className="text-xs italic text-foreground">{c.wrong}</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="text-xs font-bold text-green-600 mb-1 flex items-center gap-1"><Check className="w-3 h-3" /> Better</p>
                          <p className="text-xs italic text-foreground">{c.right}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {f.example && <div className="bg-primary/5 border border-primary/20 rounded p-3"><p className="text-xs font-bold text-primary mb-1">Example</p><p className="text-xs italic text-foreground">"{f.example}"</p></div>}
                {(f as any).note && !f.example && <p className="text-xs text-muted-foreground italic bg-muted/40 rounded p-3">{(f as any).note}</p>}
              </CardContent>
            </Card>
          ))}

          {/* BeeForce Example */}
          <Card className="mt-6 border-primary/20">
            <CardHeader className="pb-3"><CardTitle className="text-sm">BeeForce Discovery Example Using LISTEN</CardTitle></CardHeader>
            <CardContent>
              <div className="relative pl-4 border-l-2 border-primary space-y-3">
                {[
                  { label: 'Customer', text: '"Contractor attendance is becoming a nightmare."', style: 'text-foreground' },
                  { label: 'L →', text: 'Maintain attention and take notes.', style: 'text-primary' },
                  { label: 'I →', text: '"Can you help me understand what\'s making it difficult?"', style: 'text-primary' },
                  { label: 'Customer', text: 'Explains issues.', style: 'text-foreground' },
                  { label: 'S →', text: '"So attendance is captured in multiple formats, resulting in payroll disputes and delayed reporting. Correct?"', style: 'text-primary' },
                  { label: 'T →', text: '"Perhaps the impact isn\'t significant enough to justify a change?"', style: 'text-primary' },
                  { label: 'Customer', text: '"Actually, we\'re losing several lakhs every month."', style: 'text-red-600 font-semibold' },
                  { label: 'E →', text: '"That\'s interesting. Can you quantify the losses?"', style: 'text-primary' },
                  { label: 'N →', text: 'Avoid challenging their current approach. Instead: "Many enterprises faced similar challenges before implementing a centralized workforce platform."', style: 'text-primary' },
                ].map((row, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-[10px] font-bold text-muted-foreground w-16 flex-shrink-0 pt-0.5">{row.label}</span>
                    <p className={cn('text-xs', row.style)}>{row.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Golden Rule */}
          <Card className="mt-4 bg-foreground text-background border-0">
            <CardContent className="py-3 px-5">
              <p className="text-xs font-bold mb-1">Golden Rule</p>
              <p className="text-sm">Most salespeople listen to respond.</p>
              <p className="text-sm">Great salespeople listen to understand.</p>
              <p className="text-sm font-bold text-primary">Exceptional salespeople listen until the customer convinces themselves they need a solution.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
