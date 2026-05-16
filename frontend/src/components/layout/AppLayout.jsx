import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { GraduationCap, LogOut, LayoutDashboard, Menu, X } from 'lucide-react'

export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar — Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-navy text-white fixed inset-y-0 left-0 z-40">
        <div className="flex items-center gap-3 px-6 h-16 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-lg">StudentPay</span>
        </div>

        <nav className="flex-1 px-4 py-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold">
              {user?.nome?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.nome}</p>
              <p className="text-xs text-white/50 capitalize">{user?.tipoUsuario}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Sair da conta"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-navy h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <GraduationCap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-extrabold text-white">StudentPay</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white cursor-pointer"
          aria-label={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-navy text-white flex flex-col">
            <div className="flex items-center gap-3 px-6 h-14 border-b border-white/10">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="font-extrabold">StudentPay</span>
            </div>
            <nav className="flex-1 px-4 py-6">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/10 text-white text-sm font-medium"
                onClick={() => setSidebarOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </nav>
            <div className="px-4 py-4 border-t border-white/10">
              <p className="text-sm font-medium px-3 mb-1">{user?.nome}</p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 min-h-screen pt-14 md:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
