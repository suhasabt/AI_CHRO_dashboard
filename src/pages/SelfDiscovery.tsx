import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const steps = [
  {
    num: 1,
    title: 'Clarify the Problem',
    instruction: "Don't start with BeeForce. Start with their workforce challenges.",
    questions: [
      'How many external workforce members do you manage today?',
      'How many contractors and vendors are involved?',
      'What are the biggest challenges in managing them?',
      'Where do compliance, onboarding, or visibility break down?',
      'If nothing changes, what happens over the next 12 months?',
    ],
    goal: 'Get them to describe the problem in their own words.',
    color: 'bg-blue-500',
  },
  {
    num: 2,
    title: 'Explore Current Process',
    instruction: 'Understand what they are doing today.',
    questions: [
      'How are you currently onboarding contract workers?',
      'How do you track statutory compliance?',
      'How do you monitor attendance and deployment?',
      'What systems are being used today?',
      'What works well and what doesn\'t?',
    ],
    goal: 'Expose gaps without criticizing their current solution.',
    color: 'bg-green-500',
  },
  {
    num: 3,
    title: 'Explore Previous Attempts',
    instruction: 'This is where urgency is created.',
    questions: [
      'Have you tried solving this before?',
      'What initiatives have been undertaken?',
      'Why didn\'t those efforts achieve the desired outcome?',
      'What lessons were learned?',
      'What would you do differently this time?',
    ],
    goal: 'Every failed attempt increases the perceived value of a better solution.',
    color: 'bg-orange-500',
  },
  {
    num: 4,
    title: 'Quantify the Cost',
    instruction: 'This is where enterprise deals are won.',
    questions: [
      'How much time is your team spending manually?',
      'How many audits do you face annually?',
      'What is the impact of non-compliance?',
      'What happens when worker documentation is missing?',
      'What is the business impact of workforce attrition?',
    ],
    goal: 'Convert pain into numbers. Pain = Business Case',
    color: 'bg-red-500',
  },
  {
    num: 5,
    title: 'Create Future Vision',
    instruction: 'Move from pain to possibility.',
    questions: [
      'If this problem disappeared tomorrow, what would improve?',
      'What would an ideal workforce management process look like?',
      'What visibility would leadership want?',
      'What would your contractors experience differently?',
    ],
    goal: 'Let them define success.',
    color: 'bg-purple-500',
  },
  {
    num: 6,
    title: 'Introduce BeeForce',
    instruction: 'Only now discuss the solution.',
    questions: [],
    goal: 'By the time BeeForce is presented, the prospect should already be thinking: "This is exactly what we need."',
    color: 'bg-primary',
    transition: '"Based on what you\'ve shared, it sounds like you\'re looking for three things: complete workforce visibility, automated compliance, and faster onboarding. Is that accurate?"\n\nOnce they agree:\n"That\'s exactly the type of challenge BeeForce was built to solve."\n\nNow the demo becomes relevant.',
  },
  {
    num: 7,
    title: 'Confirm Business Impact',
    instruction: 'Before discussing pricing.',
    questions: [
      'If we could achieve these outcomes, what would that mean for your organization?',
      'How would this impact HR, Operations, Procurement, and Compliance?',
      'What would success look like six months after implementation?',
    ],
    goal: 'Get them to verbalize ROI.',
    color: 'bg-teal-500',
  },
  {
    num: 8,
    title: 'Advance the Buying Process',
    instruction: 'Not "Do you want to buy?" Instead:',
    questions: [
      'What would be the next step from your side?',
      'Who else should be involved in evaluating this?',
      'What does your decision process typically look like?',
      'Is there anything preventing us from moving forward?',
    ],
    goal: 'Define the next decision movement clearly.',
    color: 'bg-slate-500',
  },
]

export default function SelfDiscovery() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 text-balance">The BeeForce Self-Discovery Framework</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          One of the strongest modern enterprise sales frameworks because it shifts the conversation from <strong className="font-semibold">selling</strong> to <strong className="font-semibold">facilitating self-discovery</strong>.
          The best enterprise salespeople spend <strong className="font-semibold">70% of the meeting on discovery</strong> and 30% on solutioning.
        </p>
      </div>

      {/* Formula */}
      <div className="flex items-center gap-2 flex-wrap mb-8 p-4 bg-muted/50 rounded-lg">
        {['Problem Awareness', 'Cost Awareness', 'Urgency', 'Future Vision', 'Solution Fit', 'Decision'].map((s, i, arr) => (
          <div key={s} className="flex items-center gap-2">
            <Badge variant={i === 4 ? 'default' : 'secondary'} className="text-xs">{s}</Badge>
            {i < arr.length - 1 && <span className="text-muted-foreground">→</span>}
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.num} className="border">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3.5">
                <div className={`w-7 h-7 rounded-full ${step.color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {step.num}
                </div>
                <div>
                  <CardTitle className="text-sm">{step.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1 italic">{step.instruction}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="ml-[42px]">
              {step.transition && (
                <div className="bg-primary/5 border border-primary/20 rounded-md p-4 mb-4">
                  <p className="text-xs text-foreground whitespace-pre-line leading-relaxed">{step.transition}</p>
                </div>
              )}
              {step.questions.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Questions</p>
                  <ul className="space-y-1.5">
                    {step.questions.map(q => (
                      <li key={q} className="text-xs text-foreground flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">?</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="bg-muted/60 rounded px-4 py-2.5">
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Goal</p>
                <p className="text-xs text-foreground font-medium leading-relaxed">{step.goal}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enterprise Sales Rule */}
      <Card className="mt-8 bg-primary text-primary-foreground border-0">
        <CardContent className="py-5 px-6">
          <p className="text-sm font-bold mb-3">Enterprise Sales Rule</p>
          <p className="text-xs opacity-90 mb-4">People don't buy BeeForce because you explained it well. They buy because:</p>
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {[
              'They discovered a problem.',
              'They quantified the cost.',
              'They acknowledged current methods aren\'t working.',
              'They defined the future state.',
              'BeeForce became the obvious bridge between the two.',
            ].map((r, i) => (
              <div key={r} className="flex items-start gap-2.5 bg-white/10 rounded p-3">
                <span className="font-bold text-xs opacity-70">{i + 1}.</span>
                <p className="text-xs leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
          <p className="text-xs italic opacity-80 border-t border-white/20 pt-3">
            "Not because you convinced them. Because they convinced themselves."
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
