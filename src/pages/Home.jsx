import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user, globalData } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Hola, {user.username} 👋</h1>
          <p className="subtitle">Bienvenido al dashboard principal.</p>
        </div>
        <span className={`badge ${user.role === 'admin' ? 'badge-info' : 'badge-success'}`}>
          {user.role}
        </span>
      </div>

      <div className="grid-2">
        <div className="metric">
          <div className="metric-label">Sesión iniciada</div>
          <div className="metric-value">{user.loginAt}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Rol</div>
          <div className="metric-value">{user.role}</div>
        </div>
      </div>

      <div className="card">
        <h2>Datos del Context global</h2>
        <p className="subtitle" style={{ marginBottom: '1rem' }}>
          El componente raíz envía estos datos a todas las páginas via Context API:
        </p>
        <div className="divider" />
        {Object.entries(globalData).map(([k, v]) => (
          <div key={k} className="data-row">
            <code>{k}</code>
            <span>{String(v)}</span>
          </div>
        ))}
        <div className="divider" />
        <div className="btn-row">
          <button className="btn" onClick={() => navigate('/about')}>Ir a About →</button>
          {user.role === 'admin' && (
            <button className="btn" onClick={() => navigate('/admin')}>Panel admin →</button>
          )}
        </div>
      </div>
    </div>
  )
}
