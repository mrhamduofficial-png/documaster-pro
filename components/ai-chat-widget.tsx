'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageSquare, X, Send, Sparkles, Loader2, Bot, User } from 'lucide-react'

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const [input, setInput] = useState('')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === 'streaming') return
    
    sendMessage({ text: input })
    setInput('')
  }

  const getMessageText = (message: typeof messages[0]): string => {
    if (!message.parts || !Array.isArray(message.parts)) return ''
    return message.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('')
  }

  const suggestedQuestions = [
    'How do I compress a PDF?',
    'Help me write an email',
    'Generate Python code',
    'What tools are available?'
  ]

  return (
    <div className="ai-chat-widget">
      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="gradient-bg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">DocuSprint AI</h3>
                <p className="text-xs text-white/70">Always here to help</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] bg-[rgb(var(--background))]">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center animate-pulse-glow">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-[rgb(var(--foreground))] mb-2">
                  Hi! I&apos;m DocuSprint AI
                </h4>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                  I can help you with documents, writing, coding, and more!
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(q)
                        inputRef.current?.focus()
                      }}
                      className="text-xs px-3 py-1.5 rounded-full bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgb(var(--primary))] hover:text-white transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={message.id || index}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-[rgb(var(--primary))]' 
                      : 'gradient-bg'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-[rgb(var(--primary))] text-white rounded-tr-sm'
                      : 'bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] rounded-tl-sm border border-[rgb(var(--border))]'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{getMessageText(message)}</p>
                  </div>
                </div>
              ))
            )}
            {status === 'streaming' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
                <div className="bg-[rgb(var(--card))] p-3 rounded-2xl rounded-tl-sm border border-[rgb(var(--border))]">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[rgb(var(--muted-foreground))] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[rgb(var(--muted-foreground))] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[rgb(var(--muted-foreground))] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 input-field text-sm"
                disabled={status === 'streaming'}
              />
              <button
                type="submit"
                disabled={!input.trim() || status === 'streaming'}
                className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'streaming' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`ai-chat-bubble ${isOpen ? 'scale-0' : 'scale-100'} transition-transform`}
        aria-label="Open AI Chat"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
