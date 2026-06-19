import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { User, Building2, Search, HelpCircle, Mic, BarChart3, Shield, CheckCircle2, Brain, Check } from 'lucide-react'

const prepSteps = [
  {
    num: 1, title: 'Know Who You\'re Meeting',
    description: 'Before every meeting, understand the person in the room.',
    items: [
      'Full name and title',
      'LinkedIn profile — tenure, background, previous companies',
      'Their stated priorities and areas of focus',
      'How long they\'ve been in this role',
      'Who they report to and who reports to them',
      'Any public content they\'ve shared — posts, interviews, articles',
    ],
    question: 'Who is this person and what matters to them professionally?',
    icon: User,
    color: 'bg-blue-500',
    bg: 'bg-blue-50 border-blue-200',
  },
  {
    num: 2, title: 'Know the Company',
    description: 'Don\'t just sell — understand the business you\'re selling into.',
    items: [
      'Industry, revenue scale, and headcount',
      'Contract workforce size and locations',
      'Recent news — funding, acquisitions, expansions, leadership changes',
      'Known challenges in their industry relevant to workforce management',
      'Current tools and vendors (if discoverable)',
      'Their fiscal year and budget cycle',
    ],
    question: 'What\'s happening in their business that makes this conversation relevant now?',
    icon: Building2,
    color: 'bg-green-500',
    bg: 'bg-green-50 border-green-200',
  },
  {
    num: 3, title: 'Know the Problem You\'re Solving',
    description: 'Clarity of problem = clarity of conversation.',
    items: [
      'What is their most likely pain point based on their industry and size?',
      'What is the cost of that pain (financial, operational, compliance)?',
      'How does BeeForce specifically address it?',
      'What outcome can they realistically expect, and in what timeframe?',
    ],
    question: 'If I could solve one thing for this customer today, what would it be?',
    icon: Search,
    color: 'bg-amber-500',
    bg: 'bg-amber-50 border-amber-200',
  },
  {
    num: 4, title: 'Prepare Your Questions',
    description: 'Your questions define the quality of the meeting. Prepare at least 5 discovery questions before you walk in.',
    categories: [
      { cat: 'Situation Questions', items: ['How are you currently managing your contract workforce?', 'How many contractors do you have across how many locations?'] },
      { cat: 'Problem Questions', items: ['What are the biggest pain points in your current setup?', 'Where are the most frequent breakdowns?'] },
      { cat: 'Impact Questions', items: ['What does a payroll error cost you — financially and in terms of time?', 'What happens if this problem continues for the next 12 months?'] },
      { cat: 'Goal Questions', items: ['What would an ideal contractor management ecosystem look like for you?', 'What does success look like in 6 months?'] },
    ],
    question: 'What do I need to learn in this meeting to move the deal forward?',
    icon: HelpCircle,
    color: 'bg-purple-500',
    bg: 'bg-purple-50 border-purple-200',
  },
  {
    num: 5, title: 'Know Your Opening',
    description: 'The first 60 seconds of any meeting set the tone. Don\'t wing it.',
    template: '"Thank you for making time today, [Name]. I\'ve done some research on [Company] and I know that managing a contractor workforce of your scale comes with significant complexity — [specific reference]. My goal today is not to pitch, but to understand your current setup, your challenges, and whether there\'s a genuine fit. Is it okay if I ask a few questions first?"',
    note: 'This frame signals respect, preparation, and curiosity — the three things that build credibility instantly.',
    icon: Mic,
    color: 'bg-primary',
    bg: 'bg-blue-50 border-primary/30',
  },
  {
    num: 6, title: 'Know the Deal Stage',
    description: 'Every meeting should advance the deal to a defined next stage.',
    stages: [
      { stage: 'First Meeting', nextStep: 'Discovery Workshop or Demo', goal: 'Qualify: Problem + Urgency + Authority' },
      { stage: 'Discovery', nextStep: 'Business Case or Proposal', goal: 'Map stakeholders, quantify pain, confirm decision process' },
      { stage: 'Demo/Presentation', nextStep: 'Commercial Discussion or Pilot', goal: 'Confirm fit, surface objections, identify champion' },
      { stage: 'Proposal Sent', nextStep: 'Approval or Final Meeting', goal: 'Understand internal process, maintain momentum' },
      { stage: 'Final Negotiation', nextStep: 'Signed Agreement', goal: 'Protect value, confirm start date, get commitment' },
    ],
    question: 'What is the purpose of this meeting, and what defines success?',
    icon: BarChart3,
    color: 'bg-orange-500',
    bg: 'bg-orange-50 border-orange-200',
  },
  {
    num: 7, title: 'Prepare for Likely Objections',
    description: 'Don\'t be surprised by objections. Anticipate them. For this specific call, what are the top 3 objections this customer is likely to raise?',
    examples: [
      '"We have budget constraints."',
      '"We\'re happy with our current solution."',
      '"We need to involve more stakeholders."',
      '"Now isn\'t the right time."',
    ],
    note: 'Have a response ready for each. The A-B-P-C framework applies here.',
    icon: Shield,
    color: 'bg-red-500',
    bg: 'bg-red-50 border-red-200',
  },
  {
    num: 8, title: 'Confirm Logistics',
    description: 'Simple details matter.',
    items: [
      'Confirm the meeting time and date 24 hours in advance',
      'Confirm who will be in the meeting (new stakeholders?)',
      'Test your video/audio if it\'s virtual',
      'Have the company\'s website, LinkedIn, and your notes open and ready',
      'Know the agenda — and share it in advance if appropriate',
      'Have a printed one-pager or reference case ready if in-person',
    ],
    question: 'Is everything set for this to be a professional, frictionless experience?',
    icon: CheckCircle2,
    color: 'bg-green-600',
    bg: 'bg-green-50 border-green-200',
  },
  {
    num: 9, title: 'Set Your Intention',
    description: 'Before you walk into any meeting, set a clear mental intention.',
    affirmations: [
      'I am here to help this customer solve a real problem.',
      'My job today is to listen more than I speak.',
      'I will ask questions, not make presentations.',
      'If there is a fit, I will earn the right to move forward.',
      'If there isn\'t, I will find out today — not in six months.',
    ],
    note: 'The best salespeople walk in calm, curious, and confident — not nervous, pitchy, or desperate.',
    icon: Brain,
    color: 'bg-indigo-500',
    bg: 'bg-indigo-50 border-indigo-200',
  },
]

