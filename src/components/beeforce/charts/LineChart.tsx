interface Series {
  name: string
  values: number[]
  color: string
  dashed?: boolean
}

export function LineChart({
  labels, series, height = 220, min, max,
}: { labels: string[]; series: Series[]; height?: number; min?: number; max?: number }) {
  const w = 600
  const h = height
  const pad = { top: 16, right: 16, bottom: 28, left: 36 }
  const allValues = series.flatMap(s => s.values)
  const lo = min ?? Math.min(...allValues) - 4
  const hi = max ?? Math.max(...allValues) + 4
  const innerW = w - pad.left - pad.right
  const innerH = h - pad.top - pad.bottom
  const x = (i: number) => pad.left + (i / (labels.length - 1)) * innerW
  const y = (v: number) => pad.top + innerH - ((v - lo) / (hi - lo)) * innerH

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      {[0, 0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={pad.left} x2={w - pad.right} y1={pad.top + t * innerH} y2={pad.top + t * innerH}
          stroke="#E5E9F0" strokeWidth={1} />
      ))}
      {series.map(s => (
        <polyline
          key={s.name}
          fill="none"
          stroke={s.color}
          strokeWidth={2.5}
          strokeDasharray={s.dashed ? '5,4' : undefined}
          points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
        />
      ))}
      {series.map(s => (
        !s.dashed && s.values.map((v, i) => (
          <circle key={`${s.name}-${i}`} cx={x(i)} cy={y(v)} r={3} fill={s.color} />
        ))
      ))}
      {labels.map((l, i) => (
        <text key={l} x={x(i)} y={h - 6} fontSize={10} textAnchor="middle" fill="#7A8699">{l}</text>
      ))}
    </svg>
  )
}
