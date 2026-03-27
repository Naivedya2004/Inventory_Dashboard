import { forecastAccuracyRows, serviceImpactRows } from '../mockData'
import { formatNumber } from './detailsHelpers'
import { AiInsightsCard } from './AiInsightsCard'
import {
  computeAiForecastServiceInsights,
  getAiForecastSummary,
  rankSkusByForecastImpact,
} from '../ai/aiLogic'

export function ForecastServiceDetails() {
  const aiInsights = computeAiForecastServiceInsights()
  const aiSummary = getAiForecastSummary(forecastAccuracyRows)
  const impactSkus = rankSkusByForecastImpact(forecastAccuracyRows, serviceImpactRows)

  return (
    <div>
      <h2>Forecast</h2>
      <h3 className="panel-title">AI-Powered Forecast & Service</h3>

      <div className="details-grid">
        <div>
          <h4 className="section-title">AI Forecast Summary</h4>
          <div className="kpi-strip">
            <div className="kpi-tile">
              <span>Overall Forecast Accuracy</span>
              <strong>{aiSummary.accuracyPct.toFixed(1)}%</strong>
            </div>
            <div className="kpi-tile">
              <span>Model Confidence</span>
              <strong>{aiSummary.modelConfidence}</strong>
            </div>
          </div>

          <div className="helper-text" style={{ marginTop: 0 }}>
            Highest-impact SKUs to improve next:
            <ul className="notes-list" style={{ marginTop: '0.4rem' }}>
              {impactSkus.map((s) => (
                <li key={s.sku}>
                  <strong>{s.sku}</strong> — {s.reason}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <AiInsightsCard
          title={aiInsights.title}
          subtitle={aiInsights.subtitle}
          bullets={aiInsights.bullets}
        />
      </div>

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
