/**
 * useAuth — hook de acceso a la sesión de autenticación.
 *
 * Permite a cualquier componente leer el usuario actual (o null) y llamar
 * a login/logout. Debe usarse dentro de <AuthProvider> (envuelve el router).
 */

import { useContext } from 'react'
import { AuthContext } from '@/context/auth/authContext'

/**
 * @returns {{ user: object|null, login: Function, logout: Function }} Sesión actual.
 * @throws {Error} Si se usa fuera de <AuthProvider>.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}