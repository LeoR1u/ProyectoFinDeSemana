/**
 * useLoginForm — lógica del formulario de inicio de sesión.
 *
 * Mantiene el estado del formulario (email/contraseña), el toggle de mostrar
 * contraseña, el estado de carga, el mensaje de error y el envío.
 *
 * Se mantiene fuera de la página (Login.jsx) para que la página sea solo
 * presentación y para reutilizar el mismo patrón en futuros formularios
 * (registro, recuperación de contraseña...).
 *
 * Nota: el mock autentica con `username`; el campo visual "email" se envía
 * como `username` a la capa de servicio.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/auth/useAuth'

export const useLoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  /** Valores de los campos del formulario, indexados por id de input. */
  const [values, setValues] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  /** Actualiza el valor del input por su `id` y limpia el error previo. */
  const handleChange = (e) => {
    const { id, value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
    if (error) setError('')
  }

  /**
   * Envía el formulario: primero valida que usuario y contraseña no estén
   * vacíos (cubre el envío por teclado/Enter); luego valida contra el mock
   * y redirige a la raíz. Si falla, muestra el mensaje de error de la capa
   * de servicio.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    if (!values.username.trim() || !values.password.trim()) {
      setError('Completa tu usuario y tu contraseña para continuar.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await login({ username: values.username, password: values.password })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /** Alterna la visibilidad de la contraseña. */
  const togglePassword = () => setShowPassword((v) => !v)

  return {
    values,
    showPassword,
    error,
    loading,
    handleChange,
    handleSubmit,
    togglePassword,
  }
}