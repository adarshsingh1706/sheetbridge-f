'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtVerify } from 'jose'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('session='))
          ?.split('=')[1]

        if (token) {
          const secret = new TextEncoder().encode(process.env.JWT_SECRET)
          const { payload } = await jwtVerify(token, secret)
          setUser(payload)
        }
      } catch (error) {
        console.error('Auth Check Error:', error)
        logout()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (user?.exp && Date.now() >= user.exp * 1000) {
        console.log("Token expired, logging out...")
        logout()
      }
    }

    const interval = setInterval(checkTokenExpiration, 60000) // Check every 60 seconds
    return () => clearInterval(interval) // Cleanup on unmount
  }, [user])

  const login = async (token) => {
    document.cookie = `session=${token}; path=/; max-age=${60 * 60 * 2}; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}`
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    setUser(payload)
  }

  const logout = () => {
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
