interface Bar { label: string; value: number; color?: string }

export function BarChart({
  bars, height = 220, defaultColor = '#00B37E', max = 100, unit = '%',
}: { bars: Bar[]; height?: number; defaultColor?: string; max?: number; unit?: string }) {
  const w = 600
  const h = height
  const pad = { top: 16, right: 16, bottom: 36, left: 16 }
  const innerW = w - pad.left - pad.right
  const innerH = h - pad.top - pad.bottom
  const slot = innerW / bars.length
  const barW = slot * 0.5

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      {[0, 0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={pad.left} x2={w - pad.right} y1={pad.top + t * innerH} y2={pad.top + t * innerH}
          stroke="#E5E9F0" strokeWidth={1} />
      ))}
      {bars.map((b, i) => {
        const bh = (b.value / max) * innerH
        const bx = pad.left + i * slot + (slot - barW) / 2
        const by = pad.top + innerH - bh
        return (
          <g key={b.label}>
            <rect x={bx} y={by} width={barW} height={bh} rx={3} fill={b.color ?? defaultColor} />
            <text x={bx + barW / 2} y={by - 6} fontSize={11} fontWeight={600} textAnchor="middle" fill="#222">{b.value}{unit}</text>
            <text x={bx + barW / 2} y={h - 18} fontSize={10} textAnchor="middle" fill="#7A8699">
              {b.label.length > 12 ? b.label.slice(0, 11) + '…' : b.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function HorizontalBarChart({
  bars, height = 220, defaultColor = '#00B37E', max = 100, unit = '%',
}: { bars: Bar[]; height?: number; defaultColor?: string; max?: number; unit?: string }) {
  const w = 600
  const h = height
  const pad = { top: 8, right: 50, bottom: 8, left: 100 }
  const innerW = w - pad.left - pad.right
  const innerH = h - pad.top - pad.bottom
  const slot = innerH / bars.length
  const barH = slot * 0.55

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      {bars.map((b, i) => {
        const bw = (b.value / max) * innerW
        const by = pad.top + i * slot + (slot - barH) / 2
        return (
          <g key={b.label}>
            <text x={pad.left - 8} y={by + barH / 2 + 4} fontSize={11} textAnchor="end" fill="#3A4252">{b.label}</text>
            <rect x={pad.left} y={by} width={innerW} height={barH} rx={3} fill="#EEF1F6" />
            <rect x={pad.left} y={by} width={bw} height={barH} rx={3} fill={b.color ?? defaultColor} />
            <text x={pad.left + bw + 8} y={by + barH / 2 + 4} fontSize={11} fontWeight={600} fill="#222">{b.value}{unit}</text>
          </g>
        )
      })}
    </svg>
  )
}
