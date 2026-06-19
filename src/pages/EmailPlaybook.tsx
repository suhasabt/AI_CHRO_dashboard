import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'

const personas = [
  { id: 'CHRO', label: 'CHRO', desc: 'Chief Human Resources Officer', color: 'bg-blue-500' },
  { id: 'CFO', label: 'CFO', desc: 'Chief Financial Officer', color: 'bg-green-500' },
  { id: 'VP_HR', label: 'VP HR', desc: 'VP of HR / HR Director', color: 'bg-amber-500' },
  { id: 'COO', label: 'COO', desc: 'Chief Operating Officer', color: 'bg-purple-500' },
]

const emailTemplates: Record<string, { subject: string; body: string; notes: string[] }[]> = {
  CHRO: [
    {
      subject: 'How [Company Name] is managing 12,000 contract workers without HR overhead',
      body: `Hi [Name],

Most CHROs I speak with at enterprises managing large contract workforces share a common challenge: visibility is limited, compliance is fragmented, and HR is spending more time firefighting than strategizing.

We work with CHROs at [Reference Company] and [Reference Company 2] to give them a single platform that consolidates contractor lifecycle management — onboarding, attendance, compliance, and payroll processing — across all locations.

I'd love to share specifically how [Reference CHRO] reduced compliance risk by [X]% and freed up [Y hours] per month in HR administration.

Would a 20-minute conversation be worth your time this week?

[Your Name]
BeeForce | BlueTree Consultancy`,
      notes: ['Focus on strategic outcomes, not features', 'Reference peer CHROs from similar-sized enterprises', 'Keep it under 150 words'],
    },
    {
      subject: 'Before your next audit — a question about contractor compliance',
      body: `Hi [Name],

With contract workforce audits becoming more frequent and penalties increasing, CHROs are under more pressure than ever to prove compliance at scale.

At [Reference Company], we helped their CHRO build a compliance-first contractor ecosystem — automated documentation, real-time audit trails, and proactive alerts before issues become violations.

Would it be worth a 20-minute call to understand how they did it — and whether a similar approach would work for [Company Name]?

[Your Name]`,
      notes: ['Use "before your audit" subject line for high open rates', 'Urgency without pressure', 'Social proof is central'],
    },
  ],
  CFO: [
    {
      subject: 'What does [Company Name] spend on contractor payroll errors annually?',
      body: `Hi [Name],

CFOs I speak with in the enterprise space often tell me that contractor payroll management is one of their most opaque cost centers — errors are expensive, visibility is limited, and audits are disruptive.

We've helped finance leaders at [Reference Company] reduce payroll processing costs by [₹X] annually through automated attendance capture, integrated payroll reconciliation, and real-time reporting.

Would you be open to a 20-minute conversation to explore whether a similar outcome is possible at [Company Name]?

[Your Name]`,
      notes: ['Lead with cost and ROI — that\'s the CFO\'s language', 'Quantify wherever possible', 'Keep it crisp and data-focused'],
    },
  ],
  VP_HR: [
    {
      subject: 'Managing contractor onboarding at scale — are you still doing it manually?',
      body: `Hi [Name],

I speak with a lot of HR Directors managing large contract workforces, and the most common challenge I hear is this: contractor onboarding is still partially or fully manual — which creates delays, documentation gaps, and compliance exposure.

We've built a platform specifically for enterprise HR teams that automates the contractor lifecycle — from onboarding and attendance to compliance and payroll.

I'd love to share how [Reference Company]'s HR team cut contractor onboarding time by [X] days. Would a 30-minute call make sense?

[Your Name]`,
      notes: ['VP HR is operational — focus on day-to-day pain', 'Onboarding and compliance are key triggers', 'Offer a peer reference'],
    },
  ],
  COO: [
    {
      subject: 'Contractor workforce visibility — what your operations team might be missing',
      body: `Hi [Name],

At enterprises managing large contract workforces across multiple locations, operational leaders often face the same blind spot: real-time visibility into contractor attendance, compliance, and productivity is fragmented or delayed.

We work with COOs and operations teams to give them a single dashboard that covers their entire contract workforce — reducing operational risk and improving response time.

Would a 20-minute conversation be worth your time to see how [Reference Company] solved a similar challenge?

[Your Name]`,
      notes: ['COO cares about operations continuity and risk', 'Dashboard / real-time visibility resonates', 'Keep focus on field/site operations impact'],
    },
  ],
}

