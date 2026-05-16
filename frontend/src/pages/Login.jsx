import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'sonner'
import { GraduationCap } from 'lucide-react'
import api from '../services/api'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const { login: doLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!login.trim() || !senha.trim()) {
      toast.error('Preencha login e senha.')
      return
    }
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { login, senha })
      doLogin(data)
      toast.success(`Bem-vindo, ${data.nome}!`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left — Form */}
      <div className="flex flex-col items-center justify-center px-8 sm:px-16 py-12 bg-white">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Entrar</h1>
          <p className="text-sm text-gray-500 mb-10">Acesse sua conta StudentPay</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="seu.login"
              required
              autoFocus
            />
            <Input
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
            <Button type="submit" variant="primary" className="w-full" loading={loading}>
              Entrar
            </Button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-10">
            Não tem conta?{' '}
            <Link to="/cadastro/aluno" className="text-primary font-semibold hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Gradient panel */}
      <div className="hidden md:flex flex-col items-center justify-center px-12 bg-gradient-to-br from-primary to-secondary text-white text-center">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-8">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold mb-4">Olá, Estudante!</h2>
        <p className="text-white/80 max-w-xs mb-10">
          Ganhe moedas por mérito acadêmico e troque por vantagens exclusivas de parceiros.
        </p>
        <Link
          to="/cadastro/aluno"
          className="border-2 border-white rounded-full px-10 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-primary transition-colors"
        >
          Criar Conta
        </Link>
      </div>
    </div>
  )
}
