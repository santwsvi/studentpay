import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Store } from 'lucide-react'
import api from '../services/api'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function CadastroEmpresa() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: '', email: '', login: '', senha: '', cnpj: '', nomeFantasia: '', site: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/empresas', form)
      toast.success('Cadastro realizado! Faça login para continuar.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left — Gradient panel */}
      <div className="hidden md:flex flex-col items-center justify-center px-12 bg-gradient-to-br from-secondary to-primary text-white text-center">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-8">
          <Store className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold mb-4">Empresa Parceira</h2>
        <p className="text-white/80 max-w-xs mb-10">
          Cadastre vantagens e atraia estudantes para o seu negócio.
        </p>
        <div className="space-y-3 text-left text-sm text-white/70 max-w-[220px]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
            Crie ofertas exclusivas
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
            Valide cupons na hora
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
            Acompanhe resgates
          </div>
        </div>
        <Link
          to="/cadastro/aluno"
          className="mt-12 border-2 border-white rounded-full px-10 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-secondary transition-colors"
        >
          Sou Aluno
        </Link>
      </div>

      {/* Right — Form */}
      <div className="flex flex-col items-center justify-center px-8 sm:px-16 py-12 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Criar conta</h1>
          <p className="text-sm text-gray-500 mb-10">Preencha os dados da empresa</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Razão Social" name="nome" value={form.nome} onChange={handleChange} required />
              <Input label="Nome Fantasia" name="nomeFantasia" value={form.nomeFantasia} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="CNPJ" name="cnpj" value={form.cnpj} onChange={handleChange} required />
              <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <Input label="Site" name="site" value={form.site} onChange={handleChange} placeholder="https://..." />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Login" name="login" value={form.login} onChange={handleChange} required />
              <Input label="Senha" name="senha" type="password" value={form.senha} onChange={handleChange} required />
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Link to="/login" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
                ← Voltar ao login
              </Link>
              <Button type="submit" variant="primary" size="lg" loading={loading}>
                Cadastrar
              </Button>
            </div>
          </form>

          <p className="text-sm text-gray-500 text-center mt-8 md:hidden">
            <Link to="/cadastro/aluno" className="text-primary font-semibold hover:underline">
              Sou aluno →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
