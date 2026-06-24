export function FilterBar({ sites = ['All Sites', 'Plant 1', 'Plant 2', 'Plant 3', 'Warehouse A', 'Warehouse B'] }: { sites?: string[] }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <select className="text-[11.5px] border border-border rounded-md px-2 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-[#0056c1]/30">
        {sites.map(s => <option key={s}>{s}</option>)}
      </select>
      <select className="text-[11.5px] border border-border rounded-md px-2 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-[#0056c1]/30">
        <option>All Vendors</option>
        <option>Shree Contracts</option>
        <option>KPR Workforce</option>
        <option>Apex Labour</option>
        <option>JK Staffing</option>
      </select>
      <select className="text-[11.5px] border border-border rounded-md px-2 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-[#0056c1]/30">
        <option>This Month</option>
        <option>Last 4 Weeks</option>
        <option>Last 8 Weeks</option>
        <option>Last Quarter</option>
      </select>
    </div>
  )
}
