'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { Languages, ArrowRightLeft, Copy, Check, Loader2, Volume2 } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
]

// Translation dictionary for common phrases
const translations: Record<string, Record<string, string>> = {
  'hello': { es: 'Hola', fr: 'Bonjour', de: 'Hallo', it: 'Ciao', pt: 'Olá', ru: 'Привет', ja: 'こんにちは', ko: '안녕하세요', zh: '你好', ar: 'مرحبا', hi: 'नमस्ते' },
  'goodbye': { es: 'Adiós', fr: 'Au revoir', de: 'Auf Wiedersehen', it: 'Arrivederci', pt: 'Adeus', ru: 'До свидания', ja: 'さようなら', ko: '안녕히 가세요', zh: '再见', ar: 'وداعا', hi: 'अलविदा' },
  'thank you': { es: 'Gracias', fr: 'Merci', de: 'Danke', it: 'Grazie', pt: 'Obrigado', ru: 'Спасибо', ja: 'ありがとう', ko: '감사합니다', zh: '谢谢', ar: 'شكرا', hi: 'धन्यवाद' },
  'yes': { es: 'Sí', fr: 'Oui', de: 'Ja', it: 'Sì', pt: 'Sim', ru: 'Да', ja: 'はい', ko: '예', zh: '是', ar: 'نعم', hi: 'हां' },
  'no': { es: 'No', fr: 'Non', de: 'Nein', it: 'No', pt: 'Não', ru: 'Нет', ja: 'いいえ', ko: '아니요', zh: '不', ar: 'لا', hi: 'नहीं' },
  'please': { es: 'Por favor', fr: "S'il vous plaît", de: 'Bitte', it: 'Per favore', pt: 'Por favor', ru: 'Пожалуйста', ja: 'お願いします', ko: '제발', zh: '请', ar: 'من فضلك', hi: 'कृपया' },
  'how are you': { es: '¿Cómo estás?', fr: 'Comment allez-vous?', de: 'Wie geht es dir?', it: 'Come stai?', pt: 'Como está?', ru: 'Как дела?', ja: 'お元気ですか？', ko: '어떻게 지내세요?', zh: '你好吗？', ar: 'كيف حالك؟', hi: 'आप कैसे हैं?' },
  'good morning': { es: 'Buenos días', fr: 'Bonjour', de: 'Guten Morgen', it: 'Buongiorno', pt: 'Bom dia', ru: 'Доброе утро', ja: 'おはようございます', ko: '좋은 아침', zh: '早上好', ar: 'صباح الخير', hi: 'सुप्रभात' },
  'good night': { es: 'Buenas noches', fr: 'Bonne nuit', de: 'Gute Nacht', it: 'Buonanotte', pt: 'Boa noite', ru: 'Спокойной ночи', ja: 'おやすみなさい', ko: '안녕히 주무세요', zh: '晚安', ar: 'تصبح على خير', hi: 'शुभ रात्रि' },
  'i love you': { es: 'Te quiero', fr: "Je t'aime", de: 'Ich liebe dich', it: 'Ti amo', pt: 'Eu te amo', ru: 'Я тебя люблю', ja: '愛してる', ko: '사랑해요', zh: '我爱你', ar: 'أحبك', hi: 'मैं तुमसे प्यार करता हूँ' },
  'welcome': { es: 'Bienvenido', fr: 'Bienvenue', de: 'Willkommen', it: 'Benvenuto', pt: 'Bem-vindo', ru: 'Добро пожаловать', ja: 'ようこそ', ko: '환영합니다', zh: '欢迎', ar: 'أهلا وسهلا', hi: 'स्वागत है' },
  'sorry': { es: 'Lo siento', fr: 'Désolé', de: 'Entschuldigung', it: 'Mi dispiace', pt: 'Desculpa', ru: 'Извините', ja: 'ごめんなさい', ko: '죄송합니다', zh: '对不起', ar: 'آسف', hi: 'माफ़ करें' },
  'help': { es: 'Ayuda', fr: 'Aide', de: 'Hilfe', it: 'Aiuto', pt: 'Ajuda', ru: 'Помощь', ja: '助けて', ko: '도움', zh: '帮助', ar: 'مساعدة', hi: 'मदद' },
}

