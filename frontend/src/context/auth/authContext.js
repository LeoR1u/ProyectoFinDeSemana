/**
 * Objeto de contexto compartido para la sesión de autenticación.
 *
 * Se mantiene en un archivo `.js` separado del Provider y del hook para:
 * 1. No romper Fast Refresh de Vite (los archivos deben exportar solo componentes
 *    para poder refrescarse en caliente sin recargar).
 * 2. Permitir que tanto `AuthProvider` (arquitectura) como `useAuth` (hooks)
 *    consuman el mismo objeto sin dependencias circulares.
 */

import { createContext } from 'react'

/** Contexto de sesión. Su valor es `{ user, login, logout }` o `null` si no hay Provider. */
export const AuthContext = createContext(null)