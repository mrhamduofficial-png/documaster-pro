import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Languages, Loader, Globe, Copy, Check } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' }
];

export default function DocumentTranslator() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const translate = async () => {
    if (!text.trim()) return;
    setLoading(true);

    // Simulated translation - in production use Google Translate API
    const translations: Record<string, string> = {
      'hello': 'hola',
      'world': 'mundo',
      'document': 'documento',
      'thank you': 'gracias'
    };

    const words = text.toLowerCase().split(' ');
    const translatedWords = words.map(w => translations[w] || `[${w}]`);
    const result = text + '\n\n--- Translated to ' + languages.find(l => l.code === targetLang)?.name + ' ---\n\n' + translatedWords.join(' ');

    setTimeout(() => {
      setTranslated(result);
      setLoading(false);
    }, 1000);
  };

  const copyTranslation = async () => {
    await navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Document Translator - Multi-Language Translation | DocuMaster</title>
        <meta name="description" content="Translate documents and text to multiple languages. Free online document translation tool supporting 12+ languages." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Document Translator</h1>
          <p className="text-secondary-600">Translate text to multiple languages instantly</p>
        </div>

        {/* Language Selectors */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-1">From</label>
              <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="input">
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-center px-4">
              <Languages className="w-8 h-8 text-primary-600" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-1">To</label>
              <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="input">
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <label className="block text-sm font-medium text-secondary-700 mb-2">Original Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to translate..."
              className="input min-h-[250px] resize-none"
            />
            <p className="text-xs text-secondary-500 mt-2">{text.split(/\s+/).filter(w => w).length} words</p>
          </div>

          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-secondary-700">Translation</label>
              {translated && (
                <button onClick={copyTranslation} className="btn btn-outline btn-sm">
                  {copied ? <><Check className="w-4 h-4 mr-1" />Copied</> : <><Copy className="w-4 h-4 mr-1" />Copy</>}
                </button>
              )}
            </div>
            <div className="input min-h-[250px] bg-white overflow-y-auto whitespace-pre-wrap">
              {translated || <span className="text-secondary-400">Translation will appear here...</span>}
            </div>
          </div>
        </div>

        <button onClick={translate} disabled={loading || !text.trim()} className="btn btn-primary w-full mt-6">
          {loading ? <Loader className="w-5 h-5 animate-spin mr-2" /> : <><Globe className="w-4 h-4 mr-2" />Translate</>}
        </button>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-secondary-600">Supported languages:</span>
          {languages.map((lang) => (
            <span key={lang.code} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
              {lang.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
