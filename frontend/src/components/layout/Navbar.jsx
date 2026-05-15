import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Menu, X, LogOut, User } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const linkClass = (path) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive(path)
        ? 'text-primary border-b-2 border-primary pb-0.5'
        : 'text-gray-200 hover:text-white'
    }`

  const guestLinks = [
    { to: '/login', label: 'Login' },
    { to: '/cadastro/aluno', label: 'Cadastro Aluno' },
    { to: '/cadastro/empresa', label: 'Cadastro Empresa' },
  ]

  return (
    <nav className="bg-navy sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/" className="text-primary font-extrabold text-xl no-underline">
          StudentPay
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!user ? (
            guestLinks.map(l => (
              <Link key={l.to} to={l.to} className={linkClass(l.to)}>{l.label}</Link>
            ))
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-200 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span>Olá, {user.nome}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-white transition-colors cursor-pointer"
                aria-label="Sair da conta"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-200 hover:text-white cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-navy border-t border-white/10 px-4 pb-4 space-y-3">
          {!user ? (
            guestLinks.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`block ${linkClass(l.to)}`}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))
          ) : (
            <>
              <div className="flex items-center gap-2 text-gray-200 text-sm py-2">
                <User className="w-4 h-4 text-primary" />
                <span>Olá, {user.nome}</span>
              </div>
              <button
                onClick={() => { logout(); setMobileOpen(false) }}
                className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-white cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
