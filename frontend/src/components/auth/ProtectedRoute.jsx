/**
 * ProtectedRoute — guard de rutas autenticadas.
 *
 * Envuelve layouts/páginas que requieren sesión. Si el usuario no está
 * autenticado, redirige a /auth/login conservando la ubicación de origen en
 * `state.from` (para poder devolverlo después del login si se desea).
 *
 * Uso: <ProtectedRoute><MainLayout /></ProtectedRoute>
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/auth/useAuth'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }
  return children
}

export default ProtectedRoute