import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Hash, Type, Clock, Copy, Check } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
    paragraphs: text.split(/\n\n+/).filter(p => p.trim()).length,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
    speakingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 150)
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => setText('');

  return (
    <div className="py-8">
      <Helmet>
        <title>Word Counter Free - Count Words, Characters & Sentences | DocuMaster</title>
        <meta name="description" content="Free online word counter tool. Count words, characters, sentences, paragraphs. Calculate reading and speaking time." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Hash className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Word Counter</h1>
          <p className="text-secondary-600">Count words, characters, sentences, and more</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          {[
            { label: 'Words', value: stats.words, icon: Hash },
            { label: 'Characters', value: stats.characters, icon: Type },
            { label: 'Sentences', value: stats.sentences, icon: FileText },
            { label: 'Paragraphs', value: stats.paragraphs, icon: FileText },
            { label: 'Reading', value: `${stats.readingTime}m`, icon: Clock },
            { label: 'Speaking', value: `${stats.speakingTime}m`, icon: Clock }
          ].map((stat) => (
            <div key={stat.label} className="card text-center py-4">
              <stat.icon className="w-5 h-5 text-primary-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
              <p className="text-xs text-secondary-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Text Area */}
        <div className="card mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-secondary-600">
              {stats.charactersNoSpaces} characters (no spaces)
            </span>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="btn btn-outline btn-sm">
                {copied ? <><Check className="w-4 h-4 mr-1" />Copied</> : <><Copy className="w-4 h-4 mr-1" />Copy</>}
              </button>
              <button onClick={clearText} className="btn btn-outline btn-sm">Clear</button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="input min-h-[300px] resize-none"
          />
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card bg-primary-50 border-primary-200">
            <h3 className="font-semibold text-secondary-900 mb-2">Keyword Density</h3>
            <p className="text-sm text-secondary-600">Top words will appear here when you type...</p>
          </div>
          <div className="card bg-primary-50 border-primary-200">
            <h3 className="font-semibold text-secondary-900 mb-2">Text Statistics</h3>
            <p className="text-sm text-secondary-600">Avg. word length: {stats.words > 0 ? (text.replace(/\s/g, '').length / stats.words).toFixed(1) : 0} characters</p>
          </div>
        </div>
      </div>
    </div>
  );
}
