
import {createBrowserRouter} from 'react-router-dom'
import AboutPage from './pages/AboutPage.jsx'
import MainPage from './pages/MainPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import SomePage from './pages/SomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import UsersPage from './pages/UsersPage.jsx'

export const router = createBrowserRouter([
    {
      path: "main",
      element: <MainPage/>
    },
    {
      path: "error",
      element: <ErrorPage/>
    },
    {
      path: "about",
      element: <AboutPage/>
    },
    {
      path: "some",
      element: <SomePage/>
    },
    {
      path: "register",
      element: <RegisterPage/>
    },
    {
      path: "users",
      element: <UsersPage/>
    }

  ])

