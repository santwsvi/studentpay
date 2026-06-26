import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './context/AuthContext'
import AppLayout from './components/layout/AppLayout'
import Login from './pages/Login'
import CadastroAluno from './pages/CadastroAluno'
import CadastroEmpresa from './pages/CadastroEmpresa'
import DashboardAluno from './pages/DashboardAluno'
import DashboardEmpresa from './pages/DashboardEmpresa'
import DashboardProfessor from './pages/DashboardProfessor'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './context/AuthContext'
import AppLayout from './components/layout/AppLayout'
import Login from './pages/Login'
import CadastroAluno from './pages/CadastroAluno'
import CadastroEmpresa from './pages/CadastroEmpresa'
import DashboardAluno from './pages/DashboardAluno'
import DashboardEmpresa from './pages/DashboardEmpresa'
import DashboardProfessor from './pages/DashboardProfessor'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function AppRoutes() {
  const { user } = useAuth()

  const getDashboard = () => {
    if (!user) return <Navigate to="/login" />
    switch (user.tipoUsuario) {
      case 'aluno': return <DashboardAluno />
      case 'empresa': return <DashboardEmpresa />
      case 'professor': return <DashboardProfessor />
      default: return <Navigate to="/login" />
    }
  }

  return (
    <Routes>
      {/* Fullscreen pages — no Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro/aluno" element={<CadastroAluno />} />
      <Route path="/cadastro/empresa" element={<CadastroEmpresa />} />

      {/* App pages — with Navbar */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<PrivateRoute>{getDashboard()}</PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" richColors closeButton />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
