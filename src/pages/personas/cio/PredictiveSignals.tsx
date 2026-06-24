import { useState } from 'react'
import { Search } from 'lucide-react'
import { cioPredictions } from '@/data/personaData'
import { PageHeader } from '@/components/beeforce/Shared'
import { PredictionCard } from '@/components/beeforce/PredictionCard'

export function CioPredictiveSignals() {
  const [query, setQuery] = useState('')
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Predictive Signals" subtitle="Everything the AI is forecasting — one tab, all predictions" />

      <form onSubmit={e => e.preventDefault()} className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Which vendor has shown the most anomalies in the last 30 days?"
          className="w-full pl-9 pr-3 py-2.5 text-[13px] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#0056c1]/30"
        />
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cioPredictions.map(p => <PredictionCard key={p.label} {...p} />)}
      </div>
    </div>
  )
}
