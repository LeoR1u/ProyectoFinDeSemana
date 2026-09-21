/**
 * Router central de SIGECA.
 *
 * Compone el árbol de rutas de la aplicación juntando las definiciones por
 * módulo (auth.routes, main.routes). Se exporta `router` para que main.jsx se
 * mantenga mínimo y sin lógica de enrutado.
 *
 * El catch-all (*) redirige a la raíz, que a su vez resuelve a /auth/login si
 * no hay sesión (vía ProtectedRoute) o al Dashboard si la hay.
 */

import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/App'
import { authRoutes } from '@/router/auth.routes'
import { mainRoutes } from '@/router/main.routes'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      authRoutes,
      mainRoutes,
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])