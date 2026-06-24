interface Slice { label: string; value: number; color: string }

export function DonutChart({ slices, size = 160 }: { slices: Slice[]; size?: number }) {
  const total = slices.reduce((s, x) => s + x.value, 0)
  const r = size / 2 - 10
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  let offsetAcc = 0

  return (
    <div className="flex items-center gap-5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EEF1F6" strokeWidth={18} />
        {slices.map(s => {
          const frac = s.value / total
          const dash = frac * circumference
          const gap = circumference - dash
          const rotation = (offsetAcc / total) * 360 - 90
          offsetAcc += s.value
          return (
            <circle
              key={s.label}
              cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={18}
              strokeDasharray={`${dash} ${gap}`}
              transform={`rotate(${rotation} ${cx} ${cy})`}
            />
          )
        })}
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1B2B4B">{total}%</text>
      </svg>
      <div className="flex flex-col gap-1.5">
        {slices.map(s => (
          <span key={s.label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
            {s.label} <span className="font-semibold text-[#1B2B4B]">{s.value}%</span>
          </span>
        ))}
      </div>
    </div>
  )
}
