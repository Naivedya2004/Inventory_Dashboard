import {
  excessInventoryRows,
  forecastAccuracyRows,
  inventorySnapshotRows,
  replenishmentOrderRows,
  replenishmentProjectionRows,
  serviceImpactRows,
  stockoutRiskRows,
  type ForecastAccuracyRow,
  type ServiceImpactRow,
} from '../mockData'

export type AiInsight = {
  id: string
  text: string
}

export type AiInsightsPayload = {
  title: string
  subtitle: string
  bullets: string[]
}

const formatCurrency = (value: number) =>
  value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })

export function computeAiInventorySnapshotInsights(): AiInsightsPayload {
  const totalValue = inventorySnapshotRows.reduce((s, r) => s + r.inventoryValue, 0)
  const lowCover = inventorySnapshotRows.filter((r) => r.coverStatus === 'LOW_COVER')
  const highCover = inventorySnapshotRows.filter((r) => r.coverStatus === 'HIGH_COVER')
  const lowCoverValue = lowCover.reduce((s, r) => s + r.inventoryValue, 0)
  const highCoverValue = highCover.reduce((s, r) => s + r.inventoryValue, 0)

  const bullets: string[] = []
  bullets.push(
    `Rebalance working capital: shift inventory from HIGH_COVER SKUs (~${formatCurrency(
      highCoverValue,
    )}) towards LOW_COVER SKUs (~${formatCurrency(lowCoverValue)}) to protect service.`,
  )
  bullets.push(
    `Tighten policies on ${highCover.length} HIGH_COVER SKU(s): reduce reorder buffers where demand is stable to free up ~${formatCurrency(
      Math.round(highCoverValue * 0.12),
    )}.`,
  )
  bullets.push(
    `Protect revenue at risk: prioritize safety-stock recovery for ${lowCover.length} LOW_COVER SKU(s) to reduce near-term stockout exposure vs total value ${formatCurrency(
      totalValue,
    )}.`,
  )

  return {
    title: 'AI Insights (Snapshot)',
    subtitle: 'Heuristic policy suggestions (plug-in ready for ML)',
    bullets,
  }
}

export type AiForecastSummary = {
  accuracyPct: number
  modelConfidence: 'High' | 'Medium' | 'Low'
}

export function getAiForecastSummary(rows: ForecastAccuracyRow[]): AiForecastSummary {
  const avgAbsDev =
    rows.reduce((s, r) => s + Math.abs(r.deviationPct), 0) / Math.max(1, rows.length)
  const accuracyPct = Math.max(0, 100 - avgAbsDev)

  const modelConfidence: AiForecastSummary['modelConfidence'] =
    accuracyPct >= 92 ? 'High' : accuracyPct >= 85 ? 'Medium' : 'Low'

  return { accuracyPct: Number(accuracyPct.toFixed(1)), modelConfidence }
}

export type ForecastImpactSku = {
  sku: string
  absDeviationPct: number
  serviceLevelPct?: number
  stockoutEvents?: number
  reason: string
}

export function rankSkusByForecastImpact(
  forecastRows: ForecastAccuracyRow[],
  serviceRows: ServiceImpactRow[],
): ForecastImpactSku[] {
  const serviceBySku = new Map(serviceRows.map((r) => [r.sku, r]))

  return forecastRows
    .map((r) => {
      const service = serviceBySku.get(r.sku)
      const absDev = Math.abs(r.deviationPct)
      const lowService = (service?.serviceLevelPct ?? 100) < 94
      const stockouts = (service?.stockoutEvents ?? 0) >= 2

      const reasonParts = [
        `|dev| ${absDev.toFixed(1)}%`,
        service ? `service ${service.serviceLevelPct.toFixed(1)}%` : undefined,
        service ? `stockouts ${service.stockoutEvents}` : undefined,
      ].filter(Boolean)

      return {
        sku: r.sku,
        absDeviationPct: absDev,
        serviceLevelPct: service?.serviceLevelPct,
        stockoutEvents: service?.stockoutEvents,
        reason: reasonParts.join(' · ') + (lowService || stockouts ? ' → high customer impact' : ''),
        score: absDev * (lowService ? 1.25 : 1) * (stockouts ? 1.2 : 1),
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ score: _score, ...rest }) => rest)
}

