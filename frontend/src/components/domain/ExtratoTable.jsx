import DataTable from '../ui/DataTable'

export default function ExtratoTable({ transacoes, tipo = 'aluno' }) {
  const columns = [
    {
      key: 'dataHora',
      label: 'Data',
      render: (row) => new Date(row.dataHora).toLocaleString('pt-BR'),
    },
    {
      key: 'tipo',
      label: 'Tipo',
      render: (row) => (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
          row.tipo === 'RESGATE'
            ? 'bg-error/10 text-error'
            : 'bg-success/10 text-success'
        }`}>
          {row.tipo === 'RESGATE' ? '↓ Resgate' : '↑ Recebimento'}
        </span>
      ),
    },
    {
      key: 'descricao',
      label: 'Descrição',
    },
    ...(tipo === 'professor' ? [{
      key: 'contraparte',
      label: 'Destinatário',
    }] : []),
    {
      key: 'quantidade',
      label: 'Moedas',
      align: 'right',
      render: (row) => (
        <span className={`font-semibold ${
          row.tipo === 'RESGATE' || tipo === 'professor' ? 'text-error' : 'text-success'
        }`}>
          {row.tipo === 'RESGATE' || tipo === 'professor' ? '-' : '+'}{row.quantidade}
        </span>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={transacoes}
      ariaLabel="Extrato de transações"
      emptyIcon="📜"
      emptyTitle="Nenhuma transação registrada"
      emptyDescription="Seu extrato aparecerá aqui assim que você receber ou usar moedas."
    />
  )
}
