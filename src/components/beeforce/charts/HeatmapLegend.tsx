export function HeatmapLegend() {
  return (
    <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground">
      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#EF4444' }} />Low</span>
      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#F59E0B' }} />Moderate</span>
      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#00B37E' }} />Good</span>
      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#0F9D58' }} />Excellent</span>
    </div>
  )
}
