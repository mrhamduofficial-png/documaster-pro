import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Languages, Loader, Globe, Copy, Check, Zap } from 'lucide-react';
import { callAI } from '../../lib/ai';

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

    try {
      const result = await callAI('translate', { text, targetLang });
      const targetLangName = languages.find(l => l.code === targetLang)?.name || targetLang.toUpperCase();
      setTranslated(`--- Translated to ${targetLangName} ---\n\n${result}`);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslated('Error translating text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyTranslation = async () => {
    await navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    if (translated && text) {
      setText(translated.replace(/---.*---\n\n/, ''));
      setTranslated('');
    }
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>AI Document Translator - 12+ Languages | DocuMaster</title>
        <meta name="description" content="AI-powered document translator. Translate text to 12+ languages instantly. Free and accurate translations." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">AI Document Translator</h1>
          <p className="text-secondary-600">Instant translation to 12+ languages powered by AI</p>
        </div>

        {/* Language Selectors */}
        <div className="card mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-1">From</label>
              <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="input text-lg">
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={swapLanguages}
              className="mt-6 p-3 bg-secondary-100 rounded-lg hover:bg-secondary-200 transition-colors"
            >
              <Languages className="w-6 h-6 text-primary-600" />
            </button>
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-1">To</label>
              <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="input text-lg">
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
              className="input min-h-[300px] resize-none"
            />
            <p className="text-xs text-secondary-500 mt-2">{text.split(/\s+/).filter(w => w).length} words</p>
          </div>

          <div className="card bg-gradient-to-br from-accent-50 to-teal-50 border-accent-200">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-secondary-700 flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent-600" />
                Translation
              </label>
              {translated && (
                <button onClick={copyTranslation} className="btn btn-primary btn-sm">
                  {copied ? <><Check className="w-4 h-4 mr-1" />Copied!</> : <><Copy className="w-4 h-4 mr-1" />Copy</>}
                </button>
              )}
            </div>
            <div className="input min-h-[300px] bg-white overflow-y-auto whitespace-pre-wrap">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader className="w-8 h-8 animate-spin text-primary-600" />
                </div>
              ) : translated || (
                <span className="text-secondary-400">AI Translation will appear here...</span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={translate}
          disabled={loading || !text.trim()}
          className="btn btn-primary w-full mt-6 py-4 text-lg"
        >
          {loading ? (
            <><Loader className="w-5 h-5 mr-2 animate-spin" />Translating...</>
          ) : (
            <><Zap className="w-5 h-5 mr-2" />Translate with AI</>
          )}
        </button>

        <div className="mt-8 grid grid-cols-4 md:grid-cols-6 gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setTargetLang(lang.code)}
              className={`p-2 rounded-lg text-center text-sm transition-colors ${
                targetLang === lang.code
                  ? 'bg-primary-100 text-primary-700 border-primary-500 border'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
