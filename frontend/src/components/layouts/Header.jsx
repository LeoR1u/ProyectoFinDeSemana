/** Barra institucional compartida por acceso y pantallas del módulo. */

import gobiernoBlanco from '@/assets/logos/Logo-Gobierno-2025.svg'

/** Muestra sesión y salida solo cuando recibe los datos del usuario. */
const Header = ({ usuario, alCerrarSesion }) => (
  <>
    <div className="flex w-full items-center justify-between gap-4 bg-guinda-900 px-4 py-3 text-white sm:px-10">
      <img src={gobiernoBlanco} alt="Gobierno de México" className="h-9 w-auto object-contain sm:h-10" />
      <div className="flex items-center gap-3 text-right">
        <div className="hidden sm:block">
          <p className="text-xs text-white/75">Módulo de Actas Nacionales</p>
          {usuario && <p className="text-sm font-semibold">{usuario.nombre}</p>}
        </div>
        {usuario && (
          <button
            type="button"
            onClick={alCerrarSesion}
            className="rounded-md border border-white/60 px-3 py-1.5 text-sm font-semibold transition hover:bg-white hover:text-guinda-900"
          >
            Salir
          </button>
        )}
      </div>
    </div>
    {/* Franja que conserva el acento visual del acceso original. */}
    <div className="h-5 w-full bg-guinda-950" />
  </>
)

export default Header
