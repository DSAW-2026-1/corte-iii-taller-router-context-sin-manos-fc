import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Admin() {
  const { user, globalData } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="page-header">
        <h1>Panel de administrador</h1>
        <span className="badge badge-danger">Solo admin</span>
      </div>

      <div className="card">
        <p className="subtitle" style={{ marginBottom: '1rem' }}>
          Bienvenido, <strong>{user?.username}</strong>. Esta ruta solo es accesible para usuarios con rol <code>admin</code>.
        </p>
        <div className="divider" />
        <h2>GlobalData recibido del Context</h2>
        {Object.entries(globalData).map(([k, v]) => (
          <div key={k} className="data-row">
            <code>{k}</code>
            <span>{String(v)}</span>
          </div>
        ))}
        <div className="divider" />
        <button className="btn" onClick={() => navigate('/home')}>← Volver al home</button>
      </div>
    </div>
  )
}
