/**
 * Barra institucional: recupera la composición original para la vista de acceso.
 * Cuando hay sesión, sustituye enlaces decorativos por la identidad del usuario.
 */

import { useState } from 'react'
import { Close, Menu } from '@carbon/icons-react'
import gobiernoBlanco from '@/assets/logos/Logo-Gobierno-2025.svg'

/** Conserva el menú móvil original para la pantalla pública. */
const Header = ({ usuario, alCerrarSesion }) => {
  const [menuAbierto, setMenuAbierto] = useState(false)

  /** Alterna exclusivamente el menú de la versión móvil sin afectar la sesión. */
  const alternarMenu = () => setMenuAbierto((abierto) => !abierto)

  return (
    <>
      <div className="relative">
        <div className="flex w-full items-center justify-between bg-guinda-900 px-4 py-3 text-white sm:px-14">
          <div className="h-full">
            <img src={gobiernoBlanco} alt="Gobierno de México" className="h-full w-auto object-contain" />
          </div>

          {usuario ? (
            <div className="flex items-center gap-3 text-right">
              <div className="hidden sm:block"><p className="text-xs text-white/75">Módulo de Actas Nacionales</p><p className="text-sm font-semibold">{usuario.nombre}</p></div>
              <button type="button" onClick={alCerrarSesion} className="rounded-md border border-white/60 px-3 py-1.5 text-sm font-semibold transition hover:bg-white hover:text-guinda-900">Salir</button>
            </div>
          ) : (
            <>
              {/* El menú móvil se mantiene igual que en el diseño de acceso inicial. */}
              <button type="button" onClick={alternarMenu} aria-expanded={menuAbierto} aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'} className="cursor-pointer md:hidden">
                {menuAbierto ? <Close size={24} /> : <Menu size={24} />}
              </button>
              <div className="hidden items-center gap-3 text-sm md:flex"><p>Trámites</p><p>Gobierno</p></div>
            </>
          )}
        </div>

        {!usuario && menuAbierto && (
          <div className="absolute right-0 top-full z-40 w-full animate-slide-down bg-guinda-900 py-4 text-sm text-white shadow-lg md:hidden">
            <div className="flex flex-col items-center gap-3"><p>Trámites</p><span className="h-px w-full bg-white/40" /><p>Gobierno</p></div>
          </div>
        )}
      </div>
      {/* Altura original de la franja decorativa del encabezado. */}
      <div className="h-12 w-full bg-guinda-950" />
    </>
  )
}

export default Header
