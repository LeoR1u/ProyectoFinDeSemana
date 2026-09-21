/**
 * AuthLayout — layout compartido de las páginas de autenticación.
 *
 * Compone la estructura visual de /auth/* : el Header institucional superior,
 * la franja decorativa, un panel de marca a la izquierda (solo pantallas
 * grandes) y un banner + área centrada a la derecha donde se renderizan las
 * páginas hijas (Login, etc.).
 */

import { Outlet } from 'react-router-dom'
import Header from '@/components/layouts/Header'
import logoTipoColor from '@/assets/logos/Logo_Hacienda_Anam.svg'
import Footer from '@/components/layouts/Footer'

const AuthLayout = () => {
  return (
    <>
      <div className='flex min-h-[95dvh] flex-col'>
        {/* Barra institucional superior con menú responsive */}
        <Header />

        {/* SVG oculto: define la forma de paréntesis ) */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <clipPath id="curva-guinda" clipPathUnits="objectBoundingBox">
              <path d="M 0 0 H 0.95 Q 1 0.5 0.95 1 H 0 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="flex min-h-0 flex-1 bg-white">
          {/* Panel izquierdo de marca — solo en pantallas grandes */}
          <div className="relative hidden drop-shadow-[12px_0_30px_rgba(0,0,0,0.4)] lg:flex lg:w-1/2">
            <div
              className="flex h-full w-full flex-col justify-start bg-gradient-to-r from-guinda-900 via-guinda-700 to-guinda-600 px-14 py-5 lg:pr-24"
              style={{ clipPath: 'url(#curva-guinda)' }}
            >
              <img src={logoTipoColor} alt="ANAM" className="h-15 w-full" />

              <div className="my-auto w-full text-center">
                <h1 className="text-5xl font-bold text-white">SIGECA</h1>
                <div className="mt-5 h-px w-full bg-white" />
                <p className="mt-5 text-lg leading-snug text-white">
                  Sistema de Gestión Electrónico de Consejo Aduanero
                </p>
              </div>
            </div>
          </div>

          {/* Panel derecho: banner móvil + contenido de la página */}
          <div className="flex min-h-0 flex-1 flex-col bg-white">
            <div className="bg-gradient-to-r from-guinda-900 via-guinda-700 to-guinda-600 px-6 pb-8 text-center lg:hidden">
              <img
                src={logoTipoColor}
                alt="ANAM"
                className="mx-auto mb-3 h-20 w-auto object-contain"
              />

              <h1 className="mt-1 text-3xl font-bold text-white">SIGECA</h1>
              <div className="my-3 h-px w-full bg-white" />
              <p className="text-sm font-medium text-white">
                Sistema de Gestión Electrónico de Consejo Aduanero
              </p>
            </div>

            {/* Contenido centrado por la ruta hija */}
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-4 py-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div> 

      <Footer />
    </>
  )
}
export default AuthLayout