export function computeAiForecastServiceInsights(): AiInsightsPayload {
  const summary = getAiForecastSummary(forecastAccuracyRows)
  const impact = rankSkusByForecastImpact(forecastAccuracyRows, serviceImpactRows)

  const bullets: string[] = []
  bullets.push(
    `Improve forecast accuracy from ${summary.accuracyPct.toFixed(
      1,
    )}% by focusing model retraining on SKUs with largest absolute deviation and low service.`,
  )
  bullets.push(
    `Reduce stockout events by prioritizing SKUs with negative deviation (under-forecast) and service-level dips; this directly raises customer fill-rate.`,
  )
  bullets.push(
    `Top “AI uplift” candidates: ${impact.map((i) => `${i.sku} (${i.reason})`).join('; ')}.`,
  )

  return {
    title: 'AI Insights (Forecast)',
    subtitle: 'Impact-ranked opportunities based on error + service signals',
    bullets,
  }
}

export function computeAiExcessInsights(): AiInsightsPayload {
  const totalExcess = excessInventoryRows.reduce((s, r) => s + r.excessValue, 0)
  const highCover = excessInventoryRows.filter((r) => r.coverStatus === 'HIGH_COVER')
  const top = [...excessInventoryRows]
    .sort((a, b) => b.excessValue - a.excessValue)
    .slice(0, 2)

  const bullets: string[] = []
  bullets.push(
    `Potential excess reduction: target ${highCover.length} HIGH_COVER SKU(s) to release ~${formatCurrency(
      Math.round(totalExcess * 0.35),
    )} working capital (heuristic).`,
  )
  bullets.push(
    `Throttle replenishment / rebalance to faster-moving channels for top excess drivers: ${top
      .map((r) => `${r.sku} (${formatCurrency(r.excessValue)})`)
      .join(', ')}.`,
  )
  bullets.push(
    `Adjust max-days targets dynamically for SKUs with persistent high cover (policy tuning beats static min/max).`,
  )

  return {
    title: 'AI Insights (Excess)',
    subtitle: 'Policy tuning suggestions from cover + excess-value signals',
    bullets,
  }
}

export function computeAiStockoutInsights(): AiInsightsPayload {
  const below = stockoutRiskRows.filter((r) => r.statusSafety === 'BELOW_SAFETY')
  const totalRisk = stockoutRiskRows.reduce((s, r) => s + r.valueAtRisk, 0)
  const top = [...below].sort((a, b) => b.valueAtRisk - a.valueAtRisk).slice(0, 2)

  const bullets: string[] = []
  bullets.push(
    `Protect service: ${below.length} SKU(s) are BELOW_SAFETY; prioritize recovery to reduce value-at-risk (~${formatCurrency(
      totalRisk,
    )}).`,
  )
  bullets.push(
    `Expedite or substitute supply for: ${top
      .map((r) => `${r.sku} (${formatCurrency(r.valueAtRisk)} at risk)`)
      .join(', ')}.`,
  )
  bullets.push(
    `Increase safety stock where repeated BELOW_SAFETY coincides with under-forecast signals (reduces recurring alerts).`,
  )

  return {
    title: 'AI Insights (Stockout)',
    subtitle: 'Risk-ranked actions based on safety breaches + value exposure',
    bullets,
  }
}

export type AiPolicyHint = {
  sku: string
  adjustmentPct: number
  direction: 'INCREASE' | 'REDUCE' | 'HOLD'
  message: string
  drivers: string[]
}

