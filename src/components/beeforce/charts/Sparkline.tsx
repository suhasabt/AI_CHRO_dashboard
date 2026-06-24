export function Sparkline({ values, color = '#00B37E', width = 120, height = 32 }: {
  values: number[]; color?: string; width?: number; height?: number
}) {
  const lo = Math.min(...values)
  const hi = Math.max(...values)
  const range = hi - lo || 1
  const pad = 2
  const x = (i: number) => pad + (i / (values.length - 1)) * (width - pad * 2)
  const y = (v: number) => pad + (1 - (v - lo) / range) * (height - pad * 2)
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline fill="none" stroke={color} strokeWidth={2} points={values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
      <circle cx={x(values.length - 1)} cy={y(values[values.length - 1])} r={2.5} fill={color} />
    </svg>
  )
}
