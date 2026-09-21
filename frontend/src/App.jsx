import { Outlet } from 'react-router-dom'
import TitleManager from './components/TitleManager'

function App() {
  return (
    <>
      <TitleManager />
      <Outlet />
    </>
  )
}

export default App