import { useState, useEffect } from 'react';
import api from '../services/api';

export default function DashboardProfessor() {
  const [extrato, setExtrato] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({ alunoId: '', quantidade: '', motivo: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    api.get('/professores/extrato').then(r => setExtrato(r.data)).catch(() => {});
    api.get('/alunos').then(r => setAlunos(r.data)).catch(() => {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.post('/professores/enviar-moedas', {
        alunoId: form.alunoId,
        quantidade: parseInt(form.quantidade),
        motivo: form.motivo
      });
      setMsg('Moedas enviadas com sucesso!');
      setForm({ alunoId: '', quantidade: '', motivo: '' });
      carregarDados();
    } catch (err) {
      setMsg(err.response?.data?.error || 'Erro ao enviar moedas');
    }
  };

  const inputStyle = { width: '100%', padding: '0.5rem', marginBottom: '0.5rem' };

  return (
    <div>
      <h2>Painel do Professor</h2>
      {msg && <p style={{ padding: '0.5rem', background: msg.includes('Erro') ? '#fdd' : '#dfd', borderRadius: '4px' }}>{msg}</p>}

      <section style={{ marginBottom: '2rem' }}>
        <h3>Meu Saldo</h3>
        {extrato && (
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e94560' }}>
            {extrato.saldoAtual} moedas
          </p>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Enviar Moedas</h3>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
          <select name="alunoId" value={form.alunoId} onChange={e => setForm(p => ({ ...p, alunoId: e.target.value }))}
            required style={inputStyle}>
            <option value="">Selecione o aluno</option>
            {alunos.map(a => <option key={a.id} value={a.id}>{a.nome} ({a.cpf})</option>)}
          </select>
          <input type="number" placeholder="Quantidade de moedas" min="1" value={form.quantidade}
            onChange={e => setForm(p => ({ ...p, quantidade: e.target.value }))} required style={inputStyle} />
          <textarea placeholder="Motivo do reconhecimento (obrigatório)" value={form.motivo}
            onChange={e => setForm(p => ({ ...p, motivo: e.target.value }))} required
            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} />
          <button type="submit" style={{
            width: '100%', padding: '0.75rem', background: '#e94560', color: '#fff',
            border: 'none', borderRadius: '4px', cursor: 'pointer'
          }}>Enviar Moedas</button>
        </form>
      </section>

      <section>
        <h3>Extrato</h3>
        {extrato && extrato.transacoes.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1a1a2e', color: '#fff' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Data</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Tipo</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Descrição</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Destinatário</th>
                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Moedas</th>
              </tr>
            </thead>
            <tbody>
              {extrato.transacoes.map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{new Date(t.dataHora).toLocaleString('pt-BR')}</td>
                  <td style={{ padding: '0.5rem' }}>{t.tipo}</td>
                  <td style={{ padding: '0.5rem' }}>{t.descricao}</td>
                  <td style={{ padding: '0.5rem' }}>{t.contraparte}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', color: 'red' }}>-{t.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>Nenhuma transação registrada.</p>}
      </section>
    </div>
  );
}