export function computeAiSafetyStockPolicyHint(sku: string): AiPolicyHint {
  const forecast = forecastAccuracyRows.find((r) => r.sku === sku)
  const service = serviceImpactRows.find((r) => r.sku === sku)
  const stockout = stockoutRiskRows.find((r) => r.sku === sku)
  const snap = inventorySnapshotRows.find((r) => r.sku === sku)
  const excess = excessInventoryRows.find((r) => r.sku === sku)

  const drivers: string[] = []
  const dev = forecast?.deviationPct ?? 0
  const belowSafety = stockout?.statusSafety === 'BELOW_SAFETY'
  const manyStockouts = (service?.stockoutEvents ?? 0) >= 2

  const highCoverOrExcess =
    snap?.coverStatus === 'HIGH_COVER' || (excess?.excessValue ?? 0) > 50000

  if (dev <= -8) drivers.push('under-forecast')
  if (dev >= 8) drivers.push('over-forecast')
  if (belowSafety) drivers.push('below safety')
  if (manyStockouts) drivers.push('recurring stockouts')
  if (highCoverOrExcess) drivers.push('high cover / excess')

  // Simple “AI-inspired” heuristic.
  if ((dev <= -8 && belowSafety) || manyStockouts) {
    const pct = 20
    return {
      sku,
      adjustmentPct: pct,
      direction: 'INCREASE',
      message: `Increase safety stock by ~${pct}%`,
      drivers,
    }
  }

  if (dev >= 8 && highCoverOrExcess) {
    const pct = 15
    return {
      sku,
      adjustmentPct: -pct,
      direction: 'REDUCE',
      message: `Reduce safety stock by ~${pct}%`,
      drivers,
    }
  }

  return {
    sku,
    adjustmentPct: 0,
    direction: 'HOLD',
    message: 'Keep safety stock (no change)',
    drivers: drivers.length ? drivers : ['stable signals'],
  }
}

export function computeAiReplenishmentInsights(): AiInsightsPayload {
  const urgent = replenishmentOrderRows.filter((r) => r.priority === 'URGENT')
  const belowRop = replenishmentProjectionRows.filter((r) => r.belowRopFlag === 'BELOW_ROP')

  const bullets: string[] = []
  bullets.push(
    `Prioritize ${urgent.length} URGENT order(s) first; combine with policy hints to reduce repeat expedites.`,
  )
  bullets.push(
    `${belowRop.length} SKU(s) are projected BELOW_ROP; use AI policy hints to tune safety stock rather than only increasing order quantities.`,
  )
  bullets.push(
    `Recommendation is deterministic today (threshold rules), but structured to swap in a real ML policy model later.`,
  )

  return {
    title: 'AI Insights (Replenishment)',
    subtitle: 'Action + policy optimization (order qty + safety stock)',
    bullets,
  }
}

export type AiOptimizationSummary = {
  potentialExcessReductionValue: number
  potentialStockoutReductionSkus: number
  narrative: string
}

export function computeAiOptimizationSummary(): AiOptimizationSummary {
  const excessReduceSkus = new Set(
    excessInventoryRows
      .map((r) => r.sku)
      .filter((sku) => computeAiSafetyStockPolicyHint(sku).direction === 'REDUCE'),
  )
  const potentialExcessReductionValue = excessInventoryRows
    .filter((r) => excessReduceSkus.has(r.sku))
    .reduce((s, r) => s + r.excessValue, 0)

  const belowSafetySkus = stockoutRiskRows
    .filter((r) => r.statusSafety === 'BELOW_SAFETY')
    .map((r) => r.sku)
  const potentialStockoutReductionSkus = belowSafetySkus.filter(
    (sku) => computeAiSafetyStockPolicyHint(sku).direction === 'INCREASE',
  ).length

  return {
    potentialExcessReductionValue,
    potentialStockoutReductionSkus,
    narrative:
      'Our AI layer continuously analyzes forecast error, cover status, and safety-stock breaches to suggest dynamic policy changes, rather than static min/max rules.',
  }
}

