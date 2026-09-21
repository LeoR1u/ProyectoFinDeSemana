/**
 * Footer — pie de página institucional del sistema.
 *
 * Reutilizable en cualquier layout (auth y el futuro main):
 * es un componente 100% presentacional, sin lógica de negocio.
 *
 * Estructura en pantallas grandes (lg):
 * - Columna 1: logo institucional + sección "¿Qué es gob.mx?" (descripción
 *   y enlace "Leer más").
 * - Columna 2: sección "Enlaces" con lista de accesos (sin viñetas).
 * - Columna 3: sección "Síguenos" con iconos de redes sociales (fondo
 *   blanco redondo e icono verde-900).
 *
 * Nota: los iconos de marcas (Facebook, X, Instagram, YouTube) viven en
 * src/assets/socialIcons.jsx porque @carbon/icons-react no incluye marcas.
 */

import { useState } from 'react'
import { ChevronDown } from '@carbon/icons-react'
import gobiernoBlanco from '@/assets/logos/Logo-Gobierno-2025.svg'
import iconFlor from '@/assets/logos/icon_flower.svg'
import { FacebookIcon, XIcon, InstagramIcon, YoutubeIcon } from '@/assets/socialIcons'

const Footer = () => {
  const socialIcons = [
    { label: 'Facebook', Icon: FacebookIcon },
    { label: 'X', Icon: XIcon },
    { label: 'Instagram', Icon: InstagramIcon },
    { label: 'YouTube', Icon: YoutubeIcon },
  ]

  /* Acordeones — solo funcionan en pantallas pequeñas; en lg se ignoran. */
  const [openQueEs, setOpenQueEs] = useState(false)
  const [openEnlaces, setOpenEnlaces] = useState(false)

  return (
    <footer className="w-full bg-guinda-900 px-14 py-7 text-white">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Columna 1: logo + "¿Qué es gob.mx?" */}
        <div className="lg:flex-1">
          <img src={gobiernoBlanco} alt="ANAM" className="h-12 w-auto object-contain" />
        </div>

        <div className='flex flex-col gap-4 lg:flex-1'>
          <nav>
            <h2 className="mb-1 text-xl font-semibold">
              <button
                type="button"
                onClick={() => setOpenQueEs(v => !v)}
                aria-expanded={openQueEs}
                className="flex w-full items-center justify-between text-left lg:pointer-events-none lg:cursor-default"
              >
                ¿Qué es gob.mx?
                <ChevronDown size={20} className={`text-white transition-transform lg:hidden ${openQueEs ? '' : '-rotate-90'}`} />
              </button>
            </h2>
            <div className={`${openQueEs ? 'block' : 'hidden'} lg:block`}>
              <p className="text-xs leading-relaxed text-white">
                Es el portal único de trámites, información y participación ciudadana.
              </p>
            </div>
          </nav>

          {/* Columna 2: "Enlaces" con lista sin viñetas */}
          <nav aria-label="Enlaces">
            <h2 className="text-xl font-semibold">
              <button
                type="button"
                onClick={() => setOpenEnlaces(v => !v)}
                aria-expanded={openEnlaces}
                className="flex w-full items-center justify-between text-left lg:pointer-events-none lg:cursor-default"
              >
                Enlaces
                <ChevronDown size={20} className={`text-white transition-transform lg:hidden ${openEnlaces ? '' : '-rotate-90'}`} />
              </button>
            </h2>
            <div className={`${openEnlaces ? 'block' : 'hidden'} lg:block`}>
              <ul className="mt-4 list-none space-y-1">
              <li>
                <a href="#" className="text-xs text-white">Datos</a>
              </li>
              <li>
                <a href="#" className="text-xs text-white">Portal de Obligaciones de Transparencia</a>
              </li>
              <li>
                <a href="#" className="text-xs text-white">Plataforma Nacional de Transparencia</a>
              </li>
              <li>
                <a href="#" className="text-xs text-white">Alerta</a>
              </li>
            </ul>
            </div>
          </nav>
        </div>


        <div className={`-mt-8 lg:mt-0 ${openEnlaces ? 'block' : 'hidden'} lg:block lg:flex-1`}>
          <ul className="list-none space-y-1">
            <li>
              <a href="#" className="text-xs text-white">Administraciones anteriores</a>
            </li>
            <li>
              <a href="#" className="text-xs text-white">Declaración de accesibilidad</a>
            </li>
            <li>
              <a href="#" className="text-xs text-white">Marco jurídico</a>
            </li>
            <li>
              <a href="#" className="text-xs text-white">Política de seguridad</a>
            </li>
            <li>
              <a href="#" className="text-xs text-white">Términos y condiciones</a>
            </li>
            <li>
              <a href="#" className="text-xs text-white">Aviso de privacidad</a>
            </li>
            <li>
              <a href="#" className="text-xs text-white">Aviso de privacidad simplificado</a>
            </li>
            <li>
              <a href="#" className="text-xs text-white">Mapa de sitio</a>
            </li>
          </ul>
        </div>

        {/* Columna 3: "Síguenos" con iconos sociales */}
        <div className="lg:flex-1 flex flex-col gap-3">
          <p className='mb-2 text-xs font-semibold'>Denuncia contra servidores públicos</p>

          <div className='flex items-center gap-2 lg:flex-col lg:items-start' >
            <h2 className="text-xs text-white font-light">Síguenos en</h2>
            <ul className="lg:mt-4 flex list-none items-center gap-3">
              {socialIcons.map(({ label, Icon }) => (
                <li key={label}>
                  <a
                    href="#"
                    aria-label={`Síguenos en ${label}`}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition "
                  >
                    <Icon className="h-3 w-3 text-guinda-900" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex items-center gap-3 mt-4'>
            <div>
              <img src={iconFlor} alt="Icon Flor" className='mx-auto'/>
              <p className='text-center font-extrabold text-2xl'>079</p>
            </div>
            <p className='text-xs font-semibold'>Comunícate, estamos para ayudarte</p>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer