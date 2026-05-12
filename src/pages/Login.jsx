import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Si ya hay sesión, redirigir al home
  useEffect(() => {
    if (user) navigate('/home')
  }, [user, navigate])

  const handleLogin = () => {
    if (!username || !password) {
      setError('Completa todos los campos')
      return
    }
    const ok = login(username, password)
    if (ok) {
      navigate('/home')
    } else {
      setError('Credenciales inválidas. Usa admin / 1234 o un usuario con contraseña de 4+ caracteres.')
    }
  }

  return (
    <div className="page">
      <div className="login-box">
        <div className="login-icon">🔐</div>
        <h1>Iniciar sesión</h1>
        <p className="subtitle">Usa <code>admin / 1234</code> o crea tu usuario</p>

        <div className="card">
          {error && <div className="error-msg">{error}</div>}
          <div className="form-group">
            <label>Usuario</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <button className="btn-primary" onClick={handleLogin}>Entrar</button>
        </div>

        <div className="alert alert-info">
          ℹ️ La sesión se guarda en <code>localStorage</code>. Si recargas la página, seguirás autenticado.
        </div>
      </div>
    </div>
  )
}
