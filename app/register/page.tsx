'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import Link from 'next/link'
import { Mail, Lock, User, Chrome } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (name && email && password) {
      localStorage.setItem('docusprint_user', JSON.stringify({ email, name }))
      window.location.href = '/tools'
    } else {
      setError('Please fill in all fields')
    }
    setLoading(false)
  }

  const handleGoogleSignup = () => {
    const demoUser = { email: 'demo@docusprint.app', name: 'Demo User' }
    localStorage.setItem('docusprint_user', JSON.stringify(demoUser))
    window.location.href = '/tools'
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-md">
          <div className="card p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create your account</h1>
              <p className="text-[rgb(var(--muted-foreground))]">
                Start using 50+ free tools today
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button 
                onClick={handleGoogleSignup}
                className="btn-secondary w-full flex items-center justify-center gap-3"
              >
                <Chrome className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[rgb(var(--border))]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[rgb(var(--card))] text-[rgb(var(--muted-foreground))]">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--muted-foreground))]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--muted-foreground))]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgb(var(--muted-foreground))]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="input-field pl-11"
                    required
                    minLength={8}
                  />
                </div>
                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[rgb(var(--border))] text-[rgb(var(--primary))] focus:ring-[rgb(var(--primary))]"
                  required
                />
                <label htmlFor="agree" className="text-sm text-[rgb(var(--muted-foreground))]">
                  I agree to the{' '}
                  <Link href="/terms" className="text-[rgb(var(--primary))] hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-[rgb(var(--primary))] hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !agreed}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-[rgb(var(--muted-foreground))] mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-[rgb(var(--primary))] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
