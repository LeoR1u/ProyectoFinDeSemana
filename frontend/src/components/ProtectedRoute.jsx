/** Protección de rutas para sesión y, opcionalmente, rol. */

import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '@/context/AppContext'

/** Redirige al acceso si no hay sesión y al inicio si el rol no está permitido. */
const ProtectedRoute = ({ children, rolPermitido }) => {
  const { usuario } = useApp()
  const ubicacion = useLocation()

  if (!usuario) return <Navigate to="/login" replace state={{ from: ubicacion }} />
  if (rolPermitido && usuario.rol !== rolPermitido) return <Navigate to="/" replace />
  return children
}

export default ProtectedRoute
