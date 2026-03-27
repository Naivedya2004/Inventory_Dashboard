import { excessInventoryRows } from '../mockData'
import { formatCurrency, formatNumber } from './detailsHelpers'

export function ExcessInventoryDetails() {
  const totalExcessValue = excessInventoryRows.reduce(
    (sum, row) => sum + row.excessValue,
    0,
  )
  const highCoverSkus = excessInventoryRows.filter(
    (row) => row.coverStatus === 'HIGH_COVER',
  ).length

  return (
    <div>
      <h2>Excess</h2>
      <h3 className="panel-title">Excess Inventory</h3>
      <div className="kpi-strip">
        <div className="kpi-tile">
          <span>Total Excess Value</span>
          <strong>{formatCurrency(totalExcessValue)}</strong>
        </div>
        <div className="kpi-tile">
          <span>High Cover SKUs</span>
          <strong>{highCoverSkus}</strong>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Location</th>
            <th>Days of Inventory</th>
            <th>Max Days Target</th>
            <th>Excess Qty</th>
            <th>Excess Value</th>
          </tr>
        </thead>
        <tbody>
          {excessInventoryRows.map((row) => (
            <tr key={row.sku + row.location}>
              <td>{row.sku}</td>
              <td>{row.location}</td>
              <td>{row.daysOfInventory.toFixed(1)}</td>
              <td>{row.maxDaysTarget}</td>
              <td>{formatNumber(row.excessQty)}</td>
              <td>{formatCurrency(row.excessValue)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="notes-list">
        <li>Excess is identified where days-of-inventory exceeds max target cover.</li>
        <li>Excess qty maps the surplus units above the target stock level.</li>
        <li>Excess value = excess qty multiplied by unit valuation for each SKU.</li>
      </ul>
    </div>
  )
}
