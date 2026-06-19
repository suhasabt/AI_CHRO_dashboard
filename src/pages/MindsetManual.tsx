import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Search, Clock, Dumbbell, CalendarClock, RefreshCw, X } from 'lucide-react'

const myths = [
  {
    myth: 'I need to know everything about the product before I can sell it.',
    truth: 'You need to know enough to have a confident conversation. The rest will come from experience.',
    insight: 'Customers don\'t buy because you know 100% of the product specs. They buy because they trust you understand their problem. Go out, engage, learn on the job.',
    color: 'bg-red-500',
  },
  {
    myth: 'Sales is about convincing people to buy.',
    truth: 'Sales is about helping people make decisions they already want to make.',
    insight: 'Nobody likes being convinced. Everyone appreciates being guided. If the customer has a real problem and your product genuinely solves it — your job is facilitation, not persuasion.',
    color: 'bg-orange-500',
  },
  {
    myth: 'Rejection means I failed.',
    truth: 'Rejection is feedback. Most losses are data, not disasters.',
    insight: 'Ask yourself after every lost deal: What did I learn? What would I do differently? What did I miss? Salespeople who extract learning from loss move faster than those who avoid loss by avoiding action.',
    color: 'bg-amber-500',
  },
  {
    myth: 'The best salespeople are natural talkers.',
    truth: 'The best salespeople are exceptional listeners.',
    insight: 'Talking fills space. Listening reveals gold. Your ability to make a customer feel heard is more powerful than your ability to deliver a flawless pitch.',
    color: 'bg-green-500',
  },
  {
    myth: 'I should focus on the big deals to make my number.',
    truth: 'You should focus on the right deals — the ones that are real, qualified, and moving.',
    insight: 'A ₹5 Lakh deal that closes beats a ₹50 Lakh deal that stalls in committee for 9 months. Build a balanced pipeline: smaller, faster deals for momentum; larger deals for growth.',
    color: 'bg-primary',
  },
  {
    myth: 'The customer is always right.',
    truth: 'The customer is always important — but not always informed.',
    insight: 'Your job is to bring perspective, share best practices, and sometimes challenge the customer\'s assumptions — respectfully. That\'s not being difficult. That\'s being a trusted advisor.',
    color: 'bg-purple-500',
  },
]

const mindsetPillars = [
  {
    title: 'Curiosity Over Capability',
    description: 'Be more interested in the customer\'s world than in showcasing your product.',
    rule: 'The salesperson who asks the best questions gets the best outcomes.',
    icon: Search,
  },
  {
    title: 'Patience Over Pressure',
    description: 'Enterprise sales have long cycles. The right pace is the customer\'s pace.',
    rule: 'Rushing a deal rarely accelerates it. It often kills it.',
    icon: Clock,
  },
  {
    title: 'Confidence Over Desperation',
    description: 'You are not selling to survive. You are helping an enterprise solve a real problem.',
    rule: 'Confidence is not arrogance. It\'s certainty that your product deserves to be in the conversation.',
    icon: Dumbbell,
  },
  {
    title: 'Discipline Over Motivation',
    description: 'Motivation fluctuates. Discipline is the system that keeps you moving.',
    rule: 'The most successful salespeople don\'t wait to feel like prospecting. They build it into their routine.',
    icon: CalendarClock,
  },
  {
    title: 'Process Over Gut Feel',
    description: 'Your instincts develop over time. Until then, trust the process.',
    rule: 'Gut feel without data is just guessing. Process with data is a repeatable system.',
    icon: RefreshCw,
  },
]

const failureLessons = [
  { label: 'Deal lost to competitor', question: 'Did I differentiate enough? Did I understand their evaluation criteria?', action: 'Build a stronger differentiation story for the next similar account.' },
  { label: 'Deal went dark after a great demo', question: 'Was there a real champion? Was there real urgency? Was there budget?', action: 'Qualify more deeply before investing in demos.' },
  { label: 'Proposal rejected due to price', question: 'Did I build value before presenting price? Was ROI clearly articulated?', action: 'Present a business case before a price page.' },
  { label: 'Lost to "no decision"', question: 'Was there real pain? Was there a compelling event? Did I create urgency?', action: 'Qualify the "why now" before spending 3 months on a deal.' },
  { label: 'Stakeholder came in late and killed the deal', question: 'Did I map all stakeholders early? Was there a procurement surprise?', action: 'Always ask: "Who else needs to be involved before a decision is made?"' },
]

