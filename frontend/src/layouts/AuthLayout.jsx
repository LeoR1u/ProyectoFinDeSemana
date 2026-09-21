/** Layout público que conserva el panel guinda del inicio de sesión original. */

import { Outlet } from 'react-router-dom'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import logoAnam from '@/assets/logos/Logo_Hacienda_Anam.svg'

/** Presenta la pantalla de acceso con identidad institucional y diseño responsivo. */
const AuthLayout = () => (
  <>
    <div className="flex min-h-[95dvh] flex-col">
      <Header />
      {/* SVG oculto que define la curva decorativa del panel institucional. */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="curva-guinda" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 H 0.95 Q 1 0.5 0.95 1 H 0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="flex flex-1 bg-white">
        {/* Panel de marca visible en pantallas grandes. */}
        <aside className="relative hidden drop-shadow-[12px_0_30px_rgba(0,0,0,0.25)] lg:flex lg:w-1/2">
          <div
            className="flex w-full flex-col bg-gradient-to-r from-guinda-900 via-guinda-700 to-guinda-600 px-14 py-6 lg:pr-24"
            style={{ clipPath: 'url(#curva-guinda)' }}
          >
            <img src={logoAnam} alt="ANAM" className="h-15 w-full" />
            <div className="my-auto w-full text-center">
              <h1 className="text-4xl font-bold text-white">Módulo de Actas Nacionales</h1>
              <div className="mt-5 h-px w-full bg-white" />
              <p className="mt-5 text-lg leading-snug text-white">Captura y consulta local de actas para operación aduanera</p>
            </div>
          </div>
        </aside>
        <section className="flex min-h-0 flex-1 flex-col bg-white">
          {/* Versión del encabezado de marca para pantallas pequeñas. */}
          <div className="bg-gradient-to-r from-guinda-900 via-guinda-700 to-guinda-600 px-6 py-7 text-center lg:hidden">
            <img src={logoAnam} alt="ANAM" className="mx-auto mb-3 h-16 w-auto object-contain" />
            <h1 className="text-3xl font-bold text-white">Módulo de Actas Nacionales</h1>
            <div className="my-3 h-px w-full bg-white" />
            <p className="text-sm font-medium text-white">Captura y consulta local de actas</p>
          </div>
          {/* La ruta hija se centra dentro de la composición pública. */}
          <div className="flex flex-1 items-center justify-center px-4 py-8"><Outlet /></div>
        </section>
      </div>
    </div>
    <Footer />
  </>
)

export default AuthLayout
