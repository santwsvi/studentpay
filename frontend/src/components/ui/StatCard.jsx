import { useEffect, useRef, useState } from 'react'

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  className = '',
  variant = 'default',
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

  const isGradient = variant === 'gradient'

  return (
    <div className={`rounded-xl p-5 ${
      isGradient
        ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg'
        : 'bg-white border border-gray-300 shadow-sm'
    } ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <span className={`text-sm font-medium ${isGradient ? 'text-white/80' : 'text-gray-500'}`}>{label}</span>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            isGradient ? 'bg-white/20' : 'bg-primary/10'
          }`}>
            <Icon className={`w-5 h-5 ${isGradient ? 'text-white' : 'text-primary'}`} />
          </div>
        )}
      </div>
      <p ref={ref} className={`text-3xl font-extrabold ${isGradient ? 'text-white' : 'text-gray-900'}`}>
        {displayValue}
      </p>
      {trend && (
        <span className={`inline-flex items-center text-xs font-medium mt-1 ${
          isGradient
            ? 'text-white/70'
            : trend.startsWith('+') ? 'text-success' : 'text-error'
        }`}>
          {trend}
        </span>
      )}
    </div>
  )
}
