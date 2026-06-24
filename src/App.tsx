import { useState } from 'react'
import { Bell, ChevronDown, Search, Check } from 'lucide-react'
import beeforceLogo from '@/assets/beeforce-logo.png'
import { cn } from '@/lib/utils'
import { navItems } from '@/data/beeforceData'
import { personas, personaNav, personaLandingTab, personaNlqPlaceholder, type PersonaId } from '@/data/personaData'
import { CompanyProvider, useCompany } from '@/state/CompanyContext'
import { NLQModal } from '@/components/beeforce/NLQModal'
import { ExecutiveOverview } from '@/pages/beeforce/ExecutiveOverview'
import { CompliancePage } from '@/pages/beeforce/Compliance'
import { AttendanceTimePage } from '@/pages/beeforce/AttendanceTime'
import { VendorManagementPage } from '@/pages/beeforce/VendorManagement'
import { ModulePlaceholder } from '@/pages/beeforce/ModulePlaceholder'
import { CfoCostOverview } from '@/pages/personas/cfo/CostOverview'
import { CfoPayrollBilling } from '@/pages/personas/cfo/PayrollBilling'
import { CfoVendorFinancials } from '@/pages/personas/cfo/VendorFinancials'
import { CfoComplianceRisk } from '@/pages/personas/cfo/ComplianceRisk'
import { CfoProductivityRoi } from '@/pages/personas/cfo/ProductivityROI'
import { CioIntelligenceFeed } from '@/pages/personas/cio/IntelligenceFeed'
import { CioDataQuality } from '@/pages/personas/cio/DataQuality'
import { CioComplianceIntelligence } from '@/pages/personas/cio/ComplianceIntelligence'
import { CioVendorRiskIntelligence } from '@/pages/personas/cio/VendorRiskIntelligence'
import { CioPredictiveSignals } from '@/pages/personas/cio/PredictiveSignals'
import { CdoDigitalHealth } from '@/pages/personas/cdo/DigitalHealth'
import { CdoAppAdoption } from '@/pages/personas/cdo/AppAdoption'
import { CdoEngagementVoice } from '@/pages/personas/cdo/EngagementVoice'
import { CdoDigitalAttendance } from '@/pages/personas/cdo/DigitalAttendance'
import { CdoDigitalGrievance } from '@/pages/personas/cdo/DigitalGrievance'

const tierBadge: Record<string, string> = {
  critical: 'bg-[#EF4444]',
  moderate: 'bg-[#F59E0B]',
  good: 'bg-[#00B37E]',
  excellent: 'bg-[#0F9D58]',
}

