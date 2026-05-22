export default function KPICard({ title, value, change, prefix = '', suffix = '', icon, color, delay = '' }) {
  const isPositive = change >= 0
  const fmt = (v) => typeof v === 'number' && v >= 1000
    ? v.toLocaleString('es-MX')
    : v

  return (
    <div className={`card card-hover p-5 animate-fade-up ${delay}`} style={{ opacity: 0 }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">{title}</p>
          <p className="font-mono text-2xl font-semibold text-white">
            {prefix}{fmt(value)}{suffix}
          </p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${color}`}>
          {icon}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          isPositive
            ? 'bg-emerald-500/15 text-emerald-400'
            : 'bg-red-500/15 text-red-400'
        }`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
        </span>
        <span className="text-xs text-slate-600">vs mes anterior</span>
      </div>
    </div>
  )
}
