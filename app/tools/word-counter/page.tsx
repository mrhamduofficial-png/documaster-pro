'use client'

import { useState, useEffect } from 'react'
import { Header, Footer } from '@/components/navigation'
import { FileText, Copy, Check, RotateCcw } from 'lucide-react'

export default function WordCounterPage() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  
  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? (text.match(/[.!?]+/g) || []).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
    speakingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 150),
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
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
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Word Counter</h1>
            <p className="text-[rgb(var(--muted-foreground))]">
              Count words, characters, sentences, and paragraphs in real-time
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-24 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Words', value: stats.words, color: 'from-purple-500 to-pink-500' },
              { label: 'Characters', value: stats.characters, color: 'from-blue-500 to-cyan-500' },
              { label: 'Sentences', value: stats.sentences, color: 'from-green-500 to-emerald-500' },
              { label: 'Paragraphs', value: stats.paragraphs, color: 'from-orange-500 to-amber-500' },
            ].map((stat, i) => (
              <div key={i} className="card p-4 text-center">
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-sm text-[rgb(var(--muted-foreground))]">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="card p-3 text-center">
              <div className="text-lg font-semibold">{stats.charactersNoSpaces.toLocaleString()}</div>
              <div className="text-xs text-[rgb(var(--muted-foreground))]">Characters (no spaces)</div>
            </div>
            <div className="card p-3 text-center">
              <div className="text-lg font-semibold">{stats.readingTime} min</div>
              <div className="text-xs text-[rgb(var(--muted-foreground))]">Reading Time</div>
            </div>
            <div className="card p-3 text-center">
              <div className="text-lg font-semibold">{stats.speakingTime} min</div>
              <div className="text-xs text-[rgb(var(--muted-foreground))]">Speaking Time</div>
            </div>
          </div>

          {/* Text Area */}
          <div className="relative mb-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="input-field min-h-[300px] resize-y"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => setText('')}
                className="p-2 rounded-lg bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))] transition-colors"
                title="Clear text"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))] transition-colors"
                title="Copy text"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-24 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* SEO Content */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">How to Use Word Counter</h2>
              <div className="card p-6">
                <ol className="space-y-3 text-[rgb(var(--muted-foreground))]">
                  <li><strong>1. Type or Paste:</strong> Enter your text in the text area above</li>
                  <li><strong>2. Real-time Count:</strong> Watch the statistics update instantly as you type</li>
                  <li><strong>3. View Details:</strong> See word count, character count, sentences, and more</li>
                  <li><strong>4. Copy or Clear:</strong> Use the buttons to copy your text or start fresh</li>
                </ol>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Real-time word and character counting',
                  'Characters with and without spaces',
                  'Sentence and paragraph detection',
                  'Estimated reading time (200 wpm)',
                  'Estimated speaking time (150 wpm)',
                  'One-click copy to clipboard',
                  'Works completely offline',
                  '100% free, no sign-up required',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">FAQ</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'How accurate is the word count?',
                    a: 'Our word counter uses industry-standard algorithms to accurately count words separated by spaces. It handles contractions, hyphenated words, and numbers correctly.'
                  },
                  {
                    q: 'What is the character limit?',
                    a: 'There is no character limit. You can paste as much text as you need - our tool handles large documents efficiently.'
                  },
                  {
                    q: 'Is my text stored anywhere?',
                    a: 'No, your text is processed entirely in your browser. Nothing is sent to our servers, ensuring complete privacy.'
                  },
                ].map((faq, i) => (
                  <div key={i} className="card p-4">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">{faq.a}</p>
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
