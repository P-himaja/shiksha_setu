"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface UserProfile {
  uid: string
  name: string
  email: string
  phone?: string
  grade?: string
  school?: string
  subjects?: string
  createdAt: Date
  updatedAt: Date
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        // Fetch user profile from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile)
        }
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signUp = async (email: string, password: string, name: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      name,
      email: user.email!,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await setDoc(doc(db, "users", user.uid), userProfile)
    setUserProfile(userProfile)
  }

  const signIn = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)

  const userRef = doc(db, "users", user.uid)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    const userProfile: UserProfile = {
      uid: user.uid,
      name: user.displayName || "User",
      email: user.email!,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await setDoc(userRef, userProfile)
    setUserProfile(userProfile)
  } else {
    setUserProfile(userDoc.data() as UserProfile)
  }
}


  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)

    // Check if user profile exists, if not create one
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (!userDoc.exists()) {
      const userProfile: UserProfile = {
        uid: user.uid,
        name: user.displayName || "User",
        email: user.email!,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      await setDoc(doc(db, "users", user.uid), userProfile)
      setUserProfile(userProfile)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return

    const updatedData = {
      ...data,
      updatedAt: new Date(),
    }

    await updateDoc(doc(db, "users", user.uid), updatedData)
    setUserProfile((prev) => (prev ? { ...prev, ...updatedData } : null))
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
