import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Coins } from 'lucide-react'
import api from '../services/api'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import Skeleton from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import VantagemCard from '../components/domain/VantagemCard'
import ExtratoTable from '../components/domain/ExtratoTable'

export default function DashboardAluno() {
  const [extrato, setExtrato] = useState(null)
  const [vantagens, setVantagens] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [resgatando, setResgatando] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [vantagemSelecionada, setVantagemSelecionada] = useState(null)

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    setLoadingData(true)
    try {
      const [extratoRes, vantagensRes] = await Promise.all([
        api.get('/vantagens/extrato'),
        api.get('/vantagens'),
      ])
      setExtrato(extratoRes.data)
      setVantagens(vantagensRes.data)
    } catch {
      toast.error('Erro ao carregar dados do painel')
    } finally {
      setLoadingData(false)
    }
  }

  const pedirConfirmacao = (vantagem) => {
    setVantagemSelecionada(vantagem)
    setConfirmOpen(true)
  }

  const confirmarResgate = async () => {
    if (!vantagemSelecionada) return
    setResgatando(vantagemSelecionada.id)
    try {
      const { data } = await api.post(`/vantagens/${vantagemSelecionada.id}/resgatar`)
      toast.success(`Resgate realizado! Cupom: ${data.codigo}`, { duration: 8000 })
      setConfirmOpen(false)
      setVantagemSelecionada(null)
      carregarDados()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao resgatar')
    } finally {
      setResgatando(null)
    }
  }

  if (loadingData) {
    return (
      <div className="space-y-6">
        <Skeleton variant="stat" className="w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton variant="card" count={3} />
        </div>
        <Skeleton variant="table" count={5} className="mt-4" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Painel do Aluno" />

      {/* Saldo */}
      <div className="max-w-xs">
        <StatCard
          label="Saldo"
          value={extrato?.saldoAtual ?? 0}
          icon={Coins}
        />
      </div>

      {/* Vantagens */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Vantagens Disponíveis</h2>
        {vantagens.length === 0 ? (
          <EmptyState
            icon="🎁"
            title="Nenhuma vantagem disponível"
            description="Fique de olho — novas ofertas aparecem toda semana!"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vantagens.map(v => (
              <VantagemCard
                key={v.id}
                vantagem={v}
                onResgatar={pedirConfirmacao}
                loading={resgatando === v.id}
              />
            ))}
          </div>
        )}
      </section>

      {/* Extrato */}
      <section>
        <h2 className="text-base font-bold text-gray-900 mb-4">Extrato</h2>
        <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6">
          <ExtratoTable transacoes={extrato?.transacoes || []} tipo="aluno" />
        </div>
      </section>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => { setConfirmOpen(false); setVantagemSelecionada(null) }}
        onConfirm={confirmarResgate}
        title="Resgatar vantagem"
        description={
          vantagemSelecionada
            ? `Deseja resgatar "${vantagemSelecionada.descricao}" por ${vantagemSelecionada.custoMoedas} moedas?`
            : ''
        }
        confirmLabel="Resgatar"
        variant="primary"
        loading={!!resgatando}
      />
    </div>
  )
}
