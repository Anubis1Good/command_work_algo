import {createBrowserRouter} from 'react-router-dom'
import AboutPage from './pages/AboutPage.jsx'
import MainPage from './pages/MainPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>
    },
    {
      path: "*",
      element: <ErrorPage/>
    },
    {
      path: "about",
      element: <AboutPage/>
    },
    {
      path: "register",
      element: <RegisterPage/>
    },
  ])

