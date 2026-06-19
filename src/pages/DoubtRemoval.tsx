import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { HelpCircle, Search, Building2, UserCircle2, AlertTriangle, Lightbulb, Target, CircleDot, CheckCircle2 } from 'lucide-react'

const doubtTypes = [
  {
    title: 'Doubt about the Problem',
    subtitle: '"Is this really a problem worth solving?"',
    signal: 'The customer doesn\'t fully acknowledge the pain or urgency.',
    approach: 'Use evidence and questions to help the customer self-discover the problem.',
    phrases: [
      'What happens if the attendance data errors continue?',
      'Have you estimated what delayed payroll processing costs monthly?',
      'We\'ve seen organizations with similar setups face [X consequence]. Is that something you\'re experiencing?',
    ],
    icon: HelpCircle,
    color: 'bg-red-500',
    bg: 'bg-red-50 border-red-200',
  },
  {
    title: 'Doubt about the Solution',
    subtitle: '"Can your product actually solve my problem?"',
    signal: 'The customer is unsure if BeeForce works for their specific situation.',
    approach: 'Use proof of concept, case studies, or a demonstration tailored to their exact scenario.',
    phrases: [
      'Would it help if we ran a short pilot with 200 of your contract workers to validate the outcome before full deployment?',
      'I\'d like to show you how we handled a similar situation for [Company Name]. May I walk you through that?',
      'Let me configure a live demonstration using your actual workflow — not a generic demo.',
    ],
    icon: Search,
    color: 'bg-amber-500',
    bg: 'bg-amber-50 border-amber-200',
  },
  {
    title: 'Doubt about the Company',
    subtitle: '"Can BlueTree / BeeForce be trusted as a long-term partner?"',
    signal: 'Questions about team size, stability, or commitment to the product.',
    approach: 'Address credibility proactively. Don\'t wait for the question.',
    phrases: [
      'We currently manage [X contract workers] across enterprises in [industries]. Our team has been dedicated to workforce management for [Y years].',
      'I\'d like you to meet our implementation and success team — they\'ll be your partners for the next 3–5 years.',
      'Here\'s a reference from [Client Name] who went through a similar evaluation. Would a conversation with them be helpful?',
    ],
    icon: Building2,
    color: 'bg-orange-500',
    bg: 'bg-orange-50 border-orange-200',
  },
  {
    title: 'Doubt about Themselves',
    subtitle: '"Can we actually do this? Is this the right time?"',
    signal: 'The customer has concerns about internal bandwidth, change management, or adoption.',
    approach: 'Minimize perceived risk. Offer structured rollouts, training, and success planning.',
    phrases: [
      '"Our implementation team will manage the heavy lifting. Your HR team\'s time commitment is approximately [X hours] in the first 30 days."',
      '"We\'ve helped organizations of similar complexity go live in [timeframe]. Here\'s how we\'d approach yours."',
      '"We build a joint success plan before the contract is signed. You\'ll know exactly what to expect at every stage."',
    ],
    icon: UserCircle2,
    color: 'bg-purple-500',
    bg: 'bg-purple-50 border-purple-200',
  },
]

const salesPrinciple = [
  { num: 1, rule: 'Never assume a deal is progressing just because the customer isn\'t saying no.', icon: AlertTriangle },
  { num: 2, rule: 'Silence is not agreement. Questions are not objections. They are buying signals.', icon: Lightbulb },
  { num: 3, rule: 'The customer who asks the most questions is often the most interested.', icon: Target },
  { num: 4, rule: 'Doubt left unaddressed becomes the reason for a "no decision."', icon: CircleDot },
  { num: 5, rule: 'Your job is not to remove all doubt — it\'s to lower risk enough that the customer feels confident moving forward.', icon: CheckCircle2 },
]

