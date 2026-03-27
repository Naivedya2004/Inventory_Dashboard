import { inventoryHealthKpis } from '../mockData'
import { formatCurrency } from './detailsHelpers'
import { AiInsightsCard } from './AiInsightsCard'
import { computeAiOptimizationSummary } from '../ai/aiLogic'

export function HealthKpisDetails() {
  const summary = computeAiOptimizationSummary()

  return (
    <div>
      <h2>Health KPIs</h2>
      <h3 className="panel-title">AI Inventory Health Optimization</h3>
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

      <div className="details-grid">
        <div className="ai-summary">
          <h4 className="section-title">AI Optimization Summary</h4>
          <div className="kpi-strip">
            <div className="kpi-tile">
              <span>Potential excess reduction</span>
              <strong>{formatCurrency(summary.potentialExcessReductionValue)}</strong>
            </div>
            <div className="kpi-tile">
              <span>Potential stockout reduction</span>
              <strong>{summary.potentialStockoutReductionSkus} SKU(s)</strong>
            </div>
          </div>
          <p className="helper-text">{summary.narrative}</p>
        </div>

        <AiInsightsCard
          title="AI Insights (Health)"
          subtitle="Portfolio-level optimization suggestions"
          bullets={[
            `Reduce excess by tuning safety stock down on SKUs where AI flags over-forecast + high cover.`,
            `Reduce stockouts by tuning safety stock up on SKUs where AI flags under-forecast + below-safety breaches.`,
            `Track impact weekly: excess value vs service level improvements as policies adapt.`,
          ]}
        />
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