function CompanySwitcher() {
  const { company, companies, setCompanyId } = useCompany()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative pl-3 border-l border-white/15">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white"
      >
        {company.name}
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-2 w-72 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-40">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide px-3 pt-3 pb-1.5">
              Switch demo company
            </p>
            {companies.map(c => (
              <button
                key={c.id}
                onClick={() => { setCompanyId(c.id); setOpen(false) }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-muted transition-colors"
              >
                <span className={cn('w-2 h-2 rounded-full shrink-0', tierBadge[c.tier])} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-semibold text-[#1B2B4B] truncate">{c.name}</p>
                  <p className="text-[10.5px] text-muted-foreground">{c.tierLabel} · WEI {c.wei.score}</p>
                </div>
                {c.id === company.id && <Check className="w-3.5 h-3.5 text-[#0056c1] shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function PersonaSwitcher({ personaId, onChange }: { personaId: PersonaId; onChange: (id: PersonaId) => void }) {
  const [open, setOpen] = useState(false)
  const { user } = useCompany().company
  const active = personas.find(p => p.id === personaId)!
  const initials = personaId === 'chro'
    ? user.name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
    : active.label

  return (
    <div className="relative pl-3 border-l border-white/15">
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#00B37E] flex items-center justify-center text-[11px] font-bold text-white shrink-0">
          {initials}
        </div>
        <div className="hidden sm:block leading-tight text-left">
          <p className="text-[12px] font-semibold text-white">{personaId === 'chro' ? user.name : active.title}</p>
          <p className="text-[10px] text-white/60">{personaId === 'chro' ? user.role : 'Persona view'}</p>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-white/60" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-40">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide px-3 pt-3 pb-1.5">
              Switch persona view
            </p>
            {personas.map(p => (
              <button
                key={p.id}
                onClick={() => { onChange(p.id); setOpen(false) }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-muted transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] font-semibold text-[#1B2B4B]">{p.label}</p>
                  <p className="text-[10.5px] text-muted-foreground">{p.title}</p>
                </div>
                {p.id === personaId && <Check className="w-3.5 h-3.5 text-[#0056c1] shrink-0" />}
              </button>
            ))}
            <p className="text-[10px] text-muted-foreground px-3 py-2 border-t border-border">
              CFO / CIO / CDO views are scoped to Tezo Manufacturing Ltd only.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

function DashboardShell() {
  const { company, setCompanyId } = useCompany()
  const [personaId, setPersonaId] = useState<PersonaId>('chro')
  const [activePage, setActivePage] = useState('executive')
  const [nlqQuery, setNlqQuery] = useState('')
  const [nlqOpen, setNlqOpen] = useState(false)

  function handlePersonaChange(id: PersonaId) {
    setPersonaId(id)
    setActivePage(personaLandingTab[id])
    if (id !== 'chro') setCompanyId('tezo')
  }

  function handleNlqSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nlqQuery.trim()) return
    setNlqOpen(true)
  }

  function renderPage() {
    switch (activePage) {
      case 'executive': return <ExecutiveOverview onNavigate={setActivePage} />
      case 'compliance': return <CompliancePage />
      case 'attendance': return <AttendanceTimePage />
      case 'vendor': return <VendorManagementPage />
      case 'cfo-cost': return <CfoCostOverview />
      case 'cfo-payroll': return <CfoPayrollBilling />
      case 'cfo-vendor': return <CfoVendorFinancials />
      case 'cfo-compliance': return <CfoComplianceRisk />
      case 'cfo-productivity': return <CfoProductivityRoi />
      case 'cio-feed': return <CioIntelligenceFeed />
      case 'cio-data': return <CioDataQuality />
      case 'cio-compliance': return <CioComplianceIntelligence />
      case 'cio-vendor': return <CioVendorRiskIntelligence />
      case 'cio-predictive': return <CioPredictiveSignals />
      case 'cdo-health': return <CdoDigitalHealth />
      case 'cdo-adoption': return <CdoAppAdoption />
      case 'cdo-engagement': return <CdoEngagementVoice />
      case 'cdo-attendance': return <CdoDigitalAttendance />
      case 'cdo-grievance': return <CdoDigitalGrievance />
      default: return <ModulePlaceholder moduleId={activePage} />
    }
  }

  const tabs = personaId === 'chro' ? navItems : personaNav[personaId]

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/* Top header */}
      <header className="flex items-center gap-4 px-5 py-2.5 bg-[#1B2B4B] shrink-0 z-20">
        <div className="flex items-center gap-2">
          <img src={beeforceLogo} alt="BeeForce" className="h-6 object-contain" />
        </div>

        {personaId === 'chro' ? (
          <CompanySwitcher />
        ) : (
          <div className="pl-3 border-l border-white/15 text-xs text-white/80">
            {company.name}
            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">{personaId.toUpperCase()} view</span>
          </div>
        )}

        <form onSubmit={handleNlqSubmit} className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              value={nlqQuery}
              onChange={e => setNlqQuery(e.target.value)}
              placeholder={personaNlqPlaceholder[personaId]}
              className="w-full pl-9 pr-3 py-1.5 text-[12.5px] rounded-full bg-white/10 text-white placeholder:text-white/45 border border-white/10 focus:outline-none focus:bg-white/15 focus:border-white/25 transition-colors"
            />
          </div>
        </form>

        <div className="flex items-center gap-3 ml-auto">
          <button className="text-white/70 hover:text-white relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#EF4444]" />
          </button>
          <PersonaSwitcher personaId={personaId} onChange={handlePersonaChange} />
        </div>
      </header>

      {/* Top nav (module tabs) */}
      <nav className="flex items-center gap-1 px-5 bg-[#22335A] shrink-0 overflow-x-auto z-10">
        {tabs.map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={cn(
              'whitespace-nowrap text-[12.5px] font-medium px-3.5 py-2.5 border-b-2 transition-colors',
              activePage === item.id
                ? 'text-white border-[#00B37E]'
                : 'text-white/60 border-transparent hover:text-white/90 hover:border-white/20'
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-6 py-5 max-w-[1600px] mx-auto">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">{company.name} · {company.period}</p>
          </div>
          <div key={`${personaId}-${company.id}-${activePage}`} className="animate-in fade-in duration-200">
            {renderPage()}
          </div>
        </div>
      </main>

      {nlqOpen && (
        <NLQModal
          query={nlqQuery}
          onClose={() => { setNlqOpen(false); setNlqQuery('') }}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <CompanyProvider>
      <DashboardShell />
    </CompanyProvider>
  )
}
