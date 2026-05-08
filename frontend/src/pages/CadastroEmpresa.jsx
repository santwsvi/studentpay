import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CadastroEmpresa() {
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [form, setForm] = useState({
    nome: '', email: '', login: '', senha: '', cnpj: '', nomeFantasia: '', site: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await api.post('/empresas', form);
      navigate('/login');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar');
    }
  };

  const inputStyle = { width: '100%', padding: '0.5rem', marginBottom: '0.5rem' };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Cadastro de Empresa Parceira</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Razão Social" value={form.nome} onChange={handleChange} required style={inputStyle} />
        <input name="nomeFantasia" placeholder="Nome Fantasia" value={form.nomeFantasia} onChange={handleChange} style={inputStyle} />
        <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required style={inputStyle} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={inputStyle} />
        <input name="site" placeholder="Site" value={form.site} onChange={handleChange} style={inputStyle} />
        <input name="login" placeholder="Login" value={form.login} onChange={handleChange} required style={inputStyle} />
        <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} required style={inputStyle} />

        <button type="submit" style={{
          width: '100%', padding: '0.75rem', background: '#e94560', color: '#fff',
          border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem'
        }}>Cadastrar</button>
      </form>
    </div>
  );
}
