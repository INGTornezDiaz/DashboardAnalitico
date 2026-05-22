import { useRef, useEffect } from 'react'
import { Chart, registerables } from 'chart.js'
import { useRealtime } from '../hooks/useRealtime'

Chart.register(...registerables)

export default function RealtimeChart() {
  const canvasRef = useRef(null)
  const chartRef  = useRef(null)
  const { data, isLive, setIsLive } = useRealtime(20)

  useEffect(() => {
    if (!canvasRef.current) return
    if (chartRef.current) chartRef.current.destroy()

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: data.map(d => d.time),
        datasets: [
          {
            label: 'Visitantes',
            data: data.map(d => d.visitors),
            borderColor: '#6366f1',
            backgroundColor: '#6366f115',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Vistas',
            data: data.map(d => d.pageviews),
            borderColor: '#10b981',
            backgroundColor: '#10b98110',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e2130',
            borderColor: 'rgba(255,255,255,0.08)',
            borderWidth: 1,
            titleColor: '#94a3b8',
            bodyColor: '#e2e8f0',
            padding: 10,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#475569', font: { size: 10 }, maxTicksLimit: 6 },
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: '#475569', font: { size: 10 } },
          },
        },
      },
    })

    return () => chartRef.current?.destroy()
  }, [])

  // Actualiza el chart cuando llegan nuevos datos sin recrearlo
  useEffect(() => {
    if (!chartRef.current) return
    chartRef.current.data.labels = data.map(d => d.time)
    chartRef.current.data.datasets[0].data = data.map(d => d.visitors)
    chartRef.current.data.datasets[1].data = data.map(d => d.pageviews)
    chartRef.current.update('none')
  }, [data])

  const latest = data[data.length - 1]

  return (
    <div className="card p-5 animate-fade-up d4" style={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white">Tiempo Real</h2>
            {isLive && (
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Visitantes activos ahora</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-mono text-xl font-bold text-indigo-400">{latest?.visitors}</p>
            <p className="text-xs text-slate-500">visitantes</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xl font-bold text-emerald-400">{latest?.pageviews}</p>
            <p className="text-xs text-slate-500">vistas</p>
          </div>
          <button
            onClick={() => setIsLive(v => !v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              isLive
                ? 'border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20'
                : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
            }`}
          >
            {isLive ? '⏸ Pausar' : '▶ Reanudar'}
          </button>
        </div>
      </div>

      <div style={{ height: 180 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}
