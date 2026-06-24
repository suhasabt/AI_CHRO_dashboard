import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { companies, defaultCompanyId, type CompanyProfile } from '@/data/companies'

interface CompanyContextValue {
  company: CompanyProfile
  companies: CompanyProfile[]
  setCompanyId: (id: string) => void
}

const CompanyContext = createContext<CompanyContextValue | null>(null)

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [companyId, setCompanyId] = useState(defaultCompanyId)
  const company = useMemo(() => companies.find(c => c.id === companyId) ?? companies[0], [companyId])

  const value = useMemo(() => ({ company, companies, setCompanyId }), [company])

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
}

export function useCompany() {
  const ctx = useContext(CompanyContext)
  if (!ctx) throw new Error('useCompany must be used within a CompanyProvider')
  return ctx
}
