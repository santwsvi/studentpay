import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import CadastroAluno from './pages/CadastroAluno';
import CadastroEmpresa from './pages/CadastroEmpresa';
import DashboardAluno from './pages/DashboardAluno';
import DashboardEmpresa from './pages/DashboardEmpresa';
import DashboardProfessor from './pages/DashboardProfessor';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { user } = useAuth();

  const getDashboard = () => {
    if (!user) return <Navigate to="/login" />;
    switch (user.tipoUsuario) {
      case 'aluno': return <DashboardAluno />;
      case 'empresa': return <DashboardEmpresa />;
      case 'professor': return <DashboardProfessor />;
      default: return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro/aluno" element={<CadastroAluno />} />
      <Route path="/cadastro/empresa" element={<CadastroEmpresa />} />
      <Route path="/dashboard" element={<PrivateRoute>{getDashboard()}</PrivateRoute>} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ maxWidth: '960px', margin: '2rem auto', padding: '0 1rem' }}>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
