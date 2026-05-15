const variantClasses = {
  text: 'h-4 rounded-md',
  card: 'h-40 rounded-lg',
  table: 'h-8 rounded-md',
  stat: 'h-24 rounded-lg',
}

export default function Skeleton({ variant = 'text', className = '', count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`skeleton-shimmer ${variantClasses[variant]} ${className}`}
          aria-hidden="true"
        />
      ))}
    </>
  )
}
