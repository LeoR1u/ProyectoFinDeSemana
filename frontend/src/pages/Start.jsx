/** Redirección inicial según el rol de la sesión actual. */

import { Navigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'

/** Envía al capturista a la captura y al verificador a su bandeja de consulta. */
const Start = () => {
  const { usuario } = useApp()
  return <Navigate to={usuario.rol === 'verificador' ? '/verificacion' : '/contexto'} replace />
}

export default Start
