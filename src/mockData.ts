export type CoverStatus = 'LOW_COVER' | 'NORMAL' | 'HIGH_COVER'

export type InventorySnapshotRow = {
  sku: string
  location: string
  channel: string
  onHand: number
  safetyStock: number
  dailyDemand: number
  daysOfInventory: number
  coverStatus: CoverStatus
  unitCost: number
  inventoryValue: number
}

export type ForecastAccuracyRow = {
  sku: string
  channel: string
  period: string
  forecast: number
  actual: number
  deviationPct: number
  coverStatus: CoverStatus
}

export type ServiceImpactRow = {
  sku: string
  serviceLevelPct: number
  deviationPct: number
  stockoutEvents: number
  coverStatus: CoverStatus
}

export type ExcessInventoryRow = {
  sku: string
  location: string
  daysOfInventory: number
  maxDaysTarget: number
  excessQty: number
  excessValue: number
  coverStatus: CoverStatus
}

export type StockoutRiskRow = {
  sku: string
  location: string
  onHand: number
  safetyStock: number
  daysOfInventory: number
  statusSafety: 'BELOW_SAFETY' | 'OK'
  inventoryValue: number
  valueAtRisk: number
}

export type ReplenishmentProjectionRow = {
  sku: string
  location: string
  onHand: number
  safetyStock: number
  dailyDemand: number
  leadTimeDays: number
  demandDuringLeadTime: number
  netAfterLeadTime: number
  reorderPoint: number
  belowRopFlag: 'BELOW_ROP' | 'OK'
}

export type ReplenishmentOrderRow = {
  sku: string
  location: string
  netAfterLeadTime: number
  reorderPoint: number
  gapVsReorderPoint: number
  suggestedQty: number
  statusSafety: 'BELOW_SAFETY' | 'OK'
  priority: 'URGENT' | 'NORMAL' | 'LOW'
}

export type InventoryHealthKpis = {
  totalValue: number
  avgDays: number
  skusBelowSafety: number
  skusNeedingReorder: number
  excessValue: number
}

export const inventorySnapshotRows: InventorySnapshotRow[] = [
  {
    sku: 'SKU-A100',
    location: 'Delhi DC',
    channel: 'Retail',
    onHand: 740,
    safetyStock: 420,
    dailyDemand: 34,
    daysOfInventory: 21.8,
    coverStatus: 'NORMAL',
    unitCost: 320,
    inventoryValue: 236800,
  },
  {
    sku: 'SKU-B210',
    location: 'Mumbai DC',
    channel: 'Online',
    onHand: 180,
    safetyStock: 260,
    dailyDemand: 22,
    daysOfInventory: 8.2,
    coverStatus: 'LOW_COVER',
    unitCost: 460,
    inventoryValue: 82800,
  },
  {
    sku: 'SKU-C330',
    location: 'Bengaluru Hub',
    channel: 'Wholesale',
    onHand: 1280,
    safetyStock: 500,
    dailyDemand: 26,
    daysOfInventory: 49.2,
    coverStatus: 'HIGH_COVER',
    unitCost: 275,
    inventoryValue: 352000,
  },
  {
    sku: 'SKU-D440',
    location: 'Pune FC',
    channel: 'Retail',
    onHand: 360,
    safetyStock: 300,
    dailyDemand: 18,
    daysOfInventory: 20,
    coverStatus: 'NORMAL',
    unitCost: 510,
    inventoryValue: 183600,
  },
  {
    sku: 'SKU-E550',
    location: 'Delhi DC',
    channel: 'Online',
    onHand: 95,
    safetyStock: 180,
    dailyDemand: 14,
    daysOfInventory: 6.8,
    coverStatus: 'LOW_COVER',
    unitCost: 690,
    inventoryValue: 65550,
  },
]

export const forecastAccuracyRows: ForecastAccuracyRow[] = [
  {
    sku: 'SKU-A100',
    channel: 'Retail',
    period: 'Mar-W4',
    forecast: 980,
    actual: 945,
    deviationPct: 3.6,
    coverStatus: 'NORMAL',
  },
  {
    sku: 'SKU-B210',
    channel: 'Online',
    period: 'Mar-W4',
    forecast: 640,
    actual: 702,
    deviationPct: -9.7,
    coverStatus: 'LOW_COVER',
  },
  {
    sku: 'SKU-C330',
    channel: 'Wholesale',
    period: 'Mar-W4',
    forecast: 520,
    actual: 470,
    deviationPct: 9.6,
    coverStatus: 'HIGH_COVER',
  },
  {
    sku: 'SKU-E550',
    channel: 'Online',
    period: 'Mar-W4',
    forecast: 420,
    actual: 458,
    deviationPct: -9,
    coverStatus: 'LOW_COVER',
  },
]

export const serviceImpactRows: ServiceImpactRow[] = [
  {
    sku: 'SKU-A100',
    serviceLevelPct: 97.8,
    deviationPct: 3.6,
    stockoutEvents: 0,
    coverStatus: 'NORMAL',
  },
  {
    sku: 'SKU-B210',
    serviceLevelPct: 91.2,
    deviationPct: -9.7,
    stockoutEvents: 2,
    coverStatus: 'LOW_COVER',
  },
  {
    sku: 'SKU-C330',
    serviceLevelPct: 99.3,
    deviationPct: 9.6,
    stockoutEvents: 0,
    coverStatus: 'HIGH_COVER',
  },
  {
    sku: 'SKU-E550',
    serviceLevelPct: 89.6,
    deviationPct: -9,
    stockoutEvents: 3,
    coverStatus: 'LOW_COVER',
  },
]

