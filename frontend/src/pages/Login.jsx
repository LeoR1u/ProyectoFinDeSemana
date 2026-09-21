/**
 * Acceso local con la misma tarjeta, jerarquía y espaciado del login original.
 * Solo cambia la lógica interna: ahora valida las dos cuentas de demostración.
 */

import { useState } from 'react'
import { CircleOutline, Warning } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'

/** Renderiza la pantalla de acceso sin modificar su composición visual original. */
const Login = () => {
  const { iniciarSesion } = useApp()
  const navigate = useNavigate()
  const [datos, setDatos] = useState({ usuario: '', contrasena: '' })
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  /** El botón se habilita únicamente cuando ambos datos tienen contenido. */
  const habilitado = datos.usuario.trim() !== '' && datos.contrasena.trim() !== ''

  /** Actualiza un campo y limpia el mensaje de error anterior. */
  const cambiarDato = (evento) => {
    const { name, value } = evento.target
    setDatos((previos) => ({ ...previos, [name]: value }))
    if (error) setError('')
  }

  /** Valida las credenciales locales y dirige al inicio correspondiente por rol. */
  const enviar = async (evento) => {
    evento.preventDefault()
    if (cargando) return
    if (!habilitado) {
      setError('Completa tu usuario y tu contraseña para continuar.')
      return
    }

    setCargando(true)
    setError('')
    try {
      await iniciarSesion(datos)
      navigate('/', { replace: true })
    } catch (causa) {
      setError(causa.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col rounded-2xl border border-neutro-200 bg-white p-6 shadow-xl sm:p-8 lg:p-12">
      <h1 className="text-center text-xl font-bold text-black lg:text-2xl">Te damos la bienvenida</h1>

      <form className="mt-4 flex flex-1 flex-col justify-center space-y-2 lg:space-y-4" onSubmit={enviar}>
        {/* Mensaje global con el mismo tratamiento visual de error que el acceso previo. */}
        {error && <div className="flex items-start gap-2 rounded-md border border-error-500/30 bg-error-100 px-3 py-2 text-sm text-error-500"><Warning size={20} className="shrink-0" /><span>{error}</span></div>}

        <label className="block text-sm font-semibold text-neutro-800">
          Usuario
          <input name="usuario" value={datos.usuario} onChange={cambiarDato} autoComplete="username" placeholder="Ingresa los datos" className="mt-1 w-full rounded-lg border border-neutro-400 px-3 py-2 font-normal outline-none transition focus:border-guinda-600 focus:ring-2 focus:ring-guinda-200" />
        </label>

        <label className="block text-sm font-semibold text-neutro-800">
          Contraseña
          <div className="relative mt-1">
            <input name="contrasena" type={mostrarContrasena ? 'text' : 'password'} value={datos.contrasena} onChange={cambiarDato} autoComplete="current-password" placeholder="Ingresa los datos" className="w-full rounded-lg border border-neutro-400 px-3 py-2 pr-20 font-normal outline-none transition focus:border-guinda-600 focus:ring-2 focus:ring-guinda-200" />
            <button type="button" onClick={() => setMostrarContrasena((visible) => !visible)} className="absolute inset-y-0 right-2 text-xs font-semibold text-guinda-900 hover:underline">{mostrarContrasena ? 'Ocultar' : 'Mostrar'}</button>
          </div>
        </label>

        <button type="submit" disabled={!habilitado || cargando} className={`w-full rounded-lg py-2 font-semibold transition lg:py-2 ${habilitado ? 'cursor-pointer bg-guinda-900 text-white hover:bg-guinda-950' : 'cursor-not-allowed bg-neutro-400 text-neutro-500'}`}>
          {cargando ? <span className="flex items-center justify-center gap-2"><CircleOutline size={18} className="animate-spin" /></span> : 'Iniciar sesión'}
        </button>
      </form>

      {/* Se conserva la ubicación y el tratamiento visual del enlace original. */}
      <div className="mt-4 flex justify-between text-sm"><span className="font-medium text-guinda-900">Acceso local de demostración</span></div>
    </div>
  )
}

export default Login
