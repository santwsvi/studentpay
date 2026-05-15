import { useEffect, useRef, useState } from 'react'

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplayValue(value)
      return
    }

    const duration = 600
    const start = performance.now()
    const end = value

    function animate(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [value])

  return (
    <div className={`bg-white rounded-lg border border-gray-300 p-5 shadow-sm ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>
      <p ref={ref} className="text-3xl font-extrabold text-gray-900">
        {displayValue}
      </p>
      {trend && (
        <span className={`inline-flex items-center text-xs font-medium mt-1 ${
          trend.startsWith('+') ? 'text-success' : 'text-error'
        }`}>
          {trend}
        </span>
      )}
    </div>
  )
}
