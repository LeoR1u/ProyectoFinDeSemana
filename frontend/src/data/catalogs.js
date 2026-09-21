/**
 * Catálogos temporales del frontend.
 *
 * TODO BACKEND: eliminar estos arreglos y consultarlos desde, por ejemplo,
 * GET /api/catalogos/aduanas, /verificadores, /areas y /tipos-acta.
 */

/** Opciones locales para el primer paso de captura. */
export const ADUANAS = [
  'Aduana de Nuevo Laredo',
  'Aduana de Manzanillo',
  'Aduana de Ciudad Juárez',
]

/** Verificadores que se pueden asignar a un acta durante esta demostración. */
export const VERIFICADORES = [
  'Verificador principal',
  'Verificador de apoyo',
  'Verificador regional',
]

/** Campo genérico solicitado; podrá sustituirse por el catálogo real. */
export const AREAS_RESPONSABLES = [
  'Área responsable A',
  'Área responsable B',
  'Área responsable C',
]

/** Tipos de acta disponibles y su campo particular de ejemplo. */
export const TIPOS_ACTA = [
  {
    id: 'hechos',
    nombre: 'Acta de hechos',
    descripcion: 'Registra una narración formal de los acontecimientos observados.',
    campoExtra: { id: 'relato', etiqueta: 'Relato de los hechos', tipo: 'textarea' },
  },
  {
    id: 'incidencia',
    nombre: 'Acta de incidencia',
    descripcion: 'Documenta una situación que requiere seguimiento o aclaración.',
    campoExtra: { id: 'incidencia', etiqueta: 'Tipo de incidencia', tipo: 'text' },
  },
  {
    id: 'verificacion',
    nombre: 'Acta de verificación',
    descripcion: 'Concentra los resultados de una revisión o validación realizada.',
    campoExtra: { id: 'resultado', etiqueta: 'Resultado de la verificación', tipo: 'textarea' },
  },
]

/** Busca un tipo de acta por identificador, evitando repetir esta lógica en las páginas. */
export const obtenerTipoActa = (id) => TIPOS_ACTA.find((tipo) => tipo.id === id)
