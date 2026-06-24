import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'

export function AlertBanner({ message, cta }: { message: string; cta?: string }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <div className="flex items-start gap-3 bg-[#FFF7E6] border border-[#F59E0B]/40 rounded-lg px-4 py-3 mb-4">
      <AlertTriangle className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" />
      <p className="text-[12.5px] text-[#7A5200] leading-relaxed flex-1">{message}</p>
      {cta && (
        <button className="text-xs font-semibold text-[#0056c1] whitespace-nowrap hover:underline shrink-0">
          {cta} →
        </button>
      )}
      <button onClick={() => setDismissed(true)} className="text-[#7A5200]/60 hover:text-[#7A5200] shrink-0">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
