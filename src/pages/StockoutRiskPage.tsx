import { StockoutRiskDetails } from '../components/StockoutRiskDetails'
import { PageShell } from './PageShell'

export function StockoutRiskPage() {
  return (
    <PageShell title="Stockout Risk & Alerts">
      <StockoutRiskDetails />
    </PageShell>
  )
}

