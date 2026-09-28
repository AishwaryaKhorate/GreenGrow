import { createContext, useContext, useEffect, useState } from 'react'

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth'

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'

import { auth, db } from '../firebase'

const AuthContext = createContext(null)

// Shape of a new user's Firestore profile document (users/{uid}).
// This is the single source of truth for points/level/streak.
function newProfile({ uid, name, email }) {
  return {
    uid,
    name,
    email,
    points: 0,
    level: 1,
    farmSizeAcres: null,
    quizzesCompleted: 0,
    topicsCompleted: {},
    lessonsCompleted: {},
    badges: [],
    daysActive: 0,
    lastActiveDate: null,
    createdAt: serverTimestamp(),
  }
}

// Google provider
const googleProvider = new GoogleAuthProvider()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        await loadOrCreateProfile(firebaseUser)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return unsub
  }, [])

  async function loadOrCreateProfile(firebaseUser) {
    const ref = doc(db, 'users', firebaseUser.uid)
    const snap = await getDoc(ref)

    if (snap.exists()) {
      setProfile({
        id: snap.id,
        ...snap.data(),
      })
    } else {
      const profileData = newProfile({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'Farmer',
        email: firebaseUser.email,
      })

      await setDoc(ref, profileData)

      setProfile({
        id: firebaseUser.uid,
        ...profileData,
      })
    }
  }

  // =========================
  // EMAIL + PASSWORD SIGNUP
  // =========================

  async function signup({ name, email, password }) {
    const cred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    await updateProfile(cred.user, {
      displayName: name,
    })

    await loadOrCreateProfile({
      ...cred.user,
      displayName: name,
    })

    return cred.user
  }

  // =========================
  // EMAIL + PASSWORD LOGIN
  // =========================

  async function login({ email, password }) {
    const cred = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    return cred.user
  }

  // =========================
  // GOOGLE LOGIN
  // =========================

  async function loginWithGoogle() {
    const result = await signInWithPopup(
      auth,
      googleProvider
    )

    const googleUser = result.user

    // Create profile if this is a new Google user
    await loadOrCreateProfile(googleUser)

    return googleUser
  }

  // =========================
  // LOGOUT
  // =========================

  async function logout() {
    await signOut(auth)
  }

  // =========================
  // REFRESH PROFILE
  // =========================

  async function refreshProfile() {
    if (user) {
      await loadOrCreateProfile(user)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) {
    throw new Error(
      'useAuth must be used inside <AuthProvider>'
    )
  }

  return ctx
}