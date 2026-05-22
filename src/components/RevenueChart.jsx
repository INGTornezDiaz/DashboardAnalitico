import { useRef, useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { useExport } from '../hooks/useExport'
import { fetchRevenueData } from '../services/api'

Chart.register(...registerables)

const PERIODS = [
  { label: 'Mensual', value: 'monthly' },
  { label: 'Semanal', value: 'weekly' },
  { label: 'Diario',  value: 'daily' },
]

const METRICS = [
  { key: 'revenue',  label: 'Ingresos',  color: '#6366f1' },
  { key: 'expenses', label: 'Gastos',    color: '#f43f5e' },
  { key: 'profit',   label: 'Ganancia',  color: '#10b981' },
]

export default function RevenueChart() {
  const canvasRef = useRef(null)
  const chartRef  = useRef(null)
  const [period, setPeriod] = useState('monthly')
  const [active, setActive] = useState(['revenue', 'expenses', 'profit'])
  const [data, setData] = useState({ labels: [], revenue: [], expenses: [], profit: [] })
  const { exportCSV } = useExport()

  useEffect(() => {
    fetchRevenueData(period).then(setData).catch(console.error)
  }, [period])

  useEffect(() => {
    if (!canvasRef.current) return
    if (chartRef.current) chartRef.current.destroy()

    const datasets = METRICS.filter(m => active.includes(m.key)).map(m => ({
      label: m.label,
      data: data[m.key],
      borderColor: m.color,
      backgroundColor: m.color + '18',
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.4,
      fill: true,
    }))

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: { labels: data.labels, datasets },
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
              label: (ctx) => ` ${ctx.dataset.label}: $${ctx.parsed.y.toLocaleString('es-MX')}`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#475569', font: { size: 11 } },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: {
              color: '#475569',
              font: { size: 11 },
              callback: (v) => '$' + (v / 1000).toFixed(0) + 'k',
            },
          },
        },
      },
    })

    return () => chartRef.current?.destroy()
  }, [data, active])

  const toggleMetric = (key) => {
    setActive(prev =>
      prev.includes(key)
        ? prev.length > 1 ? prev.filter(k => k !== key) : prev
        : [...prev, key]
    )
  }

  return (
    <div className="card p-5 animate-fade-up d2" style={{ opacity: 0 }}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-base font-semibold text-white">Ingresos & Gastos</h2>
          <p className="text-xs text-slate-500 mt-0.5">Comparativa financiera</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle métricas */}
          <div className="flex gap-1.5">
            {METRICS.map(m => (
              <button
                key={m.key}
                onClick={() => toggleMetric(m.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  active.includes(m.key)
                    ? 'bg-white/8 text-white'
                    : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                {m.label}
              </button>
            ))}
          </div>

          {/* Selector período */}
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

          {/* Exportar */}
          <button
            onClick={() => exportCSV(data, 'revenue')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
                       bg-white/5 border border-white/8 text-slate-400
                       hover:bg-white/10 hover:text-white transition-all"
          >
            ↓ CSV
          </button>
        </div>
      </div>

      <div style={{ height: 260 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}
