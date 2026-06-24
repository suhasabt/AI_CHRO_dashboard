import { colorFor } from './heatColor'
import { HeatmapLegend } from './HeatmapLegend'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function MonthHeatmap({ year, monthIndex, values }: { year: number; monthIndex: number; values: number[] }) {
  const jsFirstDay = new Date(year, monthIndex, 1).getDay() // 0 = Sun
  const leading = (jsFirstDay + 6) % 7 // convert to Mon-start offset
  const totalCells = leading + values.length
  const trailing = (7 - (totalCells % 7)) % 7
  const cells: (number | null)[] = [
    ...Array(leading).fill(null),
    ...values.map((_, i) => i + 1),
    ...Array(trailing).fill(null),
  ]

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 max-w-[360px]">
        {days.map(d => <div key={d} className="text-[9px] text-center text-muted-foreground font-medium pb-1">{d}</div>)}
        {cells.map((day, i) => {
          if (day === null) return <div key={`b-${i}`} />
          const v = values[day - 1]
          return (
            <div
              key={day}
              title={`${day} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][monthIndex]}: ${v}%`}
              className="aspect-square w-full max-w-[42px] rounded flex flex-col items-center justify-center text-white"
              style={{ backgroundColor: colorFor(v) }}
            >
              <span className="text-[8px] leading-none opacity-80">{day}</span>
              <span className="text-[9px] font-semibold leading-none">{v}</span>
            </div>
          )
        })}
      </div>
      <HeatmapLegend />
    </div>
  )
}
