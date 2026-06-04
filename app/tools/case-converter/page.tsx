'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { Type, Copy, Check, ArrowRight, RotateCcw } from 'lucide-react'

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [activeCase, setActiveCase] = useState('')
  const [copied, setCopied] = useState(false)

  const conversions = [
    { id: 'upper', label: 'UPPERCASE', fn: (t: string) => t.toUpperCase() },
    { id: 'lower', label: 'lowercase', fn: (t: string) => t.toLowerCase() },
    { id: 'title', label: 'Title Case', fn: (t: string) => t.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) },
    { id: 'sentence', label: 'Sentence case', fn: (t: string) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()) },
    { id: 'camel', label: 'camelCase', fn: (t: string) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
    { id: 'pascal', label: 'PascalCase', fn: (t: string) => t.replace(/\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).replace(/\s+/g, '') },
    { id: 'snake', label: 'snake_case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') },
    { id: 'kebab', label: 'kebab-case', fn: (t: string) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
    { id: 'constant', label: 'CONSTANT_CASE', fn: (t: string) => t.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '') },
    { id: 'alternate', label: 'aLtErNaTe CaSe', fn: (t: string) => t.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('') },
    { id: 'inverse', label: 'iNVERSE cASE', fn: (t: string) => t.split('').map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('') },
  ]

  const handleConvert = (conversionId: string, fn: (t: string) => string) => {
    if (!inputText.trim()) return
    setOutputText(fn(inputText))
    setActiveCase(conversionId)
  }

  const handleCopy = async () => {
    if (!outputText) return
    await navigator.clipboard.writeText(outputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInputText('')
    setOutputText('')
    setActiveCase('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
              <Type className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-slate-900">Text Case Converter</h1>
            <p className="text-slate-600">Convert text to any case format instantly</p>
          </div>

          {/* Ad Slot */}
          <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl h-20 mb-8 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Advertisement Area</span>
          </div>

          {/* Tool */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
            {/* Input */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Enter your text</label>
                <button
                  onClick={handleClear}
                  className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear
                </button>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900"
              />
            </div>

            {/* Conversion Buttons */}
            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 mb-3 block">Select conversion type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {conversions.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => handleConvert(conv.id, conv.fn)}
                    disabled={!inputText.trim()}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      activeCase === conv.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {conv.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Output */}
            {outputText && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Result</label>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <p className="text-slate-900 whitespace-pre-wrap break-words">{outputText}</p>
                </div>
              </div>
            )}
          </div>

          {/* How to Use */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-slate-900">How to Use</h2>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center flex-shrink-0">1</span>
                <span className="text-slate-600">Enter or paste your text in the input box</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center flex-shrink-0">2</span>
                <span className="text-slate-600">Click on any conversion button to transform your text</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center flex-shrink-0">3</span>
                <span className="text-slate-600">Copy the result to your clipboard</span>
              </li>
            </ol>
          </div>

          {/* Features */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Supported Conversions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-900">UPPERCASE</span>
                <p className="text-sm text-slate-500">ALL LETTERS CAPITALIZED</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-900">lowercase</span>
                <p className="text-sm text-slate-500">all letters in small case</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-900">Title Case</span>
                <p className="text-sm text-slate-500">First Letter Of Each Word Capitalized</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-900">camelCase</span>
                <p className="text-sm text-slate-500">firstWordLowerRestCapitalized</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-900">snake_case</span>
                <p className="text-sm text-slate-500">words_separated_by_underscores</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-900">kebab-case</span>
                <p className="text-sm text-slate-500">words-separated-by-hyphens</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
