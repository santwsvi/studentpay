import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import api from '../services/api'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import PageHeader from '../components/layout/PageHeader'

export default function CadastroAluno() {
  const navigate = useNavigate()
  const [instituicoes, setInstituicoes] = useState([])
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: '', email: '', login: '', senha: '', cpf: '', rg: '', matricula: '',
    instituicaoId: '', cursoId: '',
    endereco: { logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: '' }
  })

  useEffect(() => {
    api.get('/instituicoes')
      .then(r => setInstituicoes(r.data))
      .catch(() => toast.error('Erro ao carregar instituições'))
  }, [])

  useEffect(() => {
    if (form.instituicaoId) {
      api.get(`/instituicoes/${form.instituicaoId}/cursos`)
        .then(r => setCursos(r.data))
        .catch(() => toast.error('Erro ao carregar cursos'))
    } else {
      setCursos([])
    }
  }, [form.instituicaoId])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('endereco.')) {
      const field = name.split('.')[1]
      setForm(prev => ({ ...prev, endereco: { ...prev.endereco, [field]: value } }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/alunos', form)
      toast.success('Cadastro realizado! Faça login para continuar.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro ao cadastrar')
    } finally {
      setLoading(false)
    }
  }

  const instituicaoOptions = instituicoes.map(i => ({ value: i.id, label: i.nome }))
  const cursoOptions = cursos.map(c => ({ value: c.id, label: c.nome }))

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader title="Cadastro de Aluno" />

      <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados Pessoais */}
          <fieldset className="space-y-4">
            <legend className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100 mb-4 w-full">Dados Pessoais</legend>
            <Input label="Nome completo" name="nome" value={form.nome} onChange={handleChange} required />
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="CPF" name="cpf" value={form.cpf} onChange={handleChange} required />
              <Input label="RG" name="rg" value={form.rg} onChange={handleChange} />
            </div>
            <Input label="Matrícula" name="matricula" value={form.matricula} onChange={handleChange} />
          </fieldset>

          {/* Acesso */}
          <fieldset className="space-y-4">
            <legend className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100 mb-4 w-full">Acesso</legend>
            <Input label="Login" name="login" value={form.login} onChange={handleChange} required />
            <Input label="Senha" name="senha" type="password" value={form.senha} onChange={handleChange} required />
          </fieldset>

          {/* Instituição */}
          <fieldset className="space-y-4">
            <legend className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100 mb-4 w-full">Instituição</legend>
            <Select
              label="Instituição"
              name="instituicaoId"
              options={instituicaoOptions}
              value={form.instituicaoId}
              onChange={handleChange}
              required
            />
            <Select
              label="Curso"
              name="cursoId"
              options={cursoOptions}
              value={form.cursoId}
              onChange={handleChange}
              required
            />
          </fieldset>

          {/* Endereço */}
          <fieldset className="space-y-4">
            <legend className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100 mb-4 w-full">Endereço</legend>
            <Input label="Logradouro" name="endereco.logradouro" value={form.endereco.logradouro} onChange={handleChange} />
            <div className="grid grid-cols-3 gap-4">
              <Input label="Número" name="endereco.numero" value={form.endereco.numero} onChange={handleChange} />
              <div className="col-span-2">
                <Input label="Complemento" name="endereco.complemento" value={form.endereco.complemento} onChange={handleChange} />
              </div>
            </div>
            <Input label="Bairro" name="endereco.bairro" value={form.endereco.bairro} onChange={handleChange} />
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Input label="Cidade" name="endereco.cidade" value={form.endereco.cidade} onChange={handleChange} />
              </div>
              <Input label="UF" name="endereco.estado" value={form.endereco.estado} onChange={handleChange} />
            </div>
            <Input label="CEP" name="endereco.cep" value={form.endereco.cep} onChange={handleChange} />
          </fieldset>

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
