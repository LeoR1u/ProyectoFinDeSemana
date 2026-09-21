/**
 * Dashboard — primera pantalla protegida tras iniciar sesión.
 *
 * Muestra los datos de la sesión activa (nombre, rol y tipo de usuario) y
 * proporciona el botón de cerrar sesión. Es un placeholder: aquí se enlazarán
 * los accesos a los módulos del Consejo.
 */

import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth/useAuth'
import { ROLE_LABELS, ROLE_TYPES } from '@/config/roles'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  /** Cierra la sesión y regresa al login. */
  const handleLogout = () => {
    logout()
    navigate('/auth/login', { replace: true })
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 p-6">
      <h1 className="text-3xl font-bold text-verde-800">Bienvenido, {user.nombre}</h1>
      <p className="text-sm text-neutro-600">
        {ROLE_LABELS[user.rol]} · {ROLE_TYPES[user.rol] === 'externo' ? 'Externo' : 'Interno'} ·{' '}
        {user.correo}
      </p>
      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 rounded-lg bg-verde-500 px-5 py-2.5 font-semibold text-white transition hover:bg-verde-700"
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default Dashboard