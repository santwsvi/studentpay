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
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <GraduationCap className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">StudentPay</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

        <p className="text-sm text-gray-500 text-center mt-6">
          Não tem conta?{' '}
          <Link to="/cadastro/aluno" className="text-primary font-medium hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
