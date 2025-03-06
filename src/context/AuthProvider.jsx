"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me") // ✅ Fetch user from API
        if (!res.ok) throw new Error("Not authenticated")
        const data = await res.json()
        setUser(data.user) // ✅ Set user state
      } catch (error) {
        console.error(error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async () => {
    try {
      const res = await fetch("/api/auth/me")
      if (!res.ok) throw new Error("Not authenticated")
      const data = await res.json()
      setUser(data.user) // ✅ Update user state
      router.push("/dashboard") // ✅ Redirect after login
    } catch (error) {
      console.error(error)
      setUser(null)
    }
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
