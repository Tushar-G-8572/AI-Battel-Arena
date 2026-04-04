import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import ArenaPage from '../features/ai/pages/ArenaPage'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/',
        element: <ArenaPage />
    },
    {
        path:'*',
        element:<Navigate to='/' replace />
    }
])

export default router