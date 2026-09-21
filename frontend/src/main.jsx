/**
 * main.jsx — punto de entrada de la aplicación.
 *
 * Envuelve el router con <AuthProvider> para que el estado de sesión esté
 * disponible en todo el árbol (login, guard de rutas, dashboard).
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from '@/router'
import { AuthProvider } from '@/context/auth/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)