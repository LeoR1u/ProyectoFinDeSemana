/** Actualiza el título del navegador desde el `handle.title` de cada ruta. */

import { useEffect } from 'react'
import { useMatches } from 'react-router-dom'

/** Lee el primer título declarado por la ruta activa o usa el nombre del módulo. */
const TitleManager = () => {
  const matches = useMatches()
  const titulo = matches.find((match) => match.handle?.title)?.handle?.title

  useEffect(() => {
    document.title = titulo || 'Módulo de Actas Nacionales'
  }, [titulo])

  return null
}

export default TitleManager
