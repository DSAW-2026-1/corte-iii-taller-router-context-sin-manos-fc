import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <span className="navbar-brand">⚛️ RouterApp</span>
      <div className="navbar-links">
        {user && <NavLink to="/home">Home</NavLink>}
        {user && <NavLink to="/about">About</NavLink>}
        {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        {!user && <NavLink to="/login">Login</NavLink>}
        {user && (
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  )
}
