/** Raíz visual: mantiene el título del navegador y renderiza la ruta activa. */

import { Outlet } from 'react-router-dom'
import TitleManager from '@/components/TitleManager'

/** Envuelve todas las rutas sin imponer una estructura visual adicional. */
function App() {
  return (
    <>
      <TitleManager />
      <Outlet />
    </>
  )
}

export default App
