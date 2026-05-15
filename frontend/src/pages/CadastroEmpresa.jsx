import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import api from '../services/api'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import PageHeader from '../components/layout/PageHeader'

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
    <div className="max-w-lg mx-auto">
      <PageHeader title="Cadastro de Empresa Parceira" />

      <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Razão Social" name="nome" value={form.nome} onChange={handleChange} required />
          <Input label="Nome Fantasia" name="nomeFantasia" value={form.nomeFantasia} onChange={handleChange} />
          <Input label="CNPJ" name="cnpj" value={form.cnpj} onChange={handleChange} required />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input label="Site" name="site" value={form.site} onChange={handleChange} />
          <Input label="Login" name="login" value={form.login} onChange={handleChange} required />
          <Input label="Senha" name="senha" type="password" value={form.senha} onChange={handleChange} required />

          <Button type="submit" variant="primary" className="w-full" loading={loading}>
            Cadastrar
          </Button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Já tem conta?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}
