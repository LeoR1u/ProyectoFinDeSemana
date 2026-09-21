/** Pantalla de acceso con validación exclusivamente local para esta etapa. */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'

/** Permite entrar como capturista o verificador sin requerir backend. */
const Login = () => {
  const { iniciarSesion } = useApp()
  const navigate = useNavigate()
  const [datos, setDatos] = useState({ usuario: '', contrasena: '' })
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  /** Sincroniza un campo y borra cualquier error anterior. */
  const cambiarDato = (evento) => {
    const { name, value } = evento.target
    setDatos((previos) => ({ ...previos, [name]: value }))
    setError('')
  }

  /** Valida localmente y dirige al inicio correspondiente según el rol. */
  const enviar = async (evento) => {
    evento.preventDefault()
    if (enviando) return
    if (!datos.usuario.trim() || !datos.contrasena) {
      setError('Completa el usuario y la contraseña para continuar.')
      return
    }

    setEnviando(true)
    try {
      await iniciarSesion(datos)
      navigate('/', { replace: true })
    } catch (causa) {
      setError(causa.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-neutro-400 bg-white p-6 shadow-xl sm:p-9">
      <p className="text-sm font-semibold text-guinda-900">Acceso al sistema</p>
      <h2 className="mt-1 text-2xl font-bold text-neutro-800">Iniciar sesión</h2>
      <p className="mt-2 text-sm text-neutro-600">Ingresa tus credenciales para continuar.</p>

      <form className="mt-6 space-y-4" onSubmit={enviar} noValidate>
        {error && <p className="rounded-md border border-error-500/30 bg-error-100 px-3 py-2 text-sm text-error-500">{error}</p>}
        <label className="block text-sm font-semibold text-neutro-800">
          Usuario
          <input
            name="usuario"
            value={datos.usuario}
            onChange={cambiarDato}
            autoComplete="username"
            placeholder="Ingresa tu usuario"
            className="mt-1.5 w-full rounded-lg border border-neutro-400 px-3 py-2.5 font-normal outline-none transition focus:border-guinda-600 focus:ring-2 focus:ring-guinda-200"
          />
        </label>
        <label className="block text-sm font-semibold text-neutro-800">
          Contraseña
          <div className="relative mt-1.5">
            <input
              name="contrasena"
              type={mostrarContrasena ? 'text' : 'password'}
              value={datos.contrasena}
              onChange={cambiarDato}
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
              className="w-full rounded-lg border border-neutro-400 px-3 py-2.5 pr-20 font-normal outline-none transition focus:border-guinda-600 focus:ring-2 focus:ring-guinda-200"
            />
            <button
              type="button"
              onClick={() => setMostrarContrasena((visible) => !visible)}
              className="absolute inset-y-0 right-2 text-xs font-semibold text-guinda-900 hover:underline"
            >
              {mostrarContrasena ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </label>
        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-lg bg-guinda-900 py-2.5 font-semibold text-white transition hover:bg-guinda-950 disabled:cursor-wait disabled:opacity-60"
        >
          {enviando ? 'Validando…' : 'Iniciar sesión'}
        </button>
      </form>

      {/* Estas cuentas se deben retirar al conectar el endpoint real de acceso. */}
      <div className="mt-6 rounded-lg bg-dorado-100 p-3 text-xs text-dorado-900">
        <p className="font-bold">Cuentas locales de demostración</p>
        <p className="mt-1">Capturista: <b>capturista / captura123</b></p>
        <p>Verificador: <b>verificador / verifica123</b></p>
      </div>
    </div>
  )
}

export default Login
