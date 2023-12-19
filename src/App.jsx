import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes/Routes'
import { createContext, useContext } from 'react'
import { AuthContext } from './contexts/AuthProvider'

function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
