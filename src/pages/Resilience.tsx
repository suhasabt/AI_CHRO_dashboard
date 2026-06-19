import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Target, BarChart3, Zap, CalendarClock, ChevronUp, ChevronDown } from 'lucide-react'

const pillars = [
  {
    num: 1, title: 'Detach from the Outcome, Attach to the Process',
    content: 'You cannot control whether the customer says yes. You can control the quality of your discovery, the depth of your preparation, the relevance of your messaging, and the consistency of your follow-up. When you shift focus from "will I close this?" to "am I doing everything I should be doing?", the pressure reduces — and paradoxically, results improve.',
    practice: 'After each call or meeting, evaluate your process: Did I ask the right questions? Did I listen more than I spoke? Did I confirm the next step? Grade your process — not the outcome.',
    icon: Target, color: 'bg-blue-500', bg: 'bg-blue-50 border-blue-200',
  },
  {
    num: 2, title: 'Normalize the Rejection Cycle',
    content: 'Enterprise sales is a numbers game — but only at the top of the funnel. At the bottom, it\'s a quality game. You will face more no\'s than yes\'s. You will lose deals you should have won. You will have great meetings that lead nowhere. This is not failure. This is enterprise sales.',
    practice: 'Track your conversion ratios: calls to meetings, meetings to demos, demos to proposals, proposals to closes. This gives you data, not emotion.',
    facts: ['10 cold calls → 2 meaningful conversations', '5 meetings → 1 qualified opportunity', '3 opportunities → 1 closed deal'],
    icon: BarChart3, color: 'bg-amber-500', bg: 'bg-amber-50 border-amber-200',
  },
  {
    num: 3, title: 'Protect Your Energy, Not Just Your Time',
    content: 'Enterprise sales is mentally demanding. You are managing multiple stakeholders, navigating politics, handling objections, and absorbing rejection — all while projecting confidence. Your energy is your most valuable resource. Guard it aggressively.',
    practices: [
      'Start your day with 15 minutes of planning before you check messages.',
      'Prioritize your top 3 deal-moving activities before 10am.',
      'Batch your prospecting into dedicated time blocks.',
      'Decompress after difficult calls before jumping into the next one.',
      'Celebrate small wins publicly — it builds team energy and personal momentum.',
    ],
    icon: Zap, color: 'bg-green-500', bg: 'bg-green-50 border-green-200',
  },
  {
    num: 4, title: 'Operate with Consistent Daily Discipline',
    content: 'Resilience is not a feeling. It\'s a behavior. Resilient salespeople do the same things every day — whether it was a great week or a difficult one. The discipline of consistent action is what creates consistent results.',
    activities: [
      { label: 'Prospecting', target: '10–15 new contacts / week' },
      { label: 'Follow-ups', target: 'All open opportunities touched' },
      { label: 'Pipeline Review', target: '15 min every morning' },
      { label: 'Skill Practice', target: '1 new technique / week' },
      { label: 'Win/Loss Review', target: 'Every closed deal' },
    ],
    icon: CalendarClock, color: 'bg-purple-500', bg: 'bg-purple-50 border-purple-200',
  },
]

const rebuildMethods = [
  {
    title: 'The 24-Hour Rule',
    detail: 'Give yourself 24 hours to feel the disappointment. Then move forward. Enterprise sales losses sting. Let them. Process it. Then return to your pipeline and take one action.',
  },
  {
    title: 'The Win Journal',
    detail: 'Keep a running list of your wins — not just closed deals. Include: A customer who said your meeting was the best they\'d had. A referral you earned. A complex deal you progressed to the next stage. A great question you asked that changed the conversation direction. Read it when momentum dips.',
  },
  {
    title: 'The Loss Debrief',
    detail: 'Within 48 hours of a lost deal, answer: What was the real reason? What could I have done differently at each stage? What did I miss in qualification? What will I do differently next time? This converts loss to learning.',
  },
  {
    title: 'The Reset Call',
    detail: 'When you\'re in a slump, find an existing customer who loves the product. Call them — not to sell, just to hear how BeeForce has helped them. Reconnecting with real impact stories re-energizes your conviction.',
  },
  {
    title: 'The Momentum List',
    detail: 'Every Friday, write down: 3 things that moved forward this week. 1 thing I learned. 1 thing I\'ll do differently next week. This creates a narrative of progress even when the macro picture feels slow.',
  },
  {
    title: 'Peer Learning and Support',
    detail: 'Share your challenges with your team — not to complain, but to learn. Every team member has seen something you haven\'t. A weekly team debrief where losses are discussed without judgement creates a culture of learning.',
  },
]

const rolePlay = {
  lost: {
    situation: '"We\'ve decided to go with a competitor. Thank you for your time."',
    response1: '"Thank you for letting me know. May I ask one question — not to change your mind, but to learn? What was the deciding factor?"',
    response2: '"I completely respect that. Could I stay in touch? Enterprise needs evolve, and I\'d welcome the opportunity to reconnect in the future."',
    note: 'Every lost deal is a potential future deal. How you handle the loss determines whether the door stays open.',
  },
  slump: {
    situation: 'You\'ve had three consecutive weeks with no new meetings booked, two deals lost, and your pipeline looks thin.',
    steps: [
      'Don\'t panic. Audit your pipeline honestly.',
      'Identify your top 3 qualified opportunities and take one action on each today.',
      'Add 10 new prospects to your outreach list.',
      'Book a review with your manager — not to get rescued, but to get a second perspective on where to focus.',
      'Re-read your win journal.',
    ],
    reminder: 'Slumps are part of the cycle. Coming out of one requires disciplined action, not motivation.',
  },
}

