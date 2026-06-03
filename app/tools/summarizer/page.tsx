'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { Sparkles, Copy, Check, Loader2, FileText, Wand2 } from 'lucide-react'

export default function SummarizerPage() {
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [style, setStyle] = useState<'bullet' | 'paragraph'>('paragraph')

  const summarize = async () => {
    if (!text.trim()) return
    
    setLoading(true)
    setSummary('')
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'summarize',
          text,
          options: { length, style }
        }),
      })
      
      const data = await response.json()
      setSummary(data.result)
    } catch (error) {
      setSummary('Error generating summary. Please try again.')
    }
    
    setLoading(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">AI Text Summarizer</h1>
            <p className="text-[rgb(var(--muted-foreground))]">
              Instantly summarize long articles, documents, and text with AI
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-24 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* Options */}
          <div className="card p-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium mb-2">Summary Length</label>
                <div className="flex gap-2">
                  {(['short', 'medium', 'long'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLength(l)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        length === l
                          ? 'bg-[rgb(var(--primary))] text-white'
                          : 'bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))]'
                      }`}
                    >
                      {l.charAt(0).toUpperCase() + l.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium mb-2">Output Style</label>
                <div className="flex gap-2">
                  {(['paragraph', 'bullet'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        style === s
                          ? 'bg-[rgb(var(--primary))] text-white'
                          : 'bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))]'
                      }`}
                    >
                      {s === 'bullet' ? 'Bullet Points' : 'Paragraph'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Your Text</label>
              <span className="text-xs text-[rgb(var(--muted-foreground))]">
                {text.length} characters
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article, document, or any long text here..."
              className="input-field min-h-[200px] resize-y"
            />
          </div>

          {/* Summarize Button */}
          <button
            onClick={summarize}
            disabled={loading || !text.trim()}
            className="btn-primary w-full flex items-center justify-center gap-2 mb-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Summarize with AI
              </>
            )}
          </button>

          {/* Output */}
          {summary && (
            <div className="card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[rgb(var(--primary))]" />
                  Summary
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="btn-ghost flex items-center gap-2 text-sm"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-[rgb(var(--muted-foreground))] whitespace-pre-wrap">{summary}</p>
              </div>
            </div>
          )}

          {/* Ad Slot */}
          <div className="ads-slot h-24 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* SEO Content */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">How to Summarize Text with AI</h2>
              <div className="card p-6">
                <ol className="space-y-3 text-[rgb(var(--muted-foreground))]">
                  <li><strong>1. Paste Your Text:</strong> Copy and paste any article, document, or long text</li>
                  <li><strong>2. Choose Options:</strong> Select summary length (short/medium/long) and style</li>
                  <li><strong>3. Click Summarize:</strong> Our AI will analyze and condense your text instantly</li>
                  <li><strong>4. Copy Result:</strong> Use the copy button to save your summary</li>
                </ol>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'AI-powered summarization using GPT-4',
                  'Adjustable summary length',
                  'Bullet points or paragraph output',
                  'Works with any language',
                  'Preserves key information',
                  'Free for basic use',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
