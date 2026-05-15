import { useState, useEffect } from 'react';
import api from '../services/api';

export default function DashboardEmpresa() {
  const [vantagens, setVantagens] = useState([]);
  const [form, setForm] = useState({ descricao: '', fotoUrl: '', custoMoedas: '' });
  const [editando, setEditando] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    carregarVantagens();
  }, []);

  const carregarVantagens = () => {
    api.get('/vantagens/empresa').then(r => setVantagens(r.data)).catch(() => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const payload = { descricao: form.descricao, fotoUrl: form.fotoUrl, custoMoedas: parseInt(form.custoMoedas) };
      if (editando) {
        await api.put(`/vantagens/${editando}`, payload);
        setMsg('Vantagem atualizada!');
      } else {
        await api.post('/vantagens', payload);
        setMsg('Vantagem cadastrada!');
      }
      setForm({ descricao: '', fotoUrl: '', custoMoedas: '' });
      setEditando(null);
      carregarVantagens();
    } catch (err) {
      setMsg(err.response?.data?.error || 'Erro ao salvar');
    }
  };

  const editar = (v) => {
    setEditando(v.id);
    setForm({ descricao: v.descricao, fotoUrl: v.fotoUrl || '', custoMoedas: v.custoMoedas.toString() });
  };

  const inativar = async (id) => {
    try {
      await api.delete(`/vantagens/${id}`);
      setMsg('Vantagem inativada.');
      carregarVantagens();
    } catch (err) {
      setMsg(err.response?.data?.error || 'Erro ao inativar');
    }
  };

  const inputStyle = { width: '100%', padding: '0.5rem', marginBottom: '0.5rem' };

  return (
    <div>
      <h2>Painel da Empresa Parceira</h2>
      {msg && <p style={{ padding: '0.5rem', background: msg.includes('Erro') ? '#fdd' : '#dfd', borderRadius: '4px' }}>{msg}</p>}

      <section style={{ marginBottom: '2rem' }}>
        <h3>{editando ? 'Editar Vantagem' : 'Cadastrar Vantagem'}</h3>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
          <input placeholder="Descrição" value={form.descricao}
            onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))} required style={inputStyle} />
          <input placeholder="URL da foto" value={form.fotoUrl}
            onChange={e => setForm(p => ({ ...p, fotoUrl: e.target.value }))} style={inputStyle} />
          <input type="number" placeholder="Custo em moedas" min="1" value={form.custoMoedas}
            onChange={e => setForm(p => ({ ...p, custoMoedas: e.target.value }))} required style={inputStyle} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" style={{
              flex: 1, padding: '0.75rem', background: '#e94560', color: '#fff',
              border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>{editando ? 'Salvar' : 'Cadastrar'}</button>
            {editando && (
              <button type="button" onClick={() => { setEditando(null); setForm({ descricao: '', fotoUrl: '', custoMoedas: '' }); }}
                style={{ padding: '0.75rem', background: '#666', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h3>Minhas Vantagens</h3>
        {vantagens.length === 0 ? <p>Nenhuma vantagem cadastrada.</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1a1a2e', color: '#fff' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Descrição</th>
                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Custo</th>
                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '0.5rem', textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vantagens.map(v => (
                <tr key={v.id} style={{ borderBottom: '1px solid #eee', opacity: v.ativa ? 1 : 0.5 }}>
                  <td style={{ padding: '0.5rem' }}>{v.descricao}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>{v.custoMoedas} moedas</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{v.ativa ? 'Ativa' : 'Inativa'}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                    {v.ativa && (
                      <>
                        <button onClick={() => editar(v)} style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Editar</button>
                        <button onClick={() => inativar(v.id)} style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: 'red' }}>Inativar</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
