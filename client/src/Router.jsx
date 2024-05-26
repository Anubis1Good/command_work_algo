
import {createBrowserRouter} from 'react-router-dom'
import AboutPage from './pages/AboutProject/AboutProject.jsx'
import MainPage from './pages/MainPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import RegisterPage from './pages/Register/RegisterPage.jsx'
import ContactsPage from './pages/Contacts/ContactsPage.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'
import Layout from './pages/Layout.jsx'
import ChatPage from './pages/Chat/ChatPage.jsx'

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><MainPage/></Layout>
    },
    {
      path: "*",
      element: <Layout><ErrorPage/></Layout>
    },
    {
      path: "about",
      element: <Layout><AboutPage/></Layout>
    },

    {
      path: "register",
      element: <Layout><RegisterPage/></Layout>
    },

    {
      path: "contacts",
      element: <Layout><ContactsPage/></Layout>
    },

    {
      path: "login",
      element: <Layout><LoginPage/></Layout>
    },

    {
      path: "chat",
      element: <Layout><ChatPage/></Layout>
    }
  ])



