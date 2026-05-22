import { useState, useEffect } from 'react'
import { useExport } from '../hooks/useExport'
import { fetchTopProducts } from '../services/api'

const SORTS = ['revenue', 'sales', 'growth']

export default function TopProducts() {
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState('revenue')
  const [filterCat, setFilterCat] = useState('Todos')
  const { exportCSV, exportJSON } = useExport()

  useEffect(() => {
    fetchTopProducts().then(setProducts).catch(console.error)
  }, [])

  const categories = ['Todos', ...new Set(products.map(p => p.category))]

  const filtered = products
    .filter(p => filterCat === 'Todos' || p.category === filterCat)
    .sort((a, b) => b[sortBy] - a[sortBy])

  const exportData = {
    labels: filtered.map(p => p.name),
    revenue: filtered.map(p => p.revenue),
    sales: filtered.map(p => p.sales),
    growth: filtered.map(p => p.growth),
  }

  return (
    <div className="card p-5 animate-fade-up d5" style={{ opacity: 0 }}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-base font-semibold text-white">Top Productos</h2>
          <p className="text-xs text-slate-500 mt-0.5">Ordenados por rendimiento</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Filtro categoría */}
          <div className="flex bg-white/4 rounded-lg p-0.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  filterCat === cat
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ordenar por */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white/5 border border-white/8 text-slate-300 text-xs
                       rounded-lg px-2.5 py-1.5 cursor-pointer"
          >
            <option value="revenue">Por ingresos</option>
            <option value="sales">Por ventas</option>
            <option value="growth">Por crecimiento</option>
          </select>

          {/* Exportar */}
          <div className="flex gap-1">
            <button
              onClick={() => exportCSV(exportData, 'productos')}
              className="px-2.5 py-1.5 rounded-lg text-xs bg-white/5 border border-white/8
                         text-slate-400 hover:bg-white/10 hover:text-white transition-all"
            >
              ↓ CSV
            </button>
            <button
              onClick={() => exportJSON(filtered, 'productos')}
              className="px-2.5 py-1.5 rounded-lg text-xs bg-white/5 border border-white/8
                         text-slate-400 hover:bg-white/10 hover:text-white transition-all"
            >
              ↓ JSON
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4">#</th>
              <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4">Producto</th>
              <th className="text-left text-xs text-slate-500 font-medium pb-3 pr-4">Categoría</th>
              <th className="text-right text-xs text-slate-500 font-medium pb-3 pr-4">Ventas</th>
              <th className="text-right text-xs text-slate-500 font-medium pb-3 pr-4">Ingresos</th>
              <th className="text-right text-xs text-slate-500 font-medium pb-3">Crecimiento</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.name} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                <td className="py-3 pr-4 font-mono text-xs text-slate-600">{String(i + 1).padStart(2, '0')}</td>
                <td className="py-3 pr-4 text-sm text-white font-medium">{p.name}</td>
                <td className="py-3 pr-4">
                  <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-500/15 text-indigo-400">
                    {p.category}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right font-mono text-sm text-slate-300">
                  {p.sales.toLocaleString('es-MX')}
                </td>
                <td className="py-3 pr-4 text-right font-mono text-sm text-white">
                  ${p.revenue.toLocaleString('es-MX')}
                </td>
                <td className="py-3 text-right">
                  <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-full ${
                    p.growth >= 0
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-red-500/15 text-red-400'
                  }`}>
                    {p.growth >= 0 ? '+' : ''}{p.growth}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-slate-600 text-sm py-8">Sin resultados para esta categoría</p>
        )}
      </div>
    </div>
  )
}
