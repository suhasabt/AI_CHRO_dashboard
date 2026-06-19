import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { DollarSign, DoorOpen, Anchor, RefreshCw, Target, VolumeX, Eye, Handshake, Shield, CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react'

const principles = [
  {
    num: 1, title: 'Never Negotiate on Price Alone',
    detail: 'Price is just one variable in a commercial conversation. Before you discuss numbers, define the full value of the deal: scope, timeline, SLAs, payment terms, usage rights, training, dedicated support, implementation services, multi-year commitment.',
    rule: 'If you find yourself in a price-only negotiation, you haven\'t done enough value selling upstream.',
    icon: DollarSign,
  },
  {
    num: 2, title: 'Know Your Walk-Away Point Before the Meeting',
    detail: 'Define three numbers before any commercial discussion: Ideal price (what you want), Acceptable price (what works commercially), Walk-away point (below this, the deal doesn\'t make sense). Knowing your walk-away in advance prevents panic discounting under pressure.',
    rule: 'Never decide your floor in the room. Decide it before you walk in.',
    icon: DoorOpen,
  },
  {
    num: 3, title: 'Anchor High, Adjust Deliberately',
    detail: 'The first number in a negotiation sets the psychological anchor. Whoever names the number first controls the frame. Put your best value on the table first. Adjust only with a reason and in exchange for something.',
    rule: 'Give nothing away for free. Every concession must come with a condition.',
    icon: Anchor,
  },
  {
    num: 4, title: 'Trade, Never Give',
    detail: 'Every concession must be tied to a condition. "If you can commit to a 3-year agreement, we can offer X." "If we move to a phased payment structure, we can discuss Y." Never give a discount without getting something in return — commitment, scope reduction, reference rights, case study, faster decision.',
    rule: 'If you give freely, you train the customer to ask for more.',
    icon: RefreshCw,
  },
  {
    num: 5, title: 'Understand Their Pressure, Not Just Yours',
    detail: 'Most procurement teams have quarter-end targets. Finance teams have budget cycles. CHROs have board commitments. Before you negotiate, understand what\'s driving their deadline. Their pressure = your leverage. Their timeline = your urgency tool.',
    rule: '"What does getting this resolved before [date] mean for you?"',
    icon: Target,
  },
  {
    num: 6, title: 'Silence Is a Negotiation Tool',
    detail: 'After you present a number or make a counter, stop talking. Most salespeople fill silence with unnecessary concessions. Let the customer respond. Silence signals confidence. The first person to speak after a price is named usually gives something away.',
    rule: 'Present. Pause. Wait.',
    icon: VolumeX,
  },
  {
    num: 7, title: 'Use Flinching Strategically',
    detail: 'The flinch is a non-verbal reaction to a number that seems too high or too low. It signals surprise without commitment. When the customer names a price that\'s below your floor: "Oh — that\'s quite a bit lower than where we are. Help me understand how you arrived at that number."',
    rule: 'Flinching doesn\'t commit you to anything. It slows the conversation down.',
    icon: Eye,
  },
  {
    num: 8, title: 'The "If I Can, Will You" Close',
    detail: 'Before making any concession, test if it will close the deal. "If I can get approval to [offer X], would you be able to commit today / this week / before the quarter ends?" This prevents you from giving away value on a deal that still won\'t close.',
    rule: '"If I can, will you?"',
    icon: Handshake,
  },
  {
    num: 9, title: 'Protect Your Champion',
    detail: 'Your internal champion has put their credibility on the line to bring you in. Never put them in a position where they look bad internally. Ask: "What do you need me to do to make this easy for you to get approved?" Give them the tools to sell internally — business case, reference data, ROI model, risk mitigation plan.',
    rule: 'Your champion\'s success = your deal\'s success.',
    icon: Shield,
  },
  {
    num: 10, title: 'Close on Commitment, Not Just Agreement',
    detail: '"Sounds good" is not a close. A close is: a signed order form, a purchase order, a Letter of Intent (LOI), a verbal yes with a defined next step (email within 24 hours), a start date confirmed. Always exit a negotiation meeting with a mutual commitment — not just a handshake.',
    rule: '"What can we both agree to do by [date] to move this forward?"',
    icon: CheckCircle2,
  },
]

const phraseToolbox = [
  {
    category: 'Anchoring',
    phrases: [
      '"Our standard investment for an enterprise of your size is [₹X]."',
      '"Before we discuss adjustments, let me walk you through what\'s included."',
    ],
  },
  {
    category: 'Conditional Concessions',
    phrases: [
      '"If you can commit to a 3-year agreement, I\'m confident we can improve the commercial terms."',
      '"If you can include us as a reference customer, we can look at the onboarding fee."',
      '"If we can get this signed before [date], I can explore a pricing adjustment."',
    ],
  },
  {
    category: 'Flinch + Probe',
    phrases: [
      '"Oh — that\'s lower than I expected. Help me understand how you arrived at that number."',
      '"That\'s quite a gap from where we are. Can we explore why that number works for you?"',
    ],
  },
  {
    category: '"If I Can, Will You"',
    phrases: [
      '"If I can get approval to extend payment terms to 60 days, would you be able to sign by Friday?"',
      '"If I can add an additional day of training at no cost, would that give you enough to move forward?"',
    ],
  },
  {
    category: 'Protecting Value',
    phrases: [
      '"I\'d rather explore the scope than reduce the price — we\'ve built this model for a reason."',
      '"I want to make sure we don\'t compromise the implementation quality to hit a number."',
    ],
  },
  {
    category: 'Closing',
    phrases: [
      '"What would we both need to commit to today to move forward?"',
      '"Are we at the point where we can lock in the terms and move to paperwork?"',
      '"Let\'s confirm the start date and send over the order form today."',
    ],
  },
]

const scenarios = [
  {
    label: 'Procurement asks for 30% discount',
    response: '"I understand pricing is an important consideration. Before I go back to review options, can I ask — what is the outcome you\'re trying to achieve with a lower number? Is it within a specific budget, or are there other commercial factors I should know about?"',
    then: 'Find out the real constraint. Then use conditional concessions (trade, don\'t give).',
  },
  {
    label: 'Customer says: "Your competitor offered it cheaper."',
    response: '"That\'s useful information. Can I ask what\'s included in their offer? I want to make sure we\'re comparing apples to apples — scope, SLAs, implementation, support, and contractual commitments often differ significantly."',
    then: 'Show the full value comparison before adjusting your number.',
  },
  {
    label: 'Customer says: "Just give me your best price."',
    response: '"I want to make sure the best price also means the best value. Let me share what\'s included at this investment level — and then we can see if any adjustments make sense based on your priorities."',
    then: 'Anchor on value before naming a number.',
  },
  {
    label: 'Deal stalls after verbal agreement',
    response: '"I appreciate that things move slowly in large organizations. To help us both maintain momentum, can we agree on what the next internal step looks like and put a date against it?"',
    then: 'Get a commitment to a commitment.',
  },
]

export default function Negotiation() {
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null)
  const [activeScenario, setActiveScenario] = useState<number | null>(null)
  const [activePhrase, setActivePhrase] = useState(0)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">Negotiation Framework</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Negotiation is not a battle. It's a structured conversation between two parties who both want to reach an agreement.
          The goal is not to win — it's to close a deal that works for both sides while protecting the value of your solution.
        </p>
      </div>

      {/* 10 Principles Grid */}
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">10 Negotiation Principles</p>
      <div className="grid grid-cols-5 gap-2.5 mb-6">
        {principles.map(p => {
          const Icon = p.icon
          return (
            <button key={p.num} onClick={() => setActivePrinciple(activePrinciple === p.num ? null : p.num)}
              className={cn('rounded-lg border p-3 text-center transition-all', activePrinciple === p.num ? 'bg-primary text-primary-foreground border-transparent' : 'border-border hover:bg-muted')}>
              <Icon className="w-4.5 h-4.5 mx-auto" />
              <p className="text-[11px] font-bold mt-1.5">#{p.num}</p>
              <p className="text-[10px] leading-snug mt-0.5 opacity-80">{p.title.split(' ').slice(0, 3).join(' ')}</p>
            </button>
          )
        })}
      </div>

      {activePrinciple !== null && (() => { const p = principles.find(x => x.num === activePrinciple)!; const Icon = p.icon; return (
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Icon className="w-4 h-4" /> {p.num}. {p.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-foreground leading-relaxed">{p.detail}</p>
            <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-wider opacity-70 mb-1">Key Rule</p>
              <p className="text-xs font-semibold">{p.rule}</p>
            </div>
          </CardContent>
        </Card>
      )})()}

      {/* Phrase Toolbox */}
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Phrase Toolbox</p>
      <div className="flex gap-2 mb-4 flex-wrap">
        {phraseToolbox.map((ph, i) => (
          <button key={i} onClick={() => setActivePhrase(i)}
            className={cn('px-4 py-1.5 rounded-full border text-[11px] font-semibold transition-all', activePhrase === i ? 'bg-primary text-primary-foreground border-transparent' : 'border-border hover:bg-muted')}>
            {ph.category}
          </button>
        ))}
      </div>
      <Card className="mb-8 border">
        <CardContent className="py-4 px-5">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">{phraseToolbox[activePhrase].category}</p>
          {phraseToolbox[activePhrase].phrases.map((ph, i) => (
            <p key={i} className="text-xs text-foreground italic bg-muted/40 rounded px-4 py-2.5 mb-2 leading-relaxed">{ph}</p>
          ))}
        </CardContent>
      </Card>

      {/* Live Scenarios */}
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Live Scenarios</p>
      <div className="space-y-2.5">
        {scenarios.map((s, i) => (
          <Card key={i} className="border cursor-pointer" onClick={() => setActiveScenario(activeScenario === i ? null : i)}>
            <div className="px-5 py-3.5 flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground">{s.label}</p>
              {activeScenario === i ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
            </div>
            {activeScenario === i && (
              <div className="border-t px-5 pb-4 pt-3 space-y-2.5">
                <div className="bg-primary/5 border border-primary/20 rounded p-3">
                  <p className="text-[11px] font-bold text-primary mb-1">Response</p>
                  <p className="text-xs italic text-foreground leading-relaxed">{s.response}</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded p-3">
                  <p className="text-[11px] font-bold text-amber-700 mb-1">Then</p>
                  <p className="text-xs text-foreground leading-relaxed">{s.then}</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
