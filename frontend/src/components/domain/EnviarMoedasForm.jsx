import { useState } from 'react'
import { Send } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'

export default function EnviarMoedasForm({ alunos, saldo, onSubmit, loading }) {
  const [form, setForm] = useState({ alunoId: '', quantidade: '', motivo: '' })
  const [errors, setErrors] = useState({})

  const alunoOptions = alunos.map(a => ({
    value: a.id,
    label: `${a.nome} (${a.cpf})`,
  }))

  const validate = () => {
    const e = {}
    if (!form.alunoId) e.alunoId = 'Selecione um aluno'
    if (!form.quantidade || parseInt(form.quantidade) < 1) e.quantidade = 'Quantidade mínima: 1'
    if (saldo !== undefined && parseInt(form.quantidade) > saldo) e.quantidade = `Saldo insuficiente (${saldo} disponíveis)`
    if (!form.motivo.trim()) e.motivo = 'Motivo é obrigatório'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      alunoId: form.alunoId,
      quantidade: parseInt(form.quantidade),
      motivo: form.motivo,
    })
    setForm({ alunoId: '', quantidade: '', motivo: '' })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Select
        label="Aluno"
        name="alunoId"
        options={alunoOptions}
        value={form.alunoId}
        onChange={(e) => setForm(p => ({ ...p, alunoId: e.target.value }))}
        placeholder="Buscar aluno..."
        searchable
        error={errors.alunoId}
        required
      />
      <Input
        label="Quantidade de moedas"
        type="number"
        min="1"
        value={form.quantidade}
        onChange={(e) => setForm(p => ({ ...p, quantidade: e.target.value }))}
        error={errors.quantidade}
        required
      />
      <Input
        label="Motivo do reconhecimento"
        type="textarea"
        value={form.motivo}
        onChange={(e) => setForm(p => ({ ...p, motivo: e.target.value }))}
        error={errors.motivo}
        required
      />
      <Button type="submit" variant="primary" className="w-full" loading={loading}>
        <Send className="w-4 h-4" />
        Enviar Moedas
      </Button>
    </form>
  )
}
