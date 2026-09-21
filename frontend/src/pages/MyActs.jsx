/** Confirmación y listado propio del capturista después de guardar actas locales. */

import { Link } from 'react-router-dom'
import { obtenerTipoActa } from '@/data/catalogs'
import { useApp } from '@/context/AppContext'

/** Formatea la marca de tiempo sin exponer el ISO crudo en la interfaz. */
const formatoFecha = (iso) => new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))

/** Muestra solo los registros que pertenecen a la cuenta capturista conectada. */
const MyActs = () => {
  const { actas, usuario } = useApp()
  const propias = actas.filter((acta) => acta.capturista.id === usuario.id)

  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="rounded-xl border border-exito-500/30 bg-exito-100 p-5 text-exito-500">
        <p className="font-bold">Acta guardada localmente.</p>
        <p className="mt-1 text-sm">El usuario verificador puede verla al iniciar sesión en este mismo navegador.</p>
      </div>
      <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm font-semibold text-guinda-900">Mis registros</p><h1 className="mt-1 text-3xl font-bold text-neutro-800">Actas capturadas</h1></div>
        <Link to="/contexto" className="rounded-lg bg-guinda-900 px-5 py-2.5 text-center font-semibold text-white hover:bg-guinda-950">Crear otra acta</Link>
      </div>
      <div className="mt-5 space-y-3">
        {propias.map((acta) => (
          <article key={acta.id} className="rounded-xl border border-neutro-400 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-2 sm:flex-row"><div><p className="font-bold text-neutro-800">{acta.folio} · {obtenerTipoActa(acta.contexto.tipoActa)?.nombre}</p><p className="mt-1 text-sm text-neutro-600">{acta.contexto.aduana} · {formatoFecha(acta.creadaEn)}</p></div><span className="h-fit rounded-full bg-dorado-100 px-3 py-1 text-xs font-bold text-dorado-900">{acta.estatus}</span></div>
          </article>
        ))}
        {!propias.length && <p className="rounded-xl bg-white p-5 text-neutro-600">Todavía no hay actas capturadas.</p>}
      </div>
    </section>
  )
}

export default MyActs
