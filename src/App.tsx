import React, { useState } from 'react'
import DocPage from './pages/DocPage';
import LoginPage from './pages/LoginPage';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider }  from 'react-router-dom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const router =createBrowserRouter(createRoutesFromElements(
    <>
      <Route path='/' element={<LoginPage />} />
      <Route path = "/document/" element={<DocPage />}/>
    </>
  ))

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
  
}

export default App;