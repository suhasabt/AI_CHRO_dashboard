import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Coins, Swords, Clock3, Users, Handshake, Wrench, ChevronUp, ChevronDown } from 'lucide-react'

const objections = [
  {
    category: 'Price',
    tag: Coins,
    items: [
      {
        objection: '"It\'s too expensive."',
        type: 'Price',
        acknowledge: '"I appreciate you sharing that. Cost is an important factor."',
        bridge: '"Before we talk about the number, may I ask — what\'s the cost of not solving this problem?"',
        pivot: '"If we could show you that the system saves [₹X] annually in payroll errors and compliance risk, would the investment be worth discussing?"',
        close: '"Let\'s put together a business case so you can see the total value — not just the price."',
      },
      {
        objection: '"We don\'t have budget this year."',
        type: 'Price',
        acknowledge: '"That\'s very common at this stage of the year."',
        bridge: '"Out of curiosity — if budget wasn\'t a constraint, would this be a priority?"',
        pivot: '"We\'ve helped customers build business cases to get budget approved mid-year. Would that be a useful exercise?"',
        close: '"Would it make sense to align on the solution now, so when budget opens up, you\'re first in line?"',
      },
    ],
  },
  {
    category: 'Competition',
    tag: Swords,
    items: [
      {
        objection: '"We\'re also looking at [Competitor]."',
        type: 'Competition',
        acknowledge: '"That\'s a sensible approach. You should evaluate your options carefully."',
        bridge: '"Out of curiosity, what are the two or three things that matter most in your evaluation?"',
        pivot: '"That\'s helpful. For the areas you mentioned, here\'s how we specifically address them — and where we have a distinct advantage in enterprises with large contract workforces."',
        close: '"After evaluating both, would you be open to a structured comparison? I\'d be happy to provide a side-by-side."',
      },
      {
        objection: '"We\'ve been using [Competitor] for years."',
        type: 'Competition',
        acknowledge: '"Loyalty to a vendor makes sense if they\'re delivering value."',
        bridge: '"What\'s one thing you wish the current system did better?"',
        pivot: '"That\'s something we\'ve specifically addressed. Would it be worth a 30-minute session to explore how we handle that?"',
        close: '"I\'m not asking you to switch today. I\'m asking you to stay informed about what\'s available."',
      },
    ],
  },
  {
    category: 'Timing',
    tag: Clock3,
    items: [
      {
        objection: '"This isn\'t the right time."',
        type: 'Timing',
        acknowledge: '"I hear you. Timing is everything."',
        bridge: '"Can I ask — what would make this a priority? What needs to happen first?"',
        pivot: '"Many of our customers said the same thing. The ones who moved forward did so because a trigger event made the cost of waiting too high."',
        close: '"What\'s your trigger event? And how do we make sure you\'re prepared when it happens?"',
      },
      {
        objection: '"We\'re too busy right now."',
        type: 'Timing',
        acknowledge: '"Completely understood — enterprise environments are always busy."',
        bridge: '"How long has the problem we discussed been present? And has it been growing?"',
        pivot: '"The reason I ask is that most of our customers found that the longer they waited, the more the problem compounded. Our implementation is designed to minimize disruption — we take on the heavy lifting."',
        close: '"Could we start with a low-commitment discovery workshop — 60 minutes — and go from there?"',
      },
    ],
  },
  {
    category: 'Stakeholders',
    tag: Users,
    items: [
      {
        objection: '"I need to involve more stakeholders."',
        type: 'Stakeholders',
        acknowledge: '"That makes complete sense for a decision of this scale."',
        bridge: '"Who are the key stakeholders? And what does each of them care about most?"',
        pivot: '"I\'d like to make it as easy as possible for them. I can prepare materials specific to each stakeholder\'s perspective — CHRO, CFO, IT, Operations."',
        close: '"Could we set up a 45-minute session where I present to the group directly? That way everyone hears the same message."',
      },
      {
        objection: '"The CEO / Board needs to approve this."',
        type: 'Stakeholders',
        acknowledge: '"Board-level visibility is expected for investments of this size."',
        bridge: '"What does the board typically need to see to approve a project like this?"',
        pivot: '"We have a board-level business case template we can adapt to your format. It covers ROI, risk, implementation plan, and vendor credentials."',
        close: '"Would you like me to support you in preparing that presentation?"',
      },
    ],
  },
  {
    category: 'Trust',
    tag: Handshake,
    items: [
      {
        objection: '"We\'ve never heard of BlueTree / BeeForce."',
        type: 'Trust',
        acknowledge: '"That\'s fair. We\'re selective about where we grow — enterprise workforce management is our focus."',
        bridge: '"What would give you confidence in a vendor you haven\'t worked with before?"',
        pivot: '"We currently manage [X] contract workers for enterprises in [industries]. I\'d like to introduce you to [Customer Name] — they were in a similar position 18 months ago. Would a reference call be useful?"',
        close: '"Our proposal to new clients is always: start small, prove the value, then scale."',
      },
    ],
  },
  {
    category: 'Product',
    tag: Wrench,
    items: [
      {
        objection: '"We\'re not sure your product will work for our use case."',
        type: 'Product',
        acknowledge: '"That\'s the right question to ask before committing."',
        bridge: '"Could you walk me through your specific use case in detail? I want to make sure I give you an accurate answer."',
        pivot: '"Based on what you\'ve described, here\'s how we\'ve handled something very similar: [example]. Let me show you in a live environment."',
        close: '"What if we ran a structured pilot with a subset of your data? That removes all uncertainty."',
      },
    ],
  },
]

