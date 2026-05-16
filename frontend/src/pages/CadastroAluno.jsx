import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { GraduationCap } from 'lucide-react'
import api from '../services/api'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'

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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5">
      {/* Sidebar */}
      <div className="lg:col-span-1 bg-gradient-to-b from-primary to-secondary p-8 lg:p-10 flex flex-col items-center justify-center text-white text-center lg:min-h-screen">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-5">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold mb-2">Cadastro</h2>
        <p className="text-white/80 text-sm max-w-[200px]">Preencha seus dados para começar a acumular moedas.</p>
        <Link
          to="/cadastro/empresa"
          className="mt-8 text-xs text-white/70 hover:text-white underline transition-colors"
        >
          É empresa parceira? Cadastre-se aqui
        </Link>
      </div>

      {/* Form */}
      <div className="lg:col-span-4 bg-white px-6 sm:px-12 lg:px-16 py-10 overflow-y-auto">
        <div className="max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados Pessoais */}
            <section>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">Dados Pessoais</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2 lg:col-span-3">
                  <Input label="Nome completo" name="nome" value={form.nome} onChange={handleChange} required />
                </div>
                <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                <Input label="CPF" name="cpf" value={form.cpf} onChange={handleChange} required />
                <Input label="RG" name="rg" value={form.rg} onChange={handleChange} />
              </div>
            </section>

            {/* Acesso */}
            <section>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">Acesso</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input label="Login" name="login" value={form.login} onChange={handleChange} required />
                <Input label="Senha" name="senha" type="password" value={form.senha} onChange={handleChange} required />
                <Input label="Matrícula" name="matricula" value={form.matricula} onChange={handleChange} />
              </div>
            </section>

            {/* Instituição */}
            <section>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">Instituição</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select label="Instituição" name="instituicaoId" options={instituicaoOptions} value={form.instituicaoId} onChange={handleChange} required />
                <Select label="Curso" name="cursoId" options={cursoOptions} value={form.cursoId} onChange={handleChange} required />
              </div>
            </section>

            {/* Endereço */}
            <section>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">Endereço</h3>
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="sm:col-span-4">
                  <Input label="Logradouro" name="endereco.logradouro" value={form.endereco.logradouro} onChange={handleChange} />
                </div>
                <Input label="Número" name="endereco.numero" value={form.endereco.numero} onChange={handleChange} />
                <Input label="Compl." name="endereco.complemento" value={form.endereco.complemento} onChange={handleChange} />
                <div className="sm:col-span-2">
                  <Input label="Bairro" name="endereco.bairro" value={form.endereco.bairro} onChange={handleChange} />
                </div>
                <div className="sm:col-span-2">
                  <Input label="Cidade" name="endereco.cidade" value={form.endereco.cidade} onChange={handleChange} />
                </div>
                <Input label="UF" name="endereco.estado" value={form.endereco.estado} onChange={handleChange} />
                <Input label="CEP" name="endereco.cep" value={form.endereco.cep} onChange={handleChange} />
              </div>
            </section>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Link to="/login" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
                ← Voltar ao login
              </Link>
              <Button type="submit" variant="primary" size="lg" loading={loading}>
                Cadastrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
