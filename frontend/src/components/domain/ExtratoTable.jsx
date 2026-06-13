import DataTable from '../ui/DataTable'

/**
 * Descreve uma transação no extrato de acordo com o tipo e o papel do dono
 * da carteira. O mesmo ENVIO é um débito para o professor (que envia) e um
 * crédito para o aluno (que recebe), por isso o cálculo depende de `papel`.
 */
function descreverTransacao(row, papel) {
  switch (row.tipo) {
    case 'RESGATE':
      return { label: 'Resgate', icon: '↓', debito: true }
    case 'CREDITO_SEMESTRAL':
      return { label: 'Crédito semestral', icon: '↑', debito: false }
    case 'ENVIO':
    default:
      return papel === 'professor'
        ? { label: 'Envio', icon: '↓', debito: true }
        : { label: 'Recebimento', icon: '↑', debito: false }
  }
}

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
      render: (row) => {
        const { label, icon, debito } = descreverTransacao(row, tipo)
        return (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            debito ? 'bg-error/10 text-error' : 'bg-success/10 text-success'
          }`}>
            {icon} {label}
          </span>
        )
      },
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
      render: (row) => {
        const { debito } = descreverTransacao(row, tipo)
        return (
          <span className={`font-semibold ${debito ? 'text-error' : 'text-success'}`}>
            {debito ? '-' : '+'}{row.quantidade}
          </span>
        )
      },
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
