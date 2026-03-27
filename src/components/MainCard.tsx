import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type MainCardProps = {
  title: string
  subtitle: string
  kpis: { label: string; value: string }[]
  icon: ReactNode
  to: string
  isActive: boolean
}

export function MainCard({
  title,
  subtitle,
  kpis,
  icon,
  to,
  isActive,
}: MainCardProps) {
  return (
    <Link
      to={to}
      className={`main-card ${isActive ? 'is-active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="main-card-icon">{icon}</div>
      <div className="main-card-body">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="main-card-kpis">
        {kpis.map((kpi) => (
          <div className="kpi-pill" key={kpi.label}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
          </div>
        ))}
      </div>
    </Link>
  )
}
