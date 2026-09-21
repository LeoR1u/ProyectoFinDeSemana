# Módulo de Actas Nacionales: guía local

El frontend funciona temporalmente sin base de datos ni llamadas al backend. Todo lo que se captura queda en el `localStorage` del navegador actual, por lo que el usuario **verificador** puede entrar en el mismo navegador y consultar las actas que creó el usuario **capturista**.

## Cuentas de demostración

| Perfil | Usuario | Contraseña | Uso |
| --- | --- | --- | --- |
| Capturista | `capturista` | `captura123` | Elige aduana, verificador y área; selecciona un tipo de acta y llena el formulario. |
| Verificador | `verificador` | `verifica123` | Ve la lista y el detalle completo de lo capturado por el capturista. |

## Flujo implementado

1. Inicio de sesión local.
2. Selección de **Aduana**, **Verificador** y **Área responsable** (nombre genérico temporal).
3. Resumen de la selección y elección del tipo de acta.
4. Formulario con campos comunes y un campo distinto por tipo.
5. Persistencia local y consulta de solo lectura para el verificador.

## Qué sustituir al conectar el backend

El archivo [src/services/localStore.js](src/services/localStore.js) contiene todos los puntos de almacenamiento local. Es el archivo que se debe reemplazar, no las páginas.

| Temporal local | Reemplazo sugerido en backend |
| --- | --- |
| `iniciarSesionLocal` | `POST /api/login` y sesión segura con cookie HttpOnly o el mecanismo definido por backend. |
| Arreglos de `src/data/catalogs.js` | `GET /api/catalogos/aduanas`, `GET /api/verificadores`, `GET /api/areas` y `GET /api/tipos-acta`. |
| `guardarActaLocal` | `POST /api/actas` con contexto, tipo y campos del formulario. |
| `obtenerActasLocales` | `GET /api/actas` y `GET /api/actas/:id`, filtrados/autorizados por rol del servidor. |

Ejemplo de sustitución de `iniciarSesionLocal`:

```js
// ELIMINAR: búsqueda de USUARIOS_LOCALES y uso de localStorage.
// REEMPLAZAR POR:
export const iniciarSesion = async (credenciales) => {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(credenciales),
  })
  if (!respuesta.ok) throw new Error('Usuario o contraseña incorrectos.')
  return respuesta.json()
}
```

El backend debe validar permisos. Los guards de React solo mejoran la navegación; no son una barrera de seguridad.
