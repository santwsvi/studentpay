import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Plus, Pencil, Ban, RotateCcw } from 'lucide-react'
import api from '../services/api'
import PageHeader from '../components/layout/PageHeader'
import DataTable from '../components/ui/DataTable'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import Skeleton from '../components/ui/Skeleton'

export default function DashboardEmpresa() {
  const [vantagens, setVantagens] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [form, setForm] = useState({ descricao: '', fotoUrl: '', custoMoedas: '' })
  const [editando, setEditando] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [vantagemInativar, setVantagemInativar] = useState(null)
  const [inativando, setInativando] = useState(false)

  useEffect(() => {
    carregarVantagens()
  }, [])

  const carregarVantagens = async () => {
    setLoadingData(true)
    try {
      const { data } = await api.get('/vantagens/empresa')
      setVantagens(data)
    } catch {
      toast.error('Erro ao carregar vantagens')
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.descricao.trim() || !form.custoMoedas) {
      toast.error('Preencha descrição e custo.')
      return
    }
    setSalvando(true)
    try {
      const payload = { descricao: form.descricao, fotoUrl: form.fotoUrl, custoMoedas: parseInt(form.custoMoedas) }
      if (editando) {
        await api.put(`/vantagens/${editando}`, payload)
        toast.success('Vantagem atualizada!')
      } else {
        await api.post('/vantagens', payload)
        toast.success('Vantagem cadastrada!')
      }
      resetForm()
      carregarVantagens()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao salvar')
    } finally {
      setSalvando(false)
    }
  }

  const resetForm = () => {
    setForm({ descricao: '', fotoUrl: '', custoMoedas: '' })
    setEditando(null)
    setShowForm(false)
  }

  const editar = (v) => {
    setEditando(v.id)
    setForm({ descricao: v.descricao, fotoUrl: v.fotoUrl || '', custoMoedas: v.custoMoedas.toString() })
    setShowForm(true)
  }

  const pedirInativacao = (v) => {
    setVantagemInativar(v)
    setConfirmOpen(true)
  }

  const confirmarInativacao = async () => {
    if (!vantagemInativar) return
    setInativando(true)
    try {
      await api.delete(`/vantagens/${vantagemInativar.id}`)
      toast.success('Vantagem inativada.')
      setConfirmOpen(false)
      setVantagemInativar(null)
      carregarVantagens()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao inativar')
    } finally {
      setInativando(false)
    }
  }

  const columns = [
    { key: 'descricao', label: 'Descrição' },
    {
      key: 'custoMoedas',
      label: 'Custo',
      align: 'right',
      render: (row) => <span className="font-medium">{row.custoMoedas} moedas</span>,
    },
    {
      key: 'ativa',
      label: 'Status',
      align: 'center',
      render: (row) => (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
          row.ativa ? 'bg-success/10 text-success' : 'bg-gray-200 text-gray-500'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${row.ativa ? 'bg-success' : 'bg-gray-500'}`} />
          {row.ativa ? 'Ativa' : 'Inativa'}
        </span>
      ),
    },
    {
      key: 'acoes',
      label: 'Ações',
      align: 'center',
      render: (row) =>
        row.ativa ? (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => editar(row)}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              aria-label={`Editar ${row.descricao}`}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => pedirInativacao(row)}
              className="p-1.5 rounded-md hover:bg-error/10 text-gray-500 hover:text-error transition-colors cursor-pointer"
              aria-label={`Inativar ${row.descricao}`}
            >
              <Ban className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        ),
    },
  ]

  if (loadingData) {
    return (
      <div className="space-y-6">
        <Skeleton variant="stat" className="w-48" />
        <Skeleton variant="table" count={5} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Minhas Vantagens">
        {!showForm && (
          <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" />
            Nova Vantagem
          </Button>
        )}
      </PageHeader>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {editando ? 'Editar Vantagem' : 'Criar Vantagem'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <Input
              label="Descrição"
              value={form.descricao}
              onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))}
              required
            />
            <Input
              label="URL da Foto"
              value={form.fotoUrl}
              onChange={e => setForm(p => ({ ...p, fotoUrl: e.target.value }))}
              placeholder="https://..."
            />
            <Input
              label="Custo em moedas"
              type="number"
              min="1"
              value={form.custoMoedas}
              onChange={e => setForm(p => ({ ...p, custoMoedas: e.target.value }))}
              required
            />
            <div className="flex items-center gap-3">
              <Button type="submit" variant="primary" loading={salvando}>
                {editando ? 'Salvar' : 'Cadastrar'}
              </Button>
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Tabela */}
      <DataTable
        columns={columns}
        data={vantagens}
        ariaLabel="Vantagens cadastradas"
        emptyIcon="🏪"
        emptyTitle="Nenhuma vantagem cadastrada"
        emptyDescription="Você ainda não cadastrou nenhuma vantagem."
        emptyAction="Criar primeira vantagem"
        onEmptyAction={() => setShowForm(true)}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => { setConfirmOpen(false); setVantagemInativar(null) }}
        onConfirm={confirmarInativacao}
        title="Inativar vantagem"
        description={
          vantagemInativar
            ? `Deseja inativar "${vantagemInativar.descricao}"? Alunos não poderão mais resgatá-la.`
            : ''
        }
        confirmLabel="Inativar"
        variant="danger"
        loading={inativando}
      />
    </div>
  )
}
