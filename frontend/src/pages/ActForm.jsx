/** Tercer paso: formulario base con un campo variable por tipo de acta. */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerTipoActa } from '@/data/catalogs'
import { useApp } from '@/context/AppContext'

/** Devuelve la fecha local ISO requerida por el control HTML de fecha. */
const fechaActual = () => new Date().toISOString().slice(0, 10)

/** Campo común para evitar repetir etiquetas, estilos y requisitos del formulario. */
const Campo = ({ etiqueta, nombre, valor, alCambiar, tipo = 'text', requerido = true, placeholder }) => (
  <label className="block text-sm font-semibold text-neutro-800">
    {etiqueta}
    {tipo === 'textarea' ? (
      <textarea name={nombre} value={valor} onChange={alCambiar} required={requerido} placeholder={placeholder} rows="4" className="mt-1.5 w-full resize-y rounded-lg border border-neutro-400 px-3 py-2.5 font-normal outline-none transition focus:border-guinda-600 focus:ring-2 focus:ring-guinda-200" />
    ) : (
      <input name={nombre} value={valor} onChange={alCambiar} required={requerido} type={tipo} placeholder={placeholder} className="mt-1.5 w-full rounded-lg border border-neutro-400 px-3 py-2.5 font-normal outline-none transition focus:border-guinda-600 focus:ring-2 focus:ring-guinda-200" />
    )}
  </label>
)

/** Captura campos comunes y el campo particular que define el tipo seleccionado. */
const ActForm = () => {
  const { contexto, guardarActa } = useApp()
  const navigate = useNavigate()
  const tipo = obtenerTipoActa(contexto?.tipoActa)
  const [datos, setDatos] = useState({
    fecha: fechaActual(),
    hora: '',
    lugar: '',
    referencia: '',
    descripcion: '',
    involucrados: '',
    observaciones: '',
    [tipo?.campoExtra.id || 'campoExtra']: '',
  })

  /** No permite llegar al formulario si falta contexto o formato. */
  useEffect(() => {
    if (!contexto?.tipoActa || !tipo) navigate('/tipo-acta', { replace: true })
  }, [contexto, navigate, tipo])

  if (!contexto || !tipo) return null

  /** Actualiza cada campo por su nombre para mantener una sola función de cambio. */
  const cambiar = (evento) => {
    const { name, value } = evento.target
    setDatos((previos) => ({ ...previos, [name]: value }))
  }

  /** Crea un registro local y lleva al capturista a la evidencia de su envío. */
  const enviar = (evento) => {
    evento.preventDefault()
    guardarActa(datos)
    navigate('/mis-actas', { replace: true })
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      <p className="text-sm font-semibold text-guinda-900">Paso 3 de 3 · Captura</p>
      <h1 className="mt-1 text-3xl font-bold text-neutro-800">{tipo.nombre}</h1>
      <p className="mt-2 text-neutro-600">Completa los datos del formato. Esta información se guarda solo en este navegador.</p>
      <div className="mt-5 grid gap-2 rounded-xl border border-dorado-300 bg-dorado-100 p-4 text-sm sm:grid-cols-3">
        <p><b>Aduana:</b> {contexto.aduana}</p><p><b>Verificador:</b> {contexto.verificador}</p><p><b>Área:</b> {contexto.area}</p>
      </div>
      <form onSubmit={enviar} className="mt-5 rounded-2xl border border-neutro-400 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-bold text-neutro-800">Información de la diligencia</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Campo etiqueta="Fecha" nombre="fecha" valor={datos.fecha} alCambiar={cambiar} tipo="date" />
          <Campo etiqueta="Hora" nombre="hora" valor={datos.hora} alCambiar={cambiar} tipo="time" />
          <Campo etiqueta="Lugar de los hechos" nombre="lugar" valor={datos.lugar} alCambiar={cambiar} placeholder="Ej. Recinto fiscal" />
          <Campo etiqueta="Referencia o número de operación" nombre="referencia" valor={datos.referencia} alCambiar={cambiar} placeholder="Ej. OP-2026-001" />
        </div>
        <div className="mt-5 grid gap-5">
          <Campo etiqueta="Descripción general" nombre="descripcion" valor={datos.descripcion} alCambiar={cambiar} tipo="textarea" placeholder="Describe la situación registrada" />
          <Campo etiqueta="Personas involucradas" nombre="involucrados" valor={datos.involucrados} alCambiar={cambiar} placeholder="Nombres o puestos, separados por comas" />
          {/* Este campo cambia con el tipo: es el patrón para futuros formatos. */}
          <Campo etiqueta={tipo.campoExtra.etiqueta} nombre={tipo.campoExtra.id} valor={datos[tipo.campoExtra.id]} alCambiar={cambiar} tipo={tipo.campoExtra.tipo} placeholder="Captura la información particular de este formato" />
          <Campo etiqueta="Observaciones" nombre="observaciones" valor={datos.observaciones} alCambiar={cambiar} tipo="textarea" requerido={false} placeholder="Información adicional opcional" />
        </div>
        <div className="mt-7 flex flex-col-reverse justify-between gap-3 sm:flex-row">
          <button type="button" onClick={() => navigate('/tipo-acta')} className="rounded-lg border border-guinda-900 px-6 py-2.5 font-semibold text-guinda-900 hover:bg-guinda-100">Regresar</button>
          <button type="submit" className="rounded-lg bg-guinda-900 px-6 py-2.5 font-semibold text-white transition hover:bg-guinda-950">Guardar acta localmente</button>
        </div>
      </form>
    </section>
  )
}

export default ActForm
