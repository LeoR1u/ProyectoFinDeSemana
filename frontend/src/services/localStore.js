/**
 * Persistencia local temporal del Módulo de Actas Nacionales.
 *
 * TODO BACKEND: este archivo es el único que debe sustituirse por llamadas
 * fetch/axios. Por ejemplo, loginLocal por POST /api/login y guardarActaLocal
 * por POST /api/actas. No deben enviarse contraseñas ni tokens a localStorage
 * en la versión real; la sesión debe manejarse con cookies HttpOnly o el
 * mecanismo que defina el backend.
 */

/** Llaves aisladas para no mezclar estos datos con otras aplicaciones locales. */
const SESSION_KEY = 'man.session'
const CONTEXT_KEY = 'man.contexto-en-captura'
const RECORDS_KEY = 'man.actas'

/** Cuentas exclusivas para desarrollo local; nunca deben llegar a producción. */
const USUARIOS_LOCALES = [
  {
    id: 'capturista-1',
    usuario: 'capturista',
    contrasena: 'captura123',
    nombre: 'María López García',
    rol: 'capturista',
  },
  {
    id: 'verificador-1',
    usuario: 'verificador',
    contrasena: 'verifica123',
    nombre: 'José Ramírez Torres',
    rol: 'verificador',
  },
]

/** Lee JSON sin interrumpir la interfaz si el almacenamiento se corrompe. */
const leerJSON = (clave, valorInicial) => {
  try {
    const valor = localStorage.getItem(clave)
    return valor ? JSON.parse(valor) : valorInicial
  } catch {
    return valorInicial
  }
}

/** Guarda JSON en el navegador; en backend se reemplaza por una petición HTTP. */
const guardarJSON = (clave, valor) => localStorage.setItem(clave, JSON.stringify(valor))

/** Expone la sesión persistida al iniciar o recargar la aplicación. */
export const obtenerSesionLocal = () => leerJSON(SESSION_KEY, null)

/** Expone la selección inconclusa para que el capturista pueda continuar después de recargar. */
export const obtenerContextoLocal = () => leerJSON(CONTEXT_KEY, null)

/** Recupera todas las actas capturadas para que el verificador pueda consultarlas. */
export const obtenerActasLocales = () => leerJSON(RECORDS_KEY, [])

/** Valida credenciales únicamente contra las dos cuentas locales de demostración. */
export const iniciarSesionLocal = async ({ usuario, contrasena }) => {
  const cuenta = USUARIOS_LOCALES.find(
    (item) => item.usuario.toLowerCase() === usuario.trim().toLowerCase() && item.contrasena === contrasena,
  )

  if (!cuenta) throw new Error('Usuario o contraseña incorrectos.')

  // Se excluye la contraseña del objeto que viaja por la aplicación.
  const { contrasena: _, ...sesion } = cuenta
  guardarJSON(SESSION_KEY, sesion)
  return sesion
}

/** Borra solo la sesión actual; las actas se conservan para la cuenta verificadora. */
export const cerrarSesionLocal = () => {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(CONTEXT_KEY)
}

/** Conserva los tres datos seleccionados antes de avanzar al tipo de acta. */
export const guardarContextoLocal = (contexto) => guardarJSON(CONTEXT_KEY, contexto)

/** Elimina un borrador de contexto después de registrar el acta. */
export const limpiarContextoLocal = () => localStorage.removeItem(CONTEXT_KEY)

/** Añade un acta a la colección local y devuelve el registro que se creó. */
export const guardarActaLocal = ({ contexto, datos, usuario }) => {
  const actas = obtenerActasLocales()
  const consecutivo = String(actas.length + 1).padStart(4, '0')
  const acta = {
    id: `${Date.now()}`,
    folio: `MAN-${new Date().getFullYear()}-${consecutivo}`,
    estatus: 'Pendiente de verificación',
    creadaEn: new Date().toISOString(),
    contexto,
    datos,
    capturista: { id: usuario.id, nombre: usuario.nombre },
  }

  guardarJSON(RECORDS_KEY, [acta, ...actas])
  limpiarContextoLocal()
  return acta
}
