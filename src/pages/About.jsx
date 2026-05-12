import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const concepts = [
  { icon: '🧭', title: 'React Router DOM', desc: 'Navegación declarativa con <Routes>, <Route> y useNavigate.' },
  { icon: '💾', title: 'Persistencia con localStorage', desc: 'El estado inicial del AuthContext lee localStorage, así la sesión sobrevive recargas.' },
  { icon: '🔒', title: 'Ruta protegida', desc: 'ProtectedRoute verifica el usuario; si no hay sesión, hace <Navigate to="/login">.' },
  { icon: '🌐', title: 'Context API', desc: 'AuthContext provee user, login, logout y globalData a toda la app sin props drilling.' },
]

export default function About() {
  const { globalData } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="page">
      <h1>Sobre esta app</h1>
      <p className="subtitle" style={{ marginBottom: '1.5rem' }}>
        Demostración de React Router + Context API + Rutas protegidas.
      </p>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <h2>Conceptos implementados</h2>
        {concepts.map(({ icon, title, desc }) => (
          <div key={title} className="concept-row">
            <div className="concept-icon">{icon}</div>
            <div>
              <p className="concept-title">{title}</p>
              <p className="concept-desc">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info">
        🌐 Dato del Context → <code>appName: "{globalData.appName}"</code>, <code>theme: "{globalData.theme}"</code> — llegaron desde el componente raíz.
      </div>

      <button className="btn" onClick={() => navigate('/home')}>← Volver al home</button>
    </div>
  )
}
