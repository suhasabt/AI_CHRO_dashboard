import { useCompany } from '@/state/CompanyContext'

export function PriorityActions({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { company } = useCompany()
  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full flex flex-col">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Priority Actions</p>
      <div className="flex flex-col gap-3 flex-1">
        {company.priorityActions.map(a => (
          <div key={a.id} className="flex items-start gap-2.5">
            <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.severity === 'red' ? 'bg-[#EF4444]' : 'bg-[#F59E0B]'}`} />
            <div className="flex-1">
              <p className="text-[12.5px] text-[#1B2B4B] leading-snug">{a.text}</p>
              <button
                onClick={() => onNavigate(a.moduleId)}
                className="text-[11.5px] font-semibold text-[#0056c1] hover:underline mt-0.5"
              >
                {a.cta} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
