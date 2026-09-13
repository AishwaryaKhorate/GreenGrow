import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import RedirectIfAuthed from './components/RedirectIfAuthed'
import AppShell from './components/layout/AppShell'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import { TopicsList, TopicDetail } from './pages/Topics'
import Quiz from './pages/Quiz'
import Leaderboard from './pages/Leaderboard'
import Progress from './pages/Progress'
import Community from './pages/Community'
import AIAdvisor from './pages/AIAdvisor'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public: homepage -> signup/login. Signed-in users are
              bounced straight to /dashboard by RedirectIfAuthed. */}
          <Route
            path="/"
            element={
              <RedirectIfAuthed>
                <Homepage />
              </RedirectIfAuthed>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectIfAuthed>
                <Login />
              </RedirectIfAuthed>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfAuthed>
                <Signup />
              </RedirectIfAuthed>
            }
          />

          {/* Authenticated app, one responsive layout for mobile + desktop
              (AppShell switches between a bottom tab bar and a sidebar). */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="topics" element={<TopicsList />} />
            <Route path="topics/:topicId" element={<TopicDetail />} />
            <Route path="topics/:topicId/quiz" element={<Quiz />} />
            <Route path="advisor" element={<AIAdvisor />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="progress" element={<Progress />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
