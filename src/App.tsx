import React, { useState } from 'react'
import DocPage from './pages/DocPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return(
    <>
      <Routes>
        <Route path='/login' Component={LoginPage}/>
        <Route path = "/" Component={IndexPage} />
        <Route path = "/documents/:documentId" Component={DocPage}/>
      </Routes>  
    </>
  )
  
}

export default App;