import { useRef, useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { fetchTrafficData } from '../services/api'

Chart.register(...registerables)

const COLORS = ['#6366f1','#10b981','#f59e0b','#f43f5e','#3b82f6','#8b5cf6']

export default function TrafficChart() {
  const canvasRef = useRef(null)
  const chartRef  = useRef(null)
  const [data, setData] = useState({ labels: [], values: [] })

  useEffect(() => {
    fetchTrafficData().then(setData).catch(console.error)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || data.labels.length === 0) return
    if (chartRef.current) chartRef.current.destroy()

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: COLORS.map(c => c + 'cc'),
          borderColor: COLORS,
          borderWidth: 2,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e2130',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
            titleColor: '#94a3b8',
            bodyColor: '#e2e8f0',
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
            },
          },
        },
      },
    })

    return () => chartRef.current?.destroy()
  }, [])

  const total = data.values.reduce((a, b) => a + b, 0)

  return (
    <div className="card p-5 animate-fade-up d3" style={{ opacity: 0 }}>
      <h2 className="text-base font-semibold text-white mb-1">Fuentes de Tráfico</h2>
      <p className="text-xs text-slate-500 mb-5">Distribución de visitas</p>

      <div className="relative" style={{ height: 180 }}>
        <canvas ref={canvasRef} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-mono text-xl font-bold text-white">{total}%</span>
          <span className="text-xs text-slate-500">Total</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {data.labels.map((label, i) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
              <span className="text-xs text-slate-400">{label}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(data.values[i] / total) * 100}%`, background: COLORS[i] }} />
              </div>
              <span className="font-mono text-xs text-slate-300 w-8 text-right">{data.values[i]}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
