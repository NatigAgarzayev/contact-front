import React, { useEffect } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  import { useDispatch } from 'react-redux';
  import { getMe } from './redux/features/authSlice';
  import {ToastContainer} from 'react-toastify'
  import Layout from './components/Layout'
import MainPage from './pages/MainPage'
import PostsPage from './pages/PostsPage'
import UserPostsPage from './pages/UserPostsPage'
import PostPage from './pages/PostPage'
import AddPostPage from './pages/AddPostPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import EditPostPage from './pages/EditPostPage'
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import WriteEmailPage from './pages/WriteEmailPage'
import FAQ from './pages/FAQ';
import AdminAuth from './pages/AdminAuth';
import { getAdmin } from './redux/features/adminSlice';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLayout from './components/AdminLayout';
import AdminFormPage from './pages/AdminFormPage';
import AdminReportsPages from './pages/AdminReportsPages';
import ErrorPage from './pages/ErrorPage';

 const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/",
          element: <MainPage />
        },
        {
          path: "/posts",
          element: <PostsPage />
        },
        {
          path: "/posts/:id",
          element: <UserPostsPage />,
        },
        {
          path: "/:id",
          element: <PostPage />
        },
        {
          path: "/:id/edit",
          element: <EditPostPage />
        },
        {
          path: "/new",
          element: <AddPostPage />
        },
      ]
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/profile/:id",
      element: <ProfilePage />,
      errorElement: <ErrorPage/>,

    },
    {
      path: "/reset",
      element: <WriteEmailPage />,
    },
    {
      path: "/reset/:token",
      element: <ResetPasswordPage />,
    },
    {
      path: "/faq",
      element: <FAQ />
    },
    {
      path: "/admin/login",
      element: <AdminAuth />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <AdminDashboardPage />
        },
        {
          path: "/admin/forms",
          element: <AdminFormPage />
        },
        {
          path: "/admin/reports",
          element: <AdminReportsPages />
        }
      ]
    },
    
  ]);

function App() {

  useEffect(() => {
    window.sessionStorage.setItem('mute', true)
  }, [])
  const dispatch = useDispatch()
  if (window.localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light')
  }
  else if (window.localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark')
  }
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAdmin())
  }, [dispatch])

  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer autoClose={1500} theme={window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'} position='bottom-right'/>
    </>
  )
}

export default App