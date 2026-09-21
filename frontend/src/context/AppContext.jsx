/**
 * Contexto global del prototipo.
 *
 * Centraliza sesión, selección en curso y actas locales para que las páginas
 * no dependan directamente de localStorage. TODO BACKEND: conservar esta API
 * pública y cambiar únicamente las funciones de src/services/localStore.js.
 */

import { createContext, useContext, useMemo, useState } from 'react'
import {
  cerrarSesionLocal,
  guardarActaLocal,
  guardarContextoLocal,
  iniciarSesionLocal,
  obtenerActasLocales,
  obtenerContextoLocal,
  obtenerSesionLocal,
} from '@/services/localStore'

/** Contexto interno; no se exporta para obligar al uso del hook descriptivo. */
const AppContext = createContext(null)

/** Provee el estado compartido a todo el router. */
export const AppProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(obtenerSesionLocal)
  const [contexto, setContexto] = useState(obtenerContextoLocal)
  const [actas, setActas] = useState(obtenerActasLocales)

  /** Inicia sesión y actualiza la interfaz con el usuario local validado. */
  const iniciarSesion = async (credenciales) => {
    const sesion = await iniciarSesionLocal(credenciales)
    setUsuario(sesion)
    return sesion
  }

  /** Cierra sesión sin eliminar las actas que el verificador debe revisar. */
  const cerrarSesion = () => {
    cerrarSesionLocal()
    setUsuario(null)
    setContexto(null)
  }

  /** Persiste las tres selecciones y permite continuar aun si se recarga la página. */
  const guardarContexto = (nuevoContexto) => {
    guardarContextoLocal(nuevoContexto)
    setContexto(nuevoContexto)
  }

  /** Genera y conserva un registro de acta local visible para el verificador. */
  const guardarActa = (datos) => {
    const acta = guardarActaLocal({ contexto, datos, usuario })
    setActas((anteriores) => [acta, ...anteriores])
    setContexto(null)
    return acta
  }

  /** Memoriza el valor para no recrearlo innecesariamente en cada render. */
  const value = useMemo(
    () => ({ usuario, contexto, actas, iniciarSesion, cerrarSesion, guardarContexto, guardarActa }),
    [usuario, contexto, actas],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

/** Hook seguro y con nombre de dominio para consumir el estado del módulo. */
export const useApp = () => {
  const contexto = useContext(AppContext)
  if (!contexto) throw new Error('useApp debe usarse dentro de AppProvider.')
  return contexto
}
