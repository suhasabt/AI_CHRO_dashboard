interface Point { name: string; x: number; y: number }

export function ScatterChart({
  points, xLabel, yLabel, height = 240,
}: { points: Point[]; xLabel: string; yLabel: string; height?: number }) {
  const w = 600
  const h = height
  const pad = { top: 16, right: 20, bottom: 36, left: 44 }
  const innerW = w - pad.left - pad.right
  const innerH = h - pad.top - pad.bottom

  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)
  const xMin = Math.min(...xs) - 5
  const xMax = Math.max(...xs) + 5
  const yMin = Math.min(...ys) - (Math.max(...ys) - Math.min(...ys)) * 0.15 - 1
  const yMax = Math.max(...ys) + (Math.max(...ys) - Math.min(...ys)) * 0.15 + 1

  const x = (v: number) => pad.left + ((v - xMin) / (xMax - xMin)) * innerW
  const y = (v: number) => pad.top + innerH - ((v - yMin) / (yMax - yMin)) * innerH

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      {[0, 0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={pad.left} x2={w - pad.right} y1={pad.top + t * innerH} y2={pad.top + t * innerH} stroke="#E5E9F0" strokeWidth={1} />
      ))}
      {points.map(p => (
        <g key={p.name}>
          <circle cx={x(p.x)} cy={y(p.y)} r={7} fill="#0056c1" fillOpacity={0.8} />
          <text x={x(p.x)} y={y(p.y) - 11} fontSize={10} textAnchor="middle" fill="#3A4252">{p.name}</text>
        </g>
      ))}
      <text x={pad.left + innerW / 2} y={h - 4} fontSize={10.5} textAnchor="middle" fill="#7A8699">{xLabel}</text>
      <text x={12} y={pad.top + innerH / 2} fontSize={10.5} textAnchor="middle" fill="#7A8699" transform={`rotate(-90 12 ${pad.top + innerH / 2})`}>{yLabel}</text>
    </svg>
  )
}
