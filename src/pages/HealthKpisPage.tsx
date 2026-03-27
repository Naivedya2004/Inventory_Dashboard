import { HealthKpisDetails } from '../components/HealthKpisDetails'
import { PageShell } from './PageShell'

export function HealthKpisPage() {
  return (
    <PageShell title="Inventory Health KPIs & Alerts">
      <HealthKpisDetails />
    </PageShell>
  )
}

