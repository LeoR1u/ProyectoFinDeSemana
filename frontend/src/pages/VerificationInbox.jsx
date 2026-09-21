/** Bandeja local del verificador para consultar todos los datos enviados. */

import { Link } from 'react-router-dom'
import { obtenerTipoActa } from '@/data/catalogs'
import { useApp } from '@/context/AppContext'

/** Traduce la fecha almacenada en un texto adecuado para la bandeja. */
const formatoFecha = (iso) => new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))

/** Lista actas persistidas localmente y enlaza a su detalle completo. */
const VerificationInbox = () => {
  const { actas } = useApp()

  return (
    <section className="mx-auto w-full max-w-5xl">
      <p className="text-sm font-semibold text-guinda-900">Vista del verificador</p>
      <h1 className="mt-1 text-3xl font-bold text-neutro-800">Actas pendientes de verificación</h1>
      <p className="mt-2 text-neutro-600">Los registros fueron capturados localmente por el otro usuario de demostración.</p>
      <div className="mt-6 space-y-3">
        {actas.map((acta) => (
          <article key={acta.id} className="rounded-xl border border-neutro-400 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div><p className="font-bold text-neutro-800">{acta.folio} · {obtenerTipoActa(acta.contexto.tipoActa)?.nombre}</p><p className="mt-1 text-sm text-neutro-600">Capturó: {acta.capturista.nombre} · {acta.contexto.aduana}</p><p className="mt-1 text-xs text-neutro-600">{formatoFecha(acta.creadaEn)}</p></div>
              <Link to={`/verificacion/${acta.id}`} className="rounded-lg border border-guinda-900 px-4 py-2 text-center text-sm font-semibold text-guinda-900 hover:bg-guinda-100">Ver datos</Link>
            </div>
          </article>
        ))}
        {!actas.length && <div className="rounded-xl border border-dashed border-neutro-500 bg-white p-8 text-center text-neutro-600">Aún no hay actas locales. Inicia sesión como <b>capturista</b> para crear una.</div>}
      </div>
    </section>
  )
}

export default VerificationInbox
