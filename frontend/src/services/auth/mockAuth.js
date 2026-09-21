/**
 * Capa de servicio de autenticación (mock).
 *
 * Simula el contrato de la API real de autenticación para poder desarrollar
 * el frontend sin backend:
 *   login({ username, password }) => Promise<usuario sin contraseña>
 *
 * Cuando exista la API real, solo hay que reemplazar la implementación de
 * `loginMock` (por fetch/axios) conservando la misma firma; el resto de la
 * aplicación no debe cambiar (AuthProvider depende únicamente de esta capa).
 */

import { ROLES } from '@/config/roles'

/** Usuarios de prueba. Uno por rol; SOLO para desarrollo, nunca en producción. */
export const MOCK_USERS = [
  {
    id: 1,
    username: 'administrador',
    password: 'admin123',
    nombre: 'Sistema de Control',
    correo: 'administrador@sigeca.gob.mx',
    rol: ROLES.ADMINISTRADOR,
  },
  {
    id: 2,
    username: 'presidente',
    password: 'presidente123',
    nombre: 'Laura Mendoza Ruiz',
    correo: 'presidente@sigeca.gob.mx',
    rol: ROLES.PRESIDENTE,
  },
  {
    id: 3,
    username: 'secretario.ejecutivo',
    password: 'sejecutivo123',
    nombre: 'Carlos Rivera Torres',
    correo: 'secretario.ejecutivo@sigeca.gob.mx',
    rol: ROLES.SECRETARIO_EJECUTIVO,
  },
  {
    id: 4,
    username: 'secretario.tecnico',
    password: 'stecnico123',
    nombre: 'Mariana Ortega Gil',
    correo: 'secretario.tecnico@sigeca.gob.mx',
    rol: ROLES.SECRETARIO_TECNICO,
  },
  {
    id: 5,
    username: 'integrante',
    password: 'integrante123',
    nombre: 'Roberto Salas Vega',
    correo: 'integrante@sigeca.gob.mx',
    rol: ROLES.INTEGRANTE,
  },
  {
    id: 6,
    username: 'invitado',
    password: 'invitado123',
    nombre: 'Iván Castro Núñez',
    correo: 'invitado@sigeca.gob.mx',
    rol: ROLES.INVITADO,
  },
  {
    id: 7,
    username: 'autoridad',
    password: 'autoridad123',
    nombre: 'Administración Regional de Aduanas',
    correo: 'autoridad@sigeca.gob.mx',
    rol: ROLES.AUTORIDAD,
  },
]

/** Simula la latencia de una petición a red. */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Verifica las credenciales contra los usuarios mock.
 *
 * @param {{ correo: string, password: string }} credentials - Credenciales enviadas por el formulario.
 * @returns {Promise<object>} Usuario de sesión SIN el campo `password`.
 * @throws {Error} Cuando el usuario o la contraseña son incorrectos.
 */
export const loginMock = async ({ username, password }) => {

  await delay(600)
  const user = MOCK_USERS.find(
    (u) =>
      u.username.toLowerCase() === username.trim().toLowerCase() &&
      u.password === password,
  )
  if (!user) {
    throw new Error('Usuario o contraseña incorrectos')
  }
  const sessionUser = { ...user }
  delete sessionUser.password
  return sessionUser
}