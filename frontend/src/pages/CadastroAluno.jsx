import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CadastroAluno() {
  const navigate = useNavigate();
  const [instituicoes, setInstituicoes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [erro, setErro] = useState('');
  const [form, setForm] = useState({
    nome: '', email: '', login: '', senha: '', cpf: '', rg: '', matricula: '',
    instituicaoId: '', cursoId: '',
    endereco: { logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: '' }
  });

  useEffect(() => {
    api.get('/instituicoes').then(r => setInstituicoes(r.data));
  }, []);

  useEffect(() => {
    if (form.instituicaoId) {
      api.get(`/instituicoes/${form.instituicaoId}/cursos`).then(r => setCursos(r.data));
    } else {
      setCursos([]);
    }
  }, [form.instituicaoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('endereco.')) {
      const field = name.split('.')[1];
      setForm(prev => ({ ...prev, endereco: { ...prev.endereco, [field]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await api.post('/alunos', form);
      navigate('/login');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar');
    }
  };

  const inputStyle = { width: '100%', padding: '0.5rem', marginBottom: '0.5rem' };

  return (
    <div>
      <h2>Cadastro de Aluno</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <h3>Dados Pessoais</h3>
        <input name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} required style={inputStyle} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={inputStyle} />
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required style={inputStyle} />
        <input name="rg" placeholder="RG" value={form.rg} onChange={handleChange} style={inputStyle} />
        <input name="matricula" placeholder="Matrícula" value={form.matricula} onChange={handleChange} style={inputStyle} />

        <h3>Acesso</h3>
        <input name="login" placeholder="Login" value={form.login} onChange={handleChange} required style={inputStyle} />
        <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} required style={inputStyle} />

        <h3>Instituição</h3>
        <select name="instituicaoId" value={form.instituicaoId} onChange={handleChange} required style={inputStyle}>
          <option value="">Selecione a instituição</option>
          {instituicoes.map(i => <option key={i.id} value={i.id}>{i.nome}</option>)}
        </select>
        <select name="cursoId" value={form.cursoId} onChange={handleChange} required style={inputStyle}>
          <option value="">Selecione o curso</option>
          {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>

        <h3>Endereço</h3>
        <input name="endereco.logradouro" placeholder="Logradouro" value={form.endereco.logradouro} onChange={handleChange} style={inputStyle} />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input name="endereco.numero" placeholder="Número" value={form.endereco.numero} onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
          <input name="endereco.complemento" placeholder="Complemento" value={form.endereco.complemento} onChange={handleChange} style={{ ...inputStyle, flex: 2 }} />
        </div>
        <input name="endereco.bairro" placeholder="Bairro" value={form.endereco.bairro} onChange={handleChange} style={inputStyle} />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input name="endereco.cidade" placeholder="Cidade" value={form.endereco.cidade} onChange={handleChange} style={{ ...inputStyle, flex: 2 }} />
          <input name="endereco.estado" placeholder="UF" value={form.endereco.estado} onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
        </div>
        <input name="endereco.cep" placeholder="CEP" value={form.endereco.cep} onChange={handleChange} style={inputStyle} />

        <button type="submit" style={{
          width: '100%', padding: '0.75rem', background: '#e94560', color: '#fff',
          border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem'
        }}>Cadastrar</button>
      </form>
    </div>
  );
}
