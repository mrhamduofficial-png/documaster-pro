'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { 
  PenTool, Sparkles, Copy, Check, Loader2, 
  FileText, Mail, MessageSquare, Briefcase, RefreshCw
} from 'lucide-react'

const writingTypes = [
  { id: 'blog', name: 'Blog Post', icon: FileText, prompt: 'Write a blog post about' },
  { id: 'email', name: 'Email', icon: Mail, prompt: 'Write a professional email about' },
  { id: 'social', name: 'Social Media', icon: MessageSquare, prompt: 'Write a social media post about' },
  { id: 'business', name: 'Business Copy', icon: Briefcase, prompt: 'Write business copy about' },
]

const tones = ['Professional', 'Casual', 'Friendly', 'Formal', 'Persuasive', 'Informative']

export default function AIWriterPage() {
  const [topic, setTopic] = useState('')
  const [writingType, setWritingType] = useState('blog')
  const [tone, setTone] = useState('Professional')
  const [copied, setCopied] = useState(false)
  const [generatedText, setGeneratedText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) return
    
    setLoading(true)
    setGeneratedText('')
    
    const selectedType = writingTypes.find(t => t.id === writingType)
    const fullPrompt = `${selectedType?.prompt || 'Write about'} "${topic}". Use a ${tone.toLowerCase()} tone. Make it engaging and well-structured.`
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt, type: 'write' })
      })
      
      if (!response.ok) throw new Error('Failed to generate')
      
      const data = await response.json()
      setGeneratedText(data.result || 'No content generated')
    } catch (error) {
      setGeneratedText('Sorry, there was an error generating content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText)
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-4">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">AI Powered</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">AI Writing Assistant</h1>
            <p className="text-slate-600 max-w-xl mx-auto">
              Generate high-quality content for blogs, emails, social media, and more with AI
            </p>
          </div>

          {/* Tool Interface */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
            {/* Writing Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">What do you want to write?</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {writingTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setWritingType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      writingType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                      writingType === type.id ? 'text-blue-600' : 'text-slate-400'
                    }`} />
                    <span className="text-sm font-medium text-slate-700">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Topic or Description</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic or describe what you want to write about..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-none"
              />
            </div>

            {/* Tone Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      tone === t
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || loading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <PenTool className="w-5 h-5" />
                  Generate Content
                </>
              )}
            </button>
          </div>

          {/* Output */}
          {(generatedText || loading) && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Generated Content</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!generatedText}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                    title="Copy"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-600" />}
                  </button>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-slate-700">
                  {generatedText || (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating...
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* How to Use */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Use AI Writing Assistant</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Choose Type', desc: 'Select what kind of content you want to create' },
                { step: '2', title: 'Enter Topic', desc: 'Describe your topic or provide key details' },
                { step: '3', title: 'Generate', desc: 'Click generate and get AI-written content instantly' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4 text-white font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Is the AI Writing Assistant free?', a: 'Yes! Basic usage is completely free. Premium plans offer more generations and features.' },
                { q: 'What types of content can I generate?', a: 'You can generate blog posts, emails, social media content, business copy, product descriptions, and more.' },
                { q: 'How accurate is the AI-generated content?', a: 'Our AI produces high-quality, human-like content. We recommend reviewing and customizing the output for best results.' },
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