const coldEmailPrinciples = [
  { rule: 'Subject line must create curiosity or relevance — not pitch the product.', example: 'Avoid: "BeeForce Workforce Management Platform" — Use: "What does [Company] spend on contractor payroll errors?"' },
  { rule: 'First line must not start with "I" or "We".', example: 'Start with the customer: "Most CHROs I speak with..." or "Enterprises managing 5,000+ contract workers often..."' },
  { rule: 'One problem. One outcome. One CTA.', example: 'Don\'t try to say everything in one email. Say one thing well.' },
  { rule: 'Keep it under 150 words.', example: 'Short emails get read. Long emails get ignored. If you can\'t say it in 150 words, you don\'t know the message yet.' },
  { rule: 'Always include social proof.', example: '"We helped [Reference CHRO] at [Company Name] achieve [outcome]." Name a real reference. It changes everything.' },
  { rule: 'End with a low-commitment ask.', example: '"Would a 20-minute call be worth your time?" — not "I\'d love to schedule a demo and share our full product."' },
]

const followUpSequence = [
  { day: 'Day 1', action: 'Send initial cold email', note: 'Focused on one problem, one outcome, one ask.' },
  { day: 'Day 3', action: 'Follow-up #1 — add value', note: 'Share a relevant article, case study, or insight. Don\'t just "bump" the email.' },
  { day: 'Day 7', action: 'Follow-up #2 — different angle', note: 'Lead with a different pain point or persona relevance. Try a new subject line.' },
  { day: 'Day 14', action: 'Follow-up #3 — pattern interrupt', note: '"Should I stay or should I go?" email. Make it easy for them to say no — or yes.' },
  { day: 'Day 21', action: 'Break-up email', note: '"I don\'t want to keep filling your inbox — if this isn\'t relevant, just let me know and I\'ll step back."' },
]

const aiPrompts = [
  {
    num: 1, title: 'Personalized Cold Email',
    prompt: 'Write a cold email to [Name], [Title] at [Company Name], an enterprise in [Industry] managing [X] contract workers. Their biggest operational challenge is [pain point]. Our product is BeeForce, a workforce management platform by BlueTree Consultancy that helps enterprises manage contractor lifecycle management. Reference [Reference Customer] as a social proof point. Keep it under 150 words. Do not start with "I" or "We". End with a low-commitment call-to-action.',
  },
  {
    num: 2, title: 'Follow-Up After No Response',
    prompt: 'Write a follow-up email for a prospect who hasn\'t responded to my initial email sent [X days ago]. The prospect is [Name], [Title] at [Company Name]. My previous email was about [topic]. Add a new angle or insight. Keep it under 75 words. Make it easy for them to respond.',
  },
  {
    num: 3, title: 'Post-Meeting Summary',
    prompt: 'Write a post-meeting summary email for a discovery call with [Name] at [Company Name]. Key points discussed: [Key Point 1], [Key Point 2], [Key Point 3]. Agreed next steps: [Next Step]. The email should confirm alignment on pain points, summarize BeeForce\'s relevance, and confirm the next meeting date.',
  },
  {
    num: 4, title: 'Executive Intro / Referral Request',
    prompt: 'Write an email asking my champion [Name] at [Company Name] to introduce me to [Target Exec Name], their [Title]. I have already had [X] meetings and [key outcome so far]. Keep it professional and make it easy for them to forward. Give them a suggested one-liner they can use to make the introduction.',
  },
  {
    num: 5, title: 'Objection Response — Price',
    prompt: 'Write a professional email response to a prospect who said our pricing is too high. The prospect is [Name], [Title] at [Company Name]. Our annual contract value is [₹X]. Acknowledge the concern. Pivot to ROI. Include the cost-of-inaction argument. Reference how [Reference Company] justified the investment. Keep it under 150 words.',
  },
  {
    num: 6, title: 'Re-engagement After Ghost',
    prompt: 'Write a re-engagement email for a prospect who went silent after [X] meetings. Last contact was [date]. The deal was estimated at [₹X value]. The email should be honest about the gap, not pressure them, and offer a low-barrier reason to reconnect. Keep it short. Use a pattern interrupt to stand out.',
  },
  {
    num: 7, title: 'Proposal Follow-Up',
    prompt: 'Write a follow-up email after sending a commercial proposal to [Name] at [Company Name]. The proposal was sent [X days ago]. The investment is [₹X]. The email should check for questions, reinforce the key value proposition, and ask for a specific next step — either approval, revision, or a call to discuss.',
  },
  {
    num: 8, title: 'Quarterly Business Review Invite',
    prompt: 'Write an email inviting an existing customer [Name] at [Company Name] to a Quarterly Business Review (QBR). Include: the purpose of the QBR, topics to be covered (usage, outcomes, roadmap, expansion), the format (60-minute virtual/in-person), and a request to confirm the date. Keep it professional and focused on mutual value.',
  },
  {
    num: 9, title: 'LinkedIn Connection + Follow-Up',
    prompt: 'Write a LinkedIn connection request message for [Name], [Title] at [Company Name]. Keep it under 50 words. Don\'t pitch. Mention a specific insight or shared context. Also write a 3-message LinkedIn follow-up sequence (after connection accepted) that introduces BeeForce naturally, adds value, and asks for a conversation.',
  },
]

