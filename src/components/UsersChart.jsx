import { useRef, useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { fetchUsersData } from '../services/api'

Chart.register(...registerables)

const PERIODS = [
  { label: 'Mensual', value: 'monthly' },
  { label: 'Semanal', value: 'weekly' },
  { label: 'Diario',  value: 'daily' },
]

export default function UsersChart() {
  const canvasRef = useRef(null)
  const chartRef  = useRef(null)
  const [period, setPeriod] = useState('monthly')
  const [data, setData] = useState({ labels: [], newUsers: [], activeUsers: [], churned: [] })

  useEffect(() => {
    fetchUsersData(period).then(setData).catch(console.error)
  }, [period])

  useEffect(() => {
    if (!canvasRef.current) return
    if (chartRef.current) chartRef.current.destroy()

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Nuevos',
            data: data.newUsers,
            backgroundColor: '#6366f1aa',
            borderColor: '#6366f1',
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: 'Activos',
            data: data.activeUsers,
            backgroundColor: '#10b98133',
            borderColor: '#10b981',
            borderWidth: 1,
            borderRadius: 4,
          },
          {
            label: 'Baja',
            data: data.churned,
            backgroundColor: '#f43f5e33',
            borderColor: '#f43f5e',
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e2130',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
            titleColor: '#94a3b8',
            bodyColor: '#e2e8f0',
            padding: 12,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('es-MX')}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#475569', font: { size: 11 } },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#475569', font: { size: 11 } },
          },
        },
      },
    })

    return () => chartRef.current?.destroy()
  }, [data])

  const legend = [
    { label: 'Nuevos',  color: '#6366f1' },
    { label: 'Activos', color: '#10b981' },
    { label: 'Baja',    color: '#f43f5e' },
  ]

  return (
    <div className="card p-5 animate-fade-up d3" style={{ opacity: 0 }}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-base font-semibold text-white">Usuarios</h2>
          <p className="text-xs text-slate-500 mt-0.5">Nuevos, activos y bajas</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-3">
            {legend.map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                <span className="text-xs text-slate-500">{l.label}</span>
              </div>
            ))}
          </div>

          <div className="flex bg-white/4 rounded-lg p-0.5">
            {PERIODS.map(p => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  period === p.value
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 220 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}
