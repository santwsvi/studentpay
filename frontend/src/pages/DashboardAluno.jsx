import { useState, useEffect } from 'react';
import api from '../services/api';

export default function DashboardAluno() {
  const [extrato, setExtrato] = useState(null);
  const [vantagens, setVantagens] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    api.get('/vantagens/extrato').then(r => setExtrato(r.data)).catch(() => {});
    api.get('/vantagens').then(r => setVantagens(r.data)).catch(() => {});
  };

  const resgatar = async (vantagemId) => {
    setMsg('');
    try {
      const { data } = await api.post(`/vantagens/${vantagemId}/resgatar`);
      setMsg(`Resgate realizado! Código do cupom: ${data.codigo}`);
      carregarDados();
    } catch (err) {
      setMsg(err.response?.data?.error || 'Erro ao resgatar');
    }
  };

  return (
    <div>
      <h2>Painel do Aluno</h2>
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
        <h3>Vantagens Disponíveis</h3>
        {vantagens.length === 0 ? <p>Nenhuma vantagem disponível.</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {vantagens.map(v => (
              <div key={v.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', background: '#fff' }}>
                {v.fotoUrl && <img src={v.fotoUrl} alt={v.descricao} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />}
                <h4 style={{ margin: '0.5rem 0' }}>{v.descricao}</h4>
                <p style={{ color: '#e94560', fontWeight: 'bold' }}>{v.custoMoedas} moedas</p>
                <button onClick={() => resgatar(v.id)} style={{
                  width: '100%', padding: '0.5rem', background: '#e94560', color: '#fff',
                  border: 'none', borderRadius: '4px', cursor: 'pointer'
                }}>Resgatar</button>
              </div>
            ))}
          </div>
        )}
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
                <th style={{ padding: '0.5rem', textAlign: 'right' }}>Moedas</th>
              </tr>
            </thead>
            <tbody>
              {extrato.transacoes.map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{new Date(t.dataHora).toLocaleString('pt-BR')}</td>
                  <td style={{ padding: '0.5rem' }}>{t.tipo}</td>
                  <td style={{ padding: '0.5rem' }}>{t.descricao}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', color: t.tipo === 'RESGATE' ? 'red' : 'green' }}>
                    {t.tipo === 'RESGATE' ? '-' : '+'}{t.quantidade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>Nenhuma transação registrada.</p>}
      </section>
    </div>
  );
}
