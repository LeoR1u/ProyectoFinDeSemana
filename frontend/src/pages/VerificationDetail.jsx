/** Detalle de solo lectura para que el verificador consulte un acta local. */

import { Link, useParams } from 'react-router-dom'
import { obtenerTipoActa } from '@/data/catalogs'
import { useApp } from '@/context/AppContext'

/** Muestra un renglón consistente de etiqueta y valor en el detalle. */
const Dato = ({ etiqueta, valor }) => <div className="border-b border-neutro-400 py-3 last:border-0"><dt className="text-xs font-bold uppercase tracking-wide text-neutro-600">{etiqueta}</dt><dd className="mt-1 whitespace-pre-wrap text-neutro-800">{valor || 'Sin información'}</dd></div>

/** Encuentra el acta mediante el id de ruta y muestra todos sus campos. */
const VerificationDetail = () => {
  const { id } = useParams()
  const { actas } = useApp()
  const acta = actas.find((registro) => registro.id === id)
  const tipo = obtenerTipoActa(acta?.contexto.tipoActa)

  if (!acta || !tipo) return <section className="mx-auto w-full max-w-3xl rounded-xl bg-white p-6"><h1 className="text-2xl font-bold">Acta no encontrada</h1><Link to="/verificacion" className="mt-4 inline-block text-guinda-900 underline">Volver a la bandeja</Link></section>

  return (
    <section className="mx-auto w-full max-w-4xl">
      <Link to="/verificacion" className="text-sm font-semibold text-guinda-900 hover:underline">← Volver a actas pendientes</Link>
      <div className="mt-4 rounded-2xl border border-neutro-400 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-sm font-semibold text-guinda-900">{acta.folio} · {acta.estatus}</p>
        <h1 className="mt-1 text-3xl font-bold text-neutro-800">{tipo.nombre}</h1>
        <p className="mt-2 text-sm text-neutro-600">Capturada por {acta.capturista.nombre}</p>
        <h2 className="mt-7 text-lg font-bold text-neutro-800">Contexto seleccionado</h2>
        <dl className="mt-2 grid gap-x-8 sm:grid-cols-3"><Dato etiqueta="Aduana" valor={acta.contexto.aduana} /><Dato etiqueta="Verificador asignado" valor={acta.contexto.verificador} /><Dato etiqueta="Área responsable" valor={acta.contexto.area} /></dl>
        <h2 className="mt-7 text-lg font-bold text-neutro-800">Datos del acta</h2>
        <dl className="mt-2 grid gap-x-8 sm:grid-cols-2"><Dato etiqueta="Fecha" valor={acta.datos.fecha} /><Dato etiqueta="Hora" valor={acta.datos.hora} /><Dato etiqueta="Lugar" valor={acta.datos.lugar} /><Dato etiqueta="Referencia" valor={acta.datos.referencia} /></dl>
        <dl className="mt-1"><Dato etiqueta="Descripción general" valor={acta.datos.descripcion} /><Dato etiqueta="Personas involucradas" valor={acta.datos.involucrados} /><Dato etiqueta={tipo.campoExtra.etiqueta} valor={acta.datos[tipo.campoExtra.id]} /><Dato etiqueta="Observaciones" valor={acta.datos.observaciones} /></dl>
      </div>
    </section>
  )
}

export default VerificationDetail
