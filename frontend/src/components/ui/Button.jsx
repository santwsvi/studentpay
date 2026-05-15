import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary',
  secondary: 'bg-secondary text-white hover:bg-secondary-light focus-visible:ring-secondary',
  ghost: 'bg-transparent text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
  danger: 'bg-error text-white hover:bg-red-600 focus-visible:ring-error',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
}

const Button = forwardRef(function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}, ref) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-semibold
        rounded-md transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {loading ? 'Aguarde...' : children}
    </button>
  )
})

export default Button
