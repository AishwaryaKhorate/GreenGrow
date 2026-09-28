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

          {/* =========================
              HOMEPAGE - FIRST PAGE
          ========================== */}
          <Route
            path="/"
            element={<Homepage />}
          />
          <Route
            path="/home"
            element={<Homepage />}
          />
          <Route
            path="/homepage"
            element={<Homepage />}
          /> 
          <Route
            path="/Homepage"
            element={<Homepage />}
          />   

          {/* =========================
              LOGIN
          ========================== */}
          <Route
            path="/login"
            element={
              <RedirectIfAuthed>
                <Login />
              </RedirectIfAuthed>
            }
          />

          {/* =========================
              SIGNUP
          ========================== */}
          <Route
            path="/signup"
            element={
              <RedirectIfAuthed>
                <Signup />
              </RedirectIfAuthed>
            }
          />

          {/* =========================
              PROTECTED DASHBOARD
          ========================== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            {/* First page inside dashboard */}
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