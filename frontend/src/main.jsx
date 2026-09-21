/** Punto de entrada del Módulo de Actas Nacionales. */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from '@/router'
import { AppProvider } from '@/context/AppContext'

/** El proveedor mantiene el prototipo local disponible para cada ruta. */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
