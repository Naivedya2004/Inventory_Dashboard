import type { CoverStatus } from '../mockData'

export const formatCurrency = (value: number) =>
  value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })

export const formatNumber = (value: number) => value.toLocaleString('en-IN')

export const statusClass = (status: string) => {
  if (status === 'LOW_COVER' || status === 'BELOW_SAFETY' || status === 'BELOW_ROP')
    return 'status-danger'
  if (status === 'HIGH_COVER') return 'status-warning'
  return 'status-success'
}

export const coverText = (status: CoverStatus) => status.replace('_', ' ')