export default function EmailPlaybook() {
  const [activePersona, setActivePersona] = useState('CHRO')
  const [activeTemplate, setActiveTemplate] = useState(0)
  const [activeTab, setActiveTab] = useState<'templates' | 'principles' | 'ai' | 'followup'>('templates')
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const copyPrompt = (text: string, idx: number) => {
    navigator.clipboard?.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">Email Playbook</h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Email is still one of the highest-leverage outreach tools in enterprise sales — when done right. Done wrong, it's noise.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 mb-8 bg-muted rounded-lg p-1">
        {[{ id: 'templates', label: 'Email Templates' }, { id: 'principles', label: 'Email Principles' }, { id: 'ai', label: '9 AI Prompts' }, { id: 'followup', label: 'Follow-Up Sequence' }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id as any)}
            className={cn('flex-1 py-2 rounded-md text-xs font-semibold transition-all', activeTab === t.id ? 'bg-white shadow text-foreground' : 'text-muted-foreground')}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'templates' && (
        <div>
          <div className="flex gap-2.5 mb-4">
            {personas.map(p => (
              <button key={p.id} onClick={() => { setActivePersona(p.id); setActiveTemplate(0) }}
                className={cn('flex-1 py-3 rounded-lg border text-center transition-all', activePersona === p.id ? `${p.color} text-white border-transparent` : 'border-border hover:bg-muted')}>
                <p className="text-sm font-bold">{p.label}</p>
                <p className="text-[11px] opacity-70 mt-0.5">{p.desc}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-2 mb-6">
            {(emailTemplates[activePersona] || []).map((_, i) => (
              <button key={i} onClick={() => setActiveTemplate(i)}
                className={cn('px-4 py-1.5 rounded-full border text-xs font-semibold transition-all', activeTemplate === i ? 'bg-primary text-primary-foreground border-transparent' : 'border-border hover:bg-muted')}>
                Template {i+1}
              </button>
            ))}
          </div>
          {(emailTemplates[activePersona] || [])[activeTemplate] && (() => { const t = emailTemplates[activePersona][activeTemplate]; return (
            <Card className="border">
              <CardHeader className="pb-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subject Line</p>
                <p className="text-sm font-semibold text-primary mt-1">{t.subject}</p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="bg-muted/40 rounded-lg p-5">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-sans leading-relaxed">{t.body}</pre>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Notes</p>
                  {t.notes.map((n, i) => <p key={i} className="text-xs text-foreground flex items-start gap-1.5 mb-1.5"><span className="text-primary mt-0.5">›</span>{n}</p>)}
                </div>
              </CardContent>
            </Card>
          )})()}
        </div>
      )}

      {activeTab === 'principles' && (
        <div className="space-y-3">
          {coldEmailPrinciples.map((p, i) => (
            <Card key={i} className="border">
              <CardContent className="py-4 px-5">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</div>
                  <div>
                    <p className="text-xs font-bold text-foreground mb-1.5">{p.rule}</p>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">{p.example}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'ai' && (
        <div>
          <p className="text-xs text-muted-foreground mb-5">Copy any prompt and paste into an AI tool (ChatGPT, Claude, etc.) with your specific details filled in.</p>
          <div className="grid grid-cols-1 gap-3">
            {aiPrompts.map((p, i) => (
              <Card key={i} className="border">
                <CardContent className="py-4 px-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{p.num}</span>
                        <p className="text-xs font-bold text-foreground">{p.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{p.prompt}</p>
                    </div>
                    <button onClick={() => copyPrompt(p.prompt, i)}
                      className={cn('px-3 py-1.5 rounded text-[11px] font-bold transition-all flex-shrink-0 flex items-center gap-1', copiedIdx === i ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary hover:bg-primary/20')}>
                      {copiedIdx === i ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'followup' && (
        <div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20"></div>
            <div className="space-y-4">
              {followUpSequence.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold z-10 flex-shrink-0">
                    {step.day.replace('Day ', 'D')}
                  </div>
                  <Card className="flex-1 border">
                    <CardContent className="py-3 px-4">
                      <p className="text-xs font-bold text-foreground">{step.action}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.note}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Card className="mt-6 bg-foreground text-background border-0">
            <CardContent className="py-5 px-6">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">Rule</p>
              <p className="text-sm leading-relaxed">5 touchpoints, minimum. Persistence is not annoyance — it's professionalism — as long as every touchpoint adds value.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
