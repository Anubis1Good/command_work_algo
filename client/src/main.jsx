/*
 * Import and render the app with auth related components
 */
import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider
} from "react-router-dom"
import {router} from './Router.jsx'
import {AuthProvider} from './components/AuthProvider.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

function App() {
  return (
    <React.StrictMode>
      
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>  
  </React.StrictMode>
  );
}