import React from 'react'
import AuthContextProvider from './context/AuthContextProvider'
import { RouterProvider } from 'react-router-dom'

import routes from './routes/Routes'


function App() {
  return (
   <AuthContextProvider>
    <RouterProvider router={routes} />
   </AuthContextProvider>
  )
}

export default App