function colorFor(v: number) {
  if (v >= 85) return '#00B37E'
  if (v >= 65) return '#F59E0B'
  return '#EF4444'
}

export function Gauge({ value, label, size = 120 }: { value: number; label?: string; size?: number }) {
  const r = size / 2 - 10
  const cx = size / 2
  const cy = size / 2 + 6
  const circumference = Math.PI * r
  const dash = (value / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 16} viewBox={`0 0 ${size} ${size / 2 + 16}`}>
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#EEF1F6" strokeWidth={12} strokeLinecap="round" />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke={colorFor(value)} strokeWidth={12} strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={22} fontWeight={700} fill="#1B2B4B">{value}%</text>
      </svg>
      {label && <p className="text-[11px] text-muted-foreground text-center mt-1">{label}</p>}
    </div>
  )
}
