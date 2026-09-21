/**
 * Catálogo de roles de SIGECA (RN002).
 *
 * Centraliza los identificadores de rol, sus etiquetas visibles en la UI y el
 * tipo de usuario (interno/externo) para que toda la aplicación los consuma
 * desde un único lugar. Evita "strings mágicos" dispersos en el código.
 *
 * Tipos de usuario:
 * - interno: personal del Consejo (Administrador, Presidente, Secretarios,
 *   Integrantes e Invitados).
 * - externo: Autoridades aduaneras que remiten asuntos (RN001-RN002).
 */

/** Identificadores de rol usados como clave en el resto del sistema. */
export const ROLES = {
  ADMINISTRADOR: 'administrador',
  PRESIDENTE: 'presidente',
  SECRETARIO_EJECUTIVO: 'secretario_ejecutivo',
  SECRETARIO_TECNICO: 'secretario_tecnico',
  INTEGRANTE: 'integrante',
  INVITADO: 'invitado',
  AUTORIDAD: 'autoridad',
}

/** Etiquetas legibles para mostrar el nombre de cada rol en la interfaz. */
export const ROLE_LABELS = {
  [ROLES.ADMINISTRADOR]: 'Administrador del Sistema',
  [ROLES.PRESIDENTE]: 'Presidente',
  [ROLES.SECRETARIO_EJECUTIVO]: 'Secretario Ejecutivo',
  [ROLES.SECRETARIO_TECNICO]: 'Secretario Técnico',
  [ROLES.INTEGRANTE]: 'Integrante',
  [ROLES.INVITADO]: 'Invitado',
  [ROLES.AUTORIDAD]: 'Autoridad Aduanera',
}

/**
 * Origen del usuario por rol.
 * Los roles internos pertenecen al Consejo; los externos corresponden a
 * autoridades o interesados con acceso limitado al sistema.
 */
export const ROLE_TYPES = {
  [ROLES.ADMINISTRADOR]: 'interno',
  [ROLES.PRESIDENTE]: 'interno',
  [ROLES.SECRETARIO_EJECUTIVO]: 'interno',
  [ROLES.SECRETARIO_TECNICO]: 'interno',
  [ROLES.INTEGRANTE]: 'interno',
  [ROLES.INVITADO]: 'interno',
  [ROLES.AUTORIDAD]: 'externo',
}