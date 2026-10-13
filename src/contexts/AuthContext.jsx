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

    try {
      if (firebaseUser) {
        await loadOrCreateProfile(firebaseUser)
      } else {
        setProfile(null)
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
      setProfile(null)
    } finally {
      setLoading(false)
    }
  })

  return unsub
}, [])


 

async function loadOrCreateProfile(firebaseUser) {
  const ref = doc(db, 'users', firebaseUser.uid)
  const snap = await getDoc(ref)

  const authName = firebaseUser.displayName?.trim()
  const savedData = snap.exists() ? snap.data() : {}

  // Prefer the saved name, but repair missing/default names
  // using Firebase Authentication's display name.
  const savedName = savedData.name?.trim()

  const resolvedName =
    (!savedName || savedName.toLowerCase() === 'farmer')
      ? (authName || savedName || 'Farmer')
      : savedName

  if (!snap.exists()) {
    await setDoc(
      ref,
      newProfile({
        uid: firebaseUser.uid,
        name: resolvedName,
        email: firebaseUser.email || '',
      })
    )
  } else if (
    savedData.name !== resolvedName ||
    !savedData.uid ||
    !savedData.email
  ) {
    await setDoc(
      ref,
      {
        name: resolvedName,
        uid: firebaseUser.uid,
        email: firebaseUser.email || savedData.email || '',
      },
      { merge: true }
    )
  }

  // Load the final saved profile into React state.
  const finalSnap = await getDoc(ref)

  if (finalSnap.exists()) {
    setProfile({
      id: finalSnap.id,
      ...finalSnap.data(),
    })
  }
}


  // =========================
  // EMAIL + PASSWORD SIGNUP
  // =========================

  
async function signup({ name, email, password }) {
  const cleanName = name.trim()
  const cleanEmail = email.trim()

  const cred = await createUserWithEmailAndPassword(
    auth,
    cleanEmail,
    password
  )

  await updateProfile(cred.user, {
    displayName: cleanName,
  })

  const profileData = newProfile({
    uid: cred.user.uid,
    name: cleanName,
    email: cleanEmail,
  })

  // Save the correct name to Firestore immediately
  await setDoc(
    doc(db, 'users', cred.user.uid),
    {
      ...profileData,
      name: cleanName,
      email: cleanEmail,
    },
    { merge: true }
  )

  // Update the dashboard's profile state immediately
  setProfile({
    id: cred.user.uid,
    ...profileData,
    name: cleanName,
    email: cleanEmail,
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