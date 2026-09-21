/**
 * TextField — input genérico reutilizable del sistema.
 *
 * Componente presentacional que unifica el estilo de todos los campos de texto
 * del sistema (label con asterisco obligatorio, borde, foco y estado de error).
 *
 * Props:
 * - id:            id nativo del input (obligatorio, usado por label htmlFor).
 * - label:         texto del label; si no se envía, no se renderiza.
 * - required:      muestra el "*" en color error-500 antes del label.
 * - type:          tipo del input (text, password, email...).
 * - placeholder:   texto de ayuda dentro del input.
 * - value/onChange: control del valor (opcional; permite uso no controlado).
 * - autoComplete:  autocompletado del navegador.
 * - error:         si tiene valor, activa el estado de error (borde/mensaje).
 * - endAdornment:  elemento React a la derecha (p. ej. botón "Mostrar").
 * - className:     clases extra aplicadas al contenedor.
 *
 * El foco usa `focus-within` sobre el contenedor para resaltar todo el grupo
 * (input + endAdornment) de forma unificada.
 */

const TextField = ({
  id,
  label,
  required = false,
  type = 'text',
  placeholder,
  value,
  onChange,
  autoComplete,
  error = '',
  endAdornment,
  className = '',
}) => {
  return (
    <div className={className}>
      {/* Label con marcador de campo obligatorio */}
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-neutro-800"
        >
          {required && <span className="text-error-500">*</span>} {label}
        </label>
      )}

      {/* Contenedor con estado de foco y error sobre todo el grupo */}
      <div
        className={`flex rounded-lg border bg-white transition focus-within:ring-2 ${error
            ? 'border-error-500 focus-within:ring-error-500/30'
            : 'border-neutro-400 focus-within:border-dorado-600 focus-within:ring-dorado-600/30'
          }`}
      >
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className="w-full bg-transparent px-3.5 py-2.5 text-sm text-neutro-800 outline-none"
        />

        {/* Elemento anexo a la derecha (endAdornment) */}
        {endAdornment && (
          <div
            className={`flex items-center border-l ${error ? 'border-error-500' : 'border-neutro-400'
              }`}
          >
            {endAdornment}
          </div>
        )}
      </div>

      {/* Mensaje de error bajo el campo */}
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  )
}

export default TextField