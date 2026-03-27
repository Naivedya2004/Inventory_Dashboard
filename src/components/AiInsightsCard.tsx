type AiInsightsCardProps = {
  title?: string
  subtitle?: string
  bullets: string[]
}

export function AiInsightsCard({
  title = 'AI Insights',
  subtitle = 'Recommended actions based on current KPIs',
  bullets,
}: AiInsightsCardProps) {
  return (
    <aside className="ai-card" aria-label={title}>
      <div className="ai-card-top">
        <div className="ai-chip">AI</div>
        <div>
          <div className="ai-card-title">{title}</div>
          <div className="ai-card-subtitle">{subtitle}</div>
        </div>
      </div>

      <ul className="ai-bullets">
        {bullets.slice(0, 3).map((b, idx) => (
          <li key={idx}>{b}</li>
        ))}
      </ul>
    </aside>
  )
}

