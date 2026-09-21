/**
 * mainRoutes — rutas principales protegidas de la aplicación.
 *
 * Todo el árbol tras el login vive dentro de <ProtectedRoute> + <MainLayout>,
 * de modo que basta con un solo guard para proteger los futuros módulos
 * (expedientes, votaciones, plazos...).
 */

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import MainLayout from '@/layouts/MainLayout'
import Dashboard from '@/pages/dashboard/Dashboard'

export const mainRoutes = {
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Dashboard />, handle: { title: 'Inicio · SIGECA' } },
    // Futuros módulos: expedientes, orden del día, votaciones, minutas...
  ],
}