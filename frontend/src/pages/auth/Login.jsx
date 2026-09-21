/**
 * Login — página de inicio de sesión (100% presentacional).
 *
 * No contiene lógica de negocio: consume el hook `useLoginForm`, que maneja
 * valores, validación, carga y envío. La estructura visual externa (paneles)
 * la provee AuthLayout.
 */

import TextField from '@/components/form/inputs/TextField'
import ShowPasswordButton from '@/components/buttons/ShowPasswordButton'
import { useLoginForm } from '@/hooks/auth/useLoginForm'
import { Warning, CircleOutline } from '@carbon/icons-react'

const Login = () => {
  const { values, showPassword, error, loading, handleChange, handleSubmit, togglePassword } =
    useLoginForm()

  /** Habilita el botón de envío solo cuando ambos campos tienen contenido. */
  const enabled =
    values.username.trim() !== '' &&
    values.password.trim() !== '';

  return (
    <div className="flex w-full max-w-md flex-col rounded-2xl border border-neutro-200 bg-white p-6 shadow-xl sm:p-8  lg:p-12">
      <h1 className="text-center text-xl font-bold text-black lg:text-2xl">
        Te damos la bienvenida
      </h1>

      <form className="flex flex-1 flex-col justify-center space-y-2 lg:space-y-4 mt-4" onSubmit={handleSubmit}>
        {/* Mensaje de error global del formulario */}
        {error && (
          <div className="flex items-start gap-2 rounded-md border border-error-500/30 bg-error-100 px-3 py-2 text-sm text-error-500">
            <Warning size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Correo/usuario: el mock lo recibe como `username` */}
        <TextField
          id="username"
          label="Usuario"
          type="text"
          placeholder="Ingresa los datos"
          autoComplete="username"
          value={values.username}
          onChange={handleChange}
          required
        />

        {/* Contraseña con botón mostrar/ocultar */}
        <TextField
          id="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          placeholder="Ingresa los datos"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          required
          endAdornment={
            <ShowPasswordButton
              showPassword={showPassword}
              onToggle={togglePassword}
            />
          }
        />

        <button
          type="submit"
          disabled={!enabled}
          className={`w-full rounded-lg py-2 font-semibold transition  lg:py-2 ${enabled ? 'bg-guinda-900 text-white cursor-pointer hover:bg-guinda-950' : 'bg-neutro-400 text-neutro-500 cursor-not-allowed'}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <CircleOutline size={18} className="animate-spin" />
            </span>
          ) : (
            'Iniciar sesión'
          )} 
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm">
        <a href="#" className="font-medium text-guinda-900 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  )
}
export default Login