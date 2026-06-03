'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { 
  Lock, Copy, Check, RefreshCw, Shield, Eye, EyeOff,
  Sliders, CheckCircle2
} from 'lucide-react'

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showPassword, setShowPassword] = useState(true)

  const generatePassword = () => {
    let charset = ''
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    if (!charset) {
      setPassword('Select at least one option')
      return
    }
    
    let result = ''
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length]
    }
    
    setPassword(result)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrength = () => {
    if (!password) return { label: 'None', color: 'bg-slate-500', width: '0%' }
    
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (password.length >= 16) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    
    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: '25%' }
    if (score <= 4) return { label: 'Fair', color: 'bg-yellow-500', width: '50%' }
    if (score <= 5) return { label: 'Good', color: 'bg-blue-500', width: '75%' }
    return { label: 'Strong', color: 'bg-green-500', width: '100%' }
  }

  const strength = getStrength()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Security Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Password Generator</h1>
            <p className="text-[rgb(var(--muted-foreground))] max-w-xl mx-auto">
              Generate strong, secure passwords instantly. Customizable length and character types.
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-20 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* Tool Interface */}
          <div className="card p-6 mb-8">
            {/* Password Display */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Generated Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  readOnly
                  placeholder="Click generate to create a password"
                  className="input-field pr-24 font-mono text-lg tracking-wider"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {password && (
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
              
              {/* Strength Indicator */}
              {password && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Strength</span>
                    <span className={strength.label === 'Strong' ? 'text-green-400' : strength.label === 'Good' ? 'text-blue-400' : strength.label === 'Fair' ? 'text-yellow-400' : 'text-red-400'}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[rgb(var(--secondary))] overflow-hidden">
                    <div 
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Length Slider */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Length</label>
                <span className="text-sm font-mono bg-[rgb(var(--secondary))] px-2 py-0.5 rounded">{length}</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-[rgb(var(--secondary))] rounded-lg appearance-none cursor-pointer accent-[rgb(var(--primary))]"
              />
              <div className="flex justify-between text-xs text-[rgb(var(--muted-foreground))] mt-1">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            {/* Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Include Characters</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Uppercase (A-Z)', state: includeUppercase, setter: setIncludeUppercase },
                  { label: 'Lowercase (a-z)', state: includeLowercase, setter: setIncludeLowercase },
                  { label: 'Numbers (0-9)', state: includeNumbers, setter: setIncludeNumbers },
                  { label: 'Symbols (!@#$%)', state: includeSymbols, setter: setIncludeSymbols },
                ].map((option, i) => (
                  <button
                    key={i}
                    onClick={() => option.setter(!option.state)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      option.state
                        ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                        : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${
                      option.state ? 'bg-[rgb(var(--primary))]' : 'bg-[rgb(var(--secondary))]'
                    }`}>
                      {option.state && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePassword}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Generate Password
            </button>
          </div>

          {/* Tips */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Password Security Tips</h2>
            <div className="card p-6">
              <ul className="space-y-3">
                {[
                  'Use at least 12 characters for better security',
                  'Include a mix of uppercase, lowercase, numbers, and symbols',
                  'Never reuse passwords across different accounts',
                  'Use a password manager to store passwords securely',
                  'Enable two-factor authentication when available',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[rgb(var(--muted-foreground))]">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
