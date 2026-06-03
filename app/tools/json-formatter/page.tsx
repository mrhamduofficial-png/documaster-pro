'use client'

import { useState, useEffect } from 'react'
import { Header, Footer } from '@/components/navigation'
import { 
  Braces, Copy, Check, Download, Upload, AlertCircle,
  Minimize2, Maximize2, FileJson
} from 'lucide-react'

export default function JSONFormatterPage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indentSize))
      setError('')
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message)
      setOutput('')
    }
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message)
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setInput(event.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const sampleJSON = {
    name: "DocuSprint",
    version: "1.0.0",
    features: ["AI Tools", "PDF Converter", "Image Compressor"],
    premium: { price: 9.99, currency: "USD" }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <Braces className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Developer Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">JSON Formatter & Validator</h1>
            <p className="text-[rgb(var(--muted-foreground))] max-w-xl mx-auto">
              Format, validate, and minify JSON data instantly. Free online JSON beautifier.
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-20 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* Tool Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Input */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Input JSON</h3>
                <div className="flex gap-2">
                  <label className="cursor-pointer p-2 rounded-lg bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))] transition-colors">
                    <Upload className="w-4 h-4" />
                    <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
                  </label>
                  <button
                    onClick={() => setInput(JSON.stringify(sampleJSON))}
                    className="text-xs px-3 py-2 rounded-lg bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))] transition-colors"
                  >
                    Load Sample
                  </button>
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Paste your JSON here...'
                className="input-field min-h-[400px] font-mono text-sm resize-none"
              />
            </div>

            {/* Output */}
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Formatted Output</h3>
                <div className="flex gap-2">
                  {output && (
                    <>
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))] transition-colors"
                        title="Copy"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-2 rounded-lg bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))] transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              {error ? (
                <div className="min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-red-400">
                    <AlertCircle className="w-12 h-12 mx-auto mb-3" />
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              ) : (
                <textarea
                  value={output}
                  readOnly
                  placeholder="Formatted JSON will appear here..."
                  className="input-field min-h-[400px] font-mono text-sm resize-none bg-slate-900 text-slate-100"
                />
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="card p-4 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Indent Size:</label>
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                  className="input-field w-20 py-2"
                >
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={8}>8</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={formatJSON}
                  disabled={!input.trim()}
                  className="btn-primary flex items-center gap-2"
                >
                  <Maximize2 className="w-4 h-4" />
                  Format / Beautify
                </button>
                <button
                  onClick={minifyJSON}
                  disabled={!input.trim()}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Minimize2 className="w-4 h-4" />
                  Minify
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Maximize2, title: 'Format & Beautify', desc: 'Pretty print JSON with custom indentation' },
                { icon: Minimize2, title: 'Minify', desc: 'Compress JSON by removing whitespace' },
                { icon: AlertCircle, title: 'Validate', desc: 'Detect and highlight JSON syntax errors' },
              ].map((feature, i) => (
                <div key={i} className="card p-6 text-center">
                  <feature.icon className="w-10 h-10 mx-auto mb-4 text-[rgb(var(--primary))]" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">{feature.desc}</p>
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
