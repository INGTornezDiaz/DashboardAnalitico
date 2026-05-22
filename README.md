# 📊 Dashboard Analitico

Panel de análisis interactivo con gráficas en tiempo real, filtros dinámicos y exportación de datos.

## Características

- 📈 **Gráficas interactivas** con Chart.js — líneas, barras, dona
- ⚡ **Tiempo real** — visitantes y páginas vistas actualizándose cada 2s
- 🔍 **Filtros dinámicos** — por período (mensual / semanal / diario) y categoría
- 📥 **Exportación** de datos en CSV y JSON
- 📊 **KPIs** — ingresos, usuarios activos, conversión y ticket promedio
- 🗂️ **Tabla Top Productos** con ordenamiento por ingresos, ventas o crecimiento

## Tecnologías

- React 18
- Vite 5
- Tailwind CSS 3
- Chart.js 4 + react-chartjs-2


## Estructura

```
src/
├── components/
│   ├── Sidebar.jsx         # Navegación lateral
│   ├── KPICard.jsx         # Tarjetas de métricas
│   ├── RevenueChart.jsx    # Gráfica ingresos/gastos (línea)
│   ├── UsersChart.jsx      # Gráfica usuarios (barras)
│   ├── TrafficChart.jsx    # Fuentes de tráfico (dona)
│   ├── RealtimeChart.jsx   # Visitantes en tiempo real
│   └── TopProducts.jsx     # Tabla de productos
├── hooks/
│   ├── useRealtime.js      # Actualización automática cada 2s
│   └── useExport.js        # Exportación CSV/JSON
├── data/
│   └── mockData.js         # Generador de datos de ejemplo
├── App.jsx
└── main.jsx
```


