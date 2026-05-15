import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Coins, Send } from 'lucide-react'
import api from '../services/api'
import PageHeader from '../components/layout/PageHeader'
import StatCard from '../components/ui/StatCard'
import Skeleton from '../components/ui/Skeleton'
import EnviarMoedasForm from '../components/domain/EnviarMoedasForm'
import ExtratoTable from '../components/domain/ExtratoTable'

export default function DashboardProfessor() {
  const [extrato, setExtrato] = useState(null)
  const [alunos, setAlunos] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    setLoadingData(true)
    try {
      const [extratoRes, alunosRes] = await Promise.all([
        api.get('/professores/extrato'),
        api.get('/alunos'),
      ])
      setExtrato(extratoRes.data)
      setAlunos(alunosRes.data)
    } catch {
      toast.error('Erro ao carregar dados do painel')
    } finally {
      setLoadingData(false)
    }
  }

  const handleEnviar = async (data) => {
    setEnviando(true)
    try {
      await api.post('/professores/enviar-moedas', data)
      const aluno = alunos.find(a => String(a.id) === String(data.alunoId))
      toast.success(`${data.quantidade} moedas enviadas para ${aluno?.nome || 'aluno'}!`)
      carregarDados()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao enviar moedas')
    } finally {
      setEnviando(false)
    }
  }

  if (loadingData) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <Skeleton variant="stat" />
          <Skeleton variant="stat" />
        </div>
        <Skeleton variant="card" className="max-w-lg" />
        <Skeleton variant="table" count={4} />
      </div>
    )
  }

  const totalEnviadas = extrato?.transacoes?.reduce((sum, t) => sum + t.quantidade, 0) ?? 0

  return (
    <div className="space-y-8">
      <PageHeader title="Painel do Professor" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
        <StatCard
          label="Saldo disponível"
          value={extrato?.saldoAtual ?? 0}
          icon={Coins}
        />
        <StatCard
          label="Moedas enviadas"
          value={totalEnviadas}
          icon={Send}
        />
      </div>

      {/* Enviar Moedas */}
      <section className="bg-white border border-gray-300 rounded-xl shadow-md p-6">
        <h2 className="text-base font-bold text-gray-900 mb-5">Enviar Moedas</h2>
        <EnviarMoedasForm
          alunos={alunos}
          saldo={extrato?.saldoAtual}
          onSubmit={handleEnviar}
          loading={enviando}
        />
      </section>

      {/* Extrato */}
      <section>
        <h2 className="text-base font-bold text-gray-900 mb-4">Histórico de Envios</h2>
        <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6">
          <ExtratoTable transacoes={extrato?.transacoes || []} tipo="professor" />
        </div>
      </section>
    </div>
  )
}
