import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import { Index } from './routes'
import { AuthScreen } from './components/auth/authContent/authComponents/AuthScreen'
import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './components/auth/context/AuthContext'
import HomePage from './components/homeDashboard/HomePage'
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute'

function App() {
    const router = createBrowserRouter([
        {
            element: <Layout />, 
            children: [
                // الصفحة الرئيسية عامة ومفتوحة للكل من غير حماية
                { path: "", element: <Index /> },
                
                // صفحات التسجيل عامة برضه
                { path: "/SignIn", element: <AuthScreen /> },
                { path: "/SignUp", element: <AuthScreen /> },
                
                // الداشبورد هي اللي محمية فقط
                { 
                    path: "/UserDashboard", 
                    element: (
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    ) 
                },
            ]
        }
    ])

    return (
        <AuthProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
        </AuthProvider>
    )
}
export default App