const feelFeltFoundTemplate = {
  feel: 'I understand how you feel.',
  felt: 'Many of our customers felt the same way.',
  found: 'What they found, after working with us, was [outcome].',
  note: 'This is NOT manipulation. This is empathy + social proof. Use it authentically.',
}

export default function ObjectionHandling() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [expandedItem, setExpandedItem] = useState<number | null>(0)

  const cat = objections[activeCategory]

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">Objection Handling</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          An objection is not a rejection. It is a request for more information, more confidence, or more trust.
        </p>
      </div>

      {/* Framework Header */}
      <Card className="mb-8 bg-primary text-primary-foreground border-0">
        <CardContent className="py-4 px-6">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-3">The A-B-P-C Framework</p>
          <div className="flex items-center gap-4">
            {[['A', 'Acknowledge', 'Validate the concern'], ['B', 'Bridge', 'Transition with curiosity'], ['P', 'Pivot', 'Reframe with evidence'], ['C', 'Close', 'Advance the conversation']].map(([letter, word, desc], i, arr) => (
              <div key={letter} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-base">{letter}</div>
                  <p className="text-[10px] font-bold mt-1">{word}</p>
                  <p className="text-[10px] opacity-60">{desc}</p>
                </div>
                {i < arr.length - 1 && <span className="opacity-40">→</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {objections.map((o, i) => {
          const Tag = o.tag
          return (
            <button key={i} onClick={() => { setActiveCategory(i); setExpandedItem(0) }}
              className={cn('px-4 py-2 rounded-full border text-xs font-semibold transition-all flex items-center gap-1.5', activeCategory === i ? 'bg-primary text-primary-foreground border-transparent' : 'border-border hover:bg-muted')}>
              <Tag className="w-3.5 h-3.5" /> {o.category}
            </button>
          )
        })}
      </div>

      {/* Objections in active category */}
      <div className="space-y-3">
        {cat.items.map((item, i) => (
          <Card key={i} className="border">
            <div className="px-5 py-4 cursor-pointer flex items-center justify-between" onClick={() => setExpandedItem(expandedItem === i ? null : i)}>
              <div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{cat.category} Objection</p>
                <p className="text-sm font-semibold text-foreground">{item.objection}</p>
              </div>
              {expandedItem === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
            {expandedItem === i && (
              <div className="border-t px-5 pb-5 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'A — Acknowledge', val: item.acknowledge, color: 'bg-blue-50 border-blue-200', tc: 'text-blue-700' },
                    { label: 'B — Bridge', val: item.bridge, color: 'bg-amber-50 border-amber-200', tc: 'text-amber-700' },
                    { label: 'P — Pivot', val: item.pivot, color: 'bg-green-50 border-green-200', tc: 'text-green-700' },
                    { label: 'C — Close', val: item.close, color: 'bg-primary/5 border-primary/20', tc: 'text-primary' },
                  ].map(step => (
                    <div key={step.label} className={`border rounded-lg p-4 ${step.color}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${step.tc}`}>{step.label}</p>
                      <p className="text-xs text-foreground italic leading-relaxed">{step.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Feel-Felt-Found */}
      <Card className="mt-8 border-amber-200">
        <CardHeader className="pb-3"><CardTitle className="text-sm">Feel–Felt–Found Universal Template</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {[['Feel', feelFeltFoundTemplate.feel, 'bg-blue-100 text-blue-700'], ['Felt', feelFeltFoundTemplate.felt, 'bg-amber-100 text-amber-700'], ['Found', feelFeltFoundTemplate.found, 'bg-green-100 text-green-700']].map(([word, text, cls]) => (
              <div key={word} className={`flex-1 rounded-lg p-4 ${cls}`}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1.5">{word}</p>
                <p className="text-xs font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">{feelFeltFoundTemplate.note}</p>
        </CardContent>
      </Card>
    </div>
  )
}
