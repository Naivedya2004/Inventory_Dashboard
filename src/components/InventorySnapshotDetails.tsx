import { inventorySnapshotRows } from '../mockData'
import { coverText, formatCurrency, formatNumber, statusClass } from './detailsHelpers'

export function InventorySnapshotDetails() {
  const totalInventoryValue = inventorySnapshotRows.reduce(
    (sum, row) => sum + row.inventoryValue,
    0,
  )
  const avgDaysOfInventory =
    inventorySnapshotRows.reduce((sum, row) => sum + row.daysOfInventory, 0) /
    inventorySnapshotRows.length

  return (
    <div>
      <h2>Snapshot</h2>
      <h3 className="panel-title">Inventory Snapshot</h3>
      <div className="kpi-strip">
        <div className="kpi-tile">
          <span>Total Inventory Value</span>
          <strong>{formatCurrency(totalInventoryValue)}</strong>
        </div>
        <div className="kpi-tile">
          <span>Average Days of Inventory</span>
          <strong>{avgDaysOfInventory.toFixed(1)} days</strong>
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
            <th>Cover Status</th>
          </tr>
        </thead>
        <tbody>
          {inventorySnapshotRows.map((row) => (
            <tr key={row.sku + row.location}>
              <td>{row.sku}</td>
              <td>{row.location}</td>
              <td>{formatNumber(row.onHand)}</td>
              <td>{formatNumber(row.safetyStock)}</td>
              <td>{row.daysOfInventory.toFixed(1)}</td>
              <td>
                <span className={`status-badge ${statusClass(row.coverStatus)}`}>
                  {coverText(row.coverStatus)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="notes-list">
        <li>Days of inventory = On-hand stock / daily demand.</li>
        <li>Cover is LOW when days-of-inventory is below safety cover threshold.</li>
        <li>Cover is HIGH when stock materially exceeds target days, else NORMAL.</li>
      </ul>
    </div>
  )
}
