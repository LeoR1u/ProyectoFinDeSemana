/** Primer paso: selección de aduana, verificador y área responsable. */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ADUANAS, AREAS_RESPONSABLES, VERIFICADORES } from '@/data/catalogs'
import { useApp } from '@/context/AppContext'

/** Construye un select reutilizable para los tres catálogos del paso. */
const CampoSeleccion = ({ etiqueta, nombre, valor, opciones, alCambiar }) => (
  <label className="block text-sm font-semibold text-neutro-800">
    {etiqueta}
    <select
      name={nombre}
      value={valor}
      onChange={alCambiar}
      className="mt-1.5 w-full rounded-lg border border-neutro-400 bg-white px-3 py-2.5 font-normal outline-none transition focus:border-guinda-600 focus:ring-2 focus:ring-guinda-200"
    >
      <option value="">Selecciona una opción</option>
      {opciones.map((opcion) => <option key={opcion} value={opcion}>{opcion}</option>)}
    </select>
  </label>
)

/** Guarda las tres elecciones en localStorage antes de pasar al tipo de acta. */
const ContextSelection = () => {
  const { contexto, guardarContexto } = useApp()
  const navigate = useNavigate()
  const [datos, setDatos] = useState(contexto || { aduana: '', verificador: '', area: '' })
  const [error, setError] = useState('')

  /** Mantiene el objeto de selección alineado con el campo editado. */
  const cambiar = (evento) => {
    const { name, value } = evento.target
    setDatos((previos) => ({ ...previos, [name]: value }))
    setError('')
  }

  /** Requiere las tres selecciones antes de habilitar el siguiente paso. */
  const continuar = (evento) => {
    evento.preventDefault()
    if (!datos.aduana || !datos.verificador || !datos.area) {
      setError('Selecciona los tres datos para continuar.')
      return
    }
    guardarContexto(datos)
    navigate('/tipo-acta')
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <p className="text-sm font-semibold text-guinda-900">Paso 1 de 3 · Contexto</p>
      <h1 className="mt-1 text-3xl font-bold text-neutro-800">Datos iniciales del acta</h1>
      <p className="mt-2 text-neutro-600">Define el contexto con el que se elaborará el documento.</p>
      <form onSubmit={continuar} className="mt-6 rounded-2xl border border-neutro-400 bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-5 md:grid-cols-3">
          <CampoSeleccion etiqueta="Aduana" nombre="aduana" valor={datos.aduana} opciones={ADUANAS} alCambiar={cambiar} />
          <CampoSeleccion etiqueta="Verificador" nombre="verificador" valor={datos.verificador} opciones={VERIFICADORES} alCambiar={cambiar} />
          <CampoSeleccion etiqueta="Área responsable" nombre="area" valor={datos.area} opciones={AREAS_RESPONSABLES} alCambiar={cambiar} />
        </div>
        {error && <p className="mt-4 text-sm font-semibold text-error-500">{error}</p>}
        <div className="mt-7 flex justify-end">
          <button type="submit" className="rounded-lg bg-guinda-900 px-6 py-2.5 font-semibold text-white transition hover:bg-guinda-950">Continuar</button>
        </div>
      </form>
    </section>
  )
}

export default ContextSelection
