import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem 2rem', background: '#1a1a2e', color: '#fff'
    }}>
      <Link to="/" style={{ color: '#e94560', textDecoration: 'none', fontSize: '1.4rem', fontWeight: 'bold' }}>
        StudentPay
      </Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {!user ? (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
            <Link to="/cadastro/aluno" style={{ color: '#fff', textDecoration: 'none' }}>Cadastro Aluno</Link>
            <Link to="/cadastro/empresa" style={{ color: '#fff', textDecoration: 'none' }}>Cadastro Empresa</Link>
          </>
        ) : (
          <>
            <span>Olá, {user.nome}</span>
            <button onClick={logout} style={{
              background: '#e94560', color: '#fff', border: 'none',
              padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'
            }}>Sair</button>
          </>
        )}
      </div>
    </nav>
  );
}
