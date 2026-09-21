/**
 * authRoutes — rutas públicas del módulo de autenticación.
 *
 * Agrupa bajo el layout compartido AuthLayout todas las páginas de acceso:
 * login, y en el futuro registro y recuperación de contraseña.
 *
 * La ruta index ('/auth') redirige al login como página de bienvenida del módulo.
 */

import { Navigate } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import Login from '@/pages/auth/Login'

export const authRoutes = {
  path: '/auth',
  element: <AuthLayout />,
  children: [
    { index: true, element: <Navigate to="login" replace /> },
    { path: 'login', element: <Login />, handle: { title: 'Iniciar sesión · SIGECA' } },
    // Futuras páginas: /auth/registro, /auth/recuperar...
  ],
}