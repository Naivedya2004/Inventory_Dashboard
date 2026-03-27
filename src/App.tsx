import { type ReactNode, useMemo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MainCard } from './components/MainCard'
import {
  excessInventoryRows,
  forecastAccuracyRows,
  inventoryHealthKpis,
  inventorySnapshotRows,
  replenishmentOrderRows,
  stockoutRiskRows,
} from './mockData'
import { InventorySnapshotPage } from './pages/InventorySnapshotPage'
import { ForecastServicePage } from './pages/ForecastServicePage'
import { ExcessInventoryPage } from './pages/ExcessInventoryPage'
import { StockoutRiskPage } from './pages/StockoutRiskPage'
import { ReplenishmentEnginePage } from './pages/ReplenishmentEnginePage'
import { HealthKpisPage } from './pages/HealthKpisPage'

export type SelectedMainCard =
  | 'inventorySnapshot'
  | 'forecastService'
  | 'excessInventory'
  | 'stockoutRisk'
  | 'replenishmentEngine'
  | 'healthKpis'

type MainCardConfig = {
  id: SelectedMainCard
  title: string
  subtitle: string
  icon: ReactNode
  kpis: { label: string; value: string }[]
  to: string
}

const formatCurrency = (value: number) =>
  value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })

function App() {
  const mainCards = useMemo<MainCardConfig[]>(() => {
    const totalValue = inventorySnapshotRows.reduce(
      (sum, row) => sum + row.inventoryValue,
      0,
    )
    const lowCoverCount = inventorySnapshotRows.filter(
      (row) => row.coverStatus === 'LOW_COVER',
    ).length
    const avgDeviation =
      forecastAccuracyRows.reduce((sum, row) => sum + Math.abs(row.deviationPct), 0) /
      forecastAccuracyRows.length
    const excessValue = excessInventoryRows.reduce(
      (sum, row) => sum + row.excessValue,
      0,
    )
    const valueAtRisk = stockoutRiskRows.reduce(
      (sum, row) => sum + row.valueAtRisk,
      0,
    )
    const urgentOrders = replenishmentOrderRows.filter(
      (row) => row.priority === 'URGENT',
    ).length

    return [
      {
        id: 'inventorySnapshot',
        title: 'Inventory Snapshot',
        subtitle: 'Current stock, cover and value by SKU',
        icon: '🏬',
        to: '/inventory-snapshot',
        kpis: [
          { label: 'Total Value', value: formatCurrency(totalValue) },
          { label: 'Low Cover SKUs', value: `${lowCoverCount}` },
        ],
      },
      {
        id: 'forecastService',
        title: 'Forecast & Service',
        subtitle: 'Forecast accuracy and customer service impact',
        icon: '📋',
        to: '/forecast-service',
        kpis: [
          { label: 'Avg Deviation', value: `${avgDeviation.toFixed(1)}%` },
          { label: 'Rows', value: `${forecastAccuracyRows.length}` },
        ],
      },
      {
        id: 'excessInventory',
        title: 'Excess Inventory',
        subtitle: 'High-cover SKUs and excess value',
        icon: '📦',
        to: '/excess-inventory',
        kpis: [
          { label: 'Excess Value', value: formatCurrency(excessValue) },
          {
            label: 'High Cover',
            value: `${excessInventoryRows.filter((r) => r.coverStatus === 'HIGH_COVER').length}`,
          },
        ],
      },
      {
        id: 'stockoutRisk',
        title: 'Stockout Risk & Alerts',
        subtitle: 'Below-safety SKUs and value at risk',
        icon: '⚠️',
        to: '/stockout-risk',
        kpis: [
          { label: 'Value At Risk', value: formatCurrency(valueAtRisk) },
          {
            label: 'Below Safety',
            value: `${stockoutRiskRows.filter((row) => row.statusSafety === 'BELOW_SAFETY').length}`,
          },
        ],
      },
      {
        id: 'replenishmentEngine',
        title: 'Replenishment Engine',
        subtitle: 'Lead-time projection and suggested orders',
        icon: '⚙️',
        to: '/replenishment-engine',
        kpis: [
          { label: 'Suggested Orders', value: `${replenishmentOrderRows.length}` },
          { label: 'Urgent', value: `${urgentOrders}` },
        ],
      },
      {
        id: 'healthKpis',
        title: 'Inventory Health KPIs & Alerts',
        subtitle: 'Portfolio-level KPIs and health indicators',
        icon: '📊',
        to: '/health-kpis',
        kpis: [
          { label: 'Avg Days', value: `${inventoryHealthKpis.avgDays} d` },
          { label: 'Need Reorder', value: `${inventoryHealthKpis.skusNeedingReorder}` },
        ],
      },
    ]
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app-shell">
            <header className="app-header">
              <h1>AI-powered Inventory Management</h1>
              <p className="app-subtitle">
                This dashboard uses an AI logic layer to detect excess, stockout risk, and replenishment
                opportunities, and then suggests optimal policy changes.
              </p>
            </header>

            <section className="main-card-grid">
              {mainCards.map((card) => (
                <MainCard
                  key={card.id}
                  title={card.title}
                  subtitle={card.subtitle}
                  icon={card.icon}
                  kpis={card.kpis}
                  to={card.to}
                  isActive={card.id === 'inventorySnapshot'}
                />
              ))}
            </section>
          </div>
        }
      />

      <Route path="/inventory-snapshot" element={<InventorySnapshotPage />} />
      <Route path="/forecast-service" element={<ForecastServicePage />} />
      <Route path="/excess-inventory" element={<ExcessInventoryPage />} />
      <Route path="/stockout-risk" element={<StockoutRiskPage />} />
      <Route path="/replenishment-engine" element={<ReplenishmentEnginePage />} />
      <Route path="/health-kpis" element={<HealthKpisPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