export default function MindsetManual() {
  const [activeTab, setActiveTab] = useState<'myths' | 'pillars' | 'failure'>('myths')
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">Mindset Manual</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          The difference between a good month and a great career is not skill — it's mindset.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-8 bg-muted rounded-lg p-1 w-fit">
        {[{ id: 'myths', label: '6 Myths vs Truths' }, { id: 'pillars', label: '5 Mindset Pillars' }, { id: 'failure', label: 'Learning from Failure' }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)}
            className={cn('px-4 py-2 rounded-md text-xs font-semibold transition-all', activeTab === t.id ? 'bg-white shadow text-foreground' : 'text-muted-foreground')}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'myths' && (
        <div>
          <p className="text-xs text-muted-foreground mb-5">Click a card to reveal the truth →</p>
          <div className="grid grid-cols-2 gap-5">
            {myths.map((m, i) => (
              <div key={i} className="cursor-pointer" onClick={() => setFlipped(flipped === i ? null : i)}>
                {flipped !== i ? (
                  <Card className="border-2 border-red-200 hover:border-red-300 transition-all h-full">
                    <CardContent className="py-5 px-5">
                      <div className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 text-red-500" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-1.5">Myth #{i+1}</p>
                          <p className="text-sm font-medium text-foreground leading-snug">"{m.myth}"</p>
                          <p className="text-[11px] text-muted-foreground mt-2.5">Click to reveal the truth</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className={`border-2 border-transparent text-white h-full ${m.color}`}>
                    <CardContent className="py-5 px-5">
                      <p className="text-[11px] font-bold uppercase tracking-wider opacity-70 mb-1.5">Truth #{i+1}</p>
                      <p className="text-sm font-bold mb-2 leading-snug">{m.truth}</p>
                      <p className="text-xs opacity-90 leading-relaxed">{m.insight}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 bg-foreground text-background rounded-lg">
            <p className="text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">Remember</p>
            <p className="text-sm leading-relaxed">The customer buys when they trust you understand their problem — not when you know 100% of the product specs.</p>
          </div>
        </div>
      )}

      {activeTab === 'pillars' && (
        <div className="space-y-3">
          {mindsetPillars.map((p, i) => {
            const Icon = p.icon
            return (
              <Card key={i} className="border">
                <CardContent className="py-4 px-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-1">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{p.description}</p>
                      <div className="bg-primary/5 border border-primary/20 rounded px-3 py-2">
                        <p className="text-xs text-primary font-medium">{p.rule}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{i+1}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          <Card className="bg-foreground text-background border-0 mt-5">
            <CardContent className="py-5 px-6">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">Core Principle</p>
              <p className="text-sm leading-relaxed">Motivation fluctuates. Discipline is the system that keeps you moving when motivation disappears.</p>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'failure' && (
        <div>
          <div className="mb-5 p-5 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1.5">Principle</p>
            <p className="text-sm font-semibold text-foreground leading-snug">Rejection is feedback. Most losses are data, not disasters.</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Ask yourself after every lost deal: What did I learn? What would I do differently? What did I miss?</p>
          </div>
          <div className="space-y-3">
            {failureLessons.map((f, i) => (
              <Card key={i} className="border">
                <CardContent className="py-4 px-5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-500 text-[11px] font-bold">{i+1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-foreground mb-2">{f.label}</p>
                      <div className="grid grid-cols-2 gap-3 mt-1">
                        <div className="bg-amber-50 rounded p-3">
                          <p className="text-[11px] font-bold text-amber-600 mb-1">Question to Ask</p>
                          <p className="text-xs text-foreground leading-relaxed">{f.question}</p>
                        </div>
                        <div className="bg-green-50 rounded p-3">
                          <p className="text-[11px] font-bold text-green-600 mb-1">Action</p>
                          <p className="text-xs text-foreground leading-relaxed">{f.action}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-5 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-xs text-primary font-semibold leading-relaxed">Salespeople who extract learning from loss move faster than those who avoid loss by avoiding action.</p>
          </div>
        </div>
      )}
    </div>
  )
}