export default function Resilience() {
  const [activePillar, setActivePillar] = useState(0)
  const [activeMethod, setActiveMethod] = useState<number | null>(null)
  const [activeRolePlay, setActiveRolePlay] = useState<'lost' | 'slump' | null>(null)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">Resilience in Sales</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          The most important skill in enterprise sales is not closing. It's coming back after a loss and doing the work again — with the same energy and belief.
        </p>
      </div>

      {/* 4 Pillars */}
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">4 Pillars of Sales Resilience</p>
      <div className="flex gap-2.5 mb-6">
        {pillars.map((p, i) => {
          const Icon = p.icon
          return (
            <button key={i} onClick={() => setActivePillar(i)}
              className={cn('flex-1 py-4 px-3 rounded-lg border text-center transition-all', activePillar === i ? `${p.color} text-white border-transparent` : `border-border hover:bg-muted ${p.bg}`)}>
              <Icon className="w-5 h-5 mx-auto" />
              <p className="text-[11px] font-bold mt-1.5">Pillar {p.num}</p>
              <p className="text-[10px] leading-snug mt-0.5 opacity-80">{p.title.split(',')[0]}</p>
            </button>
          )
        })}
      </div>

      {(() => { const p = pillars[activePillar]; const Icon = p.icon; return (
        <Card className={`mb-8 border-2 ${p.bg}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Icon className="w-4 h-4" />{p.num}. {p.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-foreground leading-relaxed">{p.content}</p>
            {p.practice && <div className="bg-white/70 rounded p-3"><p className="text-xs font-bold text-primary mb-1">Practice</p><p className="text-xs text-foreground leading-relaxed">{p.practice}</p></div>}
            {p.facts && (
              <div className="grid grid-cols-3 gap-3">
                {p.facts.map(f => <div key={f} className="bg-white/70 rounded p-3 text-center"><p className="text-xs font-semibold text-foreground">{f}</p></div>)}
              </div>
            )}
            {p.practices && (
              <ul className="space-y-1.5">{p.practices.map(pr => <li key={pr} className="text-xs text-foreground flex items-start gap-1.5"><span className="text-primary mt-0.5">›</span>{pr}</li>)}</ul>
            )}
            {p.activities && (
              <div className="rounded-lg overflow-hidden border">
                <table className="w-full text-xs">
                  <thead><tr className="bg-muted"><th className="text-left px-4 py-2 font-bold text-[10px] uppercase tracking-wider">Activity</th><th className="text-left px-4 py-2 font-bold text-[10px] uppercase tracking-wider">Target</th></tr></thead>
                  <tbody>{p.activities.map((a, i) => <tr key={i} className={i%2===0?'bg-white':'bg-muted/30'}><td className="px-4 py-2 font-medium">{a.label}</td><td className="px-4 py-2 text-muted-foreground">{a.target}</td></tr>)}</tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )})()}

      {/* 6 Rebuild Methods */}
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">6 Methods to Rebuild Momentum</p>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {rebuildMethods.map((m, i) => (
          <Card key={i} className="border cursor-pointer hover:border-primary/30 transition-all" onClick={() => setActiveMethod(activeMethod === i ? null : i)}>
            <CardContent className="py-3 px-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-foreground">{i+1}. {m.title}</p>
                {activeMethod === i ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
              </div>
              {activeMethod === i && <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed">{m.detail}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role Plays */}
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Resilience Role Plays</p>
      <div className="grid grid-cols-2 gap-4">
        {[{ id: 'lost', label: 'Handling a Lost Deal' }, { id: 'slump', label: 'Managing a Slump' }].map(rp => (
          <Card key={rp.id} className="border cursor-pointer hover:border-primary/30" onClick={() => setActiveRolePlay(activeRolePlay === rp.id as any ? null : rp.id as any)}>
            <CardContent className="py-4 px-5">
              <p className="text-xs font-bold text-foreground mb-1.5">{rp.label}</p>
              {activeRolePlay === rp.id && (
                <div className="space-y-2.5 mt-3">
                  {rp.id === 'lost' && (
                    <>
                      <div className="bg-muted/40 rounded p-3"><p className="text-[11px] font-bold mb-1">Situation</p><p className="text-xs italic leading-relaxed">{rolePlay.lost.situation}</p></div>
                      <div className="bg-primary/5 rounded p-3"><p className="text-[11px] font-bold text-primary mb-1">Response 1</p><p className="text-xs italic leading-relaxed">{rolePlay.lost.response1}</p></div>
                      <div className="bg-primary/5 rounded p-3"><p className="text-[11px] font-bold text-primary mb-1">Response 2</p><p className="text-xs italic leading-relaxed">{rolePlay.lost.response2}</p></div>
                      <p className="text-[11px] text-muted-foreground italic leading-relaxed">{rolePlay.lost.note}</p>
                    </>
                  )}
                  {rp.id === 'slump' && (
                    <>
                      <div className="bg-muted/40 rounded p-3"><p className="text-[11px] font-bold mb-1">Situation</p><p className="text-xs leading-relaxed">{rolePlay.slump.situation}</p></div>
                      <ul className="space-y-1.5">{rolePlay.slump.steps.map((s, i) => <li key={i} className="text-xs flex items-start gap-1.5"><span className="font-bold text-primary">{i+1}.</span>{s}</li>)}</ul>
                      <p className="text-[11px] text-muted-foreground italic leading-relaxed">{rolePlay.slump.reminder}</p>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
