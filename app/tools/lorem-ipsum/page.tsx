'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { FileText, Copy, Check, RefreshCw, Settings } from 'lucide-react'

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'semper', 'lectus',
  'nunc', 'proin', 'nibh', 'nisl', 'condimentum', 'erat', 'nam', 'massa',
  'faucibus', 'ornare', 'suspendisse', 'eget', 'mauris', 'pharetra', 'sodales',
  'ac', 'ante', 'pellentesque', 'habitant', 'morbi', 'tristique', 'senectus',
  'netus', 'fames', 'turpis', 'egestas', 'maecenas', 'volutpat', 'blandit'
]

export default function LoremIpsumPage() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generateWord = () => {
    return loremWords[Math.floor(Math.random() * loremWords.length)]
  }

  const generateSentence = (minWords = 8, maxWords = 15) => {
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords
    const words = Array(wordCount).fill(0).map(() => generateWord())
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(' ') + '.'
  }

  const generateParagraph = (minSentences = 4, maxSentences = 8) => {
    const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences
    return Array(sentenceCount).fill(0).map(() => generateSentence()).join(' ')
  }

  const generate = () => {
    let result = ''
    
    if (type === 'words') {
      const words = Array(count).fill(0).map(() => generateWord())
      if (startWithLorem && count >= 2) {
        words[0] = 'Lorem'
        words[1] = 'ipsum'
      }
      result = words.join(' ')
    } else if (type === 'sentences') {
      const sentences = Array(count).fill(0).map(() => generateSentence())
      if (startWithLorem && sentences.length > 0) {
        sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }
      result = sentences.join(' ')
    } else {
      const paragraphs = Array(count).fill(0).map(() => generateParagraph())
      if (startWithLorem && paragraphs.length > 0) {
        paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + paragraphs[0]
      }
      result = paragraphs.join('\n\n')
    }
    
    setOutput(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <FileText className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Text Generator</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Lorem Ipsum Generator</h1>
            <p className="text-slate-500 max-w-xl mx-auto">
              Generate placeholder text for your designs and mockups
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-20 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* Tool Interface */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            {/* Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-slate-700">Generate</label>
              <div className="grid grid-cols-3 gap-2">
                {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`py-3 px-4 rounded-xl font-medium capitalize transition-all ${
                      type === t
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 text-slate-700">
                Number of {type}: {count}
              </label>
              <input
                type="range"
                min="1"
                max={type === 'words' ? 500 : type === 'sentences' ? 50 : 20}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1</span>
                <span>{type === 'words' ? 500 : type === 'sentences' ? 50 : 20}</span>
              </div>
            </div>

            {/* Start with Lorem */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Start with &quot;Lorem ipsum...&quot;</span>
              </label>
            </div>

            <button
              onClick={generate}
              className="w-full px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Generate Lorem Ipsum
            </button>
          </div>

          {/* Output */}
          {output && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-slate-700">Generated Text</label>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 transition-colors text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-600">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 text-slate-600 whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                {output}
              </div>
              <div className="mt-3 text-xs text-slate-400">
                {output.split(/\s+/).length} words • {output.length} characters
              </div>
            </div>
          )}

          {/* Info */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">About Lorem Ipsum</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="text-slate-600 mb-4">
                Lorem Ipsum is placeholder text commonly used in the printing and typesetting industry. It has been the industry&apos;s standard dummy text since the 1500s.
              </p>
              <p className="text-slate-600">
                Use it for mockups, design prototypes, and content layouts where the actual text is not yet available.
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
