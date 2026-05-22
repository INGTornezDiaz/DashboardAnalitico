import * as mock from '../data/mockData'

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || ''

async function fetchApi(endpoint, fallback) {
  if (!API_URL) return fallback()

  try {
    const res = await fetch(`${API_URL}${endpoint}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (error) {
    console.warn('API fetch failed, falling back to local data:', endpoint, error)
    return fallback()
  }
}

export const fetchKpis = () => fetchApi('/api/kpis', mock.generateKPIs)
export const fetchRevenueData = (period = 'monthly') => fetchApi(`/api/revenue?period=${period}`, () => mock.generateRevenueData(period))
export const fetchUsersData = (period = 'monthly') => fetchApi(`/api/users?period=${period}`, () => mock.generateUsersData(period))
export const fetchTrafficData = () => fetchApi('/api/traffic', mock.generateTrafficData)
export const fetchTopProducts = () => fetchApi('/api/top-products', mock.generateTopProducts)
export const fetchRealtimePoint = () => fetchApi('/api/realtime', mock.generateRealtimePoint)
