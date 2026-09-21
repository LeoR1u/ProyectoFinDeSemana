/** Segundo paso: muestra el contexto elegido y permite seleccionar un formato. */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TIPOS_ACTA } from '@/data/catalogs'
import { useApp } from '@/context/AppContext'

/** Presenta las tres selecciones como resumen breve y legible. */
const ResumenContexto = ({ contexto }) => (
  <dl className="grid gap-3 text-sm sm:grid-cols-3">
    <div><dt className="text-neutro-600">Aduana</dt><dd className="font-semibold text-neutro-800">{contexto.aduana}</dd></div>
    <div><dt className="text-neutro-600">Verificador</dt><dd className="font-semibold text-neutro-800">{contexto.verificador}</dd></div>
    <div><dt className="text-neutro-600">Área responsable</dt><dd className="font-semibold text-neutro-800">{contexto.area}</dd></div>
  </dl>
)

/** Guarda el tipo dentro del contexto antes de abrir el formulario correspondiente. */
const ActTypeSelection = () => {
  const { contexto, guardarContexto } = useApp()
  const navigate = useNavigate()
  const [tipoSeleccionado, setTipoSeleccionado] = useState(contexto?.tipoActa || '')

  /** Evita una ruta incompleta si el usuario entra directamente o recarga sin contexto. */
  useEffect(() => {
    if (!contexto) navigate('/contexto', { replace: true })
  }, [contexto, navigate])

  if (!contexto) return null

  /** Registra el formato elegido y abre el paso final de captura. */
  const continuar = () => {
    if (!tipoSeleccionado) return
    guardarContexto({ ...contexto, tipoActa: tipoSeleccionado })
    navigate('/acta/nueva')
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      <p className="text-sm font-semibold text-guinda-900">Paso 2 de 3 · Formato</p>
      <h1 className="mt-1 text-3xl font-bold text-neutro-800">Selecciona el tipo de acta</h1>
      <div className="mt-5 rounded-xl border border-dorado-300 bg-dorado-100 p-5"><ResumenContexto contexto={contexto} /></div>
      <p className="mt-6 text-neutro-600">El formato elegido definirá campos particulares además de los datos comunes.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {TIPOS_ACTA.map((tipo) => {
          const activo = tipoSeleccionado === tipo.id
          return (
            <button
              type="button"
              key={tipo.id}
              onClick={() => setTipoSeleccionado(tipo.id)}
              className={`rounded-xl border p-5 text-left transition ${activo ? 'border-guinda-900 bg-guinda-100 ring-2 ring-guinda-200' : 'border-neutro-400 bg-white hover:border-guinda-400'}`}
            >
              <span className="text-lg font-bold text-neutro-800">{tipo.nombre}</span>
              <span className="mt-2 block text-sm text-neutro-600">{tipo.descripcion}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-7 flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <button type="button" onClick={() => navigate('/contexto')} className="rounded-lg border border-guinda-900 px-6 py-2.5 font-semibold text-guinda-900 hover:bg-guinda-100">Regresar</button>
        <button type="button" onClick={continuar} disabled={!tipoSeleccionado} className="rounded-lg bg-guinda-900 px-6 py-2.5 font-semibold text-white transition hover:bg-guinda-950 disabled:cursor-not-allowed disabled:bg-neutro-500">Continuar al formulario</button>
      </div>
    </section>
  )
}

export default ActTypeSelection
