'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { 
  Code, Sparkles, Copy, Check, Loader2, RefreshCw,
  Terminal, FileCode, Braces
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

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/ai/generate' }),
  })

  const getMessageText = (message: typeof messages[0]): string => {
    if (!message.parts || !Array.isArray(message.parts)) return ''
    return message.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('')
  }

  const handleGenerate = () => {
    if (!prompt.trim()) return
    
    const selectedLang = languages.find(l => l.id === language)
    const fullPrompt = `Generate ${selectedLang?.name || language} code for: "${prompt}". 
    
    Requirements:
    - Write clean, well-commented code
    - Include error handling where appropriate
    - Follow best practices for ${selectedLang?.name || language}
    - Add example usage if helpful
    
    Provide only the code with comments, no additional explanation outside the code.`
    
    setMessages([])
    sendMessage({ text: fullPrompt }, { body: { type: 'code' } })
  }

  const handleCopy = () => {
    const lastMessage = messages.filter(m => m.role === 'assistant').pop()
    if (lastMessage) {
      navigator.clipboard.writeText(getMessageText(lastMessage))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const lastAssistantMessage = messages.filter(m => m.role === 'assistant').pop()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">AI Powered</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">AI Code Generator</h1>
            <p className="text-[rgb(var(--muted-foreground))] max-w-xl mx-auto">
              Generate code in any programming language with AI. Just describe what you need.
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-20 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* Tool Interface */}
          <div className="card p-6 mb-8">
            {/* Language Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Select Language</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      language === lang.id
                        ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                        : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{lang.icon}</span>
                    <span className="text-xs font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Describe what you want to build</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A function that sorts an array of objects by a specific key..."
                className="input-field min-h-[120px] resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || status === 'streaming'}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {status === 'streaming' ? (
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
          {(lastAssistantMessage || status === 'streaming') && (
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[rgb(var(--secondary))] border-b border-[rgb(var(--border))]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                  <span className="text-sm font-medium">Generated Code</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]">
                    {languages.find(l => l.id === language)?.name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerate}
                    disabled={status === 'streaming'}
                    className="p-2 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw className={`w-4 h-4 ${status === 'streaming' ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!lastAssistantMessage}
                    className="p-2 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors"
                    title="Copy"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-slate-900 overflow-x-auto">
                <pre className="text-sm text-slate-100 font-mono whitespace-pre-wrap">
                  {lastAssistantMessage ? getMessageText(lastAssistantMessage) : (
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
            <h2 className="text-2xl font-bold mb-6">Example Prompts</h2>
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
                  className="card p-4 text-left hover:border-[rgb(var(--primary))]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileCode className="w-5 h-5 text-[rgb(var(--primary))]" />
                    <span className="text-sm">{example}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Which programming languages are supported?', a: 'We support Python, JavaScript, TypeScript, Java, C#, C++, Go, Rust, PHP, Ruby, Swift, SQL and more.' },
                { q: 'Is the generated code production-ready?', a: 'The code follows best practices, but we recommend reviewing and testing before using in production.' },
                { q: 'Can I generate complex applications?', a: 'Yes! You can generate functions, classes, APIs, database queries, and even full components.' },
              ].map((faq, i) => (
                <div key={i} className="card p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">{faq.a}</p>
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
