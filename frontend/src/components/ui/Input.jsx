import { useId } from 'react'

export default function Input({
  label,
  error,
  helper,
  icon: Icon,
  className = '',
  type = 'text',
  ...props
}) {
  const generatedId = useId()
  const inputId = props.id || generatedId

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        )}
        {type === 'textarea' ? (
          <textarea
            id={inputId}
            className={`
              w-full rounded-md border px-3 py-2 text-base min-h-[80px] resize-y
              transition-colors duration-150
              placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
              disabled:bg-gray-50 disabled:cursor-not-allowed
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-error ring-1 ring-error' : 'border-gray-300'}
            `}
            {...props}
          />
        ) : (
          <input
            id={inputId}
            type={type}
            className={`
              w-full rounded-md border px-3 py-2 text-base
              transition-colors duration-150
              placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
              disabled:bg-gray-50 disabled:cursor-not-allowed
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-error ring-1 ring-error' : 'border-gray-300'}
            `}
            {...props}
          />
        )}
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
      {helper && !error && <p className="text-sm text-gray-500">{helper}</p>}
    </div>
  )
}
