# 📊 Dashboard Analytics

Panel de análisis interactivo con gráficas en tiempo real, filtros dinámicos y exportación de datos.

## Características

- 📈 **Gráficas interactivas** con Chart.js — líneas, barras, dona
- ⚡ **Tiempo real** — visitantes y páginas vistas actualizándose cada 2s
- 🔍 **Filtros dinámicos** — por período (mensual / semanal / diario) y categoría
- 📥 **Exportación** de datos en CSV y JSON
- 📊 **KPIs** — ingresos, usuarios activos, conversión y ticket promedio
- 🗂️ **Tabla Top Productos** con ordenamiento por ingresos, ventas o crecimiento
- 🌙 Diseño oscuro moderno

## Tecnologías

- React 18
- Vite 5
- Tailwind CSS 3
- Chart.js 4 + react-chartjs-2

## Instalación

```bash
npm install
npm run dev
```

## Build para producción

```bash
npm run build
```

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

## Despliegue

Opciones recomendadas para poner esto en producción:

- Vercel / Netlify: conecte el repositorio y use `npm run build` (no requiere configuración adicional para proyectos Vite).
- Docker: construir la imagen y ejecutar con nginx:

```bash
docker build -t dashboard-analytics:latest .
docker run -p 8080:80 dashboard-analytics:latest
```

- Servir desde el build local con `vite preview`:

```bash
npm run preview
```

## Backend local / API mock

Este proyecto también incluye un backend ligero en `server/index.js` que expone datos simulados como API:

```bash
npm run serve:api
```

La aplicación usa `VITE_API_URL` para conectar con el backend. Si no se configura, seguirá funcionando con datos de fallback local.

Para desarrollo local, copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Si quieres, puedo añadir un pipeline de CI/CD (GitHub Actions) para construir y desplegar automáticamente.

