import { replenishmentOrderRows, replenishmentProjectionRows } from '../mockData'
import { formatNumber, statusClass } from './detailsHelpers'

export function ReplenishmentEngineDetails() {
  return (
    <div>
      <h2>Replenishment</h2>
      <h3 className="panel-title">Replenishment Engine</h3>

      <h4 className="section-title">Projection</h4>
      <table className="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Location</th>
            <th>On Hand</th>
            <th>Daily Demand</th>
            <th>Lead Time (days)</th>
            <th>Net After Lead Time</th>
            <th>Reorder Point</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {replenishmentProjectionRows.map((row) => (
            <tr key={row.sku + row.location}>
              <td>{row.sku}</td>
              <td>{row.location}</td>
              <td>{formatNumber(row.onHand)}</td>
              <td>{row.dailyDemand}</td>
              <td>{row.leadTimeDays}</td>
              <td>{row.netAfterLeadTime}</td>
              <td>{row.reorderPoint}</td>
              <td>
                <span className={`status-badge ${statusClass(row.belowRopFlag)}`}>
                  {row.belowRopFlag.replace('_', ' ')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="section-title">Suggested Orders</h4>
      <table className="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Location</th>
            <th>Suggested Qty</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {replenishmentOrderRows.map((row) => (
            <tr key={row.sku + row.location}>
              <td>{row.sku}</td>
              <td>{row.location}</td>
              <td>{formatNumber(row.suggestedQty)}</td>
              <td>
                <span
                  className={`status-badge ${statusClass(
                    row.priority === 'URGENT'
                      ? 'LOW_COVER'
                      : row.priority === 'NORMAL'
                        ? 'HIGH_COVER'
                        : 'NORMAL',
                  )}`}
                >
                  {row.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="helper-text">
        demandDuringLeadTime = dailyDemand x leadTimeDays, reorderPoint = demandDuringLeadTime +
        safetyStock, and gap = reorderPoint - netAfterLeadTime. Priority is set by gap size and
        safety risk.
      </p>
    </div>
  )
}
