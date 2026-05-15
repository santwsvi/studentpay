import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Toaster } from 'sonner'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Outlet />
      </main>
      <Toaster position="top-right" richColors closeButton />
    </div>
  )
}
