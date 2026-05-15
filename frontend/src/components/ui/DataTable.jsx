import EmptyState from './EmptyState'

export default function DataTable({
  columns,
  data,
  emptyIcon,
  emptyTitle = 'Nenhum dado encontrado',
  emptyDescription,
  emptyAction,
  onEmptyAction,
  ariaLabel,
}) {
  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon || '📋'}
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={emptyAction}
        onAction={onEmptyAction}
      />
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full" aria-label={ariaLabel}>
          <thead>
            <tr className="border-b border-gray-300">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 text-left ${col.align === 'right' ? 'text-right' : ''} ${col.align === 'center' ? 'text-center' : ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id ?? i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-sm ${col.align === 'right' ? 'text-right' : ''} ${col.align === 'center' ? 'text-center' : ''}`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="md:hidden space-y-3">
        {data.map((row, i) => (
          <div key={row.id ?? i} className="bg-white border border-gray-300 rounded-lg p-4 space-y-2">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between items-start gap-2">
                <span className="text-xs font-medium text-gray-500 uppercase">{col.label}</span>
                <span className="text-sm text-right">
                  {col.render ? col.render(row) : row[col.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
