import { Sparkles, X, Search } from 'lucide-react'
import { defaultNlqAnswer } from '@/data/beeforceData'
import { useCompany } from '@/state/CompanyContext'

export function NLQModal({ query, onClose }: { query: string; onClose: () => void }) {
  const { company } = useCompany()
  const lower = query.toLowerCase()
  const matched = company.nlqResponses.find(r => lower.includes(r.match))
  const answer = matched?.answer ?? defaultNlqAnswer

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-28" onClick={onClose}>
      <div
        className="bg-card rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-[#1B2B4B]">
          <Search className="w-4 h-4 text-white/70" />
          <p className="text-sm text-white flex-1 truncate">{query}</p>
          <button onClick={onClose} className="text-white/70 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5">
          <div className="flex gap-2.5 items-start">
            <div className="w-7 h-7 rounded-full bg-[#0056c1] flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-[13px] text-[#1B2B4B] leading-relaxed pt-1">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
