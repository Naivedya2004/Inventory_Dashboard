import { forecastAccuracyRows, serviceImpactRows } from '../mockData'
import { formatNumber } from './detailsHelpers'

export function ForecastServiceDetails() {
  return (
    <div>
      <h2>Forecast</h2>
      <h3 className="panel-title">Forecast & Service</h3>

      <h4 className="section-title">Forecast Accuracy</h4>
      <table className="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Channel</th>
            <th>Period</th>
            <th>Forecast</th>
            <th>Actual</th>
            <th>Deviation %</th>
          </tr>
        </thead>
        <tbody>
          {forecastAccuracyRows.map((row) => (
            <tr key={row.sku + row.channel}>
              <td>{row.sku}</td>
              <td>{row.channel}</td>
              <td>{row.period}</td>
              <td>{formatNumber(row.forecast)}</td>
              <td>{formatNumber(row.actual)}</td>
              <td>{row.deviationPct.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="section-title">Service Impact</h4>
      <table className="data-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Service Level %</th>
            <th>Deviation %</th>
            <th>Stockout Events</th>
          </tr>
        </thead>
        <tbody>
          {serviceImpactRows.map((row) => (
            <tr key={row.sku}>
              <td>{row.sku}</td>
              <td>{row.serviceLevelPct.toFixed(1)}%</td>
              <td>{row.deviationPct.toFixed(1)}%</td>
              <td>{row.stockoutEvents}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="helper-text">
        Deviation % = (Forecast - Actual) / Forecast x 100. Service level is the
        fulfilled-order ratio for each SKU over the selected period.
      </p>
    </div>
  )
}