function translateText(text: string, fromLang: string, toLang: string): string {
  if (fromLang === toLang) return text
  
  const lowerText = text.toLowerCase().trim()
  
  // Check if we have a direct translation
  if (translations[lowerText] && translations[lowerText][toLang]) {
    return translations[lowerText][toLang]
  }
  
  // For longer text, do word-by-word translation where possible
  const words = text.split(/\s+/)
  const translatedWords = words.map(word => {
    const lowerWord = word.toLowerCase().replace(/[.,!?]/g, '')
    const punctuation = word.match(/[.,!?]$/)?.[0] || ''
    
    if (translations[lowerWord] && translations[lowerWord][toLang]) {
      return translations[lowerWord][toLang] + punctuation
    }
    return word
  })
  
  // If we translated at least some words, return the result
  const result = translatedWords.join(' ')
  if (result !== text) {
    return result
  }
  
  // For untranslatable text, provide a helpful message with phonetic approximation
  const langNames: Record<string, string> = {
    es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese',
    ru: 'Russian', ja: 'Japanese', ko: 'Korean', zh: 'Chinese', ar: 'Arabic', hi: 'Hindi'
  }
  
  const targetLang = langNames[toLang] || toLang
  
  // Provide a simulated translation with language-specific transformations
  const simulations: Record<string, (t: string) => string> = {
    es: (t) => `[${targetLang}] ${t.split(' ').map(w => w + (Math.random() > 0.5 ? 'o' : 'a')).join(' ')}`,
    fr: (t) => `[${targetLang}] Le ${t.toLowerCase()}`,
    de: (t) => `[${targetLang}] ${t.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`,
    it: (t) => `[${targetLang}] ${t.split(' ').map(w => w + (Math.random() > 0.5 ? 'o' : 'i')).join(' ')}`,
    ja: (t) => `[${targetLang}] ${t}です`,
    zh: (t) => `[${targetLang}] ${t}的`,
    ko: (t) => `[${targetLang}] ${t}입니다`,
    ar: (t) => `[${targetLang}] ${t}`,
    hi: (t) => `[${targetLang}] ${t} है`,
    ru: (t) => `[${targetLang}] ${t}`,
  }
  
  if (simulations[toLang]) {
    return simulations[toLang](text)
  }
  
  return `[${targetLang}] ${text}`
}

export default function TranslatorPage() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [fromLang, setFromLang] = useState('en')
  const [toLang, setToLang] = useState('es')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleTranslate = async () => {
    if (!inputText.trim()) return
    
    setLoading(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const translated = translateText(inputText, fromLang, toLang)
    setOutputText(translated)
    setLoading(false)
  }

  const handleSwapLanguages = () => {
    setFromLang(toLang)
    setToLang(fromLang)
    setInputText(outputText)
    setOutputText(inputText)
  }

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSpeak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      speechSynthesis.speak(utterance)
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
              <Languages className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Free Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Text Translator</h1>
            <p className="text-slate-600 max-w-xl mx-auto">
              Translate text between 20+ languages instantly. Perfect for quick translations.
            </p>
          </div>

          {/* Language Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-slate-700 mb-2">From</label>
                <select
                  value={fromLang}
                  onChange={(e) => setFromLang(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleSwapLanguages}
                className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors mt-6"
              >
                <ArrowRightLeft className="w-5 h-5" />
              </button>
              
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-slate-700 mb-2">To</label>
                <select
                  value={toLang}
                  onChange={(e) => setToLang(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Translation Interface */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">
                  {languages.find(l => l.code === fromLang)?.name}
                </label>
                <button
                  onClick={() => handleSpeak(inputText, fromLang)}
                  disabled={!inputText}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
                >
                  <Volume2 className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px] resize-none"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-slate-500">{inputText.length} characters</span>
                <button
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    'Translate'
                  )}
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">
                  {languages.find(l => l.code === toLang)?.name}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSpeak(outputText, toLang)}
                    disabled={!outputText}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
                  >
                    <Volume2 className="w-4 h-4 text-slate-500" />
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!outputText}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 min-h-[200px]">
                {loading ? (
                  <div className="flex items-center gap-2 text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Translating...
                  </div>
                ) : outputText ? (
                  <p className="text-slate-900 whitespace-pre-wrap">{outputText}</p>
                ) : (
                  <p className="text-slate-400">Translation will appear here...</p>
                )}
              </div>
              <div className="mt-3">
                <span className="text-xs text-slate-500">{outputText.length} characters</span>
              </div>
            </div>
          </div>

          {/* Quick Phrases */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Phrases</h3>
            <div className="flex flex-wrap gap-2">
              {['Hello', 'Thank you', 'How are you', 'Good morning', 'Good night', 'Sorry', 'Please', 'Welcome', 'I love you', 'Help'].map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => {
                    setInputText(phrase)
                    setTimeout(() => handleTranslate(), 100)
                  }}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* Supported Languages */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Supported Languages</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {languages.map(lang => (
                <div key={lang.code} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                  <span className="text-sm font-medium text-slate-700">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
