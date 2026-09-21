/**
 * Header — barra institucional superior con menú responsive.
 *
 * Reutilizable en cualquier layout (auth y el futuro main):
 * - Pantallas >= lg: muestra el logo y los enlaces en fila.
 * - Pantallas < lg: muestra el logo y un botón hamburguesa que despliega un
 *   menú compacto alineado a la derecha, con animación de caída y una línea
 *   divisoria blanca entre los enlaces.
 */

import { useState } from 'react'
import { Menu, Close } from '@carbon/icons-react'
import gobiernoBlanco from '@/assets/logos/Logo-Gobierno-2025.svg'

const Header = () => {
  /* Controla la apertura/cierre del menú móvil (solo aplica en < lg). */
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((v) => !v)

  return (

    <>
    
      <div className="relative">
        {/* Barra institucional superior */}
        <div className="flex w-full items-center justify-between bg-guinda-900 px-4 py-3 text-white sm:px-14">
          <div className="h-full">
            <img src={gobiernoBlanco} alt="ANAM" className="h-full w-auto object-contain" />
          </div>

          {/* Botón hamburguesa — visible solo en pantallas pequeñas (< lg) */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden cursor-pointer"
          >
            {menuOpen ? <Close size={24} /> : <Menu size={24} />}
          </button>

          {/* Enlaces — en fila, siempre visibles en pantallas grandes (>= lg) */}
          <div className="hidden items-center gap-3 text-sm md:flex">
            <p>Trámites</p>
            <p>Gobierno</p>
          </div>
        </div>

        {/* Menú móvil desplegable — absoluto bajo el botón, con animación de caída */}
        {menuOpen && (
          <div className="absolute w-full right-0 top-full z-40 bg-guinda-900  py-4 text-sm text-white shadow-lg md:hidden animate-slide-down">
            <div className="flex flex-col items-center gap-3">
              <p>Trámites</p>
              <span className="h-px w-full bg-white/40" />
              <p>Gobierno</p>
            </div>
          </div>
        )}
      </div>

      {/* Franja decorativa */}
      <div className="h-12 w-full bg-guinda-950" />
    </>
  )
}

export default Header