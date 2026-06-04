'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { Code, Copy, Check, ArrowRightLeft } from 'lucide-react'

export default function Base64Page() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)))
      setOutput(encoded)
      setError('')
    } catch (e) {
      setError('Error encoding text')
      setOutput('')
    }
  }

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)))
      setOutput(decoded)
      setError('')
    } catch (e) {
      setError('Invalid Base64 string')
      setOutput('')
    }
  }

  const handleConvert = () => {
    if (mode === 'encode') {
      handleEncode()
    } else {
      handleDecode()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swapInputOutput = () => {
    setInput(output)
    setOutput('')
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
              <Code className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">Developer Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Base64 Encoder/Decoder</h1>
            <p className="text-slate-500 max-w-xl mx-auto">
              Encode and decode text to/from Base64 format instantly
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-20 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode('encode')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                mode === 'encode'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Encode to Base64
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                mode === 'decode'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Decode from Base64
            </button>
          </div>

          {/* Tool Interface */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
            <label className="block text-sm font-medium mb-2 text-slate-700">
              {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] resize-y font-mono"
            />
            
            <button
              onClick={handleConvert}
              disabled={!input.trim()}
              className="w-full mt-4 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Output */}
          {output && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Result</label>
                <div className="flex gap-2">
                  <button
                    onClick={swapInputOutput}
                    className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                    title="Swap input/output"
                  >
                    <ArrowRightLeft className="w-4 h-4 text-slate-500" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>
              <div className="font-mono text-sm text-slate-600 break-all bg-white p-4 rounded-xl border border-slate-100 min-h-[120px]">
                {output}
              </div>
            </div>
          )}

          {/* Info */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">What is Base64?</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="text-slate-600 mb-4">
                Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It&apos;s commonly used for:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  Encoding data in URLs and web forms
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  Embedding images in HTML or CSS
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  Transmitting binary data over text-based protocols
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  Storing complex data in JSON or XML
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
