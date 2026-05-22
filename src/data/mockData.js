// Genera datos aleatorios pero consistentes para el dashboard

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randF = (min, max, dec = 1) => parseFloat((Math.random() * (max - min) + min).toFixed(dec))

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const weeks  = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8']
const days   = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export function generateRevenueData(period = 'monthly') {
  const labels = period === 'monthly' ? months : period === 'weekly' ? weeks : days
  return {
    labels,
    revenue:  labels.map(() => rand(40000, 120000)),
    expenses: labels.map(() => rand(20000, 60000)),
    profit:   labels.map(() => rand(10000, 50000)),
  }
}

export function generateUsersData(period = 'monthly') {
  const labels = period === 'monthly' ? months : period === 'weekly' ? weeks : days
  return {
    labels,
    newUsers:    labels.map(() => rand(200, 1200)),
    activeUsers: labels.map(() => rand(800, 4000)),
    churned:     labels.map(() => rand(50, 300)),
  }
}

export function generateTrafficData() {
  return {
    labels: ['Orgánico', 'Directo', 'Social', 'Email', 'Referido', 'Pago'],
    values: [rand(30, 45), rand(15, 25), rand(10, 20), rand(8, 15), rand(5, 12), rand(3, 10)],
  }
}

export function generateConversionData(period = 'monthly') {
  const labels = period === 'monthly' ? months : period === 'weekly' ? weeks : days
  return {
    labels,
    rate: labels.map(() => randF(1.5, 6.5)),
  }
}

export function generateTopProducts() {
  const products = [
    { name: 'Plan Pro Anual',      category: 'Suscripción' },
    { name: 'Plan Starter',        category: 'Suscripción' },
    { name: 'Add-on Analytics',    category: 'Módulo' },
    { name: 'Plan Enterprise',     category: 'Suscripción' },
    { name: 'Soporte Premium',     category: 'Servicio' },
    { name: 'API Access',          category: 'Módulo' },
    { name: 'White Label',         category: 'Servicio' },
  ]
  return products.map(p => ({
    ...p,
    sales:   rand(120, 980),
    revenue: rand(8000, 95000),
    growth:  randF(-8, 42),
  })).sort((a, b) => b.revenue - a.revenue)
}

export function generateKPIs() {
  return {
    totalRevenue:  { value: rand(820000, 1200000), change: randF(-5, 18) },
    activeUsers:   { value: rand(12000, 28000),    change: randF(2, 25) },
    conversionRate:{ value: randF(2.1, 5.8),       change: randF(-2, 8) },
    avgOrderValue: { value: rand(85, 320),          change: randF(-3, 12) },
  }
}

export function generateRealtimePoint() {
  return {
    time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    visitors: rand(80, 400),
    pageviews: rand(200, 900),
  }
}
