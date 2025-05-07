'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || !name) {
      setError("All fields are required")
      return
    }

    try {
      // Form submit hone par backend ko call karo
      const response = await fetch('/api/custom-signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        router.push('/onboarding') // Redirect to onboarding page
      } else {
        const { error } = await response.json()
        setError(error || 'Signup failed.')
      }
    } catch (err) {
      setError('Signup failed.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create an Account</h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded mb-4 bg-white bg-opacity-20 text-white placeholder-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-4 bg-white bg-opacity-20 text-white placeholder-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded mb-6 bg-white bg-opacity-20 text-white placeholder-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-white text-indigo-600 font-semibold py-3 rounded hover:bg-indigo-100 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}