export default function PreCallPrep() {
  const [activeStep, setActiveStep] = useState(0)
  const [checklist, setChecklist] = useState<boolean[]>(new Array(9).fill(false))

  const toggle = (i: number) => setChecklist(c => c.map((v, idx) => idx === i ? !v : v))
  const completed = checklist.filter(Boolean).length

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">Pre-Call Preparation</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          The meeting is won or lost before you walk in the room. Elite salespeople prepare differently — they prepare for the customer, not for themselves.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs font-bold text-foreground">Pre-Call Checklist Progress</p>
          <p className="text-xs font-bold text-primary">{completed} / 9 steps prepared</p>
        </div>
        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(completed/9)*100}%` }}></div>
        </div>
      </div>

      {/* Step grid */}
      <div className="grid grid-cols-9 gap-1.5 mb-6">
        {prepSteps.map((s, i) => {
          const Icon = s.icon
          return (
            <button key={i} onClick={() => setActiveStep(i)}
              className={cn('rounded-lg border py-3 text-center transition-all relative', activeStep === i ? `${s.color} text-white border-transparent` : checklist[i] ? 'bg-green-100 border-green-300' : 'border-border hover:bg-muted')}>
              {checklist[i] && activeStep !== i && <Check className="absolute top-1 right-1 w-2.5 h-2.5 text-green-600" />}
              <Icon className="w-4 h-4 mx-auto" />
              <p className="text-[10px] font-bold mt-1">{i+1}</p>
            </button>
          )
        })}
      </div>

      {/* Active step detail */}
      {(() => { const s = prepSteps[activeStep]; const Icon = s.icon; return (
        <Card className={`border-2 ${s.bg}`}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base flex items-center gap-2"><Icon className="w-4 h-4" />Step {s.num}: {s.title}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
              </div>
              <button onClick={() => toggle(activeStep)}
                className={cn('px-4 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1 shrink-0', checklist[activeStep] ? 'bg-green-500 text-white border-transparent' : 'border-border hover:bg-muted')}>
                {checklist[activeStep] ? <><Check className="w-3 h-3" /> Done</> : 'Mark Done'}
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {s.items && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Checklist Items</p>
                <ul className="space-y-1.5">{s.items.map((item, i) => <li key={i} className="text-xs text-foreground flex items-start gap-2"><span className={cn('w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5', s.color)}>{i+1}</span>{item}</li>)}</ul>
              </div>
            )}
            {s.categories && (
              <div className="grid grid-cols-2 gap-4">
                {s.categories.map(cat => (
                  <div key={cat.cat} className="bg-white/70 rounded-lg p-3">
                    <p className="text-xs font-bold text-muted-foreground mb-1.5">{cat.cat}</p>
                    {cat.items.map(it => <p key={it} className="text-xs text-foreground flex items-start gap-1.5"><span className="text-primary mt-0.5">›</span>{it}</p>)}
                  </div>
                ))}
              </div>
            )}
            {s.stages && (
              <div className="rounded-lg overflow-hidden border">
                <table className="w-full text-xs">
                  <thead><tr className="bg-muted"><th className="text-left px-3 py-2 font-bold text-[10px] uppercase tracking-wider">Stage</th><th className="text-left px-3 py-2 font-bold text-[10px] uppercase tracking-wider">Next Step</th><th className="text-left px-3 py-2 font-bold text-[10px] uppercase tracking-wider">Goal</th></tr></thead>
                  <tbody>{s.stages.map((row, i) => <tr key={i} className={i%2===0?'bg-white':'bg-muted/30'}><td className="px-3 py-2 font-medium">{row.stage}</td><td className="px-3 py-2 text-primary">{row.nextStep}</td><td className="px-3 py-2 text-muted-foreground">{row.goal}</td></tr>)}</tbody>
                </table>
              </div>
            )}
            {s.template && (
              <div className="bg-primary/5 border border-primary/20 rounded p-4">
                <p className="text-xs font-bold text-primary mb-1.5">Opening Template</p>
                <p className="text-xs italic text-foreground leading-relaxed">{s.template}</p>
              </div>
            )}
            {s.examples && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Common Objections to Anticipate</p>
                {s.examples.map(ex => <p key={ex} className="text-xs italic text-foreground bg-red-50 rounded px-3 py-2 mb-1.5">{ex}</p>)}
              </div>
            )}
            {s.affirmations && (
              <div className="space-y-1.5">
                {s.affirmations.map(a => <p key={a} className="text-xs text-foreground flex items-start gap-2"><span className={cn('w-4 h-4 rounded-full text-white flex items-center justify-center flex-shrink-0 mt-0.5', s.color)}><Check className="w-2.5 h-2.5" /></span>{a}</p>)}
              </div>
            )}
            {s.question && (
              <div className={cn('rounded-lg px-4 py-3 text-white', s.color)}>
                <p className="text-[11px] font-bold uppercase tracking-wider opacity-70 mb-1">Key Question</p>
                <p className="text-xs font-semibold">{s.question}</p>
              </div>
            )}
            {s.note && <p className="text-xs text-muted-foreground italic bg-white/70 rounded p-3 leading-relaxed">{s.note}</p>}
          </CardContent>
        </Card>
      )})()}
    </div>
  )
}
