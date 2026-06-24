import { Fragment } from 'react'
import { colorFor } from './heatColor'
import { HeatmapLegend } from './HeatmapLegend'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function Heatmap({ data }: { data: number[][] }) {
  return (
    <div>
      <div className="grid gap-1 max-w-[360px]" style={{ gridTemplateColumns: `40px repeat(${days.length}, 1fr)` }}>
        <div />
        {days.map(d => <div key={d} className="text-[9px] text-center text-muted-foreground font-medium">{d}</div>)}
        {data.map((row, wi) => (
          <Fragment key={`w-${wi}`}>
            <div className="text-[9px] text-muted-foreground flex items-center">Wk {wi + 1}</div>
            {row.map((v, di) => (
              <div
                key={`${wi}-${di}`}
                title={`${days[di]}, Week ${wi + 1}: ${v}%`}
                className="aspect-square w-full max-w-[42px] rounded flex items-center justify-center text-[9px] font-semibold text-white"
                style={{ backgroundColor: colorFor(v) }}
              >
                {v}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <HeatmapLegend />
    </div>
  )
}
