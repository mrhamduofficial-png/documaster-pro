'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
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
    if (!topic.trim()) return
    
    const selectedType = writingTypes.find(t => t.id === writingType)
    const fullPrompt = `${selectedType?.prompt || 'Write about'} "${topic}". Use a ${tone.toLowerCase()} tone. Make it engaging and well-structured.`
    
    setMessages([])
    sendMessage({ text: fullPrompt }, { body: { type: 'write' } })
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">AI Powered</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">AI Writing Assistant</h1>
            <p className="text-[rgb(var(--muted-foreground))] max-w-xl mx-auto">
              Generate high-quality content for blogs, emails, social media, and more with AI
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-20 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* Tool Interface */}
          <div className="card p-6 mb-8">
            {/* Writing Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">What do you want to write?</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {writingTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setWritingType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      writingType === type.id
                        ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                        : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                    }`}
                  >
                    <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                      writingType === type.id ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--muted-foreground))]'
                    }`} />
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Topic or Description</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic or describe what you want to write about..."
                className="input-field min-h-[120px] resize-none"
              />
            </div>

            {/* Tone Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      tone === t
                        ? 'bg-[rgb(var(--primary))] text-white'
                        : 'bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgb(var(--muted))]'
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
              disabled={!topic.trim() || status === 'streaming'}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {status === 'streaming' ? (
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
          {(lastAssistantMessage || status === 'streaming') && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Generated Content</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerate}
                    disabled={status === 'streaming'}
                    className="p-2 rounded-lg bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))] transition-colors"
                    title="Regenerate"
                  >
                    <RefreshCw className={`w-4 h-4 ${status === 'streaming' ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!lastAssistantMessage}
                    className="p-2 rounded-lg bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))] transition-colors"
                    title="Copy"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-[rgb(var(--foreground))]">
                  {lastAssistantMessage ? getMessageText(lastAssistantMessage) : (
                    <div className="flex items-center gap-2 text-[rgb(var(--muted-foreground))]">
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
            <h2 className="text-2xl font-bold mb-6">How to Use AI Writing Assistant</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Choose Type', desc: 'Select what kind of content you want to create' },
                { step: '2', title: 'Enter Topic', desc: 'Describe your topic or provide key details' },
                { step: '3', title: 'Generate', desc: 'Click generate and get AI-written content instantly' },
              ].map((item, i) => (
                <div key={i} className="card p-6 text-center">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 text-white font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Is the AI Writing Assistant free?', a: 'Yes! Basic usage is completely free. Premium plans offer more generations and features.' },
                { q: 'What types of content can I generate?', a: 'You can generate blog posts, emails, social media content, business copy, product descriptions, and more.' },
                { q: 'How accurate is the AI-generated content?', a: 'Our AI produces high-quality, human-like content. We recommend reviewing and customizing the output for best results.' },
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
