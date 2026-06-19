import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  Brain, Target, Handshake, Search, Ear, Lightbulb, ClipboardList,
  ShieldCheck, Zap, Scale, Mail, Dumbbell, MessageCircle, ChevronLeft, ChevronRight,
} from 'lucide-react'

const modules = [
  { id: 'buying-motivations', label: '5 Buying Motivations', icon: Brain, desc: 'Necessity · Comfort · Emotion · Prestige · Mastery', color: 'bg-blue-50 border-blue-200 hover:border-blue-400', iconColor: 'text-blue-600' },
  { id: 'why-buy', label: 'WHY BUY? FROM ME? NOW?', icon: Target, desc: 'DO / HAVE / FEEL + 5 Case Studies + Feel-Felt-Found', color: 'bg-green-50 border-green-200 hover:border-green-400', iconColor: 'text-green-600' },
  { id: 'people-buy-believe', label: 'People Buy When They Believe', icon: Handshake, desc: 'Problem real · Safest choice · Delay is expensive', color: 'bg-purple-50 border-purple-200 hover:border-purple-400', iconColor: 'text-purple-600' },
  { id: 'self-discovery', label: 'Self-Discovery Framework', icon: Search, desc: '8-step guided discovery flow', color: 'bg-amber-50 border-amber-200 hover:border-amber-400', iconColor: 'text-amber-600' },
  { id: 'communication-listening', label: 'Communication & L.I.S.T.E.N', icon: Ear, desc: 'Ask → Listen → Summarize → Lead + LISTEN framework', color: 'bg-teal-50 border-teal-200 hover:border-teal-400', iconColor: 'text-teal-600' },
  { id: 'mindset-manual', label: 'Sales Mindset Manual', icon: Lightbulb, desc: '6 Myths vs Truths of enterprise selling', color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400', iconColor: 'text-indigo-600' },
  { id: 'pre-call-prep', label: 'Pre-Call Prep', icon: ClipboardList, desc: '9-step enterprise preparation checklist', color: 'bg-cyan-50 border-cyan-200 hover:border-cyan-400', iconColor: 'text-cyan-600' },
  { id: 'doubt-removal', label: "Don't Pitch. Remove Doubt.", icon: ShieldCheck, desc: '4-step doubt removal framework', color: 'bg-rose-50 border-rose-200 hover:border-rose-400', iconColor: 'text-rose-600' },
  { id: 'objection-handling', label: 'Objection Handling', icon: Zap, desc: '7-step framework + BeeForce-specific responses', color: 'bg-orange-50 border-orange-200 hover:border-orange-400', iconColor: 'text-orange-600' },
  { id: 'negotiation', label: 'Negotiation Framework', icon: Scale, desc: '10-point negotiation + phrase toolbox', color: 'bg-slate-50 border-slate-200 hover:border-slate-400', iconColor: 'text-slate-600' },
  { id: 'email-playbook', label: 'Email AI Prompt Playbook', icon: Mail, desc: '9 AI prompts for enterprise outreach', color: 'bg-pink-50 border-pink-200 hover:border-pink-400', iconColor: 'text-pink-600' },
  { id: 'resilience', label: 'Sales Resilience Playbook', icon: Dumbbell, desc: '4 pillars · 6 methods · Role-plays', color: 'bg-lime-50 border-lime-200 hover:border-lime-400', iconColor: 'text-lime-600' },
]

const principles = [
  'The goal of a sales call is not to impress the customer. It is to help them become confident enough to say yes.',
  'People don\'t buy BeeForce because you explained it well. They buy because they convinced themselves.',
  'Most deals are not lost to competitors. They are lost to inertia.',
  'The best enterprise salespeople spend 70% of the meeting on discovery and 30% on solutioning.',
  'Revenue is the outcome. Activity quality is the input.',
  'A lost deal without learning is a real loss. A lost deal with learning becomes sales intelligence.',
  'In enterprise sales, resilience is not motivation. It is a daily operating system.',
  'Big deals are not won in the call. They are won in the preparation before the call.',
]

const buyingJourney = [
  { label: 'Fear', sub: 'Necessity', color: 'bg-red-500' },
  { label: 'Efficiency', sub: 'Convenience', color: 'bg-amber-500' },
  { label: 'Strategy', sub: 'Prestige / Mastery', color: 'bg-primary' },
]

interface DashboardProps {
  onNavigate: (id: string) => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [principleIdx, setPrincipleIdx] = useState(0)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">BeeForce Enterprise Sales Playbook</h1>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              A complete system for training SDRs, AEs, and founders to sell enterprise external workforce management.
              Built on frameworks by <strong className="text-foreground font-semibold">Krishna RK, Founder & CEO, BlueTree</strong>.
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Modules</p>
            <p className="text-4xl font-bold text-primary leading-none">{modules.length}</p>
          </div>
        </div>

        {/* Buying Journey Bar */}
        <div className="flex items-center gap-0 rounded-lg overflow-hidden mb-3">
          {buyingJourney.map((s, i) => (
            <div key={s.label} className={cn('flex-1 flex items-center justify-center py-3 gap-2', s.color)}>
              {i > 0 && <span className="text-white/60 text-sm mr-1">→</span>}
              <div className="text-center">
                <p className="text-white font-bold text-xs">{s.label}</p>
                <p className="text-white/70 text-[11px]">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Enterprise buying progression: <em>Fear → Efficiency → Strategic Advantage</em></p>
      </div>

      {/* Rotating Principle */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardContent className="py-5 px-6">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4.5 h-4.5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1.5">Principle of the Day</p>
              <p className="text-sm text-foreground font-medium italic leading-relaxed">"{principles[principleIdx]}"</p>
              <p className="text-xs text-muted-foreground mt-1.5">— Krishna RK, BlueTree</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setPrincipleIdx((principleIdx - 1 + principles.length) % principles.length)} aria-label="Previous principle" className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setPrincipleIdx((principleIdx + 1) % principles.length)} aria-label="Next principle" className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex gap-1.5 mt-4">
            {principles.map((_, i) => (
              <div key={i} onClick={() => setPrincipleIdx(i)} className={cn('h-1 flex-1 rounded-full cursor-pointer transition-colors', i === principleIdx ? 'bg-primary' : 'bg-border')} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Buying Motivations', value: '5', sub: 'Customer types' },
          { label: 'Enterprise Personas', value: '5', sub: 'CHRO/CFO/CIO/Ops/Proc' },
          { label: 'Sales Frameworks', value: '8', sub: 'Discovery to close' },
          { label: 'Objection Responses', value: '15+', sub: 'Ready-to-use answers' },
          { label: 'AI Email Prompts', value: '9', sub: 'Outbound sequences' },
        ].map(s => (
          <Card key={s.label} className="text-center">
            <CardContent className="py-4 px-3">
              <p className="text-2xl font-bold text-primary leading-none mb-1.5">{s.value}</p>
              <p className="text-xs font-semibold text-foreground leading-snug">{s.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Module Grid */}
      <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">All Modules</h2>
      <div className="grid grid-cols-3 gap-4">
        {modules.map(m => {
          const Icon = m.icon
          return (
            <button
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className={cn('border rounded-lg p-4 text-left transition-all', m.color)}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn('w-5 h-5 mt-0.5 shrink-0', m.iconColor)} />
                <div>
                  <p className="text-sm font-semibold text-foreground leading-snug mb-1">{m.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom banner */}
      <Card className="mt-8 bg-foreground text-background border-0">
        <CardContent className="py-5 px-6">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Final Sales Principle</p>
          <p className="text-sm italic opacity-90 leading-relaxed">
            "I am not in the business of selling software. I am in the business of helping enterprises reduce workforce risk, improve compliance, increase operational efficiency and create measurable business outcomes.
            If BlueTree creates value, customers will buy. If it does not, they should not."
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
