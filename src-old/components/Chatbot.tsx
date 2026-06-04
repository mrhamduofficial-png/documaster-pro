import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader, Bot } from 'lucide-react';
import { callAI } from '../lib/ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Rate limiting: max 10 messages per minute
const RATE_LIMIT = 10;
const RATE_WINDOW = 60000; // 1 minute

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm DocuMaster AI Assistant. How can I help you today? I can assist with PDF tools, image conversion, AI features, or answer any questions about our services."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageTimestampsRef = useRef<number[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    const timestamps = messageTimestampsRef.current.filter(t => now - t < RATE_WINDOW);
    messageTimestampsRef.current = timestamps;

    if (timestamps.length >= RATE_LIMIT) {
      setRateLimited(true);
      setTimeout(() => setRateLimited(false), RATE_WINDOW);
      return false;
    }

    messageTimestampsRef.current.push(now);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || rateLimited) return;

    if (!checkRateLimit()) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "You're sending messages too quickly. Please wait a moment."
      }]);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await callAI('chat', { message: userMessage });
      setMessages(prev => [...prev, { role: 'assistant', content: response || 'I apologize, I could not process that request. Please try again.' }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again or check our FAQ in the meantime."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '500px', maxHeight: 'calc(100vh-4rem)' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">DocuMaster AI</h3>
                <p className="text-xs text-white/80">Always here to help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-lg p-1.5 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-sm'
                      : 'bg-white text-secondary-900 rounded-bl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-sm p-3 shadow-sm">
                  <Loader className="w-5 h-5 animate-spin text-primary-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-secondary-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-secondary-200 focus:outline-none focus:border-primary-500 text-sm"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-secondary-400 mt-2 text-center">Powered by AI</p>
          </form>
        </div>
      )}
    </>
  );
}
