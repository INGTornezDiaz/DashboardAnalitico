import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import KPICard from './components/KPICard'
import RevenueChart from './components/RevenueChart'
import TrafficChart from './components/TrafficChart'
import UsersChart from './components/UsersChart'
import RealtimeChart from './components/RealtimeChart'
import TopProducts from './components/TopProducts'
import { fetchKpis } from './services/api'

const KPI_CONFIG = [
  {
    key: 'totalRevenue',
    title: 'Ingresos Totales',
    icon: '💰',
    prefix: '$',
    color: 'bg-indigo-500/15 text-indigo-400',
    delay: 'd1',
  },
  {
    key: 'activeUsers',
    title: 'Usuarios Activos',
    icon: '👥',
    color: 'bg-emerald-500/15 text-emerald-400',
    delay: 'd2',
  },
  {
    key: 'conversionRate',
    title: 'Tasa Conversión',
    icon: '📈',
    suffix: '%',
    color: 'bg-amber-500/15 text-amber-400',
    delay: 'd3',
  },
  {
    key: 'avgOrderValue',
    title: 'Ticket Promedio',
    icon: '🛒',
    prefix: '$',
    color: 'bg-rose-500/15 text-rose-400',
    delay: 'd4',
  },
]

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [kpis, setKpis] = useState({
    totalRevenue: { value: 0, change: 0 },
    activeUsers: { value: 0, change: 0 },
    conversionRate: { value: 0, change: 0 },
    avgOrderValue: { value: 0, change: 0 },
  })
  const now = new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  useEffect(() => {
    fetchKpis().then(setKpis).catch(console.error)
  }, [])

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {sidebarOpen && <Sidebar />}

      {/* Main */}
      <main className="flex-1 overflow-auto" style={{ background: '#0f1117' }}>

        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between"
             style={{ background: '#0f1117', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="text-slate-500 hover:text-white transition-colors text-lg"
            >
              ☰
            </button>
            <div>
              <h1 className="text-sm font-semibold text-white">Dashboard Analytics</h1>
              <p className="text-xs text-slate-500 capitalize">{now}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sistema operativo
            </div>
            <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 text-slate-400
                               hover:bg-white/10 hover:text-white transition-all text-sm">
              🔔
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {KPI_CONFIG.map(cfg => (
              <KPICard
                key={cfg.key}
                title={cfg.title}
                value={kpis[cfg.key].value}
                change={kpis[cfg.key].change}
                prefix={cfg.prefix}
                suffix={cfg.suffix}
                icon={cfg.icon}
                color={cfg.color}
                delay={cfg.delay}
              />
            ))}
          </div>

          {/* Revenue + Traffic */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            <TrafficChart />
          </div>

          {/* Users + Realtime */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <UsersChart />
            <RealtimeChart />
          </div>

          {/* Top Products */}
          <TopProducts />

        </div>
      </main>
    </div>
  )
}
