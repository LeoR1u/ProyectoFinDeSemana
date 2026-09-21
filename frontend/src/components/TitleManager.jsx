import { useEffect } from 'react'
import { useMatches } from 'react-router-dom'

const  TitleManager = () => {
  const matches = useMatches()
  const titulo = matches.find((m) => m.handle?.title)?.handle?.title

  useEffect(() => {
    document.title = titulo || 'ANAM'
  }, [titulo])

  return null
}

export default TitleManager