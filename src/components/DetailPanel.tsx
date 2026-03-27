import type { SelectedMainCard } from '../App'
import { ExcessInventoryDetails } from './ExcessInventoryDetails'
import { ForecastServiceDetails } from './ForecastServiceDetails'
import { HealthKpisDetails } from './HealthKpisDetails'
import { InventorySnapshotDetails } from './InventorySnapshotDetails'
import { ReplenishmentEngineDetails } from './ReplenishmentEngineDetails'
import { StockoutRiskDetails } from './StockoutRiskDetails'

type DetailPanelProps = {
  selected: SelectedMainCard
}

export function DetailPanel({ selected }: DetailPanelProps) {
  let content = null

  switch (selected) {
    case 'inventorySnapshot':
      content = <InventorySnapshotDetails />
      break
    case 'forecastService':
      content = <ForecastServiceDetails />
      break
    case 'excessInventory':
      content = <ExcessInventoryDetails />
      break
    case 'stockoutRisk':
      content = <StockoutRiskDetails />
      break
    case 'replenishmentEngine':
      content = <ReplenishmentEngineDetails />
      break
    case 'healthKpis':
      content = <HealthKpisDetails />
      break
  }

  return <section className="detail-panel">{content}</section>
}
