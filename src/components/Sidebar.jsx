const NAV = [
  { icon: '▦', label: 'Dashboard',    active: true  },
  { icon: '↗', label: 'Analíticas',   active: false },
  { icon: '👤', label: 'Usuarios',    active: false },
  { icon: '📦', label: 'Productos',   active: false },
  { icon: '💰', label: 'Ingresos',    active: false },
  { icon: '⚙️', label: 'Ajustes',    active: false },
]

export default function Sidebar() {
  return (
    <aside className="w-56 flex-shrink-0 flex flex-col"
           style={{ background: '#12151f', borderRight: '1px solid rgba(255,255,255,0.05)', minHeight: '100vh' }}>

      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-sm">📊</div>
          <span className="font-semibold text-white text-sm">Analytics</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 pt-4">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest px-2 mb-2">Menú</p>
        {NAV.map(item => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm mb-0.5 transition-all text-left ${
              item.active
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/4'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
            AT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">Admin</p>
            <p className="text-[10px] text-slate-500 truncate">admin@empresa.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
