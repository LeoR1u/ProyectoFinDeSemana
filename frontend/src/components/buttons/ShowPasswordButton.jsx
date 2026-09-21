/**
 * ShowPasswordButton — botón de mostrar/ocultar contraseña.
 *
 * Componente presentacional: solo representa el botón con el ícono según el
 * estado actual y delega la acción al padre mediante `onToggle`.
 *
 * Props:
 * - showPassword: estado actual (true = visible, false = oculta).
 * - onToggle:     callback que alterna la visibilidad.
 */

import { View, ViewOff } from '@carbon/icons-react'

const ShowPasswordButton = ({ showPassword, onToggle }) => {
  return (
    <button
      type="button"
      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      onClick={onToggle}
      className="w-full rounded-r-lg px-3 py-2.5 text-neutro-800 transition cursor-pointer hover:bg-guinda-900 hover:text-white"
    >
      {showPassword ? <ViewOff size={20} /> : <View size={20} />}
    </button>
  )
}

export default ShowPasswordButton