'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { 
  Code, Sparkles, Copy, Check, Loader2, RefreshCw,
  Terminal, FileCode
} from 'lucide-react'

const languages = [
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'csharp', name: 'C#', icon: '🟪' },
  { id: 'cpp', name: 'C++', icon: '🔵' },
  { id: 'go', name: 'Go', icon: '🐹' },
  { id: 'rust', name: 'Rust', icon: '🦀' },
  { id: 'php', name: 'PHP', icon: '🐘' },
  { id: 'ruby', name: 'Ruby', icon: '💎' },
  { id: 'swift', name: 'Swift', icon: '🍎' },
  { id: 'sql', name: 'SQL', icon: '🗃️' },
]

export default function CodeGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState('python')
  const [copied, setCopied] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setLoading(true)
    setGeneratedCode('')
    
    const selectedLang = languages.find(l => l.id === language)
    const fullPrompt = `Generate ${selectedLang?.name || language} code for: "${prompt}". 
    
    Requirements:
    - Write clean, well-commented code
    - Include error handling where appropriate
    - Follow best practices for ${selectedLang?.name || language}
    - Add example usage if helpful
    
    Provide only the code with comments, no additional explanation outside the code.`
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt, type: 'code' })
      })
      
      if (!response.ok) throw new Error('Failed to generate')
      
      const data = await response.json()
      setGeneratedCode(data.result || 'No code generated')
    } catch (error) {
      setGeneratedCode('// Error generating code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-4">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">AI Powered</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">AI Code Generator</h1>
            <p className="text-slate-600 max-w-xl mx-auto">
              Generate code in any programming language with AI. Just describe what you need.
            </p>
          </div>

          {/* Tool Interface */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
            {/* Language Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">Select Language</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      language === lang.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{lang.icon}</span>
                    <span className="text-xs font-medium text-slate-700">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Describe what you want to build</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A function that sorts an array of objects by a specific key..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || loading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Code...
                </>
              ) : (
                <>
                  <Code className="w-5 h-5" />
                  Generate Code
                </>
              )}
            </button>
          </div>

          {/* Output */}
          {(generatedCode || loading) && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Generated Code</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-600">
                    {languages.find(l => l.id === language)?.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!generatedCode}
                    className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                    title="Copy"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-slate-900 overflow-x-auto">
                <pre className="text-sm text-slate-100 font-mono whitespace-pre-wrap">
                  {generatedCode || (
                    <span className="flex items-center gap-2 text-slate-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating code...
                    </span>
                  )}
                </pre>
              </div>
            </div>
          )}

          {/* Example Prompts */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Example Prompts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'A REST API endpoint for user authentication',
                'A function to validate email addresses',
                'A class for managing a shopping cart',
                'A script to read and parse CSV files',
                'A React component with state management',
                'A database query for pagination',
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(example)}
                  className="bg-white rounded-2xl border border-slate-200 p-4 text-left hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileCode className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-700">{example}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Which programming languages are supported?', a: 'We support Python, JavaScript, TypeScript, Java, C#, C++, Go, Rust, PHP, Ruby, Swift, SQL and more.' },
                { q: 'Is the generated code production-ready?', a: 'The code follows best practices, but we recommend reviewing and testing before using in production.' },
                { q: 'Can I generate complex applications?', a: 'Yes! You can generate functions, classes, APIs, database queries, and even full components.' },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-600">{faq.a}</p>
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
