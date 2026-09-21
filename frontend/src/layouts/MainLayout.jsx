/** Layout protegido adaptado al flujo de actas. */

import { Outlet, useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'

/** Incluye identidad institucional, cierre de sesión y área de trabajo. */
const MainLayout = () => {
  const { usuario, cerrarSesion } = useApp()
  const navigate = useNavigate()

  /** Cierra la sesión local antes de volver al acceso. */
  const salir = () => {
    cerrarSesion()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-dvh flex-col bg-dorado-100/35">
      <Header usuario={usuario} alCerrarSesion={salir} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-8"><Outlet /></main>
      <Footer />
    </div>
  )
}

export default MainLayout
