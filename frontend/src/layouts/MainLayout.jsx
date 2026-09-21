/**
 * MainLayout — layout principal de las rutas protegidas.
 *
 * Contenedor base de la aplicación tras el login. Por ahora solo define el
 * fondo; aquí se integrarán la barra de navegación y el sidebar de módulos.
 */

import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="min-h-dvh bg-fondo-body">
      <Outlet />
    </div>
  )
}

export default MainLayout