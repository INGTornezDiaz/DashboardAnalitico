import { useState, useEffect, useRef } from 'react'
import { generateRealtimePoint } from '../data/mockData'

const API_URL = import.meta.env.VITE_API_URL || ''

export function useRealtime(maxPoints = 20) {
  const [data, setData] = useState(() => {
    const initial = []
    for (let i = 0; i < 8; i++) initial.push(generateRealtimePoint())
    return initial
  })
  const [isLive, setIsLive] = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    async function fetchPoint() {
      try {
        const res = await fetch(`${API_URL}/api/realtime`)
        if (!res.ok) throw new Error('Network response not ok')
        const point = await res.json()
        setData(prev => {
          const next = [...prev, point]
          return next.length > maxPoints ? next.slice(-maxPoints) : next
        })
      } catch (e) {
        // fallback local
        setData(prev => {
          const next = [...prev, generateRealtimePoint()]
          return next.length > maxPoints ? next.slice(-maxPoints) : next
        })
      }
    }

    if (isLive) {
      if (API_URL) {
        fetchPoint()
        intervalRef.current = setInterval(fetchPoint, 2000)
      } else {
        intervalRef.current = setInterval(() => {
          setData(prev => {
            const next = [...prev, generateRealtimePoint()]
            return next.length > maxPoints ? next.slice(-maxPoints) : next
          })
        }, 2000)
      }
    }
    return () => clearInterval(intervalRef.current)
  }, [isLive, maxPoints])

  return { data, isLive, setIsLive }
}
