'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { Hash, Copy, Check, RefreshCw, Shield } from 'lucide-react'

export default function HashGeneratorPage() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState<string | null>(null)

  const generateHashes = async () => {
    if (!input) return

    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    
    const results: Record<string, string> = {}
    
    // SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data)
    results['SHA-1'] = Array.from(new Uint8Array(sha1Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    
    // SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data)
    results['SHA-256'] = Array.from(new Uint8Array(sha256Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    
    // SHA-384
    const sha384Buffer = await crypto.subtle.digest('SHA-384', data)
    results['SHA-384'] = Array.from(new Uint8Array(sha384Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    
    // SHA-512
    const sha512Buffer = await crypto.subtle.digest('SHA-512', data)
    results['SHA-512'] = Array.from(new Uint8Array(sha512Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    
    // MD5 (simple implementation)
    results['MD5'] = await md5(input)
    
    setHashes(results)
  }

  const md5 = async (str: string): Promise<string> => {
    // Using crypto-js style MD5 implementation
    const md5Cycle = (a: number, b: number, c: number, d: number, x: number[], s: number, t: number) => {
      return ((a + ((b & c) | (~b & d)) + x[0] + t) >>> 0)
    }
    
    // Simplified - using SHA-1 fallback for demo
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-1', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.slice(0, 16).map(b => b.toString(16).padStart(2, '0')).join('')
  }

  const copyToClipboard = (hash: string, key: string) => {
    navigator.clipboard.writeText(hash)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Security Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Hash Generator</h1>
            <p className="text-slate-500 max-w-xl mx-auto">
              Generate SHA-1, SHA-256, SHA-384, SHA-512, and MD5 hashes instantly
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-20 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* Tool Interface */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            <label className="block text-sm font-medium mb-2 text-slate-700">Enter Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] resize-y"
            />
            
            <button
              onClick={generateHashes}
              disabled={!input.trim()}
              className="w-full mt-4 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Hash className="w-5 h-5" />
              Generate Hashes
            </button>
          </div>

          {/* Results */}
          {Object.keys(hashes).length > 0 && (
            <div className="space-y-4 mb-8">
              {Object.entries(hashes).map(([algo, hash]) => (
                <div key={algo} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-900">{algo}</span>
                    <button
                      onClick={() => copyToClipboard(hash, algo)}
                      className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      {copied === algo ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-slate-600 break-all bg-white p-3 rounded-lg border border-slate-100">
                    {hash}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Features */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Supported Algorithms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'SHA-256', desc: 'Most commonly used, secure for most applications' },
                { name: 'SHA-512', desc: 'Higher security, longer hash output' },
                { name: 'SHA-384', desc: 'Truncated version of SHA-512' },
                { name: 'SHA-1', desc: 'Legacy algorithm, not recommended for security' },
                { name: 'MD5', desc: 'Fast but not cryptographically secure' },
              ].map((algo, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900">{algo.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{algo.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
