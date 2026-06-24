import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

const toneClasses = {
  green: 'bg-[#00B37E]/10 text-[#00875A]',
  amber: 'bg-[#F59E0B]/10 text-[#92670B]',
  red: 'bg-[#EF4444]/10 text-[#C92A2A]',
}

export function HealthBadge({ value, tone }: { value: string; tone: 'green' | 'amber' | 'red' }) {
  return (
    <span className={cn('text-[11px] font-semibold px-2.5 py-1 rounded-full', toneClasses[tone])}>
      {tone === 'red' ? '⚠ ' : tone === 'amber' ? '● ' : '✓ '}{value}
    </span>
  )
}

export function PageHeader({ title, badge, subtitle }: { title: string; badge?: ReactNode; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h1 className="text-lg font-bold text-[#1B2B4B]">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {badge}
    </div>
  )
}

export function MetricCard({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: 'green' | 'amber' | 'red' }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <p className="text-[11px] font-medium text-muted-foreground mb-1.5">{label}</p>
      <div className="flex items-baseline justify-between">
        <span className="text-xl font-bold text-[#1B2B4B]">{value}</span>
        <span className={cn('text-[10.5px] font-semibold px-1.5 py-0.5 rounded', toneClasses[tone])}>{delta}</span>
      </div>
    </div>
  )
}

export function SectionCard({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-[#1B2B4B]">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  )
}
