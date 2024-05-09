import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider
} from "react-router-dom"
import {router} from './Router.jsx'
import {AuthProvider} from './components/AuthProvider.jsx'
import './index.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

function App() {
  return (
    <React.StrictMode>
      
      <AuthProvider>
      <RouterProvider router={router}/>
      </AuthProvider>  
  </React.StrictMode>
  );
}