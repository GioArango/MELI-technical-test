// import React from 'react'
import { RouterProvider } from 'react-router-dom';
import { AppRoute } from './router/AppRoute';

function App() {

  return (
    <>
      <RouterProvider router={AppRoute} />
    </>
  )
}

export default App
