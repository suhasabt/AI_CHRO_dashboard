import { useState } from 'react'
import { Sparkles, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { defaultNlqAnswer } from '@/data/beeforceData'
import { useCompany } from '@/state/CompanyContext'

interface QA { question: string; answer: string }

export function AIInsight({ insight, label = 'Generate AI Insight' }: { insight: string; label?: string }) {
  const { company } = useCompany()
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [thread, setThread] = useState<QA[]>([])

  function answerFor(q: string) {
    const lower = q.toLowerCase()
    return company.nlqResponses.find(r => lower.includes(r.match))?.answer ?? defaultNlqAnswer
  }

  function handleAsk(e: React.FormEvent) {
    e.preventDefault()
    if (!question.trim()) return
    setThread(t => [...t, { question, answer: answerFor(question) }])
    setQuestion('')
  }

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setOpen(v => !v)}
          className={cn(
            'inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors',
            open ? 'bg-[#0056c1] text-white' : 'bg-[#0056c1]/10 text-[#0056c1] hover:bg-[#0056c1]/20'
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {open ? 'Hide AI Insight' : label}
        </button>
      </div>
      {open && (
        <div className="bg-[#EAF2FF] border border-[#0056c1]/20 rounded-lg p-3 mb-3 animate-in fade-in">
          <div className="flex gap-2 items-start">
            <Sparkles className="w-4 h-4 text-[#0056c1] mt-0.5 shrink-0" />
            <p className="text-[12.5px] italic text-[#1B2B4B] leading-relaxed">{insight}</p>
          </div>

          {thread.length > 0 && (
            <div className="flex flex-col gap-2.5 mt-3 pt-3 border-t border-[#0056c1]/15">
              {thread.map((qa, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <p className="text-[11.5px] font-semibold text-[#1B2B4B]">You: {qa.question}</p>
                  <div className="flex gap-2 items-start">
                    <Sparkles className="w-3.5 h-3.5 text-[#0056c1] mt-0.5 shrink-0" />
                    <p className="text-[12px] italic text-[#1B2B4B] leading-relaxed">{qa.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleAsk} className="flex gap-2 mt-3">
            <input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Ask a follow-up question about this chart..."
              className="flex-1 px-3 py-1.5 text-[12px] rounded-md border border-[#0056c1]/25 bg-white focus:outline-none focus:ring-2 focus:ring-[#0056c1]/30"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#0056c1] text-white hover:bg-[#0056c1]/90"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
