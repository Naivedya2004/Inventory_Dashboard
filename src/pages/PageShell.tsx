import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type PageShellProps = {
  title: string
  children: ReactNode
}

export function PageShell({ title, children }: PageShellProps) {
  return (
    <div className="app-shell">
      <div className="page-topbar">
        <Link to="/" className="back-link">
          Back to Dashboard
        </Link>

        <div className="page-topbar-heading">
          <h1>AI-powered Inventory Management</h1>
          <div className="page-topbar-subtitle">{title}</div>
        </div>
      </div>

      <section className="detail-panel">{children}</section>
    </div>
  )
}