export const excessInventoryRows: ExcessInventoryRow[] = [
  {
    sku: 'SKU-C330',
    location: 'Bengaluru Hub',
    daysOfInventory: 49.2,
    maxDaysTarget: 35,
    excessQty: 369,
    excessValue: 101475,
    coverStatus: 'HIGH_COVER',
  },
  {
    sku: 'SKU-F660',
    location: 'Mumbai DC',
    daysOfInventory: 42.5,
    maxDaysTarget: 28,
    excessQty: 214,
    excessValue: 81200,
    coverStatus: 'HIGH_COVER',
  },
  {
    sku: 'SKU-G770',
    location: 'Delhi DC',
    daysOfInventory: 37.8,
    maxDaysTarget: 30,
    excessQty: 133,
    excessValue: 46550,
    coverStatus: 'HIGH_COVER',
  },
]

export const stockoutRiskRows: StockoutRiskRow[] = [
  {
    sku: 'SKU-B210',
    location: 'Mumbai DC',
    onHand: 180,
    safetyStock: 260,
    daysOfInventory: 8.2,
    statusSafety: 'BELOW_SAFETY',
    inventoryValue: 82800,
    valueAtRisk: 36800,
  },
  {
    sku: 'SKU-E550',
    location: 'Delhi DC',
    onHand: 95,
    safetyStock: 180,
    daysOfInventory: 6.8,
    statusSafety: 'BELOW_SAFETY',
    inventoryValue: 65550,
    valueAtRisk: 30750,
  },
  {
    sku: 'SKU-D440',
    location: 'Pune FC',
    onHand: 360,
    safetyStock: 300,
    daysOfInventory: 20,
    statusSafety: 'OK',
    inventoryValue: 183600,
    valueAtRisk: 0,
  },
  {
    sku: 'SKU-A100',
    location: 'Delhi DC',
    onHand: 740,
    safetyStock: 420,
    daysOfInventory: 21.8,
    statusSafety: 'OK',
    inventoryValue: 236800,
    valueAtRisk: 0,
  },
]

export const replenishmentProjectionRows: ReplenishmentProjectionRow[] = [
  {
    sku: 'SKU-B210',
    location: 'Mumbai DC',
    onHand: 180,
    safetyStock: 260,
    dailyDemand: 22,
    leadTimeDays: 6,
    demandDuringLeadTime: 132,
    netAfterLeadTime: 48,
    reorderPoint: 392,
    belowRopFlag: 'BELOW_ROP',
  },
  {
    sku: 'SKU-E550',
    location: 'Delhi DC',
    onHand: 95,
    safetyStock: 180,
    dailyDemand: 14,
    leadTimeDays: 5,
    demandDuringLeadTime: 70,
    netAfterLeadTime: 25,
    reorderPoint: 250,
    belowRopFlag: 'BELOW_ROP',
  },
  {
    sku: 'SKU-D440',
    location: 'Pune FC',
    onHand: 360,
    safetyStock: 300,
    dailyDemand: 18,
    leadTimeDays: 7,
    demandDuringLeadTime: 126,
    netAfterLeadTime: 234,
    reorderPoint: 426,
    belowRopFlag: 'BELOW_ROP',
  },
  {
    sku: 'SKU-A100',
    location: 'Delhi DC',
    onHand: 740,
    safetyStock: 420,
    dailyDemand: 34,
    leadTimeDays: 4,
    demandDuringLeadTime: 136,
    netAfterLeadTime: 604,
    reorderPoint: 556,
    belowRopFlag: 'OK',
  },
]

export const replenishmentOrderRows: ReplenishmentOrderRow[] = [
  {
    sku: 'SKU-B210',
    location: 'Mumbai DC',
    netAfterLeadTime: 48,
    reorderPoint: 392,
    gapVsReorderPoint: 344,
    suggestedQty: 360,
    statusSafety: 'BELOW_SAFETY',
    priority: 'URGENT',
  },
  {
    sku: 'SKU-E550',
    location: 'Delhi DC',
    netAfterLeadTime: 25,
    reorderPoint: 250,
    gapVsReorderPoint: 225,
    suggestedQty: 240,
    statusSafety: 'BELOW_SAFETY',
    priority: 'URGENT',
  },
  {
    sku: 'SKU-D440',
    location: 'Pune FC',
    netAfterLeadTime: 234,
    reorderPoint: 426,
    gapVsReorderPoint: 192,
    suggestedQty: 200,
    statusSafety: 'OK',
    priority: 'NORMAL',
  },
  {
    sku: 'SKU-H880',
    location: 'Chennai DC',
    netAfterLeadTime: 310,
    reorderPoint: 360,
    gapVsReorderPoint: 50,
    suggestedQty: 60,
    statusSafety: 'OK',
    priority: 'LOW',
  },
]

const totalValue = inventorySnapshotRows.reduce(
  (sum, row) => sum + row.inventoryValue,
  0,
)
const avgDays =
  inventorySnapshotRows.reduce((sum, row) => sum + row.daysOfInventory, 0) /
  inventorySnapshotRows.length
const skusBelowSafety = stockoutRiskRows.filter(
  (row) => row.statusSafety === 'BELOW_SAFETY',
).length
const skusNeedingReorder = replenishmentProjectionRows.filter(
  (row) => row.belowRopFlag === 'BELOW_ROP',
).length
const excessValue = excessInventoryRows.reduce(
  (sum, row) => sum + row.excessValue,
  0,
)

export const inventoryHealthKpis: InventoryHealthKpis = {
  totalValue,
  avgDays: Number(avgDays.toFixed(1)),
  skusBelowSafety,
  skusNeedingReorder,
  excessValue,
}
