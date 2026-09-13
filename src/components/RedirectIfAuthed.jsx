import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Wraps public-only pages (Homepage, Login, Signup) so a signed-in user
// visiting them is sent straight to the app instead of seeing marketing
// copy or a login form they don't need.
export default function RedirectIfAuthed({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (user) return <Navigate to="/dashboard" replace />
  return children
}