const doubtMatrix = [
  { doubt: 'I need to think about it.', underlying: 'Doubt about value or urgency.', response: '"Absolutely. As you\'re thinking, could you share what specifically you\'d want more clarity on?"' },
  { doubt: 'We\'ll come back to this next quarter.', underlying: 'Doubt about timing or priority.', response: '"I understand. What would need to be true for this to be a priority now?"' },
  { doubt: 'It\'s a bit expensive.', underlying: 'Doubt about ROI or budget allocation.', response: '"That\'s a fair point. Could we look at the cost of not solving this problem?"' },
  { doubt: 'We need to check with IT / Finance / Legal.', underlying: 'Doubt about internal alignment.', response: '"Who should I speak with to make that easy for them? I\'d like to provide them with the right information."' },
  { doubt: 'We tried something similar before and it didn\'t work.', underlying: 'Doubt about the solution or vendor.', response: '"That\'s really important context. Can you tell me more about what happened? I want to make sure we don\'t repeat that experience."' },
]

export default function DoubtRemoval() {
  const [activeType, setActiveType] = useState(0)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">Doubt Removal</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Every customer who doesn't buy has unanswered questions. A deal is rarely lost to competition. It's lost to unresolved doubt.
        </p>
      </div>

      {/* 4 Types of Doubt */}
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">The 4 Types of Customer Doubt</p>
      <div className="flex gap-2.5 mb-6">
        {doubtTypes.map((d, i) => {
          const Icon = d.icon
          return (
            <button key={i} onClick={() => setActiveType(i)}
              className={cn('flex-1 py-4 rounded-lg border text-center transition-all text-left px-4', activeType === i ? `${d.color} text-white border-transparent` : `border-border hover:bg-muted ${d.bg}`)}>
              <Icon className="w-5 h-5" />
              <p className="text-xs font-bold mt-2">Doubt #{i+1}</p>
              <p className="text-[11px] leading-snug mt-0.5 opacity-80">{d.title.replace('Doubt about ', '')}</p>
            </button>
          )
        })}
      </div>

      {/* Active type detail */}
      {(() => { const d = doubtTypes[activeType]; const Icon = d.icon; return (
        <Card className={`border-2 ${d.bg} mb-8`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon className="w-4 h-4" /> {d.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{d.subtitle}</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Signal (How to Recognize It)</p>
                <p className="text-xs text-foreground bg-white/70 rounded p-3 leading-relaxed">{d.signal}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Approach</p>
                <p className="text-xs text-foreground bg-white/70 rounded p-3 leading-relaxed">{d.approach}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">What to Say</p>
              <div className="space-y-2.5">
                {d.phrases.map((ph, pi) => (
                  <div key={pi} className="flex items-start gap-3 bg-white/70 rounded p-3">
                    <span className={cn('w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5', d.color)}>{pi+1}</span>
                    <p className="text-xs text-foreground italic leading-relaxed">"{ph}"</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )})()}

      {/* Doubt→Response Matrix */}
      <div className="mb-8">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Doubt → Response Matrix</p>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-muted">
                <th className="text-left px-4 py-3 font-bold text-[11px] uppercase tracking-wider w-[28%]">Customer Says</th>
                <th className="text-left px-4 py-3 font-bold text-[11px] uppercase tracking-wider w-[22%]">Underlying Doubt</th>
                <th className="text-left px-4 py-3 font-bold text-[11px] uppercase tracking-wider">Your Response</th>
              </tr>
            </thead>
            <tbody>
              {doubtMatrix.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                  <td className="px-4 py-3 font-medium italic">"{row.doubt}"</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.underlying}</td>
                  <td className="px-4 py-3 italic text-primary">{row.response}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5-Point Sales Principle */}
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">The 5-Point Sales Principle on Doubt</p>
        <div className="space-y-2.5">
          {salesPrinciple.map(p => {
            const Icon = p.icon
            return (
              <div key={p.num} className="flex items-start gap-4 p-4 border rounded-lg">
                <Icon className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                <div className="flex items-start gap-3 flex-1">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{p.num}</span>
                  <p className="text-xs text-foreground leading-relaxed">{p.rule}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
