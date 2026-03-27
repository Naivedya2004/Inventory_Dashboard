import { inventoryHealthKpis } from '../mockData'
import { formatCurrency } from './detailsHelpers'

export function HealthKpisDetails() {
  return (
    <div>
      <h2>Health KPIs</h2>
      <h3 className="panel-title">Inventory Health KPIs & Alerts</h3>
      <div className="kpi-strip">
        <div className="kpi-tile">
          <span>Total Value</span>
          <strong>{formatCurrency(inventoryHealthKpis.totalValue)}</strong>
        </div>
        <div className="kpi-tile">
          <span>Average Days</span>
          <strong>{inventoryHealthKpis.avgDays.toFixed(1)} days</strong>
        </div>
        <div className="kpi-tile">
          <span>SKUs Below Safety</span>
          <strong>{inventoryHealthKpis.skusBelowSafety}</strong>
        </div>
        <div className="kpi-tile">
          <span>SKUs Needing Reorder</span>
          <strong>{inventoryHealthKpis.skusNeedingReorder}</strong>
        </div>
        <div className="kpi-tile">
          <span>Excess Value</span>
          <strong>{formatCurrency(inventoryHealthKpis.excessValue)}</strong>
        </div>
      </div>

      <ul className="notes-list">
        <li>Total Value: current rupee value of the total inventory portfolio.</li>
        <li>Avg Days: mean days-of-inventory across active SKUs in scope.</li>
        <li>Below Safety: count of SKUs where on-hand is below safety stock.</li>
        <li>Need Reorder: SKUs flagged below reorder point post lead-time demand.</li>
        <li>Excess Value: value tied up in inventory above policy thresholds.</li>
      </ul>
    </div>
  )
}
