/**
 * AuthProvider — dueño único del estado de sesión.
 *
 * Expone vía Contexto:
 * - `user`:   objeto de la sesión o `null` si no hay sesión iniciada.
 * - `login`:  valida credenciales (contra el mock) y persiste la sesión.
 * - `logout`: cierra la sesión y la elimina del almacenamiento.
 *
 * Persistencia: la sesión se guarda en localStorage bajo la clave STORAGE_KEY.
 * ADVERTENCIA: localStorage es inseguro contra XSS; en producción el token/sesión
 * debe moverse a cookie HttpOnly (o token en memoria), tocar solo esta capa.
 */

import { useCallback, useEffect, useState } from 'react'
import { AuthContext } from '@/context/auth/authContext'
import { loginMock } from '@/services/auth/mockAuth'

/** Clave usada en localStorage para conservar la sesión entre recargas. */
const STORAGE_KEY = 'sigeca.session'

export const AuthProvider = ({ children }) => {
  /**
   * Inicializa la sesión leyendo localStorage una sola vez.
   * Si la data almacenada es inválida, se maneja el error y arranca sin sesión.
   */
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  /** Mantiene localStorage sincronizado con el estado de la sesión. */
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  /**
   * Inicia sesión con { username, password }.
   * Delega la validación en la capa de servicio (mockAuth).
   */
  const login = useCallback(async (credentials) => {
    const sessionUser = await loginMock(credentials)
    setUser(sessionUser)
    return sessionUser
  }, [])

  /** Cierra la sesión estableciendo el usuario en null. */
  const logout = useCallback(() => setUser(null), [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}