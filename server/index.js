import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import * as mock from '../src/data/mockData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

app.get('/api/kpis', (req, res) => {
  res.json(mock.generateKPIs())
})

app.get('/api/revenue', (req, res) => {
  const period = req.query.period || 'monthly'
  res.json(mock.generateRevenueData(period))
})

app.get('/api/users', (req, res) => {
  const period = req.query.period || 'monthly'
  res.json(mock.generateUsersData(period))
})

app.get('/api/traffic', (req, res) => {
  res.json(mock.generateTrafficData())
})

app.get('/api/top-products', (req, res) => {
  res.json(mock.generateTopProducts())
})

app.get('/api/realtime', (req, res) => {
  res.json(mock.generateRealtimePoint())
})

app.listen(PORT, () => {
  console.log(`Mock API listening on http://localhost:${PORT}`)
})
