/** Definición central de rutas del flujo local de actas. */

import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/App'
import ProtectedRoute from '@/components/ProtectedRoute'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import Login from '@/pages/Login'
import Start from '@/pages/Start'
import ContextSelection from '@/pages/ContextSelection'
import ActTypeSelection from '@/pages/ActTypeSelection'
import ActForm from '@/pages/ActForm'
import MyActs from '@/pages/MyActs'
import VerificationInbox from '@/pages/VerificationInbox'
import VerificationDetail from '@/pages/VerificationDetail'

/** Evita repetir el guard de rol en los cuatro pasos exclusivos del capturista. */
const soloCapturista = (pagina) => <ProtectedRoute rolPermitido="capturista">{pagina}</ProtectedRoute>

/** Evita que un capturista consulte por URL la bandeja del verificador. */
const soloVerificador = (pagina) => <ProtectedRoute rolPermitido="verificador">{pagina}</ProtectedRoute>

/** Compone la sección pública, el espacio autenticado y las rutas de respaldo. */
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/login',
        element: <AuthLayout />,
        children: [{ index: true, element: <Login />, handle: { title: 'Acceso · Módulo de Actas Nacionales' } }],
      },
      {
        element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
        children: [
          { index: true, element: <Start /> },
          { path: '/contexto', element: soloCapturista(<ContextSelection />), handle: { title: 'Contexto · Módulo de Actas Nacionales' } },
          { path: '/tipo-acta', element: soloCapturista(<ActTypeSelection />), handle: { title: 'Tipo de acta · Módulo de Actas Nacionales' } },
          { path: '/acta/nueva', element: soloCapturista(<ActForm />), handle: { title: 'Nueva acta · Módulo de Actas Nacionales' } },
          { path: '/mis-actas', element: soloCapturista(<MyActs />), handle: { title: 'Mis actas · Módulo de Actas Nacionales' } },
          { path: '/verificacion', element: soloVerificador(<VerificationInbox />), handle: { title: 'Verificación · Módulo de Actas Nacionales' } },
          { path: '/verificacion/:id', element: soloVerificador(<VerificationDetail />), handle: { title: 'Detalle de acta · Módulo de Actas Nacionales' } },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
