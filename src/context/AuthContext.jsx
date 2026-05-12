import { createContext, useContext, useState } from 'react'

// 1. Crear el contexto
const AuthContext = createContext(null)

// 2. Proveedor del contexto
export function AuthProvider({ children }) {
  // Persistencia: leer usuario desde localStorage al iniciar
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('auth_user')) || null
    } catch {
      return null
    }
  })

  // Dato global que el componente principal envía a todas las páginas
  const globalData = {
    appName: 'RouterApp',
    version: '1.0.0',
    theme: 'claro',
  }

  const login = (username, password) => {
    // Credenciales válidas: admin/1234 o cualquier user con pass de 4+ chars
    if (
      (username === 'admin' && password === '1234') ||
      (username.length >= 3 && password.length >= 4)
    ) {
      const userData = {
        username,
        role: username === 'admin' ? 'admin' : 'user',
        loginAt: new Date().toLocaleTimeString(),
      }
      localStorage.setItem('auth_user', JSON.stringify(userData))
      setUser(userData)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('auth_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, globalData }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. Hook personalizado para consumir el contexto
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
