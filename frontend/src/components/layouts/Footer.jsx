/** Pie de página compacto sin enlaces simulados. */

import gobiernoBlanco from '@/assets/logos/Logo-Gobierno-2025.svg'

/** Mantiene el cierre institucional en todas las rutas. */
const Footer = () => (
  <footer className="w-full bg-guinda-900 px-6 py-6 text-white sm:px-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
      <img src={gobiernoBlanco} alt="Gobierno de México" className="h-10 w-auto object-contain" />
      <p className="text-center text-xs text-white/85">Módulo de Actas Nacionales · Prototipo local de interfaz</p>
    </div>
  </footer>
)

export default Footer
