import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Protege rutas: si no hay sesión, redirige al login
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
