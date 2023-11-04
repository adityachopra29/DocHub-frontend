import React from 'react'
import DocPage from './pages/DocPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TextEditor from './components/textEditor';
import Index from './components';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DocPage />,
      children:[
        {
          index:true,
          element: <Index />,
        },
        {
          path: "/documents/:documentId",
          element: <TextEditor />
        }
      ]
    }
  ])
    return(
      <>
        <RouterProvider router={router} />
      </>
    )
  }
  
  export default App;