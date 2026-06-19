import { useState } from 'react'
import { cn } from '@/lib/utils'
import bluetreeLogo from '@/assets/bluetree-logo.png'
import {
  Target, Brain, Lightbulb, Handshake, Search, Ear, ClipboardList,
  HelpCircle, ShieldCheck, Scale, Mail, Dumbbell, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react'
import BuyingMotivations from './pages/BuyingMotivations'
import MindsetManual from './pages/MindsetManual'
import WhyBuyFromMeNow from './pages/WhyBuyFromMeNow'
import PeopleBuyWhenTheyBelieve from './pages/PeopleBuyWhenTheyBelieve'
import SelfDiscovery from './pages/SelfDiscovery'
import CommunicationAndListening from './pages/CommunicationAndListening'
import PreCallPrep from './pages/PreCallPrep'
import DoubtRemoval from './pages/DoubtRemoval'
import ObjectionHandling from './pages/ObjectionHandling'
import Negotiation from './pages/Negotiation'
import EmailPlaybook from './pages/EmailPlaybook'
import Resilience from './pages/Resilience'

const navGroups = [
  {
    label: 'FOUNDATION',
    items: [
      { id: 'buying-motivations', label: 'Buying Motivations', icon: Target },
      { id: 'mindset-manual', label: 'Mindset Manual', icon: Brain },
    ],
  },
  {
    label: 'FRAMEWORKS',
    items: [
      { id: 'why-buy', label: 'Why Buy From Me Now', icon: Lightbulb },
      { id: 'people-buy-believe', label: 'People Buy When They Believe', icon: Handshake },
      { id: 'self-discovery', label: 'Self-Discovery Process', icon: Search },
      { id: 'communication-listening', label: 'Communication & L.I.S.T.E.N', icon: Ear },
    ],
  },
  {
    label: 'DEAL EXECUTION',
    items: [
      { id: 'pre-call-prep', label: 'Pre-Call Preparation', icon: ClipboardList },
      { id: 'doubt-removal', label: 'Doubt Removal', icon: HelpCircle },
      { id: 'objection-handling', label: 'Objection Handling', icon: ShieldCheck },
      { id: 'negotiation', label: 'Negotiation Framework', icon: Scale },
    ],
  },
  {
    label: 'OUTREACH',
    items: [
      { id: 'email-playbook', label: 'Email Playbook', icon: Mail },
    ],
  },
  {
    label: 'RESILIENCE',
    items: [
      { id: 'resilience', label: 'Resilience in Sales', icon: Dumbbell },
    ],
  },
]

const pageMap: Record<string, React.ReactNode> = {
  'buying-motivations': <BuyingMotivations />,
  'mindset-manual': <MindsetManual />,
  'why-buy': <WhyBuyFromMeNow />,
  'people-buy-believe': <PeopleBuyWhenTheyBelieve />,
  'self-discovery': <SelfDiscovery />,
  'communication-listening': <CommunicationAndListening />,
  'pre-call-prep': <PreCallPrep />,
  'doubt-removal': <DoubtRemoval />,
  'objection-handling': <ObjectionHandling />,
  'negotiation': <Negotiation />,
  'email-playbook': <EmailPlaybook />,
  'resilience': <Resilience />,
}

export default function App() {
  const [activePage, setActivePage] = useState('buying-motivations')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const activeLabel = navGroups.flatMap(g => g.items).find(i => i.id === activePage)?.label ?? ''

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        'flex flex-col border-r border-border bg-card transition-all duration-200 shrink-0',
        sidebarOpen ? 'w-60' : 'w-14'
      )}>
        {/* Header */}
        <div className={cn('flex items-center gap-2 border-b border-border', sidebarOpen ? 'px-4 py-3.5' : 'px-2 py-3.5 justify-center')}>
          <div className={cn('shrink-0 rounded overflow-hidden flex items-center', sidebarOpen ? 'h-7' : 'h-7 w-7 justify-center')}>
            <img
              src={bluetreeLogo}
              alt="BlueTree"
              className={cn('h-7 object-contain', sidebarOpen ? 'w-auto' : 'w-auto object-left object-cover')}
            />
          </div>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} aria-label="Collapse sidebar" className="ml-auto text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>
        {!sidebarOpen && (
          <button onClick={() => setSidebarOpen(true)} aria-label="Expand sidebar" className="flex items-center justify-center py-2 text-muted-foreground hover:text-foreground transition-colors border-b border-border">
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3">
          {navGroups.map(group => (
            <div key={group.label} className="mb-3">
              {sidebarOpen && (
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-1.5">{group.label}</p>
              )}
              {group.items.map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    title={!sidebarOpen ? item.label : undefined}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-4 py-2 text-left transition-all',
                      !sidebarOpen && 'justify-center px-0',
                      activePage === item.id
                        ? 'bg-primary/10 text-primary border-r-2 border-primary'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {sidebarOpen && <span className="text-xs font-medium truncate">{item.label}</span>}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={cn('border-t border-border', sidebarOpen ? 'px-4 py-3' : 'px-2 py-3 flex justify-center')}>
          {sidebarOpen ? (
            <p className="text-[11px] text-muted-foreground">BlueTree Consultancy © 2025</p>
          ) : (
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
              <span className="text-[9px] text-muted-foreground font-semibold">BT</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-3 px-5 py-2.5 border-b border-border bg-card shrink-0">
          <div>
            <p className="text-xs text-muted-foreground">Sales Playbook</p>
            <h1 className="text-sm font-bold text-foreground">{activeLabel}</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">BlueTree × BeeForce</span>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          {pageMap[activePage]}
        </div>
      </main>
    </div>
  )
}
