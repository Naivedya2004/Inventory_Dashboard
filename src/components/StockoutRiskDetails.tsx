import { stockoutRiskRows } from '../mockData'
import { formatCurrency, statusClass } from './detailsHelpers'

export function StockoutRiskDetails() {
  const totalValueAtRisk = stockoutRiskRows.reduce(
    (sum, row) => sum + row.valueAtRisk,
    0,
  )
  const belowSafetyCount = stockoutRiskRows.filter(
    (row) => row.statusSafety === 'BELOW_SAFETY',
  ).length

  return (
    <div>
      <h2>Stockout</h2>
      <h3 className="panel-title">Stockout Risk & Alerts</h3>
      <div className="kpi-strip">
        <div className="kpi-tile">
          <span>Total Value at Risk</span>
          <strong>{formatCurrency(totalValueAtRisk)}</strong>
        </div>
        <div className="kpi-tile">
          <span>Below Safety SKUs</span>
          <strong>{belowSafetyCount}</strong>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Location</th>
            <th>On Hand</th>
            <th>Safety Stock</th>
            <th>Days of Inventory</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {stockoutRiskRows.map((row) => (
            <tr key={row.sku + row.location}>
              <td>{row.sku}</td>
              <td>{row.location}</td>
              <td>{row.onHand}</td>
              <td>{row.safetyStock}</td>
              <td>{row.daysOfInventory.toFixed(1)}</td>
              <td>
                <span className={`status-badge ${statusClass(row.statusSafety)}`}>
                  {row.statusSafety.replace('_', ' ')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="notes-list">
        <li>Below safety means on-hand quantity is less than defined safety stock.</li>
        <li>Value-at-risk estimates the revenue/cost exposure if supply is delayed.</li>
        <li>Alerts prioritize SKUs with both low cover and high inventory value.</li>
      </ul>
    </div>
  )
}
