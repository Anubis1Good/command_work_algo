
import {createBrowserRouter} from 'react-router-dom'
import AboutPage from './pages/AboutPage.jsx'
import MainPage from './pages/MainPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import RegisterPage from './pages/Register/RegisterPage.jsx'
import UserPage from './pages/UserPage.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'

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

    {
      path: "user",
      element: <UserPage/>
    },

    {
      path: "login",
      element: <LoginPage/>
    }
  ])

