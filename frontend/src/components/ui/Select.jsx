import { useId, useState, useRef, useEffect } from 'react'

export default function Select({
  label,
  error,
  options = [],
  placeholder = 'Selecione...',
  searchable = false,
  className = '',
  value,
  onChange,
  ...props
}) {
  const generatedId = useId()
  const selectId = props.id || generatedId
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  const shouldSearch = searchable || options.length > 10

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!shouldSearch) {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-gray-900">
            {label}
          </label>
        )}
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={`
            w-full rounded-md border px-3 py-2 text-base bg-white
            transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${error ? 'border-error ring-1 ring-error' : 'border-gray-300'}
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="text-sm text-error">{error}</p>}
      </div>
    )
  }

  const filtered = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )
  const selectedLabel = options.find(o => String(o.value) === String(value))?.label || ''

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} ref={wrapperRef}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={selectId}
          type="text"
          className={`
            w-full rounded-md border px-3 py-2 text-base bg-white
            transition-colors duration-150
            placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            ${error ? 'border-error ring-1 ring-error' : 'border-gray-300'}
          `}
          placeholder={placeholder}
          value={open ? search : selectedLabel}
          onChange={e => { setSearch(e.target.value); setOpen(true) }}
          onFocus={() => { setOpen(true); setSearch('') }}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          {...props}
        />
        {open && (
          <ul
            role="listbox"
            className="absolute z-50 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-500">Nenhum resultado</li>
            ) : (
              filtered.map(opt => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={String(opt.value) === String(value)}
                  className={`
                    px-3 py-2 text-sm cursor-pointer hover:bg-gray-50
                    ${String(opt.value) === String(value) ? 'bg-primary/10 text-primary font-medium' : ''}
                  `}
                  onMouseDown={() => {
                    onChange({ target: { value: opt.value, name: props.name } })
                    setOpen(false)
                    setSearch('')
                  }}
                >
                  {opt.label}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  )
}
