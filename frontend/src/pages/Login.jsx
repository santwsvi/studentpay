import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const { data } = await api.post('/auth/login', { login, senha });
      doLogin(data);
      navigate('/dashboard');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h2>Login</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Login</label>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)}
            required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Senha</label>
          <input type="password" value={senha} onChange={e => setSenha(e.target.value)}
            required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <button type="submit" style={{
          width: '100%', padding: '0.75rem', background: '#e94560',
          color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer'
        }}>Entrar</button>
      </form>
    </div>
  );
}
